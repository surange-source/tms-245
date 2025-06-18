package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public class Unknown4Movement extends AbstractLifeMovement {

    private int newfh;
    private Point position;

    public Unknown4Movement(int type, int duration, int newstate, byte un) {
        super(type, newstate, duration, un);
    }

    public void setNewFH(int fh) {
        this.newfh = fh;
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter lew) {
        lew.write(getType());
        lew.writePos(position);
        lew.writeShort(newfh);
        lew.write(getNewState());
        lew.writeShort(getDuration());
        lew.write(getUnknownByte());
    }

    public void setPosition(Point position) {
        this.position = position;
    }
}
