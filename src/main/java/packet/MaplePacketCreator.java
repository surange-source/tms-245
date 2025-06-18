package packet;

import client.*;
import client.inventory.*;
import client.skills.InnerSkillEntry;
import client.skills.SkillEntry;
import client.skills.SkillMacro;
import client.skills.ExtraSkill;
import client.stat.DeadDebuff;
import configs.ServerConfig;
import constants.*;
import constants.enums.FieldEffectType;
import constants.enums.UserChatMessageType;
import constants.skills.*;
import handling.channel.handler.AttackInfo;
import handling.channel.handler.AttackMobInfo;
import handling.channel.handler.InventoryHandler;
import handling.channel.handler.TakeDamageHandler;
import handling.opcode.MessageOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.WorldAllianceService;
import handling.world.WorldGuildService;
import handling.world.guild.MapleGuild;
import handling.world.guild.MapleGuildAlliance;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.MapleDueyActions;
import server.MapleItemInformationProvider;
import server.MerchItemPackage;
import server.RankingWorker;
import server.events.MapleSnowball;
import server.life.MobSkill;
import server.maps.*;
import server.maps.MapleNodes.MaplePlatform;
import server.movement.LifeMovementFragment;
import server.movement.MapleMulitInfo;
import server.quest.MapleQuest;
import server.shops.HiredFisher;
import server.shops.HiredMerchant;
import server.shops.MaplePlayerShopItem;
import tools.*;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.io.File;
import java.util.List;
import java.util.*;
import java.util.Map.Entry;

import static constants.enums.BroadcastMessageType.*;

public class MaplePacketCreator {

    public final static Map<MapleStat, Long> EMPTY_STATUPDATE = Collections.emptyMap();
    private static final Logger log = LogManager.getLogger(MaplePacketCreator.class);

