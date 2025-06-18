/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Item;
import constants.enums.MiniRoomOptType;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.MapleTrade;
import tools.data.MaplePacketLittleEndianWriter;

/**
 * @author PlayDK
 */
public class TradePacket {

    private static final Logger log = LogManager.getLogger(TradePacket.class);

    /*
     * 玩家交易邀請
     */
    public static byte[] getTradeInvite(MapleCharacter chr, boolean isCash) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.MRP_Invite.getValue());

        if (isCash) {
            mplew.write(0x07);
        } else {
            mplew.write(0x04);
        }

        mplew.writeMapleAsciiString(chr.getName());
        mplew.writeInt(0); // Trade ID
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 玩家交易設置楓幣
     */
    public static byte[] getTradeMesoSet(byte number, int meso) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.TRP_PutMoney.getValue());

        mplew.write(number);
        mplew.writeLong(meso);

        return mplew.getPacket();
    }

    /*
     * 玩家交易放入道具
     */
    public static byte[] getTradeItemAdd(byte number, Item item) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.TRP_PutItem.getValue());
        mplew.write(number);
        mplew.write(item.getPosition());
        PacketHelper.GW_ItemSlotBase_Encode(mplew, item);

        return mplew.getPacket();
    }

    /*
     * 交易開始
     * 雙方角色都進入交易界面
     */
    public static byte[] getTradeStart(MapleClient c, MapleTrade trade, byte number, boolean cash) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.MRP_EnterResult.getValue());
        if (cash) {
            mplew.write(0x07);
        } else {
            mplew.write(0x04);
        }
        mplew.write(0x02); //應該是交易的人數
        mplew.write(number);
        if (number == 1) {
            mplew.write(0);
            PacketHelper.addCharLook(mplew, trade.getPartner().getChr(), true, trade.getPartner().getChr().isBeta());
            mplew.writeMapleAsciiString(trade.getPartner().getChr().getName());
            mplew.writeShort(trade.getPartner().getChr().getJob());
            mplew.writeInt(0);
        }
        mplew.write(number);
        PacketHelper.addCharLook(mplew, c.getPlayer(), !cash, c.getPlayer().isBeta());
        mplew.writeMapleAsciiString(c.getPlayer().getName());
        mplew.writeShort(c.getPlayer().getJob());
        mplew.writeInt(0);
        mplew.write(0xFF);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] getTradeConfirmation() {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.TRP_Trade.getValue());

        return mplew.getPacket();
    }

    public static byte[] TradeMessage(byte number, byte message) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.MRP_Leave.getValue());

        mplew.write(number);
        /*
         * 0x01 已經關閉了。
         * 0x02 對方中止交易。
         * 0x07 交易成功了。請再確認交易的結果。
         * 0x08 交易失敗了。
         * 0x09 因部分道具有數量限制只能擁有一個交易失敗了。
         * 0x0C 雙方在不同的地圖不能交易。
         * 0x0D 遊戲文件損壞，無法交易物品。請重新安裝遊戲後，再重新嘗試。
         */
        mplew.write(message);

        return mplew.getPacket();
    }

    /*
     * 玩家交易取消
     * 好像現在沒有提示對方背包已滿的什麼提示 直接是交易失敗
     */
    public static byte[] getTradeCancel(byte number, int message) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TradeRoom.getValue());
        mplew.write(MiniRoomOptType.MRP_Leave.getValue());

        mplew.write(number);
        mplew.write(message == 0 ? 0x02 : 0x09);

        return mplew.getPacket();
    }
}
