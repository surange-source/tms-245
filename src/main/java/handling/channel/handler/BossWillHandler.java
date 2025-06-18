package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import handling.opcode.SendPacketOpcode;
import packet.MobPacket;
import server.maps.field.BossWillField;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

public class BossWillHandler {
    public static void WillBeholderHit(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        if (player.getMap() instanceof BossWillField) {
            player.modifyMoonlightValue(-3);
        }
    }

    public static void UseMoonlight(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        if (player.getMap() instanceof BossWillField) {
            switch (player.getMap().getFieldType()) {
                case 182: {
                    c.announce(MobPacket.WillSkillAction(8880344, (player.getPosition().y > 0) ? 6 : 0));
                    break;
                }
                case 184: {
                    ((BossWillField)player.getMap()).clearNarrowWeb();
                    break;
                }
            }
            final MaplePacketLittleEndianWriter hh;
            (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.MoonlightCooldown);
            hh.writeInt(15000);
            c.announce(hh.getPacket());
            player.modifyMoonlightValue(-30);
        }
    }

    public static void WillNarrowWebDamage(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) return;
        if (player.getMap() instanceof BossWillField) {
            slea.readInt();
            if (slea.readByte() == 0) {
                player.addHPMP(-30, 0);
            }
        }
    }
}
