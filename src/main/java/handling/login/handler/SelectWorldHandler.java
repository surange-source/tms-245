/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleEnumClass;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.login.LoginWorker;
import handling.world.World;
import packet.LoginPacket;
import packet.MaplePacketCreator;
import tools.Pair;
import tools.data.MaplePacketReader;

import java.util.List;

/**
 * @author PlayDK
 */
public class SelectWorldHandler {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        slea.readByte();
        int server = slea.readByte() & 0xFF; //V.106修改
        int channel = slea.readByte() + 1;
        boolean useKey = slea.readByte() == 1;
        if (useKey) {
            slea.skip(1);
            Pair<String, Integer> loginAuthKey = LoginServer.getLoginAuthKey(slea.readMapleAsciiString(), true);
            if (loginAuthKey == null) {
                c.getSession().close();
                return;
            }
            c.login(loginAuthKey.getLeft(), "", false, true);
            c.loginAttempt = 0;
            LoginWorker.registerClient(c, true);
        } else if (!c.isLoggedIn()) {
            c.getSession().close();
            return;
        }

        ChannelServer toch = ChannelServer.getInstance(channel);
        if (!World.isChannelAvailable(channel) || toch == null) { //TODOO: MULTI WORLDS
            c.announce(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_CONNECTION_BUSY)); //cannot process so many
            return;
        }

        System.out.println("用戶地址: " + c.getSessionIPAddress() + " 連接到世界伺服器: " + server + " 頻道: " + channel);

        c.setChannel(channel);
        List<MapleCharacter> chars = c.loadCharacters(server);
        if (chars != null && ChannelServer.getInstance(channel) != null) {
            c.setWorld(server);
            c.setChannel(channel);
//            if (useKey) {
//                c.announce(LoginPacket.getAuthSuccessRequest(c, true));
//            }
            //c.announce(LoginPacket.EventCheck());
            c.announce(LoginPacket.SetClientKey());
            c.announce(LoginPacket.SetAccountInfo(c.getAccountName()));
            c.announce(LoginPacket.SetPhysicalWorldID(server));
            c.announce(LoginPacket.SetAccountInfo(c.getAccountName()));
            c.announce(LoginPacket.getCharList(chars, c.getAccCharSlots(), c));
//            c.announce(LoginPacket.getCreatCharAuth());
            //c.announce(LoginPacket.getChannelSelected());
        } else {
            c.getSession().close();
        }
    }
}
