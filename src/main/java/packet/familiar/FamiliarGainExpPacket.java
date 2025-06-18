package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

import java.util.Map;

public final class FamiliarGainExpPacket implements IFamiliarPacket {
    private Map<Integer, Integer> map;

    public FamiliarGainExpPacket(final Map<Integer, Integer> map) {
        this.map = map;
    }

    @Override
    public int getSubType() {
        return 7;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeReversedVarints(map.size());
        for (int integer : map.values()) {
            mplew.writeShort(integer);
        }
    }
}
