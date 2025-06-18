package handling.login.handler;

import client.MapleClient;
import client.MapleJob;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.HexTool;
import tools.StringUtil;
import tools.data.MaplePacketReader;

public class ClientErrorLogHandler {

    private static final Logger log = LogManager.getLogger("PacketErrorLog");

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        if (slea == null) {
            return;
        }
        byte[] packet = slea.read((int) slea.available());
        String AccountName = "null";
        String charName = "null";
        String charLevel = "null";
        String charJob = "null";
        String Map = "null";
        try {
            AccountName = c.getAccountName();
        } catch (Throwable e) {
        }
        try {
            charName = c.getPlayer().getName();
        } catch (Throwable e) {
        }
        try {
            charLevel = String.valueOf(c.getPlayer().getLevel());
        } catch (Throwable e) {
        }
        try {
            charJob = MapleJob.getTrueNameById(c.getPlayer().getJobWithSub()) + "(" + String.valueOf(c.getPlayer().getJob()) + ")";
        } catch (Throwable e) {
        }
        try {
            Map = c.getPlayer().getMap().toString();
        } catch (Throwable e) {
        }
        if ("null".equals(AccountName)) {
            return;
        }
        log.error("\r\n"
                + "帳號:" + AccountName + "\r\n"
                + "角色:" + charName + "(等級:" + charLevel + ")" + "\r\n"
                + "職業:" + charJob + "\r\n"
                + "地圖:" + Map + "\r\n"
                + "錯誤類型: ClientError\r\n"
                + (packet.length < 1 ? "" : (HexTool.toString(packet) + "\r\n"))
                + (packet.length < 1 ? "" : (HexTool.toStringFromAscii(packet) + "\r\n")));
    }
}
