/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.login.handler;

import client.MapleClient;
import constants.JobConstants;
import constants.ServerConstants;
import handling.channel.ChannelServer;
import handling.login.JobType;
import handling.login.LoginServer;
import handling.world.World;
import packet.MaplePacketCreator;
import tools.data.MaplePacketReader;

/**
 * @author PlayDK
 */
public class CharSelectedHandler {

    private static boolean loginFailCount(MapleClient c) {
        c.loginAttempt++;
        return c.loginAttempt > 5;
    }

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        int charId = slea.readInt();
        if (!c.isLoggedIn() || loginFailCount(c) || !c.login_Auth(charId)) {
            c.sendEnableActions();
            return;
        }
        if (ChannelServer.getInstance(c.getChannel()) == null || c.getWorld() != 0) {
            c.getSession().close();
            return;
        }
        int job = c.getCharacterJob(charId);
        if (job > -1) {
            JobType jobt = JobType.getByJob(job);
            if (jobt == null || !ServerConstants.isOpenJob(jobt.name())) {
                c.dropMessage("該職業暫未開放,敬請期待!");
                c.sendEnableActions();
                return;
            }
        }
        if (c.getIdleTask() != null) {
            c.getIdleTask().cancel(true);
        }
        //c.announce(MaplePacketCreator.getWzCheck(LoginServer.getWzCheckPack()));
        String ip = c.getSessionIPAddress();
        LoginServer.putLoginAuth(charId, ip.substring(ip.indexOf('/') + 1, ip.length()), c.getTempIP(), c.getChannel(), c.getMac());
        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION, ip);
        World.clearChannelChangeDataByAccountId(c.getAccID());
        c.announce(MaplePacketCreator.getServerIP(c, ChannelServer.getInstance(c.getChannel()).getPort(), charId));
    }
}
