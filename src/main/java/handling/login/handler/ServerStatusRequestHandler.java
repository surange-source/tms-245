/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import configs.ServerConfig;
import constants.ServerConstants;
import handling.login.LoginServer;
import packet.LoginPacket;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class ServerStatusRequestHandler {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        slea.readByte();
        int n = slea.readInt();

        /*
         * 0 - 沒有消息
         * 1 - 當前世界連接數量較多，這可能會導致登錄遊戲時有些困難。
         * 2 - 當前世界上的連接已到達最高限制。請選擇別的伺服器進行遊戲或稍後再試。
         */
        int numPlayer = LoginServer.getUsersOn();
        int userLimit = LoginServer.getUserLimit();
        ServerConstants.MapleServerName server = ServerConstants.MapleServerName.getByOrdinal(ServerConfig.LOGIN_SERVERFLAG);
        if (numPlayer >= userLimit) {
            c.announce(LoginPacket.getServerStatus(server.getValue(), 2));
        } else if (numPlayer >= userLimit * .8) {
            c.announce(LoginPacket.getServerStatus(server.getValue(), 1));
        } else {
            c.announce(LoginPacket.getServerStatus(server.getValue(), 0));
        }
    }
}
