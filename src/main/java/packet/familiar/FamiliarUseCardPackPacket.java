package packet.familiar;

import tools.types.Pair;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.List;

public final class FamiliarUseCardPackPacket implements IFamiliarPacket {
    private List<Pair<Integer, Integer>> familiarids;

    public FamiliarUseCardPackPacket(final List<Pair<Integer, Integer>> familiarids) {
        this.familiarids = familiarids;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeReversedVarints(familiarids.size());
        for (final Pair<Integer, Integer> pair : this.familiarids) {
            mplew.writeInt(pair.left);
            mplew.write(pair.right);
            mplew.writeInt(0);
        }
    }

    public int getSubType() {
        return 10;
    }
}
