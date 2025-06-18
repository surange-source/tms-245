package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public class InnerStormSkillEffectPacket implements IFamiliarPacket {
    private int speed;

    public InnerStormSkillEffectPacket(final int speed) {
        this.speed = speed;
    }

    @Override
    public int getSubType() {
        return 5;
    }

    @Override
    public final void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(this.speed);
    }
}
