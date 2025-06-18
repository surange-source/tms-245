package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public class ChairMovement extends AbstractLifeMovement {

    private int newfh, unk2;
    private Point position;

    public ChairMovement(int type, int duration, int newstate, byte un) {
        super(type, newstate, duration, un);
    }

    public void setUnk2(int unk2) {
        this.unk2 = unk2;
    }

    public void setNewFH(int fh) {
        this.newfh = fh;
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter lew) {
        lew.write(getType());
        lew.writePos(position);
        lew.writeShort(newfh);
        lew.writeInt(unk2);
        lew.write(getNewState());
        lew.writeShort(getDuration());
        lew.write(getUnknownByte());
    }

    public void setPosition(Point position) {
        this.position = position;
    }
}