    public static byte[] getWzCheck(String WzCheckPack) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.WZ_CHECK.getValue());
        mplew.write(HexTool.getByteArrayFromHexString(WzCheckPack));
        return mplew.getPacket();
    }

    /**
     * 客戶端驗證
     *
     * @param fileValue
     * @return 返回客戶端檢查結果
     */
    public static byte[] getClientAuthentication(int fileValue) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.CLIENT_AUTH.getValue());
        mplew.writeInt(fileValue);
        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client the IP of the channel server.
     *
     * @param c
     * @param port   The port the channel is on.
     * @param charId
     * @return The server IP packet.
     */
    public static byte[] getServerIP(MapleClient c, int port, int charId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SelectCharacterResult.getValue());

        int a1 = 0;
        mplew.write(a1);
        mplew.writeMapleAsciiString("");
        mplew.write(0);
        switch (a1) {
            case 39:
            case 55:
            case 67:
                break;
            case 83:
                int v3 = 1;
                mplew.write(v3);
                if (v3 > 0) {
                    mplew.writeInt(0); // > 0 && <= 2
                    mplew.writeMapleAsciiString("normal");
                    mplew.writeMapleAsciiString("normal");
                    mplew.writeMapleAsciiString("normal");
                }
                break;
            default:
                mplew.write(ServerConstants.getIPBytesByClient(c));
                mplew.writeShort(port);
                mplew.writeInt(charId);
//                mplew.writeMapleAsciiString("normal"); // reboot
//                mplew.writeMapleAsciiString("normal"); // lab ?
                mplew.writeInt(1);//V.181 str->int
                mplew.writeInt(1);//V.181 str->int
                mplew.writeInt(1);//V.240 ADD
                mplew.writeInt(0);
                mplew.write(0);
                mplew.writeInt(0);
                mplew.write(20);
                mplew.writeInt(1000);
                break;
        }

        return mplew.getPacket();
    }

    /**
     * Gets a packet telling the client the IP of the new channel.
     *
     * @param c    The InetAddress of the requested channel server.
     * @param port The port the channel is on.
     * @return The server IP packet.
     */
    public static byte[] getChannelChange(MapleClient c, int port) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MigrateCommand.getValue());
        mplew.write(1);
        mplew.write(ServerConstants.getIPBytesByClient(c));
        mplew.writeShort(port);
        mplew.write(0);

        return mplew.getPacket();
    }

    /*
     * 隱藏頭頂稱號
     * V.112.1新增
     */
    public static byte[] cancelTitleEffect(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_EventNameTagInfo.getValue());
        for (int i = 0; i < 5; i++) {
            int tag = chr.getActiveEventNameTag(i);
            if (tag > 0) {
                mplew.writeMapleAsciiString("1");
                mplew.write(tag);
            } else {
                mplew.writeShort(0);
                mplew.write(-1);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] sendFieldToPosition(MapleCharacter player, MapleMap to, Point position) {
        return getWarpToMap(player, to, position, 0, false, false);
    }

    public static byte[] getWarpToMap(MapleCharacter player, MapleMap to, int spawnPoint, boolean revive) {
        return getWarpToMap(player, to, null, spawnPoint, false, revive);
    }

    /**
     * Gets character info for a character.
     *
     * @param player The character to get info about.
     * @param position
     * @return The character info packet.
     */
    public static byte[] getWarpToMap(MapleCharacter player, MapleMap to, Point position, int spawnPoint, boolean load, boolean revive) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetField.getValue());
        mplew.writeInt(player.getClient().getChannel() - 1); // 頻道
        mplew.write(0);
        mplew.writeInt(0);
        mplew.write(load ? 1 : 2);
        mplew.writeInt(load ? 0 : to.getFieldType());
        mplew.write(0);//未知，V.144新增
        mplew.writeInt(Math.abs(to.getBottom() - to.getTop()));
        mplew.writeInt(Math.abs(to.getRight() - to.getLeft()));
        mplew.writeBool(load);

        int nNotifierCheck = 0;
        mplew.writeShort(nNotifierCheck); // size :: v104
        if (nNotifierCheck != 0) {
            // pBlockReasonIter
            mplew.writeMapleAsciiString("");
            for (int i = 0; i < nNotifierCheck; i++) {
                // sNotifierMessage
                mplew.writeMapleAsciiString("");
            }
        }

        int mapId = to.getId();
        if (load) {
            int seed1 = Randomizer.nextInt();
            int seed2 = Randomizer.nextInt();
            int seed3 = Randomizer.nextInt();
            player.getCalcDamage().setSeed(seed1, seed2, seed3);
            mplew.writeInt(seed1);
            mplew.writeInt(seed2);
            mplew.writeInt(seed3);
            PacketHelper.addCharacterInfo(mplew, player, -1);
            boolean bUnk = true;
            mplew.writeBool(bUnk);
            if (bUnk) {
                bUnk = false;
                mplew.writeBool(bUnk);
                if (bUnk) {
                    mplew.writeInt(0);
                }
                mplew.writeLong(0);
                mplew.writeInt(0);
                for (int i = 0; i < 3; i++) {
                    mplew.writeInt(0);
                }
                mplew.write(0);
                mplew.writeLong(0);
            }
        } else {
            mplew.writeBool(revive);
            mplew.writeInt(mapId); //地圖ID
            mplew.write(spawnPoint);
            mplew.writeInt(player.getStat().getHp()); // 角色HP
            mplew.write(position !=null);
            if (position !=null) {
                mplew.writeInt(position.x);
                mplew.writeInt(position.y);
            }
            mplew.writeInt(0);
        }
        boolean bUnk = false;
        mplew.write(bUnk);
        if (bUnk) {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        // CWvsContext::SetWhiteFadeInOut
        mplew.write(0);
        // bChatBlockReason
        mplew.writeBool(to.getFieldType() >= 182 && to.getFieldType() <= 184);
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        mplew.writeInt(100);

        /* FieldCustom */
        boolean bCFieldCustom = false; // to.isCustomMap()
        mplew.writeBool(bCFieldCustom);
        if (bCFieldCustom) {
            mplew.writeInt(0); // partyBonusExpRate
            mplew.writeMapleAsciiString("" /* to.getCustomMapBgm() */); // BGM
            mplew.writeInt(0/* to.getCustomBgMapID() */); // bgFieldID
        }
        // CWvsContext::OnInitPvPStat
        mplew.writeBool(false);
        // bCanNotifyAnnouncedQuest
        mplew.writeBool(false);
        // bCField::DrawStackEventGauge
        mplew.writeBool(JobConstants.isSeparatedSpJob(player.getJob()));

        mplew.writeLong(0);
        mplew.writeInt(-1);

        byte[] arrby = SpecialPacket.writeWarpToMap(player, load ? 0 : 1);
        mplew.writeInt(arrby.length);
        mplew.write(arrby);

        // nCField::DrawStackEventGauge
        boolean v88 = false;
        mplew.writeBool(v88);
        if (v88) {
            mplew.writeInt(0);
        }
        if (mapId / 10 == 10520011 || mapId / 10 == 10520051 || mapId == 105200519) {
            String[] aS = new String[0];
            mplew.write(aS.length);
            for (String s : aS) {
                mplew.writeMapleAsciiString(s);
            }
        }
        //EncodeTextEquipInfo
        mplew.writeInt(0);
        //EncodeFreezeHotEventInfo
        mplew.write(0);
        mplew.writeInt(0);
        //EncodeEventBestFriendInfo
        mplew.writeInt(0);
        boolean setChrMenuItem = true;
        mplew.writeBool(setChrMenuItem);//V.153 new
        if (setChrMenuItem) {
            mplew.writeInt(-1); // 6
            mplew.writeInt(0); // 10000
            mplew.writeInt(0); // 100023
            mplew.writeInt(999999999); // 993034000
            mplew.writeInt(999999999); // 993034000
            mplew.writeMapleAsciiString(""); // 打招呼只能在 <萬聖節俱樂部> 裡進行。
        }
        // 星期天楓之谷訊息
        boolean bSundayMaple = false;
        mplew.writeBool(bSundayMaple);//V.153 new
        if (bSundayMaple) {
            mplew.writeMapleAsciiString("UI/UIWindowEvent.img/sundayMaple");
            mplew.writeMapleAsciiString(""); // #sunday# #fn???? ExtraBold##fs20##fc0xFFFFFFFF#星力強化費用#fc0xFFFFD800#7折 #fc0xFFFFFFFF#優惠！\n#sunday# #fs20##fc0xFFFFFFFF#咒文的痕跡強化成功機率#fc0xFFFFD800#提升！
            mplew.writeMapleAsciiString(""); // #fs15##fc0xFFB7EC00#2019年10月6日星期天
            mplew.writeInt(60); // 3C 00 00 00
            mplew.writeInt(232); // E8 00 00 00
        }
        mplew.writeInt(0);
        mplew.write(1);
        mplew.writeInt(0);
        mplew.write(1);
        mplew.write(150);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /**
     * Gets an empty stat update.
     *
     * @return The empy stat update packet.
     */
    public static byte[] enableActions(MapleCharacter chr) {
        return updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true, chr);
    }

    /**
     * Gets an update for specified stats.
     *
     * @param stats The stats to update.
     * @param chr
     * @return The stat update packet.
     */
    public static byte[] updatePlayerStats(Map<MapleStat, Long> stats, MapleCharacter chr) {
        return updatePlayerStats(stats, false, chr);
    }

    public static byte[] updatePlayerStats(Map<MapleStat, Long> stats, boolean itemReaction, MapleCharacter chr) {
        return updatePlayerStats(stats, itemReaction, chr, false);
    }

    /**
     * Gets an update for specified stats.
     *
     * @param stats        The list of stats to update.
     * @param itemReaction Result of an item reaction(?)
     * @param chr
     * @param isWarlock
     * @return The stat update packet.
     */
    public static byte[] updatePlayerStats(Map<MapleStat, Long> stats, boolean itemReaction, MapleCharacter chr, boolean isWarlock) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_StatChanged.getValue());
        mplew.writeBool(itemReaction);
        mplew.write(0);
        mplew.write(1);
        long updateMask = 0;
        for (MapleStat statupdate : stats.keySet()) {
            updateMask |= statupdate.getValue();
        }
        mplew.writeLong(updateMask);
        for (Map.Entry<MapleStat, Long> statupdate : stats.entrySet()) {
            switch (statupdate.getKey()) {
                case 皮膚: //0x01
                    mplew.write(statupdate.getValue().byteValue());
                    break;
                case 職業: //0x20
                    mplew.writeShort(statupdate.getValue().shortValue());
                    mplew.writeShort(chr.getSubcategory());
                    break;
                case 疲勞: //0x80000
                case 力量: //0x40
                case 敏捷: //0x80
                case 智力: //0x100
                case 幸運: //0x200
                case AVAILABLEAP: //0x4000
                    mplew.writeShort(statupdate.getValue().shortValue());
                    break;
                case AVAILABLESP: //0x8000
                    PacketHelper.addCharSP(mplew, chr);
                    break;
                case TRAIT_LIMIT: //0x8000000
                    mplew.write(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.write(0);
                    break;
                case TODAYS_TRAITS: //0x4000000
                    mplew.writeZeroBytes(21);
                    break;
                case BATTLE_EXP: //0x10000000
                    chr.getCharacterCard().connectData(mplew);
                    break;
                case 經驗: //0x10000
                case 楓幣: //0x40000
                    mplew.writeLong(statupdate.getValue());
                    break;
                case BATTLE_POINTS: //0x40000000
                    mplew.write(5);
                    mplew.write(6);
                    break;
                case BATTLE_RANK: //0x20000000
                    mplew.writeInt(chr.getStat().pvpExp);
                    mplew.write(chr.getStat().pvpRank);
                    mplew.writeInt(chr.getBattlePoints());
                    break;
                default:
                    mplew.writeInt(statupdate.getValue());
                    break;
            }
        }
        mplew.write(chr.getHairBaseColor());
        mplew.write(chr.getHairMixedColor());
        mplew.write(chr.getHairProbColor());
        mplew.writeBool(updateMask == 0 && !itemReaction);
        if (updateMask == 0 && !itemReaction) {
            mplew.write(0);
        }
        mplew.writeBool(false);
        return mplew.getPacket();
    }

    /*
     * 武陵道場移動
     */
    public static byte[] instantMapWarp(byte portal) {
//        if (ServerConfig.DEBUG_MODE) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.CURRENT_MAP_WARP.getValue());
//        mplew.writeShort(0);
//        mplew.writeInt(portal); // 6
//
//        return mplew.getPacket();
        return userTeleport(false, 0, portal, null);
    }

    /*
     * 火焰傳動痕跡
     */
    public static byte[] sendSkillUseResult(boolean success, int skillId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SkillUseResult.getValue());
        mplew.writeBool(success);
        mplew.writeInt(skillId);

        return mplew.getPacket();
    }

    /*
     * 角色移動到地圖的另外1個坐標地點
     */
    public static byte[] instantMapWarp(int charId, Point pos) {
//        if (ServerConfig.DEBUG_MODE) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.CURRENT_MAP_WARP.getValue());
//        mplew.write(0x00);
//        mplew.write(0x02);
//        mplew.writeInt(charId); //角色ID
//        mplew.writePos(pos); //移動到的坐標
//
//        return mplew.getPacket();
        return userTeleport(false, 2, charId, pos);
    }

    public static byte[] userTeleportOnRevive(final int charid, final Point point) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UserTeleportOnRevive.getValue());
        mplew.writeInt(charid);
        mplew.writePosInt(point);

        return mplew.getPacket();
    }

    public static byte[] userTeleport(final boolean b, final int n, final int charid, final Point point) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTeleport.getValue());
        mplew.writeBool(b);
        mplew.write(n);
        if (n <= 0) {
            mplew.writeInt(charid);
            mplew.write(0);//V.161 new
        } else {
            mplew.writeInt(charid);
            mplew.writePos(point);
        }

        return mplew.getPacket();
    }

    /**
     * Gets a packet to spawn a portal.
     *
     * @param townId   The ID of the town the portal goes to.
     * @param targetId The ID of the target.
     * @param skillId
     * @param pos      Where to put the portal.
     * @return The portal spawn packet.
     */
    public static byte[] onTownPortal(int townId, int targetId, int skillId, Point pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TownPortal.getValue());
        mplew.writeInt(townId);
        mplew.writeInt(targetId);
        if (townId != 999999999 && targetId != 999999999) {
            mplew.writeInt(skillId);
            mplew.writePos(pos);
        }

        return mplew.getPacket();
    }

    public static byte[] getRandomPortalCreated(MapleRandomPortal portal) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_RandomPortalCreated.getValue());
        mplew.write(portal.getPortalType());
        mplew.writeInt(portal.getObjectId());
        mplew.writePos(portal.getPosition());
        mplew.writeInt(portal.getMapid());
        mplew.writeInt(portal.getOwerid());

        return mplew.getPacket();
    }

    public static byte[] getRandomPortalTryEnterRequest() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_RandomPortalTryEnterRequest.getValue());

        return mplew.getPacket();
    }

    public static byte[] getRandomPortalRemoved(MapleRandomPortal portal) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_RandomPortalRemoved.getValue());
        mplew.write(portal.getPortalType());
        mplew.writeInt(portal.getObjectId());
        mplew.writeInt(portal.getMapid());

        return mplew.getPacket();
    }

    public static byte[] getFieldVoice(String patch) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_PlaySound.getValue());
        mplew.writeMapleAsciiString(patch);

        return mplew.getPacket();
    }

    /*
     * 重置屏幕
     */
    public static byte[] resetScreen() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.RESET_SCREEN.getValue());

        return mplew.getPacket();
    }

    /**
     * 發送地圖錯誤信息到客戶端 數據包的值大概如下: 0x01: 現在關閉了縮地門 0x02: 因某種原因，不能去那裡 0x03:
     * 對不起，正在準備楓之谷ONLINE商城 - 彈出窗口 0x04: 因為有地氣阻擋，無法接近。 0x05：無法進行瞬間移動的地區。 - 彈出窗口
     * 0x06：無法進行瞬間移動的地區。 0x07: 隊員的等級差異太大，無法入場。 0x08: 只有組隊成員才能入場的地圖 0x09:
     * 只有隊長可以申請入場。 0x0A: 請在隊員全部聚齊後申請入場。 0x0B:
     * 你因不當行為，而遭遊戲管理員禁止攻擊，禁止獲取經驗值和楓幣，禁止交易，禁止丟棄道具，禁止開啟個人商店與精靈商人，禁止組隊，禁止使用拍賣系統，因此無法使用改功能。
     * 0x0C: 只有遠征隊員可以進入該地圖。 0x0D: 所有副本人數已滿。請使用其他頻道。 0x0E: 遠征隊入場時間已結束，無法進入。
     */
    public static byte[] mapBlocked(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MAP_BLOCKED.getValue());
        mplew.write(type);

        return mplew.getPacket();
    }

    /**
     * 發送錯誤信息到客戶端 數據包的值大概如下: 0x01: 日前無法進入該頻道，請稍後在嘗試。 0x02: 現在無法進入楓之谷商城。請稍後在嘗試。
     * 0x03: 只有在PVE伺服器中可以使用。 0x04: 根據非活躍帳號保護政策，限制使用商城。必須登錄官方網站進行身份認證後，才能正常使用。
     * 0x05: 現在無法操作。請稍後再試。- 對話框提示 0x06：日前無法進入，請玩家稍後在試.(電擊象伺服器目前不開放拍賣平台)
     * 0x07：日前拍賣系統擁塞中，請稍後再試！ 0x08:
     * 你因不當行為，而遭遊戲管理員禁止攻擊，禁止獲取經驗值和楓幣，禁止交易，禁止丟棄道具，禁止開啟個人商店與精靈商人，禁止組隊，禁止使用拍賣系統，因此無法使用改功能。
     */
    public static byte[] serverBlocked(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVER_BLOCKED.getValue());
        mplew.write(type);

        return mplew.getPacket();
    }

    /**
     * 發送錯誤信息到客戶端 數據包的值大概如下: 0x01: 現在無法登錄大亂鬥伺服器。請稍後重新嘗試。 0x02: 從頻道中獲取隊員信息失敗。
     * 0x03: 只有隊長可以進行。 0x04: 存在未復活的隊員。 0x05：有隊員在其他地方。 0x06：只有在大亂鬥伺服器中可以使用。 0x07:
     * 無 0x08: 不符合頻道入場條件的隊員無法移動。請重新確認。 - 對話框提示 0x09: 組隊狀態下無法入場的模式。請退出組隊後重新嘗試。 -
     * 對話框提示
     */
    public static byte[] partyBlocked(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PARTY_BLOCKED.getValue());
        mplew.write(type);

        return mplew.getPacket();
    }

    public static byte[] serverMessage(String message) {
        return serverMessage(4, 0, message, false, null, Collections.emptyList(), 0);
    }

    public static byte[] serverNotice(int type, String message) {
        return serverMessage(type, 0, message, false, null, Collections.emptyList(), 0);
    }

    public static byte[] serverNotice(int type, int channel, String message) {
        return serverMessage(type, channel, message, false, null, Collections.emptyList(), 0);
    }

    public static byte[] serverNotice(int type, int channel, String message, boolean smegaEar) {
        return serverMessage(type, channel, message, smegaEar, null, Collections.emptyList(), 0);
    }

    private static byte[] serverMessage(int type, int channel, String message, boolean megaEar, Item item, List<String> list, int rareness) {
        return serverMessage(type, channel, message, megaEar, item, list, rareness, "", 0);
    }

    private static byte[] serverMessage(int type, int channel, String message, boolean megaEar, Item item, List<String> list, int rareness, String speakerName, int speakerId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_BroadcastMsg.getValue());
        String speekerName = "";
        int chrId = 0;
        mplew.write(type);
        boolean msg = true;
        if (type == ANNOUNCED_QUEST_OPEN || type == ANNOUNCED_QUEST_CLOSED || type == 27) {
            msg = false;
        }
        if (type == SLIDE || type == 26) {
            msg = true;
            mplew.writeBool(msg);
        }
        if (type == 35) {
            msg = false;
        }
        if (msg) {
            mplew.writeMapleAsciiString(message);
        }
        switch (type) {
            case SPEAKER_WORLD:
            case SPEAKER_WORLD_GUILD_SKILL:
                PacketHelper.addChaterName(mplew, speekerName, message, chrId);
            case CAKE_TYPE:
            case PIE_TYPE:
            case HEART_TYPE:
            case BONE_TYPE:
                mplew.write(channel - 1);
                mplew.writeBool(megaEar);
                break;
            case ITEM_SPEAKER:
                PacketHelper.addChaterName(mplew, speekerName, message, chrId);
                mplew.write(channel - 1);
                mplew.writeBool(megaEar);
                mplew.writeInt(item == null ? 0 : item.getItemId());
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
                break;
            case SPEAKER_BRIDGE:
                PacketHelper.addChaterName(mplew, speekerName, message, chrId);
                mplew.write(channel - 1);
                break;
            case BLOW_WEATHER:
                mplew.writeInt(1);
                break;
            case WEATHER_MSG:
                mplew.writeInt(item != null ? item.getItemId() : 0);
                mplew.writeInt(30);
                PacketHelper.addItemPosition(mplew, item, true, false);
                if (item != null) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                }
                break;
            case 33:
            case 34:
                mplew.writeInt(0);
                mplew.writeMapleAsciiString(list == null || list.isEmpty() ? "" : list.get(0));
                PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                break;
            case PICKUP_ITEM_WORLD:
            case MAKING_SKILL_MEISTER_ITEM:
                PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                break;
            case ART_SPEAKER_WORLD:
                PacketHelper.addChaterName(mplew, speekerName, list.get(1));
                mplew.write(list.size());
                if (list.size() > 1) {
                    mplew.writeMapleAsciiString(list.get(1));
                    PacketHelper.addChaterName(mplew, speekerName, list.get(1));
                }
                if (list.size() > 2) {
                    mplew.writeMapleAsciiString(list.get(2));
                    PacketHelper.addChaterName(mplew, speekerName, list.get(2));
                }
                mplew.write(channel - 1);
                mplew.writeBool(megaEar);
                break;
            case LOTTERY_ITEM_SPEAKER:
                PacketHelper.addItemPosition(mplew, item, true, false);
                if (item != null) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                }
                break;
            case 26:
                mplew.writeInt(0);
                mplew.writeInt(0);
                break;
            default:
                break;
        }

        switch (type) {
            case SPEAKER_CHANNEL:
                PacketHelper.addChaterName(mplew, speekerName, message, chrId);
                break;
            case GACHAPON_MEGAPHONE: {
                mplew.writeInt((item != null) ? item.getItemId() : 0);
                mplew.writeInt((channel > 0) ? (channel - 1) : -1);
                mplew.writeInt(rareness);//顏色代碼 0 為綠色 1 2 為紅色 3為黃色
                PacketHelper.addItemPosition(mplew, item, true, false);
                if (item != null) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                }
                break;
            }
            case GACHAPON_MSG: {
                mplew.writeInt(item == null ? 0 : item.getItemId());
                PacketHelper.addItemPosition(mplew, item, true, false);
                if (item != null) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                }
                break;
            }
            case NOTICE_WITHOUT_PREFIX:
            case LOTTERY_ITEM_SPEAKER_WORLD: {
                mplew.writeInt((item != null) ? item.getItemId() : 0);
                break;
            }
            case UTIL_DLG_EX: {
                mplew.writeInt(1);
                break;
            }
            case ANNOUNCED_QUEST_OPEN: {
                mplew.writeInt(0);
                mplew.writeInt(0);
                break;
            }
            case ANNOUNCED_QUEST_CLOSED: {
                mplew.writeInt(0);
                break;
            }
            case EVENT_MSG_WITH_CHANNEL: {
                mplew.writeInt(channel - 1);
                break;
            }
            case NOTICE_WINDOW: {
                mplew.writeInt(1);
                mplew.writeInt(1);
                break;
            }
            case 33:
            case 34: {
                mplew.writeMapleAsciiString("");
                mplew.writeInt(0);
                break;
            }
            case LOTTERY_ITEM_SPEAKER: {
                mplew.writeBool(item != null);
                if (item != null) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                }
                break;
            }
            case PICKUP_ITEM_WORLD:
            case MAKING_SKILL_MEISTER_ITEM: {
                PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
                break;
            }
        }
        mplew.writeZeroBytes(10);
        return mplew.getPacket();
    }

    /*
     * 抽獎喇叭
     */
    public static byte[] getGachaponMega(String name, String message, Item item, int rareness, int channel) {
        List<String> messages = new LinkedList<>();
        messages.add(name);
        return serverMessage(GACHAPON_MEGAPHONE, channel, message, false, item, messages, rareness);
    }

    /**
     * 繽紛喇叭
     */
    public static byte[] tripleSmega(List<String> message, boolean ear, int channel) {
        String s = message.get(0);
        return serverMessage(ART_SPEAKER_WORLD, channel, s == null ? "" : s, ear, null, message, 0);
    }

    /**
     * 情景喇叭
     */
    public static byte[] getAvatarMega(MapleCharacter chr, int channel, int itemId, List<String> message, boolean ear) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AvatarMegaphoneUpdateMessage.getValue());
        mplew.writeInt(itemId);
        mplew.writeMapleAsciiString(chr.getMedalText() + chr.getName());
        for (int i = 0; i < 4; i++) {
            mplew.writeMapleAsciiString(message.get(i));
        }
        final StringBuilder sb = new StringBuilder();
        for (String ignored : message) {
            sb.append(sb).append("\n\r");
        }
        PacketHelper.addChaterName(mplew, chr.getName(), sb.toString());
        mplew.writeInt(channel - 1); // channel
        mplew.write(ear ? 1 : 0);
        PacketHelper.addCharLook(mplew, chr, true, chr.isBeta());
        mplew.write(0);
        return mplew.getPacket();
    }

    public static byte[] gachaponMsg(String msg, Item item) {
        return serverMessage(GACHAPON_MSG, 0, msg, false, item, null, 0);
    }

    /*
     * 道具喇叭
     */
    public static byte[] itemMegaphone(String msg, boolean whisper, int channel, Item item) {
        return serverMessage(ITEM_SPEAKER, channel, msg, whisper, item, null, 0);
    }

    public static byte[] getChatItemText(int speekerId, String text, String speekerName, boolean whiteBG, int show, boolean b, int n, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_UserChatItem.getValue());
        mplew.writeInt(speekerId);
        mplew.writeBool(false); // whiteBG - true時無法查看道具訊息
        mplew.writeMapleAsciiString(text);
        PacketHelper.addChaterName(mplew, speekerName, text, speekerId);
        mplew.write(show);
        mplew.writeBool(b);
        mplew.write(n);
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

    public static byte[] getChatText(int speekerId, String text, String speekerName, boolean whiteBG, int show, boolean b, int n) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserChat.getValue());
        mplew.writeInt(speekerId);
        mplew.writeBool(whiteBG);//Gm白色背景
        mplew.writeMapleAsciiString(text);
        PacketHelper.addChaterName(mplew, speekerName, text, speekerId);
        mplew.write(show);
        mplew.writeBool(b);
        mplew.write(n);

        return mplew.getPacket();
    }

    public static byte[] GameMaster_Func(int value) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AdminResult.getValue());
        mplew.write(value);
        mplew.writeZeroBytes(17);

        return mplew.getPacket();
    }

    public static byte[] ShowAranCombo(int combo) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ModCombo.getValue());
        mplew.writeInt(combo);
        mplew.write(0);//V.163 new

        return mplew.getPacket();
    }

    public static byte[] comboRecharge(int combo) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_IncComboByComboRecharge.getValue());
        mplew.writeInt(combo);
        mplew.write(0);
        return mplew.getPacket();
    }

    public static byte[] rechargeCombo(int value) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserBuffzoneEffect.getValue());
        mplew.writeInt(value);

        return mplew.getPacket();
    }

    public static byte[] getPacketFromHexString(String hex) {
        return HexTool.getByteArrayFromHexString(hex);
    }

    public static byte[] showGainExp(long gain, boolean white, boolean bOnQuest, int diseaseType, long expLost, Map<MapleExpStat, Object> expStats) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncEXPMessage); // 3 = 經驗, 4 = SP, 5 = 人氣, 7 = 公會GP ,8 = 貢獻值 , 11 = 豆豆 12 = 精靈小助手
        mplew.writeBool(white); // 1 = 白色 2 = 黃色
        mplew.writeLong(gain); // 多少經驗 V.144修改為long
        mplew.writeBool(bOnQuest); // 是否在聊天框顯示
        mplew.writeInt(diseaseType); // 1 = 菁英Boss詛咒 2 = 套用角色死亡懲罰中
        if (diseaseType != 0) {
            mplew.writeLong(expLost);
        }
        long expMask = 0;
        for (MapleExpStat statupdate : expStats.keySet()) {
            expMask |= (long) statupdate.getValue() << (32 * statupdate.getPosition());
        }
        mplew.writeLong(expMask);
        if (expStats.getOrDefault(MapleExpStat.活動獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.活動獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.活動組隊經驗值, null) != null) {
            mplew.write((byte) expStats.get(MapleExpStat.活動組隊經驗值));
        }
        int nQuestBonusRate = 0;
        if (bOnQuest) {
            mplew.write(nQuestBonusRate);
        }
        if (nQuestBonusRate > 0) {
            mplew.write(0); // nQuestBonusRemainCount
        }
        if (expStats.getOrDefault(MapleExpStat.結婚紅利經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.結婚紅利經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.組隊額外經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.組隊額外經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.道具裝備紅利經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.道具裝備紅利經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.高級服務贈送經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.高級服務贈送經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.彩虹週獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.彩虹週獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.爆發獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.爆發獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.秘藥額外經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.秘藥額外經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.額外經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.額外經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.加持獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.加持獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.休息獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.休息獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.道具獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.道具獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.依道具趴增加經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.依道具趴增加經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.超值包獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.超值包獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.依道具的組隊任務趴增加經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.依道具的組隊任務趴增加經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.累積狩獵數紅利經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.累積狩獵數紅利經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.家族經驗值獎勵, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.家族經驗值獎勵));
        }
        if (expStats.getOrDefault(MapleExpStat.冷凍勇士經驗值獎勵, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.冷凍勇士經驗值獎勵));
        }
        if (expStats.getOrDefault(MapleExpStat.燃燒場地獎勵經驗, null) != null) {
            Pair<Integer, Integer> expStat = (Pair<Integer, Integer>) expStats.get(MapleExpStat.燃燒場地獎勵經驗);
            mplew.writeInt(expStat.getLeft());
            mplew.writeInt(expStat.getRight());
        }
        if (expStats.getOrDefault(MapleExpStat.HP風險經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.HP風險經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.場地紅利經驗, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.場地紅利經驗));
        }
        if (expStats.getOrDefault(MapleExpStat.累計打獵數量獎勵經驗, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.累計打獵數量獎勵經驗));
        }
        if (expStats.getOrDefault(MapleExpStat.活動獎勵經驗值2, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.活動獎勵經驗值2));
        }
        if (expStats.getOrDefault(MapleExpStat.網咖摯友獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.網咖摯友獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.場地紅利經驗2, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.場地紅利經驗2));
        }
        if (expStats.getOrDefault(MapleExpStat.超級小豬幸運_攻擊額外經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.超級小豬幸運_攻擊額外經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.伺服器計量條活動獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.伺服器計量條活動獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.未知2, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.未知2));
        }
        if (expStats.getOrDefault(MapleExpStat.組隊經驗值增加x趴, null) != null) {
            Pair<Integer, Integer> expStat = (Pair<Integer, Integer>) expStats.get(MapleExpStat.道具名經驗值);
            mplew.writeInt(expStat.getLeft());
        }
        if (expStats.getOrDefault(MapleExpStat.道具名經驗值, null) != null) {
            Pair<Integer, Integer> expStat = (Pair<Integer, Integer>) expStats.get(MapleExpStat.道具名經驗值);
            mplew.writeInt(expStat.getLeft());
            mplew.writeInt(expStat.getRight());
        }
        if (expStats.getOrDefault(MapleExpStat.組隊經驗值增加x趴, null) != null) {
            Pair<Integer, Integer> expStat = (Pair<Integer, Integer>) expStats.get(MapleExpStat.道具名經驗值);
            mplew.writeInt(expStat.getRight());
        }
        if (expStats.getOrDefault(MapleExpStat.蛋糕vs派餅_EXP紅利, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.蛋糕vs派餅_EXP紅利));
        }
        if (expStats.getOrDefault(MapleExpStat.Pvp_Bonus_EXP, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.Pvp_Bonus_EXP));
        }
        if (expStats.getOrDefault(MapleExpStat.寵物訓練紅利經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.寵物訓練紅利經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.組合道具獎勵經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.組合道具獎勵經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.組合道具獎勵組隊經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.組合道具獎勵組隊經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.伺服器加持經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.伺服器加持經驗值));
        }
        if (expStats.getOrDefault(MapleExpStat.累積狩獵數紅利經驗值2, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.累積狩獵數紅利經驗值2));
        }
        if (expStats.getOrDefault(MapleExpStat.艾爾達斯還原追加經驗值, null) != null) {
            mplew.writeInt((int) expStats.get(MapleExpStat.艾爾達斯還原追加經驗值));
        }

        int 遠征隊Bonus經驗值 = 0;
        int 遠征隊關係效果Bonus經驗值 = 0;

        int expedExpMask = 0;
        if (遠征隊Bonus經驗值 > 0) {
            expedExpMask |= 0x1;
        }
        if (遠征隊關係效果Bonus經驗值 > 0) {
            expedExpMask |= 0x2;
        }
        mplew.writeInt(expedExpMask);

        if ((expedExpMask & 0x1) != 0) {
            mplew.writeInt(遠征隊Bonus經驗值);
        }
        if ((expedExpMask & 0x2) != 0) {
            mplew.writeInt(遠征隊關係效果Bonus經驗值);
        }

        if (expStats.getOrDefault(MapleExpStat.艾爾達斯還原追加經驗值, null) != null) {
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    /**
     * 發送封包到客戶端 顯示角色獲得人氣的信息
     *
     * @param gain 增加或者減少多少人氣.
     * @return 封包數據.
     */
    public static byte[] getShowFameGain(int gain) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncPOPMessage);
        mplew.writeInt(gain);

        return mplew.getPacket();
    }

    /**
     * 發送封包到客戶端 顯示角色獲得楓幣的信息
     *
     * @param gain   增加或者減少多少楓幣.
     * @param inChat 是否在聊天框中顯示
     * @return 封包數據.
     */
    public static byte[] showMesoGain(long gain, boolean inChat) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        if (!inChat) {
            gain = Math.min(Integer.MAX_VALUE, gain);
            mplew.write(MessageOpcode.MS_DropPickUpMessage);
            mplew.writeInt(0);//V.144 新增
            mplew.write(0);
            mplew.write(1);
            mplew.write(0);
            mplew.writeInt(gain);
            mplew.writeShort(0);
        } else {
            mplew.write(MessageOpcode.MS_IncMoneyMessage);
            mplew.writeLong(gain);
            int unknown = -1;
            mplew.writeInt(unknown);
            if (unknown != -1) {
                mplew.writeMapleAsciiString("");
            }
        }

        return mplew.getPacket();
    }

    /**
     * 發送封包到客戶端 顯示角色獲得裝備的信息
     *
     * @param itemId   道具的ID.
     * @param quantity 增加或者減少多少.
     * @return 封包數據.
     */
    public static byte[] getShowItemGain(int itemId, int quantity) {
        return getShowItemGain(itemId, quantity, false);
    }

    public static byte[] getShowItemGain(int itemId, int quantity, boolean inChat) {
        if (inChat) {
            return EffectPacket.getShowItemGain(Collections.singletonList(new Pair<>(itemId, quantity)));
        }

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_DropPickUpMessage);
        mplew.writeInt(0);// V.144新增
        mplew.write(0);// V.152 new
        byte bUnk = 0;
        mplew.write(bUnk);
        if (bUnk == 0) {
            mplew.writeInt(itemId);
            mplew.writeInt(quantity);
            mplew.write(0);
        } else if (bUnk == 1) {
            mplew.write(0);
            mplew.writeInt(itemId);
            mplew.writeShort(quantity);
        } else if (bUnk == 2) {
            mplew.writeInt(itemId);
            mplew.writeLong(quantity);
        } else if (bUnk == 8) {
            mplew.writeInt(itemId);
            mplew.writeShort(quantity);
        }

        return mplew.getPacket();
    }

    /**
     * 非商城道具到期
     *
     * @param itemId
     * @return
     */
    public static byte[] showItemExpired(int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_GeneralItemExpireMessage);
        mplew.write(1); //有多少道具
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    /**
     * 技能到期提示
     *
     * @param update
     * @return
     */
    public static byte[] showSkillExpired(Map<Integer, SkillEntry> update) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_SkillExpireMessage);
        mplew.write(update.size()); //有多少技能
        for (Entry<Integer, SkillEntry> skills : update.entrySet()) {
            mplew.writeInt(skills.getKey());
        }

        return mplew.getPacket();
    }

    /**
     * 商城道具到期
     *
     * @param itemId
     * @return
     */
    public static byte[] showCashItemExpired(int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_CashItemExpireMessage);
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    public static byte[] spawnPlayerMapobject(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserEnterField.getValue());

        PacketHelper.addExpirationTime(mplew, System.currentTimeMillis());

        mplew.writeInt(chr.getId());

        mplew.writeInt(0); //V.240 ADD

        mplew.writeInt(chr.getLevel());//V.161 byte=>int
        mplew.writeMapleAsciiString(chr.getName());

        MapleQuestStatus ultExplorer = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.ULT_EXPLORER));
        mplew.writeMapleAsciiString(ultExplorer != null && ultExplorer.getCustomData() != null ? ultExplorer.getCustomData() : "");

        MapleGuild gs;
        if (chr.getGuildId() > 0) {
            gs = WorldGuildService.getInstance().getGuild(chr.getGuildId());
        } else {
            gs = null;
        }
        mplew.writeInt(gs == null ? 0 : gs.getId());
        mplew.writeMapleAsciiString(gs == null ? "" : gs.getName()); // m_sGuildName
        mplew.writeShort(gs == null ? 0 : gs.getLogoBG()); // m_nGuildMarkBg
        mplew.write(gs == null ? 0 : gs.getLogoBGColor()); // m_nGuildMarkBgColor
        mplew.writeShort(gs == null ? 0 : gs.getLogo()); // m_nGuildMark
        mplew.write(gs == null ? 0 : gs.getLogoColor()); // m_nGuildMarkColor
        mplew.writeInt(gs == null || gs.getImageLogo() == null ? 0 : gs.getId());
        mplew.writeInt(gs == null || gs.getImageLogo() == null ? 0 : 1); // ?

        mplew.write(chr.getGender());
        mplew.writeInt(chr.getFame()); //V.152 new
        //稱號
        mplew.writeInt(0);//40
        mplew.write(0);//V.162 new
        mplew.writeInt(0);//V.162 new

        Map<MapleBuffStat, Integer> statups = new HashMap<>(MapleBuffStat.getSpawnList());
        for (Entry<MapleBuffStat, List<MapleBuffStatValueHolder>> it : chr.getAllEffects().entrySet()) {
            if (SkillConstants.isShowForgenBuff(it.getKey()) && !it.getValue().isEmpty()) {
                statups.put(it.getKey(), it.getValue().get(0).value);
            }
        }
        if (chr.isShowSoulEffect()) {
            statups.put(MapleBuffStat.FullSoulMP, chr.getSoulMP());
        }
        BuffPacket.writeForeignBuff(mplew, chr, statups, true);
        chr.writeJobData(mplew);
        mplew.writeInt(chr.getStat().getStarForce());
        mplew.writeInt(chr.getStat().getArc());
        mplew.writeInt(chr.getStat().getAut());//V.181 new
        PacketHelper.addCharLook(mplew, chr, true, chr.isBeta());
        if (JobConstants.is神之子(chr.getJob())) {
            PacketHelper.addCharLook(mplew, chr, true, !chr.isBeta());
        }

        //  sub_74BDA0 TMS 237
        mplew.writeInt(0);
        mplew.write(-1);
        mplew.writeInt(0);
        mplew.write(-1);
        // 
        mplew.writeInt(0);
        mplew.writeInt(0);
        //開始加載玩家特殊效果信息 sub_323DAC0
        int buffSrc = chr.getBuffSource(MapleBuffStat.RideVehicle);
        if (chr.getBuffedValue(MapleBuffStat.NewFlying) != null && buffSrc > 0) {
            addMountId(mplew, chr, buffSrc);
            mplew.writeInt(chr.getId());
        } else {
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        mplew.writeInt(0); //未知
        //
        mplew.writeInt(Math.min(250, chr.getInventory(MapleInventoryType.CASH).countById(5110000))); //紅心巧克力 max is like 100. but w/e
        mplew.writeInt(chr.getItemEffect()); //眼睛之類的特殊效果 5010073 - 人氣美女 的特效
        mplew.writeInt(chr.getItemEffectType()); //幻影殘像之類的特殊效果
        mplew.writeInt(chr.getActiveNickItemID()); //頭頂上面的稱號 3700135
        String sUnk = null;
        mplew.writeBool(sUnk != null);
        if (sUnk != null) {
            mplew.writeMapleAsciiString(sUnk);
        }
        mplew.writeInt(chr.getDamageSkin()); //傷害皮膚效果
        mplew.writeInt(chr.getDamageSkin());
        mplew.writeInt(0); // TMS.230
        mplew.writeMapleAsciiString("");//V.163 new
        mplew.writeMapleAsciiString("");//V.163 new
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(1);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeShort(-1);
        PortableChair chair = chr.getChair();
        mplew.write(chair == null ? 0 : chair.getUnk());
        mplew.writeInt(chair == null ? 0 : chair.getItemId());
//        mplew.writeInt(chair == null ? 0 : chair.getMeso());
//        mplew.writeInt(chair == null ? 0 : chair.getType());
        mplew.writeInt(0);
        mplew.write(0);// V.152 new
        mplew.writePos(chr.getPosition());
        mplew.write(chr.getStance());
        mplew.writeShort(chr.getCurrentFH());
        writeChairData(mplew, chr);
        //開始加載玩家的寵物信息
        for (int i = 0; i <= 4; i++) { // 寵物
            MaplePet pet = chr.getSpawnPet(i);
            boolean isPetSpawned = pet != null && i != 4;
            mplew.write(isPetSpawned);
            if (!isPetSpawned) {
                break;
            }
            mplew.writeInt(chr.getPetIndex(pet));
            PetPacket.addPetInfo(mplew, pet);
        }
//        PacketHelper.addSkillPets(mplew, chr);// todo
        mplew.writeBool(false); //暫時註釋,包數據錯誤導致第二玩家會看到第二隻小白·官方沒有只發送該包·不單獨發送召喚包 PacketHelper.addLittleWhite(mplew, chr);
        //開始玩家坐騎信息
        mplew.writeInt(chr.getMount() != null ? chr.getMount().getLevel() : 1); // 坐騎等級
        mplew.writeInt(chr.getMount() != null ? chr.getMount().getExp() : 0); // 坐騎經驗
        mplew.writeInt(chr.getMount() != null ? chr.getMount().getFatigue() : 0); // 坐騎疲勞

        mplew.writeBool(false); // 未知 V.144新增

        //開始PlayerShop和MiniGame
        PacketHelper.addAnnounceBox(mplew, chr); //沒有占1個 00
        //開始玩家小黑板信息
        mplew.writeBool(chr.getChalkboard() != null && chr.getChalkboard().length() > 0);
        if (chr.getChalkboard() != null && chr.getChalkboard().length() > 0) {
            mplew.writeMapleAsciiString(chr.getChalkboard());
        }
        //開始玩家戒指信息
        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> rings = chr.getRings(true);
        addRingInfo(mplew, rings.getLeft());
        addRingInfo(mplew, rings.getMid());
        addMRingInfo(mplew, rings.getRight(), chr);
        boolean loadObjSwords = true;
        mplew.writeBool(loadObjSwords);
        if (loadObjSwords) {
            Map<Integer, ForceAtomObject> map = chr.getForceAtomObjects();
            mplew.writeInt(map.size());
            for (ForceAtomObject sword : map.values()) {
                AdelePacket.encodeForceAtomObject(mplew, sword);
            }
        }
        int berserk = 0;
        mplew.write(berserk);
        if ((berserk & 0x8) != 0) {
            mplew.writeInt(0);
        }
        if ((berserk & 0x10) != 0) {
            mplew.writeInt(0);
        }
        if ((berserk & 0x20) != 0) {
            mplew.writeInt(0);
        }

        mplew.writeInt(chr.getMount().getItemId());
        if (JobConstants.is凱撒(chr.getJob())) {
            String string2 = chr.getOneInfo(12860, "extern");
            mplew.writeInt(string2 == null ? 0 : Integer.parseInt(string2));
            string2 = chr.getOneInfo(12860, "inner");
            mplew.writeInt(string2 == null ? 0 : Integer.parseInt(string2));
            string2 = chr.getOneInfo(12860, "premium");
            mplew.write(string2 == null ? 0 : Integer.parseInt(string2));
        }
        mplew.writeInt(chr.getMeisterSkillEff());

        //不發送這個5個 FF 就會看到人物頭上的稱號一大堆
        for (int i = 0; i < 5; ++i) {
            mplew.write(chr.getActiveEventNameTag(i));
        }
        mplew.writeInt(0);
        mplew.write(1);
        //
        mplew.writeBool(false);
        // sub_2BA92C0 TMS237
        mplew.writeInt(0);
        // sub_2BAF220 TMS237
        mplew.write(0);
        mplew.writeInt(0);
        // sub_2BAF260 TMS237
        mplew.writeInt(0);

        mplew.writeBool(JobConstants.is凱內西斯(chr.getJob()) && chr.getBuffedIntValue(MapleBuffStat.KinesisPsychicEnergeShield) > 0); // 心魂本能特效
        mplew.write(0);//V.156 new
        mplew.write(0);//V.156 new
        mplew.writeInt(1051291); // 1051291 - 換裝套裝
        mplew.writeBool(false);//V.156 new
        mplew.writeInt(0);
        mplew.writeInt(0);

        mplew.writeInt(0);
        mplew.writeInt(0);

        //  sub_2DFC1F0 TMS.237
        mplew.writeInt(chr.getSkillSkin().size());
        chr.getSkillSkin().forEach((key, value) -> {
            mplew.writeInt(key);
            mplew.writeInt(value);
        });
        //

        // sub_320EDE0 TMS.237
        mplew.writeInt(0);

        // sub_140BEF940 TMS.244
        mplew.writeLong(0);
        mplew.writeInt(-1);

        mplew.write(SpecialPacket.writeWarpToMap(chr, 2));

        return mplew.getPacket();
    }

    public static void addMountId(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, int buffSrc) {
        Item c_mount = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -123);
        Item mount = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18);
        int mountId = GameConstants.getMountItem(buffSrc, chr);
        if (mountId == 0 && c_mount != null && chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -124) != null) {
            mplew.writeInt(c_mount.getItemId());
        } else if (mountId == 0 && mount != null && chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -19) != null) {
            mplew.writeInt(mount.getItemId());
        } else {
            mplew.writeInt(mountId);
        }
    }

    public static byte[] removePlayerFromMap(int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserLeaveField.getValue());
        mplew.writeInt(chrId);

        return mplew.getPacket();
    }

    public static byte[] facialExpression(MapleCharacter from, int expression) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserEmotion.getValue());
        mplew.writeInt(from.getId());
        mplew.writeInt(expression);
        mplew.writeInt(-1); //itemid of expression use
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] movePlayer(int chrId, List<LifeMovementFragment> moves, final int gatherDuration, final int nVal1, final Point mPos, final Point oPos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserMove.getValue());
        mplew.writeInt(chrId);
        PacketHelper.serializeMovementList(mplew, gatherDuration, nVal1, mPos, oPos, moves, null);

        return mplew.getPacket();
    }

    public static byte[] UserMeleeAttack(MapleCharacter chr, int skilllevel, int itemId, AttackInfo attackInfo, boolean hasMoonBuff) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserMeleeAttack.getValue());
        addAttackBody(mplew, chr, skilllevel, itemId, attackInfo, hasMoonBuff, false);
        mplew.writeZeroBytes(20);
        return mplew.getPacket();
    }

    public static byte[] UserBodyAttack(MapleCharacter chr, int skilllevel, int itemId, AttackInfo attackInfo, boolean hasMoonBuff) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserBodyAttack.getValue());
        addAttackBody(mplew, chr, skilllevel, itemId, attackInfo, hasMoonBuff, false);
        mplew.writeZeroBytes(20);
        return mplew.getPacket();
    }

    public static byte[] UserShootAttack(MapleCharacter chr, int skilllevel, int itemId, AttackInfo attackInfo) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserShootAttack.getValue());
        addAttackBody(mplew, chr, skilllevel, itemId, attackInfo, false, true);
        if (JobConstants.is神之子(chr.getJob()) && attackInfo.skillId >= 100000000) {
            mplew.writeInt(attackInfo.position.x);
            mplew.writeInt(attackInfo.position.y);
        } else if (attackInfo.skillposition != null) {
            if (attackInfo.skillId == 破風使者.季風) {    // 季候風為全屏技能，不需要坐標信息
                mplew.writeLong(0);
            } else {
                mplew.writePos(attackInfo.skillposition); // 有些技能要發送技能的坐標信息
            }
        } else if (attackInfo.skillId == 幻獸師.隊伍攻擊) {
            mplew.writeInt(0);
        }
        mplew.writeZeroBytes(20);

        return mplew.getPacket();
    }

    public static byte[] UserMagicAttack(MapleCharacter chr, int skilllevel, int itemId, AttackInfo attackInfo) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserMagicAttack.getValue());
        addAttackBody(mplew, chr, skilllevel, itemId, attackInfo, false, false);
        mplew.writeZeroBytes(20);
        return mplew.getPacket();
    }

    public static void addAttackBody(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, int skilllevel, int itemId, AttackInfo ai, boolean hasMoonBuff, boolean isShootAttack) {
        int skillId = ai.skillId;
        mplew.writeInt(chr.getId()); //角色的ID
        mplew.writeBool(isShootAttack); //V.116.1新增 未知 好像箭矢炮盤 這個地方是1
        mplew.write(ai.numAttackedAndDamage);
        mplew.writeInt(chr.getLevel()); //角色的等級 byte->int V.156
        mplew.writeInt(skilllevel > 0 && skillId > 0 ? skilllevel : 0);//V.161 byte=>int
        if (skilllevel > 0 && skillId > 0) {
            mplew.writeInt(skillId);
        }
        if (JobConstants.is神之子(chr.getJob()) && skillId >= 100000000) {
            mplew.write(0);
        }
        if (isShootAttack && (skillId == 夜使者.四飛閃 || skillId == 重砲指揮官.加農砲連擊 || eA(skillId) > 0)) {
            mplew.writeInt(0);//V.161 byte=>int
        }
        if (skillId == 80001850) {
            mplew.writeInt(0);
        } else if (SkillConstants.getLinkedAttackSkill(skillId) == 陰陽師.紫扇仰波) {
            mplew.write(0);
        }
        mplew.write(isShootAttack ? 8 : ny(skillId));
        int mask = 0;
        int l = 0, r = 0;
        if (hasMoonBuff) {
            mask = 2;
            l = 聖魂劍士.沉月;
            r = 20;
        }
        mplew.write(mask);
        mplew.writeInt(0);//nOption3
        mplew.writeInt(0);//nBySummonedID
        mplew.writeInt(0);
        mplew.write(false);
        if ((mask & 2) != 0) {
//            mplew.writeInt(0);//buckShotInfo.nSkillID
//            mplew.writeInt(0);//buckShotInfo.nSLV
            mplew.writeInt(l);
            mplew.writeInt(r);
        }
        if ((mask & 8) != 0) {
            mplew.write(0);
        }
        mplew.write(ai.display); //攻擊的動作效果 bLeft = ((unsigned int)v29 >> 15) & 1;
        mplew.write(ai.direction); //攻擊的方向 nAction = v29 & 0x7FFF;
//        if (ai.direction < 0x7BA) {
        mplew.write(-1); //攻擊的速度
        mplew.writeShort(0);
        mplew.writeShort(0);
        mplew.write(0);//bShowFixedDamage
        mplew.write(0);
        mplew.write(ai.speed);//nActionSpeed

        mplew.write(chr.getStat().passive_mastery());//nMastery
        mplew.writeInt(itemId);//nBulletItemID
//        }
        for (AttackMobInfo oned : ai.mobAttackInfo) {
            if (oned.damages != null) {
                mplew.writeInt(oned.mobId);
                mplew.write(oned.hitAction);
                mplew.write(oned.left);
                mplew.write(oned.idk3);
                mplew.write(oned.forceActionAndLeft);
                mplew.write(oned.frameIdx);
                mplew.writeInt(0); //這個地方好像是顏色相關 但神之子切換狀態的時候 這個地方為1 打出的攻擊顯示顏色和普通的不同
                mplew.writeInt(0);//V.149 new

                if (skillId == 凱內西斯.擷取心靈 || skillId == 80011050) {
                    mplew.write(oned.damages.length);
                }
                for (long damage : oned.damages) {
                    mplew.writeLong(damage);
                }
                if (sub_870CC0(skillId)) { // 220
                    mplew.writeInt(0);
                }
                if (skillId == 爆拳槍神.雙重壓迫 || skillId == 墨玄.神功_粉碎拳) {
                    mplew.write(0);
                }
                if (skillId == 虎影.魔封葫蘆符_1) {
                    mplew.writeInt(0);
                }
            }
        }

        //魂騎士.日月斬
        if (skillId == 冰雷.雷霆萬鈞 || skillId == 聖魂劍士.黃泉十字架 || skillId == 烈焰巫師.龍氣息 || skillId == 80003075) {
            mplew.writeInt(ai.charge);
        } else if (skillId == 暗影神偷.暗影霧殺 || skillId == 天使破壞者.超級超新星
                || skillId == 80001431 || skillId == 80003084 || skillId == 80011562 || skillId == 神之子.暗影之雨 || skillId == 狂狼勇士.瑪哈的領域 || skillId == 破風使者.季風 || skillId == 暗夜行者.道米尼奧 || skillId == 閃雷悍將.海神降臨
                || skillId == 神之子.進階威力震擊_衝擊波
                || skillId == 神之子.暗影降臨_劍氣
                || skillId == 80011561 || skillId == 80002463 || skillId == 80001762 || skillId == 80002212
                || skillId == 暗夜行者.影之槍_2
                || skillId == 神射手.分裂之矢_1
                || skillId == 神射手.光速神弩_1
                || skillId == 伊利恩.榮耀之翼_強化暗器 || skillId == 伊利恩.榮耀之翼_強化暗器_1 || skillId == 亞克.深淵技能
                || skillId == 凱內西斯.終極_心靈彈丸_1
                || skillId == 通用V核心.異界通用.異界的虛空 || skillId == 神之子.超越者優伊娜的心願_追加打擊
                || skillId == 80002452
                || skillId == 聖騎士.雷神戰槌 || skillId == 聖騎士.雷神戰槌_1
                || skillId == 凱內西斯.引力法則_1
                || skillId == 夜使者.飛閃起爆符_1 || skillId == 夜使者.飛閃起爆符_2
                || skillId == 亞克.無限飢餓的猛獸
                || skillId == 英雄.劍之幻象_1 || skillId == 英雄.劍之幻象_2
                || skillId == 亞克.迷惑之拘束_2
                || skillId == 凱殷.化身_1
                || skillId == 閃雷悍將.槍雷連擊_7 || skillId == 閃雷悍將.槍雷連擊_8
                || skillId == 凱殷.崩壞爆破_2 || skillId == 凱殷.具現_強化崩壞爆破_3 || skillId == 凱殷.具現_強化崩壞爆破_4
                || skillId == 菈菈.釋放_日光井_1 || skillId == 菈菈.釋放_日光井_4
                || skillId == 聖騎士.神聖烙印_1 || skillId == 重砲指揮官.迷你砲彈_1 || skillId == 重砲指揮官.迷你砲彈_2) {
            mplew.writePosInt(chr.getPosition());
        } else if (skillId == 夜光.解放寶珠_2) {
            mplew.writeInt(0);
            mplew.writeRect(new Rectangle());
        } else if (skillId == 破風使者.寒冰亂舞 || skillId == 幻獸師.旋風飛行) {
            mplew.writeShort(0);
            mplew.writeShort(0);
        } else if (skillId == 米哈逸.閃光交叉) {
            mplew.write(0);
        } else if (skillId == 幻獸師.隊伍攻擊) {
            mplew.writeInt(0);
        } else if (skillId == 陰陽師.御身消滅) {
            mplew.writeShort(0);
            mplew.write(0);
        } else if (skillId == 狂狼勇士.極速巔峰_目標鎖定
                || skillId == 爆拳槍神.神聖連發重擊
                || skillId == 暗影神偷.滅殺刃影 || skillId == 暗影神偷.滅殺刃影_1 || skillId == 暗影神偷.滅殺刃影_2 || skillId == 暗影神偷.滅殺刃影_3
                || skillId == 聖魂劍士.雙重狂斬
                || skillId == 拳霸.閃_連殺) {
            mplew.write(1);
            mplew.writePosInt(ai.skillposition == null ? ai.position : ai.skillposition);
        }
        if (skillId == 煉獄巫師.深淵閃電_1) {
            mplew.writeRect(new Rectangle());
        }
        if (sub_8748E0(skillId)) {
            mplew.writeShort(0);
            mplew.writeShort(0);
        }
        if (sub_874950(skillId)) {
            mplew.writeInt(0);
            mplew.write(0);
        }
        if (sub_874720(skillId)) {
            mplew.writeInt(0);
            mplew.write(0);
        }
        if (skillId == 亞克.無法停止的衝動 || skillId == 亞克.無法停止的本能 || skillId == 拳霸.海龍衝鋒 || skillId == 劍豪.一閃_稜) {
            mplew.write(0);
        }
        if (skillId == 陰陽師.御身消滅) {
            mplew.writeShort(0);
            mplew.write(0);
        }
        if (skillId == 開拓者.分裂魔矢) {
            mplew.writeInt(0);
            mplew.write(0);
        }
    }

    private static boolean sub_870CC0(final int a1) {
        if (a1 > 凱內西斯.擷取心靈) {
            if (a1 < 凱內西斯.擷取心靈2 || a1 > 凱內西斯.終極技_心靈射擊 && a1 != 凱內西斯.猛烈心靈2_最後一擊) {
                return false;
            }
        } else if (a1 != 凱內西斯.擷取心靈 && a1 != 凱內西斯.心靈領域_攻擊 && a1 != 凱內西斯.猛烈心靈 && a1 != 凱內西斯.猛烈心靈2) {
            return false;
        }
        return true;
    }

    private static boolean sub_874950(int a1) {
        boolean v1; // zf

        if (a1 > 開拓者.基本爆破4轉_1) {
            if (a1 == 開拓者.古代神矢_爆破_1) {
                return true;
            }
            v1 = a1 == 開拓者.究極炸裂_1;
        } else {
            if (a1 == 開拓者.基本爆破4轉_1 || a1 == 開拓者.基本爆破_1 || a1 == 開拓者.三重衝擊_1) {
                return true;
            }
            v1 = a1 == 開拓者.基本爆破強化_1;
        }
        return v1;
    }

    private static boolean sub_874720(int a1) {
        boolean v1; // zf

        if (a1 > 伊利恩.神怒寶劍_2) {
            if (a1 > 卡蒂娜.召喚_AD大砲_1) {
                if (a1 == 拳霸.海之霸主_1 || a1 == 重砲指揮官.超級巨型加農砲彈) {
                    return true;
                }
                v1 = a1 - 重砲指揮官.超級巨型加農砲彈 == 8;
            } else {
                if (a1 == 卡蒂娜.召喚_AD大砲_1) {
                    return true;
                }
                if (a1 > 夜使者.散式投擲_四飛閃) {
                    v1 = a1 == 夜使者.風魔手裏劍;
                } else {
                    if (a1 >= 夜使者.散式投擲_雙飛斬 || a1 == 陰陽師.怨靈解放陣) {
                        return true;
                    }
                    v1 = a1 == 陰陽師.怨靈解放陣_2;
                }
            }
            return v1;
        }
        if (a1 < 伊利恩.神怒寶劍_1) {
            if (a1 > 黑騎士.斷罪之槍) {
                switch (a1) {
                    case 烈焰巫師.炙熱元素火焰:
                    case 凱內西斯.心靈龍捲風_4:
                    case 凱內西斯.心靈龍捲風_5:
                    case 凱內西斯.心靈龍捲風_6:
                    case 火毒.劇毒新星:
                    case 煉獄巫師.黑魔祭壇:
                    case 凱內西斯.終極_移動物質:
                        return true;
                    default:
                        return false;
                }
            }
            if (a1 != 黑騎士.斷罪之槍) {
                if (a1 > 伊利恩.技藝_子彈Ⅱ) {
                    v1 = a1 == 伊利恩.技藝_朗基努斯;
                } else {
                    if (a1 == 伊利恩.技藝_子彈Ⅱ || a1 == 80002691) {
                        return true;
                    }
                    v1 = a1 == 伊利恩.技藝_子彈;
                }
                return v1;
            }
        }
        return true;
    }

    private static boolean sub_8748E0(int a1) {
        boolean v1; // zf

        if (a1 <= 卡蒂娜.召喚_炸彈投擲_1) {
            if (a1 == 卡蒂娜.召喚_炸彈投擲_1) {
                return true;
            }
            if (a1 > 開拓者.基本爆破強化_1) {
                if (a1 == 開拓者.基本爆破4轉_1) {
                    return true;
                }
                v1 = a1 == 開拓者.古代神矢_爆破_1;
            } else {
                if (a1 == 開拓者.基本爆破強化_1 || a1 == 開拓者.基本爆破_1) {
                    return true;
                }
                v1 = a1 == 開拓者.三重衝擊_1;
            }
            return v1;
        }
        if (a1 > 凱內西斯.終極_移動物質_1) {
            v1 = a1 == 開拓者.究極炸裂_1;
            return v1;
        }
        if (a1 != 凱內西斯.終極_移動物質_1) {
            if (a1 < 凱內西斯.心靈龍捲風_1) {
                return false;
            }
            if (a1 > 凱內西斯.心靈龍捲風_3) {
                v1 = a1 == 火毒.劇毒新星_1;
                return v1;
            }
        }
        return true;
    }

    public static int eA(final int n) {
        switch (n) {
            case 英雄.狂暴攻擊:
            case 英雄.狂暴攻擊_爆擊:
                return 英雄.狂暴攻擊_攻擊加成;
            case 聖騎士.鬼神之擊:
                return 聖騎士.鬼神之擊_攻擊加成;
            case 聖騎士.騎士衝擊波:
                return 聖騎士.騎士衝擊波_攻擊加成;
            case 聖騎士.神聖衝擊:
            case 聖騎士.神聖衝擊_1:
                return 聖騎士.神聖衝擊_額外攻擊;
            case 火毒.火焰之襲:
                return 火毒.火焰之襲_額外攻擊;
            case 冰雷.閃電連擊:
                return 冰雷.閃電連擊_攻擊加成;
            case 箭神.暴風神射:
                return 箭神.暴風神射_多重射擊;
            case 箭神.驟雨狂矢:
                return 箭神.驟雨狂矢_攻擊加成;
            case 神射手.光速神弩:
            case 神射手.光速神弩_1:
            case 神射手.光速神弩II:
            case 神射手.光速神弩II_1:
            case 神射手.覺醒神弩:
            case 神射手.覺醒神弩II:
            case 神射手.覺醒神弩II_1:
                return 神射手.光速神弩_攻擊加成;
            case 神射手.必殺狙擊:
                return 神射手.必殺狙擊_額外攻擊;
            case 開拓者.基本釋放:
            case 開拓者.基本釋放強化:
            case 開拓者.基本釋放4轉:
            case 開拓者.基本爆破:
            case 開拓者.基本爆破強化:
            case 開拓者.基本爆破4轉:
            case 開拓者.基本爆破_1:
            case 開拓者.基本爆破強化_1:
            case 開拓者.基本爆破4轉_1:
            case 開拓者.基本轉移:
            case 開拓者.基本轉移4轉:
            case 開拓者.基本轉移_1:
            case 開拓者.基本轉移4轉_1:
                return 開拓者.基本之力_額外攻擊;
            case 暗影神偷.冷血連擊:
                return 暗影神偷.冷血連擊_額外攻擊;
            case 影武者.幻影箭:
                return 影武者.幻影箭_攻擊加成;
            case 影武者.短劍升天:
                return 影武者.短劍升天_額外攻擊;
            case 拳霸.閃_連殺:
                return 拳霸.閃_連殺_攻擊加成;
            case 拳霸.勾拳爆破:
                return 拳霸.勾拳爆破_額外攻擊;
            case 槍神.爆頭射擊:
                return 槍神.爆頭射擊_攻擊加成;
            case 重砲指揮官.加農砲火箭:
                return 重砲指揮官.加農砲火箭_攻擊加成;
            case 重砲指揮官.雙胞胎猴子:
            case 重砲指揮官.雙胞胎猴子_1:
                return 重砲指揮官.雙胞胎猴子_傷害分裂;
            case 蒼龍俠客.龍襲亂舞:
                return 蒼龍俠客.龍襲亂舞_次數強化;
            case 蒼龍俠客.穿心掌打:
                return 蒼龍俠客.穿心掌打_次數強化;
            case 聖魂劍士.新月分裂:
                return 聖魂劍士.分裂與穿刺_次數強化;
            case 烈焰巫師.極致熾烈_1:
                return 烈焰巫師.滅絕炙陽_範圍增加;
            case 烈焰巫師.元素火焰_1:
            case 烈焰巫師.元素火焰II_1:
            case 烈焰巫師.元素火焰III_1:
            case 烈焰巫師.元素火焰IV_1:
                return 烈焰巫師.元素火焰_速發反擊;
            case 破風使者.破風之箭:
                return 破風使者.破風之箭_次數強化;
            case 暗夜行者.四倍緩慢:
                return 暗夜行者.五連投擲_爆擊機率;
            case 閃雷悍將.颱風:
            case 閃雷悍將.疾風:
                return 閃雷悍將.疾風_次數強化;
            case 閃雷悍將.霹靂:
                return 閃雷悍將.霹靂_次數強化;
            case 狂狼勇士.比耀德:
            case 狂狼勇士.比耀德_2擊:
            case 狂狼勇士.比耀德_3擊:
            case 狂狼勇士.比耀德_1:
            case 狂狼勇士.芬里爾墬擊:
                return 狂狼勇士.比耀德_攻擊加成;
            case 狂狼勇士.終極之矛_1:
            case 狂狼勇士.終極之矛:
                return 21120047; // 狂狼勇士.終極之矛_加碼攻擊
            case 21120006: // 狂狼勇士.極冰暴風
                return 21120049; // 狂狼勇士.極冰暴風_加碼攻擊
            case 龍魔導士.閃雷之捷_攻擊:
                return 龍魔導士.龍之捷_雷霆攻擊加成;
            case 隱月.鬼斬:
            case 隱月.真_鬼斬:
                return 隱月.鬼斬_次數強化;
            case 惡魔殺手.惡魔衝擊:
                return 惡魔殺手.惡魔衝擊_攻擊加成;
            case 機甲戰神.巨型火炮_IRON_B:
                return 機甲戰神.巨型火炮_IRON_B_攻擊加成;
            case 爆拳槍神.錘之碎擊_2:
            case 爆拳槍神.衝擊波動_1:
                return 爆拳槍神.重擊_衝擊波動攻擊加成;
            case 劍豪.神速無雙:
                return 劍豪.神速無雙_次數強化;
            case 劍豪.一閃:
                return 劍豪.一閃_次數強化;
            case 劍豪.瞬殺斬:
            case 劍豪.瞬殺斬_1:
                return 劍豪.瞬殺斬_次數強化;
            case 陰陽師.破邪連擊符:
                return 陰陽師.破邪連擊符_擴充符;
            case 51121008: // 米哈逸.聖光爆發
                return 51120048; // 米哈逸.聖光爆發_攻擊加成
            case 米哈逸.靈魂突擊:
                return 米哈逸.靈魂突擊_獎勵加成;
            case 米哈逸.閃光交叉:
            case 米哈逸.閃光交叉_安裝:
                return 米哈逸.閃光交叉_攻擊加成;
            case 凱撒.藍焰恐懼:
            case 凱撒.藍焰恐懼_變身:
                return 凱撒.藍焰恐懼_加碼攻擊;
            case 天使破壞者.三位一體:
            case 天使破壞者.三位一體_2擊:
            case 天使破壞者.三位一體_3擊:
                return 天使破壞者.三位一體_三重反擊;
            case 幻獸師.憤怒亂打:
                return 幻獸師.憤怒亂打_次數提升;
            case 幻獸師.電光石火:
                return 幻獸師.電光石火_攻擊加成;
            case 幻獸師.隊伍轟炸:
                return 幻獸師.隊伍轟炸_臨時目標;
            case 幻獸師.朋友發射:
            case 幻獸師.朋友發射2:
            case 幻獸師.朋友發射3:
            case 幻獸師.朋友發射4:
                return 幻獸師.朋友發射_攻擊加成;
            case 伊利恩.技藝_暗器:
            case 伊利恩.榮耀之翼_強化暗器:
            case 伊利恩.技藝_暗器Ⅱ:
                return 伊利恩.暗器_額外攻擊;
            case 伊利恩.技藝_朗基努斯:
                return 伊利恩.朗基努斯_額外攻擊;
            case 伊利恩.水晶技能_德烏斯:
            case 伊利恩.水晶技能_德烏斯_1:
                return 伊利恩.德烏斯_額外攻擊;
            default:
                return 0;
        }
    }

    public static int ny(int n2) {
        switch (n2) {
            case 火毒.火靈結界:
            case 惡魔殺手.變形:
            case 陰陽師.破魔陣:
            case 天使破壞者.超級超新星: {
                return 4;
            }
        }
        return 0;
    }

    /*
     * 特殊攻擊效果顯示
     */
    public static byte[] showSpecialAttack(int chrId, int tickCount, int pot_x, int pot_y, int display, int skillId, int skilllevel, boolean isLeft, int speed) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ThrowGrenade.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(tickCount);
        mplew.writeInt(pot_x);
        mplew.writeInt(pot_y);
        mplew.writeInt(display);
        mplew.writeInt(skillId);
        mplew.writeInt(0);//119
        mplew.writeInt(skilllevel);
        mplew.write(isLeft ? 1 : 0);
        mplew.writeInt(speed);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 更新玩家外觀
     */
    public static byte[] updateCharLook(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserAvatarModified.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(1);
        PacketHelper.addCharLook(mplew, chr, false, chr.isBeta());
        mplew.writeInt(0);
        mplew.write(0xFF);
        mplew.writeInt(0);
        mplew.write(0xFF);
        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> rings = chr.getRings(false);
        addRingInfo(mplew, rings.getLeft());
        addRingInfo(mplew, rings.getMid());
        addMRingInfo(mplew, rings.getRight(), chr);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 更新神之子切換後的外觀
     */
    public static byte[] updateZeroLook(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ZeroTag.getValue());
        mplew.writeInt(chr.getId());
        PacketHelper.addCharLook(mplew, chr, false, chr.isBeta());
        mplew.writeHexString("00 00 00 00 FF 00 00 00 00 FF");

        return mplew.getPacket();
    }

    public static byte[] removeZeroFromMap(int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ZeroLastAssistState.getValue());
        mplew.writeInt(chrId);

        return mplew.getPacket();
    }

    // spawnPlayer
    public static void addRingInfo(MaplePacketLittleEndianWriter mplew, List<MapleRing> rings) {
        mplew.writeBool(!rings.isEmpty());
        if (rings.size() > 0) {
            mplew.writeInt(rings.size());
            for (MapleRing ring : rings) {
                mplew.writeLong(ring.getRingId()); //自己的戒指ID
                mplew.writeLong(ring.getPartnerRingId()); //對方的戒指ID
                mplew.writeInt(ring.getItemId()); //戒指的道具ID
            }
        }
    }

    /*
     * 結婚戒指
     */
    public static void addMRingInfo(MaplePacketLittleEndianWriter mplew, List<MapleRing> rings, MapleCharacter chr) {
        mplew.write(rings.size() > 0);
        if (rings.size() > 0) {
            MapleRing ring = rings.get(0);
            mplew.writeInt(chr.getId());
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeInt(ring.getItemId());
        }
    }

    public static byte[] damagePlayer(int chrId, int type, int monsteridfrom, int damage) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserHit.getValue());
        mplew.writeInt(chrId);
        mplew.write(type);
        mplew.writeInt(damage);
        mplew.write(0);
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(monsteridfrom);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(damage);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] damagePlayer(TakeDamageHandler.UserHitInfo info) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserHit.getValue());
        mplew.writeInt(info.getCharacterID());
        mplew.write(info.getType());
        mplew.writeInt(info.getDamage());
        mplew.writeBool(info.isCritical());
        mplew.writeBool(info.isUnkb());
        if (!info.isUnkb()) {
            mplew.write(0);
        }
        if (info.getType() < -1) {
            if (info.getType() == -8) {
                mplew.writeInt(1);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeBool(false);//V.181 new
            }
        } else {
            mplew.writeInt(info.getTemplateID());
            mplew.write(info.getDirection());
            mplew.writeInt(info.getObjectID());
            mplew.writeInt(info.getSkillID());
            mplew.writeInt(info.getRefDamage());
            mplew.write(info.getDefType());
            if (info.getRefDamage() > 0) {
                mplew.writeBool(info.isRefPhysical());
                mplew.writeInt(info.getRefOid());
                mplew.write(info.getRefType());
                mplew.writePos(info.getPos());
            }
            mplew.write(info.getOffset());
            if ((info.getOffset() & 1) != 0) {
                mplew.writeInt(info.getOffset_d());
            }
        }
        mplew.writeInt(info.getDamage());
        if (info.getDamage() <= 0) {
            mplew.writeInt(info.getOffset_d());
        }
        return mplew.getPacket();
    }

    /**
     * 更新任務
     *
     * @param quest
     * @return
     */
    public static byte[] updateQuest(MapleQuestStatus quest) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        //[2D 00] [01] [46 2D] [01] [03 00 30 35 38]
        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_QuestRecordMessage);
        mplew.writeInt(quest.getQuest().getId());
        mplew.write(quest.getStatus());
        switch (quest.getStatus()) {
            case 0: //新任務？
                mplew.write(1);
                break;
            case 1: //更新任務
                mplew.writeMapleAsciiString(quest.getCustomData() != null ? quest.getCustomData() : "");
                break;
            case 2: //完成任務
                mplew.writeLong(PacketHelper.getTime(quest.getCompletionTime()));
                break;
        }

        return mplew.getPacket();
    }

    /*
     * 更新任務信息
     */
    public static byte[] updateInfoQuest(int quest, String data) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_QuestRecordExMessage);
        mplew.writeInt(quest);
        mplew.writeMapleAsciiString(data == null ? "" : data);

        return mplew.getPacket();
    }

    /**
     * 更新任務信息
     *
     * @param quest     任務ID
     * @param npc       任務NPC
     * @param nextquest 下一項任務
     * @param updata    是否更新數據
     * @return 返回任務更新數據結果數據包
     */
    public static byte[] updateQuestInfo(int quest, int npc, int nextquest, boolean updata) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserQuestResult.getValue());
        mplew.write(0x0B);
        mplew.writeInt(quest);
        mplew.writeInt(npc);
        mplew.writeInt(nextquest);
        mplew.writeBool(updata);

        return mplew.getPacket();
    }

    public static byte[] startQuestTimeLimit(int n2, int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserQuestResult.getValue());
        mplew.write(7);
        mplew.writeShort(1);
        mplew.writeInt(n2);
        mplew.writeInt(n3);

        return mplew.getPacket();
    }

    public static byte[] stopQuestTimeLimit(int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserQuestResult.getValue());
        mplew.write(0x13);
        mplew.writeInt(n2);

        return mplew.getPacket();
    }

    /*
     * 更新重新獲取勳章任務信息
     */
    public static byte[] updateMedalQuestInfo(byte op, int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MedalReissueResult.getValue());
        /*
         * 0x00 = 領取成功
         * 0x03 = 已經有這個勳章
         */
        mplew.write(op);
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    public static byte[] showCharacterInfo(MapleCharacter chr, boolean isSelf) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CharacterInfo.getValue());
        mplew.writeInt(chr.getId()); //角色ID
        mplew.writeInt(chr.getLevel()); //等級 V.161 byte=>int
        chr.writeJobData(mplew); // short short
        mplew.write(chr.getStat().pvpRank); //PK等級
        mplew.writeInt(chr.getFame()); //人氣
        MapleRing mRing = chr.getMarriageRing(); //結婚戒指
        mplew.write(mRing != null ? 1 : 0);
        if (mRing != null) { // length : 52
            mplew.writeInt(mRing.getRingId());
            mplew.writeInt(chr.getId());
            mplew.writeInt(mRing.getPartnerChrId());
            mplew.writeShort(0x03);
            mplew.writeInt(mRing.getItemId());
            mplew.writeInt(mRing.getItemId());
            mplew.writeAsciiString(chr.getName(), 15);
            mplew.writeAsciiString(mRing.getPartnerName(), 15);
        }
        //專業技能
        List<Integer> prof = chr.getProfessions();
        mplew.write(prof.size());
        for (int i : prof) {
            mplew.writeShort(i);
        }
        //公會和公會聯盟
        if (chr.getGuildId() <= 0) {
            mplew.writeMapleAsciiString("-");
            mplew.writeMapleAsciiString("");
        } else {
            MapleGuild gs = WorldGuildService.getInstance().getGuild(chr.getGuildId());
            if (gs != null) {
                mplew.writeMapleAsciiString(gs.getName());
                if (gs.getAllianceId() > 0) {
                    MapleGuildAlliance allianceName = WorldAllianceService.getInstance().getAlliance(gs.getAllianceId());
                    if (allianceName != null) {
                        mplew.writeMapleAsciiString(allianceName.getName());
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
        mplew.write(-1);
        mplew.write(/*isSelf ? 1 : */0); //是否顯示寵物信息

        mplew.writeMapleAsciiString(""); // 自我介紹
        mplew.write(0);//表情
        mplew.write(0);//星座
        mplew.write(0);//血型
        mplew.write(0);//月份
        mplew.write(0);//日期

        //寵物信息
        MaplePet[] pets = chr.getSpawnPets();
        mplew.writeBool(chr.getNoPets() > 0);
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null && pets[i].getSummoned()) { //已召喚的寵物
                mplew.write(1);
                mplew.writeInt(i);
                mplew.writeInt(pets[i].getPetItemId()); //寵物的道具ID
                mplew.writeMapleAsciiString(pets[i].getName()); //寵物名
                mplew.write(pets[i].getLevel()); //寵物等級
                mplew.writeShort(pets[i].getCloseness()); //寵物親密度
                mplew.write(pets[i].getFullness()); //寵物飢餓度
                mplew.writeShort(pets[i].getFlags()); //寵物的狀態
                Item inv = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) (i == 0 ? -114 : (i == 1 ? -122 : -124)));
                mplew.writeInt(inv == null ? 0 : inv.getItemId());
                mplew.writeInt(-1); //T071新增
            }
        }
        mplew.write(0); // End of pet
        //坐騎信息
        /*
         * if (chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) (-18)) != null && chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) (-19)) != null) {
         * int itemid = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18).getItem();
         * MapleMount mount = chr.getMount();
         * boolean canwear = MapleItemInformationProvider.getInstance().getReqLevel(itemid) <= chr.getLevel();
         * mplew.write(canwear ? 1 : 0);
         * if (canwear) {
         * mplew.writeInt(mount.getLevel()); //等級
         * mplew.writeInt(mount.getExp()); //經驗
         * mplew.writeInt(mount.getFatigue()); //疲勞度
         * }
         * } else {
         * mplew.write(0); //沒有坐騎
         * }
         */
        //購物車信息
