package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public class SpecialUnkPacket1 implements IFamiliarPacket {

    @Override
    public int getSubType() {
        return 1;
    }

    @Override
    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeZeroBytes(20);
    }
}
