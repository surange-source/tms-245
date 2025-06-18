package server.commands;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import configs.ServerConfig;
import constants.JobConstants;
import constants.enums.ConversationType;
import packet.MTSCSPacket;
import packet.MaplePacketCreator;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.life.MapleMonster;
import tools.FileoutputUtil;
import tools.StringUtil;

public class PlayerCommand {

    /**
     * 使用權限
     * @return 權限
     */
    public static PlayerRank getPlayerLevelRequired() {
        return PlayerRank.普通;
    }

    public static class 清除 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        public void showDescription(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, splitted[0] + " <類別，1=裝備,2=消耗,3=其他,4=裝飾,5=特殊,6=時裝> <從欄位> <至欄位> - 清空背包");
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 4 || !StringUtil.isNaturalNumber(splitted[1]) || !StringUtil.isNaturalNumber(splitted[2]) || !StringUtil.isNaturalNumber(splitted[3])) {
                showDescription(c, splitted);
                return 1;
            }

            long totalRemoveSlot;
            MapleInventoryType type = null;
            MapleInventory inventory;
            int startSlot = (int) Math.max(1, Long.parseLong(splitted[2]));
            int endSlot = (int) Math.min(128, Long.parseLong(splitted[3]));

            switch (splitted[1]) {
                case "1":
                    type = MapleInventoryType.EQUIP;
                    break;
                case "2":
                    type = MapleInventoryType.USE;
                    break;
                case "3":
                    type = MapleInventoryType.ETC;
                    break;
                case "4":
                    type = MapleInventoryType.SETUP;
                    break;
                case "5":
                    type = MapleInventoryType.CASH;
                    break;
                case "6":
                    type = MapleInventoryType.DECORATION;
                    break;
            }

            if (type == null) {
                showDescription(c, splitted);
                return 1;
            }

            inventory = c.getPlayer().getInventory(type);
            if (inventory == null) {
                c.getPlayer().dropMessage(6, "發生未知的錯誤");
                return 1;
            }
            StringBuilder sb = new StringBuilder();
            totalRemoveSlot = 0L;

            for (short slot = (short) startSlot; slot <= endSlot; slot++) {
                Item item = inventory.getItem(slot);
                if (item == null) {
                    continue;
                }
                String name = MapleItemInformationProvider.getInstance().getName(item.getItemId());
                sb.append(name);// 道具名稱
                sb.append("(");
                sb.append(item.getItemId());// 道具代碼
                sb.append(")");
                sb.append(item.getQuantity());// 道具數量
                sb.append("個、");
                totalRemoveSlot += item.getQuantity();
                MapleInventoryManipulator.removeFromSlot(c, type, slot, item.getQuantity(), false, false);
                            }
            FileoutputUtil.logToFile("logs/data/清除道具.txt", "\r\n " + FileoutputUtil.NowTime() + " IP: " + c.getSession().remoteAddress().toString().split(":")[0] + " 帳號: " + c.getAccountName() + " 玩家: " + c.getPlayer().getName() + " 使用了指令 " + StringUtil.joinStringFrom(splitted, 0) + " 道具:" + sb.toString());
            c.getPlayer().dropMessage(6, " 清理了" + type.getName() + "類從" + startSlot + "到" + endSlot + "共" + totalRemoveSlot + "個道具");
            return 1;
        }
    }

    /**
     * 查看怪物信息
     */
    public static class 怪物 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "Mob";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMonster mob = null;
            for (MapleMonster monstermo : c.getPlayer().getMap().getAllMonster()) {
                mob = monstermo;
                if (mob.isAlive()) {
                    c.getPlayer().dropMessage(6, "怪物: " + (c.getPlayer().isIntern() ? mob.toMoreString() : mob));
//                    break; //只能查看1個怪物的信息
                }
            }
            if (mob == null) {
                c.getPlayer().dropMessage(6, "查看失敗: 1.沒有找到需要查看的怪物訊息. 2.你周圍沒有怪物出現. 3.有些怪物禁止查看.");
            }
            return 1;
        }
    }

    /**
     * 角色解卡
     */
    public static class 解卡 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "EA";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.removeClickedNPC();
            NPCScriptManager.getInstance().dispose(c);
            c.getPlayer().setConversation(ConversationType.NONE);
            c.sendEnableActions();
            c.announce(MaplePacketCreator.encodeEnableActions());
            c.getPlayer().dropMessage(6, "解卡成功");
            return 1;
        }
    }

    /**
     * 刪除盾牌
     */
    public static class 刪除盾牌 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (JobConstants.is惡魔(c.getPlayer().getJob())) {
                Item toRemove = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
                if (toRemove != null && toRemove.getItemId() / 1000 == 1099 && toRemove.getItemId() != 1099004 && toRemove.getItemId() != 1099005 && toRemove.getItemId() != 1099009) {
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIPPED, toRemove.getPosition(), toRemove.getQuantity(), false);
                    c.getPlayer().equipChanged();
                    return 1;
                } else {
                    c.getPlayer().dropMessage(6, "刪除盾牌失敗，盾牌位置道具訊為空.或者該盾牌可以手動取下來.");
                    return 0;
                }
            } else {
                c.getPlayer().dropMessage(6, "此指令只對惡魔職業開放。");
                return 0;
            }
        }
    }

    public static class 里程 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.announce(MTSCSPacket.showMileageInfo(c));
            return 1;
        }
    }

    public static class STR extends DistributeStatCommands {

        public STR() {
            stat = MapleStat.力量;
        }
    }

    public static class DEX extends DistributeStatCommands {

        public DEX() {
            stat = MapleStat.敏捷;
        }
    }

    public static class INT extends DistributeStatCommands {

        public INT() {
            stat = MapleStat.智力;
        }
    }

    public static class LUK extends DistributeStatCommands {

        public LUK() {
            stat = MapleStat.幸運;
        }

    }

    public abstract static class DistributeStatCommands implements CommandExecute {

        private static int statLow = 4;
        protected MapleStat stat = null;

        private void setStat(MapleCharacter chr, int amount) {
            switch (stat) {
                case 力量:
                    chr.getStat().setStr((short) amount, chr);
                    chr.updateSingleStat(MapleStat.力量, chr.getStat().getStr());
                    break;
                case 敏捷:
                    chr.getStat().setDex((short) amount, chr);
                    chr.updateSingleStat(MapleStat.敏捷, chr.getStat().getDex());
                    break;
                case 智力:
                    chr.getStat().setInt((short) amount, chr);
                    chr.updateSingleStat(MapleStat.智力, chr.getStat().getInt());
                    break;
                case 幸運:
                    chr.getStat().setLuk((short) amount, chr);
                    chr.updateSingleStat(MapleStat.幸運, chr.getStat().getLuk());
                    break;
            }
        }

        private int getStat(MapleCharacter chr) {
            switch (stat) {
                case 力量:
                    return chr.getStat().getStr();
                case 敏捷:
                    return chr.getStat().getDex();
                case 智力:
                    return chr.getStat().getInt();
                case 幸運:
                    return chr.getStat().getLuk();
                default:
                    throw new RuntimeException(); //Will never happen.
            }
        }

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "格式: " + splitted[0] + " <添加的AP數量>");
                return 0;
            }
            int change = 0;
            if (StringUtil.isNaturalNumber(splitted[1])) {
                change = Integer.parseInt(splitted[1]);
            } else {
                return 0;
            }
            if (change <= 0) {
                c.getPlayer().dropMessage(6, "必需輸入大於0的數字.");
                return 1;
            } else if (c.getPlayer().getRemainingAp() < change) {
                c.getPlayer().dropMessage(6, "AP不足.");
                return 1;
            } else if (getStat(c.getPlayer()) + change > ServerConfig.CHANNEL_PLAYER_MAXAP) {
                c.getPlayer().dropMessage(6, "能力值不能高於 " + ServerConfig.CHANNEL_PLAYER_MAXAP + ".");
                return 1;
            } else if (getStat(c.getPlayer()) + change < statLow) {
                c.getPlayer().dropMessage(6, "能力值不能低於 " + statLow + ".");
                return 1;
            }
            setStat(c.getPlayer(), getStat(c.getPlayer()) + change);
            c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() - change));
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
            c.getPlayer().dropMessage(6, (change >= 0 ? "增加" : "減少") + stat.name() + Math.abs(change) + "點");
            return 1;
        }
    }
}
