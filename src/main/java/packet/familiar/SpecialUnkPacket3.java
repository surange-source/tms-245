package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public class SpecialUnkPacket3 implements IFamiliarPacket {

    private final int nValue;
    public SpecialUnkPacket3(int nValue) {
        this.nValue = nValue;
    }

    @Override
    public int getSubType() {
        return 3;
    }

    @Override
    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(nValue);
    }
}
