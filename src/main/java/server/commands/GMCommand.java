/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.commands;

import client.*;
import client.inventory.*;
import client.skills.Skill;
import client.skills.SkillFactory;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.skills.管理員;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.commands.InternCommand.封鎖帳號;
import server.commands.InternCommand.限時鎖帳;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.shop.MapleShopFactory;
import packet.MaplePacketCreator;
import tools.StringUtil;

/**
 * @author Emilyx3
 */
public class GMCommand {

    private static final Logger log = LogManager.getLogger(GMCommand.class);

    /**
     * @return
     */
    public static PlayerRank getPlayerLevelRequired() {
        return PlayerRank.遊戲管理員;
    }

    public static class 地圖訊息 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "MapInfo";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int xpos = c.getPlayer().getPosition().x;
            int ypos = c.getPlayer().getPosition().y;
            c.getPlayer().dropMessage(6, "當前地圖訊息: ID " + c.getPlayer().getMapId() + " 名字 " + c.getPlayer().getMap().getMapName() + " 當前坐標訊息: " + xpos + " / " + ypos);
            return 1;
        }
    }

    public static class 獲得技能 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "GetSkill";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            Skill skill = SkillFactory.getSkill(Integer.parseInt(splitted[1]));
            byte level = (byte) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            byte masterlevel = (byte) CommandProcessorUtil.getOptionalIntArg(splitted, 3, 1);

            if (level > skill.getMaxLevel()) {
                level = (byte) skill.getMaxLevel();
            }
            if (masterlevel > skill.getMaxLevel()) {
                masterlevel = (byte) skill.getMaxLevel();
            }
            c.getPlayer().changeSingleSkillLevel(skill, level, masterlevel);
            return 1;
        }
    }

    public static class 增加人氣 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Fame";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter player = c.getPlayer();
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: " + splitted[0] + " <玩家名字> <要加人氣的數量>");
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            int fame = 0;
            try {
                fame = Integer.parseInt(splitted[2]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "輸入的數字無效...");
                return 0;
            }
            if (victim != null && player.allowedToTarget(victim)) {
                victim.addFame(fame);
                victim.updateSingleStat(MapleStat.人氣, victim.getFame());
                log.info("[指令] 管理員 " + player.getName() + " 給玩家 " + victim.getName() + " 加人氣 " + fame + " 點.");
            }
            return 1;
        }
    }

    public static class 無敵 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Invincible";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter player = c.getPlayer();
            if (player.isInvincible()) {
                player.setInvincible(false);
                player.dropMessage(6, "無敵模式關閉");
            } else {
                player.setInvincible(true);
                player.resetAllCooldowns(false);
                player.dropMessage(6, "無敵模式開啟");
            }
            return 1;
        }
    }

    public static class 解除GM implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "UnGM";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter player = c.getPlayer();
            if (player.isInvincible()) {
                player.setInvincible(false);
                player.dropMessage(6, "無敵模式關閉");
            }
            Skill skill = SkillFactory.getSkill(管理員.終極隱藏);
            if (c.getPlayer().isHidden()) {
                c.getPlayer().cancelEffect(skill.getEffect(1), false, -1);
                c.getPlayer().dropMessage(6, "隱藏已關閉。");
            }
            return 1;
        }
    }

    public static class 技能點 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "SP";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().setRemainingSp(CommandProcessorUtil.getOptionalIntArg(splitted, 1, 1), Math.max(CommandProcessorUtil.getOptionalIntArg(splitted, 2, !JobConstants.isSeparatedSpJob(c.getPlayer().getJob()) ? 1 : JobConstants.getJobGrade(c.getPlayer().getJob())) - 1, 0));
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLESP, 0);
            return 1;
        }
    }

    public static class 轉職 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Job";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, splitted[0] + " <職業ID>");
                return 0;
            }
            int jobId = Integer.parseInt(splitted[1]);
            if (MapleJob.getById(jobId) == null) {
                c.getPlayer().dropMessage(5, "輸入的職業id無效.");
                return 0;
            }
            c.getPlayer().changeJob(Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    public static class 商店 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Shop";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleShopFactory shop = MapleShopFactory.getInstance();
            int shopId = Integer.parseInt(splitted[1]);
            if (shop.getShop(shopId) != null) {
                shop.getShop(shopId).sendShop(c);
            }
            return 1;
        }
    }

    public static class 升等 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "LevelUp";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getLevel() < ServerConfig.CHANNEL_PLAYER_MAXLEVEL) {
                c.getPlayer().levelUp(true);
            }
            return 1;
        }
    }

    public static class 升等到 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "LevelUpTo";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, splitted[0] + " <目標等級>");
                return 0;
            }
            int level = Integer.parseInt(splitted[1]);
            if (level > ServerConfig.CHANNEL_PLAYER_MAXLEVEL) {
                level = ServerConfig.CHANNEL_PLAYER_MAXLEVEL;
            }
            while (c.getPlayer().getLevel() < level) {
                c.getPlayer().levelUp();
            }
            return 1;
        }
    }

    public static class 道具 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Item";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            long period = CommandProcessorUtil.getOptionalLongArg(splitted, 3, -1);
