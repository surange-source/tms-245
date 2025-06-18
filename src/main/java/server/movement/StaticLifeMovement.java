/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

/**
 * @author admin
 */
public final class StaticLifeMovement extends AbstractLifeMovement {

    private Point pixelsPerSecond;
    private Point position;
    private int newfh;

    public StaticLifeMovement(int type, int duration, int newstate, byte b) {
        super(type, newstate, duration, b);
    }

    public void setPixelsPerSecond(Point wobble) {
        this.pixelsPerSecond = wobble;
    }

    public void setNewFH(short fh) {
        this.newfh = fh;
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter slea) {
        slea.write(getType());
        slea.writePos(position);
        slea.writePos(pixelsPerSecond);
        slea.writeShort(newfh);
        slea.write(getNewState());
        slea.writeShort(getDuration());
        slea.write(getUnknownByte());
    }

    public void setPosition(Point position) {
        this.position = position;
    }
}
