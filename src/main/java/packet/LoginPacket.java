package packet;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleEnumClass;
import client.MaplePartTimeJob;
import configs.ServerConfig;
import constants.JobConstants;
import constants.ServerConstants;
import database.dao.AccountDao;
import handling.ServerType;
import handling.login.LoginServer;
import handling.login.handler.MapleBalloon;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.*;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class LoginPacket {

    /**
     * Logger for this class.
     */
    private static final Logger log = LogManager.getLogger(LoginPacket.class);

    /**
     * 發送一個hello packet
     *
     * @參數 mapleversion 客戶端版本
     * @參數 sendiv 發送
     * @參數 recviv 接收
     * @參數 testServer
     * @完畢
     */
    public static byte[] getHello(short mapleVersion, byte[] sendIv, byte[] recvIv, ServerType type) {
        MaplePacketLittleEndianWriter mplewHello = new MaplePacketLittleEndianWriter();

        byte mapleRegion = ServerConstants.MapleRegion;
        if (ServerConstants.TestServer) {
            switch (mapleRegion) {
                case 1:
                case 5:
                    mapleRegion += 1;
                    break;
                default:
                    mapleVersion = Short.parseShort("1" + String.valueOf(mapleVersion));
                    break;
            }
        }

        mplewHello.writeShort(mapleVersion + (type == ServerType.ChatServer ? 159 : 0));
        mplewHello.writeMapleAsciiString(ServerConfig.MapleMinor + (type == ServerType.LoginServer ? ":0" : ""));
        mplewHello.write(recvIv);
        mplewHello.write(sendIv);
        mplewHello.write(mapleRegion);
        if (type != ServerType.LoginServer) {
            mplewHello.write(1);
        } else {
            int loginSrvMapleMinor = Integer.parseInt(String.valueOf(mapleVersion) + StringUtil.getLeftPaddedStr(ServerConfig.MapleMinor, '0', 2));
            mplewHello.write(0);
            mplewHello.writeShort(mapleVersion);
            mplewHello.writeShort(mapleVersion);
            mplewHello.writeShort(0);
            mplewHello.write(recvIv);
            mplewHello.write(sendIv);
            mplewHello.write(mapleRegion);
            mplewHello.writeInt(loginSrvMapleMinor);
            mplewHello.writeInt(loginSrvMapleMinor);
            mplewHello.writeInt(0);
            mplewHello.writeShort(1);
        }

        byte[] helloPacket = mplewHello.getPacket();
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(helloPacket.length);
        mplew.write(helloPacket);

        return mplew.getPacket();
    }

    /**
     * 發送ping 包.
     *
     * @return 數據包
     */
    public static byte[] getPing() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(2);

        mplew.writeShort(SendPacketOpcode.LP_AliveReq.getValue());

        return mplew.getPacket();
    }

    public static byte[] addConnection() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CREATING_CONNECTION.getValue());
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 發送同意許可協議的封包
     * @返回 同意的封包
     */
    public static byte[] licenseResult() {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LICENSE_RESULT.getValue());
        mplew.write(0);

        return mplew.getPacket();
    }

    /*
     * 發送選擇性別的封包
     * @返回 封包
     */
    public static byte[] genderNeeded() {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.CHOOSE_GENDER.getValue());
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 發送選擇性別成功封包
     * @返回 封包
     */
    public static byte[] genderChanged(boolean success) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        mplew.writeShort(SendPacketOpcode.GENDER_SET.getValue());
        mplew.write(success);

        return mplew.getPacket();
    }

    /**
     * 發送一個登錄失敗的數據包。
     *
     * @param reason 登陸結果
     * @return 登陸反饋數據包
     * @參數 reason 測井在失敗的原因。
     * @返回 登錄失敗的數據包。
     */
    public static byte[] getLoginFailed(MapleEnumClass.AuthReply reason) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(SendPacketOpcode.LP_CheckPasswordResult.getValue());
        mplew.write(reason.getCode());
        mplew.writeMapleAsciiString("");
        if (reason.getCode() == 84) {
            mplew.writeLong(PacketHelper.getTime(-2));
        } else if (reason.is(MapleEnumClass.AuthReply.GAME_CONNECTING_ACCOUNT)) { //prolly this
            mplew.writeZeroBytes(5);
        }
        return mplew.getPacket();
    }

    public static byte[] getLoginFailedBan(long timestampTill, int banType, String reason) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_CheckPasswordResult.getValue());
        mplew.write(MapleEnumClass.AuthReply.GAME_ACCOUNT_BANNED.getCode());
        mplew.writeMapleAsciiString("");
        mplew.write(banType);
        mplew.writeLong(PacketHelper.getTime(timestampTill)); // Tempban 日期處理 -- 64位長, 100 ns的間隔從 1/1/1601.
        mplew.writeMapleAsciiString(reason);

        return mplew.getPacket();
    }

    /**
     * 發送成功驗證和請求數據包
     *
     * @param client 客戶端
     * @return 密碼請求數據包
     */
    public static byte[] getAuthSuccessRequest(MapleClient client, boolean relogin) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        if (relogin) {
            mplew.writeShort(SendPacketOpcode.LP_AccountInfoResult.getValue());
        } else {
            mplew.writeShort(SendPacketOpcode.LP_CheckPasswordResult.getValue());
        }
        mplew.write(0); //0 = 打開全部職業,1 = 關閉全部職業
        mplew.writeMapleAsciiString("");
        if (!relogin) {
            mplew.writeMapleAsciiString(client.getAccountName());
            mplew.writeLong(client.getAccID());
        }
        mplew.writeInt(client.getAccID());
        /* 是否為管理員帳號
         * 效果1 - 不受地圖使用位移技能限制
         * 效果2 - 可以使用/前綴指令
         * 效果3 - 不受部分異常狀態/怪物BUFF影響
         * 效果4 - 無法丟棄道具
         * 效果5 - 上線提示「該帳號限制道具和楓幣移動，請至認證信箱了解詳情，並聯絡客服中心。」
         */
        mplew.write(client.isIntern());

        int accountStuff = 0;
        if (client.isSuperGm()) {
            accountStuff |= 1 << 4; // 0x10
        }
        if (client.isAdmin()) {
            accountStuff |= 1 << 5; // 0x20
            accountStuff |= 1 << 13; // 0x2000
//            accountStuff |= 1 << 19; // 0x80000
//            accountStuff |= 1 << 17; // 0x20000
        }
        /*
         * 0x10 - bManagerAccount 限制某些效果(例如反擊怪物), 允許丟棄道具
         * 0x20 - bTesterAccount 效果未知
         * 0x2000 - bSubTesterAccount 效果未知
         * 0x80000 - 不顯示首次進入遊戲顯示網頁, 無法更變聊天視窗的大小
         * 0x20000 - 效果未知
         */
        mplew.writeInt(accountStuff);

        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0x25);
        mplew.write(3);
        mplew.write(0); // 1 = 帳號禁止說話
        mplew.writeLong(0); // 禁止說話期限
        mplew.write(0);
        mplew.writeLong(0L);
        if (relogin) {
            mplew.writeMapleAsciiString(client.getAccountName());
            mplew.writeMapleAsciiString(client.getSecurityAccountName());
        } else {
            boolean unkBool = false;
            mplew.write(unkBool);
            if (!unkBool) {
                mplew.writeMapleAsciiString(client.getSecurityAccountName());
            }
        }
        mplew.writeMapleAsciiString("");
        mplew.writeBool(false);
        if (false) {
            mplew.write(JobConstants.JOB_ORDER);
            // 職業開放狀態
            for (int i = 0; i < ServerConstants.JOB_NAMELIST.length; i++) {
                mplew.write(ServerConfig.WORLD_CLOSEJOBS.contains(ServerConstants.JOB_NAMELIST[i]) ? 0 : 1);
                mplew.writeShort(1);
            }
        }
        mplew.write(0);
        mplew.writeInt(-1);
        mplew.write(0);
        return mplew.getPacket();
    }

    public static final byte[] deleteCharResponse(int cid, int state) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DeleteCharacterResult.getValue());
        mplew.writeInt(cid);
        mplew.write(state);
        mplew.write(false);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] deleteReservedCharResponse(int chrId, int state) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReservedDeleteCharacterResult.getValue());
        mplew.writeInt(chrId);
        mplew.write(state);
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    public static byte[] ReservedDeleteCharacterCancelResult(int chrId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ReservedDeleteCharacterCancelResult.getValue());
        mplew.writeInt(chrId);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] secondPwError(byte mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        /*
         * 14 - Invalid password
         * 15 - Second password is incorrect
         */
        mplew.writeShort(SendPacketOpcode.SECONDPW_ERROR.getValue());
        mplew.write(mode);

        return mplew.getPacket();
    }

    /**
     * 發送數據包的詳細介紹了伺服器和在線人數
     *
     * @參數 serverId - 伺服器ID
     * @參數 channelLoad 負荷的頻道-1200似乎是最大
     * @返回 伺服器信息包。
     */
    public static byte[] getServerList(ServerConstants.MapleServerName server, Map<Integer, Integer> channelLoad) {

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_WorldInformation.getValue());
        mplew.write(server.getValue());
        mplew.writeMapleAsciiString(server.name());
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.write(0);
        mplew.write(ServerConfig.LOGIN_SERVERSTATUS); // 伺服器狀態  0 無 1活動 2新的 3hot
        mplew.writeMapleAsciiString(LoginServer.getEventMessage()); // 伺服器公告牌信息

        int lastChannel = 1;
        Set<Integer> channels = channelLoad.keySet();
        for (int i = 30; i > 0; i--) {
            if (channels.contains(i)) {
                lastChannel = i;
                break;
            }
        }
        mplew.write(lastChannel); // 頻道總數

        int load;
        for (int i = 1; i <= lastChannel; i++) {
            mplew.writeMapleAsciiString(server.name() + "-" + i); // 頻道名字 = 伺服器名字 - 頻道編號

            if (!channels.contains(i)) {
                load = 1;
            } else {
                load = Math.max(channelLoad.get(i) * 55 / ServerConfig.LOGIN_USERLIMIT, 1);
            }
            mplew.writeInt(load + ServerConfig.LOGIN_DEFAULTUSERLIMIT); // 頻道連接人數
            mplew.write(server.getValue()); // 伺服器ID
            mplew.write(i - 1); // 頻道編號
            mplew.write(0);
        }
        mplew.writeShort(LoginServer.getBalloons().size());
        for (MapleBalloon balloon : LoginServer.getBalloons()) {
            mplew.writeShort(balloon.nX);
            mplew.writeShort(balloon.nY);
            mplew.writeMapleAsciiString(balloon.sMessage);
        }
        mplew.writeInt(0);
        boolean a2 = false;
        mplew.write(a2);
        if (a2) {
            mplew.writeInt(0);
        }
        mplew.write(false);
        a2 = false;
        mplew.write(a2);
        if (a2) {
            int nCount = 0;
            mplew.writeInt(nCount);
            for (int i = 0; i < nCount; i++) {
                mplew.write(0);
                mplew.write(0);
                mplew.write(0);
            }
        }

        return mplew.getPacket();
    }

    /**
     * 發送數據包說伺服器列表結束
     *
     * @return 結束伺服器列表的數據包
     */
    public static byte[] getEndOfServerList() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * Recv SERVERLIST [0009] (4)
         * 09 00
         * FF FF
         * ..?
         */
        mplew.writeShort(SendPacketOpcode.LP_WorldInformation.getValue());
        mplew.write(-1);
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    /**
     * 發送數據包詳細介紹了伺服器的狀態信息。
     *
     * @param status 伺服器狀態。
     * @return 伺服器狀態數據包。
     */
    public static byte[] getServerStatus(int serverId, int status) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        /*
         * 可能的值 status:
         * 0 - 沒有消息
         * 1 - 當前世界連接數量較多，這可能會導致登錄遊戲時有些困難。
         * 2 - 當前世界上的連接已到達最高限制。請選擇別的伺服器進行遊戲或稍後再試。
         */
        mplew.writeShort(SendPacketOpcode.SERVERSTATUS.getValue());
        mplew.write(status);
        mplew.writeMapleAsciiString("");
        mplew.writeInt(serverId);
        mplew.writeInt(-1); // 0 - 燃燒伺服器提示; 1 - 皮卡啾伺服器提示
        return mplew.getPacket();
    }

    public static byte[] EventCheck() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EVENT_CHECK.getValue());
        mplew.write(HexTool.getByteArrayFromHexString("00 05 00 00 10 40 00 46 E5 58 00 57 F5 98 00 04 00 00 00 5F F5 98 00 04 00 00 00 6C F5 98 00 94 CA 07 00 D0 C3 A0 00 1C 16 01 00"));

        return mplew.getPacket();

    }

    public static byte[] getChannelSelected() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHANNEL_SELECTED.getValue());
        mplew.writeInt(3);

        return mplew.getPacket();
    }

    /**
     * Gets a packet with a list of characters.
     *
     * @param chars
     * @param charslots
     * @param c
     * @return The character list packet.
     */
    public static byte[] getCharList(List<MapleCharacter> chars, int charslots, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SelectWorldResult.getValue());
        int unk = 0;
        mplew.write(unk);
        mplew.writeMapleAsciiString("");
        if (unk == 61) {
            mplew.write(false);
            return mplew.getPacket();
        }
        if (unk != 0 && unk != 12) {
            return mplew.getPacket();
        }

        // true ==> Recv 0x00B5
        mplew.write(false);
        String worldType = "normal";
        mplew.writeInt(1);//V.181 str->int
        mplew.writeInt(1);//V.181 str->int
        mplew.writeInt(1);//V.240 ADD
        mplew.writeInt(4);
        mplew.write("reboot".equals(worldType));
        mplew.write(0);
        List<Pair<Integer, Long>> deleteChrs = AccountDao.getPendingDeleteChrId(c.getAccID(), c.getWorld());
        mplew.writeInt(deleteChrs.size());
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        for (Pair<Integer, Long> delChr : deleteChrs) {
            mplew.writeInt(delChr.getLeft());
            long delTime = delChr.getRight();
            if (c.isGm()) {
                delTime -= 2 * 24 * 60 * 60 * 1000L;
            }
            mplew.writeLong(PacketHelper.getTime(delTime));//刪除角色的時間，兩天後可以徹底刪除
        }
        mplew.write(0);
        // 排序的角色個數
        mplew.writeInt(chars.size());
        // 排序的角色ID
        chars.forEach(chr -> mplew.writeInt(chr.getId()));
        // 角色外觀個數
        mplew.write(chars.size());
        // 角色外觀訊息
        chars.forEach(chr -> addCharEntry(mplew, chr));
        mplew.write(3);
        mplew.write(0); // 是否沒有進階密碼
        mplew.write(1);
        mplew.writeInt(charslots); //帳號當前可創建角色的總數
        mplew.writeInt(0); // 50級角色卡角色數量
        int nEventNewCharJob = -1;
        mplew.writeInt(nEventNewCharJob);
        boolean fireAndice = false; // 變更角色名稱開關(在角色上方的)
        mplew.write(fireAndice);
        if (fireAndice) {
            mplew.writeLong(DateUtil.getFileTimestamp(130977216000000000L)); // 開始
            mplew.writeLong(DateUtil.getFileTimestamp(130990175990000000L)); // 結束
            int c_size = 0;
            mplew.writeInt(c_size);
            if (c_size > 0) {
                mplew.writeInt(0); // 無法更名的角色ID
            }
        }

        mplew.writeReversedLong(PacketHelper.getTime(System.currentTimeMillis()));
        mplew.writeBool(false);//V.160 new
        mplew.writeBool(false);     // 預約改名
        mplew.write(chars.size());     // 已創建的燃燒角色個數
        mplew.writeBool(false);//V.160 new
        mplew.writeInt(0);
        mplew.writeBool(false); // 244 ADD
        mplew.writeInt(0); //V.153 new
        mplew.writeInt(0);//V.160 0 => 5
        mplew.writeReversedLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));

        return mplew.getPacket();
    }

    public static final byte[] createCharResponse(int state) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CheckSPWOnCreateNewCharacterResult.getValue());
        mplew.write(state);
        switch (state) {
            case 0:
                mplew.write(1);
                mplew.write(JobConstants.JOB_ORDER);
                // 職業開放狀態
                for (int i = 0; i < ServerConstants.JOB_NAMELIST.length; i++) {
                    mplew.write(ServerConfig.WORLD_CLOSEJOBS.contains(ServerConstants.JOB_NAMELIST[i]) ? 0 : 1);
                    mplew.writeShort(1);
                }
                break;
            case 71:
                mplew.write(false);
                break;
        }

        return mplew.getPacket();
    }

    public static byte[] checkSPWExistResult(int unk1, int showChangePaswBtn) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(4);

        mplew.writeShort(SendPacketOpcode.LP_CheckSPWExistResult.getValue());
        mplew.write(unk1);
        mplew.write(showChangePaswBtn);

        return mplew.getPacket();
    }

    public static byte[] getCreatCharAuth() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CREAT_CHAR_AUTH.getValue());
        mplew.write(10);

        return mplew.getPacket();
    }

    public static byte[] addNewCharEntry(MapleCharacter chr, boolean worked) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CreateNewCharacterResult.getValue());
        mplew.write(worked ? 0 : 1);
        mplew.writeInt(0);
        addCharEntry(mplew, chr);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] charNameResponse(String charname, boolean nameUsed) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CheckDuplicatedIDResult.getValue());
        mplew.writeMapleAsciiString(charname);
        mplew.write(nameUsed ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] charNameResponse(String charname, byte type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_CheckDuplicatedIDResult.getValue());
        mplew.writeMapleAsciiString(charname);
        mplew.write(type); //0 = 可創建 1 = 已被使用 2 = 名字無法使用 3 = 因未知原因失敗

        return mplew.getPacket();
    }

    private static void addCharEntry(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        PacketHelper.addCharStats(mplew, chr);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeLong(0L);// V.153 new
        mplew.writeInt(0);
        mplew.writeInt(0); // 244 ADD
        PacketHelper.addCharLook(mplew, chr, true, false);
        if (JobConstants.is神之子(chr.getJob())) {
            PacketHelper.addCharLook(mplew, chr, true, true);
        }
    }

    public static byte[] updatePartTimeJob(MaplePartTimeJob partTime) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PART_TIME.getValue());
        mplew.writeInt(partTime.getCharacterId());
        mplew.write(0);
        PacketHelper.addPartTimeJob(mplew, partTime);
        return mplew.getPacket();
    }

    /*
     * 顯示角色卡的數量上限
     * 默認是3 最高為6
     */
    public static byte[] showCharCards(int cards) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_CHAR_CARDS.getValue());
        mplew.writeInt(cards);

        return mplew.getPacket();
    }

    /*
     * 顯示角色樂豆點信息
     */
    public static byte[] ShowAccCash(int ACash, int mPoints) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ACC_CASH.getValue());
        mplew.writeInt(ACash);
        mplew.writeInt(mPoints);

        return mplew.getPacket();
    }

    public static byte[] changePlayerKey(String key) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_IssueReloginCookie.getValue());
        mplew.writeMapleAsciiString(key);

        return mplew.getPacket();
    }

    public static byte[] EJECT_WEB(String s) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EJECT_WEB.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(s);

        return mplew.getPacket();
    }

    public static byte[] SetClientKey() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetClientKey.getValue());
        mplew.writeLong(12345678);

        return mplew.getPacket();
    }

    public static byte[] SetPhysicalWorldID(int world) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetPhysicalWorldID.getValue());
        mplew.writeInt(world);

        return mplew.getPacket();
    }

    public static byte[] SetAccountInfo(String accountName) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetAccountInfo.getValue());
        mplew.writeLong(0);
        mplew.writeMapleAsciiString(accountName);

        return mplew.getPacket();
    }

    public static byte[] ChangeSPWResult() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ChangeSPWResult.getValue());
        mplew.write(1);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] PrivateServerPacket() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PrivateServerPacket.getValue());
        mplew.writeZeroBytes(5);

        return mplew.getPacket();
    }
}
