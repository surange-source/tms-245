package client;

import auth.Auth;
import configs.Config;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnectionEx;
import database.tools.SqlTool;
import handling.cashshop.CashShopServer;
import handling.cashshop.handler.BuyCashItemHandler;
import handling.channel.ChannelServer;
import handling.channel.handler.PlayerHandler;
import handling.login.LoginServer;
import handling.login.handler.AutoRegister;
import handling.netty.MaplePacketDecoder;
import handling.opcode.RecvPacketOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.*;
import handling.world.family.MapleFamilyCharacter;
import handling.world.guild.MapleGuildCharacter;
import handling.world.messenger.MapleMessengerCharacter;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import io.netty.channel.Channel;
import io.netty.util.AttributeKey;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.LoginPacket;
import packet.MaplePacketCreator;
import packet.UIPacket;
import scripting.npc.NPCConversationManager;
import scripting.npc.NPCScriptManager;
import server.CharacterCardFactory;
import server.ShutdownServer;
import server.Timer.PingTimer;
import server.commands.PlayerRank;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import server.shops.IMaplePlayerShop;
import tools.MapleAESOFB;
import tools.Pair;
import tools.Randomizer;
import tools.Triple;
import tools.data.MaplePacketLittleEndianWriter;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.script.ScriptEngine;
import java.io.Serializable;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public final class MapleClient implements Serializable {

    public static final byte LOGIN_NOTLOGGEDIN = 0, LOGIN_SERVER_TRANSITION = 1, LOGIN_LOGGEDIN = 2, CHANGE_CHANNEL = 3, ENTERING_PIN = 4, PIN_CORRECT = 5, LOGIN_CS_LOGGEDIN = 6;
    public static final AttributeKey<MapleClient> CLIENT_KEY = AttributeKey.newInstance("Client");
    private static final Logger log = LogManager.getLogger(MapleClient.class);
    private static final long serialVersionUID = 9179541993413738569L;
    private final static Lock login_mutex = new ReentrantLock(true);
    private final transient Lock mutex = new ReentrantLock(true);
    private final transient Lock npc_mutex = new ReentrantLock();
    private final transient List<Integer> allowedChar = new LinkedList<>();
    private final transient Map<String, ScriptEngine> engines = new HashMap<>();
    private final Map<Integer, Pair<Integer, Short>> charInfo = new LinkedHashMap<>();
    private final List<String> proesslist = new ArrayList<>();
    public transient short loginAttempt = 0;
    private transient MapleAESOFB send, receive;
    private transient Channel session;
    private MapleCharacter player;
    private int channel = 1, accId = -1, world, birthday;
    private int charslots = Math.min(GameConstants.MAX_CHARS_SLOTS, ServerConfig.CHANNEL_PLAYER_MAXCHARACTERS); //可創建角色的數量
    private int cardslots = 3; //角色卡的數量
    private boolean loggedIn = false, serverTransition = false;
    private transient Calendar tempban = null;
    private String accountName;
    private boolean monitored = false, receiving = true;
    private int gmLevel, maplePoint;
    private byte greason = 1, gender = -1;
    private transient String mac = "00-00-00-00-00-00";
    private transient List<String> maclist = new LinkedList<>();
    private transient ScheduledFuture<?> idleTask = null;
    private transient String secondPassword, salt2, tempIP = ""; // To be used only on login
    private long lastNpcClick = 0, sessionId;
    private byte loginattempt = 0;
    private DebugUI debugWindow; //調試封包窗口
    private Triple<String, String, Boolean> tempinfo = null;
    private Map<Short, Short> encryptedOpcodes = new LinkedHashMap<>();
    private int sessionIdx;
    private final AtomicInteger aliveCheckCount = new AtomicInteger(0);
    private ScheduledFuture aliveCheckSchedule = null;
    private volatile Boolean disconnecting = false;
    private final Object disconnectLock = new Object();
    private static Map<Short, Short> Opcodes = new LinkedHashMap<>();
    private static byte[] OpcodeEncryptPacket = null;

    public MapleClient() {

    }

    public MapleClient(MapleAESOFB send, MapleAESOFB receive, Channel session) {
        this.send = send;
        this.receive = receive;
        this.session = session;
    }

    public static byte unban(String charname) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?")) {
                ps.setString(1, charname);
                int accid;
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        return -1;
                    }
                    accid = rs.getInt(1);
                }

                try (PreparedStatement psu = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE id = ?")) {
                    psu.setInt(1, accid);
                    psu.executeUpdate();
                }
            }
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
            return -2;
        }
        return 0;
    }

    public static String getLogMessage(MapleClient cfor, String message) {
        return getLogMessage(cfor, message, new Object[0]);
    }

    public static String getLogMessage(MapleCharacter cfor, String message) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message);
    }

    public static String getLogMessage(MapleCharacter cfor, String message, Object... parms) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message, parms);
    }

    public static String getLogMessage(MapleClient cfor, String message, Object... parms) {
        StringBuilder builder = new StringBuilder();
        if (cfor != null) {
            if (cfor.getPlayer() != null) {
                builder.append("<");
                builder.append(MapleCharacterUtil.makeMapleReadable(cfor.getPlayer().getName()));
                builder.append(" (角色ID: ");
                builder.append(cfor.getPlayer().getId());
                builder.append(")> ");
            }
            if (cfor.getAccountName() != null) {
                builder.append("(賬號: ");
                builder.append(cfor.getAccountName());
                builder.append(") ");
            }
        }
        builder.append(message);
        int start;
        for (Object parm : parms) {
            start = builder.indexOf("{}");
            builder.replace(start, start + 2, parm.toString());
        }
        return builder.toString();
    }

    public static int findAccIdForCharacterName(String charName) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?")) {
                ps.setString(1, charName);
                ResultSet rs = ps.executeQuery();
                int ret = -1;
                if (rs.next()) {
                    ret = rs.getInt("accountid");
                }
                return ret;
            }
        } catch (SQLException e) {
            log.error("findAccIdForCharacterName SQL error", e);
        }
        return -1;
    }

    public static byte unbanIPMacs(String charname) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, charname);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            int accid = rs.getInt(1);
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            String sessionIP = rs.getString("sessionIP");
            String macs = rs.getString("macs");
            rs.close();
            ps.close();
            byte ret = 0;
            if (sessionIP != null) {
                PreparedStatement psa = con.prepareStatement("DELETE FROM ipbans WHERE ip LIKE ?");
                psa.setString(1, sessionIP);
                psa.execute();
                psa.close();
                ret++;
            }
            if (macs != null) {
                String[] macz = macs.split(", ");
                for (String mac : macz) {
                    if (!mac.equals("")) {
                        PreparedStatement psa = con.prepareStatement("DELETE FROM macbans WHERE mac = ?");
                        psa.setString(1, mac);
                        psa.execute();
                        psa.close();
                    }
                }
                ret++;
            }
            return ret;
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
            return -2;
        }
    }

    public static byte unHellban(String charname) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, charname);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            int accid = rs.getInt(1);
            rs.close();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return -1;
            }
            String sessionIP = rs.getString("sessionIP");
            String email = rs.getString("email");
            rs.close();
            ps.close();
            ps = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE email = ?" + (sessionIP == null ? "" : " OR sessionIP = ?"));
            ps.setString(1, email);
            if (sessionIP != null) {
                ps.setString(2, sessionIP);
            }
            ps.execute();
            ps.close();
            return 0;
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
            return -2;
        }
    }

    public static String getAccInfo(String accname, boolean admin) {
        StringBuilder ret = new StringBuilder("帳號 " + accname + " 的信息 -");
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?");
            ps.setString(1, accname);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int banned = rs.getInt("banned");
                ret.append(" 狀態: ");
                ret.append(banned > 0 ? "已封" : "正常");
                ret.append(" 封號理由: ");
                ret.append(banned > 0 ? rs.getString("banreason") : "(無描述)");
                if (admin) {
                    ret.append(" 樂豆點: ");
                    ret.append(rs.getInt("ACash"));
                    ret.append(" 楓點: ");
                    ret.append(rs.getInt("mPoints"));
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("獲取玩家封號理由信息出錯", ex);
        }
        return ret.toString();
    }

    public static String getAccInfoByName(String charname, boolean admin) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?")) {
                ps.setString(1, charname);
                int accid;
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        return null;
                    }
                    accid = rs.getInt(1);
                }
                try (PreparedStatement psu = con.prepareStatement("SELECT * FROM accounts WHERE id = ?")) {
                    psu.setInt(1, accid);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            return null;
                        }

                        StringBuilder ret = new StringBuilder("玩家 " + charname + " 的帳號信息 -");
                        int banned = rs.getInt("banned");
                        if (admin) {
                            ret.append(" 賬號: ");
                            ret.append(rs.getString("name"));
                        }
                        ret.append(" 狀態: ");
                        ret.append(banned > 0 ? "已封" : "正常");
                        ret.append(" 封號理由: ");
                        ret.append(banned > 0 ? rs.getString("banreason") : "(無描述)");
                        return ret.toString();
                    }
                }
            }
        } catch (SQLException ex) {
            log.error("獲取玩家封號理由信息出錯", ex);
            return null;
        }
    }

    public MapleAESOFB getReceiveCrypto() {
        return receive;
    }

    public MapleAESOFB getSendCrypto() {
        return send;
    }

    public final void announce(final byte[] array) {
        if (session == null || ShutdownServer.getInstance().isShutdown()) {
            return;
        }
        session.writeAndFlush(array);
    }

    public final void sendEnableActions() {
        if (session == null || player == null || ShutdownServer.getInstance().isShutdown()) {
            return;
        }
        player.enableActions();
    }

    public Channel getSession() {
        return session;
    }

    public long getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(long sessionId) {
        this.sessionId = sessionId;
    }

    public void StartWindow() {
        if (debugWindow != null) {
            debugWindow.setVisible(false);
            debugWindow = null;
        }
        debugWindow = new DebugUI();
        debugWindow.setVisible(true);
        debugWindow.setC(this);
    }

    public Lock getLock() {
        return mutex;
    }

    public Lock getNPCLock() {
        return npc_mutex;
    }

    public MapleCharacter getPlayer() {
        return player;
    }

    public void setPlayer(MapleCharacter player) {
        this.player = player;
    }

    public void createdChar(int id) {
        allowedChar.add(id);
    }

    public boolean login_Auth(int id) {
        return allowedChar.contains(id);
    }

    public List<MapleCharacter> loadCharacters(int serverId) {
//        AccountDao.clearOutdatedPendingDeleteChr(this.getAccID(), serverId);
        List<MapleCharacter> chars = new LinkedList<>();
        Map<Integer, CardData> cards = CharacterCardFactory.getInstance().loadCharacterCards(accId, serverId);
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            MapleCharacter chr = MapleCharacter.loadCharFromDB(cni.id, this, false, cards);
            chars.add(chr);
            charInfo.put(chr.getId(), new Pair<>(chr.getLevel(), chr.getJob()));
            if (!login_Auth(chr.getId())) {
                allowedChar.add(chr.getId());
            }
        }
        return chars;
    }

    public void updateCharacterCards(Map<Integer, Integer> cids) {
        if (charInfo.isEmpty()) { //沒有角色
            return;
        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM `character_cards` WHERE `accid` = ?")) {
                ps.setInt(1, accId);
                ps.executeUpdate();
            }

            try (PreparedStatement psu = con.prepareStatement("INSERT INTO `character_cards` (accid, worldid, characterid, position) VALUES (?, ?, ?, ?)")) {
                for (Entry<Integer, Integer> ii : cids.entrySet()) {
                    Pair<Integer, Short> info = charInfo.get(ii.getValue());
                    if (info == null || ii.getValue() == 0 || !CharacterCardFactory.getInstance().canHaveCard(info.getLeft(), info.getRight())) {
                        continue;
                    }
                    psu.setInt(1, accId);
                    psu.setInt(2, world);
                    psu.setInt(3, ii.getValue());
                    psu.setInt(4, ii.getKey());
                    psu.executeUpdate();
                }
            }
        } catch (SQLException e) {
            log.error("Failed to update character cards. Reason:", e);
        }
    }

    public int getCharacterJob(int cid) {
        if (charInfo.containsKey(cid)) {
            return charInfo.get(cid).getRight();
        }
        return -1;
    }

    public boolean canMakeCharacter(int serverId) {
        return loadCharactersSize(serverId) < getAccCharSlots();
    }

    public List<String> loadCharacterNames(int serverId) {
        List<String> chars = new LinkedList<>();
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            chars.add(cni.name);
        }
        return chars;
    }

    private List<CharNameAndId> loadCharactersInternal(int serverId) {
        List<CharNameAndId> chars = new LinkedList<>();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT id, name FROM characters WHERE accountid = ? AND world = ? ORDER BY position, id")) {
                ps.setInt(1, accId);
                ps.setInt(2, serverId);

                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        chars.add(new CharNameAndId(rs.getString("name"), rs.getInt("id")));
                        LoginServer.getLoginAuth(rs.getInt("id"));
                    }
                }
            }
        } catch (SQLException e) {
            log.error("error loading characters internal", e);
        }
        return chars;
    }

    /*
     * 獲取遊戲帳號下已經創建的角色個數
     */
    public int loadCharactersSize(int serverId) {
        int chars = 0;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT count(*) FROM characters WHERE accountid = ? AND world = ?")) {
                ps.setInt(1, accId);
                ps.setInt(2, serverId);

                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        chars = rs.getInt(1);
                    }
                }
            }
        } catch (SQLException e) {
            log.error("error loading characters size", e);
        }
        return chars;
    }

    public boolean isLoggedIn() {
        return loggedIn && accId >= 0;
    }

    private Calendar getTempBanCalendar(ResultSet rs) throws SQLException {
        Calendar lTempban = Calendar.getInstance();
        if (rs.getLong("tempban") == 0) { // basically if timestamp in db is 0000-00-00
            lTempban.setTimeInMillis(0);
            return lTempban;
        }
        Calendar today = Calendar.getInstance();
        lTempban.setTimeInMillis(rs.getTimestamp("tempban").getTime());
        if (today.getTimeInMillis() < lTempban.getTimeInMillis()) {
            return lTempban;
        }
        lTempban.setTimeInMillis(0);
        return lTempban;
    }

    public Calendar getTempBanCalendar() {
        return tempban;
    }

    public byte getBanType() {
        return greason;
    }

    public boolean hasBannedIP() {
        boolean ret = false;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) FROM ipbans WHERE ? LIKE CONCAT(ip, '%')")) {
                ps.setString(1, getSessionIPAddress());
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    if (rs.getInt(1) > 0) {
                        ret = true;
                    }
                }
            }
        } catch (SQLException ex) {
            log.error("Error checking ip bans", ex);
        }
        return ret;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17) {
            return;
        }
        this.mac = macData;
    }

    public boolean hasBannedMac() {
        if (mac.equalsIgnoreCase("00-00-00-00-00-00") || mac.length() != 17) {
            return false;
        }
        boolean ret = false;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) FROM macbans WHERE mac = ?")) {
                ps.setString(1, mac);
                try (ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    if (rs.getInt(1) > 0) {
                        ret = true;
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Error checking mac bans", e);
        }
        return ret;
    }

    public void banMacs() {
        banMacs(mac);
    }

    public void banMacs(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17) {
            return;
        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)")) {
                ps.setString(1, macData);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("Error banning MACs", e);
        }
    }

    public void updateMacs() {
        updateMacs(mac);
    }

    public void updateMacs(String macData) {
        if (macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17) {
            return;
        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET macs = ? WHERE id = ?")) {
                ps.setString(1, macData);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("Error saving MACs", e);
        }
    }

    /**
     * Returns 0 on success, a state to be used for
     * {@link LoginPacket#getLoginFailed(MapleEnumClass.AuthReply)} otherwise.
     *
     * @return The state of the login.
     */
    public int finishLogin() {
        login_mutex.lock();
        try {
            byte state = getLoginState();
            if (state > MapleClient.LOGIN_NOTLOGGEDIN) { // already loggedin
                loggedIn = false;
                return 7;
            }
            updateLoginState(MapleClient.LOGIN_LOGGEDIN, getSessionIPAddress());
        } finally {
            login_mutex.unlock();
        }
        return 0;
    }

    public void clearInformation() {
        accountName = null;
        accId = -1;
        secondPassword = null;
        salt2 = null;
        gmLevel = 0;
        maplePoint = 0;
        loggedIn = false;
        mac = "00-00-00-00-00-00";
        maclist.clear();
        this.player = null;
    }

    public int changePassword(String oldpwd, String newpwd) {
        int ret = -1;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?");
            ps.setString(1, getAccountName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                boolean updatePassword = false;
                String passhash = rs.getString("password");
                String salt = rs.getString("salt");
                if (passhash == null || passhash.isEmpty()) {
                    ret = -1;
                } else if (LoginCryptoLegacy.isLegacyPassword(passhash) && LoginCryptoLegacy.checkPassword(oldpwd, passhash)) {
                    ret = 0;
                    updatePassword = true;
                } else if (oldpwd.equals(passhash)) {
                    ret = 0;
                    updatePassword = true;
                } else if (salt == null && LoginCrypto.checkSha1Hash(passhash, oldpwd)) {
                    ret = 0;
                    updatePassword = true;
                } else if (LoginCrypto.checkSaltedSha512Hash(passhash, oldpwd, salt)) {
                    ret = 0;
                    updatePassword = true;
                } else {
                    ret = -1;
                }
                if (updatePassword) {
                    try (PreparedStatement pss = con.prepareStatement("UPDATE `accounts` SET `password` = ?, `salt` = ? WHERE id = ?")) {
                        String newSalt = LoginCrypto.makeSalt();
                        pss.setString(1, LoginCrypto.makeSaltedSha512Hash(newpwd, newSalt));
                        pss.setString(2, newSalt);
                        pss.setInt(3, accId);
                        pss.executeUpdate();
                    }
                }
            }
            ps.close();
            rs.close();
        } catch (SQLException e) {
            log.error("修改遊戲帳號密碼出現錯誤.\r\n", e);
        }
        return ret;
    }

    public MapleEnumClass.AuthReply login(String login, String pwd, boolean ipMacBanned, boolean useKey) {
        MapleEnumClass.AuthReply loginok = MapleEnumClass.AuthReply.GAME_ACCOUNT_NOT_LANDED;
//        if (!useKey) {
//            loginattempt++;
//            if (loginattempt > 6) {
//                log.info("賬號[" + login + "]登錄次數達到6次還未登錄遊戲，服務端斷開連接.");
//                getSession().close();
//            }
//        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?")) {
                ps.setString(1, login);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        int banned = rs.getInt("banned");
                        String passhash = rs.getString("password");
                        String salt = rs.getString("salt");
                        String oldSession = rs.getString("SessionIP");

                        accountName = login;
                        accId = rs.getInt("id");
                        secondPassword = rs.getString("2ndpassword");
                        salt2 = rs.getString("salt2");
                        gmLevel = rs.getInt("gm");
                        greason = rs.getByte("greason");
                        tempban = getTempBanCalendar(rs);
                        gender = rs.getByte("gender");

                        maclist = new LinkedList<>();
                        String macStrs = rs.getString("maclist");
                        if (macStrs != null) {
                            String[] macData = macStrs.split(",");
                            for (String macData1 : macData) {
                                if (macData1.length() == 17) {
                                    maclist.add(macData1);
                                }
                            }
                        }

                        if (secondPassword != null && salt2 != null) {
                            secondPassword = LoginCrypto.rand_r(secondPassword);
                        }
                        ps.close();

                        if (useKey) {
                            loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                        } else {
                            if ((banned > 0 || (tempban != null && tempban.getTimeInMillis() > System.currentTimeMillis())) && gmLevel == 0) {
                                loginok = MapleEnumClass.AuthReply.GAME_ACCOUNT_BANNED;
                            } else {
                                if (banned == -1) {
                                    unban();
                                }
                                boolean updatePasswordHash = false;
                                // Check if the passwords are correct here. :B
                                if (passhash == null || passhash.isEmpty()) {
                                    //match by sessionIP
                                    if (oldSession != null && !oldSession.isEmpty()) {
                                        loggedIn = getSessionIPAddress().equals(oldSession);
                                        loginok = loggedIn ? MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL : MapleEnumClass.AuthReply.GAME_PASSWORD_ERROR;
                                        updatePasswordHash = loggedIn;
                                    } else {
                                        loginok = MapleEnumClass.AuthReply.GAME_PASSWORD_ERROR;
                                        loggedIn = false;
                                    }
                                } else if (LoginCryptoLegacy.isLegacyPassword(passhash) && LoginCryptoLegacy.checkPassword(pwd, passhash)) {
                                    // Check if a password upgrade is needed.
                                    loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                    updatePasswordHash = true;
                                } else if (pwd.equals(passhash)) {
                                    loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                    updatePasswordHash = true;
                                } else if (salt == null && LoginCrypto.checkSha1Hash(passhash, pwd)) {
                                    loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                    updatePasswordHash = true;
                                } else if (LoginCrypto.checkSaltedSha512Hash(passhash, pwd, salt)) {
                                    loginok = MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL;
                                } else {
                                    loggedIn = false;
                                    loginok = MapleEnumClass.AuthReply.GAME_PASSWORD_ERROR;
                                }
                                if (updatePasswordHash) {
                                    try (PreparedStatement pss = con.prepareStatement("UPDATE `accounts` SET `password` = ?, `salt` = ? WHERE id = ?")) {
                                        String newSalt = LoginCrypto.makeSalt();
                                        pss.setString(1, LoginCrypto.makeSaltedSha512Hash(pwd, newSalt));
                                        pss.setString(2, newSalt);
                                        pss.setInt(3, accId);
                                        pss.executeUpdate();
                                    }
                                }

                                if (loginok == MapleEnumClass.AuthReply.GAME_LOGIN_SUCCESSFUL) {
                                    if (World.Client.isStuck(this, accId)) {
                                        updateLoginState(0);
                                    }

                                    byte loginstate = getLoginState();
                                    if (loginstate > MapleClient.LOGIN_NOTLOGGEDIN) { // already loggedin
                                        loggedIn = false;
                                        loginok = MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT;
                                    }
                                }
                            }
                        }
                    } else if (ServerConfig.AUTORIGISTER) {
                        if (AutoRegister.createAccount(login, pwd)) {
                            loginok = login(login, pwd, ipMacBanned, useKey);
                        }
                    }
                }
            }
        } catch (SQLException e) {
            log.error("登錄遊戲帳號出現錯誤. 賬號: " + login + " \r\n", e);
        }
        return loginok;
    }

    public boolean CheckSecondPassword(String in) {
        if (secondPassword == null) {
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                ps.setInt(1, accId);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    secondPassword = rs.getString("2ndpassword");
                    if (secondPassword != null && rs.getString("salt2") != null) {
                        secondPassword = LoginCrypto.rand_r(secondPassword);
                    }
                    salt2 = rs.getString("salt2");
                }
            } catch (SQLException e) {
            }
            if (secondPassword == null) {
                log.error("讀取二次密碼錯誤");
                return false;
            }
        }
        boolean allow = false;
        boolean updatePasswordHash = false;
        // Check if the passwords are correct here. :B
        if (LoginCryptoLegacy.isLegacyPassword(secondPassword) && LoginCryptoLegacy.checkPassword(in, secondPassword)) {
            // Check if a password upgrade is needed.
            allow = true;
            updatePasswordHash = true;
        } else if (salt2 == null && LoginCrypto.checkSha1Hash(secondPassword, in)) {
            allow = true;
            updatePasswordHash = true;
        } else if (in.equals(secondPassword)) {
            // 檢查密碼是否未做任何加密
            allow = true;
            updatePasswordHash = true;
        } else if (LoginCrypto.checkSaltedSha512Hash(secondPassword, in, salt2)) {
            allow = true;
        }
        if (updatePasswordHash) {
            setSecondPassword(in);
            return updateSecondPassword();
        }
        return allow;
    }

    private void unban() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = '' WHERE id = ?")) {
                ps.setInt(1, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
        }
    }

    public int getAccID() {
        return this.accId;
    }

    public void setAccID(int id) {
        this.accId = id;
    }

    public void updateLoginState(int newstate) {
        updateLoginState(newstate, getSessionIPAddress());
    }

    public void updateLoginState(int newstate, String SessionID) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = ?, SessionIP = ?, lastlogin = CURRENT_TIMESTAMP() WHERE id = ?")) {
                ps.setInt(1, newstate);
                ps.setString(2, SessionID);
                ps.setInt(3, getAccID());
                ps.executeUpdate();
            }
        } catch (Exception e) {
            log.error("Error updating login state", e);
        } finally {
            if (newstate == MapleClient.LOGIN_NOTLOGGEDIN) {
                loggedIn = false;
                serverTransition = false;
            } else {
                serverTransition = (newstate == MapleClient.LOGIN_SERVER_TRANSITION || newstate == MapleClient.CHANGE_CHANNEL);
                loggedIn = !serverTransition;
            }
        }
    }

    public boolean updateSecondPassword() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE `accounts` SET `2ndpassword` = ?, `salt2` = ? WHERE id = ?")) {
                String newSalt = LoginCrypto.makeSalt();
                ps.setString(1, LoginCrypto.rand_s(LoginCrypto.makeSaltedSha512Hash(secondPassword, newSalt)));
                ps.setString(2, newSalt);
                ps.setInt(3, accId);
                ps.executeUpdate();
                return true;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    public byte getLoginState() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT loggedin, lastlogin, banned, `birthday` + 0 AS `bday` FROM accounts WHERE id = ?")) {
                ps.setInt(1, getAccID());
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        return MapleClient.LOGIN_NOTLOGGEDIN;
                    }
                    birthday = rs.getInt("bday");
                    byte state = rs.getByte("loggedin");

                    /*
                     * 如果是在更換頻道或者登錄過渡
                     * 檢測 lastlogin 的時間加 20秒 小於當前系統的時間
                     * 就更新登錄狀態為 0
                     */
                    if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
                        if (rs.getTimestamp("lastlogin").getTime() + 20000 < System.currentTimeMillis()) { // connecting to chanserver timeout
                            state = MapleClient.LOGIN_NOTLOGGEDIN;
                            updateLoginState(state, getSessionIPAddress());
                        }
                    }
                    loggedIn = state == MapleClient.LOGIN_LOGGEDIN;
                    return state;
                }
            }
        } catch (SQLException e) {
            loggedIn = false;
            log.error("error getting login state", e);
            return MapleClient.LOGIN_NOTLOGGEDIN;
        }
    }

    public boolean checkBirthDate(int date) {
        return birthday == date;
    }

    public void removalTask(boolean shutdown) {
        try {
            player.removeAllEffect();
            if (player.getMarriageId() > 0) {
                MapleQuestStatus stat1 = player.getQuestNoAdd(MapleQuest.getInstance(160001));
                MapleQuestStatus stat2 = player.getQuestNoAdd(MapleQuest.getInstance(160002));
                if (stat1 != null && stat1.getCustomData() != null && (stat1.getCustomData().equals("2_") || stat1.getCustomData().equals("2"))) {
                    //dc in process of marriage
                    if (stat2 != null && stat2.getCustomData() != null) {
                        stat2.setCustomData("0");
                    }
                    stat1.setCustomData("3");
                }
            }
            if (player.getMapId() == GameConstants.JAIL && !player.isIntern()) {
                MapleQuestStatus stat1 = player.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_TIME));
                MapleQuestStatus stat2 = player.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_QUEST));
                if (stat1.getCustomData() == null) {
                    stat1.setCustomData(String.valueOf(System.currentTimeMillis()));
                } else if (stat2.getCustomData() == null) {
                    stat2.setCustomData("0"); //seconds of jail
                } else { //previous seconds - elapsed seconds
                    int seconds = Integer.parseInt(stat2.getCustomData()) - (int) ((System.currentTimeMillis() - Long.parseLong(stat1.getCustomData())) / 1000);
                    if (seconds < 0) {
                        seconds = 0;
                    }
                    stat2.setCustomData(String.valueOf(seconds));
                }
            }
            player.changeRemoval(true);
            IMaplePlayerShop shop = player.getPlayerShop();
            if (shop != null) {
                shop.removeVisitor(player);
                if (shop.isOwner(player)) {
                    if (shop.getShopType() == 1 && shop.isAvailable() && !shutdown) {
                        shop.setOpen(true);
                    } else {
                        shop.closeShop(true, !shutdown);
                    }
                }
            }
            player.setMessenger(null);
            MapleAntiMacro.stopAnti(player.getName());
            if (player.getMap() != null) {
                if (shutdown || (getChannelServer() != null && getChannelServer().isShutdown())) {
                    int questID = -1;
                    switch (player.getMapId()) {
                        case 240060200: //生命之穴 - 闇黑龍王洞穴
                            questID = 160100;
                            break;
                        case 240060201: //生命之穴 - 進階闇黑龍王洞穴
                            questID = 160103;
                            break;
                        case 280030100: //最後的任務 - 殘暴炎魔的祭台
                        case 280030000: //神秘島 - 殘暴炎魔的祭台
                            questID = 160101;
                            break;
                        case 280030001: //最後的任務 - 進階殘暴炎魔的祭台
                            questID = 160102;
                            break;
                        case 270050100: //神殿的深處 - 神的黃昏
                            questID = 160104;
                            break;
                        case 105100300: //巴洛古神殿 - 巴洛古的墓地
                        case 105100400: //巴洛古神殿 - 巴洛古的墓地
                            questID = 160106;
                            break;
                        case 211070000: //獅子王之城 - 接見室走廊
                        case 211070100: //獅子王之城 - 接見室
                        case 211070101: //獅子王之城 - 空中監獄
                        case 211070110: //獅子王之城 - 復活塔樓
                            questID = 160107;
                            break;
                        case 551030200: //馬來西亞 - 陰森世界
                            questID = 160108;
                            break;
                        case 271040100: //騎士團要塞 - 西格諾斯的殿堂
                            questID = 160109;
                            break;
                    }
                    if (questID > 0) {
                        player.getQuestNAdd(MapleQuest.getInstance(questID)).setCustomData("0"); //reset the time.
                    }
                } else if (player.isAlive()) {
                    switch (player.getMapId()) {
                        case 541010100: //新加坡 - 輪機艙
                        case 541020800: //新加坡 - 千年樹精王遺跡Ⅱ
                        case 220080001: //玩具城 - 時間塔的本源
                            player.getMap().addDisconnected(player.getId());
                            break;
                    }
                }
                player.getMap().userLeaveField(player);
            }
        } catch (Throwable e) {
            log.error("error removalTask", e);
        }
    }

    public void disconnect(boolean RemoveInChannelServer, boolean fromCS) {
        disconnect(RemoveInChannelServer, fromCS, false);
    }

    public void disconnect(boolean RemoveInChannelServer, boolean fromCS, boolean shutdown) {
        if (disconnecting) {
            return;
        }
        synchronized (disconnectLock) {
            if (disconnecting) {
                return;
            }
            disconnecting = true;
        }
        if (debugWindow != null) {
            debugWindow.dispose();
            debugWindow = null;
        }
        if (aliveCheckSchedule != null) {
            aliveCheckSchedule.cancel(true);
            aliveCheckSchedule = null;
        }
        if (player != null) {
            MapleMap map = player.getMap();
            MapleParty party = player.getParty();
            int idz = player.getId(), messengerId = player.getMessenger() == null ? 0 : player.getMessenger().getId(), gid = player.getGuildId(), fid = player.getFamilyId();
            BuddyList chrBuddy = player.getBuddylist();
            MaplePartyCharacter chrParty = new MaplePartyCharacter(player);
            MapleMessengerCharacter chrMessenger = new MapleMessengerCharacter(player);
            MapleGuildCharacter chrGuild = player.getMGC();
            MapleFamilyCharacter chrFamily = player.getMFC();

            removalTask(shutdown);
            LoginServer.getLoginAuth(player.getId());
            //LoginServer.getLoginAuthKey(accountName, true);
            if (!fromCS) {
                player.expirationTask(true);
            }
            player.saveToDB(true, fromCS);
            if (shutdown) {
                player = null;
                receiving = false;
                return;
            }

            if (!fromCS) {
                ChannelServer ch = ChannelServer.getInstance(map == null ? channel : map.getChannel());
                int chz = WorldFindService.getInstance().findChannel(idz);
                if (chz < -1) {
                    disconnect(RemoveInChannelServer, true);//u lie
                    return;
                }
                try {
                    if (chz == -1 || ch == null || ch.isShutdown()) {
                        player = null;
                        return;//no idea
                    }
                    if (messengerId > 0) {
                        WorldMessengerService.getInstance().leaveMessenger(messengerId, chrMessenger);
                    }
                    if (party != null) {
                        chrParty.setOnline(false);
                        WorldPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.LOG_ONOFF, chrParty);
                        if (map != null && party.getLeaderID() == idz) {
                            MaplePartyCharacter lchr = null;
                            for (MaplePartyCharacter pchr : party.getMemberList()) {
                                if (pchr != null && map.getPlayerObject(pchr.getId()) != null && (lchr == null || lchr.getLevel() < pchr.getLevel())) {
                                    lchr = pchr;
                                }
                            }
                            if (lchr != null) {
                                WorldPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.CHANGE_LEADER_DC, lchr);
                            }
                        }
                    }
                    if (chrBuddy != null) {
                        if (!serverTransition) {
                            WorldBuddyService.getInstance().loggedOff(idz, channel, chrBuddy.getBuddyIds());
                        } else { // Change channel
                            WorldBuddyService.getInstance().loggedOn(idz, channel, chrBuddy.getBuddyIds());
                        }
                    }
                    if (gid > 0 && chrGuild != null) {
                        WorldGuildService.getInstance().setGuildMemberOnline(chrGuild, false, -1);
                    }
                    if (fid > 0 && chrFamily != null) {
                        WorldFamilyService.getInstance().setFamilyMemberOnline(chrFamily, false, -1);
                    }
                } catch (Exception e) {
                    log.error(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch != null && player != null) {
                        ch.removePlayer(player.getId()); //這個地方是清理角色的信息
                    }
                    player = null;
                }
            } else {
                int ch = WorldFindService.getInstance().findChannel(idz);
                if (ch > 0) {
                    disconnect(RemoveInChannelServer, false); //如果頻道大於 0 角色應該是在頻道伺服器中
                    return;
                }
                try {
                    if (party != null) {
                        chrParty.setOnline(false);
                        WorldPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.LOG_ONOFF, chrParty);
                    }
                    if (!serverTransition) {
                        WorldBuddyService.getInstance().loggedOff(idz, channel, chrBuddy.getBuddyIds());
                    } else { // Change channel
                        WorldBuddyService.getInstance().loggedOn(idz, channel, chrBuddy.getBuddyIds());
                    }
                    if (gid > 0 && chrGuild != null) {
                        WorldGuildService.getInstance().setGuildMemberOnline(chrGuild, false, -1);
                    }
                    if (fid > 0 && chrFamily != null) {
                        WorldFamilyService.getInstance().setFamilyMemberOnline(chrFamily, false, -1);
                    }
                    if (player != null) {
                        player.setMessenger(null);
                    }
                } catch (Exception e) {
                    log.error(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch == -10) {
                        CashShopServer.getPlayerStorage().deregisterPlayer(idz);
                    }
                    player = null;
                }
            }
        }
        if (!serverTransition && isLoggedIn()) {
            if (!shutdown) {
                updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN, getSessionIPAddress());
            }
            session.attr(MapleClient.CLIENT_KEY).set(null);
            session.attr(MaplePacketDecoder.DECODER_STATE_KEY).set(null);
            session.close();
        }
        engines.clear();
    }

    public String getSessionIPAddress() {
        if (session == null || !session.isActive()) {
            return "0.0.0.0";
        }
        return session.remoteAddress().toString().split(":")[0].replace("/", "");
    }

    public String getSessionLocalIPAddress() {
        if (session == null || !session.isActive()) {
            return "0.0.0.0";
        }
        return session.localAddress().toString().split(":")[0].replace("/", "");
    }

    public boolean CheckIPAddress() {
        if (this.accId < 0) {
            return false;
        }
        boolean canlogin = true;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT SessionIP, banned FROM accounts WHERE id = ?");
            ps.setInt(1, this.accId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    if (rs.getInt("banned") > 0) {
                        canlogin = false; //canlogin false = close client
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Failed in checking IP address for client.", e);
        }
        return canlogin;
    }

    public void DebugMessage(StringBuilder sb) {
        sb.append(getSession().remoteAddress());
        sb.append(" 是否連接: ");
        sb.append(getSession().isActive());
        sb.append(" 是否斷開: ");
        sb.append(!getSession().isOpen());
        sb.append(" 密匙狀態: ");
        sb.append(getSession().attr(MapleClient.CLIENT_KEY) != null);
        sb.append(" 登錄狀態: ");
        sb.append(isLoggedIn());
        sb.append(" 是否有角色: ");
        sb.append(getPlayer() != null);
    }

    public int getChannel() {
        return channel;
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    public byte getGender() {
        return gender;
    }

    public void setGender(byte gender) {
        this.gender = gender;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET gender = ? WHERE id = ?")) {
                ps.setByte(1, gender);
                ps.setInt(2, accId);
                ps.executeUpdate();
                ps.close();
            }
        } catch (SQLException e) {
            log.error("保存角色性別出錯", e);
        }
    }

    public String getSecondPassword() {
        return secondPassword;
    }

    public void setSecondPassword(String secondPassword) {
        this.secondPassword = secondPassword;
    }

    public void setSalt2(String salt2) {
        this.salt2 = salt2;
    }

    public String getAccountName() {
        return accountName;
    }

    public final boolean checkSecuredAccountName(String accountName) {
        if (getAccountName().length() != accountName.length()) {
            return false;
        }
        for (int i = 0; i < accountName.length(); i++) {
            if (accountName.charAt(i) == '*') {
                continue;
            }
            if (accountName.charAt(i) != this.accountName.charAt(i)) {
                return false;
            }
        }
        return true;
    }

    public final String getSecurityAccountName() {
        StringBuilder sb = new StringBuilder(accountName);
        if (sb.length() >= 4) {
            sb.replace(1, 3, "**");
        } else if (sb.length() >= 3) {
            sb.replace(1, 2, "*");
        }
        if (sb.length() > 4) {
            sb.replace(sb.length() - 1, sb.length(), "*");
        }
        return sb.toString();
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public int getWorld() {
        return world;
    }

    public void setWorld(int world) {
        this.world = world;
    }

    public void pongReceived() {
//        if (Config.isDevelop()) log.info("pong received " + aliveCheckCount.get());
        aliveCheckCount.set(0);
    }

    public void startPingSchedule() {
        if (this.aliveCheckSchedule != null) {
            aliveCheckSchedule.cancel(true);
            aliveCheckSchedule = null;
        }

        aliveCheckSchedule = PingTimer.getInstance().register(() -> {
//            if (Config.isDevelop()) log.info("client ping " + aliveCheckCount.get());
            announce(LoginPacket.getPing());
            PlayerHandler.PlayerUpdate(this, player);
            try {
                if (aliveCheckCount.incrementAndGet() > (Config.isDevelop() ? 1000 : 10)) {
                    boolean close = false;
                    if (getSession() != null && getSession().isActive()) {
                        close = true;
                        getSession().close();
                    }
//                    log.info(getLogMessage(MapleClient.this, "自動斷線 : Ping超時 " + close));
                }
            } catch (Throwable e) {
                e.printStackTrace();
            }
        }, 5000);
    }

    public boolean isIntern() {
        return gmLevel >= PlayerRank.實習管理員.getLevel();
    }

    public boolean isGm() {
        return gmLevel >= PlayerRank.遊戲管理員.getLevel();
    }

    public boolean isSuperGm() {
        return gmLevel >= PlayerRank.超級管理員.getLevel();
    }

    public boolean isAdmin() {
        return gmLevel >= PlayerRank.伺服管理員.getLevel();
    }

    public int getGmLevel() {
        return gmLevel;
    }

    public boolean hasGmLevel(int level) {
        return gmLevel >= level;
    }

    public void setGmLevel(int level) {
        this.gmLevel = level;
    }

    public void updateGmLevel() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET gm = ? WHERE id = ?")) {
                ps.setInt(1, gmLevel);
                ps.setInt(2, accId);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
        }
    }

    public ScheduledFuture<?> getIdleTask() {
        return idleTask;
    }

    public void setIdleTask(ScheduledFuture<?> idleTask) {
        this.idleTask = idleTask;
    }

    /**
     * 獲取帳號可創建角色數量
     */
    public int getAccCharSlots() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM character_slots WHERE accid = ? AND worldid = ?")) {
                ps.setInt(1, accId);
                ps.setInt(2, world);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        charslots = Math.min(GameConstants.MAX_CHARS_SLOTS, rs.getInt("charslots"));
                    } else {
                        charslots = Math.min(GameConstants.MAX_CHARS_SLOTS, charslots);
                        try (PreparedStatement psu = con.prepareStatement("INSERT INTO character_slots (accid, worldid, charslots) VALUES (?, ?, ?)")) {
                            psu.setInt(1, accId);
                            psu.setInt(2, world);
                            psu.setInt(3, charslots);
                            psu.executeUpdate();
                        }
                    }
                }
            }
        } catch (SQLException e) {
            log.error("獲取帳號可創建角色數量出現錯誤", e);
        }
        return charslots;
    }

    /**
     * 增加帳號可創建角色數量
     */
    public boolean gainAccCharSlot() {
        if (getAccCharSlots() >= GameConstants.MAX_CHARS_SLOTS) {
            return false;
        }
        charslots++;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE character_slots SET charslots = ? WHERE worldid = ? AND accid = ?")) {
                ps.setInt(1, charslots);
                ps.setInt(2, world);
                ps.setInt(3, accId);
                ps.executeUpdate();
                return true;
            }
        } catch (SQLException e) {
            log.error("增加帳號可創建角色數量出現錯誤", e);
            return false;
        }
    }

    /**
     * 獲取帳號下的角色卡數量
     */
    public int getAccCardSlots() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts_info WHERE accId = ? AND worldId = ?")) {
                ps.setInt(1, accId);
                ps.setInt(2, world);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        cardslots = rs.getInt("cardSlots");
                    } else {
                        try (PreparedStatement psu = con.prepareStatement("INSERT INTO accounts_info (accId, worldId, cardSlots) VALUES (?, ?, ?)")) {
                            psu.setInt(1, accId);
                            psu.setInt(2, world);
                            psu.setInt(3, cardslots);
                            psu.executeUpdate();
                        }
                    }
                }
            }
        } catch (SQLException e) {
            log.error("獲取帳號下的角色卡數量出現錯誤", e);
        }
        return cardslots;
    }

    /**
     * 增加角色卡的數量
     */
    public boolean gainAccCardSlot() {
        if (getAccCardSlots() >= 9) {
            return false;
        }
        cardslots++;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts_info SET cardSlots = ? WHERE worldId = ? AND accId = ?")) {
                ps.setInt(1, cardslots);
                ps.setInt(2, world);
                ps.setInt(3, accId);
                ps.executeUpdate();
                return true;
            }
        } catch (SQLException e) {
            log.error("增加角色卡的數量出現錯誤", e);
            return false;
        }
    }

    public boolean isMonitored() {
        return monitored;
    }

    public void setMonitored(boolean m) {
        this.monitored = m;
    }

    public boolean isReceiving() {
        return receiving;
    }

    public void setReceiving(boolean m) {
        this.receiving = m;
    }

    public String getTempIP() {
        return tempIP;
    }

    public void setTempIP(String s) {
        this.tempIP = s;
    }

    public boolean isLocalhost() {
        return ServerConstants.isIPLocalhost(getSessionIPAddress());
    }

    public boolean hasCheck(int accid) {
        boolean ret = false;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?")) {
                ps.setInt(1, accid);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        ret = rs.getInt("check") > 0;
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Error checking ip Check", e);
        }
        return ret;
    }

    public void setScriptEngine(String name, ScriptEngine e) {
        engines.put(name, e);
    }

    public ScriptEngine getScriptEngine(String name) {
        return engines.get(name);
    }

    public void removeScriptEngine(String name) {
        engines.remove(name);
    }

    public boolean canClickNPC() {
        return lastNpcClick + 500 < System.currentTimeMillis();
    }

    public void setClickedNPC() {
        lastNpcClick = System.currentTimeMillis();
    }

    public void removeClickedNPC() {
        lastNpcClick = 0;
    }

    public NPCConversationManager getCM() {
        return NPCScriptManager.getInstance().getCM(this);
    }

    public boolean hasCheckMac(String macData) {
        return !(macData.equalsIgnoreCase("00-00-00-00-00-00") || macData.length() != 17 || maclist.isEmpty()) && maclist.contains(macData);
    }

    public void setTempInfo(String login, String pwd, boolean isBanned) {
        tempinfo = new Triple<>(login, pwd, isBanned);
    }

    public Triple<String, String, Boolean> getTempInfo() {
        return tempinfo;
    }

    public void addProcessName(String process) {
        proesslist.add(process);
    }

    public boolean hasProcessName(String process) {
        for (String p : proesslist) {
            if (p.startsWith(process)) {
                return true;
            }
        }
        return proesslist.contains(process);
    }

    public void dropMessage(String message) {
        announce(MaplePacketCreator.serverNotice(1, message));
    }

    public boolean modifyCSPoints(int type, int quantity) {
        switch (type) {
            case 1:
                if (getACash() + quantity < 0) {
                    return false;
                }
                setACash(getACash() + quantity);
                break;
            case 2:
                if (quantity < 0 && ServerConfig.mileageAsMaplePoint) {
                    int mileage = getMileage();
                    if (mileage >= Math.abs(quantity)) {
                        modifyMileage(quantity);
                        BuyCashItemHandler.addCashshopLog(this, 0, 5440000, 1, 0, Math.abs(quantity), 1, "里程兌換楓點");
                        return true;
                    } else {
                        if (getMaplePoints(true) + mileage + quantity < 0) {
                            return false;
                        }
                        modifyMileage(-mileage);
                        BuyCashItemHandler.addCashshopLog(this, 0, 5440000, 1, 0, Math.abs(mileage), 1, "里程兌換楓點");
                        quantity = mileage + quantity;
                    }
                }
                if (getMaplePoints(true) + quantity < 0) {
                    return false;
                }
                setMaplePoints(getMaplePoints(true) + quantity);
                break;
            default:
                return false;
        }
        return true;
    }

    public int getCSPoints(int type) {
        switch (type) {
            case 1:
                return getACash();
            case 2:
                return getMaplePoints();
            default:
                return 0;
        }
    }

    public int getACash() {
        int point = 0;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT ACash FROM accounts WHERE id = ?")) {
                ps.setInt(1, getAccID());
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        point = rs.getInt("ACash");
                    }
                }
            }
        } catch (SQLException e) {
            log.error("獲取角色樂豆點失敗。" + e);
        }
        return point;
    }

    public void setACash(final int point) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET ACash = ? WHERE id = ?")) {
                ps.setInt(1, point);
                ps.setInt(2, getAccID());
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("獲取角色樂豆點失敗。" + e);
        }
    }

    public int getMaplePoints() {
        return getMaplePoints(false);
    }

    public int getMaplePoints(boolean onlyMPoint) {
        int point = maplePoint;
        if (!onlyMPoint && ServerConfig.mileageAsMaplePoint) {
            point += getMileage();
        }
        return point;
    }

    public void setMaplePoints(final int point) {
        maplePoint = point;
    }

    public List<Pair<Triple<Integer, Integer, Integer>, Long>> getMileageRechargeRecords() {
        List<Pair<Triple<Integer, Integer, Integer>, Long>> recordList = new LinkedList<>();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("DELETE A FROM mileage_recharge_record A INNER JOIN (SELECT id FROM mileage_recharge_record WHERE accId = ? ORDER BY Time DESC LIMIT " + (ServerConfig.mileageMonthlyLimitMax * 2) + "," + (ServerConfig.mileageMonthlyLimitMax * 2) + ") B ON A.id=B.id");
            ps.setInt(1, getAccID());
            ps.execute();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM mileage_recharge_record WHERE accId = ? AND mileage > 0 ORDER BY Time DESC LIMIT " + ServerConfig.mileageMonthlyLimitMax);
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                recordList.add(new Pair(new Triple(rs.getInt("mileage"), rs.getInt("type"), rs.getInt("status")), rs.getTimestamp("Time").getTime()));
            }
            ps.close();
        } catch (SQLException e) {
        }
        return recordList;
    }

    public List<Pair<Triple<Integer, Integer, Integer>, Long>> getMileagePurchaseRecords() {
        List<Pair<Triple<Integer, Integer, Integer>, Long>> recordList = new LinkedList<>();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("DELETE A FROM cashshop_log A INNER JOIN (SELECT id FROM cashshop_log WHERE accId = ? ORDER BY Time DESC LIMIT 1000,1000) B ON A.id=B.id");
            ps.setInt(1, getAccID());
            ps.execute();
            ps.close();
            ps = con.prepareStatement("SELECT * FROM cashshop_log WHERE accId = ? AND mileage > 0 ORDER BY Time DESC LIMIT 100");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                recordList.add(new Pair(new Triple(rs.getInt("mileage"), rs.getInt("itemId"), rs.getInt("SN")), rs.getTimestamp("Time").getTime()));
            }
            ps.close();
        } catch (SQLException e) {
        }
        return recordList;
    }

    public List<Pair<Integer, Long>> getMileageRecords() {
        List<Pair<Integer, Long>> recordList = new LinkedList<>();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("DELETE FROM mileage_record WHERE mileage <= 0 OR Time IS NULL OR Time <= CURDATE()");
            ps.execute();
            ps.close();

            ps = con.prepareStatement("SELECT * FROM mileage_record WHERE accId = ? AND mileage > 0 ORDER BY Time DESC");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                recordList.add(new Pair(rs.getInt("mileage"), rs.getTimestamp("Time").getTime()));
            }
            ps.close();
        } catch (SQLException e) {
        }
        return recordList;
    }

    public int getMileage() {
        List<Pair<Integer, Long>> recordList = getMileageRecords();
        int point = 0;
        for (Pair<Integer, Long> record : recordList) {
            point += record.getLeft();
        }
        return point;
    }

    public int rechargeMileage(final int quantity, final int type, final boolean limitMax, String log) {
        if (quantity <= 0) {
            return quantity == 0 ? 0 : -1;
        }
        int result = modifyMileage(quantity, limitMax);
        if (result != 0) {
            return result;
        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("INSERT INTO `mileage_recharge_record` (accId, mileage, type, log) VALUES (?, ?, ?, ?)");
            ps.setInt(1, getAccID());
            ps.setInt(2, quantity);
            ps.setInt(3, type);
            if (log == null) {
                log = type == 1 ? "購買儲值" : "活動儲值";
            }
            ps.setString(4, log);
            ps.executeUpdate();
        } catch (SQLException e) {
            return -1;
        }
        return 0;
    }

    public int modifyMileage(int quantity) {
        return modifyMileage(quantity, true);
    }

    public int modifyMileage(int quantity, final boolean limitMax) {
        List<Pair<Integer, Long>> recordList = null;
        if (quantity == 0) {
            return 0;
        } else if (quantity < 0) {
            recordList = getMileageRecords();
            int point = 0;
            for (Pair<Integer, Long> record : recordList) {
                point += record.getLeft();
            }
            if (point < Math.abs(quantity)) {
                return -1;
            }
        } else if (limitMax) {
            if (ServerConfig.mileageDailyLimitMax > 0 || ServerConfig.mileageMonthlyLimitMax > 0) {
                try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                    int mileageDaily = 0;
                    int mileageMonthly = 0;
                    PreparedStatement ps;
                    ResultSet rs;
                    int point;
                    if (ServerConfig.mileageDailyLimitMax > 0) {
                        ps = con.prepareStatement("SELECT SUM(mileage) FROM mileage_recharge_record WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = DATE_FORMAT(CURDATE(), '%Y%m%d')");
                        ps.setInt(1, getAccID());
                        rs = ps.executeQuery();
                        if (rs.next()) {
                            point = rs.getInt(1);
                            if (point >= ServerConfig.mileageDailyLimitMax) {
                                return 1;
                            }
                            if (point + quantity > ServerConfig.mileageDailyLimitMax) {
                                quantity = ServerConfig.mileageDailyLimitMax - point;
                            }
                            mileageDaily = point + quantity;
                        }
                        ps.close();
                    }
                    if (ServerConfig.mileageMonthlyLimitMax > 0) {
                        ps = con.prepareStatement("SELECT SUM(mileage) FROM mileage_recharge_record WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m') = DATE_FORMAT(CURDATE(), '%Y%m')");
                        ps.setInt(1, getAccID());
                        rs = ps.executeQuery();
                        if (rs.next()) {
                            point = rs.getInt(1);
                            if (point >= ServerConfig.mileageMonthlyLimitMax) {
                                return 2;
                            }
                            if (point + quantity > ServerConfig.mileageMonthlyLimitMax) {
                                quantity = ServerConfig.mileageMonthlyLimitMax - point;
                            }
                            mileageMonthly = point + quantity;
                        }
                        ps.close();
                    }
                    announce(UIPacket.addPopupSay(9030200, 1100,
                        "里程上限："
                            + (ServerConfig.mileageDailyLimitMax > 0 ? "\r\n每日：(" + mileageDaily + "/" + ServerConfig.mileageDailyLimitMax + ")" : "")
                            + (ServerConfig.mileageMonthlyLimitMax > 0 ? "\r\n每月：(" + mileageMonthly + "/" + ServerConfig.mileageMonthlyLimitMax + ")" : ""),
             ""));
                } catch (SQLException e) {
                }
            }
        }
        Calendar date = Calendar.getInstance();
        date.add(Calendar.MONTH, 1);
        date.set(Calendar.DAY_OF_MONTH, 0);
        date.set(Calendar.HOUR_OF_DAY, 9);
        date.set(Calendar.MINUTE, 0);
        date.set(Calendar.SECOND, 0);
        date.set(Calendar.MILLISECOND, 0);
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps;
            ResultSet rs;
            if (quantity < 0) {
                ps = con.prepareStatement("SELECT mileage FROM mileage_record WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = ?");
                ps.setInt(1, getAccID());
                ps.setString(2, format.format(date.getTime()));
                rs = ps.executeQuery();
                if (rs.next()) {
                    int point = 0;
                    for (Pair<Integer, Long> record : recordList) {
                        if (format.format(new Date(record.getRight())).equalsIgnoreCase(format.format(date.getTime()))) {
                            point = record.getLeft();
                            break;
                        }
                    }
                    if (point + quantity <= 0) {
                        ps = con.prepareStatement("DELETE FROM mileage_record WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = ?");
                        ps.setInt(1, getAccID());
                        ps.setString(2, format.format(date.getTime()));
                        ps.execute();
                        ps.close();
                        quantity = point + quantity;
                        if (quantity == 0) {
                            return 0;
                        }
                    } else {
                        ps = con.prepareStatement("UPDATE mileage_record SET mileage = mileage + ? WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = ?");
                        ps.setInt(1, quantity);
                        ps.setInt(2, getAccID());
                        ps.setString(3, format.format(date.getTime()));
                        ps.executeUpdate();
                        return 0;
                    }
                }
            }

            date.add(Calendar.MONTH, 1);
            ps = con.prepareStatement("SELECT mileage FROM mileage_record WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = ?");
            ps.setInt(1, getAccID());
            ps.setString(2, format.format(date.getTime()));
            rs = ps.executeQuery();
            if (rs.next()) {
                ps.close();
                if (quantity < 0) {
                    int point = 0;
                    for (Pair<Integer, Long> record : recordList) {
                        if (format.format(new Date(record.getRight())).equalsIgnoreCase(format.format(date.getTime()))) {
                            point = record.getLeft();
                            break;
                        }
                    }
                    if (point + quantity <= 0) {
                        ps = con.prepareStatement("DELETE FROM mileage_record WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = ?");
                        ps.setInt(1, getAccID());
                        ps.setString(2, format.format(date.getTime()));
                        ps.execute();
                        ps.close();
                        return 0;
                    }
                }
                ps = con.prepareStatement("UPDATE mileage_record SET mileage = mileage + ? WHERE accId = ? AND DATE_FORMAT(Time, '%Y%m%d') = ?");
                ps.setInt(1, quantity);
                ps.setInt(2, getAccID());
                ps.setString(3, format.format(date.getTime()));
            } else {
                ps.close();
                if (quantity < 0) {
                    return -1;
                }
                ps = con.prepareStatement("INSERT INTO `mileage_record` (accId, mileage, Time) VALUES (?, ?, ?)");
                ps.setInt(1, getAccID());
                ps.setInt(2, quantity);
                ps.setTimestamp(3, new Timestamp(date.getTimeInMillis()));
            }
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            return -1;
        }
        return 0;
    }

    public Map<String, String> getAccInfoFromDB() {
        Map<String, String> ret = new HashMap<>();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?")) {
                ps.setInt(1, accId);
                try (ResultSet rs = ps.executeQuery()) {
                    ResultSetMetaData metaData = rs.getMetaData();
                    if (rs.next()) {
                        for (int i = 1; i <= metaData.getColumnCount(); i++) {
                            String result = "";
//                        if (metaData.getColumnTypeName(i).equalsIgnoreCase("DATE") || metaData.getColumnTypeName(i).equalsIgnoreCase("TIMESTAMP")) {
//                            result = rs.getDate(i).toString();
//                        } else {
                            result = rs.getString(metaData.getColumnName(i));
//                        }

                            ret.put(metaData.getColumnName(i), result);
                        }
                    }
                }
            }
        } catch (SQLException e) {
            log.error("獲取帳號數據失敗", e);
        }
        return ret;
    }

    public void decryptOpcode(byte[] packet) {
        int b1 = packet[0] & 0xFF;
        int b2 = packet[1] & 0xFF;
        short op = (short) ((b2 << 8) + b1);
        if (encryptedOpcodes != null && encryptedOpcodes.containsKey(op)) {
            short nop = encryptedOpcodes.get(op);
            packet[0] = (byte) (nop & 0xFF);
            packet[1] = (byte) ((nop >> 8) & 0xFF);
        }
    }

    public byte[] getEncryptOpcodesData(String key) {
        if (Opcodes.isEmpty() || OpcodeEncryptPacket == null) {
            OpcodeEncryptPacket = getEncryptOpcodesData(key.getBytes());
            Opcodes.putAll(encryptedOpcodes);
        } else {
            encryptedOpcodes.clear();
            encryptedOpcodes.putAll(Opcodes);
        }
        return OpcodeEncryptPacket;
    }

    public byte[] getEncryptOpcodesData(byte[] keyBytes) {
        StringBuilder string = new StringBuilder();
        int blockSize = 4;
        encryptedOpcodes.clear();
        for (short i = RecvPacketOpcode.CP_BEGIN_USER.getValue(); i < RecvPacketOpcode.Count.getValue(); ++i) {
            short rand = 0;
            while (rand == 0 || encryptedOpcodes.containsKey(rand)) {
                rand = (short) Randomizer.rand(RecvPacketOpcode.CP_BEGIN_USER.getValue(), 9999);
            }
            final String randStr = String.format("%0" + blockSize + "d", rand);
            if (!encryptedOpcodes.containsKey(rand)) {
                encryptedOpcodes.put(rand, i);
                string.append(randStr);
            }
        }

        try {
            MaplePacketLittleEndianWriter encodeData = new MaplePacketLittleEndianWriter();
            encodeData.writeAsciiString(string.toString());
            encodeData.writeZeroBytes(1640);
            for (int i = 0; i < 1621; i++) {
                encodeData.writeInt(84660886);
            }
            encodeData.writeZeroBytes(18988);

            Cipher cipher = Cipher.getInstance("DESede");
            final byte[] dKey = new byte[24];
            System.arraycopy(keyBytes, 0, dKey, 0, Math.min(dKey.length, keyBytes.length));
            if (keyBytes.length < dKey.length) {
                System.arraycopy(dKey, 0, dKey, keyBytes.length, dKey.length - keyBytes.length);
            }
            cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(dKey, "DESede"));
            final byte[] crypted = cipher.doFinal(encodeData.getPacket());

            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeShort(SendPacketOpcode.OpcodeEncryption.getValue());
            mplew.writeInt(blockSize);
            mplew.writeInt(crypted.length);
            mplew.write(crypted);
            return mplew.getPacket();
        } catch (Exception ex) {
            log.error("EncryptedOpcodes Error!", ex);
        }
        return new byte[0];
    }

    /**
     * 获取自己邀请码
     */
    public String getRefCode() {
        if (!Auth.checkPermission("InviteRebate")) {
            return null;
        }
        String refCode = SqlTool.queryAndGet("select ref_code from accounts where id = ?", rs -> rs.getString(1), accId);
        if (refCode == null) {
            while (refCode == null) {
                char[] ss = new char[6];

                for (int i = 0; i < ss.length; ++i) {
                    int f = (int) (Math.random() * 3.0D);
                    if (f == 0) {
                        ss[i] = (char) ((int) (65.0D + Math.random() * 14.0D));
                    } else if (f == 1) {
                        ss[i] = (char) ((int) (80.0D + Math.random() * 11.0D));
                    } else {
                        ss[i] = (char) ((int) (49.0D + Math.random() * 9.0D));
                    }
                }
                refCode = new String(ss);
                if (SqlTool.queryAndGet("select ref_code from accounts where ref_code = ?", rs -> rs.getString(1), refCode) != null) {
                    refCode = null;
                }
            }
            SqlTool.update("UPDATE accounts SET ref_code = ? WHERE id = ?", refCode, accId);
        }
        return refCode;
    }

    /**
     * 获取自己邀请的下级总人数
     */
    public int getRefCount(int chargeAmount) {
        if (!Auth.checkPermission("InviteRebate")) {
            return 0;
        }
        try {
            return SqlTool.queryAndGet("select count(accounts.id) from accounts, hypay where accounts.name = hypay.accname and accounts.up_id = ? and hypay.payUsed >= ?", rs -> rs.getInt(1), accId, chargeAmount);
        } catch (Exception e) {
            return 0;
        }
    }

    public int getUpRefCount(int chargeAmount) {
        if (!Auth.checkPermission("InviteRebate")) {
            return 0;
        }
        try {
            return SqlTool.queryAndGet("select count(accounts.id) from accounts, hypay where accounts.name = hypay.accname and accounts.up_id = ? and hypay.payUsed >= ?", rs -> rs.getInt(1), getUpId(), chargeAmount);
        } catch (Exception e) {
            return 0;
        }
    }

    public int getUpId() {
        if (!Auth.checkPermission("InviteRebate")) {
            return -1;
        }
        try {
            return SqlTool.queryAndGet("select up_id from accounts where id = ?", rs -> rs.getInt(1), accId);
        } catch (Exception e) {
            return -1;
        }
    }

    public int setUpRefCode(String upRefCode) {
        if (!Auth.checkPermission("InviteRebate")) {
            return -1;
        }
        String upName = SqlTool.queryAndGet("select name from accounts where ref_code = ?", rs -> rs.getString(1), upRefCode);
        if (upName == null) {
            return 1;
        }
        int upId = SqlTool.queryAndGet("select id from accounts where ref_code = ? and id <> ?", rs -> rs.getInt(1), upRefCode, accId);
        try {
            SqlTool.update("UPDATE accounts SET up_ref_code = ? WHERE id = ?", upRefCode, accId);
            SqlTool.update("UPDATE accounts SET up_id = ? WHERE id = ?", upId, accId);
            SqlTool.update("UPDATE accounts SET up_name = ? WHERE id = ?", upName, accId);
            SqlTool.update("UPDATE accounts SET ref_time = CURRENT_TIMESTAMP() WHERE id = ?", accId);
        } catch (Exception e) {
            return -1;
        }
        return 0;
    }

    public void setSessionIdx(int sessionIdx) {
        this.sessionIdx = sessionIdx;
    }

    public int getSessionIdx() {
        return sessionIdx;
    }

    public void dispose() {
        announce(MaplePacketCreator.ExclRequest());
    }

    protected static class CharNameAndId {

        public final String name;
        public final int id;

        public CharNameAndId(String name, int id) {
            super();
            this.name = name;
            this.id = id;
        }
    }
}
