package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public final class RelativeLifeMovement extends AbstractLifeMovement {

    private Point position;
    private short u1, u2, u3;

    public RelativeLifeMovement(int type, int duration, int newstate, byte un) {
        super(type, newstate, duration, un);
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter mplew) {
        mplew.write(getType());
        mplew.writePos(position);
        if (getType() == 21 || getType() == 22) {
            mplew.writeShort(u1);
        }
        if (getType() == 61) {
            mplew.writeShort(u2);
            mplew.writeShort(u3);
        }
        mplew.write(getNewState());
        mplew.writeShort(getDuration());
        mplew.write(getUnknownByte());
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    public void setU3(short u3) {
        this.u3 = u3;
    }

    public void setU2(short u2) {
        this.u2 = u2;
    }

    public void setU1(short u1) {
        this.u1 = u1;
    }
}
