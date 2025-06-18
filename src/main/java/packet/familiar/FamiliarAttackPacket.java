package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

import java.util.Map;

public final class FamiliarAttackPacket implements IFamiliarPacket {
    private int anInt;
    private Map<Integer, Integer> map;

    public FamiliarAttackPacket(final int n, final Map<Integer, Integer> map) {
        this.map = map;
        this.anInt = n;
    }

    @Override
    public int getSubType() {
        return 5;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(anInt);
        mplew.writeReversedVarints(map.size());
        for (final Map.Entry<Integer, Integer> entry : map.entrySet()) {
            mplew.writeInt(entry.getKey());
            mplew.write(2);
            mplew.writeInt(entry.getValue());
        }
        mplew.write(0);
        mplew.write(0);
    }
}
