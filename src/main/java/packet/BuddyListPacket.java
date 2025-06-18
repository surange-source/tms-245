/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.BuddylistEntry;
import constants.enums.FriendOperationMode;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Collection;

/**
 * @author PlayDK
 */
public class BuddyListPacket {

    /**
     * Logger for this class.
     */
    private static final Logger log = LogManager.getLogger(BuddyListPacket.class);

    /*
     * 返回好友操作信息
     * 0x0B 好友目錄已滿了。
     * 0x0C 對方的好友目錄已滿了。
     * 0x0D 已經是好友。
     * 0x0E 不能把管理員加為好友。
     * 0x0F 沒登錄的角色。
     * 0x1E 還在對方的好友目錄中
     */
    public static byte[] buddylistMessage(int message) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(message);

        return mplew.getPacket();
    }

    public static byte[] updateBuddylist(Collection<BuddylistEntry> buddylist) {
        return updateBuddylist(buddylist, FriendOperationMode.FriendRes_LoadAccountIDOfCharacterFriend_Done.getValue());//更新
    }

    /*
     * 更新好友信息
     */
    public static byte[] updateBuddylist(Collection<BuddylistEntry> buddylist, int mode) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(mode);
        if (mode != FriendOperationMode.FriendRes_SetMessengerMode.getValue()) {
            mplew.writeInt(buddylist.size());
        }
        for (BuddylistEntry buddy : buddylist) {
            mplew.writeInt(buddy.getCharacterId());
            mplew.writeAsciiString(buddy.getName(), 15);
            mplew.write(buddy.isVisible() ? 0 : 1);//0普通好友不在線 2普通好友在線 4開啟帳號轉換,5離線賬號好友,7賬號好友在線
            mplew.writeInt(buddy.getChannel() == -1 ? -1 : (buddy.getChannel() - 1));
            mplew.writeAsciiString(buddy.getGroup(), 18); //V.116.修改以前 17位
            mplew.writeZeroBytes(295);
            /*
            mplew.writeInt(0); // buddy.getAccountId()
            mplew.writeAsciiString(buddy.getName(), 13);//別名
            mplew.writeHexString("00 AE 1A 0B 64 FC 34 11 10 0D AB 0F 68");
            mplew.writeAsciiString("", 15);//備註
            mplew.writeZeroBytes(247);
            */
        }
//        mplew.writeHexString("69 00 15 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 07 FF FF FF FF CE B4 D6 B8 B6 A8 C8 BA D7 E9 00 00 00 00 00 00 00 00 E9 C9 91 02 CB D1 CB F7 00 00 00 00 00 00 00 00 00 EC AA EC AA 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 05 FF FF FF FF CE B4 D6 B8 B6 A8 C8 BA D7 E9 00 00 00 00 00 00 00 00 79 0F D5 02 CA C7 00 00 00 00 00 00 00 00 00 00 00 B5 C4 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00");
        return mplew.getPacket();
    }

    /*
    * 更新好友完畢
     */
    public static byte[] updateBuddylistEnd() {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(FriendOperationMode.FriendRes_SetMessengerMode.getValue());
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 申請加好友
     */
    public static byte[] requestBuddylistAdd(int chrIdFrom, String nameFrom, int channel, int levelFrom, int jobFrom) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(FriendOperationMode.FriendRes_Invite.getValue());
        mplew.writeBool(false);
        mplew.writeInt(chrIdFrom);
        mplew.writeInt(0);
        mplew.writeMapleAsciiString(nameFrom);
        mplew.writeInt(levelFrom);
        mplew.writeInt(jobFrom);
        mplew.writeInt(0); //V.104新增 貌似是把職業的 Int 改為 Long ?

        mplew.writeInt(chrIdFrom);
        mplew.writeAsciiString(nameFrom, 15);
        mplew.write(1);
        mplew.writeInt(channel); //頻道
        mplew.writeAsciiString("未指定群組", 18);
        mplew.writeInt(0);
        mplew.writeAsciiString(nameFrom, 15);
        mplew.writeZeroBytes(276);
        return mplew.getPacket();
    }

    /*
     * 更新好友頻道信息
     */
    public static byte[] updateBuddyChannel(int chrId, int channel, String name) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(FriendOperationMode.FriendRes_Notify.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(0);
        mplew.write(0); //isVisible() 角色在商城和拍賣的時候為1
        mplew.writeInt(channel);
        mplew.write(0);
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 更新好友數量
     */
    public static byte[] updateBuddyCapacity(int capacity) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(FriendOperationMode.FriendRes_IncMaxCount_Done.getValue());
        mplew.write(capacity);

        return mplew.getPacket();
    }

    /*
     * 更新好友別名
     */
    public static byte[] updateBuddyNamer(BuddylistEntry buddylist, int mode) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(mode);
        mplew.writeInt(buddylist.getCharacterId());
        mplew.writeInt(buddylist.getCharacterId());
        mplew.writeInt(buddylist.getCharacterId());
        mplew.writeAsciiString(buddylist.getName(), 15);
        mplew.write(buddylist.isVisible() ? 7 : 5);//4開啟帳號轉換,5離線好友,7好友在線
        mplew.writeInt(buddylist.getChannel() == -1 ? -1 : (buddylist.getChannel() - 1));
        mplew.writeAsciiString(buddylist.getGroup(), 18); //V.116.修改以前 17位
        mplew.writeInt(buddylist.getCharacterId());
        mplew.writeAsciiString(buddylist.getName(), 15);//別名
        mplew.writeAsciiString("", 15);//備註        
        for (int i = 0; i < 64; i++) {
            mplew.writeInt(0);
        }
        mplew.writeZeroBytes(5);
        return mplew.getPacket();
    }

    /*
    * 拒絕好友
     */
    public static byte[] NoBuddy(int buddyid, int mode, boolean linkaccount) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(mode);
        mplew.writeBool(linkaccount);
        mplew.writeInt(buddyid);
        return mplew.getPacket();
    }

    /*
     * 好友信息
     */
    public static byte[] BuddyMess(int mode, String name) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FriendResult.getValue());
        mplew.write(mode);
        mplew.writeMapleAsciiString(name);
        return mplew.getPacket();
    }
}
