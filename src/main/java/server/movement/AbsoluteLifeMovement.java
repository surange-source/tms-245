package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public final class AbsoluteLifeMovement extends AbstractLifeMovement {

    private Point pixelsPerSecond, offset;
    private int newFH;
    private short un1;
    private Point position;
    private short unk161;

    public void setUn1(final short bTc) {
        this.un1 = bTc;
    }

    public AbsoluteLifeMovement(int type, int duration, int newstate, byte unknownByte) {
        super(type, newstate, duration, unknownByte);
    }

    public void setPixelsPerSecond(Point wobble) {
        this.pixelsPerSecond = wobble;
    }

    public void setOffset(Point wobble) {
        this.offset = wobble;
    }

    public int getNewFH() {
        return newFH;
    }

    public void setNewFH(short fh) {
        this.newFH = fh;
    }

    public void defaulted() {
        newFH = 0;
        pixelsPerSecond = new Point(0, 0);
        offset = new Point(0, 0);
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter mplew) {
        mplew.write(getType());
        mplew.writePos(getPosition());
        mplew.writePos(pixelsPerSecond);
        mplew.writeShort(newFH);
        if (this.getType() == 15 || this.getType() == 17) {
            mplew.writeShort(this.un1);
        }
        mplew.writePos(offset);
        mplew.writeShort(getUnk161());
        mplew.write(getNewState());
        mplew.writeShort(getDuration());
        mplew.write(getUnknownByte());
    }

    public Point getPosition() {
        return position;
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    public void setUnk161(short unk161) {
        this.unk161 = unk161;
    }

    public short getUnk161() {
        return unk161;
    }
}
