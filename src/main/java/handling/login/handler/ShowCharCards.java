/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import packet.LoginPacket;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class ShowCharCards {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        int accId = slea.readInt(); //帳號ID
        if (!c.isLoggedIn() || c.getAccID() != accId) {
            c.getSession().close();
            return;
        }
        c.announce(LoginPacket.showCharCards(c.getAccCardSlots()));
    }
}
