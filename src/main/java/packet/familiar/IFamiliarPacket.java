package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public interface IFamiliarPacket {

    int getSubType();

    void writePacket(final MaplePacketLittleEndianWriter mplew);
}