//        int wishlistSize = chr.getWishlistSize();
//        mplew.write(wishlistSize);
//        if (wishlistSize > 0) {
//            int[] wishlist = chr.getWishlist();
//            for (int x = 0; x < wishlistSize; x++) {
//                mplew.writeInt(wishlist[x]);
//            }
//        }
        //當前佩戴的勳章
        Item medal = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -26);
        mplew.writeInt(medal == null ? 0 : medal.getItemId());
        //任務獲得勳章列表
        List<Pair<Integer, Long>> medalQuests = chr.getCompletedMedals();
        mplew.writeShort(medalQuests.size());
        for (Pair<Integer, Long> x : medalQuests) {
            mplew.writeInt(x.left);
            mplew.writeLong(x.right);
        }

        //傷害皮膚
        PacketHelper.addDamageSkinInfo(mplew, chr);

        //傾向系統信息(6個)
        for (MapleTraitType t : MapleTraitType.values()) {
            mplew.write(chr.getTrait(t).getLevel());
        }
        mplew.writeInt(0x00); //T071新增
        mplew.writeInt(0x00); //T071新增
        mplew.writeBool(false);//V.164 new
        /*
        //椅子列表
        List<Integer> chairs = new ArrayList<>();
        for (Item i : chr.getInventory(MapleInventoryType.SETUP).newList()) {
            if (i.getItemId() / 10000 == 301 && !chairs.contains(i.getItemId())) {
                chairs.add(i.getItemId());
            }
        }
        mplew.writeInt(chairs.size());
        for (int i : chairs) {
            mplew.writeInt(i);
        }
        //勳章列表
        List<Integer> medals = new ArrayList<>();
        for (Item i : chr.getInventory(MapleInventoryType.EQUIP).list()) {
            if (i.getItemId() >= 1142000 && i.getItemId() < 1152000) {
                medals.add(i.getItemId());
            }
        }
        mplew.writeInt(medals.size());
        for (int i : medals) {
            mplew.writeInt(i);
        }
         */
