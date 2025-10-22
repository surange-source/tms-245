package handling.cashshop.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Item;
import configs.CSInfoConfig;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.opcode.SendPacketOpcode;
import handling.world.CharacterTransfer;
import handling.world.World;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.MaplePacketCreator;
import tools.types.Pair;
import packet.MTSCSPacket;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.util.List;

public class CashShopOperation {

    private static final Logger log = LogManager.getLogger(CashShopOperation.class);

    public static void LeaveCS(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        int channel = c.getChannel(); //角色要更換的頻道
        ChannelServer toch = ChannelServer.getInstance(channel); //角色從商城出來更換的頻道信息
        if (toch == null) {
            log.error("玩家: " + chr.getName() + " 從商城離開發生錯誤.找不到頻道[" + channel + "]的信息.");
            c.getSession().close();
            return;
        }
        //開始處理
        World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), c.getChannel());
        CashShopServer.getPlayerStorage().deregisterPlayer(chr);
        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION, c.getSessionIPAddress());
        c.announce(MaplePacketCreator.getChannelChange(c, toch.getPort())); //發送更換頻道的封包信息
        chr.fixOnlineTime();
//        chr.saveToCache();
        chr.saveToDB(true, true);
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static void EnterCS(CharacterTransfer transfer, MapleClient c) {
        if (transfer == null) {
            c.getSession().close();
            return;
        }
        MapleCharacter chr = MapleCharacter.ReconstructChr(transfer, c, false);

        c.setPlayer(chr);
        c.setAccID(chr.getAccountID());
        if (!c.CheckIPAddress()) { // Remote hack
            c.getSession().close();
            log.info("商城檢測連接 - 2 " + !c.CheckIPAddress());
            return;
        }

        int state = c.getLoginState();
        boolean allowLogin = false;
        if (state == MapleClient.CHANGE_CHANNEL) {
            if (!World.isCharacterListConnected(c.loadCharacterNames(c.getWorld()))) {
                allowLogin = true;
            }
        }
        if (!allowLogin) {
            c.setPlayer(null);
            c.getSession().close();
            log.info("商城檢測連接 - 3 " + !allowLogin);
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());
        CashShopServer.getPlayerStorage().registerPlayer(chr);
        c.announce(MaplePacketCreator.serverMessage(""));
        c.announce(MTSCSPacket.warpchartoCS(c)); //在商城裡面顯示人物外觀
        c.announce(MTSCSPacket.warpCS(false)); //載入商城物品數據
        List<Pair<Item, String>> gifts = chr.getCashInventory().loadGifts();
        c.announce(MTSCSPacket.getCashShopStyleCouponPreviewInfo());
        c.announce(MTSCSPacket.loadLockerDone(c)); //顯示購買的物品
        c.announce(MTSCSPacket.商城禮物信息(gifts)); //顯示禮物
        c.announce(MTSCSPacket.sendWishList(c.getPlayer(), false)); //顯示購物車信息
        c.announce(MTSCSPacket.CashShopQueryCashResult(c.getPlayer())); //刷新樂豆點和楓點 這個地方盛大發了2次
        c.announce(MTSCSPacket.CashShopQueryCashResult(c.getPlayer())); //刷新樂豆點和楓點 這個地方盛大發了2次
        c.getPlayer().getCashInventory().checkExpire(c); //檢查商城裡面的道具是否到期
    }

    public static void openRechargeWeb(MapleClient c) {
        c.announce(MTSCSPacket.RechargeWeb("https://nxpay.nexon.com/cash/Pay.aspx?id=Q7sSfrBRJO6ynRBkuFS1waNHc2KDzei02wNIpbbRuujG7dHuBhfZMCEWIXXzqqXbq9sYa6eCOAw3ze4g23qFv8T3u+CvHBrMr3bDweFe7Fk=&channel=MAPL&type=1"));
    }

    public static void CheckMileageRequest(MapleClient c) {
        c.announce(MTSCSPacket.showMileageInfo(c));
    }

    public static void CSUpdate(MapleClient c) {
        c.announce(MTSCSPacket.CashShopQueryCashResult(c.getPlayer()));
    }

    public static void doCSPackets(MapleClient c) {
        c.announce(MTSCSPacket.loadLockerDone(c)); //顯示購買的物品
        c.announce(MTSCSPacket.CashShopQueryCashResult(c.getPlayer())); //刷新樂豆點和楓點
        c.getPlayer().getCashInventory().checkExpire(c);
    }
}
