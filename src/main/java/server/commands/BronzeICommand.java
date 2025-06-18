package server.commands;

import client.MapleClient;
import scripting.npc.NPCScriptManager;

public class BronzeICommand {

    /**
     * @return
     */
    public static PlayerRank getPlayerLevelRequired() {
        return PlayerRank.MVP銅牌I;
    }

    public static class 掉寶 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return "drops";
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9000366, "checkDrop");
            return 1;
        }
    }

    public static class 掉寶搜尋 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9000366, "searchDrop");
            return 1;
        }
    }

    public static class 輪迴 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9000366, "召喚輪迴碑石");
            return 1;
        }
    }

    public static class 搶圖 implements CommandExecute {

        @Override
        public String getShortCommand() {
            return null;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            NPCScriptManager.getInstance().start(c, 9000366, "防搶圖");
            return 1;
        }
    }
}