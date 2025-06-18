package handling.channel.handler;

import client.MapleCharacter;
import tools.data.MaplePacketReader;
import packet.MobPacket;

public class LucidHandler {

    public static void handleSpecialAttackEnd(MaplePacketReader slea, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        player.send(MobPacket.lucidSpecialHorn(false, 0, true));
        player.send(MobPacket.lucidFieldFly(false));
        player.send(MobPacket.lucidFieldFoothold(true, player.getMap().getLachelnList()));
    }


    public static void handleSpecialHorn(MaplePacketReader slea, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        player.getMap().broadcastMessage(player, MobPacket.lucidSpecialHorn(true, 0, slea.readByte() > 0), true);
    }
}
