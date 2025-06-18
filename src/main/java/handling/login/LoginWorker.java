package handling.login;

import client.MapleClient;
import client.MapleEnumClass;
import configs.ServerConfig;
import handling.channel.ChannelServer;
import handling.login.handler.LogoutWorldHandler;
import handling.login.handler.WorldInfoRequestHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.Timer.PingTimer;
import packet.MaplePacketCreator;
import packet.LoginPacket;

import java.util.Map;
import java.util.Map.Entry;

public class LoginWorker {

    private static final Logger log = LogManager.getLogger(LoginWorker.class);
    private static long lastUpdate = 0;

    public static void registerClient(final MapleClient c, boolean useKey) {
        if (ServerConfig.WORLD_ONLYADMIN && !c.isGm() && !c.isLocalhost()) {
            c.announce(MaplePacketCreator.serverNotice(1, "當前伺服器設定只能管理員進入遊戲.\r\n我們目前在修復幾個問題.\r\n請稍後再試."));
            c.announce(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_DEFINITION_INFO));
            return;
        }
        if (System.currentTimeMillis() - lastUpdate > 600000) { // Update once every 10 minutes
            lastUpdate = System.currentTimeMillis();
            Map<Integer, Integer> load = ChannelServer.getChannelLoad();
            int usersOn = 0;
            if (load == null || load.size() <= 0) { // In an unfortunate event that client logged in before load
                lastUpdate = 0;
                c.announce(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT));
                return;
            }
            double loadFactor = ServerConfig.LOGIN_USERLIMIT / ((double) LoginServer.getUserLimit() / load.size() / 100);
            for (Entry<Integer, Integer> entry : load.entrySet()) {
                usersOn += entry.getValue();
                load.put(entry.getKey(), Math.min(ServerConfig.LOGIN_USERLIMIT, (int) (entry.getValue() * loadFactor)));
            }
            LoginServer.setLoad(load, usersOn);
            lastUpdate = System.currentTimeMillis();
        }
        if (c.finishLogin() == 0) {
            if (useKey) {
                LogoutWorldHandler.handlePacket(c);
                c.announce(LoginPacket.getAuthSuccessRequest(c, true));
            } else {
                c.announce(LoginPacket.getAuthSuccessRequest(c, false));
                LogoutWorldHandler.handlePacket(c);
                WorldInfoRequestHandler.handlePacket((byte) -1, c);
            }

            c.setIdleTask(PingTimer.getInstance().schedule(c.getSession()::close, 10 * 60 * 10000));
        } else {
            c.announce(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT));
        }
    }
}
