package packet.familiar;

import client.MonsterFamiliar;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;

public class FamiliarSpawnPacket implements IFamiliarPacket {
    private final MonsterFamiliar familiar;
    private final Point pos;

    public FamiliarSpawnPacket(MonsterFamiliar familiar, Point pos) {
        this.familiar = familiar;
        this.pos = pos;
    }

    @Override
    public int getSubType() {
        return 4;
    }

    @Override
    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        familiar.writePacket(mplew);

        mplew.writeShort(5);//type
        mplew.writePosInt(pos);

        mplew.writeShort(6);
        mplew.writeInt(2000);

        mplew.writeShort(7);
        mplew.writeInt(2000);
    }
}
