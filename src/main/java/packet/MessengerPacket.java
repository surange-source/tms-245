/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.MapleCharacter;
import handling.opcode.SendPacketOpcode;
import handling.world.WorldAllianceService;
import handling.world.WorldGuildService;
import handling.world.guild.MapleGuild;
import handling.world.guild.MapleGuildAlliance;
import handling.world.messenger.MessengerRankingWorker;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.DateUtil;
import tools.data.MaplePacketLittleEndianWriter;

/**
 * @author PlayDK
 */
public class MessengerPacket {

    private static final Logger log = LogManager.getLogger(MessengerPacket.class);

    /*
     * 增加聊天招待的角色
     */
    public static byte[] addMessengerPlayer(String from, MapleCharacter chr, int position, int channel) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x00);
        mplew.write(position);
        mplew.writeInt(0);
        PacketHelper.addCharLook(mplew, chr, true, chr.isBeta());
        mplew.writeMapleAsciiString(from);
        mplew.write(channel);
        mplew.write(position); //難道是位置？
        chr.writeJobData(mplew); //職業ID

        return mplew.getPacket();
    }

    /*
     * 同意加入聊天招待
     * 這個是發送在聊天招待裡面的位置
     */
    public static byte[] joinMessenger(int position) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x01);
        mplew.write(position);

        return mplew.getPacket();
    }

    /*
     * 聊天招待
     * 玩家退出
     */
    public static byte[] removeMessengerPlayer(int position) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x02);
        mplew.write(position);

        return mplew.getPacket();
    }

    /*
     * 收到玩家的聊天邀請
     */
    public static byte[] messengerInvite(String from, int messengerId, int channel) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x03);
        mplew.writeMapleAsciiString(from);
        mplew.writeInt(0);
        mplew.write(channel);
        mplew.writeInt(messengerId);
        mplew.write(0x00);

        return mplew.getPacket();
    }

    /*
     * 聊天招待說話
     */
    public static byte[] messengerChat(MapleCharacter chr, String text, String postxt) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x06);
        mplew.writeMapleAsciiString(text);
        mplew.writeMapleAsciiString(postxt);
        PacketHelper.addChaterName(mplew, chr.getName(), text, chr.getId());
        return mplew.getPacket();
    }

    public static byte[] updateMessengerPlayer(String from, MapleCharacter chr, int position, int channel) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x08);
        mplew.write(position);
        PacketHelper.addCharLook(mplew, chr, true, chr.isBeta());
        //mplew.writeMapleAsciiString(from);
        //mplew.write(0x00); //是否寫職業ID 0x01 為需要寫
        //mplew.writeInt(0x00); //職業ID 上面為1時就要寫職業ID

        return mplew.getPacket();
    }

    /*
     * 聊天招待中給玩家加好感度的返回
     */
    public static byte[] giveLoveResponse(int mode, String charName, String targetName) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x0B);
        /*
         * 0x00 'xxxx'成功提升了'xxxx'的好感度。
         * 0x01 由於未知原因，提升好感度失敗。
         * 0x02 今天之內無法再次提升'xxxx'的好感度。
         */
        mplew.write(mode);
        mplew.writeMapleAsciiString(charName);
        mplew.writeMapleAsciiString(targetName);

        return mplew.getPacket();
    }

    /*
     * 在聊天招待中查看玩家的信息
     */
    public static byte[] messengerPlayerInfo(MapleCharacter chr) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x0C);
        mplew.writeMapleAsciiString(chr.getName()); //角色名字
        mplew.writeInt(chr.getLevel()); //等級
        chr.writeJobData(mplew); //職業
        mplew.writeInt(chr.getFame()); //人氣
        mplew.writeInt(chr.getLove()); //好感度
        if (chr.getGuildId() <= 0) {
            mplew.writeMapleAsciiString("-");
            mplew.writeMapleAsciiString("");
        } else {
            MapleGuild guild = WorldGuildService.getInstance().getGuild(chr.getGuildId());
            if (guild != null) {
                mplew.writeMapleAsciiString(guild.getName());
                if (guild.getAllianceId() > 0) {
                    MapleGuildAlliance alliance = WorldAllianceService.getInstance().getAlliance(guild.getAllianceId());
                    if (alliance != null) {
                        mplew.writeMapleAsciiString(alliance.getName());
                    } else {
                        mplew.writeMapleAsciiString("");
                    }
                } else {
                    mplew.writeMapleAsciiString("");
                }
            } else {
                mplew.writeMapleAsciiString("-");
                mplew.writeMapleAsciiString("");
            }
        }
        mplew.write(0x00); //未知

        return mplew.getPacket();
    }

    /*
     * 聊天招待中私聊
     */
    public static byte[] messengerWhisper(String nameFrom, String chatText) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(0x0F);
        mplew.writeMapleAsciiString(nameFrom);
        mplew.writeMapleAsciiString(chatText);

        return mplew.getPacket();
    }

    public static byte[] messengerNote(String text, int mode, int mode2) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Messenger.getValue());
        mplew.write(mode);
        mplew.writeMapleAsciiString(text);
        mplew.write(mode2);

        return mplew.getPacket();
    }

    public static byte[] updateLove(int love) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AskAfterErrorAck.getValue());
        mplew.write(0);
        mplew.writeInt(love); //好感度
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.writeInt(0x03);

        return mplew.getPacket();
    }

    public static byte[] showLoveRank(int mode) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AskAfterErrorAck.getValue());
        mplew.write(mode);
        MessengerRankingWorker rank = MessengerRankingWorker.getInstance();
        for (int i = 0; i < 2; i++) {
            MapleCharacter player = rank.getRankingPlayer(i);
            mplew.write(player != null ? 1 : 0);
            if (player != null) {
                mplew.writeInt(player.getId());
                mplew.writeInt(player.getLove());
                mplew.writeLong(DateUtil.getFileTimestamp(rank.getLastUpdateTime(i)));
                mplew.writeMapleAsciiString(player.getName());
                PacketHelper.addCharLook(mplew, player, false, false);
            }
        }

        return mplew.getPacket();
    }
}