//        writeDamageSkinData(mplew, chr);
        return mplew.getPacket();
    }

    public static byte[] updateMount(MapleCharacter chr, boolean levelup) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetTamingMobInfo.getValue());
        mplew.writeInt(chr.getId());
        mplew.writeInt(chr.getMount().getLevel());
        mplew.writeInt(chr.getMount().getExp());
        mplew.writeInt(chr.getMount().getFatigue());
        mplew.write(levelup ? 1 : 0);

        return mplew.getPacket();
    }

    //    public static byte[] mountInfo(MapleCharacter chr) {
//        if (ServerConstants.isShowPacket()) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.UPDATE_MOUNT.getValue());
//        mplew.writeInt(chr.getId());
//        mplew.write(1);
//        mplew.writeInt(chr.getMount().getLevel());
//        mplew.writeInt(chr.getMount().getExp());
//        mplew.writeInt(chr.getMount().getFatigue());
//
//        return mplew.getPacket();
//    }
    public static byte[] updateSkill(int skillid, int level, int masterlevel, long expiration) {
        boolean isProfession = skillid == 92000000 || skillid == 92010000 || skillid == 92020000 || skillid == 92030000 || skillid == 92040000;
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeSkillRecordResult.getValue());
        mplew.writeBool(!isProfession);
        mplew.writeBool(isProfession);
        mplew.write(0x00); //未知 V.114 新增
        mplew.writeShort(1); //有多少個技能
        mplew.writeInt(skillid);
        mplew.writeInt(level);
        mplew.writeInt(masterlevel);
        PacketHelper.addExpirationTime(mplew, expiration);
        mplew.write(8);

        return mplew.getPacket();
    }

    public static byte[] updateSkills(Map<Integer, SkillEntry> update) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeSkillRecordResult.getValue());
        mplew.write(0x01); //刪除技能為 0x00 獲得技能為 0x01
        mplew.write(0x00);
        mplew.write(0x00); //未知 V.114 新增
        mplew.writeShort(update.size());
        for (Entry<Integer, SkillEntry> skills : update.entrySet()) {
            mplew.writeInt(skills.getKey());
            mplew.writeInt(skills.getValue().skillevel);
            mplew.writeInt(skills.getValue().masterlevel);
            PacketHelper.addExpirationTime(mplew, skills.getValue().expiration);
        }
        mplew.write(8);

        return mplew.getPacket();
    }

    public static byte[] updatePetSkill(int skillid, int level, int masterlevel, long expiration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeSkillRecordResult.getValue());
        mplew.write(0x00);
        mplew.write(0x01); //寵物是0x01
        mplew.write(0x00); //未知 V.114 新增
        mplew.writeShort(0x01); //技能的數量
        mplew.writeInt(skillid);
        mplew.writeInt(level == 0 ? -1 : level);
        mplew.writeInt(masterlevel);
        PacketHelper.addExpirationTime(mplew, expiration);
        mplew.write(8);

        return mplew.getPacket();
    }

    public static byte[] updateQuestMobKills(MapleQuestStatus status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_QuestRecordMessage);
        mplew.writeInt(status.getQuest().getId());
        mplew.write(1);
        StringBuilder sb = new StringBuilder();
        for (int kills : status.getMobKills().values()) {
            sb.append(StringUtil.getLeftPaddedStr(String.valueOf(kills % 1000), '0', 3));
        }
        mplew.writeMapleAsciiString(sb.toString());

        return mplew.getPacket();
    }

    public static byte[] getShowQuestCompletion(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_QuestClear.getValue());
        mplew.writeInt(id);

        return mplew.getPacket();
    }

    /*
     * 發送角色的鍵盤設置
     */
    public static byte[] getKeymap(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FuncKeyMappedInit.getValue());
        MapleKeyLayout[] keymaps = chr.getKeyLayouts();
        for (MapleKeyLayout keymap : keymaps) {
            keymap.writeData(mplew, JobConstants.is幻獸師(chr.getJob()) ? 5 : 1);
        }

        return mplew.getPacket();
    }

    /*
     * 寵物自動加血
     */
    public static byte[] petAutoHP(int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PetConsumeItemInit.getValue());
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    /*
     * 寵物自動加藍
     */
    public static byte[] petAutoMP(int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PetConsumeMPItemInit.getValue());
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    /*
     * 寵物自動加BUFF狀態
     */
    public static byte[] petAutoBuff(int skillId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PET_AUTO_BUFF.getValue());
        mplew.writeInt(skillId);

        return mplew.getPacket();
    }

    /*
     * 打開釣魚記錄NPC
     */
    public static byte[] openFishingStorage(int type, HiredFisher hf, MerchItemPackage pack, int playrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * AF 00
         * 21
         * FF FF FF FF FF FF FF FF
         * 00
         * 00 00 00 00 00 00 00 00
         * 9E 4E 08 00
         */
        mplew.writeShort(SendPacketOpcode.FISHING_STORE.getValue());
        mplew.write(type);
        switch (type) {
            case 33: {
                mplew.writeInt(-1);
                break;
            }
            case 35: {
                mplew.writeInt(pack != null ? (int) pack.getMesos() : 0);
                mplew.writeLong(pack != null ? (long) ((int) pack.getExp()) : 0);
                writeHiredFisher(mplew, hf, pack, playrId);
                break;
            }
            case 28:
            case 30: {
                mplew.writeInt(hf.getObjectId());
                writeHiredFisher(mplew, hf, pack, playrId);
                break;
            }
            case 15: {
                mplew.writeInt(0);
                mplew.write(0);
                break;
            }
            case 22: {
                mplew.writeInt(hf.getOwnerId());
                mplew.write(1);
                break;
            }
            case 23: {
                mplew.writeInt(hf.getOwnerId());
                break;
            }
            case 43:
            case 45: {
                mplew.writeLong(DateUtil.getKoreanTimestamp(hf.getStartTime()));
                mplew.writeLong(DateUtil.getKoreanTimestamp(hf.getStopTime()));
            }
        }

        return mplew.getPacket();
    }

    public static void writeHiredFisher(MaplePacketLittleEndianWriter mplew, HiredFisher hf, MerchItemPackage itemPackage, int playrId) {
        long l2 = -1;
        mplew.writeLong(l2);
        mplew.writeInt(0);
        EnumMap<MapleInventoryType, ArrayList<Item>> items = new EnumMap<>(MapleInventoryType.class);
        items.put(MapleInventoryType.EQUIP, new ArrayList<>());
        items.put(MapleInventoryType.USE, new ArrayList<>());
        items.put(MapleInventoryType.SETUP, new ArrayList<>());
        items.put(MapleInventoryType.ETC, new ArrayList<>());
        items.put(MapleInventoryType.CASH, new ArrayList<>());
        items.put(MapleInventoryType.DECORATION, new ArrayList<>());
        if (hf != null) {
            hf.getItems().forEach(item -> items.get(ItemConstants.getInventoryType(item.getItem().getItemId())).add(item.getItem()));
        } else if (itemPackage != null) {
            itemPackage.getItems().forEach(item -> items.get(ItemConstants.getInventoryType(item.getItemId())).add(item));
        }
        items.forEach((key, value) -> {
            mplew.write(value.size());
            value.forEach(item -> PacketHelper.GW_ItemSlotBase_Encode(mplew, item));
        });
        items.clear();
        mplew.writeInt(hf != null ? hf.getOwnerId() : playrId);
    }

    public static byte[] fairyPendantMessage(int position, int stage, int percent, long startTime, long time, boolean inChat) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_BonusExpRateChanged.getValue());
        mplew.writeInt(Math.abs(position)); // 道具的位置
        mplew.writeInt(stage); // 累計階段
        mplew.writeInt(percent); // 百分比經驗提示
        mplew.writeLong(PacketHelper.getTime(startTime)); // 開始時間
        mplew.writeLong(time); // 今天套用時間(分鐘)
        mplew.writeShort(inChat ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] giveFameResponse(int mode, String charname, int newfame) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GivePopularityResult.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(charname);
        mplew.write(mode);
        mplew.writeInt(newfame);

        return mplew.getPacket();
    }

    public static byte[] giveFameErrorResponse(int status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        /*
         * * 0: ok, use giveFameResponse<br> 1: the username is incorrectly
         * entered<br> 2: users under level 15 are unable to toggle with
         * fame.<br> 3: can't raise or drop fame anymore today.<getFitOptionList> 4: can't
         * raise or drop fame for this character for this month anymore.<br> 5:
         * received fame, use receiveFame()<br> 6: level of fame neither has
         * been raised nor dropped due to an unexpected error
         */
        mplew.writeShort(SendPacketOpcode.LP_GivePopularityResult.getValue());
        mplew.write(status);

        return mplew.getPacket();
    }

    public static byte[] receiveFame(int mode, String charnameFrom) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GivePopularityResult.getValue());
        mplew.write(5);
        mplew.writeMapleAsciiString(charnameFrom);
        mplew.write(mode);

        return mplew.getPacket();
    }

    public static byte[] multiChat(String name, String chattext, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GroupMessage.getValue());
        mplew.write(mode); // 0 好友聊天; 1 組隊聊天; 2 公會聊天; 4 遠征聊天
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeMapleAsciiString(name);
        mplew.writeMapleAsciiString(chattext);
        PacketHelper.addChaterName(mplew, name, chattext);

        return mplew.getPacket();
    }

    public static byte[] multiItemChat(String name, String chattext, int mode, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GroupItemMessage.getValue());
        mplew.write(mode); // 0 好友聊天; 1 組隊聊天; 2 公會聊天; 4 遠征聊天
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeMapleAsciiString(name);
        mplew.writeMapleAsciiString(chattext);
        PacketHelper.addChaterName(mplew, name, chattext);
        mplew.write(item != null);
        if (item != null) {
            mplew.write(1);
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
            mplew.writeMapleAsciiString(item.getName());
        }

        return mplew.getPacket();
    }

    public static byte[] getClock(int time) { // time in seconds
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(2); // clock type. if you send 3 here you have to send another byte (which does not matter at all) before the timestamp
        mplew.writeInt(time);

        return mplew.getPacket();
    }

    public static byte[] getClockTime(int hour, int min, int sec) { // Current Time
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * Recv CLOCK [00BE] (6)
         * [BE 00] [01] [0F] [0B] [0F]
         * ?....
         */
        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(1); //Clock-Type
        mplew.write(hour);
        mplew.write(min);
        mplew.write(sec);

        return mplew.getPacket();
    }

    public static byte[] getClock3(final int n, final int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(3);
        mplew.write(1);
        mplew.writeInt(n2);
        return mplew.getPacket();
    }

    public static byte[] getClock40(final int n, final int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(40);
        mplew.writeInt(n2);
        mplew.writeInt(n);
        return mplew.getPacket();
    }

    public static byte[] setClockPause(final boolean pause, final int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(7);
        mplew.write(pause);
        mplew.writeInt(duration);
        mplew.writeInt(10);
        return mplew.getPacket();
    }

    public static byte[] getClockMillis(final int millis) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(6);
        mplew.writeInt(millis);
        return mplew.getPacket();
    }

    public static byte[] getClock8(final int passedSec, final int durationSec) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(8);
        mplew.writeInt(durationSec);
        mplew.writeInt(passedSec);
        return mplew.getPacket();
    }

    public static byte[] getClockGiantBoss(final int duration, final int leftTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Clock.getValue());
        mplew.write(103);
        mplew.writeInt(duration);
        mplew.writeInt(leftTime);

        return mplew.getPacket();
    }

    /*
     * 終於試出來了 STOP_CLOCK = CLOCK + 6
     */
    public static byte[] stopClock() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DestroyClock.getValue());

        return mplew.getPacket();
    }

    public static byte[] practiceMode(boolean b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PRACTICE_MODE.getValue());
        mplew.write(b);

        return mplew.getPacket();
    }

    /**
     * 召喚煙霧效果
     */
    public static byte[] spawnMist(MapleAffectedArea mist) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_AffectedAreaCreated.getValue());
        mplew.writeInt(mist.getObjectId());
        mplew.write(mist.getAreaType()); //2 = invincible, so put 1 for recovery aura
        mplew.writeInt(mist.getOwnerId());
        mplew.writeInt(mist.getSkillID());
        mplew.writeShort(mist.getSkillLevel());//V.160 byte=>short
        mplew.writeShort(mist.getSkillDelay());
        mplew.writeRect(mist.getArea());
        switch (mist.getSkillID()) {
            case 菈菈.發現_風之鞦韆:
                mplew.writeRect(mist.getArea());
                break;
        }
        mplew.writeInt(mist.getSubtype());
        mplew.writePos(mist.getPosition());
        mplew.writeInt((mist.getSkillID() == 227) ? mist.getPosition().x : 0);
        mplew.writeInt(mist.getForce());
        mplew.write(0);
        mplew.writeInt(0);
        switch (mist.getSkillID()) {
            case 夜使者.絕對領域:
            case 機甲戰神.扭曲領域:
            case 狂豹獵人.鑽孔集裝箱:
            case 狂豹獵人.連弩陷阱:
            case 皮卡啾.帕拉美:
            case 皮卡啾.博拉多利:
            case 米哈逸.閃光交叉_安裝:
            case 伊利恩.朗基努斯領域:
            case 海盜.海盜旗幟:
            case 幻獸師.歡樂派對_13:
            case 龍魔導士.歐尼斯之氣息:
            case 龍魔導士.粉碎_回歸:
            case 卡蒂娜.鏈之藝術_漩渦:
            case 墨玄.神功_破空拳神力的氣息:
            case 雪吉拉.我製造的_雪人:
            case 暗影神偷.煙幕彈:
                mplew.writeBool(mist.isFacingLeft());
                break;
        }
        mplew.writeInt(mist.getLeftTime());
        mplew.writeInt(0); // TMS 220
        mplew.writeInt(0); // TMS 226
        mplew.write(mist.BUnk1);//V.160 new
        mplew.write(mist.BUnk2); // TMS 244
        mplew.write(false); // TMS 226

        switch (mist.getSkillID()) {
            case 主教.神聖之水:
                mplew.writeInt(0);
                break;
        }
        return mplew.getPacket();
    }

    /**
     * 移除煙霧效果
     */
    public static byte[] removeMist(int oid, boolean eruption) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_AffectedAreaRemoved.getValue());
        mplew.writeInt(oid);
        mplew.write(eruption ? 1 : 0);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] spawnLove(int oid, int itemid, String name, String msg, Point pos, int ft) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MessageBoxEnterField.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(itemid);
        mplew.writeMapleAsciiString(msg);
        mplew.writeMapleAsciiString(name);
        mplew.writeShort(pos.x);
        mplew.writeShort(pos.y + ft);

        return mplew.getPacket();
    }

    public static byte[] removeLove(int oid, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MessageBoxLeaveField.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static byte[] itemEffect(int chrId, int itemid, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSetActiveEffectItem.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(itemid);
        mplew.writeInt(type);

        return mplew.getPacket();
    }

    public static byte[] showTitleEffect(int chrId, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSetActiveNickItem.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(itemid);
        mplew.writeBool(false);

        return mplew.getPacket();
    }

    /**
     * 顯示角色椅子
     */
    public static byte[] UserSetActivePortableChair(MapleCharacter player) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_UserSetActivePortableChair.getValue());
        mplew.writeInt(player.getId());
        PortableChair chair = player.getChair();
        mplew.writeInt(chair == null ? 0 : chair.getItemId());
//        mplew.writeInt(chair == null ? 0 : chair.getMeso());
//        mplew.writeInt(chair == null ? 0 : chair.getType());
//        mplew.write(chair == null ? 0 : chair.getUnk());
        writeChairData(mplew, player);
        mplew.write(0);
        return mplew.getPacket();
    }

    private static void writeChairData(MaplePacketLittleEndianWriter mplew, MapleCharacter player) {
        PortableChair chair = player.getChair();
        boolean hasChair = chair != null && !ServerConfig.BLOCK_CHAIRS_SET.contains(chair.getItemId());
        mplew.writeBool(hasChair);
        if (hasChair) {
            switch (ItemConstants.getChairType(chair.getItemId())) {
                case TOWER:
                    encodeTowerChairInfo(mplew, player);
                    break;
                case MESO:
                    mplew.writeLong(0L);
                    break;
                case TEXT:
                    mplew.writeMapleAsciiString(chair.getMsg());
                    PacketHelper.addChaterName(mplew, player.getName(), chair.getMsg());
                    break;
                case LV:
                    boolean hasArr = chair.getArr() != null;
                    mplew.writeBool(hasArr);
                    if (hasArr) {
                        mplew.writeInt(chair.getUn2());
                        mplew.writeInt(chair.getArr().length);
                        for (Triple triple : chair.getArr()) {
                            mplew.writeInt((Integer) triple.getLeft());
                            Pair right = (Pair) triple.getRight();
                            AvatarLook left = (AvatarLook) right.getLeft();
                            mplew.writeInt(left != null ? left.getJob() : 0);
                            String mid = (String) triple.getMid();
                            mplew.writeMapleAsciiString(mid);
                            mplew.writeBool(left != null);
                            if (left != null) {
                                AvatarLook.encode(mplew, left, false);
                            }

                            mplew.writeBool(right.getRight() != null);
                            if (right.getRight() != null) {
                                AvatarLook.encode(mplew, (AvatarLook) right.getRight(), false);
                            }
                        }
                        mplew.writeInt(0);
                    }
                    break;
                case POP:
                    mplew.writeInt(1);
                    for (int i = 0; i < 1; i++) {
                        mplew.writeMapleAsciiString(player.getName());
                        mplew.writeInt(player.getFame());
                    }
                    break;
                case TIME:
                    mplew.writeInt(0);
                    break;
                case STARFORCE:
                case RANDOM:
                case MIRROR:
                case ANDROID:
                case ROTATED_SLEEPING_BAG_CHAIR:
                case EVENT_POINT:
                case EVENT_POINT_GENDERLY:
                case EVENT_POINT_CLONE:
                case YETI://??
                case MAPLE_GLOBE://??
                    break;
                case TRICK_OR_TREAT:
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    break;
                case CELEBRATE:
                    mplew.writeInt(chair.getItemId());
                    break;
                case IDENTITY:
                    mplew.writeInt(player.getAccountID());
                    mplew.writeByte(0);
                    mplew.writeInt(0);
                    break;
                case POP_BUTTON:
                    mplew.writeInt(0);
                    break;
                case ROLLING_HOUSE:
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeByte(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    break;
                case MANNEQUIN:
                    mplew.writeInt(0);
                    break;
                case PET:
                    for (int i = 0; i < 3; i++) {
                        mplew.writeInt(0);
                        mplew.writeInt(0);
                        mplew.writeInt(0);
                    }
                    break;
                case SCORE:
                    mplew.writeInt(0);
                    break;
                case SCALE_AVATAR:
                    mplew.writeBool(false);
                    break;
                case WASTE:
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    break;
                case ROLLING_HOUSE_2019:
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeByte(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);

                    mplew.writeInt(0);
                    break;
                case CHAR_LV:
                    mplew.writeInt(player.getLevel());
                    break;
                case HASH_TAG:
                case UN22:
                case TRAITS:
                default:
                    mplew.writeInt(chair.getUn3());
                    mplew.writeInt(chair.getUn4());
                    mplew.write(chair.getUn5());
                    break;
            }
        }
    }

    public static void encodeTowerChairInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter player) {
        String string;
        ArrayList<Integer> arrayList = new ArrayList<>();
        player.getInfoQuest(7266);
        for (int i2 = 0; i2 < 6 && (string = player.getOneInfo(7266, String.valueOf(i2))) != null && Integer.valueOf(string) > 0; ++i2) {
            arrayList.add(Integer.valueOf(string));
        }
        mplew.writeInt(arrayList.size());
        arrayList.forEach(mplew::writeInt);
    }

    public static byte[] showSitOnTimeCapsule() {// 3010587
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_UserSitOnTimeCapsule.getValue());
        return mplew.getPacket();
    }

    public static byte[] addChairMeso(int cid, int value) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSetActivePortableChair.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(value);
        mplew.writeInt(1);

        return mplew.getPacket();
    }

    public static byte[] useTowerChairSetting() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.USE_TOWERCHAIR_SETTING_RESULT.getValue());
        return mplew.getPacket();
    }

    /*
     * 取消椅子
     */
    public static byte[] UserSitResult(int playerId, int chairId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSitResult.getValue());
        mplew.writeInt(playerId);
        mplew.writeBool(chairId != -1);
        if (chairId != -1) {
            mplew.writeShort(chairId);
        }
        return mplew.getPacket();
    }

    public static byte[] spawnReactor(MapleReactor reactor) {
        /*
         * Recv REACTOR_SPAWN [01B1] (24)
         * B1 01
         * FB 2A 00 00
         * 68 77 89 00
         * 00
         * 60 13 1D 00
         * 00
         * 06 00 44 47 54 65 73 74
         * ??..hw?.`......DGTest
         */
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReactorEnterField.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.writeInt(reactor.getReactorId());
        mplew.write(reactor.getState());
        mplew.writePos(reactor.getPosition());
        mplew.write(reactor.getFacingDirection()); // stance
        mplew.writeMapleAsciiString(reactor.getName());

        return mplew.getPacket();
    }

    public static byte[] triggerReactor(MapleReactor reactor, int stance) {
        return triggerReactor(reactor, stance, 0, 0, 0);
    }

    public static byte[] triggerReactor(MapleReactor reactor, int stance, int n2, int cid, int n4) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReactorChangeState.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.write(reactor.getState());
        mplew.writePos(reactor.getPosition());
        mplew.writeShort(stance);
        mplew.write(n4);
        mplew.writeInt(n2);
        mplew.writeInt(cid);

        return mplew.getPacket();
    }

    public static byte[] triggerReactor(MapleReactor reactor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReactorChangeState.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.write(reactor.getState());
        mplew.writePos(reactor.getPosition());
        mplew.writeShort(reactor.getHitStart());//hitstart
        mplew.write(reactor.getProperEventIdx());
        mplew.writeInt(reactor.getStateEnd());
        mplew.writeInt(reactor.getOwnerID());

        return mplew.getPacket();
    }

    public static byte[] destroyReactor(MapleReactor reactor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReactorRemove.getValue());
        mplew.writeInt(reactor.getObjectId());

        return mplew.getPacket();
    }

    public static byte[] reactorLeaveField(MapleReactor reactor) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReactorLeaveField.getValue());
        mplew.writeInt(reactor.getObjectId());
        mplew.write(reactor.getState());
        mplew.write(0);
        mplew.writePos(reactor.getPosition());
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] musicChange(String song) {
        return environmentChange(song, FieldEffectType.ChangeBGM);
    }

    public static byte[] showEffect(String effect) {
        return environmentChange(effect, FieldEffectType.TopScreen);
    }

    public static byte[] playSound(String sound) {
        return environmentChange(sound, FieldEffectType.Sound);
    }

    public static byte[] environmentChange(String env, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FieldEffect.getValue());
        mplew.write(mode);
        mplew.writeMapleAsciiString(env);
        mplew.writeInt(0);
        mplew.writeInt(0);//V.146 new

        return mplew.getPacket();
    }

    public static byte[] startMapEffect(String msg, int itemid, boolean active) {
        return startMapEffect(msg, itemid, -1, active);
    }

    public static byte[] startMapEffect(String msg, int itemid, int effectType, boolean active) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_BlowWeather.getValue());
