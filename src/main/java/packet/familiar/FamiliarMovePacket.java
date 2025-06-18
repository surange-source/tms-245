package packet.familiar;

import packet.PacketHelper;
import server.movement.LifeMovementFragment;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.List;


public final class FamiliarMovePacket implements IFamiliarPacket {
    private final int gatherDuration, nVal1;
    private final Point oPos, mPos;
    private final List<LifeMovementFragment> res;

    public FamiliarMovePacket(final int gatherDuration, final int nVal1, final Point oPos, final Point mPos, final List<LifeMovementFragment> res) {
        this.gatherDuration = gatherDuration;
        this.nVal1 = nVal1;
        this.oPos = oPos;
        this.mPos = mPos;
        this.res = res;
    }

    @Override
    public int getSubType() {
        return 2;
    }

    @Override
    public void writePacket(final MaplePacketLittleEndianWriter mplew) {
        MaplePacketLittleEndianWriter packet = new MaplePacketLittleEndianWriter();
        PacketHelper.serializeMovementList(packet, gatherDuration, nVal1, oPos, mPos, res, null);
        packet.write(0);

        mplew.writeReversedVarints(packet.getPacket().length);
        mplew.write(packet.getPacket());
    }
}
