package handling.channel.handler;

import client.*;
import client.skills.SkillFactory;
import client.stat.DeadDebuff;
import configs.ServerConfig;
import constants.GameConstants;
import constants.JobConstants;
import constants.ServerConstants;
import constants.SkillConstants;
import constants.enums.UserChatMessageType;
import constants.skills.*;
import handling.ServerType;
import handling.auction.AuctionHandler;
import handling.auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.cashshop.handler.CashShopOperation;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.opcode.SendPacketOpcode;
import handling.world.*;
import handling.world.guild.MapleGuild;
import handling.world.messenger.MapleMessenger;
import handling.world.messenger.MapleMessengerCharacter;
import handling.world.party.MapleExpedition;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.MaplePacketCreator;
import scripting.npc.NPCScriptManager;
import server.ShutdownServer;
import server.buffs.MapleStatEffect;
import server.maps.FieldLimitType;
import server.quest.MapleQuest;
import server.shops.HiredMerchant;
import tools.*;
import tools.types.*;
import packet.*;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.io.IOException;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class InterServerHandler {

    private static final Logger log = LogManager.getLogger(InterServerHandler.class);

    public static void enterCS(MapleClient c, MapleCharacter chr) {
        if (!chr.isAlive() || chr.isInJailMap() || chr.isBanned() || MapleAntiMacro.isAntiNow(chr.getName()) || chr.checkEvent()) {
            String msg = "無法進入商城，請稍後再試。";
            if (!chr.isAlive()) {
                msg = "現在不能進入商城.";
            } else if (chr.isInJailMap()) {
                msg = "在這個地方無法使用此功能.";
            } else if (MapleAntiMacro.isAntiNow(chr.getName())) {
                msg = "被使用測謊機時無法操作。";
            }
            c.getPlayer().dropMessage(1, msg);
            c.sendEnableActions();
            return;
        }
        boolean isCheckTime = false;
        if (isCheckTime && !chr.isAdmin()) {
            //檢測角色是否正常登錄 3 分鐘時間 3 * 60 * 1000
            long time = chr.getCheatTracker().getLastlogonTime();
            if (time + (3 * 60 * 1000) > System.currentTimeMillis()) {
                int seconds = (int) (((time + (3 * 60 * 1000)) - System.currentTimeMillis()) / 1000);
                chr.dropMessage(1, "暫時無法進入商城.\r\n請在 " + seconds + " 秒後在進行操作.");
                chr.dropMessage(5, "暫時無法進入商城.請在 " + seconds + " 秒後在進行操作.");
                c.sendEnableActions();
                return;
            }
        }
        ChannelServer ch = ChannelServer.getInstance(c.getChannel());
        chr.changeRemoval();
        if (chr.getMessenger() != null) {
            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(chr);
            WorldMessengerService.getInstance().leaveMessenger(chr.getMessenger().getId(), messengerplayer);
        }
        chr.updataEnterShop(true);
        chr.updateTodayDate();
        PlayerBuffStorage.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(chr.getId(), chr.getCooldowns());
        World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), -10);
        ch.removePlayer(chr);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
