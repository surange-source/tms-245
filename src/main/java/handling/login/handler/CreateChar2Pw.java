/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleCharacterUtil;
import client.MapleClient;
import configs.Config;
import handling.login.LoginInformationProvider;
import packet.LoginPacket;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class CreateChar2Pw {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        final String Secondpw_Client = slea.readMapleAsciiString();
        if (!c.isLoggedIn() || loginFailCount(c) || c.getSecondPassword() == null) {
            c.getSession().close();
            System.err.println("伺服器主動斷開用戶端連結,調用位置: " + new java.lang.Throwable().getStackTrace()[0]);
            return;
        }
        if (Config.isDevelop() || c.CheckSecondPassword(Secondpw_Client)) {
            c.announce(LoginPacket.createCharResponse(0));
        } else {
            c.announce(LoginPacket.createCharResponse(20));
        }
    }

    private static boolean loginFailCount(MapleClient c) {
        c.loginAttempt++;
        return c.loginAttempt > 5;
    }
}
