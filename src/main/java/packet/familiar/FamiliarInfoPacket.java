package packet.familiar;

import client.MonsterFamiliar;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Collection;

public final class FamiliarInfoPacket implements IFamiliarPacket {
    private Collection<MonsterFamiliar> familiars;

    public FamiliarInfoPacket(final Collection<MonsterFamiliar> jj) {
        this.familiars = jj;
    }

    @Override
    public int getSubType() {
        return 5;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        mplew.writeShort(this.familiars == null ? 0 : this.familiars.size());
        if (this.familiars != null) {
            int n = 0;
            for (final MonsterFamiliar familiar : this.familiars) {
                mplew.writeShort(++n);
                familiar.writePacket(mplew);
            }
        }
        mplew.writeShort(0);//终止循环
    }
}