//        mplew.write(active ? 0 : 1);
//        mplew.writeInt(itemid);
//        if (effectType > 0) {
//            mplew.writeInt(effectType);
//        }
//        if (active) {
//            mplew.writeMapleAsciiString(msg);
//        }
//        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(itemid);
        if (itemid == 116) {
            mplew.writeInt(effectType);
        }
        if (itemid > 0) {
            mplew.writeMapleAsciiString(msg);
            mplew.writeInt(15);
            mplew.write(0);
        }

        return mplew.getPacket();
    }

    public static byte[] removeMapEffect() {
        return startMapEffect(null, 0, -1, false);
    }

    /*
     * 顯示占卜結果
     */
    public static byte[] showPredictCard(String name, String otherName, int love, int cardId, int commentId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_PREDICT_CARD.getValue());
        mplew.writeMapleAsciiString(name);
        mplew.writeMapleAsciiString(otherName);
        mplew.writeInt(love);
        mplew.writeInt(cardId);
        mplew.writeInt(commentId);

        return mplew.getPacket();
    }

    public static byte[] UserSkillPrepare(int fromId, int skillId, byte level, byte display, byte direction, byte speed, Point position) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSkillPrepare.getValue());
        mplew.writeInt(fromId); //角色ID
        mplew.writeInt(skillId); //技能ID
        mplew.write(level); //技能等級
        mplew.write(display); //技能效果
        mplew.write(direction); //攻擊方向
        mplew.write(speed); //速度
        if (position != null) {
            mplew.writePos(position); //有些技能這個地方要寫個坐標信息
        }

        return mplew.getPacket();
    }

    public static byte[] skillCancel(MapleCharacter from, int skillId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSkillCancel.getValue());
        mplew.writeInt(from.getId());
        mplew.writeInt(skillId);
        mplew.writeInt(skillId);

        return mplew.getPacket();
    }

    public static byte[] sendHint(String hint, int width, int time, Point pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        if (width < 1) {
            width = hint.length() * 10;
            if (width < 40) {
                width = 40;
            }
        }
        if (time < 5) {
            time = 5;
        }
        mplew.writeShort(SendPacketOpcode.LP_UserBalloonMsg.getValue());
        mplew.writeMapleAsciiString(hint);
        mplew.writeShort(width);
        mplew.writeShort(time);
        mplew.writeBool(pos == null);
        if (pos != null) {
            mplew.writePosInt(pos);
        }

        return mplew.getPacket();
    }

    public static byte[] showEquipEffect() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_EQUIP_EFFECT.getValue());

        return mplew.getPacket();
    }

    public static byte[] showEquipEffect(int team) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_EQUIP_EFFECT.getValue());
        mplew.writeShort(team);

        return mplew.getPacket();
    }

    public static byte[] useSkillBook(MapleCharacter chr, int skillid, int maxlevel, boolean canuse, boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SkillLearnItemResult.getValue());
        mplew.write(1);
        mplew.writeInt(chr.getId());
        mplew.write(1);
        mplew.writeInt(skillid);
        mplew.writeInt(maxlevel);
        mplew.writeBool(canuse);
        mplew.writeBool(success);

        return mplew.getPacket();
    }

    public static byte[] getMacros(SkillMacro[] macros) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SKILL_MACRO.getValue());
        int count = 0;
        for (int i = 0; i < 5; i++) {
            if (macros[i] != null) {
                count++;
            }
        }
        mplew.write(count); // number of macros
        for (int i = 0; i < 5; i++) {
            SkillMacro macro = macros[i];
            if (macro != null) {
                mplew.writeMapleAsciiString(macro.getName());
                mplew.write(macro.getShout());
                mplew.writeInt(macro.getSkill1());
                mplew.writeInt(macro.getSkill2());
                mplew.writeInt(macro.getSkill3());
            }
        }

        return mplew.getPacket();
    }

    public static byte[] boatPacket(int effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // 1034: balrog boat comes, 1548: boat comes, 3: boat leaves
        mplew.writeShort(SendPacketOpcode.BOAT_EFFECT.getValue());
        mplew.writeShort(effect); // 0A 04 balrog
        //this packet had 3: boat leaves

        return mplew.getPacket();
    }

    public static byte[] boatEffect(int effect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // 1034: balrog boat comes, 1548: boat comes, 3: boat leaves
        mplew.writeShort(SendPacketOpcode.BOAT_EFF.getValue());
        mplew.writeShort(effect); // 0A 04 balrog
        //this packet had the other ones o.o

        return mplew.getPacket();
    }

    public static byte[] removeItemFromDuey(boolean remove, int Package) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Parcel.getValue());
        mplew.write(0x18);
        mplew.writeInt(Package);
        mplew.write(remove ? 3 : 4);

        return mplew.getPacket();
    }

    public static byte[] sendDuey(byte operation, List<MapleDueyActions> packages) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Parcel.getValue());
        mplew.write(operation);
        switch (operation) {
            case 0x09: { // Request 13 Digit AS
                mplew.write(1);
                // 0xFF = error
                break;
            }
            case 0x0A: { // 打開送貨員
                mplew.write(0);
                mplew.write(packages.size());
                for (MapleDueyActions dp : packages) {
                    mplew.writeInt(dp.getPackageId());
                    mplew.writeAsciiString(dp.getSender(), 15);
                    mplew.writeInt(dp.getMesos());
                    mplew.writeLong(PacketHelper.getTime(dp.getSentTime()));
                    mplew.writeZeroBytes(202);
                    if (dp.getItem() != null) {
                        mplew.write(1);
                        PacketHelper.GW_ItemSlotBase_Encode(mplew, dp.getItem());
                    } else {
                        mplew.write(0);
                    }
                }
                mplew.write(0);
                break;
            }
        }
        return mplew.getPacket();
    }

    public static byte[] enableTV() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENABLE_TV.getValue());
        mplew.writeInt(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] removeTV() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_TV.getValue());

        return mplew.getPacket();
    }

    public static byte[] sendTV(MapleCharacter chr, List<String> messages, int type, MapleCharacter partner, int delay) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.START_TV.getValue());
        mplew.write(partner != null ? 2 : 1);
        mplew.write(type); // type   Heart = 2  Star = 1  Normal = 0
        PacketHelper.addCharLook(mplew, chr, false, chr.isBeta());
        mplew.writeMapleAsciiString(chr.getName());

        if (partner != null) {
            mplew.writeMapleAsciiString(partner.getName());
        } else {
            mplew.writeShort(0);
        }
        for (int i = 0; i < messages.size(); i++) {
            if (i == 4 && messages.get(4).length() > 15) {
                mplew.writeMapleAsciiString(messages.get(4).substring(0, 15)); // hmm ?
            } else {
                mplew.writeMapleAsciiString(messages.get(i));
            }
        }
        mplew.writeInt(delay); // time limit shit lol 'Your thing still start in blah blah seconds'
        if (partner != null) {
            PacketHelper.addCharLook(mplew, partner, false, partner.isBeta());
        }

        return mplew.getPacket();
    }

    public static byte[] showQuestMsg(final String msg) {
        return serverNotice(5, msg);
    }

    public static byte[] Mulung_Pts(int recv, int total) {
        return showQuestMsg("獲得了 " + recv + " 點修煉點數。總修煉點數為 " + total + " 點。");
    }

    public static byte[] showOXQuiz(int questionSet, int questionId, boolean askQuestion) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Quiz.getValue());
        mplew.write(askQuestion ? 1 : 0);
        mplew.write(questionSet);
        mplew.writeShort(questionId);

        return mplew.getPacket();
    }

    public static byte[] leftKnockBack() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SnowBallTouch.getValue());

        return mplew.getPacket();
    }

    public static byte[] rollSnowball(int type, MapleSnowball.MapleSnowballs ball1, MapleSnowball.MapleSnowballs ball2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SnowBallState.getValue());
        mplew.write(type); // 0 = normal, 1 = rolls from start to end, 2 = down disappear, 3 = up disappear, 4 = move
        mplew.writeInt(ball1 == null ? 0 : (ball1.getSnowmanHP() / 75));
        mplew.writeInt(ball2 == null ? 0 : (ball2.getSnowmanHP() / 75));
        mplew.writeShort(ball1 == null ? 0 : ball1.getPosition());
        mplew.write(0);
        mplew.writeShort(ball2 == null ? 0 : ball2.getPosition());
        mplew.writeZeroBytes(11);

        return mplew.getPacket();
    }

    public static byte[] enterSnowBall() {
        return rollSnowball(0, null, null);
    }

    public static byte[] hitSnowBall(int team, int damage, int distance, int delay) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SnowBallHit.getValue());
        mplew.write(team);// 0 is down, 1 is up
        mplew.writeShort(damage);
        mplew.write(distance);
        mplew.write(delay);

        return mplew.getPacket();
    }

    public static byte[] snowballMessage(int team, int message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SnowBallMsg.getValue());
        mplew.write(team);// 0 is down, 1 is up
        mplew.writeInt(message);

        return mplew.getPacket();
    }

    public static byte[] finishedSort(int type) {
        /*
         * [41 00] [01] [01]
         */
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SortItemResult.getValue());
        mplew.write(1);
        mplew.write(type);

        return mplew.getPacket();
    }

    // 00 01 00 00 00 00
    public static byte[] coconutScore(int[] coconutscore) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CoconutScore.getValue());
        mplew.writeShort(coconutscore[0]);
        mplew.writeShort(coconutscore[1]);

        return mplew.getPacket();
    }

    public static byte[] hitCoconut(boolean spawn, int id, int type) {
        // FF 00 00 00 00 00 00
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CoconutHit.getValue());
        if (spawn) {
            mplew.write(0);
            mplew.writeInt(0x80);
        } else {
            mplew.writeInt(id);
            mplew.write(type); // What action to do for the coconut.
        }

        return mplew.getPacket();
    }

    public static byte[] finishedGather(int type) {
        /*
         * [40 00] [01] [01]
         */
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GatherItemResult.getValue());
        mplew.write(1);
        mplew.write(type);

        return mplew.getPacket();
    }

    public static byte[] yellowChat(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserChatMsg.getValue()); //沒有找到封包使用就用這個
        mplew.writeShort(0x07);
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] getPeanutResult(int ourItem) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_IncubatorResult.getValue());
        mplew.writeBool(false);
        mplew.writeInt(ourItem);
        return mplew.getPacket();
    }

    public static byte[] getPeanutResult(int itemId, short quantity, int ourItem, int ourSlot) {
        return getPeanutResult(itemId, quantity, ourItem, ourSlot, null);
    }

    public static byte[] getPeanutResult(int itemId, short quantity, int ourItem, int ourSlot, Item item) {
        return getPeanutResult(itemId, quantity, ourItem, ourSlot, 0, (short) 0, (byte) 0, item);
    }

    public static byte[] getPeanutResult(int itemId, short quantity, int ourItem, int ourSlot, byte fever) {
        return getPeanutResult(itemId, quantity, ourItem, ourSlot, fever, null);
    }

    public static byte[] getPeanutResult(int itemId, short quantity, int ourItem, int ourSlot, byte fever, Item item) {
        return getPeanutResult(itemId, quantity, ourItem, ourSlot, 0, (short) 0, fever, item);
    }

    public static byte[] getPeanutResult(int itemId, short quantity, int ourItem, int ourSlot, int itemId2, short quantity2) {
        return getPeanutResult(itemId, quantity, ourItem, ourSlot, itemId2, quantity2, (byte) 0, null);
    }

    public static byte[] getPeanutResult(int itemId, short quantity, int ourItem, int ourSlot, int itemId2, short quantity2, byte fever, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_IncubatorResult.getValue());
        boolean success = true;
        mplew.writeBool(success);
        if (success) {
            mplew.writeInt(itemId);
            mplew.writeShort(quantity);
            mplew.writeInt(ourItem);
            mplew.writeInt(ourSlot);
            mplew.writeInt(itemId2);
            mplew.writeInt(quantity2);
            mplew.write(fever);
            mplew.write(item != null);
            if (item != null) {
                PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
            }
        } else {
            mplew.writeInt(ourItem);
        }
        return mplew.getPacket();
    }

    /*
     * 發送玩家升級信息和 家族 公會 相關
     */
    public static byte[] sendLevelup(boolean family, int level, String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        //[80 00] [01] [15 00 00 00] [09 00 53 48 5A 42 47 BF CE B7 A8]
        mplew.writeShort(SendPacketOpcode.LP_NotifyLevelUp.getValue());
        mplew.write(family ? 1 : 2);
        mplew.writeInt(level);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    public static byte[] sendMarriage(boolean family, String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NotifyWedding.getValue());
        mplew.write(family ? 1 : 0);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    public static byte[] sendJobup(boolean family, int jobid, String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NotifyJobChange.getValue());
        mplew.write(family ? 1 : 0);
        mplew.writeInt(jobid); //or is this a short
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 顯示龍飛行效果
     */
    public static byte[] showDragonFly(int chrId, int type, int mountId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DragonGlide.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(type);
        if (type == 0) {
            mplew.writeInt(mountId);
        }

        return mplew.getPacket();
    }

    public static byte[] temporaryStats_Aran() {
        Map<MapleStat.Temp, Integer> stats = new EnumMap<>(MapleStat.Temp.class);
        stats.put(MapleStat.Temp.力量, 999);
        stats.put(MapleStat.Temp.敏捷, 999);
        stats.put(MapleStat.Temp.智力, 999);
        stats.put(MapleStat.Temp.幸運, 999);
        stats.put(MapleStat.Temp.物攻, 255);
        stats.put(MapleStat.Temp.命中, 999);
        stats.put(MapleStat.Temp.迴避, 999);
        stats.put(MapleStat.Temp.速度, 140);
        stats.put(MapleStat.Temp.跳躍, 120);
        return temporaryStats(stats);
    }

    public static byte[] temporaryStats_Balrog(MapleCharacter chr) {
        Map<MapleStat.Temp, Integer> stats = new EnumMap<>(MapleStat.Temp.class);
        int offset = 1 + (chr.getLevel() - 90) / 20;
        //every 20 levels above 90, +1

        stats.put(MapleStat.Temp.力量, chr.getStat().getTotalStr() / offset);
        stats.put(MapleStat.Temp.敏捷, chr.getStat().getTotalDex() / offset);
        stats.put(MapleStat.Temp.智力, chr.getStat().getTotalInt() / offset);
        stats.put(MapleStat.Temp.幸運, chr.getStat().getTotalLuk() / offset);
        stats.put(MapleStat.Temp.物攻, chr.getStat().getTotalWatk() / offset);
        stats.put(MapleStat.Temp.物防, chr.getStat().getTotalMagic() / offset);
        return temporaryStats(stats);
    }

    public static byte[] temporaryStats(Map<MapleStat.Temp, Integer> mystats) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ForcedStatSet.getValue());
        //str 0x1, dex 0x2, int 0x4, luk 0x8
        //level 0x10 = 255
        //0x100 = 999
        //0x200 = 999
        //0x400 = 120
        //0x800 = 140
        int updateMask = 0;
        for (MapleStat.Temp statupdate : mystats.keySet()) {
            updateMask |= statupdate.getValue();
        }
        mplew.writeInt(updateMask);
        Integer value;
        for (final Entry<MapleStat.Temp, Integer> statupdate : mystats.entrySet()) {
            value = statupdate.getKey().getValue();
            if (value >= 1) {
                if (value <= 0x200) { //level 0x10 - is this really short or some other? (FF 00)
                    mplew.writeShort(statupdate.getValue().shortValue());
                } else {
                    mplew.write(statupdate.getValue().byteValue());
                }
            }
        }

        return mplew.getPacket();
    }

    public static byte[] temporaryStats_Reset() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ForcedStatReset.getValue());

        return mplew.getPacket();
    }

    /*
     * 傳授技能後顯示的窗口
     */
    public static byte[] sendLinkSkillWindow(int skillId) {
        return UIPacket.sendUIWindow(0x03, skillId);
    }

    /*
     * 組隊搜索窗口
     */
    public static byte[] sendPartyWindow(int npc) {
        return UIPacket.sendUIWindow(0x15, npc);
    }

    /*
     * 道具修理窗口
     */
    public static byte[] sendRepairWindow(int npc) {
        return UIPacket.sendUIWindow(0x21, npc);
    }

    /*
     * 專業技術窗口
     */
    public static byte[] sendProfessionWindow(int npc) {
        return UIPacket.sendUIWindow(0x2A, npc);
    }

    public static byte[] sendRedLeaf(int points, boolean viewonly) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(10);

        mplew.writeShort(SendPacketOpcode.LP_UserOpenUIWithOption.getValue());
        mplew.writeInt(0x73);
        mplew.writeInt(points);
        mplew.writeInt(viewonly ? 1 : 0); //只是查看，完成按鈕被禁用

        return mplew.getPacket();
    }

    public static byte[] sendPVPMaps() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PvPStatusResult.getValue());
        mplew.write(1); //max amount of players
        mplew.writeInt(0);
        for (int i = 0; i < 3; i++) {
            mplew.writeInt(1); //how many peoples in each map
        }
        mplew.writeLong(0);
        for (int i = 0; i < 3; i++) {
            mplew.writeInt(1);
        }
        mplew.writeLong(0);
        for (int i = 0; i < 4; i++) {
            mplew.writeInt(1);
        }
        for (int i = 0; i < 10; i++) {
            mplew.writeInt(1);
        }
        mplew.writeInt(0x0E);
        mplew.writeShort(0x64); ////PVP 1.5 EVENT!
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] sendPyramidUpdate(int amount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PYRAMID_UPDATE.getValue());
        mplew.writeInt(amount); //1-132 ?

        return mplew.getPacket();
    }

    public static byte[] sendPyramidResult(byte rank, int amount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PYRAMID_RESULT.getValue());
        mplew.write(rank);
        mplew.writeInt(amount); //1-132 ?

        return mplew.getPacket();
    }

    //show_status_info - 01 53 1E 01
    //10/08/14/19/11
    //update_quest_info - 08 53 1E 00 00 00 00 00 00 00 00
    //show_status_info - 01 51 1E 01 01 00 30
    //update_quest_info - 08 51 1E 00 00 00 00 00 00 00 00
    public static byte[] sendPyramidEnergy(String type, String amount) {
        return sendString(1, type, amount);
    }

    public static byte[] sendString(int type, String object, String amount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        switch (type) {
            case 1:
                mplew.writeShort(SendPacketOpcode.ENERGY.getValue()); //武林道場會出現
                break;
            case 2:
                mplew.writeShort(SendPacketOpcode.GHOST_POINT.getValue()); //金字塔會出現
                break;
            case 3:
                mplew.writeShort(SendPacketOpcode.GHOST_STATUS.getValue()); //金字塔會出現
                break;
        }
        mplew.writeMapleAsciiString(object); //massacre_hit, massacre_cool, massacre_miss, massacre_party, massacre_laststage, massacre_skill
        mplew.writeMapleAsciiString(amount);

        return mplew.getPacket();
    }

    public static byte[] sendGhostPoint(String type, String amount) {
        return sendString(2, type, amount); //PRaid_Point (0-1500???)
    }

    public static byte[] sendGhostStatus(String type, String amount) {
        return sendString(3, type, amount); //Red_Stage(1-5), Blue_Stage, blueTeamDamage, redTeamDamage
    }

    public static byte[] MulungEnergy(int energy) {
        return sendPyramidEnergy("energy", String.valueOf(energy));
    }

    //    public static byte[] getPollQuestion() {
