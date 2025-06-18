package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public final class FamiliarUpgradePacket implements IFamiliarPacket {
    @Override
    public int getSubType() {
        return 9;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(0);
    }
}
