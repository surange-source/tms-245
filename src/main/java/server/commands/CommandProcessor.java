package server.commands;

import client.MapleCharacter;
import client.MapleClient;
import configs.ServerConfig;
import constants.enums.BroadcastMessageType;
import constants.enums.UserChatMessageType;
import database.DatabaseConnectionEx;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.command.CommandScriptManager;

import java.lang.reflect.Modifier;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

public class CommandProcessor {

    private static final Logger log = LogManager.getLogger("CommandProcessor");
    private static final HashMap<Integer, HashMap<String, CommandObject>> commands = new HashMap<>();
    private static final HashMap<Integer, HashMap<String, CommandObject>> commands_normal = new HashMap<>();

    static {

        Class<?>[] CommandFiles = {
                PlayerCommand.class,
                BronzeICommand.class,
                BronzeIVCommand.class,
                InternCommand.class,
                GMCommand.class,
                SuperGMCommand.class,
                AdminCommand.class
        };

        for (Class<?> clasz : CommandFiles) {
            try {
                PlayerRank rankNeeded = (PlayerRank) clasz.getMethod("getPlayerLevelRequired").invoke(null, (Object[]) null);
                Class<?>[] a = clasz.getDeclaredClasses();
                HashMap<String, CommandObject> cM = new HashMap<>();
                for (Class<?> c : a) {
                    try {
                        if (!Modifier.isAbstract(c.getModifiers()) && !c.isSynthetic()) {
                            Object o = c.getDeclaredConstructor().newInstance();
                            boolean enabled;
                            try {
                                enabled = c.getDeclaredField("enabled").getBoolean(c.getDeclaredField("enabled"));
                            } catch (NoSuchFieldException ex) {
                                enabled = true; //Enable all coded commands by default.
                            }
                            if (o instanceof CommandExecute && enabled) {
                                cM.put(rankNeeded.getCommandPrefix() + c.getSimpleName().toLowerCase(), new CommandObject((CommandExecute) o, rankNeeded.getLevel(), rankNeeded.isGm()));
                            }
                        }
                    } catch (Exception ex) {
                        log.error(ex);
                    }
                }
                if (rankNeeded.isGm()) {
                    commands.put(rankNeeded.getLevel(), cM);
                } else {
                    commands_normal.put(rankNeeded.getLevel(), cM);
                }
            } catch (Exception ex) {
                log.error(ex);
            }
        }
    }

    private static void sendDisplayMessage(MapleClient c, String msg, CommandType type) {
        if (c.getPlayer() == null) {
            return;
        }
        switch (type) {
            case NORMAL:
                c.getPlayer().dropMessage(6, msg);
                break;
            case TRADE:
                c.getPlayer().dropMessage(-2, "錯誤 : " + msg);
                break;
        }

    }

    public static void dropHelp(MapleClient c) {
        StringBuilder sb = new StringBuilder();
        sb.append("\r\n-------------------- 幫助 --------------------");
        if (ServerConfig.FORCE_ALLOW_ALL_CMD || c.isGm()) {
            sb.append("\n(可用\"/\"前綴)");
        }
        sb.append("\r\n@怪物/@mob : 查看當前離你最近的怪物訊息");
        sb.append("\r\n@解卡/@ea : 如果無法和NPC進行對話請輸入這個指令");
        sb.append("\r\n@刪除盾牌 : 注意: 此功能只對惡魔職業開放");
        sb.append("\r\n@里程 : 查看累積里程的詳單");
        for (String command : sb.toString().split("\r\n")) {
            c.getPlayer().dropMessage(-11, command);
        }
        if (!ServerConfig.FORCE_ALLOW_ALL_CMD && !c.isIntern() && c.getPlayer().getMvpLevel() == PlayerRank.普通.getLevel()) {
            return;
        }
        c.getPlayer().dropSpouseMessage(UserChatMessageType.頻道喇叭, "指令表: ");
        for (int i = PlayerRank.MVP銅牌I.getLevel(); i <= ((c.getPlayer().isIntern() || ServerConfig.FORCE_ALLOW_ALL_CMD) ? PlayerRank.MVP紅鑽.getLevel() : c.getPlayer().getMvpLevel()); i++) {
            dropCommandList(c, i, false);
        }
        if (!ServerConfig.FORCE_ALLOW_ALL_CMD && c.getGmLevel() == PlayerRank.普通.getLevel()) {
            return;
        }
        for (int i = PlayerRank.實習管理員.getLevel(); i <= (ServerConfig.FORCE_ALLOW_ALL_CMD ? PlayerRank.伺服管理員.getLevel() : c.getPlayer().getGmLevel()); i++) {
            dropCommandList(c, i, true);
        }
    }

