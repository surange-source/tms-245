/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleCharacterUtil;
import client.MapleClient;
import handling.login.LoginInformationProvider;
import packet.LoginPacket;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class CheckCharNameHandler {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        String name = slea.readMapleAsciiString();
        boolean nameUsed;
        if (MapleCharacterUtil.canCreateChar(name, c.isGm())) {
            if (LoginInformationProvider.getInstance().isForbiddenName(name)) {
                nameUsed = !c.isGm();
            } else {
                nameUsed = false;
            }
        } else {
            nameUsed = true;
        }
        c.announce(LoginPacket.charNameResponse(name, nameUsed));
    }
}
