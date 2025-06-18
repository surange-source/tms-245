package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

import java.util.ArrayList;
import java.util.List;

public final class FamiliarTeamStatsPacket implements IFamiliarPacket {
    private List<Short> list = new ArrayList<>();

    public FamiliarTeamStatsPacket(List<Short> list) {
        if (list != null) {
            this.list = list;
        }
    }

    @Override
    public int getSubType() {
        return 8;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeShort(Math.min(list.size(), 3));
        int i = 1;
        for (short nVal : list) {
            mplew.writeShort(i++);
            mplew.writeShort(nVal); // 組合屬性 0~21
            if (i > 3) {
                break;
            }
        }
        mplew.writeShort(0);//终止循环
    }
}
