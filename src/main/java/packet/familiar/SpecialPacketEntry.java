package packet.familiar;

import client.MonsterFamiliar;
import packet.SpecialPacket.SpecialPacketType;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.ArrayList;
import java.util.List;

public final class SpecialPacketEntry {
    public SpecialPacketType packetType;
    public List<IFamiliarPacket> subPackets = new ArrayList<>();
    public MonsterFamiliar familiar;
    public int nUnkValue;

    public SpecialPacketEntry(final SpecialPacketType packetType, int nUnkValue) {
        this.packetType = packetType;
        this.nUnkValue = nUnkValue;
    }

    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        for (IFamiliarPacket packet : this.subPackets) {
            mplew.writeShort(packet.getSubType());
            packet.writePacket(mplew);
        }
        mplew.writeShort(0);
    }
}
