package packet;
import client.MapleCharacter;
import handling.auction.AuctionItem;
import handling.opcode.SendPacketOpcode;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.List;

import static handling.auction.AuctionOptType.*;

public class AuctionPacket {

    public static byte[] auctionResult(final int auctionOptType, final int n) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(auctionOptType);
        mplew.writeInt(n);
        mplew.writeInt(0);
        if (auctionOptType == LOAD_ALL_ITEM || auctionOptType == LOAD_QUOTATION) {
            mplew.write(1);
            mplew.write(1);
            mplew.write(0);
        }
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] loadStore(final List<AuctionItem> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(LOAD_STORE);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(list.size());
        for (final AuctionItem auctionItem : list) {
            mplew.writeLong(auctionItem.id);
            mplew.writeInt(0);
            mplew.writeInt(auctionItem.accounts_id);
            mplew.writeInt(auctionItem.characters_id);
            mplew.writeInt(auctionItem.itemid);
            mplew.writeInt(auctionItem.state);
            mplew.writeLong(auctionItem.price);
            mplew.writeLong(PacketHelper.getTime(auctionItem.donedate));
            mplew.writeLong(0L);
            mplew.writeInt(auctionItem.number);
            mplew.writeInt(0);
//            mplew.writeInt(auctionItem.type);
            mplew.writeBool(auctionItem.item != null);
            if (auctionItem.item != null) {
                addAuctionItemInfo(mplew, auctionItem);
            } else {
                boolean b = false;
                mplew.writeBool(b);
                if (b) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, null);
                }
            }
        }
        return mplew.getPacket();
    }

    public static byte[] loadAllItem(final List<AuctionItem> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(LOAD_ALL_ITEM);
        mplew.writeInt(1000);
        mplew.writeInt(0);
        mplew.write(1);
        mplew.write(1);
        mplew.write(0);
        mplew.writeInt(list.size());
        for (final AuctionItem item : list) {
            addAuctionItemInfo(mplew, item);
        }
        return mplew.getPacket();
    }

    public static byte[] loadQuotation(final List<AuctionItem> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(LOAD_QUOTATION);
        mplew.writeInt(1000);
        mplew.writeInt(0);
        mplew.write(1);
        mplew.write(1);
        mplew.write(0);
        mplew.writeInt(list.size());
        for (final AuctionItem auctionItem : list) {
            addAuctionItemInfo(mplew, auctionItem);
        }
        return mplew.getPacket();
    }

    public static byte[] loadCollection(List<AuctionItem> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(LOAD_COLLECTION);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(list.size());
        for (AuctionItem item : list) {
            addAuctionItemInfo(mplew, item);
        }
        return mplew.getPacket();
    }

    public static byte[] loadSell(final List<AuctionItem> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(LOAD_SELL);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(list.size());
        for (AuctionItem item : list) {
            addAuctionItemInfo(mplew, item);
        }
        return mplew.getPacket();
    }

    public static byte[] updateAuctionItemInfo(int auctionOptType, final AuctionItem auctionItem) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.AuctionResult);
        mplew.writeInt(auctionOptType);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(1);
        addAuctionItemInfo(mplew, auctionItem);
        return mplew.getPacket();
    }

    public static void addAuctionItemInfo(final MaplePacketLittleEndianWriter mplew, final AuctionItem auctionItem) {
        mplew.writeInt(auctionItem.id);
        mplew.writeInt(0);
//        mplew.writeInt(auctionItem.accounts_id);
        mplew.writeInt(0);
        mplew.writeInt((auctionItem.state == 2) ? 3 : 0);
        mplew.writeLong((auctionItem.state == 2) ? auctionItem.price : 0L);
        mplew.writeLong((auctionItem.state == 0) ? -1L : 0L);
        mplew.writeLong((auctionItem.item == null) ? auctionItem.price : (auctionItem.price * auctionItem.number));
        mplew.writeLong(auctionItem.price);
        mplew.writeDouble(0);
        mplew.writeLong(PacketHelper.getTime((auctionItem.state == 2) ? auctionItem.donedate : auctionItem.expiredate));
//        mplew.writeInt(auctionItem.other_id);
//        mplew.writeAsciiString(auctionItem.other, 15);
        mplew.writeLong(PacketHelper.getTime(auctionItem.startdate));
        mplew.writeLong(0L);
        mplew.writeInt(auctionItem.state == 2 ? 1 : 0);
        mplew.writeInt(0);
        mplew.writeLong(PacketHelper.getTime((auctionItem.state == 2) ? auctionItem.donedate : -2L));
//        mplew.writeInt(auctionItem.type);

        mplew.writeBool(true);
        mplew.writeLong(auctionItem.id);
        mplew.writeInt(auctionItem.id);
        mplew.writeInt(auctionItem.characters_id);
        mplew.writeMapleAsciiString(auctionItem.owner);

        PacketHelper.GW_ItemSlotBase_Encode(mplew, auctionItem.item);
    }

    public static byte[] characterModifiedEX(MapleCharacter player, long l) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.CharacterModifiedEX);
        PacketHelper.addCharacterInfo(mplew, player, l);
        return mplew.getPacket();
    }
}
