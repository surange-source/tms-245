package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public final class UnknownMovement extends AbstractLifeMovement {

    private Point pixelsPerSecond;
    private Point position;

    public UnknownMovement(int type, int duration, int newstate, byte b) {
        super(type, newstate, duration, b);
    }

    public void setPixelsPerSecond(Point wobble) {
        this.pixelsPerSecond = wobble;
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter lew) {
        lew.write(getType());
        lew.writePos(position);
        lew.writePos(pixelsPerSecond);
        lew.write(getNewState());
        lew.writeShort(getDuration());
        lew.write(getUnknownByte());
    }
}
