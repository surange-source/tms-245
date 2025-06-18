/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleCharacterUtil;
import client.MapleClient;
import packet.MaplePacketCreator;
import tools.Pair;
import packet.LoginPacket;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class ShowAccCash {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        int accId = slea.readInt(); //帳號ID
        if (c.getAccID() == accId) {
            if (c.getPlayer() != null) {
                c.announce(MaplePacketCreator.showPlayerCash(c.getPlayer()));
            } else {
                Pair<Integer, Integer> cashInfo = MapleCharacterUtil.getCashByAccId(accId);
                if (cashInfo == null) {
                    c.sendEnableActions();
                    return;
                }
                c.announce(LoginPacket.ShowAccCash(cashInfo.getLeft(), cashInfo.getRight()));
            }
        }
    }
}