    public static void dropCommandList(MapleClient c, int level, boolean isGm) {
        dropCommandList(c, level, isGm, "");
    }

    public static void dropCommandList(MapleClient c, int level, boolean isGm, String search) {
        String commandList = getCommandsForLevel(level, isGm, search);
        if (commandList == null) {
            return;
        }
        final PlayerRank pRank = PlayerRank.getByLevel(level, isGm);
        String comment = "";
        if (c.isGm()) {
            comment += "/,";
        }
        comment += pRank.getCommandPrefix();
        if (pRank.getFullWidthCommandPrefix() != null) {
            comment += "," + pRank.getFullWidthCommandPrefix();
        }
        c.getPlayer().dropSpouseMessage(UserChatMessageType.方塊洗洗樂, "[" + pRank.name() + "指令] 前綴\"" + comment + "\" : ");
        c.getPlayer().dropMessage(BroadcastMessageType.NOTICE_WITHOUT_PREFIX, commandList);
    }

    private static String getCommandsForLevel(int level, boolean isGm, String search) {
        StringBuilder sb = new StringBuilder();
        HashMap<Integer, HashMap<String, CommandObject>> cmdMap = isGm ? commands : commands_normal;
        if (!cmdMap.containsKey(level)) {
            return null;
        }
        for (Map.Entry<String, CommandObject> entry : cmdMap.get(level).entrySet()) {
            String cmd = entry.getKey();
            CommandObject co = entry.getValue();
            if (cmd == null || co == null) {
                continue;
            }
            if (!search.isEmpty() && !fuzzyMatch(cmd, search) && !fuzzyMatch(co.getShortCommand(), search)) {
                continue;
            }
            sb.append(cmd.substring(1));
            if (co.getShortCommand() != null) {
                sb.append("(").append(co.getShortCommand()).append(")");
            }
            sb.append(" | ");
        }
        return sb.length() > 0 ? sb.toString().substring(0, sb.length() - 3) : null;
    }

