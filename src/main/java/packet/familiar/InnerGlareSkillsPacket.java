package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

import java.util.List;

public class InnerGlareSkillsPacket implements IFamiliarPacket {
    private List<Integer> buffIds;

    public InnerGlareSkillsPacket(final List<Integer> buffIds) {
        this.buffIds = buffIds;
    }

    @Override
    public int getSubType() {
        return 2;
    }

    @Override
    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeReversedVarints(buffIds.size());
        for (int skillId : buffIds) {
            mplew.writeInt(skillId);
        }
    }
}