//        if (ServerConfig.DEBUG_MODE) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.GAME_POLL_QUESTION.getValue());
//        mplew.writeInt(1);
//        mplew.writeInt(14);
//        mplew.writeMapleAsciiString(ServerConstants.Poll_Question);
//        mplew.writeInt(ServerConstants.Poll_Answers.length); // pollcount
//        for (byte i = 0; i < ServerConstants.Poll_Answers.length; i++) {
//            mplew.writeMapleAsciiString(ServerConstants.Poll_Answers[i]);
//        }
//
//        return mplew.getPacket();
//    }
//
//    public static byte[] getPollReply(String message) {
//        if (ServerConfig.DEBUG_MODE) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.GAME_POLL_REPLY.getValue());
//        mplew.writeMapleAsciiString(message);
//
//        return mplew.getPacket();
//    }
    public static byte[] showEventInstructions() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Desc.getValue());
        mplew.write(0);

        return mplew.getPacket();
    }

    /*
     * 打開商店搜索器 -- OK
     */
    public static byte[] getOwlOpen() { //best items! hardcoded
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ShopScannerResult.getValue());
        mplew.write(0x0A); //V.112修改 以前是0x09
        List<Integer> owlItems = RankingWorker.getItemSearch();
        mplew.write(owlItems.size());
        for (int i : owlItems) {
            mplew.writeInt(i);
        }

        return mplew.getPacket();
    }

    /*
     * 搜索的結果 - OK
     */
    public static byte[] getOwlSearched(int itemSearch, List<HiredMerchant> hms) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ShopScannerResult.getValue());
        mplew.write(0x09); //V.112修改 以前是0x08
        mplew.writeInt(0);
        mplew.writeShort(0); //V.112新增 未知
        mplew.writeInt(itemSearch); //要搜索的道具ID
        int size = 0;
        for (HiredMerchant hm : hms) {
            size += hm.searchItem(itemSearch).size();
        }
        mplew.writeInt(size);
        for (HiredMerchant hm : hms) {
            List<MaplePlayerShopItem> items = hm.searchItem(itemSearch);
            for (MaplePlayerShopItem item : items) {
                mplew.writeMapleAsciiString(hm.getOwnerName());
                mplew.writeInt(hm.getMap().getId());
                mplew.writeMapleAsciiString(hm.getDescription());
                mplew.writeInt(item.item.getQuantity()); //道具數量
                mplew.writeInt(item.bundles); //道具份數
                mplew.writeLong(item.price); //道具價格
                switch (InventoryHandler.OWL_ID) {
                    case 0:
                        mplew.writeInt(hm.getOwnerId()); //擁有者ID
                        break;
                    case 1:
                        mplew.writeInt(hm.getStoreId()); //保管的ID?
                        break;
                    default:
                        mplew.writeInt(hm.getObjectId()); //僱傭商人工具ID？
                        break;
                }
                mplew.write(hm.getChannel() - 1); //僱傭商店在幾頻道
                mplew.write(ItemConstants.getInventoryType(itemSearch, false).getType());
                if (ItemConstants.getInventoryType(itemSearch, false) == MapleInventoryType.EQUIP) {
                    PacketHelper.GW_ItemSlotBase_Encode(mplew, item.item);
                }
            }
        }
        return mplew.getPacket();
    }

    public static byte[] getRPSMode(byte mode, int mesos, int selection, int answer) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RPSGame.getValue());
        mplew.write(mode);
        switch (mode) {
            case 6: { //not enough mesos
                if (mesos != -1) {
                    mplew.writeInt(mesos);
                }
                break;
            }
            case 8: { //open (npc)
                mplew.writeInt(9000019);
                break;
            }
            case 11: { //selection vs answer
                mplew.write(selection);
                mplew.write(answer); // FF = lose, or if selection = answer then lose ???
                break;
            }
        }
        return mplew.getPacket();
    }

    /*
     * 玩家請求跟隨
     */
    public static byte[] followRequest(int chrid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FOLLOW_REQUEST.getValue());
        mplew.writeInt(chrid);

        return mplew.getPacket();
    }

    /*
     * 跟隨狀態
     */
    public static byte[] followEffect(int initiator, int replier, Point toMap) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserFollowCharacter.getValue());
        mplew.writeInt(initiator);
        mplew.writeInt(replier);
        if (replier == 0) { //cancel
            mplew.write(toMap == null ? 0 : 1); //1 -> x (int) y (int) to change map
            if (toMap != null) {
                mplew.writeInt(toMap.x);
                mplew.writeInt(toMap.y);
            }
        }
        return mplew.getPacket();
    }

    /*
     * 返回跟隨的信息
     */
    public static byte[] getFollowMsg(int opcode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserFollowCharacterFailed.getValue());
        /*
         * 0x01 = 當前位置無法接受跟隨請求
         * 0x05 = 拒絕跟隨請求
         */
        mplew.writeLong(opcode);

        return mplew.getPacket();
    }

    /*
     * 跟隨移動
     */
    public static byte[] moveFollow(int gatherDuration, int nVal1, Point otherStart, Point myStart, Point otherEnd, List<LifeMovementFragment> moves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserPassiveMove.getValue());
        PacketHelper.serializeMovementList(mplew, gatherDuration, nVal1, otherStart, myStart, moves, new int[]{
                0, 0, 0, 0, 0, 0, 0, 0, 0,
                (byte) ((int) otherEnd.getX() & 0xFF), (byte) (((int) otherEnd.getX() >>> 8) & 0xFF), (byte) ((int) otherEnd.getY() & 0xFF), (byte) (((int) otherEnd.getY() >>> 8) & 0xFF),
                (byte) ((int) otherStart.getX() & 0xFF), (byte) (((int) otherStart.getX() >>> 8) & 0xFF), (byte) ((int) otherStart.getY() & 0xFF), (byte) (((int) otherStart.getY() >>> 8) & 0xFF)
        });

        return mplew.getPacket();
    }

    /*
     * 跟隨斷開的信息
     */
    public static byte[] getFollowMessage(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserChatMsg.getValue());
        mplew.writeShort(0x0B); //?
        mplew.writeMapleAsciiString(msg); //white in gms, but msea just makes it pink.. waste

        return mplew.getPacket();
    }

    public static byte[] getMovingPlatforms(MapleMap map) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MobOrderFromSvr.getValue());
        mplew.writeInt(map.getPlatforms().size());
        for (MaplePlatform mp : map.getPlatforms()) {
            mplew.writeMapleAsciiString(mp.name);
            mplew.writeInt(mp.start);
            mplew.writeInt(mp.SN.size());
            for (int x = 0; x < mp.SN.size(); x++) {
                mplew.writeInt(mp.SN.get(x));
            }
            mplew.writeInt(mp.speed);
            mplew.writeInt(mp.x1);
            mplew.writeInt(mp.x2);
            mplew.writeInt(mp.y1);
            mplew.writeInt(mp.y2);
            mplew.writeInt(mp.x1);//?
            mplew.writeInt(mp.y1);
            mplew.writeShort(mp.r);
        }
        return mplew.getPacket();
    }

    /**
     * @param type  - (0:Light&Long 1:Heavy&Short)
     * @param delay - seconds
     * @return
     */
    public static byte[] trembleEffect(int type, int delay) {
        return trembleEffect(type, delay, 30);
    }

    public static byte[] trembleEffect(int type, int delay, int b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FieldEffect.getValue());
        mplew.write(FieldEffectType.Tremble);
        mplew.write(type);
        mplew.writeInt(delay);
        mplew.writeShort(b);
        return mplew.getPacket();
    }

    public static byte[] setObjectState(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FieldEffect.getValue());
        mplew.write(FieldEffectType.Object);
        mplew.writeMapleAsciiString(msg);
        return mplew.getPacket();
    }

    public static byte[] sendEngagementRequest(String name, int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENGAGE_REQUEST.getValue());
        mplew.write(0); //mode, 0 = engage, 1 = cancel, 2 = answer.. etc
        mplew.writeMapleAsciiString(name); // name
        mplew.writeInt(chrId); // playerid

        return mplew.getPacket();
    }

    /*
     * 0x0D = 恭喜你訂婚成功.
     * 0x0E = 結婚成功.
     * 0x0F = 訂婚失敗.
     * 0x10 = 離婚成功.
     * 0x12 = 結婚典禮預約已經成功接受.
     * 0x15 = 該道具不能用於神之子  新增
     * 0x16 = 當前頻道、地圖找不到該角色或角色名錯誤.   以前0x15
     * 0x17 = 對方不在同一地圖. 以前0x16
     * 0x18 = 道具欄已滿.請整理其他窗口.    以前0x17
     * 0x19 = 對方的道具欄已滿. 以前0x18
     * 0x1A = 同性不能結婚. 以前0x19
     * 0x1B = 您已經是訂婚的狀態.   以前0x1A
     * 0x1C = 對方已經是訂婚的狀態. 以前0x1B
     * 0x1D = 您已經是結婚的狀態.   以前0x1C
     * 0x1E = 對方已經是結婚的狀態. 以前0x1D
     * 0x1F = 您處於不能求婚的狀態. 以前0x1E
     * 0x20 = 對方處於無法接受求婚的狀態.   以前0x1F
     * 0x21 = 很遺憾對方取消了您的求婚請求. 以前0x20
     * 0x22 = 對方鄭重地拒絕了您的求婚. 以前0x21
     * 0x23 = 已成功取消預約.請以後再試.    以前0x22
     * 0x24 = 預約後無法取消結婚典禮.   以前0x23
     * 0x24 = 無
     * 0x26 = 此請帖無效.   以前0x25
     */
    public static byte[] sendEngagement(byte msg, int item, MapleCharacter male, MapleCharacter female) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENGAGE_RESULT.getValue());
        mplew.write(msg); // 結婚任務 1103
        switch (msg) {
            case 0x0D:
            case 0x0E:
            case 0x14: {
                mplew.writeInt(0); // ringid or uniqueid
                mplew.writeInt(male.getId());
                mplew.writeInt(female.getId());
                mplew.writeShort(msg == 0x0E ? 0x03 : 0x01);
                mplew.writeInt(item);
                mplew.writeInt(item);
                mplew.writeAsciiString(male.getName(), 15);
                mplew.writeAsciiString(female.getName(), 15);
                break;
            }
            case 0x11: {
                mplew.writeMapleAsciiString(male.getName());
                mplew.writeMapleAsciiString(female.getName());
                mplew.writeShort(0);
                break;
            }
        }

        return mplew.getPacket();
    }

    /*
     * 美洲豹更新
     */
    public static byte[] updateJaguar(MapleCharacter from) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_WildHunterInfo.getValue());
        PacketHelper.addJaguarInfo(mplew, from);

        return mplew.getPacket();
    }

    public static byte[] teslaTriangle(int chrId, int sum1, int sum2, int sum3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTeslaTriangle.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(sum1);
        mplew.writeInt(sum2);
        mplew.writeInt(sum3);

        return mplew.getPacket();
    }

    public static byte[] spawnMechDoor(MechDoor md, boolean animated) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_OpenGateCreated.getValue());
        mplew.write(animated ? 0 : 1);
        mplew.writeInt(md.getOwnerId());
        mplew.writePos(md.getPosition());
        mplew.write(md.getId());
        mplew.writeInt(md.getPartyId());

        return mplew.getPacket();
    }

    public static byte[] removeMechDoor(MechDoor md, boolean animated) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_OpenGateRemoved.getValue());
        mplew.write(animated ? 0 : 1);
        mplew.writeInt(md.getOwnerId());
        mplew.write(md.getId());

        return mplew.getPacket();
    }

    public static byte[] useSPReset(int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SkillResetItemResult.getValue());
        mplew.write(1);
        mplew.writeInt(chrId);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] useAPReset(int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AbilityResetItemResult.getValue());
        mplew.write(1);
        mplew.writeInt(chrId);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] report(int err) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REPORT_RESULT.getValue());
        mplew.write(err); //0 = success
        if (err == 2) {
            mplew.write(0);
            mplew.writeInt(1);
        }
        return mplew.getPacket();
    }

    public static class AntiMacro {

        private static class AntiType {

            public static byte 未找到角色 = (byte) 0;
            public static byte 非攻擊狀態 = (byte) 1;
            public static byte 已經通過 = (byte) 2;
            public static byte 正在測試 = (byte) 3;
            public static byte 儲存截圖 = (byte) 6;
            public static byte 測謊反饋訊息 = (byte) 7;
            public static byte 認證圖片 = (byte) 8;
            public static byte 測謊失敗 = (byte) 9;
            public static byte 失敗截圖 = (byte) 10;
            public static byte 通過測謊 = (byte) 11;
            public static byte 通過訊息 = (byte) 12;
        }

        public static byte[] cantFindPlayer() {
            return antiMacroResult(AntiType.未找到角色, (byte) MapleAntiMacro.SYSTEM_ANTI, null, null, 0);
        }

        public static byte[] nonAttack() {
            return antiMacroResult(AntiType.非攻擊狀態, (byte) MapleAntiMacro.SYSTEM_ANTI, null, null, 0);
        }

        public static byte[] alreadyPass() {
            return antiMacroResult(AntiType.已經通過, (byte) MapleAntiMacro.SYSTEM_ANTI, null, null, 0);
        }

        public static byte[] antiMacroNow() {
            return antiMacroResult(AntiType.正在測試, (byte) MapleAntiMacro.SYSTEM_ANTI, null, null, 0);
        }

        public static byte[] screenshot(String str) {
            return antiMacroResult(AntiType.儲存截圖, (byte) MapleAntiMacro.SYSTEM_ANTI, str, null, 0);
        }

        public static byte[] antiMsg(int mode, String str) {
            return antiMacroResult(AntiType.測謊反饋訊息, (byte) mode, str, null, 0);
        }

        public static byte[] getImage(File file, int times) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

            mplew.writeShort(SendPacketOpcode.LP_AntiMacroResult.getValue());
            mplew.write(HexTool.getByteArrayFromHexString("59 12 7D 32"));
            byte[] UnknownVal = HexTool.getByteArrayFromHexString("18 BF DB 41 10 BF DB 41 11 BF DB 41 7C 7C");
            mplew.writeInt(UnknownVal.length);
            mplew.write(UnknownVal);
            mplew.write(times);
            mplew.writeFile(file);
            if (file != null) {
                file.delete();
            }
            mplew.write(HexTool.getByteArrayFromHexString("01 65 6D 2E 04 00 00 00 EA D3 F7 5D"));

            return mplew.getPacket();
            //return antiMacroResult(AntiType.認證圖片, mode, null, file, times);
        }

        public static byte[] failure(int mode) {
            return antiMacroResult(AntiType.測謊失敗, (byte) mode, null, null, 0);
        }

        public static byte[] failureScreenshot(String str) {
            return antiMacroResult(AntiType.失敗截圖, (byte) MapleAntiMacro.GM_SKILL_ANTI, str, null, 0);
        }

        public static byte[] success(int mode) {
            return antiMacroResult(AntiType.通過測謊, (byte) mode, null, null, 0);
        }

        public static byte[] successMsg(int mode, String str) {
            return antiMacroResult(AntiType.通過訊息, (byte) mode, str, null, 0);
        }

        private static byte[] antiMacroResult(byte type, byte antiMode, String str, File file, int times) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

            mplew.writeShort(SendPacketOpcode.LP_AntiMacroResult.getValue());
            mplew.write(type);
            mplew.write(antiMode); // 2 = show msg/save screenshot/maple admin picture(mode 6)
            if (type == AntiType.認證圖片) {
                mplew.write(times);
                mplew.write(false); // if false time is 05:00
                mplew.writeFile(file);
                return mplew.getPacket();
            }
            if (type == AntiType.測謊失敗 || type == AntiType.通過測謊) {
            }
            if (type == AntiType.測謊失敗 || type == AntiType.通過測謊) {
            }
            if (type == AntiType.儲存截圖) { // save screenshot
                mplew.writeMapleAsciiString(str); // file name
                return mplew.getPacket();
            }
            if (type != AntiType.測謊反饋訊息) {
                if (type == AntiType.通過訊息) {
                    mplew.writeMapleAsciiString(str); // passed lie detector message
                } else {
                    if (type != AntiType.失敗截圖) {
                        return mplew.getPacket();
                    }
                    mplew.writeMapleAsciiString(str); // failed lie detector, file name (for screenshot)
                }
                return mplew.getPacket();
            }

            return mplew.getPacket();
        }

        public static byte[] antiMacroBomb(boolean error, int mapid, int channel) {
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

            mplew.writeShort(SendPacketOpcode.LP_AntiMacroBombResult.getValue());
            mplew.write(error ? 2 : 1);
            mplew.writeInt(mapid);
            mplew.writeInt(channel);

            return mplew.getPacket();
        }
    }

    /*
     * 開啟舉報系統
     */
    public static byte[] enableReport() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.LP_ClaimSvrStatusChanged.getValue());
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 舉報系統消息
     */
    public static byte[] reportResponse(byte mode, int remainingReports) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetClaimSvrAvailableTime.getValue());
        mplew.writeShort(mode);
        if (mode == 2) {
            mplew.write(1);
            mplew.writeInt(remainingReports);
        }

        return mplew.getPacket();
    }

    /*
     * 終極冒險家窗口
     */
    public static byte[] ultimateExplorer() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_OpenUICreatePremiumAdventurer.getValue());

        return mplew.getPacket();
    }

    public static byte[] pamSongUI() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PAM_SONG.getValue());
        //mplew.writeInt(0); //no clue
        return mplew.getPacket();
    }

    public static byte[] showTraitGain(MapleTraitType trait, int amount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncNonCombatStatEXPMessage);
        mplew.writeLong(trait.getStat().getValue());
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    public static byte[] showTraitMaxed(MapleTraitType trait) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_LimitNonCombatStatEXPMessage);
        mplew.writeLong(trait.getStat().getValue());

        return mplew.getPacket();
    }

    /*
     * 採集的信息
     * 0x09 還無法採集。
     * 0x0B 開始採集
     */
    public static byte[] harvestMessage(int oid, MapleEnumClass.HarvestMsg msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GatherRequestResult.getValue());
        mplew.writeInt(oid);
        mplew.writeInt(msg.getCode());

        return mplew.getPacket();
    }

    public static byte[] showHarvesting(int chrId, int tool) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GatherActionSet.getValue());
        mplew.writeInt(chrId);
        mplew.write(tool > 0 ? 1 : 0);
        if (tool > 0) {
            mplew.writeInt(tool);
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    public static byte[] harvestResult(int chrId, boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserGatherResult.getValue());
        mplew.writeInt(chrId);
        mplew.write(success ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] makeExtractor(int chrId, String cname, Point pos, int timeLeft, int itemId, int fee) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DecomposerEnterField.getValue());
        mplew.writeInt(chrId);
        mplew.writeMapleAsciiString(cname);
        mplew.writeInt(pos.x);
        mplew.writeInt(pos.y);
        mplew.writeShort(timeLeft); //fh or time left, dunno
        mplew.writeInt(itemId); //3049000, 3049001...
        mplew.writeInt(fee);

        return mplew.getPacket();
    }

    public static byte[] removeExtractor(int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DecomposerLeaveField.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(1); //probably 1 = animation, 2 = make something?

        return mplew.getPacket();
    }

    public static byte[] spouseMessage(String msg, boolean white) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserChatMsg.getValue());
        mplew.writeShort(white ? UserChatMessageType.管理員對話.getType() : UserChatMessageType.遊戲描述.getType());
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] spouseMessage(UserChatMessageType type, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserChatMsg.getValue());
        mplew.writeShort(type.getType());
        mplew.writeMapleAsciiString(type.getMsg(msg));

        return mplew.getPacket();
    }

    public static byte[] multiLineMessage(UserChatMessageType type, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSetUtilDlg.getValue());
        mplew.writeShort(type.getType());
        mplew.writeMapleAsciiString(type.getMsg(msg));

        return mplew.getPacket();
    }

    /*
     * 打開礦物背包
     */
    public static byte[] openBag(int index, int itemId, boolean firstTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        //[53 01] [00 00 00 00] [19 12 42 00] 00 00
        mplew.writeShort(SendPacketOpcode.LP_UserBagItemUseResult.getValue());
        mplew.writeInt(index);
        mplew.writeInt(itemId);
        mplew.writeShort(firstTime ? 1 : 0); //this might actually be 2 bytes

        return mplew.getPacket();
    }

    /*
     * 道具製造開始
     */
    public static byte[] craftMake(int chrId, int something, int time) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        //[EC 00] [9E 4E 08 00] [7C 01 00 00] [A0 0F 00 00]
        mplew.writeShort(SendPacketOpcode.LP_UserSetOneTimeAction.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(something);
        mplew.writeInt(time);

        return mplew.getPacket();
    }

    /*
     * 道具製作成功
     */
    public static byte[] craftFinished(int chrId, int craftID, int craftType, int ranking, int itemId, int quantity, int exp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserMakingSkillResult.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(craftType);
        if (craftType == 1) {
            mplew.writeInt(ranking);
            mplew.writeBool(true);
            int n = 1;
            mplew.writeInt(n);
            while (n > 0) {
                mplew.writeInt(craftID);
                mplew.writeInt(itemId);
                mplew.writeInt(quantity);
                mplew.writeInt(0);
                mplew.writeInt(0);
                n--;
            }
            mplew.writeInt(exp);
        } else if (craftType == 2) {
            mplew.writeInt(craftID);
            mplew.writeInt(ranking);
            /*
             * 0x18	SOSO
             * 0x19	GOOD
             * 0x1A	COOL
             * 0x1B	FAIL	由於未知原因 製作道具失敗
             * 0x1C	FAIL	物品製作失敗.
             * 0x1D	FAIL	分解機已撤除，分解取消。
             * 0x1E	FAIL	分解機的主任無法繼續獲得手續費。
             */
            boolean success = ranking == 25 || ranking == 26 || ranking == 27;
            mplew.writeBool(success);//V.149 new
            if (success) { //只有製作成功才發送 製作出來的道具和數量
                mplew.writeInt(itemId);
                mplew.writeInt(quantity);
            }
            mplew.writeInt(exp);
        }
        return mplew.getPacket();
    }

    /*
     * 道具製作熟練度已滿的提示
     */
    public static byte[] craftMessage(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserNoticeMsg.getValue());
        mplew.writeMapleAsciiString(msg);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] showItemSkillSocketUpgradeEffect(int cid, boolean result) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserItemSkillSocketUpgradeEffect.getValue());
        mplew.writeInt(cid);
        mplew.writeBool(result);

        return mplew.getPacket();
    }

    public static byte[] showItemSkillOptionUpgradeEffect(int cid, boolean result, boolean destroyed, int itemID, short option) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserItemSkillOptionUpgradeEffect.getValue());
        mplew.writeInt(cid);
        mplew.writeBool(result);
        mplew.writeBool(destroyed);
        mplew.writeInt(itemID);
        mplew.writeInt(option);

        return mplew.getPacket();
    }

    public static byte[] shopDiscount(int percent) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetPotionDiscountRate.getValue());
        mplew.write(percent);

        return mplew.getPacket();
    }

    public static byte[] pendantSlot(boolean p) { //slot -59
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetBuyEquipExt.getValue());
        mplew.write(p ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] updatePendantSlot(boolean add, int days) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PendantSlotIncResult.getValue());
        mplew.writeInt(add ? 1 : 0);
        mplew.writeInt(days);

        return mplew.getPacket();
    }

    public static byte[] getBuffBar(long millis) { //You can use the buff again _ seconds later. + bar above head
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NotifyHPDecByField.getValue());
        mplew.writeLong(millis);

        return mplew.getPacket();
    }

    public static byte[] updateGender(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_GENDER.getValue());
        mplew.write(chr.getGender());

        return mplew.getPacket();
    }

    /*
     * 顯示副本進度
     */
    public static byte[] achievementRatio(int amount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetAchieveRate.getValue()); //not sure
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    /*
     * 創建終極楓之谷家檢測提示
     */
    public static byte[] createUltimate(int amount) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * 0x00 創建成功
         * 0x01 已存在同名的角色
         * 0x02 角色欄已滿。
         * 0x03 無法使用該名字。
         */
        mplew.writeShort(SendPacketOpcode.LP_CreateNewCharacterResult_PremiumAdventurer.getValue());
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    public static byte[] updateSpecialStat(String stat, int array, int mode, boolean unk, int chance) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * Recv PROFESSION_INFO [008E] (25)
         * 8E 00
         * 08 00 39 32 30 33 30 30 30 30
         * 05 00 00 00
         * 07 00 00 00
         * 01
         * 64 00 00 00
         * ?..92030000.........d...
         *
         */
        mplew.writeShort(SendPacketOpcode.LP_ResultInstanceTable.getValue());
        mplew.writeMapleAsciiString(stat);
        mplew.writeInt(array);
        mplew.writeInt(mode);
        mplew.write(unk ? 1 : 0);
        mplew.writeInt(chance);

        return mplew.getPacket();
    }

    public static byte[] getQuickSlot(MapleQuickSlot quickslot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_QuickslotMappedInit.getValue());
        quickslot.writeData(mplew);

        return mplew.getPacket();
    }

    public static byte[] updateImp(MapleImp imp, int mask, int index, boolean login) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ItemPotChange.getValue());
        mplew.write(login ? 0 : 1); //0 = unchanged, 1 = changed
        mplew.writeInt(index + 1);
        mplew.writeInt(mask);
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0) {
            Pair<Integer, Integer> i = MapleItemInformationProvider.getInstance().getPot(imp.getItemId());
            if (i == null) {
                return new byte[0];
            }
            mplew.writeInt(i.left);
            mplew.write(imp.getLevel()); //probably type
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.STATE.getValue()) != 0) {
            mplew.write(imp.getState());
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.FULLNESS.getValue()) != 0) {
            mplew.writeInt(imp.getFullness());
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.CLOSENESS.getValue()) != 0) {
            mplew.writeInt(imp.getCloseness());
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.CLOSENESS_LEFT.getValue()) != 0) {
            mplew.writeInt(1); //how much closeness is available to get right now
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.MINUTES_LEFT.getValue()) != 0) {
            mplew.writeInt(0); //how much mins till next closeness
            mplew.writeLong(0);
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.LEVEL.getValue()) != 0) {
            mplew.write(1); //k idk
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.FULLNESS_2.getValue()) != 0) {
            mplew.writeInt(imp.getFullness()); //idk
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.UPDATE_TIME.getValue()) != 0) {
            mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.CREATE_TIME.getValue()) != 0) {
            mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.AWAKE_TIME.getValue()) != 0) {
            mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.SLEEP_TIME.getValue()) != 0) {
            mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.MAX_CLOSENESS.getValue()) != 0) {
            mplew.writeInt(100); //max closeness available to be gotten
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.MAX_DELAY.getValue()) != 0) {
            mplew.writeInt(1000); //idk, 1260?
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.MAX_FULLNESS.getValue()) != 0) {
            mplew.writeInt(1000);
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.MAX_ALIVE.getValue()) != 0) {
            mplew.writeInt(1); //k ive no idea
        }
        if ((mask & ImpFlag.SUMMONED.getValue()) != 0 || (mask & ImpFlag.MAX_MINUTES.getValue()) != 0) {
            mplew.writeInt(10); //max minutes?
        }
        mplew.write(0); //or 1 then lifeID of affected pot, OR IS THIS 0x80000?

        return mplew.getPacket();
    }

    public static byte[] spawnFlags(List<Pair<String, Integer>> flags) { //Flag_R_1 to 0, etc
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SetMapTagedObjectVisible.getValue());
        mplew.write(flags == null ? 0 : flags.size());
        if (flags != null) {
            for (Pair<String, Integer> f : flags) {
                mplew.writeMapleAsciiString(f.left);
                mplew.write(f.right.byteValue());
                mplew.writeInt(0);
                mplew.writeInt(0);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] showStatusMessage(String info, String data) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_PvPItemUseMessage);
        mplew.writeMapleAsciiString(info); //name got Shield.
        mplew.writeMapleAsciiString(data); //Shield applied to name.

        return mplew.getPacket();
    }

    public static byte[] changeTeam(int cid, int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserPvPTeamChanged.getValue());
        mplew.writeInt(cid);
        mplew.write(type); //2?

        return mplew.getPacket();
    }

    /*
     * 顯示快速移動
     */
    public static byte[] setQuickMoveInfo(List<MapleQuickMove> quickMoves) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetQuickMoveInfo.getValue());
        mplew.write(quickMoves.size());
        int i = 0;
        for (MapleQuickMove mqm : quickMoves) {
            mplew.writeInt(i++);
            mplew.writeInt(mqm.CLOSE_AFTER_CLICK ? 0 : mqm.NPC); //NPCid
            mplew.writeInt(mqm.VALUE); //NPC編號
            mplew.writeInt(mqm.MIN_LEVEL); //傳送需要的等級
            mplew.writeMapleAsciiString(mqm.DESC); //NPC功能介紹
            mplew.writeLong(PacketHelper.getTime(-2)); //00 40 E0 FD 3B 37 4F 01
            mplew.writeLong(PacketHelper.getTime(-1)); //00 80 05 BB 46 E6 17 02
        }

        return mplew.getPacket();
    }

    public static byte[] updateCardStack(int total) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_IncJudgementStack.getValue());
        mplew.write(1);// TMS 220
        mplew.write(total);

        return mplew.getPacket();
    }

    public static byte[] 美洲豹攻擊效果(int skillid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_JaguarSkill.getValue());
        mplew.writeInt(skillid);

        return mplew.getPacket();
    }

    public static byte[] openPantherAttack(boolean on) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_JaguarActive.getValue());
        mplew.writeBool(on);

        return mplew.getPacket();

    }

    public static byte[] showRedNotice(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_SystemMessage);
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] sendloginSuccess() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LOGIN_SUCC.getValue());

        return mplew.getPacket();
    }

    public static byte[] showCharCash(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_SetMaplePoint.getValue());
        mplew.writeInt(chr.getCSPoints(2));

        return mplew.getPacket();
    }

    public static byte[] showMiracleTime() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_SetMiracleTime.getValue());
        long time = System.currentTimeMillis();
        mplew.writeLong(PacketHelper.getTime(time));
        mplew.writeLong(PacketHelper.getTime(time + 70000));
        mplew.writeInt(200);
        mplew.writeInt(0);
        mplew.writeInt(0); // 2735606022
        mplew.writeMapleAsciiString("");
        mplew.writeMapleAsciiString("夢幻方塊時間到了！！ 從下午4點到6點期間，只要使用商城方塊類商品的話，即會提升道具潛在能力值等級的機率唷！詳細內容請觀看官網公告。");

        return mplew.getPacket();
    }

    public static byte[] showPlayerCash(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_PLAYER_CASH.getValue());
        mplew.writeInt(chr.getCSPoints(1));
        mplew.writeInt(chr.getCSPoints(2));

        return mplew.getPacket();
    }

    public static byte[] playerCashUpdate(int mode, int toCharge, MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_CASH_UPDATE.getValue());
        mplew.writeInt(mode);
        mplew.writeInt(toCharge == 1 ? chr.getCSPoints(1) : 0);
        mplew.writeInt(chr.getCSPoints(2));
        mplew.write(toCharge);
        mplew.write(0); //未知
        mplew.write(0); //未知
        return mplew.getPacket();
    }

    public static byte[] playerSoltUpdate(int itemid, int acash, int mpoints) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_CHARSOLE.getValue());

        mplew.writeInt(itemid);
        mplew.writeInt(acash);
        mplew.writeInt(mpoints);
        mplew.write(1);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static byte[] sendTestPacket(String test) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.write(HexTool.getByteArrayFromHexString(test));
        return mplew.getPacket();
    }

    /*
     * 傳授技能的提示
     */
    public static byte[] UpdateLinkSkillResult(int skillId, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_LINKSKILL_RESULT.getValue());
        mplew.writeInt(skillId); //技能ID
        mplew.writeInt(mode);

        return mplew.getPacket();
    }

    public static final byte[] DeleteLinkSkillResult(Map<Integer, Integer> map) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DELETE_LINKSKILL_RESULT.getValue());
        mplew.writeInt(map.size());
        for (Entry<Integer, Integer> entry : map.entrySet()) {
            mplew.writeInt(entry.getKey());
            mplew.writeInt(entry.getValue());
        }
        return mplew.getPacket();
    }

    public static final byte[] SetLinkSkillResult(int skillId, Pair<Integer, SkillEntry> skillinfo, int linkSkillId, int linkSkillLevel) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SET_LINKSKILL_RESULT.getValue());
        PacketHelper.writeSonOfLinkedSkill(mplew, skillId, skillinfo);
        mplew.writeInt(linkSkillId);
        if (linkSkillId > 0) {
            mplew.writeInt(linkSkillLevel);
        }
        return mplew.getPacket();
    }

    public static byte[] getDojangRanking() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DojangRanking.getValue());
        mplew.write(0);
        mplew.writeInt(239);
        List<Integer> list = Arrays.asList(0, 1, 2, 8);
        mplew.writeInt(list.size());
        for (int i : list) {
            mplew.write(i);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(i == 1 ? -1 : 0);
            mplew.writeInt(i == 1 ? -1 : 0);
            mplew.writeInt(i == 1 ? -1 : 0);
            mplew.writeInt(i == 1 ? -1 : 101);
            mplew.writeInt(i == 1 ? -1 : 0);
            mplew.writeInt(i == 1 ? -1 : 101);
        }
        mplew.writeInt(list.size());
        for (int i : list) {
            encodeDojangRanking(mplew, i, Collections.emptyList());
        }
        return mplew.getPacket();
    }

    private static void encodeDojangRanking(MaplePacketLittleEndianWriter p, int i, List<AvatarLook> looks) {
        p.write(i);
        p.writeInt(looks.size());
        for (int n = 0; n < looks.size(); n++) {
            p.writeInt(looks.get(n).getJob());
            p.writeInt(1); // 等級
            p.writeInt(1400); // 30321
            p.writeInt(n + 1);
            p.writeMapleAsciiString(""); // 名稱
            p.write(1);
            looks.get(n).encodeBuffer(p);
        }
    }

    /*
     * 顯示武林道場消息
     */
    public static byte[] getMulungMessage(boolean dc, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MULUNG_MESSAGE.getValue());
        mplew.write(dc ? 1 : 0);
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    //    public static byte[] showSilentCrusadeMsg(byte type, short chapter) {
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.SILENT_CRUSADE_MSG.getValue());
//        mplew.write(type);
//        mplew.writeShort(chapter - 1);
//
//        return mplew.getPacket();
//    }
    /*
     * 確認十字商店交易
     */
    public static byte[] confirmCrossHunter(byte code) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CrossHunterCompleteResult.getValue());
        /*
         * 0x00 物品購買完成。
         * 0x01 道具不夠.
         * 0x02 背包空間不足。
         * 0x03 無法擁有更多物品。
         * 0x04 現在無法購買物品。
         */
        mplew.write(code);

        return mplew.getPacket();
    }

    /*
     * 打開1個網頁地址
     */
    public static byte[] openWeb(byte nValue1, byte nValue2, String web) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserOpenURL.getValue());
        mplew.write(nValue1);
        mplew.write(nValue2);
        mplew.writeMapleAsciiString(web);

        return mplew.getPacket();
    }

    public static byte[] openWebUI(int n, String sUOL, String sURL) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserOpenWebUI.getValue());
        mplew.writeInt(n);
        mplew.writeMapleAsciiString(sUOL);
        mplew.writeMapleAsciiString(sURL);

        return mplew.getPacket();
    }

    /*
     * 更新角色內在能力技能
     * 參數 角色
     * 參數 是否升級
     */
    public static byte[] updateInnerSkill(InnerSkillEntry ise) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CharacterPotentialSet.getValue());
        mplew.write(1);
        mplew.writeBool(ise != null);
        if (ise != null) {
            mplew.writeShort(ise.getPosition());
            mplew.writeInt(ise.getSkillId());
            mplew.writeShort(ise.getSkillLevel());
            mplew.writeShort(ise.getRank());
            mplew.writeBool(ise.isTemp());
        }

        return mplew.getPacket();
    }

    /*
     * 更新角色內在能力
     * 參數 角色
     * 參數 是否升級
     */
    public static byte[] updateInnerStats(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CharacterHonorExp.getValue());
        mplew.writeInt(chr.getHonor()); //聲望點數

        return mplew.getPacket();
    }

    /*
     * 系統警告
     * 楓之谷運營員NPC自定義對話
     */
    public static byte[] sendPolice(String text) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MAPLE_ADMIN.getValue());
        mplew.writeMapleAsciiString(text);

        return mplew.getPacket();
    }

    /*
     * 顯示每日免費超級時空卷可以移動次數
     */
    public static byte[] showChronosphere(int mf, int cs) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DAY_OF_CHRONOSPHERE.getValue());
        mplew.writeInt(mf);
        mplew.writeInt(cs);

        return mplew.getPacket();
    }

    /*
     * 超級時空卷錯誤出現
     * 0x02 超時空卷不夠
     */
    public static byte[] errorChronosphere() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ERROR_CHRONOSPHERE.getValue());
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] testPacket(String testmsg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.write(HexTool.getByteArrayFromHexString(testmsg));

        return mplew.getPacket();
    }

    public static byte[] testPacket(byte[] testmsg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.write(testmsg);

        return mplew.getPacket();
    }

    public static byte[] testPacket(String op, String text) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.write(HexTool.getByteArrayFromHexString(op));
        mplew.writeMapleAsciiString(text);

        return mplew.getPacket();
    }

    /*
     * 幻影封印之瞳
     */
    public static byte[] ResultStealSkillList(int n, MapleCharacter chr, List<Integer> memorySkills) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ResultStealSkillList.getValue());
        mplew.write(1);
        mplew.writeInt(chr.getId());
        mplew.writeInt(n);
        if (n == 4) {
            mplew.writeInt(chr.getJob());
            mplew.writeInt(memorySkills.size());
            memorySkills.forEach(mplew::writeInt);
        }

        return mplew.getPacket();

    }

    /*
     * Recv SKILL_MEMORY [002E] (12)
     * 2E 00
     * 01
     * 03
     * 01 00 00 00 - 技能在第個欄
     * 01 00 00 00 - 技能在當前欄的位置
     * ............
     */
    public static byte[] 幻影刪除技能(int skillBook, int position) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeStealMemoryResult.getValue());
        mplew.write(1);
        mplew.write(3);
        mplew.writeInt(skillBook);
        mplew.writeInt(position);

        return mplew.getPacket();
    }

    public static byte[] 修改幻影裝備技能(int skillId, int teachId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ResultSetStealSkill.getValue());
        mplew.write(1);
        mplew.write(1);
        mplew.writeInt(skillId);
        mplew.writeInt(teachId);

        return mplew.getPacket();
    }

    public static byte[] 幻影複製錯誤() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeStealMemoryResult.getValue());
        mplew.write(1);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] 幻影複製技能(int position, int skillId, int level) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeStealMemoryResult.getValue());
        mplew.write(1);
        mplew.write(0);
        if (position < 4) {
            mplew.writeInt(1);
            mplew.writeInt(position);
        } else if (position < 8) {
            mplew.writeInt(2);
            mplew.writeInt(position - 4);
        } else if (position < 11) {
            mplew.writeInt(3);
            mplew.writeInt(position - 8);
        } else if (position < 13) {
            mplew.writeInt(4);
            mplew.writeInt(position - 11);
        } else if (position < 15) {
            mplew.writeInt(5);
            mplew.writeInt(position - 13);
        }
        mplew.writeInt(skillId);
        mplew.writeInt(level);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 未知封包 右鍵點擊玩家出現的返回封包
     * 好像不發送申請交易的一方就無法交易中放道具
     */
    public static byte[] CheckTrickOrTreatRequest() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTrickOrTreatResult.getValue());
        mplew.write(0x01);

        return mplew.getPacket();
    }

    public static byte[] SystemProcess() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CheckProcess.getValue());
        mplew.write(0x01);

        return mplew.getPacket();
    }

    /*
     * 顯示連續擊殺怪物的效果
     */
    public static byte[] showContinuityKill(boolean top, int exp, int kills, int moboid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_StylishKillMessage);
        mplew.write(top ? 0 : 1); //這個地方如果要頂部提示就是 0
        if (top) {
            mplew.writeLong(exp); //獲得多少經驗
        }
        mplew.writeInt(kills); //已經連續擊殺多少次 如果是頂部這個地方就是1下殺死的怪物數量
        if (!top) {
            mplew.writeInt(moboid);
        }
        mplew.writeInt(kills);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] showGainVictoryEffect(long VictoryExp, int VictoryNum, int Victoryoid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_EvolvingSystemMessageWithName);
        mplew.write(1);
        mplew.writeLong(VictoryExp);
        mplew.writeInt(VictoryNum);
        mplew.writeInt(Victoryoid);

        return mplew.getPacket();
    }

    public static byte[] showVictoryEffect(int Victorynum, long VictoryExp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.writeShort(MessageOpcode.MS_EvolvingSystemMessageWithName);
        mplew.writeLong(VictoryExp);
        mplew.writeInt(Victorynum);
        return mplew.getPacket();
    }

    public static byte[] showGainWeaponPoint(int gainwp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.writeShort(MessageOpcode.MS_IncWPMessage);
        mplew.writeInt(gainwp);

        return mplew.getPacket();
    }

    public static byte[] updateWeaponPoint(int wp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ZeroWP.getValue());
        mplew.writeInt(wp);

        return mplew.getPacket();
    }

    public static byte[] FinalAttack(int tick, boolean suc, int skillId, int finalSkillId, int weaponType, List<Integer> oids) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_UserFinalAttackRequest.getValue());
        mplew.writeInt(tick);
        mplew.writeInt(suc ? 1 : 0);
        mplew.writeInt(skillId);
        mplew.writeInt(suc ? finalSkillId : 0);
        mplew.writeInt(suc ? weaponType / 10 : 0);
        mplew.writeInt(oids.size());
        for (int oid : oids) {
            mplew.writeInt(oid);
        }
        return mplew.getPacket();
    }

    public static byte[] openWorldMap() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.VIEW_WORLDMAP.getValue());
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    /*
     * 技能重生
     *
     */
    public static byte[] skillActive() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ResetOnStateForOnOffSkill.getValue());

        return mplew.getPacket();
    }

    public static byte[] skillNotActive(int skillId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetOffStateForOnOffSkill.getValue());
        mplew.writeInt(skillId);

        return mplew.getPacket();
    }

    public static byte[] poolMakerInfo(boolean result, int count, int cooltime) { // 400051074
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.POOLMAKER_INFO.getValue());
        mplew.write(result);
        if (result) {
            mplew.writeInt(count); // 20 -> 19 -> 18 .... -> 5 ?
            mplew.writeInt(cooltime); // 60000
        }
        return mplew.getPacket();
    }

    public static byte[] multiSkillInfo(int skillId, int count, int maxCount, int timeout) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MULTI_SKILL_INFO.getValue());
        mplew.writeInt(skillId);
        mplew.writeInt(count);
        mplew.writeInt(maxCount);
        mplew.writeInt(timeout);

        return mplew.getPacket();
    }

    public static byte[] updateHayatoPoint(int point) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.HAYATO_POINT.getValue());
        mplew.writeShort(point);

        return mplew.getPacket();
    }

    public static byte[] sendCritAttack() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DodgeSkillReady.getValue());

        return mplew.getPacket();
    }

    public static byte[] updateSoulEffect(int chrid, boolean open) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSoulEffect.getValue());

        mplew.writeInt(chrid);
        mplew.writeBool(open);

        return mplew.getPacket();
    }

    public static byte[] RuneStoneClearAndAllRegister(List<MapleRuneStone> runes) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RuneStoneClearAndAllRegister.getValue());

        mplew.writeInt(runes.size());
        mplew.writeInt(ServerConfig.HALLOWEEN_SKIN ? 1 : 0); // 0 - (基本) 1 - 萬聖節帽子(萬聖節) 2 - 5000氣球(5000天) 3 - 福袋(2017春節) 4 - 蜂蜜(2017蜜) 5 - 噴水(2017NOVA)
        mplew.writeInt(0);
        for (MapleRuneStone rune : runes) {
            RuneStoneInfo(mplew, rune);
        }
        return mplew.getPacket();
    }

    public static byte[] spawnRuneStone(MapleRuneStone rune) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RuneStoneAppear.getValue());

        mplew.writeInt(0);
        mplew.writeInt(ServerConfig.HALLOWEEN_SKIN ? 1 : 0); // 0 - (基本) 1 - 萬聖節帽子(萬聖節) 2 - 5000氣球(5000天) 3 - 福袋(2017春節) 4 - 蜂蜜(2017蜜) 5 - 噴水(2017NOVA)
        mplew.writeInt(0);
        RuneStoneInfo(mplew, rune);

        return mplew.getPacket();
    }

    public static void RuneStoneInfo(final MaplePacketLittleEndianWriter mplew, final MapleRuneStone rune) {
        mplew.writeInt(rune == null ? 0 : rune.getRuneType()); // ERuneStoneType
        mplew.writeInt(rune == null ? 0 : rune.getPosition().x);
        mplew.writeInt(rune == null ? 0 : rune.getPosition().y);
        mplew.write(rune != null && rune.isFacingLeft());
    }

    public static byte[] removeRuneStone(int charId, int percent, boolean lowerLv, boolean noText) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RuneStoneDisappear.getValue());
        mplew.writeInt(0);
        mplew.writeInt(charId);
        mplew.writeInt(percent);
        mplew.write(lowerLv);
        mplew.write(noText);

        return mplew.getPacket();
    }

    public static byte[] RuneAction(MapleRuneStone.RuneStoneAction action) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RuneStoneUseAck.getValue());
        mplew.writeInt(9);
        mplew.write(action.getPacket());

        return mplew.getPacket();
    }

    public static byte[] RuneAction(int type, int time) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RuneStoneUseAck.getValue());
        mplew.writeInt(type);
        if (time > 0) {
            mplew.writeInt(time);
        } else {
            for (int i = 0; i < 4; i++) {
                mplew.writeInt(Randomizer.nextInt(4));
            }
        }
        return mplew.getPacket();
    }

    public static byte[] showRuneEffect(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RuneStoneSkillAck.getValue());
        mplew.writeInt(type);

        return mplew.getPacket();
    }

    public static byte[] sendRuneCurseMsg(String msg) {
        return sendRuneCurseMsg(msg, false);
    }

    public static byte[] sendRuneCurseMsg(String msg, boolean isRelieve) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.RUNE_CURSE_MSG.getValue());
        mplew.writeMapleAsciiString(msg);
        mplew.writeInt(231);
        mplew.write(isRelieve);
        mplew.write(!msg.isEmpty());
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    //    public static byte[] pamsSongEffect(int chrId) {
//        if (ServerConfig.DEBUG_MODE) {
//            log.trace("調用");
//        }
//        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//
//        mplew.writeShort(SendPacketOpcode.PAMS_SONG.getValue());
//        mplew.writeInt(chrId);
//
//        return mplew.getPacket();
//    }
    public static byte[] startBattleStatistics() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_BattleRecordBattleDamageInfo.getValue()); // fixed by mikodo
        mplew.write(1); //doesn't seem to change it

        return mplew.getPacket();
    }

    public static byte[] updateDamageSkin(MapleCharacter player, boolean save) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(save ? SendPacketOpcode.SAVE_DAMSKIN.getValue() : SendPacketOpcode.DELETE_DAMSKIN.getValue());
        writeDamageSkinData(mplew, player);

        return mplew.getPacket();
    }

    public static void writeDamageSkinData(final MaplePacketLittleEndianWriter mplew, final MapleCharacter player) {
        final String customData = player.getQuestNAdd(MapleQuest.getInstance(7291)).getCustomData();
        mplew.writeInt(customData == null ? 0 : Integer.valueOf(customData));
        final String questInfo = player.getOneInfo(56829, "count");
        mplew.writeInt((questInfo == null) ? ServerConfig.defaultDamageSkinSlot : Integer.valueOf(questInfo));
        mplew.writeInt(player.getDamSkinList().size());
        player.getDamSkinList().forEach(mplew::writeInt);
    }

    public static byte[] changeHour(int n1, int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_HourChanged.getValue());
        mplew.writeShort(n1);
        mplew.writeShort(n2);

        return mplew.getPacket();
    }

    public static byte[] createObtacleAtom(int count, int type1, int type2, MapleMap map) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ObtacleAtomCreate.getValue());
        mplew.writeInt(0);
        mplew.writeInt(count);
        mplew.write(0);
        int n5 = Randomizer.nextInt(200000);
        for (int i2 = 0; i2 < count; ++i2) {
            MapleFoothold foothold = map.getFootholds().getAllRelevants().get(Randomizer.nextInt(map.getFootholds().getAllRelevants().size()));
            int n6 = foothold.getY2();
            int n7 = Randomizer.rand(map.getLeft(), map.getRight());
            Point point = map.calcPointBelow(new Point(n7, n6));
            if (point == null) {
                point = new Point(n7, n6);
            }
            mplew.write(1);
            mplew.writeInt(Randomizer.rand(type1, type2));
            mplew.writeInt(n5 + i2);
            mplew.writeInt((int) point.getX());
            mplew.writeInt(map.getTop());
            mplew.writeInt((int) point.getX());
            mplew.writeInt(Math.abs(map.getTop() - (int) point.getY()));
            mplew.writeInt(Randomizer.rand(25, 37));
            mplew.write(0);
            mplew.writeInt(Randomizer.rand(10, 15));
            mplew.writeInt(0);
            mplew.writeInt(Randomizer.rand(500, 1300));
            mplew.writeInt(0);
            mplew.writeInt(Randomizer.rand(10, 173));
            mplew.writeInt(Randomizer.rand(1, 4));
            mplew.writeInt(Math.abs(map.getTop() - (int) point.getY()));
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        return mplew.getPacket();
    }

    public static byte[] sendMarriedBefore(int n2, int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_WeddingProgress.getValue());
        mplew.writeInt(n2);
        mplew.writeInt(n3);

        return mplew.getPacket();
    }

    public static byte[] sendMarriedDone() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_WeddingCremonyEnd.getValue());

        return mplew.getPacket();
    }

    public static byte[] showVisitorResult(int type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_VISITOR_RESULT.getValue());
        mplew.writeShort(type);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static byte[] updateVisitorKills(int n2, int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_VISITOR_KILL.getValue());
        mplew.writeShort(n2);
        mplew.writeShort(n3);

        return mplew.getPacket();
    }

    public static byte[] showFieldValue(String str, String act) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_FieldValue.getValue());
        mplew.writeMapleAsciiString(str);
        mplew.writeMapleAsciiString(act);

        return mplew.getPacket();
    }

    public static byte[] DressUpInfoModified(MapleCharacter player) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DressUpInfoModified.getValue());
        PacketHelper.writeDressUpInfo(mplew, player);

        return mplew.getPacket();

    }

    public static byte[] UserRequestChangeMobZoneState(String data, int b1, List<Point> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHANGE_MOBZONESTATE_REQUEST.getValue());
        mplew.writeMapleAsciiString(data == null ? "" : data);
        mplew.writeInt(b1);
        mplew.writeInt(list.size());
        list.stream().filter(Objects::nonNull).forEach(mplew::writePosInt);

        return mplew.getPacket();
    }

    public static final byte[] LobbyTimeAction(final int n, final int n2, final int n3, int n4, int n5) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTimerInfo.getValue());
        mplew.writeInt(n);
        mplew.writeInt(n2);
        mplew.writeInt(n3);
        mplew.writeInt(0);
        mplew.writeInt(n4);
        mplew.writeInt(n5);

        return mplew.getPacket();
    }

    public static byte[] SendGiantBossMap(Map<String, String> map) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GIANT_BOSS_MAP.getValue());
        mplew.writeInt(map.size());
        for (Entry<String, String> entry : map.entrySet()) {
            mplew.writeMapleAsciiString(entry.getKey());
            mplew.writeMapleAsciiString(entry.getValue());
        }

        return mplew.getPacket();
    }

    public static byte[] ShowPortal(String string, int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_PORTAL.getValue());
        mplew.writeMapleAsciiString(string);
        mplew.writeInt(n2);

        return mplew.getPacket();
    }

    public static byte[] IndividualDeathCountInfo(int cid, int n2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_IndividualDeathCountInfo.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(n2);

        return mplew.getPacket();
    }

    public static byte[] userBonusAttackRequest(int skillid, int value, List<Integer> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserBonusAttackRequest.getValue());
        mplew.writeInt(skillid);
        mplew.writeInt(list.size());
