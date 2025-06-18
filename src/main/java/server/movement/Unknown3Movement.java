package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

public class Unknown3Movement extends AbstractLifeMovement {

    public int aSt;

    public Unknown3Movement(final int n, final byte b, final int n2, final byte b2) {
        super(n, b, n2, b2);
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter mplew) {
        mplew.write(super.getType());
        mplew.writeInt(this.aSt);
        mplew.write(super.getNewState());
        mplew.writeShort(super.getDuration());
        mplew.write(super.getUnknownByte());
    }

}