//        chr.saveToCache();
        chr.saveToDB(false, false);
        chr.getMap().userLeaveField(chr);
        c.announce(MaplePacketCreator.getChannelChange(c, CashShopServer.getPort()));
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static void EnterAuction(MapleClient c, MapleCharacter player) {
        AuctionServer as = AuctionServer.getInstance();
        if (player.hasBlockedInventory() || c.getChannelServer() == null || as == null) {
            c.announce(MaplePacketCreator.serverBlocked(2));
            return;
        }
        if (!player.isAlive() || player.isInJailMap() || player.isBanned() || MapleAntiMacro.isAntiNow(player.getName()) || player.checkEvent()) {
            String msg = "無法進入拍賣場，請稍後再試。";
            if (!player.isAlive()) {
                msg = "現在不能進入拍賣場.";
            } else if (player.isInJailMap()) {
                msg = "在這個地方無法使用此功能.";
            } else if (MapleAntiMacro.isAntiNow(player.getName())) {
                msg = "被使用測謊機時無法操作。";
            }
            c.getPlayer().dropMessage(1, msg);
            c.sendEnableActions();
            return;
        }
        player.changeRemoval();
        as.getPlayerStorage().registerPendingPlayer(new CharacterTransfer(player), player.getId());
        player.initialSpawnPoint();
        player.fixOnlineTime();
        player.updateOneQuestInfo(27040, "0", DateUtil.getFormatDate(new Date(), "yyMMddHHmmss"));
        c.updateLoginState(5);
        PlayerBuffStorage.addBuffsToStorage(player.getId(), player.getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(player.getId(), player.getCooldowns());
        World.ChannelChange_Data(new CharacterTransfer(player), player.getId(), -10);
        c.getChannelServer().removePlayer(player);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
//        chr.saveToCache();
        player.saveToDB(false, false);
        player.getMap().userLeaveField(player);
        c.announce(MaplePacketCreator.getChannelChange(c, AuctionServer.getInstance().getPort()));
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static void Loggedin(MaplePacketReader slea, MapleClient c, ServerType type) {
        if (ShutdownServer.getInstance().isShutdown()) {
            c.getSession().close();
            return;
        }
        slea.readInt();
        int playerid = slea.readInt();
        byte[] code = slea.read(16);
        CharacterTransfer transfer = null;
        try {
            transfer = CashShopServer.getPlayerStorage().getPendingCharacter(playerid);
        } catch (IOException e) {
            log.error("讀取臨時角色失敗", e);
        }

        if (ServerConstants.MapleMajor > 198 && ServerConstants.MapleMajor < 215) {
            final byte[] desKey = new byte[16];
            byte[] bCharacterID = String.valueOf(playerid).getBytes();
            System.arraycopy(bCharacterID, 0, desKey, 0, Math.min(desKey.length, bCharacterID.length));
            if (bCharacterID.length < desKey.length) {
                System.arraycopy(code, 0, desKey, bCharacterID.length, desKey.length - bCharacterID.length);
            }
            c.announce(c.getEncryptOpcodesData(desKey));
        }
        if (type.equals(ServerType.CashShopServer)) {
            if (transfer != null) {
                CashShopOperation.EnterCS(transfer, c);
            }
            return;
        }
        if (type.equals(ServerType.AuctionServer)) {
            try {
                transfer = AuctionServer.getInstance().getPlayerStorage().getPendingCharacter(playerid);
            } catch (IOException e) {
                log.error("讀取臨時角色失敗", e);
            }
            if (transfer != null) {
                AuctionHandler.EnterAuction(transfer, c);
            }
            return;
        }

        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            try {
                transfer = cserv.getPlayerStorage().getPendingCharacter(playerid);
            } catch (IOException e) {
                log.error("讀取臨時角色失敗", e);
            }
            if (transfer != null) {
                c.setChannel(cserv.getChannel());
                break;
            }
        }

        MapleCharacter player = null;
        int[] bytes = new int[6];
        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = code[i];
        }
        StringBuilder sps = new StringBuilder();
        for (int aByte : bytes) {
            sps.append(StringUtil.getLeftPaddedStr(Integer.toHexString(aByte).toUpperCase(), '0', 2));
            sps.append("-");
        }
        String macData = sps.toString();
        macData = macData.substring(0, macData.length() - 1);
        boolean firstLoggedIn = true; //設置只有第1次登錄的提示開關
        if (transfer == null) { // Player isn't in storage, probably isn't CC
            Quadruple<String, String, Integer, String> ip = LoginServer.getLoginAuth(playerid);
            String s = c.getSessionIPAddress();
            if (ip == null || (!s.substring(s.indexOf('/') + 1, s.length()).equals(ip.one) && !c.getMac().equals(macData))) {
                if (ip != null) {
                    LoginServer.putLoginAuth(playerid, ip.one, ip.two, ip.three, ip.four);
                } else {
                    c.getSession().close();
                    return;
                }
            }
            c.setTempIP(ip.two);
            c.setChannel(ip.three);
            try {
                player = MapleCharacter.loadCharFromDB(playerid, c, true);
                player.setLogintime(System.currentTimeMillis());
            } catch (Exception e) {
                c.dropMessage("加載角色數據出錯，角色ID:" + playerid + ", 請聯繫管理員解決問題。");
                log.error("加載角色數據出錯，角色ID:" + playerid, e);
            }
        } else {
            player = MapleCharacter.ReconstructChr(transfer, c, true);
            firstLoggedIn = false;
        }
        if (player == null) {
            c.dropMessage("加載角色出錯，角色為空");
            c.getSession().close();
            return;
        }
        long sessionId = slea.readLong();
        ChannelServer channelServer = c.getChannelServer();
        c.setPlayer(player);
        c.setSessionId(sessionId);
        if (sessionId != c.getSessionId()) {
            c.disconnect(true, false);
            return;
        }
        c.setAccID(player.getAccountID());
        if (!c.CheckIPAddress()) { // Remote hack
            String msg = "檢測連接地址不合法 服務端斷開這個連接 [角色ID: " + player.getId() + " 名字: " + player.getName() + " ]";
            c.getSession().close();
            log.info(msg);
            return;
        }
        if ((channelServer.getChannelType() == ChannelServer.ChannelType.MVP銅牌 && !player.isBronzeIMvp())
                || (channelServer.getChannelType() == ChannelServer.ChannelType.MVP銀牌 && !player.isSilverMvp())
                || (channelServer.getChannelType() == ChannelServer.ChannelType.MVP金牌 && !player.isGoldMvp())
                || (channelServer.getChannelType() == ChannelServer.ChannelType.MVP鑽石 && !player.isDiamondMvp())
                || (channelServer.getChannelType() == ChannelServer.ChannelType.MVP紅鑽 && !player.isRedMvp())) {
            player.dropMessage(1, "親愛滴玩家：" + player.getName() + " 您好\r\n第" + channelServer.getChannel() + "頻道為" + channelServer.getChannelType().name() + "頻道");
            if (!player.isIntern()) {
                c.getSession().close();
                return;
            }
        }
        if (!player.getMap().canEnterField(player.getId())) {
            player.dropMessage(1, "親愛滴玩家：地圖已經開啟防搶圖模式，現在無法進入。");
            if (!player.isIntern()) {
                c.getSession().close();
                return;
            }
        }
        int state = c.getLoginState();
        boolean allowLogin = false;
        String allowLoginTip = null;
        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL || state == MapleClient.LOGIN_NOTLOGGEDIN) {
            List<String> charNames = c.loadCharacterNames(c.getWorld());
            allowLogin = !World.isCharacterListConnected(charNames);
            if (!allowLogin) {
                allowLoginTip = World.getAllowLoginTip(charNames);
            }
        }
        //返回為 True 角色才能進入遊戲
        if (!allowLogin) {
            String msg = "檢測賬號下已有角色登陸遊戲 服務端斷開這個連接 [角色ID: " + player.getId() + " 名字: " + player.getName() + " ]\r\n" + allowLoginTip;
            c.setPlayer(null);
            c.getSession().close();
            log.info(msg);
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());
        channelServer.addPlayer(player);

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.SET_TeachSkillCost);
        mplew.writeInt(ServerConfig.TeachCost.size());
        for (int b : ServerConfig.TeachCost) {
            mplew.writeInt(b);
        }
        c.announce(mplew.getPacket());

        c.announce(MaplePacketCreator.getWarpToMap(player, player.getMap(), null, 0, true, false));
        player.initOnlineTime();
        player.initDamageSkinList();
        c.announce(MaplePacketCreator.cancelTitleEffect(player)); //V.112.1新增 不發送角色自己會看到自己頂著5個稱號勳章
        player.giveCoolDowns(PlayerBuffStorage.getCooldownsFromStorage(player.getId()));
        player.silentGiveBuffs(PlayerBuffStorage.getBuffsFromStorage(player.getId()));

        // 修復凌晨重置任務
        if (player.getQuestStatus(7707) == 1) {
            MapleQuest.getInstance(7707).reset(player);
        }

        //修復萌天使變身無限時間!!
        if (JobConstants.is天使破壞者(player.getJob())) {
            MapleQuestStatus marr1 = player.getQuestNAdd(MapleQuest.getInstance(29015));
            if (marr1 != null) {
                if (marr1.getStatus() == 0) {
                    marr1.setStatus((byte) 1);
                }
            }
        }

        //神之子打開武器強化欄
        if (JobConstants.is神之子(player.getJob())) {
            MapleQuestStatus marr = player.getQuestNAdd(MapleQuest.getInstance(40905));
            if ((marr != null)) {
                if (marr.getStatus() == 0) {
                    marr.setStatus((byte) 2);
                }
            }
        }