//        mplew.writeInt(n2);//開拓者.連段襲擊_1,開拓者.連段襲擊_釋放_1,開拓者.連段襲擊_爆破_1,開拓者.連段襲擊_轉移_1
        mplew.writeBool(list.size() <= 0);
        mplew.writeInt(1);
        mplew.writeInt(value);
        for (int n : list) {
            mplew.writeInt(n);
            mplew.writeInt(0);
            if (skillid == 400041030) {
                mplew.writeInt(0);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] SkillFeed() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SKILL_FEED.getValue());
        mplew.writeInt(1);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] RegisterExtraSkill(int sourceId, List<ExtraSkill> skills) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_RegisterExtraSkill.getValue());
        mplew.writeInt(sourceId);
        mplew.writeShort(skills.size());
        for (ExtraSkill skill : skills) {
            mplew.writeInt(skill.TriggerSkillID);
            mplew.writeInt(skill.SkillID);
            mplew.writePosInt(skill.Position);
            mplew.writeShort(skill.FaceLeft);
            mplew.writeInt(skill.Delay);
            mplew.writeInt(skill.Value);

            mplew.writeInt(skill.MobOIDs.size());
            for (int oid : skill.MobOIDs) {
                mplew.writeInt(oid);
            }
            mplew.writeInt(skill.UnkList.size());
            for (int un : skill.UnkList) {
                mplew.writeInt(un);
            }

            mplew.writeInt(skill.TargetOID);
        }

        return mplew.getPacket();
    }

    public static byte[] objSkillEffect(int objId, int skillId, int cid, Point pos) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OBJ_SKILL_EFFECT.getValue());
        mplew.writeInt(objId);
        mplew.writeInt(skillId);
        mplew.writeInt(cid);
        mplew.writePosInt(pos);

        return mplew.getPacket();
    }

    public static byte[] GameExit() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GAME_EXIT.getValue());

        return mplew.getPacket();
    }

    public static final byte[] openMapleUnion(final int n, final MapleUnion ah) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ShowMapleUnion.getValue());
        mplew.writeInt(n);
        addMapleUnionInfo(mplew, ah);
        return mplew.getPacket();
    }

    public static final byte[] updateMapleUnion(final MapleUnion mapleUnion) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.UpdateMapleUnion.getValue());
        addMapleUnionInfo(mplew, mapleUnion);
        return mplew.getPacket();
    }

    public static final void addMapleUnionInfo(final MaplePacketLittleEndianWriter mplew, final MapleUnion union) {
        mplew.writeInt(0);
        mplew.writeInt(union.getAllUnions().size());
        union.getAllUnions().values().forEach(it -> writeMapleUnionData(mplew, it));
        mplew.writeInt(union.getFightingUnions().size());
        union.getFightingUnions().values().forEach(it -> writeMapleUnionData(mplew, it));
        mplew.write(0);
        boolean labSS = false;
        mplew.write(labSS);
        if (labSS) {
            writeMapleUnionData(mplew, null);
        }
        boolean labSSS = false;
        mplew.write(labSSS);
        if (labSSS) {
            writeMapleUnionData(mplew, null);
        }
    }

    public static final void writeMapleUnionData(final MaplePacketLittleEndianWriter mplew, final MapleUnionEntry union) {
        mplew.writeInt(union.getType());
        mplew.writeInt(union.getCharacterId());
        mplew.writeInt(union.getLevel());
        mplew.writeInt(union.getJob() == 900 ? 100 : union.getJob());
        mplew.writeInt(0);
        mplew.writeInt(union.getRotate());
        mplew.writeInt(union.getBoardIndex());
        mplew.writeInt(union.getLocal());
        mplew.writeMapleAsciiString(union.getName());
        if (union.getType() == 2) {
            mplew.writeMapleAsciiString("");
        }
    }

    public static byte[] MapleUnionPresetResult(int idx, MapleUnion union) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MapleUnionPresetResult.getValue());
        mplew.writeInt(idx);
        mplew.write(1);
        for (int i = 0; i < 8; i++) {
            mplew.writeInt(i);
        }
        mplew.writeInt(union.getFightingUnions().size());
        union.getFightingUnions().values().forEach(it -> writeMapleUnionData(mplew, it));
        return mplew.getPacket();
    }

    public static final byte[] getMapleUnionCoinInfo(final int n, final int count) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MapleUnionCoinInfo.getValue());
        mplew.writeInt(n);
        mplew.writeInt(count);
        return mplew.getPacket();
    }

    public static byte[] ArcaneRiverQuickPath() {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ARCANERIVER_QUICKPATH.getValue());
        mplew.writeInt(1);
        return mplew.getPacket();
    }

    /**
     * 聯機的多向技能
     */
    public static byte[] MultiSkillResult(int cid, int skillid, int display, int direction, int stance, int Type, int itemid, List<MapleMulitInfo> info) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.ShowMultiSkillAttack.getValue());
        mplew.writeInt(cid);
        mplew.writeInt(skillid);
        //動作
        mplew.write(display); // = lea.readByte();
        mplew.write(direction);
        mplew.writeShort(stance);
        mplew.write(0);
        mplew.writeInt(Type);
        mplew.writeInt(itemid);
        mplew.writeInt(info.size());
        for (MapleMulitInfo mapleMulitInfo : info) {
            mapleMulitInfo.serialize(mplew);
        }

        return mplew.getPacket();
    }

    public static byte[] VSkillObjectAction(int skillid, int display, List<Integer> info) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.VSkillObjectAction.getValue());
        mplew.write(1);
        mplew.writeInt(skillid);
        mplew.writeInt(display);//V.162 byte=>int
        mplew.writeInt(info.size());
        info.forEach(mplew::writeInt);
