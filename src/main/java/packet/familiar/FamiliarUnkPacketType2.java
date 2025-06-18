package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public final class FamiliarUnkPacketType2 implements IFamiliarPacket {

    private int value;

    public FamiliarUnkPacketType2(int value) {
        this.value = value;
    }

    @Override
    public int getSubType() {
        return 11;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(value);
    }
}