//        c.announce(ChatPacket.getChatLoginResult(0));
        c.announce(MaplePacketCreator.changeHour(5, Calendar.getInstance().get(Calendar.HOUR_OF_DAY)));
        c.announce(MaplePacketCreator.sendloginSuccess()); //SetQuestClear
        //更新坐騎屬性狀態
//        c.announce(MaplePacketCreator.updateMount(player, false));
        //鍵盤設置
        c.announce(MaplePacketCreator.getKeymap(player));
        //發送MapleQuickSlot的信息
        c.announce(MaplePacketCreator.getQuickSlot(player.getQuickSlot()));
        //技能宏
        c.announce(MaplePacketCreator.getMacros(player.getSkillMacros()));
        //刷新楓點
        c.announce(MaplePacketCreator.showCharCash(player));
        //發送顯示角色樂豆點楓點的信息
        c.announce(MaplePacketCreator.showPlayerCash(player));
        if (!player.getTempStatsToRemove().isEmpty()) {
            c.announce(BuffPacket.temporaryStatReset(player.getTempStatsToRemove(), player));
            player.getTempStatsToRemove().clear();
        }
        for (int k = 1166; k < 1175; k++) {
            c.announce(MaplePacketCreator.setEventUIInfo(k));
        }
        //如果是GM就給角色隱身模式BUFF
        if (player.isIntern() && player.getBuffStatValueHolder(管理員.終極隱藏) == null) {
            SkillFactory.getSkill(管理員.終極隱藏).getEffect(1).applyTo(player);
        }
        if (player.isGm()) {
            player.setInvincible(true);
        }
        if (JobConstants.is爆拳槍神(player.getJob())) {
            MapleStatEffect effect = player.getSkillEffect(爆拳槍神.彈丸填裝);
            if (effect != null) {
                player.handleAmmoClip(8);
                effect.applyTo(player);
            }
        }
        if (JobConstants.is卡蒂娜(player.getJob())) {
            MapleStatEffect effect = player.getSkillEffect(卡蒂娜.武器變換終章);
            if (effect != null) {
                effect.applyTo(player);
            }
        }

        // 加載斷線保存的死亡DEBUFF
        DeadDebuff.getDebuff(player, firstLoggedIn ? 0 : 1);

        player.getMap().userEnterField(player);
        // 初始化萌獸訊息
        c.announce(SpecialPacket.initSpecialData(player.getId(), player.checkInnerStormValue()));
        c.announce(SpecialPacket.initFamiliarData(player));

        c.announce(MaplePacketCreator.onTownPortal(999999999, 999999999, 0, null));
        //設置玩家舉報為空
        c.announce(MaplePacketCreator.reportResponse((byte) 0, 0));
        //啟用舉報系統
        c.announce(MaplePacketCreator.enableReport());
        c.announce(MaplePacketCreator.temporaryStats_Reset());
        player.updateOneInfo(26535, "effect", "1");
        //發送戰地聯盟信息
        player.checkMapleUnion(true);
        //發送MVP禮包提示
        int mvpLevel = player.getMvpLevel();
        if (mvpLevel > 0) {
            mvpLevel = mvpLevel < 5 ? 4 : mvpLevel;
            String gp = player.getWorldShareInfo(6, "gp");
            int today = Integer.parseInt(DateUtil.getCurrentDate("dd"));
            String now = DateUtil.getCurrentDate("yyyyMM")
                    + (today > 20 ? "03" : today > 10 ? "02" : "01")
                    + StringUtil.getLeftPaddedStr(String.valueOf(mvpLevel), '0', 2);
            if (!now.equals(gp)) {
                c.announce(MaplePacketCreator.mvpPacketTips());
            }
        }
        //加載每日簽到數據
        c.announce(DailyGiftPacket.dailyGiftResult(0, 0, 0, 0));
        player.initAllInfo();
        try {
            // 開始發送好友你上線的信息
            int[] buddyIds = player.getBuddylist().getBuddyIds();
            WorldBuddyService.getInstance().loggedOn(player.getId(), c.getChannel(), buddyIds);
            // 開始處理組隊和遠征信息
            MapleParty party = player.getParty();
            if (party != null) {
                MaplePartyCharacter mchr = new MaplePartyCharacter(player);
                mchr.setOnline(true);
                WorldPartyService.getInstance().updateParty(party.getPartyId(), PartyOperation.LOG_ONOFF, mchr);
                if (party.getExpeditionId() > 0) {
                    MapleExpedition me = WorldPartyService.getInstance().getExped(party.getExpeditionId());
                    if (me != null) {
                        c.announce(PartyPacket.expeditionStatus(me, false));
                    }
                }
            }
            // 開始發送好友列表
            CharacterIdChannelPair[] onlineBuddies = WorldFindService.getInstance().multiBuddyFind(player.getId(), buddyIds);
            for (CharacterIdChannelPair onlineBuddy : onlineBuddies) {
                player.getBuddylist().get(onlineBuddy.getCharacterId()).setChannel(onlineBuddy.getChannel());
            }
            c.announce(BuddyListPacket.updateBuddylist(player.getBuddylist().getBuddies()));
            c.announce(BuddyListPacket.updateBuddylistEnd());
            // 開始發送玩家送到的一些未處理的消息
            MapleMessenger messenger = player.getMessenger();
            if (messenger != null) {
                WorldMessengerService.getInstance().silentJoinMessenger(messenger.getId(), new MapleMessengerCharacter(player));
                WorldMessengerService.getInstance().updateMessenger(messenger.getId(), player.getName(), c.getChannel());
            }
            c.announce(GuildPacket.showGuildInfo(player));
            c.announce(GuildPacket.guildAuthkeyUpdate());
            // 開始發送公會和公會聯盟信息
            if (player.getGuildId() > 0) {
                WorldGuildService.getInstance().setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                MapleGuild gs = WorldGuildService.getInstance().getGuild(player.getGuildId());
                if (gs != null) {
                    List<byte[]> packetList = WorldAllianceService.getInstance().getAllianceInfo(gs.getAllianceId(), true);
                    if (packetList != null) {
                        for (byte[] pack : packetList) {
                            if (pack != null) {
                                c.announce(pack);
                            }
                        }
                    }
                } else { // 沒有公會和聯盟就設置為默認
                    player.setGuildId(0);
                    player.setGuildRank((byte) 5);
                    player.setAllianceRank((byte) 5);
                    player.saveGuildStatus();
                }
            }
        } catch (Exception e) {
            log.error("加載好友、公會錯誤", e);
        }
        //寵物自動加血和藍
        player.updatePetAuto();
        //顯示小字條消息
        player.showNote();
        //道具寶寶的信息
        player.sendImp();
        //檢測靈魂武器
        if (player.checkSoulWeapon()) {
            c.announce(BuffPacket.giveBuff(player, player.getSkillEffect(player.getSoulSkillID()), Collections.singletonMap(MapleBuffStat.SoulMP, player.getSoulSkillID())));
        }
        //更新組隊HP
        player.updatePartyMemberHP();
        //修復3轉以上角色技能 如果沒有就修復
        player.baseSkills();
        //檢測物品時間
        player.expirationTask(false);
        //顯示夜光的光暗能量點數
        if (JobConstants.is夜光(player.getJob())) {
            c.announce(BuffPacket.updateLuminousGauge(5000, (byte) 3));
        }
        World.clearChannelChangeDataByAccountId(player.getAccountID());
        //對檢測是否能進入商城的時間進行重置
        player.getCheatTracker().getLastlogonTime();
        //發送登錄提示 只有第1次才有
        if (firstLoggedIn) {
            // 活躍度提示
//                MapleActivity.loginTip(c);

            //檢測玩家僱傭商店狀態
            HiredMerchant merchant = World.getMerchant(player.getAccountID(), player.getId());
            final byte stateHiredMerchant = MapleCharacter.checkExistance(player.getAccountID(), player.getId());
            if (stateHiredMerchant == 1 && merchant == null) {
                player.dropMessage(1, "請通過弗蘭德裡取回保管的物品");
            }
            if (c.getChannelServer().getDoubleExp() == 2) {
                player.dropSpouseMessage(UserChatMessageType.青, "[系統提示]當前伺服器處於雙倍經驗活動中，祝您玩的愉快！");
            }

            if (player.getJob() == 6001 && player.getLevel() < 10) {
                while (player.getLevel() < 10) {
                    player.gainExp(5000, true, false, true);
                }
            }
            //每日登陸處理
            NPCScriptManager ni = NPCScriptManager.getInstance();
            if (ni.getCM(c) == null) {
                ni.start(c, 9900003, "PlayerLogin");
            }
        }
        //發送這個封包可以解除角色屬性異常
        c.announce(InventoryPacket.getInventoryStatus());
        // 名流爆擊
