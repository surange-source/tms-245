package handling.login.handler;

import client.MapleClient;
import configs.ServerConfig;
import constants.ServerConstants;
import handling.login.LoginServer;
import packet.LoginPacket;

public class WorldInfoRequestHandler {

    public static void handlePacket(byte world, MapleClient c) {
        c.announce(LoginPacket.getServerList(ServerConstants.MapleServerName.getByOrdinal(ServerConfig.LOGIN_SERVERFLAG), LoginServer.getLoad()));
        c.announce(LoginPacket.getEndOfServerList());
    }
}
