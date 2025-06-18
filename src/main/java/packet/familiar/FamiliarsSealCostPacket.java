package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public final class FamiliarsSealCostPacket implements IFamiliarPacket {
    private int cost;

    public FamiliarsSealCostPacket(final int cost) {
        this.cost = cost;
    }

    @Override
    public int getSubType() {
        return 10;
    }

    @Override
    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(cost);
    }
}
