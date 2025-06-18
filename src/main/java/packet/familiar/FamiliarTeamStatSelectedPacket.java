package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public final class FamiliarTeamStatSelectedPacket implements IFamiliarPacket {

    private short value;

    public FamiliarTeamStatSelectedPacket(short value) {
        this.value = value;
    }

    @Override
    public int getSubType() {
        return 7;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeShort(value); // 0~2 已選擇的組合屬性
    }
}
