/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import client.MapleEnumClass;
import packet.LoginPacket;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class SetGenderHandler {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        String username = slea.readMapleAsciiString();
        String secondPassword = slea.readMapleAsciiString();
        byte gender = slea.readByte();
        if (!c.getAccountName().equals(username) || c.getSecondPassword() != null || gender < 0 || gender > 1) {
            c.announce(LoginPacket.genderChanged(false));
            return;
        }
        if (secondPassword.length() >= 5) {
            c.setGender(gender);
            c.setSecondPassword(secondPassword);
            c.updateSecondPassword();
            c.announce(LoginPacket.genderChanged(true));
            c.announce(LoginPacket.getLoginFailed(MapleEnumClass.AuthReply.GAME_PROTOCOL_INFO));
        } else {
            c.announce(LoginPacket.genderChanged(false));
        }
    }
}
