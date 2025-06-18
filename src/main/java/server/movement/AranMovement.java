package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

public class AranMovement implements LifeMovementFragment {

    private int[] cel;
    private final int ceg;

    public AranMovement(final int ceg) {
        this.cel = new int[7];
        for (int i = 0; i < this.cel.length; ++i) {
            this.cel[i] = 0;
        }
        this.ceg = ceg;
    }

    public final void aS(final int n, final int n2) {
        this.cel[(n > this.cel.length) ? 0 : n] = n2;
    }

    @Override
    public final void serialize(final MaplePacketLittleEndianWriter mplew) {
        mplew.write(this.ceg);
        int[] cel;
        for (int length = (cel = this.cel).length, i = 0; i < length; ++i) {
            mplew.writeShort(cel[i]);
        }
    }
}
