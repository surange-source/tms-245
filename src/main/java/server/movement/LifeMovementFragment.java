package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

public interface LifeMovementFragment {

    void serialize(MaplePacketLittleEndianWriter lew);

}
