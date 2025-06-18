package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public class InnerStormSkillValuePacket implements IFamiliarPacket {
    private int value;

    public InnerStormSkillValuePacket(final int value) {
        this.value = value;
    }

    @Override
    public int getSubType() {
        return 4;
    }

    @Override
    public final void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(this.value);
    }
}
