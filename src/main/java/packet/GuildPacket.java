/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.MapleCharacter;
import handling.channel.MapleGuildRanking;
import handling.opcode.GuildOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.WorldGuildService;
import handling.world.guild.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/**
 * @author PlayDK
 */
public class GuildPacket {

    private static final Logger log = LogManager.getLogger(GuildPacket.class);

    public static byte[] createGuildAgree(String guildName) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_CreateGuildAgree.getValue());
        mplew.writeMapleAsciiString(guildName);

        return mplew.getPacket();
    }

    /*
     * 公會邀請玩家
     */
    public static byte[] inviteGuildDone(MapleGuild guild, MapleCharacter chr, MapleCharacter other) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_InviteGuild_Done.getValue()); //V.117.1修改 以前 0x05
        mplew.writeInt(guild.getId());
        mplew.writeMapleAsciiString(guild.getName());
        mplew.writeInt(chr.getId());
        mplew.writeMapleAsciiString(chr.getName());
        mplew.writeInt(chr.getLevel());
        mplew.writeInt(chr.getJob());
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 進入遊戲試顯示公會信息
     */
    public static byte[] showGuildInfo(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_LoadGuild_Done.getValue());
        mplew.writeInt(50000);
        //檢測是否有公會
        if (chr == null || chr.getMGC() == null) {
            mplew.write(0);
            return mplew.getPacket();
        }
        MapleGuild guild = WorldGuildService.getInstance().getGuild(chr.getGuildId());
        if (guild == null) {
            mplew.write(0);
            return mplew.getPacket();
        }
        mplew.write(1);
        //公會信息
        addGuildInfo(mplew, guild, 1);
        //公會升級需要的聲望點數
        addGuildExpInfo(mplew, guild);

        return mplew.getPacket();
    }

    /*
     * 顯示別人的公會信息
     */
    public static byte[] showPlayerGuildInfo(MapleGuild guild) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_FindGuild_Done.getValue());
        mplew.writeInt(guild.getId());
        mplew.writeMapleAsciiString(""); // ~rgtuUVPWuPeuolIRJYRK90SPNbhgS2qhgrEuCs9vtFSKf_utizBTgOtrYugFGarSAbJ4FlteOjBdsfXRNQmEqzLsrS9umhZArwx87waUc3FovlzqeZXw_IQQ78iTleAYmTpHVbECyYsVG
        addGuildInfo(mplew, guild, 0);
        for (int i = 0; i < 4; i++) {
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    private static void addGuildInfo(MaplePacketLittleEndianWriter mplew, MapleGuild guild, int nUnkVal) {
        mplew.writeInt(guild.getId());
        mplew.writeMapleAsciiString(guild.getName());
        //公會稱號信息
        for (int i = 1; i <= 10; i++) {
            mplew.writeMapleAsciiString(guild.getRankTitle(i));
            mplew.writeInt(guild.getRankAuthority(i));
        }
        //公會成員信息和等待加入公會的角色信息
        guild.addMemberData(mplew);
        //公會最大成員上限
        mplew.writeInt(guild.getCapacity());
        //公會圖標信息
        mplew.writeShort(guild.getLogoBG());
        mplew.write(guild.getLogoBGColor());
        mplew.writeShort(guild.getLogo());
        mplew.write(guild.getLogoColor());
        //公會公告  V.117.1 好像沒有了改為空的【00 00】
        mplew.writeMapleAsciiString(guild.getNotice());
        //公會聲望 好像要寫2次
        mplew.writeInt(guild.getGP()); //written twice, aftershock?
        mplew.writeInt(guild.getGP());
        //公會是否有聯盟 如果有寫聯盟ID
        mplew.writeInt(guild.getAllianceId() > 0 ? guild.getAllianceId() : 0);
        //公會等級
        mplew.write(guild.getLevel());
        mplew.writeInt(0); //probably guild rank or somethin related, appears to be 0 178460
        mplew.writeInt(0); //未知 V.117.1新增 100
        mplew.writeInt(0); //20200701
        mplew.write(guild.isAllowJoin());
        mplew.writeLong(0); //132377725100470000L 2020/6/27 下午 11:01
        mplew.writeInt(guild.getActivities());
        mplew.writeInt(guild.getOnlineTime());
        mplew.writeInt(guild.getAge());
        //公會技能信息
        mplew.writeShort(guild.getSkills().size()); //AFTERSHOCK: uncomment
        for (MapleGuildSkill i : guild.getSkills()) {
            mplew.writeInt(i.skillID);
            mplew.writeShort(i.level);
            mplew.writeLong(PacketHelper.getTime(i.timestamp));
            mplew.writeMapleAsciiString(i.purchaser);
            mplew.writeMapleAsciiString(i.activator);
        }
        boolean bUnk = false;
        mplew.write(bUnk); //V.117.1新增 未知
        if (bUnk) {
            mplew.write(0);
            mplew.writeInt(0);
        }
        mplew.write(-1);
        // 公會標誌圖片檔案
        byte[] logo = guild.getImageLogo();
        mplew.writeInt(logo == null ? 0 : logo.length);
        if (logo != null && logo.length > 0) {
            mplew.write(logo);
        }
        mplew.writeInt(nUnkVal);
    }

    private static void addGuildExpInfo(MaplePacketLittleEndianWriter mplew, MapleGuild guild) {
        int[] guildExp = guild.getGuildExp();
        mplew.writeInt(guildExp.length);
        for (int aGuildExp : guildExp) {
            mplew.writeInt(aGuildExp);
        }
    }

    /*
     * 創建1個公會
     */
    public static byte[] createGuild(MapleGuild guild) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_CreateNewGuild_Done.getValue());
        addGuildInfo(mplew, guild, 0);

        return mplew.getPacket();
    }

    public static byte[] guildAuthkeyUpdate() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_Authkey_Update.getValue());
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /*
     * 公會技能
     */
    public static byte[] guildSkillPurchased(int guildId, int skillId, int changerID, int level, long expiration, String purchase, String activate) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetSkill_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(skillId);
        mplew.writeInt(changerID);
        mplew.writeShort(level);
        mplew.writeLong(PacketHelper.getTime(expiration));
        mplew.writeMapleAsciiString(purchase);
        mplew.writeMapleAsciiString(activate);

        return mplew.getPacket();
    }

    /*
     * 0x03 彈出輸出創建公會名字的對話
     * 0x38 等級太低不能創建公會
     * 0x3D 已經有公會了
     * 0x3E 公會人數已滿
     * 0x3F 當前頻道找不到該角色
     * 0x61 無法創建公會標誌。創建條件: 公會等級2以上 擁有GP 150000
     */
    public static byte[] genericGuildMessage(byte code) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(code);

        return mplew.getPacket();
    }

    public static byte[] inputGuildName() {
        return genericGuildMessage((byte) GuildOpcode.GuildRes_InputGuildName.getValue());
    }

    /*
     * 新成員加入公會或者玩家申請加入公會
     */
    public static byte[] newGuildMember(MapleGuildCharacter mgc, String info) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(info != null ? GuildOpcode.GuildRes_JoinRequest_Done.getValue() : GuildOpcode.GuildRes_JoinGuild_Done.getValue());
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        if (info != null) {
            mplew.writeMapleAsciiString(info);
        }
        mgc.encodeData(mplew);

        return mplew.getPacket();
    }

    /*
     * 拒絕角色的公會申請
     */
    public static byte[] DenyGuildApply(int chrId, int guildID) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_JoinCancelRequest_Done.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(guildID);

        return mplew.getPacket();
    }

    /*
     * 公會成員離開或者驅逐
     */
    public static byte[] memberLeft(MapleGuildCharacter mgc, boolean isExpelled) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(isExpelled ? GuildOpcode.GuildRes_KickGuild_Done.getValue() : GuildOpcode.GuildRes_WithdrawGuild_Done.getValue());
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.writeMapleAsciiString(mgc.getName());

        return mplew.getPacket();
    }

    /*
     * 修改公會公告
     */
    public static byte[] guildNotice(int guildId, int cid, String notice) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetNotice_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(cid);
        mplew.writeMapleAsciiString(notice);

        return mplew.getPacket();
    }

    /*
     * 解散公會
     */
    public static byte[] guildDisband(int guildId) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_RemoveGuild_Done.getValue());
        mplew.writeInt(guildId);
        mplew.write(1);

        return mplew.getPacket();
    }

    public static byte[] guildInvitationDone(String charname) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_InviteGuild_Invited.getValue());
        mplew.writeMapleAsciiString(charname);

        return mplew.getPacket();
    }

    /*
     * 玩家拒絕公會邀請
     */
    public static byte[] denyGuildInvitation(String charname) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_InviteGuild_Rejected.getValue());
        mplew.writeMapleAsciiString(charname);

        return mplew.getPacket();
    }

    /*
     * 公會成員上限改變
     */
    public static byte[] guildCapacityChange(int guildId, int capacity) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_IncMaxMemberNum_Done.getValue());
        mplew.writeInt(guildId);
        mplew.write(capacity);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 公會成員等級提升或者職業變更
     */
    public static byte[] guildMemberLevelJobUpdate(MapleGuildCharacter mgc) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_ChangeLevelOrJob.getValue());
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.writeInt(mgc.getLevel());
        mplew.writeInt(mgc.getJobId());

        return mplew.getPacket();
    }

    /*
     * 公會成員上線
     */
    public static byte[] guildMemberOnline(int guildId, int chrId, boolean isOnline) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_NotifyLoginOrLogout.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(chrId);
        mplew.write(isOnline ? 1 : 0);
        if (!isOnline) {
            mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis()));
        }
        mplew.write(1);

        return mplew.getPacket();
    }

    /*
     * 公會職位信息修改
     */
    public static byte[] gradeNameAndAuthorityChange(int guildId, int changerID, String[] rankTitles, int[] rankAuthority) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetGradeNameAndAuthority_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(changerID);
        for (int i = 0; i < 10; i++) {
            mplew.writeInt(rankAuthority.length >= i + 1 ? rankAuthority[i] : 0);
            mplew.writeMapleAsciiString(rankTitles.length >= i + 1 ? rankTitles[i] : "");
        }

        return mplew.getPacket();
    }

    public static byte[] changeJoinSetting(int changerID, MapleGuild guild) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetGuildSettingUpdateDone.getValue());
        mplew.writeInt(guild.getId());
        mplew.writeInt(changerID);
        mplew.write(guild.isAllowJoin());
        mplew.writeInt(guild.getActivities());
        mplew.writeInt(guild.getOnlineTime());
        mplew.writeInt(guild.getAge());

        return mplew.getPacket();
    }

    /*
     * 公會地位變更
     */
    public static byte[] changeRank(MapleGuildCharacter mgc) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetMemberGrade_Done.getValue());
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.write(mgc.getGuildRank());

        return mplew.getPacket();
    }

    /*
     * 更新公會玩家的貢獻信息
     */
    public static byte[] updatePlayerContribution(int guildId, int chrId, int contribution) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetMemberCommitment_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(chrId);
        mplew.writeInt(contribution); //當前的貢獻度
        mplew.writeInt(contribution); //獲得的貢獻度
        mplew.writeInt(0); //當前的IGP
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis())); //當前的時間

        return mplew.getPacket();
    }

    /*
     * 公會圖標變更
     */
    public static byte[] guildEmblemChange(int guildId, int changerID, short bg, byte bgcolor, short logo, byte logocolor) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetMark_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(changerID);
        mplew.write(false);
        mplew.writeShort(bg);
        mplew.write(bgcolor);
        mplew.writeShort(logo);
        mplew.write(logocolor);
        mplew.writeInt(0);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] guildEmblemChange(int guildId, int changerID, short bg, byte bgcolor, short logo, byte logocolor, byte[] imageMark) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_SetMark_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(changerID);
        mplew.write(true);
        mplew.writeShort(bg);
        mplew.write(bgcolor);
        mplew.writeShort(logo);
        mplew.write(logocolor);
        mplew.writeInt(imageMark.length);
        mplew.write(imageMark);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 更新公會的總共享和總GP
     */
    public static byte[] updateGuildInfo(int guildId, int totalContribution, int guildlevel) {
        return updateGuildInfo(guildId, totalContribution, guildlevel, 0);
    }

    public static byte[] updateGuildInfo(int guildId, int totalContribution, int guildlevel, int totalGP) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_IncPoint_Done.getValue()); //V.117.1 修改 以前0x4F  +0x17
        mplew.writeInt(guildId);
        mplew.writeInt(totalContribution); //當前公會的總貢獻度
        mplew.writeInt(guildlevel); //公會的等級
        mplew.writeInt(totalGP); //當前的IGP
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
     * 榮耀之石
     */
    public static byte[] showGuildRanks(int npcid, List<MapleGuildRanking.GuildRankingInfo> all, boolean show) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_ShowGuildRanking.getValue());
        mplew.writeInt(npcid);
        mplew.writeInt(show ? all.size() : 0);
        if (show) {
            int i = 0;
            for (MapleGuildRanking.GuildRankingInfo info : all) {
                mplew.writeShort(++i);//V.145新增
                mplew.writeMapleAsciiString(info.getName());
                mplew.writeInt(info.getGP());
                mplew.writeInt(info.getLogo());
                mplew.writeInt(info.getLogoColor());
                mplew.writeInt(info.getLogoBg());
                mplew.writeInt(info.getLogoBgColor());
            }
        }

        return mplew.getPacket();
    }

    /*
     * 改變公會會長
     */
    public static byte[] guildLeaderChanged(int guildId, int oldLeader, int newLeader, int allianceId) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_ChangeMaster_Done.getValue());
        mplew.writeInt(guildId);
        mplew.writeInt(oldLeader);
        mplew.writeInt(newLeader);
        mplew.write(0);
        mplew.write(allianceId > 0 ? 1 : 0);
        if (allianceId > 0) {
            mplew.writeInt(allianceId);
        }

        return mplew.getPacket();
    }

    /*
     * 顯示初心者技能信息
     */
    public static byte[] showGuildBeginnerSkill() {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_BattleSkillOpen.getValue());
        mplew.writeShort(0); //當前擁有的技能點
        mplew.writeShort(0); //當前使用的技能點

        return mplew.getPacket();
    }

    public static byte[] showGuildLoadApplyList(List<MapleGuild> guilds) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(GuildOpcode.GuildRes_LoadApplyListDone.getValue());
        mplew.writeInt(guilds == null ? 0 : guilds.size());
        if (guilds != null) {
            for (MapleGuild guild : guilds) {
                guild.encodeInfoData(mplew);
            }
        }

        return mplew.getPacket();
    }

    /*
     * 公會聯盟
     */
    public static byte[] removeGuildFromAlliance(MapleGuildAlliance alliance, MapleGuild expelledGuild, boolean expelled) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x10);
        addAllianceInfo(mplew, alliance);
        addGuildInfo(mplew, expelledGuild, 0);
        mplew.write(expelled ? 1 : 0); //1 = expelled, 0 = left

        return mplew.getPacket();
    }

    /*
     * 公會聯盟
     */
    public static byte[] changeAlliance(MapleGuildAlliance alliance, boolean in) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x01);
        mplew.write(in ? 1 : 0);
        mplew.writeInt(in ? alliance.getId() : 0);
        int noGuilds = alliance.getNoGuilds();
        MapleGuild[] g = new MapleGuild[noGuilds];
        for (int i = 0; i < noGuilds; i++) {
            g[i] = WorldGuildService.getInstance().getGuild(alliance.getGuildId(i));
            if (g[i] == null) {
                return null;
            }
        }
        mplew.write(noGuilds);
        for (int i = 0; i < noGuilds; i++) {
            mplew.writeInt(g[i].getId());
            //must be world
            Collection<MapleGuildCharacter> members = g[i].getMembers();
            mplew.writeInt(members.size());
            for (MapleGuildCharacter mgc : members) {
                mplew.writeInt(mgc.getId());
                mplew.write(in ? mgc.getAllianceRank() : 0);
            }
        }

        return mplew.getPacket();
    }

    /*
     * 公會聯盟會長變更
     */
    public static byte[] changeAllianceLeader(int allianceid, int newLeader, int oldLeader) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x02);
        mplew.writeInt(allianceid);
        mplew.writeInt(oldLeader);
        mplew.writeInt(newLeader);

        return mplew.getPacket();
    }

    /*
     * 改變公會聯盟會長
     */
    public static byte[] updateAllianceLeader(int allianceid, int newLeader, int oldLeader) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x19);
        mplew.writeInt(allianceid);
        mplew.writeInt(oldLeader);
        mplew.writeInt(newLeader);

        return mplew.getPacket();
    }

    /*
     * 公會聯盟邀請
     */
    public static byte[] sendAllianceInvite(String allianceName, MapleCharacter inviter) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x03);
        mplew.writeInt(inviter.getGuildId());
        mplew.writeMapleAsciiString(inviter.getName());
        mplew.writeMapleAsciiString(allianceName);

        return mplew.getPacket();
    }

    public static byte[] changeGuildInAlliance(MapleGuildAlliance alliance, MapleGuild guild, boolean add) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x04);
        mplew.writeInt(add ? alliance.getId() : 0);
        mplew.writeInt(guild.getId());
        Collection<MapleGuildCharacter> members = guild.getMembers();
        mplew.writeInt(members.size());
        for (MapleGuildCharacter mgc : members) {
            mplew.writeInt(mgc.getId());
            mplew.write(add ? mgc.getAllianceRank() : 0);
        }

        return mplew.getPacket();
    }

    public static byte[] changeAllianceRank(int allianceid, MapleGuildCharacter player) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x05);
        mplew.writeInt(allianceid);
        mplew.writeInt(player.getId());
        mplew.writeInt(player.getAllianceRank());

        return mplew.getPacket();
    }

    public static byte[] createGuildAlliance(MapleGuildAlliance alliance) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x0F);
        addAllianceInfo(mplew, alliance);
        int noGuilds = alliance.getNoGuilds();
        MapleGuild[] g = new MapleGuild[noGuilds];
        for (int i = 0; i < alliance.getNoGuilds(); i++) {
            g[i] = WorldGuildService.getInstance().getGuild(alliance.getGuildId(i));
            if (g[i] == null) {
                return null;
            }
        }
        for (MapleGuild gg : g) {
            addGuildInfo(mplew, gg, 0);
        }

        return mplew.getPacket();
    }

    public static byte[] getAllianceInfo(MapleGuildAlliance alliance) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x0C);
        mplew.write(alliance == null ? 0 : 1); //in an alliance
        if (alliance != null) {
            addAllianceInfo(mplew, alliance);
        }

        return mplew.getPacket();
    }

    public static byte[] getAllianceUpdate(MapleGuildAlliance alliance) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x17);
        addAllianceInfo(mplew, alliance);

        return mplew.getPacket();
    }

    public static byte[] getGuildAlliance(MapleGuildAlliance alliance) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x0D);
        if (alliance == null) {
            mplew.writeInt(0);
            return mplew.getPacket();
        }
        int noGuilds = alliance.getNoGuilds();
        MapleGuild[] guildlist = new MapleGuild[noGuilds];
        for (int i = 0; i < alliance.getNoGuilds(); i++) {
            guildlist[i] = WorldGuildService.getInstance().getGuild(alliance.getGuildId(i));
            if (guildlist[i] == null) {
                return null;
            }
        }
        mplew.writeInt(noGuilds);
        for (MapleGuild guild : guildlist) {
            addGuildInfo(mplew, guild, 0);
        }

        return mplew.getPacket();
    }

    public static byte[] addGuildToAlliance(MapleGuildAlliance alliance, MapleGuild newGuild) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x12);
        addAllianceInfo(mplew, alliance);
        mplew.writeInt(newGuild.getId()); //???
        addGuildInfo(mplew, newGuild, 0);
        mplew.write(0); //???

        return mplew.getPacket();
    }

    private static void addAllianceInfo(MaplePacketLittleEndianWriter mplew, MapleGuildAlliance alliance) {
        mplew.writeInt(alliance.getId());
        mplew.writeMapleAsciiString(alliance.getName());
        for (int i = 1; i <= 5; i++) {
            mplew.writeMapleAsciiString(alliance.getRank(i));
        }
        mplew.write(alliance.getNoGuilds());
        for (int i = 0; i < alliance.getNoGuilds(); i++) {
            mplew.writeInt(alliance.getGuildId(i));
        }
        mplew.writeInt(alliance.getCapacity());
        mplew.writeMapleAsciiString(alliance.getNotice());
    }

    public static byte[] allianceMemberOnline(int alliance, int gid, int id, boolean online) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x0E);
        mplew.writeInt(alliance);
        mplew.writeInt(gid);
        mplew.writeInt(id);
        mplew.write(online ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] updateAlliance(MapleGuildCharacter mgc, int allianceid) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x18);
        mplew.writeInt(allianceid);
        mplew.writeInt(mgc.getGuildId());
        mplew.writeInt(mgc.getId());
        mplew.writeInt(mgc.getLevel());
        mplew.writeInt(mgc.getJobId());

        return mplew.getPacket();
    }

    public static byte[] updateAllianceRank(int allianceid, MapleGuildCharacter mgc) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x1B);
        mplew.writeInt(allianceid);
        mplew.writeInt(mgc.getId());
        mplew.writeInt(mgc.getAllianceRank());

        return mplew.getPacket();
    }

    /*
     * 解散公會聯盟
     */
    public static byte[] disbandAlliance(int alliance) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AllianceResult.getValue());
        mplew.write(0x1D);
        mplew.writeInt(alliance);

        return mplew.getPacket();
    }

    /*
     * 公會BBS公告
     */
    public static byte[] BBSThreadList(List<MapleBBSThread> bbs, int start) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        /*
         * 打開沒有BBS信息
         * [2C 01] [06] [00] [00 00 00 00]
         */
        mplew.writeShort(SendPacketOpcode.BBS_OPERATION.getValue());
        mplew.write(0x06);

        if (bbs == null) {
            mplew.write(0); //是否有公告
            mplew.writeInt(0); //當前的條數
            return mplew.getPacket();
        }
        /*
         * 開始加載
         */
        MapleBBSThread notice = null;
        for (MapleBBSThread b : bbs) {
            if (b.isNotice()) { //notice
                notice = b;
                bbs.remove(b);
                break;
            }
        }
        mplew.write(notice == null ? 0 : 1);
        if (notice != null) { //has a notice
            addThread(mplew, notice);
        }
        int threadCount = bbs.size();
        if (threadCount < start) { //seek to the thread before where we start
            //uh, we're trying to start at a place past possible
            start = 0;
        }
        //each page has 10 threads, start = page # in packet but not here
        mplew.writeInt(threadCount);
        int pages = Math.min(10, threadCount - start);
        mplew.writeInt(pages);

        for (int i = 0; i < pages; i++) {
            addThread(mplew, bbs.get(start + i)); //because 0 = notice
        }

        return mplew.getPacket();
    }

    private static void addThread(MaplePacketLittleEndianWriter mplew, MapleBBSThread thread) {
        mplew.writeInt(thread.localthreadID);
        mplew.writeInt(thread.ownerID);
        mplew.writeMapleAsciiString(thread.name);
        mplew.writeLong(PacketHelper.getTime(thread.timestamp));
        mplew.writeInt(thread.icon);
        mplew.writeInt(thread.getReplyCount());
    }

    public static byte[] showThread(MapleBBSThread thread) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BBS_OPERATION.getValue());
        mplew.write(0x03);

        mplew.writeInt(1);
        mplew.writeInt(1);
        mplew.writeInt(1);
        mplew.writeInt(1);
        mplew.writeInt(0);
        mplew.writeInt(thread.ownerID);
        mplew.writeMapleAsciiString(thread.text);
        mplew.writeLong(PacketHelper.getTime(thread.timestamp));
        mplew.writeInt(0);
        mplew.writeInt(0);
        
        /*
        mplew.writeInt(thread.localthreadID);
        mplew.writeInt(thread.ownerID);
        mplew.writeLong(PacketHelper.getTime(thread.timestamp));
        mplew.writeMapleAsciiString(thread.name);
        mplew.writeMapleAsciiString(thread.text);
        mplew.writeInt(thread.icon);
        mplew.writeInt(thread.getReplyCount());
        for (MapleBBSReply reply : thread.replies.values()) {
            mplew.writeInt(reply.replyid);
            mplew.writeInt(reply.ownerID);
            mplew.writeLong(PacketHelper.getTime(reply.timestamp));
            mplew.writeMapleAsciiString(reply.content);
        }*/
        return mplew.getPacket();
    }

    public static byte[] loadGuildName(MapleCharacter chr) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserGuildNameChanged.getValue());
        mplew.writeInt(chr.getId());
        if (chr.getGuildId() <= 0) {
            mplew.writeShort(0);
        } else {
            MapleGuild guild = WorldGuildService.getInstance().getGuild(chr.getGuildId());
            if (guild != null) {
                mplew.writeMapleAsciiString(guild.getName());
            } else {
                mplew.writeShort(0);
            }
        }
        return mplew.getPacket();
    }

    public static byte[] loadGuildIcon(MapleCharacter chr) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserGuildMarkChanged.getValue());
        mplew.writeInt(chr.getId());
        if (chr.getGuildId() <= 0) {
            mplew.writeZeroBytes(10);
        } else {
            MapleGuild guild = WorldGuildService.getInstance().getGuild(chr.getGuildId());
            if (guild != null) {
                mplew.writeShort(guild.getLogoBG());
                mplew.write(guild.getLogoBGColor());
                mplew.writeShort(guild.getLogo());
                mplew.write(guild.getLogoColor());
                byte[] logo = guild.getImageLogo();
                mplew.writeInt(logo == null ? 0 : 1);
                if (logo != null && logo.length > 0) {
                    mplew.writeInt(guild.getId());
                    mplew.writeInt(logo.length);
                    mplew.write(logo);
                }
            } else {
                mplew.writeZeroBytes(10);
            }
        }
        return mplew.getPacket();
    }

    public static byte[] guildSearch_Results(int type, String searchInfo, boolean equals, boolean bUnk1, boolean bUnk2, boolean bUnk3, List<MapleGuild> guilds, List<MapleGuild> guilds_unk) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_GuildSearchResult.getValue());
        mplew.write(type);
        mplew.write(0);
        mplew.writeMapleAsciiString(searchInfo);//搜尋訊息
        mplew.write(equals);
        boolean bUn1 = false; // bUnk1
        mplew.write(bUn1);
        if (bUn1) {
            mplew.write(0);
            mplew.writeInt(0);
            mplew.writeLong(0);
            mplew.write(false);
            mplew.write(false);
            mplew.writeInt(0);
        }
        mplew.write(1); // bUnk2
        boolean bUn2 = false; // bUnk3
        mplew.write(bUn2);
        if (bUn2) {
            mplew.write(0);
            mplew.writeInt(0);
            mplew.writeLong(0);
            mplew.write(false);
            mplew.write(false);
            mplew.writeInt(0);
        }
        mplew.writeInt(guilds_unk.size());
        for (MapleGuild guild : guilds_unk) {
            guild.encodeInfoData(mplew);
        }
        mplew.writeInt(guilds.size());
        for (MapleGuild guild : guilds) {
            guild.encodeInfoData(mplew);
        }
        return mplew.getPacket();
    }

    public static byte[] guildResult(GuildOpcode zt) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_GuildResult.getValue());
        mplew.write(zt.getValue());

        switch (zt) {
            case GuildRes_JoinGuild_Set_Refuse:
                mplew.writeInt(0);
                break;
        }

        return mplew.getPacket();
    }
}