//            if (!c.getPlayer().isAdmin()) {
//                for (int i : GameConstants.itemBlock) {
//                    if (itemId == i) {
//                        c.getPlayer().dropMessage(5, "對不起，您當前管理權限無法刷出這個道具.");
//                        return 0;
//                    }
//                }
//            }
            if (!ServerConfig.FORCE_ALLOW_ALL_CMD && !c.getPlayer().isSuperGm()) {
                switch (itemId / 10000) {
                    case 202:
                    case 204:
                    case 229: //技能書
                    case 251: //配方
                    case 253: //特殊卷軸
                    case 261: //武器上使用後可以突破傷害上限
                    case 400:
                    case 401:
                    case 402:
                    case 403:
                    case 413: //作輔助劑
                    case 417: //花生之類
                    case 425: //鍛造道具
                    case 431:
                    case 506: //防暴捲軸
                        c.getPlayer().dropMessage(5, "對不起，您當前管理權限無法刷出這個道具.");
                        return 0;
                }
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 這個道具不存在.");
            } else {
                Item item;
                int flag = (short) ItemAttribute.Seal.getValue();
                if (ItemConstants.getInventoryType(itemId, false) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats(ii.getEquipById(itemId));
                } else {
                    final MaplePet pet;
                    if (ItemConstants.類型.寵物(itemId)) {
                        pet = MaplePet.createPet(itemId);
                        if (pet != null && period == -1) {
                            period = ii.getLife(itemId);
                            if (period < 0) {
                                period = 0;
                            }
                        }
                    } else {
                        pet = null;
                    }
                    item = new Item(itemId, (byte) 0, !c.getPlayer().isSuperGm() || pet != null ? 1 : quantity, 0);
                    item.setPet(pet);
                }
                if (period > 0) {
                    if (period < 1000) {
                        item.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                    } else {
                        item.setExpiration(System.currentTimeMillis() + period);
                    }
                }
                if (!ServerConfig.FORCE_ALLOW_ALL_CMD && !c.getPlayer().isSuperGm()) {
                    item.setAttribute(flag);
                }
                if (!ServerConfig.FORCE_ALLOW_ALL_CMD && !c.getPlayer().isAdmin()) {
                    item.setOwner(c.getPlayer().getName());
                }
                item.setGMLog(c.getPlayer().getName() + " 使用指令 " + splitted[0]);
                MapleInventoryManipulator.addbyItem(c, item);
                log.info("[指令] 管理員 " + c.getPlayer().getName() + " 刷道具: " + item.getItemId() + " 數量: " + item.getQuantity() + " 名稱: " + ii.getName(itemId));
                c.announce(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity(), true));
            }
            return 1;
        }
    }

    public static class GetItemAll implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: " + splitted[0] + " <道具ID> <道具數量>");
                return 0;
            }
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = splitted.length < 3 ? 1 : (short) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 這個道具不存在.");
            } else if (ItemConstants.類型.寵物(itemId)) {
                c.getPlayer().dropMessage(5, "寵物道具請通過商城購買.");
            }
            int succ = 0, error = 0;
            for (MapleCharacter player : ChannelServer.getInstance(1).getMapFactory().getMap(910000000).getCharacters()) {
                if (player != null && player.haveSpaceForId(itemId)) {
                    Item item;
                    if (ItemConstants.getInventoryType(itemId, false) == MapleInventoryType.EQUIP) {
                        item = ii.randomizeStats(ii.getEquipById(itemId));
                    } else {
                        item = new client.inventory.Item(itemId, (byte) 0, !c.getPlayer().isSuperGm() ? 1 : quantity, 0);
                    }
                    item.setGMLog(c.getPlayer().getName() + " 使用指令 " + splitted[0]);
                    MapleInventoryManipulator.addbyItem(player.getClient(), item);
                    log.info("[指令] 管理員 " + c.getPlayer().getName() + " 使用全服刷道具, 玩家名: " + player.getName() + " 道具: " + item.getItemId() + " 數量: " + item.getQuantity() + " 名稱: " + ii.getName(itemId));
                    player.dropMessage(1, "恭喜你獲得管理員贈送的 " + ii.getName(itemId) + " " + quantity + "個。");
                    player.dropMessage(6, "[系統公告] 恭喜你獲得管理員贈送的 " + ii.getName(itemId) + " " + quantity + "個。");
                    succ++;
                } else {
                    error++;
                }
            }
            c.getPlayer().dropMessage(1, "指令使用完畢。\r\n發送成功: " + succ + "\r\n發送失敗: " + error);
            return 1;
        }
    }

    public static class GetItemAll2 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: " + splitted[0] + " <道具ID> <道具數量>");
                return 0;
            }
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = splitted.length < 3 ? 1 : (short) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 這個道具不存在.");
            } else if (ItemConstants.類型.寵物(itemId)) {
                c.getPlayer().dropMessage(5, "寵物道具請通過商城購買.");
            }
            int succ = 0, error = 0;
            for (ChannelServer channel : ChannelServer.getAllInstances()) {
                for (MapleCharacter player : channel.getPlayerStorage().getAllCharacters()) {
                    if (player != null && player.haveSpaceForId(itemId)) {
                        Item item;
                        if (ItemConstants.getInventoryType(itemId, false) == MapleInventoryType.EQUIP) {
                            item = ii.randomizeStats(ii.getEquipById(itemId));
                        } else {
                            item = new client.inventory.Item(itemId, (byte) 0, !c.getPlayer().isSuperGm() ? 1 : quantity, 0);
                        }
                        item.setGMLog(c.getPlayer().getName() + " 使用指令 " + splitted[0]);
                        MapleInventoryManipulator.addbyItem(player.getClient(), item);
                        log.info("[指令] 管理員 " + c.getPlayer().getName() + " 使用全服刷道具, 玩家名: " + player.getName() + " 道具: " + item.getItemId() + " 數量: " + item.getQuantity() + " 名稱: " + ii.getName(itemId));
                        player.dropMessage(1, "恭喜你獲得管理員贈送的 " + ii.getName(itemId) + " " + quantity + "個。");
                        player.dropMessage(6, "[系統公告] 恭喜你獲得管理員贈送的 " + ii.getName(itemId) + " " + quantity + "個。");
                        succ++;
                    } else {
                        error++;
                    }
                }
            }
            c.getPlayer().dropMessage(1, "指令使用完畢。\r\n發送成功: " + succ + "\r\n發送失敗: " + error);
            return 1;
        }
    }

    public static class 等級 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Level";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: " + splitted[0] + " <等級>");
                return 0;
            }
            int change; //需要調整的等級
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "輸入的數字無效.");
                return 0;
            }
            if (change <= 0 || change > 999) {
                c.getPlayer().dropMessage(6, "調整的等級範圍出錯，預設範圍[1-999]");
                return 0;
            }
            c.getPlayer().setLevel((short) (change - 1)); //調整角色的等級為 當前調整的等級 - 1
            c.getPlayer().levelUp(); //觸發角色升級效果
            return 1;
        }
    }

    public static class 刪除道具 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "需要輸入 <角色名字> <道具ID>");
                return 0;
            }
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (chr == null) {
                c.getPlayer().dropMessage(6, "輸入的角色不存在或者角色不在線上或者不在這個頻道.");
                return 0;
            }
            chr.removeAll(Integer.parseInt(splitted[2]), false, false);
            c.getPlayer().dropMessage(6, "已經成功的將ID為: " + splitted[2] + " 的所有道具從角色: " + splitted[1] + " 的背包中刪除.");
            return 1;
        }
    }

    public static class 鎖定道具 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "需要輸入 <角色名> <道具ID>");
                return 0;
            }
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (chr == null) {
                c.getPlayer().dropMessage(6, "輸入的角色不存在或者角色不在線上或者不在這個頻道.");
                return 0;
            }
            int itemid = Integer.parseInt(splitted[2]);
            MapleInventoryType type = ItemConstants.getInventoryType(itemid);
            for (Item item : chr.getInventory(type).listById(itemid)) {
                item.addAttribute(ItemAttribute.Seal.getValue());
                chr.forceUpdateItem(item);
            }
            if (type == MapleInventoryType.EQUIP || type == MapleInventoryType.DECORATION) {
                type = MapleInventoryType.EQUIPPED;
                for (Item item : chr.getInventory(type).listById(itemid)) {
                    item.addAttribute(ItemAttribute.Seal.getValue());
                    chr.forceUpdateItem(item);
                }
            }
            c.getPlayer().dropMessage(6, "已經成功的將ID為: " + splitted[2] + " 的所有道具鎖定,執行角色為: " + splitted[1] + ".");
            return 1;
        }
    }

    public static class 說大話 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "SpeakMega";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.serverNotice(3, victim == null ? c.getChannel() : victim.getClient().getChannel(), victim == null ? splitted[1] : victim.getName() + " : " + StringUtil.joinStringFrom(splitted, 2), true));
            return 1;
        }
    }

    public static class 私信 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Speak";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim == null) {
                c.getPlayer().dropMessage(5, "沒有找到 " + splitted[1] + " 玩家.");
                return 0;
            } else {
                victim.getMap().broadcastMessage(MaplePacketCreator.getChatText(victim.getId(), StringUtil.joinStringFrom(splitted, 2), victim.getName(), victim.isGm(), 0, true, -1));
            }
            return 1;
        }
    }

    public static class 設置實例屬性 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "SetInstanceProperty";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            EventManager em = c.getChannelServer().getEventSM().getEventManager(splitted[1]);
            if (em == null || em.getInstances().size() <= 0) {
                c.getPlayer().dropMessage(5, "EVENT為空。");
            } else {
                em.setProperty(splitted[2], splitted[3]);
                for (EventInstanceManager eim : em.getInstances()) {
                    eim.setProperty(splitted[2], splitted[3]);
                }
            }
            return 1;
        }
    }

    public static class 顯示實例屬性 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "ListInstanceProperty";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            EventManager em = c.getChannelServer().getEventSM().getEventManager(splitted[1]);
            if (em == null || em.getInstances().size() <= 0) {
                c.getPlayer().dropMessage(5, "EVENT為空。");
            } else {
                for (EventInstanceManager eim : em.getInstances()) {
                    c.getPlayer().dropMessage(5, "活動腳本: " + eim.getName() + ", eventManager: " + em.getName() + " iprops: " + eim.getProperty(splitted[2]) + ", eprops: " + em.getProperty(splitted[2]));
                }
            }
            return 0;
        }
    }

    public static class 離開副本 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "LeaveInstance";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getEventInstance() == null) {
                c.getPlayer().dropMessage(5, "你不在副本內。");
            } else {
                c.getPlayer().getEventInstance().unregisterPlayer(c.getPlayer());
            }
            return 1;
        }
    }

    public static class 開始副本 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "StartInstance";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getEventInstance() != null) {
                c.getPlayer().dropMessage(5, "你已經在一個副本裡了。");
            } else if (splitted.length > 2) {
                EventManager em = c.getChannelServer().getEventSM().getEventManager(splitted[1]);
                if (em == null || em.getInstance(splitted[2]) == null) {
                    c.getPlayer().dropMessage(5, "不存在。");
                } else {
                    em.getInstance(splitted[2]).registerPlayer(c.getPlayer());
                }
            } else {
                c.getPlayer().dropMessage(5, splitted[0] + " [副本名] [副本實例名]");
            }
            return 1;

        }
    }

    public static class 誰在這 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "WhosThere";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            StringBuilder builder = new StringBuilder("當前地圖玩家: ").append(c.getPlayer().getMap().getCharacters().size()).append(" 人. ");
            for (MapleCharacter chr : c.getPlayer().getMap().getCharacters()) {
                if (builder.length() > 150) { // wild guess :o
                    builder.setLength(builder.length() - 2);
                    c.getPlayer().dropMessage(6, builder.toString());
                    builder = new StringBuilder();
                }
                builder.append(MapleCharacterUtil.makeMapleReadable(chr.getName()));
                builder.append(", ");
            }
            builder.setLength(builder.length() - 2);
            c.getPlayer().dropMessage(6, builder.toString());
            return 1;
        }
    }

    public static class 重置怪物 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().getMap().killAllMonsters(false);
            return 1;
        }
    }

    public static class 殺OID怪 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "KillMonsterByOID";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMap map = c.getPlayer().getMap();
            int targetId = Integer.parseInt(splitted[1]);
            MapleMonster monster = map.getMonsterByOid(targetId);
            if (monster != null) {
                map.killMonster(monster, c.getPlayer(), false, false, (byte) 1, 0);
            }
            return 1;
        }
    }

    public static class 重置NPC implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().getMap().resetNPCs();
            return 1;
        }
    }

    public static class 公告 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Notice";
        }

        /**
         * @param typestring
         * @return
         */
        protected static int getNoticeType(String typestring) {
            switch (typestring) {
                case "通知":
                    return 0;
                case "警報":
                    return 1;
                case "頻道喇叭":
                    return 2;
                case "公告事項":
                    return 5;
                case "無前綴":
                    return 6;
            }
            return -1;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 1) {
                c.getPlayer().dropMessage(5, splitted[0] + " [通知(預設)/警報/頻道喇叭/公告事項/無前綴] [地圖/頻道/世界(預設)] [公告內容]");
                return 0;
            }
            int joinmod = 1;
            int range = -1;
            switch (splitted[1]) {
                case "地圖":
                    range = 0;
                    break;
                case "頻道":
                    range = 1;
                    break;
                case "世界":
                    range = 2;
                    break;
            }

            int tfrom = 2;
            if (range == -1) {
                range = 2;
                tfrom = 1;
            }
            int type = getNoticeType(splitted[tfrom]);
            if (type == -1) {
                type = 0;
                joinmod = 0;
            }
            StringBuilder sb = new StringBuilder();
            if (splitted[tfrom].equals("公告事項")) {
                sb.append("[公告事項]");
            }
            joinmod += tfrom;
            sb.append(StringUtil.joinStringFrom(splitted, joinmod));

            byte[] packet = MaplePacketCreator.serverNotice(type, sb.toString());
            if (range == 0) {
                c.getPlayer().getMap().broadcastMessage(packet);
            } else if (range == 1) {
                ChannelServer.getInstance(c.getChannel()).broadcastPacket(packet);
            } else if (range == 2) {
                WorldBroadcastService.getInstance().broadcastMessage(packet);
            }
            return 1;
        }
    }

    public static class 黃字公告 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Y";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int range = -1;
            switch (splitted[1]) {
                case "地圖":
                    range = 0;
                    break;
                case "頻道":
                    range = 1;
                    break;
                case "世界":
                    range = 2;
                    break;
            }
            if (range == -1) {
                range = 2;
            }
            byte[] packet = MaplePacketCreator.yellowChat((splitted[0].substring(1).equalsIgnoreCase("y") ? ("[" + c.getPlayer().getName() + "] ") : "") + StringUtil.joinStringFrom(splitted, 2));
            if (range == 0) {
                c.getPlayer().getMap().broadcastMessage(packet);
            } else if (range == 1) {
                ChannelServer.getInstance(c.getChannel()).broadcastPacket(packet);
            } else if (range == 2) {
                WorldBroadcastService.getInstance().broadcastMessage(packet);
            }
            return 1;
        }
    }

    public static class 查看IP implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "WhatsMyIP";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "IP: " + c.getSessionIPAddress());
            return 1;
        }
    }

    public static class TempBanIP extends 限時鎖帳 {

        @Override
        public String getShortCommand() {
            return null;
        }

        public TempBanIP() {
            ipBan = true;
        }
    }

    public static class 封IP extends 封鎖帳號 {

        @Override
        public String getShortCommand() {
            return "BanIP";
        }

        public 封IP() {
            ipBan = true;
        }
    }

    public static class 掉寶開關 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "TDrops";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().getMap().toggleDrops();
            return 1;
        }
    }

    public static class 高級檢索 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 0, "AdvancedSearch");
            return 1;
        }
    }
}
