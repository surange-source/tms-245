/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.inventory.Item;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.data.MaplePacketLittleEndianWriter;

/**
 * @author PlayDK
 */
public class WhisperPacket {

    private static final Logger log = LogManager.getLogger(WhisperPacket.class);

    public static byte[] getWhisper(String sender, int channel, String text, Item item) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Whisper.getValue());
        mplew.write(18);
        mplew.writeMapleAsciiString(sender);
        mplew.writeInt(0);
        mplew.write(channel - 1);
        mplew.write(0);
        mplew.writeMapleAsciiString(text);
        PacketHelper.addChaterName(mplew, sender, text);
        boolean achievement = false;
        mplew.writeInt(item != null ? 1 : achievement ? 2 : 0);
        if (item == null && achievement) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeDouble(0);
        } else if (item != null) {
            mplew.write(1);
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
            mplew.writeMapleAsciiString(item.getName());
        }
        return mplew.getPacket();
    }

    public static byte[] getWhisperReply(String target, byte reply) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_Whisper.getValue());
        mplew.write(10); // whisper?
        mplew.writeMapleAsciiString(target);
        mplew.write(reply);//  0x0 = cannot find char, 0x1 = success

        return mplew.getPacket();
    }

    public static byte[] getFindReplyWithMap(String target, int mapid, boolean buddy) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Whisper.getValue());
        mplew.write(buddy ? 72 : 9);
        mplew.writeMapleAsciiString(target);
        mplew.write(1);
        mplew.writeInt(mapid);
        mplew.writeInt(0);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] getFindReply(String target, int channel, boolean buddy) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Whisper.getValue());
        mplew.write(buddy ? 72 : 9);
        mplew.writeMapleAsciiString(target);
        mplew.write(3);
        mplew.writeInt(channel - 1);

        return mplew.getPacket();
    }

    public static byte[] getFindReplyWithCS(String target, boolean buddy) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Whisper.getValue());
        mplew.write(buddy ? 72 : 9);
        mplew.writeMapleAsciiString(target);
        mplew.write(2);
        mplew.writeInt(-1);

        return mplew.getPacket();
    }

    public static byte[] getFindReplyWithMTS(String target, boolean buddy) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Whisper.getValue());
        mplew.write(buddy ? 72 : 9);
        mplew.writeMapleAsciiString(target);
        mplew.write(0);
        mplew.writeInt(-1);

        return mplew.getPacket();
    }
}
