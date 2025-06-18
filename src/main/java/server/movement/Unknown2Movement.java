package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public final class Unknown2Movement extends AbstractLifeMovement {

    private Point pixelsPerSecond;
    private Point position;
    private short un1;

    public Unknown2Movement(final int type, final int duration, final int newState, byte b) {
        super(type, newState, duration, b);
    }

    public void setPixelsPerSecond(Point wobble) {
        this.pixelsPerSecond = wobble;
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    public void setUn1(final short bTc) {
        this.un1 = bTc;
    }

    public void serialize(final MaplePacketLittleEndianWriter mplew) {
        mplew.write(getType());
        mplew.writePos(position);
        mplew.writePos(pixelsPerSecond);
        mplew.writeShort(un1);
        mplew.write(getNewState());
        mplew.writeShort(getDuration());
        mplew.write(getUnknownByte());
    }

}
