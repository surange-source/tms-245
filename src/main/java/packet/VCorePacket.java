package packet;

import client.MapleCharacter;
import client.VCoreSkillEntry;
import client.VMatrixSlot;
import handling.opcode.SendPacketOpcode;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Map;

public final class VCorePacket {

    public static byte[] updateVCoreList(MapleCharacter player, final boolean b, final int n, final int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VCORE_LIST_UPDATE.getValue());
        writeVCoreSkillData(mplew, player);
        mplew.writeInt(b ? 1 : 0);
        if (b) {
            mplew.writeInt(n);
            if (n != 2 && n != 4) {
                mplew.writeInt(n2);
            }
        }
        return mplew.getPacket();
    }

    public static byte[] showVCoreSkillExpResult(final int n1, final int expEnforce, final int currLevel, final int newLevel) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VCORE_SKILLEXP_RESULT.getValue());
        mplew.writeInt(n1);
        mplew.writeInt(expEnforce);
        mplew.writeInt(currLevel);
        mplew.writeInt(newLevel);
        return mplew.getPacket();
    }

    public static byte[] addVCorePieceResult(final int piece) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VCORE_ADD_PIECE_RESULT.getValue());
        mplew.writeInt(piece);
        return mplew.getPacket();
    }

    public static byte[] addVCoreSkillResult(final int vcoreid, final int level, final int skill1, final int skill2, final int skill3, final int nCount) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VCORE_ADD_SKILL_RESULT.getValue());
        mplew.writeInt(vcoreid);
        mplew.writeInt(level);
        mplew.writeInt(skill1);
        mplew.writeInt(skill2);
        mplew.writeInt(skill3);
        mplew.writeInt(nCount);
        return mplew.getPacket();
    }

    public static void writeVCoreSkillData(MaplePacketLittleEndianWriter mplew, MapleCharacter player) {
        Map<Integer, VCoreSkillEntry> vcoreSkills = player.getVCoreSkill();
        mplew.writeInt(vcoreSkills.size());
        for (Map.Entry<Integer, VCoreSkillEntry> it : vcoreSkills.entrySet()) {
            mplew.writeInt(it.getKey());
            mplew.writeInt(201327833);
            mplew.writeInt(it.getValue().getVcoreid());
            mplew.writeInt(it.getValue().getLevel());
            mplew.writeInt(it.getValue().getExp());
            mplew.writeInt(it.getValue().getSlot());
            mplew.writeInt(it.getValue().getSkill1());
            mplew.writeInt(it.getValue().getSkill2());
            mplew.writeInt(it.getValue().getSkill3());
            mplew.writeInt(it.getValue().getIndex());//V.153 new
            PacketHelper.addExpirationTime(mplew, it.getValue().getDateExpire());
            mplew.writeByte(0);//V.181 new
        }
        //V.153 new:
        mplew.writeInt(player.getVMatrixSlot().size());
        for (Map.Entry<Integer, VMatrixSlot> entry : player.getVMatrixSlot().entrySet()) {
            mplew.writeInt(entry.getValue().getIndex());
            mplew.writeInt(entry.getKey());
            mplew.writeInt(entry.getValue().getExtend());
            mplew.write(entry.getValue().getUnlock());
        }
        //end
    }

    public static byte[] showVCoreWindowVerifyResult(boolean success) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VCORE_WINDOW_RESULT.getValue());
        mplew.writeInt(2);
        mplew.write(success);
        return mplew.getPacket();
    }

    public static byte[] showVCoreItemUseEffect(int vcoreid, int level, int skill1, int skill2, int skill3) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.VCORE_ITEM_USE_EFFECT.getValue());
        mplew.writeInt(vcoreid);
        mplew.writeInt(level);
        mplew.writeInt(skill1);
        mplew.writeInt(skill2);
        mplew.writeInt(skill3);
        mplew.writeInt(vcoreid == 40000000 ? 2 : vcoreid == 10000024 ? 1 : 0);
        return mplew.getPacket();
    }
}