//        player.AutoCelebrityCrit();
        // 狂豹獵人
        if (JobConstants.is狂豹獵人(player.getJob())) { //狂豹獵人
            c.announce(MaplePacketCreator.updateJaguar(c.getPlayer()));
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 1; i <= 9; i++) {
                stringBuilder.append(i).append("=1");
                if (i != 9) {
                    stringBuilder.append(";");
                }
            }
            c.announce(MaplePacketCreator.updateInfoQuest(GameConstants.美洲豹管理, stringBuilder.toString()));
        }
        // 劍豪
        if (JobConstants.is劍豪(c.getPlayer().getJob())) {
            SkillFactory.getSkill(劍豪.一般姿勢效果).getEffect(1).applyTo(c.getPlayer());
        }
        c.getPlayer().initChronosphere();
        // 解決進入商城卡在線時間的問題.
        player.fixOnlineTime();
        player.updateWorldShareInfo(6, "enter", DateUtil.getFormatDate(new Date(), "yyyyMM"));
        player.getStat().recalcLocalStats(player);

        // 發送道具冷卻時間
        String keyValue = player.getKeyValue("MapTransferItemNextTime");
        String newKeyValue = "";
        if (keyValue != null) {
            final String[] split = keyValue.split(",");
            for (String nextTime : split) {
                if (nextTime == null || !nextTime.contains("=")) {
                    continue;
                }
                final String[] split_2 = nextTime.split("=");
                if (split_2.length < 2) {
                    continue;
                }
                long nt = Long.parseLong(split_2[1]);
                if (System.currentTimeMillis() >= nt) {
                    continue;
                }
                player.send(MaplePacketCreator.encodeSetItemNextTime(Long.parseLong(split_2[0]), nt));
                newKeyValue += nt + ",";
            }
            if (newKeyValue.isEmpty()) {
                player.setKeyValue("MapTransferItemNextTime", null);
            } else {
                player.setKeyValue("MapTransferItemNextTime", newKeyValue.substring(0, newKeyValue.length() - 1));
            }
        }

        // 地圖顯示萬聖節裝飾
        if (ServerConfig.HALLOWEEN_SKIN) {
            c.announce(MaplePacketCreator.updateInfoQuest(100034, "object=1"));
        }
        // 地圖顯示聖誕節裝飾
        if (ServerConfig.CHRISTMAS_SKIN) {
            c.announce(MaplePacketCreator.updateInfoQuest(100148, "object=1"));
        }

        // 進入的頻道類型提示
        if (channelServer.getChannelType() != ChannelServer.ChannelType.普通) {
            c.announce(EffectPacket.showCombustionMessage("#fnMingLiU##fs20#您已進入#e#r★" + channelServer.getChannelType().name() + "頻道★#n#k" + (channelServer.getChannelType() == ChannelServer.ChannelType.混沌 ? "" : "\r\n土地中的陰氣會增強 出現的怪物會增多") + "\r\n部分怪物得到強化並且獎勵增加!!", 20000, -120));
        }
        player.updateReward();

        // 睿智葫蘆
        if (player.getQuestStatus(500606) == 1) {
            if (player.haveItem(2630017)) {
                if (player.getName().equals(player.getWorldShareInfo(500605, "mainName"))) {
                    player.send(UIPacket.ShowSpecialUI(true, "UIExpBottle"));
                }
            } else {
                player.updateWorldShareInfo(500605, null);
                player.updateWorldShareInfo(500606, null);
                MapleQuest.getInstance(500606).reset(player);
            }
        }

        // 加載斷線保存的BUFF
        World.TemporaryStat.LoadData(player);

        // 檢測極限屬性點數是否異常
        if (SkillConstants.getHyperAP(player) < 0) {
            StatsHandling.ResetHyperAP(c, player, true);
        }
    }

    public static void ChangeChannel(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.isInBlockedMap() || FieldLimitType.MIGRATELIMIT.check(chr.getMap().getFieldLimit())) {
            c.sendEnableActions();
            return;
        }
        if (chr.isBanned()) {
            c.sendEnableActions();
            return;
        }
        if (MapleAntiMacro.isAntiNow(chr.getName())) {
            chr.dropMessage(5, "被使用測謊機時無法操作。");
            c.sendEnableActions();
            return;
        }
        int chc = slea.readByte() + 1;
        ChannelServer toch = ChannelServer.getInstance(chc);
        if (!World.isChannelAvailable(chc) || toch == null) {
            chr.dropMessage(1, "該頻道玩家已滿，請切換到其它頻道進行遊戲。");
            c.sendEnableActions();
            return;
        }
        if ((toch.getChannelType() == ChannelServer.ChannelType.MVP銅牌 && !chr.isBronzeIMvp())
                || (toch.getChannelType() == ChannelServer.ChannelType.MVP銀牌 && !chr.isSilverMvp())
                || (toch.getChannelType() == ChannelServer.ChannelType.MVP金牌 && !chr.isGoldMvp())
                || (toch.getChannelType() == ChannelServer.ChannelType.MVP鑽石 && !chr.isDiamondMvp())
                || (toch.getChannelType() == ChannelServer.ChannelType.MVP紅鑽 && !chr.isRedMvp())) {
            chr.dropMessage(1, "親愛滴玩家：" + chr.getName() + " 您好\r\n第" + toch.getChannel() + "頻道為" + toch.getChannelType().name() + "頻道");
            if (!chr.isIntern()) {
                c.sendEnableActions();
                return;
            }
        }
        if (!toch.getMapFactory().getMap(chr.getMapId()).canEnterField(chr.getId())) {
            chr.dropMessage(1, "親愛滴玩家：地圖已經開啟防搶圖模式，現在無法進入。");
            if (!chr.isIntern()) {
                c.sendEnableActions();
                return;
            }
        }
        chr.changeChannel(chc);
    }

    public static void ChangePlayer(MaplePacketReader slea, MapleClient c) {
//        final String account = slea.readMapleAsciiString();
        if (c.getAccountName() == null) {
            c.disconnect(true, false);
            return;
        }
        char[] ss = new char[256];

        for (int i = 0; i < ss.length; ++i) {
            int f = (int) (Math.random() * 3.0D);
            if (f == 0) {
                ss[i] = (char) ((int) (65.0D + Math.random() * 26.0D));
            } else if (f == 1) {
                ss[i] = (char) ((int) (97.0D + Math.random() * 26.0D));
            } else {
                ss[i] = (char) ((int) (48.0D + Math.random() * 10.0D));
            }
        }
        String key = new String(ss);
        LoginServer.pubLoginAuthKey(key, c.getAccountName(), c.getChannel());
        c.announce(LoginPacket.changePlayerKey(key));
    }

    public static void ExitAuction(MapleClient c, MapleCharacter player) {
        AuctionServer as = AuctionServer.getInstance();
        int channel = c.getChannel(); //角色要更換的頻道
        ChannelServer toch = ChannelServer.getInstance(channel); //角色從商城出來更換的頻道信息
        if (toch == null) {
            c.getSession().close();
            return;
        }
        //開始處理
        World.ChannelChange_Data(new CharacterTransfer(player), player.getId(), c.getChannel());
        as.getPlayerStorage().deregisterPlayer(player);
        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION, c.getSessionIPAddress());
        c.announce(MaplePacketCreator.getChannelChange(c, toch.getPort())); //發送更換頻道的封包信息
        player.fixOnlineTime();
        c.disconnect(false, true);
        c.setPlayer(null);
        c.setReceiving(false);
        return;
    }
}
