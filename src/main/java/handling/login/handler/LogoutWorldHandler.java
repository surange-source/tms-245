/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import configs.ServerConfig;
import constants.ServerConstants;
import handling.login.LoginServer;
import java.util.LinkedList;
import java.util.List;
import packet.LoginPacket;
import packet.MaplePacketCreator;
import tools.Pair;

public class LogoutWorldHandler {

    public static void handlePacket(MapleClient c) {
        List<Pair<String, Integer>> bgList = new LinkedList<>();
        bgList.add(LoginServer.getRandomWorldSelectBG());
        c.announce(MaplePacketCreator.spawnFlags(bgList));
    }
}
