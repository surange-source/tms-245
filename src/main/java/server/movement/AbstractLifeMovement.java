package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

public class AbstractLifeMovement implements LifeMovement {

    private final int duration;
    private final int newState;
    private final int type;
    private final byte unknownByte;

    public AbstractLifeMovement(int type, int newState, int duration, byte unknownByte) {
        this.type = type;
        this.newState = newState;
        this.duration = duration;
        this.unknownByte = unknownByte;
    }

    public final int getType() {
        return this.type;
    }

    @Override
    public final int getDuration() {
        return duration;
    }

    @Override
    public final int getNewState() {
        return newState;
    }

    public final byte getUnknownByte() {
        return unknownByte;
    }

    public void serialize(final MaplePacketLittleEndianWriter mplew) {
        mplew.write(this.type);
        mplew.write(this.newState);
        mplew.writeShort(this.duration);
        mplew.write(this.unknownByte);
    }
}
