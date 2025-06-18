package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public final class FamiliarSpawnedValuePacket implements IFamiliarPacket {
    private int value;

    public FamiliarSpawnedValuePacket(final int value) {
        this.value = value;
    }

    @Override
    public int getSubType() {
        return 4;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(this.value);
        mplew.writeInt(0);
    }
}
