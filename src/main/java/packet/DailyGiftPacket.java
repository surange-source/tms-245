package packet;

import handling.opcode.SendPacketOpcode;
import server.MapleDailyGift;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Map;

public class DailyGiftPacket {

    public static byte[] dailyGiftResult(final int n, final int n2, final int n3, final int n4) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SIGIN_INFO.getValue());

        mplew.write(n);
        if (n > 0) {
            if (n > 1) {
                if (n == 2) {
                    mplew.writeInt(n2);
                    mplew.writeInt(n3);
                    if (n2 == 14) {
                        mplew.writeInt(n4);
                    }
                }
            }
            else {
                mplew.writeInt(0);
            }
        } else {
            final MapleDailyGift.DailyGiftMonth dgm = MapleDailyGift.getInstance().getRewards();
            mplew.writeBool(dgm != null);
            if (dgm != null) {
                addDailyGiftInfo(mplew, dgm);
            }
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    private static void addDailyGiftInfo(final MaplePacketLittleEndianWriter mplew, final MapleDailyGift.DailyGiftMonth a1318) {
        mplew.writeLong(PacketHelper.getTime(a1318.startTime));
        mplew.writeLong(PacketHelper.getTime(a1318.endTime));
        mplew.writeInt(a1318.days);
        mplew.writeInt(0);
        mplew.writeInt(16700);
        mplew.writeInt(999);
        mplew.writeInt(a1318.dailyGifts.size());
        for (Map.Entry<Integer, MapleDailyGift.DailyGiftInfo> entry : a1318.dailyGifts.entrySet()) {
            final MapleDailyGift.DailyGiftInfo gift = entry.getValue();
            mplew.writeInt(entry.getKey());
            mplew.writeInt(gift.itemId);
            mplew.writeInt(gift.count);
            mplew.writeInt(gift.commodityid);
            mplew.writeInt(gift.term * 24 * 60);
            mplew.write(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.write(0);
        }
        mplew.writeInt(a1318.minLevel);
        mplew.writeInt(0);
//        for (final Map.Entry<Integer, Integer> entry : a1318.unknownMap.entrySet()) {
//            mplew.writeInt(entry.getKey());
//            mplew.writeInt(entry.getValue());
//        }
        mplew.writeInt(0);
    }

    public static byte[] getSigninReward(int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SIGIN_INFO.getValue());

        mplew.write(1);
        mplew.writeInt(SIGNIN_TYPE.領取獎勵.ordinal());
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    enum SIGNIN_TYPE {
        UNKNOWN,
        簽到窗口,
        領取獎勵,;
    }
}