    public static boolean processCommand(MapleClient c, String line, CommandType type) {
        if (line.length() < 2) {
            return false;
        }
        if ((line.charAt(0) != '/' && PlayerRank.getByCommandPrefix(line.charAt(0)) == null) || line.charAt(0) == line.charAt(1)) {
            return false;
        }

        String[] splitted = line.split(" ");
        splitted[0] = splitted[0].toLowerCase();

        List<CommandObject> coList = new ArrayList<>();
        boolean forceAllow = (c.getPlayer().getAccountID() == 1) || ServerConfig.FORCE_ALLOW_ALL_CMD;
        for (PlayerRank rank : PlayerRank.values()) {
            if (!forceAllow)
            if ((rank.isGm() && c.getGmLevel() < rank.getLevel()) || (!rank.isGm() && !c.isIntern() && c.getPlayer().getMvpLevel() < rank.getLevel())) {
                break;
            }
            String cmd;
            if (line.charAt(0) == '/' || PlayerRank.getByCommandPrefix(line.charAt(0)) != null) {
                cmd = rank.getCommandPrefix() + splitted[0].substring(1);
            } else {
                cmd = splitted[0];
            }

            CommandObject co = CommandScriptManager.getInstance().getCommand(cmd, c);
            if (co != null && co.getType() != type) {
                coList.clear();
                coList.add(co);
                break;
            }

            List<CommandObject> cList = new ArrayList<>();
            HashMap<Integer, HashMap<String, CommandObject>> cmdMap = rank.isGm() ? commands : commands_normal;
            if (!cmdMap.containsKey(rank.getLevel())) {
                continue;
            }
            for (Map.Entry<String, CommandObject> entry : cmdMap.get(rank.getLevel()).entrySet()) {
                if (entry == null || entry.getKey() == null || entry.getValue() == null || entry.getKey().charAt(0) != cmd.charAt(0) || entry.getValue().getType() != type) {
                    continue;
                }
                if (fuzzyMatch(entry.getKey(), cmd.substring(1)) || fuzzyMatch(entry.getValue().getShortCommand(), cmd.substring(1))) {
                    if (entry.getKey().equals(cmd) || (entry.getValue().getShortCommand() != null && entry.getValue().getShortCommand().toLowerCase().equals(cmd.substring(1)))) {
                        cList.clear();
                        cList.add(entry.getValue());
                        break;
                    } else {
                        cList.add(entry.getValue());
                    }
                }
            }
            coList.addAll(cList);
        }

        if (!coList.isEmpty() && coList.size() != 1) {
            CommandObject co = null;
            for (CommandObject i : coList) {
                if (i.getName().toLowerCase().equals(splitted[0].substring(1))
                    || (i.getShortCommand() != null && i.getShortCommand().toLowerCase().equals(splitted[0].substring(1)))) {
                    co = i;
                }
            }
            if (co == null) {
                String cmd = null;
                for (CommandObject i : coList) {
                    if (cmd == null) {
                        cmd = i.getName();
                        co = i;
                    } else if (!cmd.equals(i.getName())) {
                        co = null;
                        break;
                    }
                }
            }
            if (co != null) {
                coList.clear();
                coList.add(co);
            }
        }

        if (coList.size() != 1) {
            System.out.println(splitted[0]);
            if (splitted[0].substring(1).equals("幫助") || splitted[0].substring(1).equals("help")) {
                dropHelp(c);
            } else {
                sendDisplayMessage(c, "輸入的指令不存在" + (coList.isEmpty() ? "" : (", 您是可能需要使用如下指令" + (!c.isGm() ? ":" : "(可用\"/\"前綴):"))), type);
                String cmds = "";
                for (CommandObject co : coList) {
                    cmds += PlayerRank.getByLevel(co.getReqLevel(), co.isGm()).getCommandPrefix();
                    cmds += co.getName();
                    if (co.getShortCommand() != null) {
                        cmds += "(" + co.getShortCommand() + ")";
                    }
                    cmds += " | ";
                }
                if (!cmds.isEmpty()) {
                    sendDisplayMessage(c, cmds.substring(0, cmds.length() - 3), type);
                }
            }
            return true;
        } else {
            CommandObject co = coList.get(0);
            if (forceAllow || (co.isGm() && c.getGmLevel() >= co.getReqLevel()) || (!co.isGm() && (c.isIntern() || c.getPlayer().getMvpLevel() >= co.getReqLevel()))) {
                int ret = 0;
                try {
                    co.execute(c, splitted); //Don't really care about the return value. ;D
                } catch (Exception e) {
                    if (co.getReqLevel() >= PlayerRank.實習管理員.getLevel()) {
                        if (e instanceof ArrayIndexOutOfBoundsException) {
                            sendDisplayMessage(c, "使用命令出錯，該命令必須帶參數才能使用: " + e, type);
                        }
                        log.error("使用指令" + splitted[0] + "出錯", e);
                    } else {
                        sendDisplayMessage(c, "使用指令出現錯誤.", type);
                    }
                    if (c.getPlayer().isGm()) {
                        sendDisplayMessage(c, "錯誤: " + e, type);
                        log.error(e);
                    }
                }
                if (ret > 0 && c.getPlayer() != null) { //incase d/c after command or something
                    logCommandToDB(c.getPlayer(), line, "gmlog");
                }
            } else {
                if ((!co.isGm() && co.getReqLevel() > PlayerRank.普通.getLevel() && c.getPlayer().isBronzeIMvp()) || (co.isGm() && c.isIntern())) {
                    sendDisplayMessage(c, "您的權限等級不足以使用此指令.", type);
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    private static boolean fuzzyMatch(String toMatch, String regex) {
        if (toMatch == null || regex == null) {
            return false;
        }
        toMatch = toMatch.toLowerCase();
        regex = regex.toLowerCase();
        for (int i = 0; i < regex.length(); i++) {
            if (!toMatch.contains(regex.substring(i, i + 1))) {
                return false;
            }
        }
        return true;
    }

    private static void logCommandToDB(MapleCharacter player, String command, String table) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO " + table + " (cid, name, command, mapid) VALUES (?, ?, ?, ?)")) {
                ps.setInt(1, player.getId());
                ps.setString(2, player.getName());
                ps.setString(3, command);
                ps.setInt(4, player.getMap().getId());
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
    }
}
