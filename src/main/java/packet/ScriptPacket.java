package packet;

import constants.enums.ScriptMessageType;
import handling.opcode.SendPacketOpcode;
import scripting.npc.NPCParamType;
import tools.data.MaplePacketLittleEndianWriter;

public final class ScriptPacket {

    public static void writeScriptMessageHeader(final MaplePacketLittleEndianWriter mplew, final byte typeID, final int npcID, final byte mode, final short endType, final byte b809) {
        writeScriptMessageHeader(mplew, typeID, npcID, false, 0, mode, endType, b809);
    }

    public static void writeScriptMessageHeader(final MaplePacketLittleEndianWriter mplew, final byte typeID, final int npcID, final boolean select, final int selectID, final byte mode, final short endType, final byte b) {
        mplew.writeShort(SendPacketOpcode.LP_ScriptMessage.getValue());
        mplew.writeInt(0);
        mplew.write(typeID);
        mplew.writeInt(npcID);
        mplew.writeBool(select);
        if (select) {
            mplew.writeInt(selectID);
        }
        mplew.write(mode);
        mplew.writeShort(endType);
        mplew.write(b);
    }

    public static byte[] sendSay(final byte typeID, final int npcID, final boolean select, final int selectID, final int n3, final short endType, final boolean b3, final boolean b4, final String message) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        writeScriptMessageHeader(mplew, typeID, npcID, select, selectID, ScriptMessageType.SAY.getType(), endType, (byte)1);
        mplew.writeInt(0);
        if ((endType & NPCParamType.ANOTHER_NPC.getType()) != 0x0) {
            mplew.writeInt(n3);
        }
        mplew.writeMapleAsciiString(message);
        mplew.writeBool(b3);
        mplew.writeBool(b4);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] sayImage(final byte typeID, final int npcID, final short endType, final String[] array) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        writeScriptMessageHeader(mplew, typeID, npcID, ScriptMessageType.SAY_IMAGE.getType(), endType, (byte)1);
        mplew.write(array.length);
        for (int i = 0; i < array.length; ++i) {
            mplew.writeMapleAsciiString(array[i]);
        }
        return mplew.getPacket();
    }

    public static byte[] askSelectMenu(final byte typeID, final int selectID, final int mode, final String[] selectionList) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        writeScriptMessageHeader(mplew, typeID, 0, true, selectID, ScriptMessageType.ASK_SELECT_MENU.getType(), (short)0, (byte)0);
        mplew.writeInt(mode);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(selectionList != null ? selectionList.length : 0);
        for (int i = 0; selectionList != null && i < selectionList.length; ++i) {
            mplew.writeMapleAsciiString(selectionList[i]);
        }
        return mplew.getPacket();
    }


}