//        if (skillid == 神炮王.宇宙無敵火炮彈) {
//            for (MapleMulitInfo mapleMulitInfo : info) {
//                mplew.writeInt(mapleMulitInfo.ObjectId);
//            }
//        } else {
//            for (MapleMulitInfo mapleMulitInfo : info) {
//                mapleMulitInfo.serialize(mplew);
//            }
//        }

        return mplew.getPacket();
    }

    public static byte[] userTossedBySkill(int id, int oid, MobSkill skill) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UserTossedBySkill.getValue());
        mplew.writeInt(id);
        mplew.writeInt(oid);
        mplew.writeInt(skill.getSourceId());
        mplew.writeInt(skill.getLevel());
        mplew.writeInt(skill.getX());
        mplew.writeInt(0); // 226+
        return mplew.getPacket();
    }

    public static byte[] summonedBeholderRevengeAttack(int playerID, int summonOid, List<Integer> oids) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SummonedBeholderRevengeAttack.getValue());
        mplew.writeInt(playerID);
        mplew.writeInt(summonOid);
        mplew.writeInt(oids == null ? 0 : oids.size());
        if (oids != null) {
            for (int oid : oids) {
                mplew.writeInt(oid);
            }
        }
        return mplew.getPacket();
    }

    public static byte[] summonedBeholderRevengeInfluence(int id, int objectId, int skillID, int b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SummonedBeholderRevengeInfluence.getValue());
        mplew.writeInt(id);
        mplew.writeInt(objectId);
        mplew.writeInt(skillID);
        mplew.write(b);
        return mplew.getPacket();
    }

    public static byte[] skillCooltimeSet(int skillID, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SkillCooltimeSetM.getValue());
        mplew.writeInt(1);
        mplew.writeInt(skillID);
        mplew.writeInt(duration);
        return mplew.getPacket();
    }

    public static byte[] RegisterElementalFocus(Map<Integer, Integer> map) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.RegisterElementalFocus.getValue());
        mplew.writeInt(map.size());
        for (Entry<Integer, Integer> o : map.entrySet()) {
            mplew.writeInt(o.getKey());
            mplew.writeInt(o.getValue());
        }
        return mplew.getPacket();
    }

    public static byte[] UserElementalFocusResult(int playerId, int sourceId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UserElementalFocusResult.getValue());
        mplew.writeInt(playerId);
        mplew.writeInt(sourceId);
        mplew.writeInt(2);
        return mplew.getPacket();
    }

    public static byte[] showHoyoungHide(int playerId, boolean status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.HoyoungHide.getValue());
        mplew.writeInt(playerId);
        mplew.writeBool(status);
        return mplew.getPacket();
    }

    public static byte[] setEventUIInfo(int n) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SetEventUIInfo.getValue());
        mplew.writeInt(n);
        mplew.write(1);
        mplew.writeLong(17240000000000L + (System.currentTimeMillis() >> 8));
        return mplew.getPacket();
    }

    public static byte[] LiftSkillAction(int i, int i1, int i2, int x, int y) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LiftSkillAction.getValue());
        mplew.writeInt(i);
        mplew.writeInt(i1);
        mplew.writeInt(i2);
        mplew.writeInt(x);
        mplew.writeInt(y);
        return mplew.getPacket();
    }

    public static byte[] zeroInfo(MapleCharacter chr, int mask, boolean beta) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_ZeroInfo.getValue());
        chr.getStat().zeroData(mplew, chr, mask, beta);
        return mplew.getPacket();
    }

    public static byte[] mvpPacketTips() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MVP_PACKET_TIPS.getValue());

        return mplew.getPacket();
    }

    public static byte[] showMobCollectionComplete(final int n, final List<Pair<Integer, Integer>> list, final int n2, final int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.MobCollectionCompleteRewardResult.getValue());
        mplew.writeInt(n);
        if (list == null || list.isEmpty()) {
            mplew.writeInt(1);
            mplew.writeInt(n2);
            mplew.writeInt(n3);
        } else {
            mplew.writeInt(list.size());
            for (final Pair<Integer, Integer> pair : list) {
                mplew.writeInt(pair.left);
                mplew.writeInt(pair.right);
            }
        }
        return mplew.getPacket();
    }

    public static byte[] SetMapTaggedObjectSmoothVisible(ArrayList<TaggedObjRegenInfo> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.SetMapTaggedObjectSmoothVisible.getValue());
        mplew.writeInt(list.size());
        for (final TaggedObjRegenInfo a1298 : list) {
            mplew.writeMapleAsciiString(a1298.getTag());
            mplew.writeBool(a1298.isVisible());
            mplew.writeInt(a1298.akb);
            mplew.writeInt(0);
        }
        return mplew.getPacket();
    }

    public static byte[] DynamicObjUrusSync(List<Pair<String, Point>> syncFH) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_DynamicObjUrusSync.getValue());
        mplew.writeInt(syncFH.size());
        for (final Pair<String, Point> pair : syncFH) {
            mplew.writeMapleAsciiString(pair.left);
            mplew.write(0);
            mplew.writeInt(1); // or 0 隱藏
            mplew.writePosInt(pair.right);
        }
        return mplew.getPacket();
    }

    public static byte[] UserCreateAreaDotInfo(int n, int skillId, Rectangle rect) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_UserCreateAreaDotInfo);
        mplew.writeInt(n);
        mplew.writeInt(skillId);
        mplew.writeInt(0);
        mplew.writeRect(rect);
        return mplew.getPacket();
    }

    public static byte[] UserAreaInfosPrepare(int skillId, int n, Rectangle[] rectangles) {
        MaplePacketLittleEndianWriter p = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_UserAreaInfosPrepare);
        p.writeInt(skillId);
        p.writeInt(n);
        p.writeInt(rectangles.length);
        for (int i = 0; i < rectangles.length; i++) {
            p.writeInt(i + 1);
            p.writeRect(rectangles[i]);
        }

        return p.getPacket();
    }

    public static byte[] Unknown_42D() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_SpecialChairTWSitResult);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(1);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] CharacterModified(MapleCharacter chr, long l) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.CharacterModified);
        mplew.write(1);
        PacketHelper.addCharacterInfo(mplew, chr, l);
        return mplew.getPacket();
    }

    public static byte[] ExclRequest() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_ExclRequest);
        return mplew.getPacket();
    }

    public static byte[] bossMessage(int mode, int mapid, int mobId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_EliteMobWorldMapNotice.getValue());
        mode = mobId <= 0 ? 1 : mode;
        mplew.write(mode);
        mplew.write(0); // ?????????
        mplew.writeInt(mapid);
        if (mode != 1) {
            mplew.writeInt(mobId);
            mplew.writeInt((1 << 16) + 1); // ?
        }
        mplew.write(0);

        return mplew.getPacket();
    }

    private static void writeTmsSpecPacket(MaplePacketLittleEndianWriter mplew, int action, byte op, int nValue) {
        mplew.writeInt(action);
        mplew.writeInt(0);
        mplew.write(op);
        mplew.writeInt(nValue);
    }

    public static byte[] getAnimusCubeRes(short opcode, int action, int value, int cubeId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        writeTmsSpecPacket(mplew, action, (byte) 3, value);
        mplew.writeInt(cubeId);

        return mplew.getPacket();
    }

    public static byte[] getTmsCubeRes(short opcode, int action, int value) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        writeTmsSpecPacket(mplew, action, (byte) 1, value);

        return mplew.getPacket();
    }

    public static byte[] getAnimaCubeRes(short opcode, int action, int value, long cost) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        writeTmsSpecPacket(mplew, action, (byte) 3, value);
        mplew.writeLong(cost);

        return mplew.getPacket();
    }

    public static byte[] getAnimusCubeRes(short opcode, int action, int cubeId, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        writeTmsSpecPacket(mplew, action, (byte) 7, 0);
        mplew.writeInt(cubeId);
        PacketHelper.GW_ItemSlotBase_Encode(mplew, item);

        return mplew.getPacket();
    }

    public static byte[] getHexaCubeRes(short opcode, int action, List<Integer> potids) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        writeTmsSpecPacket(mplew, action, (byte) 7, potids == null ? 1 : 0);
        if (potids != null) {
            mplew.writeInt(potids.size() / 2);
            mplew.write(potids.size() * 2);
            potids.forEach(mplew::writeInt);
        }

        return mplew.getPacket();
    }

    public static byte[] getUniCubeRes(short opcode, int action, int op) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        writeTmsSpecPacket(mplew, action, (byte) op, 0);

        return mplew.getPacket();
    }

    public static byte[] getEquipTransmitRes(short opcode, int action, int op, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        mplew.writeInt(action);
        mplew.writeInt(0);
        mplew.write(op);

        PacketHelper.GW_ItemSlotBase_Encode(mplew, item);

        return mplew.getPacket();
    }

    public static byte[] getEquipTransmitResult(short opcode, int action, int op) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(opcode);
        mplew.writeInt(action);
        mplew.writeInt(0);
        mplew.writeInt(op);

        return mplew.getPacket();
    }

    public static byte[] receiveReward(int id, byte mode, long quantity) {
        return updateReward(id, mode, null, quantity);
    }

    public static byte[] updateReward(int id, byte mode, List<MapleReward> rewards, long value) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REWARD.getValue());
        mplew.write(mode);
        switch (mode) {
            case 0x09:
                mplew.writeInt(rewards.size());
                if (rewards.size() > 0) {
                    for (MapleReward reward : rewards) {
                        boolean empty = reward.getId() < 1;
                        mplew.writeInt(0);
                        mplew.writeInt(empty ? 0 : reward.getId()); // 0 = blank 1+ = gift
                        if (!empty) {
                            if ((value & 1) != 0) {
                                mplew.writeLong(PacketHelper.getTime(reward.getReceiveDate() > 0 ? reward.getReceiveDate() : -2));
                                mplew.writeLong(PacketHelper.getTime(reward.getExpireDate() > 0 ? reward.getExpireDate() : -1));
                            }
                            if ((value & 2) != 0) { //nexon do here a3 & 2 when a3 is 9
                                mplew.writeInt(0);
                                mplew.writeInt(0);
                                mplew.writeInt(0);
                                mplew.writeInt(0);
                                mplew.writeInt(0);
                                mplew.writeInt(0);
                                mplew.writeMapleAsciiString("");
                                mplew.writeMapleAsciiString("");
                                mplew.writeMapleAsciiString("");
                            }
                            mplew.writeInt(reward.getType());
                            mplew.writeInt(reward.getType() == MapleReward.道具 || reward.getType() == MapleReward.現金道具 ? reward.getItemId() : 0);
                            mplew.writeInt(reward.getType() == MapleReward.道具 || reward.getType() == MapleReward.現金道具 ? reward.getAmount() : 0);
                            mplew.writeInt(0);
                            mplew.writeLong(PacketHelper.getTime(-1));
                            mplew.writeInt(0); // sn
                            mplew.writeInt(reward.getType() == MapleReward.楓點 ? reward.getAmount() : 0);
                            mplew.writeLong(reward.getType() == MapleReward.楓幣 ? reward.getAmount() : 0);
                            mplew.writeInt(reward.getType() == MapleReward.經驗 ? reward.getAmount() : 0);
                            mplew.writeInt(-99);
                            mplew.writeInt(-99);
                            mplew.writeMapleAsciiString("");
                            mplew.writeMapleAsciiString("");
                            mplew.writeMapleAsciiString("");
                            if ((value & 4) != 0) {
                                mplew.writeMapleAsciiString("");
                            }
                            if ((value & 8) != 0) {
                                mplew.writeMapleAsciiString(reward.getDesc());
                            }
                            mplew.writeInt(0);
                            mplew.writeInt(0);
                            mplew.writeLong(0);
                        }
                    }
                }
                break;
            case 0x14: // 楓點領取失敗。
                break;
            case 0x0B: // 獲得楓點。\r\n(%d 楓點)
                mplew.writeInt(id);
                mplew.writeInt(value); // 楓葉點數數量
                mplew.writeInt(0);
                break;
            case 0x17: // 楓幣領取失敗。
                break;
            case 0x0E: // 獲得楓幣。\r\n(%d 楓幣)
                mplew.writeInt(id);
                mplew.writeLong(value); // 楓幣數量
                mplew.writeInt(0);
                break;
            case 0x18: // 經驗值領取失敗。
                break;
            case 0x0F: // 獲得經驗值。\r\n(%d 經驗值)
                mplew.writeInt(id);
                mplew.writeInt(value); // 經驗值數量
                mplew.writeInt(0);
                break;
            case 0x15: // 道具領取失敗。
                mplew.write((byte) value);
                break;
            case 0x0C: // 獲得此道具。
                mplew.writeInt(id);
                mplew.writeInt(0);
                break;
            case 0x16: // 現金道具領取失敗。
                mplew.write((byte) value);
                break;
            case 0x0D:
                mplew.writeInt(id);
                mplew.writeInt(0);
                break;
            case 0x21: // 獎勵領取失敗。請再試一次。
                mplew.write((byte) value);
                break;
        }

        return mplew.getPacket();
    }

    public static byte[] getBossPartyCheckDone(int result, int unk_1, int unk_2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_BossPartyCheckDone.getValue());
        /*
         0 - 超過入場次數或是沒有組隊而無法申請Boss入場。
         1 - OK
         2 - 確認隊員的等級或是任務.
         3 - 確認是否有隊員登出.
         4 - 申請人員中有無法移動的玩家.
         5 - 無法使用待機列的地方。
         6 - 因未知理由而失敗。
         */
        mplew.writeInt(result);
        mplew.writeInt(unk_1);
        mplew.writeInt(unk_2);

        return mplew.getPacket();
    }

    public static byte[] getShowBossListWait(MapleCharacter chr, int usType, int[] Value) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_UserWaitQueueReponse.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(usType);
        switch (usType) {
            case 11: {
                mplew.write(Value[0]); // nResultCode
                mplew.writeInt(Value[1]); // 40905 ??
                mplew.writeInt(Value[2]); // waitingQueueID
                mplew.writeInt(0); // nHideQuest
                mplew.writeInt(0);
                mplew.writeInt(0); // dwReason
                mplew.writeInt(Value[3]); // dwEnterField
                break;
            }
            case 13:
            case 14: {
                mplew.write(Value[0]);
                mplew.writeInt(Value[1]);
                mplew.writeInt(Value[2]);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                break;
            }
            case 18:
                mplew.write(Value[0]);
                mplew.writeInt(Value[1]);
                mplew.writeInt(Value[2]);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                break;
            case 20:
                mplew.write(Value[0]);
                break;
            case 21:
                int v3 = 0;
                mplew.write(v3);
                for (int v34 = 0; v34 < v3; v34++) {
                    mplew.write(0);
                }
                break;
            case 22:
                break;
            case 23:
                break;
            case 24:
                break;
            default:
                mplew.write(Value[0]);
                mplew.writeInt(Value[1]);
                mplew.writeInt(Value[2]);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                break;
        }

        return mplew.getPacket();
    }

    public static byte[] SpecialChairSitResult(int var0, boolean var1, boolean var2, SpecialChair var3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_SpecialChairSitResult);
        mplew.writeInt(var0);
        mplew.writeBool(var1);
        mplew.writeByte(0);
        if (var3 == null) {
            mplew.writeInt(0);
            mplew.writeByte(0);
        } else {
            SpecialChairTWData(mplew, var2, var3);
        }
        return mplew.getPacket();
    }

    public static void SpecialChairTWData(MaplePacketLittleEndianWriter mplew, boolean var1, SpecialChair var2) {
        mplew.writeInt(var2.vq());
        mplew.writeBool(var1);
        if (var1) {
            mplew.writeInt(var2.getItemId());
            mplew.writeInt(var2.vt().length);
            mplew.writeRect(var2.vs());
            mplew.writeInt(var2.getPosition().x);
            mplew.writeInt(var2.getPosition().y);
            mplew.writeInt(var2.vt().length);
            int var5 = 0;

            for (int var10000 = var5; var10000 < var2.vt().length; var10000 = var5) {
                int var3 = var2.vt()[var5];
                int var4 = var2.vr()[var5];
                mplew.writeInt(var3);
                mplew.writeBool(var3 == var2.V());
                mplew.writeInt(var3 <= 0 ? -1 : var4);
                ++var5;
            }
        }
    }

    public static byte[] SpecialChairTWRemove(int var0, int var1, int var2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_SpecialChairTWRemove);

        mplew.writeInt(var0);
        mplew.writeInt(var1);
        mplew.writeInt(var2);
        mplew.writeInt(-1);
        mplew.writeBool(false);
        return mplew.getPacket();
    }

    public static byte[] SpecialChairTWSitResult(int var0, Map<Integer, Map<Integer, SpecialChairTW>> var1, List<Integer> var2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_SpecialChairTWSitResult);

        mplew.writeInt(var0);
        mplew.writeInt(var1.size());

        for (Entry<Integer, Map<Integer, SpecialChairTW>> var4 : var1.entrySet()) {
            mplew.writeInt(var4.getKey());
            mplew.writeInt(var4.getValue().size());

            for (SpecialChairTW var6 : var4.getValue().values()) {
                SpecialChairTWData(mplew, var6);
            }
        }

        mplew.writeInt(1);
        mplew.writeInt(var2.size());

        for (int var8 : var2) {
            mplew.writeInt(var8);
        }
        return mplew.getPacket();
    }

    private static void SpecialChairTWData(MaplePacketLittleEndianWriter mplew, SpecialChairTW scTW) {
        mplew.writeInt(scTW.getItemId());
        mplew.writeInt(scTW.getPosition().x);
        mplew.writeInt(scTW.getPosition().y);
        mplew.writeRect(scTW.vs());
        SpecialChairTWData(mplew, scTW.vu(), scTW.vr());
        SpecialChairTWData(mplew, scTW.vv(), scTW.vr());
        mplew.writeBool(true);
    }

    private static void SpecialChairTWData(MaplePacketLittleEndianWriter mplew, Map<Integer, Integer> var1, int[] var2) {
        TreeMap<Integer, Integer> var3 = new TreeMap<>();
        var1.forEach((var12, var21) -> var3.put(var21, var12));
        mplew.writeInt(var3.size());
        Iterator<Entry<Integer, Integer>> var5 = var3.entrySet().iterator();

        for (Iterator<Entry<Integer, Integer>> var10000 = var5; var10000.hasNext(); var10000 = var5) {
            Entry<Integer, Integer> var6;
            Entry<Integer, Integer> var10001 = var6 = var5.next();
            mplew.write(1);
            mplew.writeInt(var10001.getValue());
            mplew.writeInt(var6.getKey());
            mplew.writeInt(var2[var6.getKey()]);
        }
    }

    public static byte[] SpecialChairTWInviteResult(int var0, int var1, int var2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_SpecialChairTWInviteResult);
        mplew.writeInt(var0);
        mplew.writeInt(var1);
        mplew.writeInt(var2);
        return mplew.getPacket();
    }

    public static byte[] PortableChairUseResult(int var0, int var1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_PortableChairUseResult);
        mplew.writeInt(var0);
        if (var0 == 3) {
            mplew.writeInt(var1);
        }
        return mplew.getPacket();
    }

    public static byte[] SpecialChairTWInvite(int var0) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_SpecialChairTWInvite);
        mplew.writeInt(var0);
        return mplew.getPacket();
    }

    public static byte[] SpecialChairTWAction(int var0) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_SpecialChairTWAction);
        mplew.writeInt(var0);
        return mplew.getPacket();
    }

    public static byte[] getChangeMixColBeautyFailed(int cardItemID) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CHANGE_MIX_COLOR_BEAUTY_RESULT);

        mplew.writeInt(cardItemID);
        mplew.write(false);

        return mplew.getPacket();
    }

    public static byte[] getChangeMixColBeautyResult(int cardItemID, int nSecond, List<Pair<Integer, Integer>> beautys) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CHANGE_MIX_COLOR_BEAUTY_RESULT);

        mplew.writeInt(cardItemID);
        mplew.write(true);

        mplew.write(0);
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(beautys.size());
        int nValue;
        for (Pair<Integer, Integer> pair : beautys) {
            getChangeMixColBeautyData(mplew, Collections.singletonList(pair));
            mplew.write(nSecond); // 0 - 正常, 1 - 天使變身/神之子阿爾法, 2 - 神之子培塔
            nValue = 0;
            mplew.write(nValue);
            if (nValue > 0) {
                mplew.write(-1);
                mplew.write(-1);
                mplew.write(0);
            }
            mplew.write(-1);
            mplew.write(-1);
            mplew.write(0);
        }
        nValue = 0;
        mplew.writeInt(nValue);
        for (int i = 0; i < nValue; i++) {
            getChangeMixColBeautyData(mplew, Collections.emptyList());
            mplew.writeLong(0);
        }

        return mplew.getPacket();
    }

    public static void getChangeMixColBeautyData(MaplePacketLittleEndianWriter mplew, List<Pair<Integer, Integer>> beautys) {
        mplew.writeInt(beautys.size());
        for (Pair<Integer, Integer> pair : beautys) {
            mplew.write(ItemConstants.類型.臉型(pair.getLeft()) ? 2 : 3);
            mplew.writeInt(pair.getLeft());
            mplew.writeInt(pair.getRight());
        }
    }

    public static byte[] getChangeBeautyFailed(int cardItemID) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CHANGE_BEAUTY_RESULT);

        mplew.writeInt(cardItemID);
        mplew.write(false);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] getChangeBeautyResult(int cardItemID, boolean isSecond, List<Pair<Integer, Integer>> beautys) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CHANGE_BEAUTY_RESULT);

        mplew.writeInt(cardItemID);
        mplew.write(true);

        mplew.write(beautys.size() > 1);
        mplew.write(0);
        mplew.writeInt(beautys.size());
        boolean isZeroAlpha = beautys.size() > 1;
        for (Pair<Integer, Integer> pair : beautys) {
            mplew.write(2);
            mplew.write(isZeroAlpha ? 2 : isSecond ? 1 : 0);
            if (isZeroAlpha) {
                isZeroAlpha = false;
            }
            mplew.writeInt(pair.getLeft());
            mplew.writeInt(pair.getRight());
            if (false) {
                mplew.write(0);
                mplew.write(0);
                mplew.write(0);
                mplew.write(0);
                mplew.write(0);
                mplew.write(0);
                mplew.write(0);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] getChangeAndroidBeautyFailed(int cardItemID) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CHANGE_ANDROID_BEAUTY_RESULT);

        mplew.writeInt(cardItemID);
        mplew.write(false);

        return mplew.getPacket();
    }

    public static byte[] getChangeAndroidBeautyResult(int cardItemID, long androidSN, Pair<Integer, Integer> beautys) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.CHANGE_ANDROID_BEAUTY_RESULT);

        mplew.writeInt(cardItemID);
        mplew.write(true);
        mplew.writeLong(androidSN);

        mplew.write(1);
        mplew.write(100);
        mplew.writeInt(beautys.getLeft());
        mplew.writeInt(beautys.getRight());
        if (false) {
            mplew.write(0);
            mplew.write(0);
            mplew.write(0);
            mplew.write(0);
            mplew.write(0);
            mplew.write(0);
            mplew.write(0);
        }

        return mplew.getPacket();
    }

    public static byte[] getBeautyListFailed(int cardItemID) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.BEAUTY_LIST);

        mplew.write(false);
        mplew.writeInt(cardItemID);

        return mplew.getPacket();
    }

    public static byte[] getBeautyList(int slot, int cardItemID, boolean isAngel, boolean isBeta, List<Integer> beautyList) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.BEAUTY_LIST);

        mplew.write(true);
        mplew.writeInt(1);

        mplew.writeInt(slot);
        mplew.writeInt(cardItemID);
        mplew.write(isAngel);
        mplew.write(isBeta);
        mplew.write(beautyList.size());
        for (int beautyID : beautyList) {
            mplew.writeInt(beautyID);
        }

        return mplew.getPacket();
    }

    public static byte[] getBeautyListZero(int slot, int cardItemID, List<Integer> beautyList, List<Integer> beautyList2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.BEAUTY_LIST);

        mplew.write(true);
        mplew.writeInt(2);

        mplew.writeInt(slot);
        mplew.writeInt(cardItemID);
        mplew.write(beautyList.size());
        for (int beautyID : beautyList) {
            mplew.writeInt(beautyID);
        }
        mplew.write(beautyList2.size());
        for (int beautyID : beautyList2) {
            mplew.writeInt(beautyID);
        }

        return mplew.getPacket();
    }

    public static byte[] getBeautyListAndroid(int cardItemID, long androidSN, List<Integer> beautyList) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.BEAUTY_LIST);

        mplew.write(true);
        mplew.writeInt(3);

        mplew.writeInt(cardItemID);
        mplew.writeLong(androidSN);
        mplew.write(beautyList.size());
        for (int beautyID : beautyList) {
            mplew.writeInt(beautyID);
        }

        return mplew.getPacket();
    }

    public static void encodeMagicHead(MaplePacketLittleEndianWriter mplew) {
        mplew.writeShort(SendPacketOpcode.SetMagicData.getValue());
        mplew.writeInt(-1289454273);
    }

    public static byte[] encodeMagicDataItem(Integer b, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(0);

        int mask = 0;
        if (b != null) {
            mask |= 1;
        }
        if (item != null) {
            mask |= 2;
        }
        mask &= 3;
        mplew.write(mask);
        if ((mask & 1) != 0) {
            mplew.writeInt(b);
        }
        if (((mask >> 1) & 1) != 0) {
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData1(Long b, Integer b1, Item item) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(1);

        int mask = 0;
        if (b != null) {
            mask |= 1;
        }
        if (b1 != null) {
            mask |= 2;
        }
        mask &= 7;
        mplew.write(mask);
        if ((mask & 1) != 0) {
            mplew.writeLong(b);
        }
        if (((mask >> 1) & 1) != 0) {
            mplew.writeInt(b1);
        }
        if (((mask >> 2) & 1) != 0) {
            for (int i = 0; i < 0; i++) {
                mplew.writeInt(0);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData2(Byte b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(2);

        int mask = 0;
        if (b != null) {
            mask |= 1;
        }
        mask &= 1;
        mplew.write(mask);
        if ((mask & 1) != 0) {
            mplew.write(b);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData3(Byte b, Byte b1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(3);

        int mask = 0;
        if (b != null) {
            mask |= 1;
        }
        if (b1 != null) {
            mask |= 2;
        }
        mask &= 3;
        mplew.write(mask);
        if ((mask & 1) != 0) {
            mplew.write(b);
        }
        if (((mask >> 1) & 1) != 0) {
            mplew.write(b1);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData4(int b, long b1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(4);

        mplew.writeInt(b);
        mplew.writeLong(b1);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData5() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(5);
        /*
         * 小屋內容?
         * */

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData6(int b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(6);

        mplew.writeInt(b);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData7(long b, int b1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(7);

        mplew.writeLong(b);
        //?
        mplew.writeInt(b1);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData8(long b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(8);

        mplew.writeLong(b);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData9(int b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(9);

        mplew.writeMapleAsciiString("");
        mplew.writeInt(b);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData_TMS237_10() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(10);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData10(int b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(11);

        mplew.writeInt(b);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData11(int b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(12);

        mplew.writeInt(b);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData12(short b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(13);

        mplew.writeShort(b);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData13(short b, Short b1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(14);

        mplew.writeShort(b);
        mplew.write(b1 != null);
        if (b1 != null) {
            mplew.writeShort(b1);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeSetItemNextTime(long sn, long nextTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(15);

        mplew.writeLong(sn);
        mplew.writeLong(PacketHelper.getTime(nextTime));

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData_TMS238_16() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(16);

        return mplew.getPacket();
    }

    public static byte[] encodeMoxuanPower(int valueType, int value, int time, int b3, Pair<Short, Integer> b4) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(17);

        mplew.writeInt(valueType);
        mplew.writeInt(value);
        mplew.writeInt(time);
        mplew.writeInt(b3);
        mplew.write(b4 != null);
        if (b4 != null) {
            mplew.writeShort(b4.left);
            mplew.writeInt(b4.right);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeEnableActions() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(18);

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData17(int skillId, Pair<Short, Integer> b1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(19);

        mplew.writeInt(skillId);
        mplew.write(b1 != null);
        if (b1 != null) {
            mplew.writeShort(b1.left);
            mplew.writeInt(b1.right);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeMagicData19(short a1) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        encodeMagicHead(mplew);
        mplew.writeShort(20);

        mplew.writeShort(a1);

        return mplew.getPacket();
    }

    public static byte[] encodeCombingRoomActionRes(int a1, int a2, int a3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomActionRes.getValue());
        mplew.write(a1);
        mplew.write(a2);
        mplew.writeInt(a3);

        return mplew.getPacket();
    }

    public static void encodeCombingRoomChangedHeard(MaplePacketLittleEndianWriter mplew, int styleType, int action, int res) {
        mplew.write(styleType);
        mplew.write(action);
        mplew.write(res);
    }

    public static byte[] encodeCombingRoomRes(int styleType, int action, int res) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomChangedRes.getValue());
        encodeCombingRoomChangedHeard(mplew, styleType, action, res);

        return mplew.getPacket();
    }

    public static byte[] encodeUpdateCombingRoomSlotCount(int styleType, int action, int slot, int slot2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomChangedRes.getValue());
        encodeCombingRoomChangedHeard(mplew, styleType, action, 1);

        mplew.write(slot);
        mplew.write(slot2);

        return mplew.getPacket();
    }

    public static byte[] encodeUpdateCombingRoomSlotRes(int styleType, int action, int position, Pair<Integer, Integer> style) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomChangedRes.getValue());
        encodeCombingRoomChangedHeard(mplew, styleType, action, 2);

        if (action != 6) {
            mplew.write(position);
            PacketHelper.encodeCombingRoomSlot(mplew, style);
            mplew.write(0);
        }

        return mplew.getPacket();
    }

    public static byte[] encodeCombingRoomSlotUnknownRes(int styleType, int action, int position, int b1, int b2, int b3, Pair<Integer, Integer> style) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomChangedRes.getValue());
        encodeCombingRoomChangedHeard(mplew, styleType, action, 3);

        mplew.write(b1);
        mplew.write(b2);
        mplew.write(b3);
        PacketHelper.encodeCombingRoomSlot(mplew, style);

        return mplew.getPacket();
    }

    public static byte[] encodeCombingRoomOldSlotCount(int styleType, int action, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomChangedRes.getValue());
        encodeCombingRoomChangedHeard(mplew, styleType, action, 5);

        mplew.writeInt(slot);

        return mplew.getPacket();
    }

    public static byte[] encodeUpdateCombingRoomInventoryRes(int styleType, int action, Map<Integer, List<Pair<Integer, Integer>>> combingRoomInventorys) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CombingRoomChangedRes.getValue());
        encodeCombingRoomChangedHeard(mplew, styleType, action, 6);

        if (styleType <= 2) {
            PacketHelper.encodeCombingRoomInventory(mplew, combingRoomInventorys.getOrDefault(3 - styleType, new LinkedList<>()));
        } else if (styleType == 3) {
            for (int i = 3; i > 0; i--) {
                PacketHelper.encodeCombingRoomInventory(mplew, combingRoomInventorys.getOrDefault(i, new LinkedList<>()));
            }
        }

        return mplew.getPacket();
    }

    public static byte[] createJupiterThunder(int chrid, Point pos, int a1, int a2, int skillID, int bulletCount, int a3, int a4, int a5) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CreateJupiterThunder.getValue());

        mplew.writeInt(chrid);
        int nCount = 1;
        mplew.writeInt(nCount);
        for (int i = 0; i < nCount; i++) {
            boolean b = true;
            mplew.write(b);
            if (b) {
                mplew.writeInt(i + 1);
                mplew.writeInt(1);
                mplew.writeInt(chrid);
                mplew.writePosInt(pos);
                mplew.writeInt(a1);
                mplew.writeInt(a2);
                mplew.writeInt(skillID);
                mplew.writeInt(bulletCount);
                mplew.writeInt(330);
                mplew.writeInt(40000);
                mplew.writeInt(a3);
                mplew.writeInt(a4);
                mplew.writeInt(a5);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] jupiterThunderEnd(int chrid, int a1, int a2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.JupiterThunderEnd.getValue());

        mplew.writeInt(chrid);
        mplew.writeInt(a1);
        mplew.writeInt(a2);

        return mplew.getPacket();
    }

    public static byte[] jupiterThunderAction(int chrid, int a1, int a2, int a3, int a4, int a5, int a6, int a7) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.JupiterThunderAction.getValue());

        mplew.writeInt(chrid);
        mplew.writeInt(a1);
        mplew.writeInt(a2);
        mplew.writeInt(a3);
        if (a1 == 1) {
            mplew.writeInt(a4);
            mplew.writeInt(a5);
            mplew.writeInt(a6);
            mplew.writeInt(a7);
        }

        return mplew.getPacket();
    }

    public static byte[] InhumanSpeedAttackeRequest(int chrid, byte a1, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.InhumanSpeedAttackeRequest.getValue());

        mplew.writeInt(chrid);
        mplew.write(a1);
        mplew.writeInt(duration);

        return mplew.getPacket();
    }

    public static byte[] onDeadDebuffSet(int type, DeadDebuff deadDebuff) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.DeadDebuffSet);

        mplew.writeShort(type);
        if (type != 2) {
            mplew.writeInt(deadDebuff.Total);
            mplew.writeInt(deadDebuff.getRemain());
            mplew.writeInt(deadDebuff.DecExpR);
            mplew.writeInt(deadDebuff.DecDropR);
        }

        return mplew.getPacket();
    }

    public static byte[] sendDeadCurseMsg(String msg, boolean isRelieve) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.DeadCurseMsg);

        mplew.writeMapleAsciiString(msg);
        mplew.writeInt(338);
        mplew.writeInt(10000);
        mplew.write(isRelieve);
        mplew.writeInt(180);

        return mplew.getPacket();
    }
}
