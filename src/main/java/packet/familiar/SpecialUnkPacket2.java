package packet.familiar;

import tools.data.MaplePacketLittleEndianWriter;

public class SpecialUnkPacket2 implements IFamiliarPacket {

    private final int nUnkValue;
    private final int cid;
    public SpecialUnkPacket2(int nUnkValue, int cid) {
        this.nUnkValue = nUnkValue;
        this.cid = cid;
    }

    @Override
    public int getSubType() {
        return 2;
    }

    @Override
    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(nUnkValue);
        mplew.writeInt(cid);
    }
}
