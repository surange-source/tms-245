package handling;

import client.MapleClient;
import handling.channel.ChannelServer;
import tools.data.MaplePacketReader;

@FunctionalInterface
public interface MaplePacketHandler {
    void handlePacket(MaplePacketReader slea, MapleClient c, ChannelServer cs);
}
