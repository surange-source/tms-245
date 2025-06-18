/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.MapleCharacter;
import handling.opcode.PartyOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.PartyOperation;
import handling.world.WorldPartyService;
import handling.world.party.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author admin
 */
public class PartyPacket {

    /**
     * Logger for this class.
     */
    private static final Logger log = LogManager.getLogger(PartyPacket.class);

    /*
     * 創建隊伍
     */
    public static byte[] partyCreated(MapleParty party) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(PartyOpcode.PartyRes_CreateNewParty_Done.getValue()); //以前是0x0C V.112修改
        mplew.writeInt(party.getPartyId());
        mplew.writeInt(999999999);
        mplew.writeInt(999999999);
        mplew.writeInt(0);
        mplew.writeShort(0);
        mplew.writeShort(0);
        mplew.write(0);
        mplew.writeMapleAsciiString(party.getName()); //隊伍的名字信息 好像需要長度30
        mplew.write(!party.isHidden()); //是否公開 公開 = 1 不公開 = 0
        mplew.write(party.isLeaderPick());

        return mplew.getPacket();
    }

    /*
     * 組隊邀請
     */
    public static byte[] partyInvite(MapleCharacter from) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(PartyOpcode.PartyReq_InviteParty.getValue());
        mplew.writeInt(from.getParty() == null ? 0 : from.getParty().getPartyId());
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0);
        mplew.write(0);
        boolean b1 = false;
        mplew.write(b1);
        if (b1) {
            mplew.write(0);
        }

        return mplew.getPacket();
    }

    /*
     * 組隊邀請返回信息
     */
    public static byte[] partyRequestInvite(MapleCharacter from) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(PartyOpcode.PartyReq_ApplyParty.getValue());
        mplew.writeInt(from.getId());
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] partyStatusMessage(int message) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        /*
         * 0x0F 已經加入其他組。
         * 0x10 新手不能開啟組隊。
         * 0x11 發生未知錯誤，不能處理組隊邀請。
         * 0x13 沒有參加的組隊。
         * 0x14 發生未知錯誤，不能處理組隊邀請。
         * 0x16 加入組隊。
         * 0x17 已經加入其他組。
         * 0x18 組隊成員已滿
         * 0x30 能轉讓給同一個場地的組隊成員。
         */
        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(message);

        return mplew.getPacket();
    }

    /*
     * 組隊消息
     */
    public static byte[] partyStatusMessage(int message, String charName) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(message);
        mplew.writeMapleAsciiString(charName);

        return mplew.getPacket();
    }

    private static void addPartyStatus(int forchannel, MapleParty party, MaplePacketLittleEndianWriter lew, boolean leaving) {
        addPartyStatus(forchannel, party, lew, leaving, false);
    }

    private static void addPartyStatus(int forchannel, MapleParty party, MaplePacketLittleEndianWriter lew, boolean leaving, boolean exped) {
        List<MaplePartyCharacter> partymembers;
        if (party == null) {
            partymembers = new ArrayList<>();
        } else {
            partymembers = new ArrayList<>(party.getMemberList());
        }
        while (partymembers.size() < 6) {
            partymembers.add(new MaplePartyCharacter());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeAsciiString(partychar.getName(), 15);
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getJobId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(0);
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(partychar.getLevel());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.isOnline()) {
                lew.writeInt(partychar.getChannel() - 1);
            } else {
                lew.writeInt(-2);
            }
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(0); // TODOO 未知
        }
        for (MaplePartyCharacter partychar : partymembers) {
            lew.writeInt(0); // TODOO 未知
        }
        lew.writeInt(party == null ? 0 : party.getLeaderID());
        if (exped) { //是遠征隊伍就返回
            return;
        }


        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel) {
                lew.writeInt(partychar.getMapid());
            } else {
                lew.writeInt(999999999);
            }
        }


        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel && !leaving) {
                lew.writeInt(partychar.getDoorTown());
                lew.writeInt(partychar.getDoorTarget());
                lew.writeInt(partychar.getDoorSkill());
                lew.writeInt(partychar.getDoorPosition().x);
                lew.writeInt(partychar.getDoorPosition().y);
            } else {
                lew.writeInt(leaving ? 999999999 : 0);
                lew.writeInt(leaving ? 999999999 : 0);
                lew.writeInt(0);
                lew.writeInt(leaving ? -1 : 0);
                lew.writeInt(leaving ? -1 : 0);
            }
        }


        lew.writeBool(false);
        lew.writeMapleAsciiString(party == null ? "" : party.getName());
        lew.writeBool(party != null && !party.isHidden()); //隊伍是否隱藏信息
        lew.writeBool(party != null && party.isLeaderPick());
    }

    public static byte[] updateParty(int forChannel, MapleParty party, PartyOperation op, MaplePartyCharacter target) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        switch (op) {
            case 解散隊伍: //解散隊伍
            case 驅逐成員: //驅逐成員
            case 離開隊伍: //離開隊伍
                mplew.write(PartyOpcode.PartyRes_WithdrawParty_Done.getValue()); //以前是0x12 V.116修改   //119
                mplew.writeInt(party.getPartyId());
                mplew.writeInt(target.getId());
                mplew.write(op == PartyOperation.解散隊伍 ? 0 : 1);
                if (op == PartyOperation.解散隊伍) {
                    mplew.writeInt(target.getId());
                } else {
                    mplew.write(op == PartyOperation.驅逐成員 ? 1 : 0);
                    mplew.writeMapleAsciiString(target.getName());
                    addPartyStatus(forChannel, party, mplew, op == PartyOperation.離開隊伍);
                }
                break;
            case 加入隊伍: //加入隊伍
                mplew.write(PartyOpcode.PartyRes_JoinParty_Done.getValue()); //以前是0x15 V.116修改   119
                mplew.writeInt(party.getPartyId());
                mplew.writeMapleAsciiString(target.getName());
                mplew.write(0);
                mplew.writeInt(0);
                addPartyStatus(forChannel, party, mplew, false);
                break;
            case 更新隊伍: //更新隊伍
            case LOG_ONOFF: //隊伍玩家登錄或下線
                mplew.write(op == PartyOperation.LOG_ONOFF ? PartyOpcode.PartyRes_UserMigration.getValue() : PartyOpcode.PartyRes_LoadParty_Done.getValue()); //以前是0x0D V.116修改   119
                mplew.writeInt(party.getPartyId());
                addPartyStatus(forChannel, party, mplew, op == PartyOperation.LOG_ONOFF);
                break;
            case 改變隊長: //改變隊長
            case CHANGE_LEADER_DC: //隊長下線自動修改隊長
                mplew.write(PartyOpcode.PartyRes_ChangePartyBoss_Done.getValue()); //以前是0x2D V.116修改   119
                mplew.writeInt(target.getId());
                mplew.write(op == PartyOperation.CHANGE_LEADER_DC ? 1 : 0);
                break;
            case 隊伍設置: //V.119.1新增
                mplew.write(PartyOpcode.PartyRes_PartySettingDone.getValue());
                mplew.writeMapleAsciiString(party.getName(), 30); //隊伍信息 好像長度必須30
                mplew.write(!party.isHidden()); //隊伍是否隱藏信息
                mplew.write(party.isLeaderPick()); //是否隊長拾取
                break;
        }
        return mplew.getPacket();
    }

    /*
     * 增加隊伍傳送點 也就是時空門
     */
    public static byte[] onPartyTownPortalChanged(int townId, int targetId, int skillId, Point position, boolean animation) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(PartyOpcode.PartyInfo_TownPortalChanged.getValue());
        mplew.write(animation ? 0 : 1);
        mplew.writeInt(townId);
        mplew.writeInt(targetId);
        mplew.writeInt(skillId);
        mplew.writePos(position);
        mplew.writeInt(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    /*
     * 更新組隊HP
     */
    public static byte[] updatePartyMemberHP(int chrId, int curhp, int maxhp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserHP.getValue());
        mplew.writeInt(chrId);
        mplew.writeInt(curhp);
        mplew.writeInt(maxhp);

        return mplew.getPacket();
    }

    /*
     * 搜索隊伍中尋找隊伍列表
     * V.118.1 OK
     */
    public static byte[] getPartyListing(PartySearchType pst) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(108); //V.116修改
        mplew.writeInt(pst.id);
        List<PartySearch> parties = WorldPartyService.getInstance().searchParty(pst);
        mplew.writeInt(parties.size());
        for (PartySearch party : parties) {
            if (pst.exped) {
                MapleExpedition me = WorldPartyService.getInstance().getExped(party.getId());
                mplew.writeInt(party.getId());
                mplew.writeAsciiString(party.getName(), 37);
                //mplew.writeAsciiString("id MobStat", 10);
                mplew.writeInt(pst.id);
                mplew.writeInt(0);
                for (int i = 0; i < 5; i++) { //all parties in the exped other than the leader
                    if (i < me.getParties().size()) {
                        MapleParty part = WorldPartyService.getInstance().getParty(me.getParties().get(i));
                        if (part != null) {
                            addPartyStatus(-1, part, mplew, false, true);
                        } else {
                            mplew.writeZeroBytes(226); //length of the addPartyStatus.
                        }
                    } else {
                        mplew.writeZeroBytes(226); //length of the addPartyStatus.
                    }
                }
            } else {
                mplew.writeInt(party.getId());
                mplew.writeAsciiString(party.getName(), 37);
                addPartyStatus(-1, WorldPartyService.getInstance().getParty(party.getId()), mplew, false, true); //if exped, send 0, if not then skip
            }
        }

        return mplew.getPacket();
    }

    /*
     * 搜索隊伍中添加尋找隊伍
     * V.118.1 OK
     */
    public static byte[] partyListingAdded(PartySearch ps) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(106); //V.118修改 以前0x6A
        mplew.writeInt(ps.getType().id);
        if (ps.getType().exped) {
            MapleExpedition me = WorldPartyService.getInstance().getExped(ps.getId());
            //mplew.writeInt(me.getType().maxMembers);
            mplew.writeInt(ps.getId());
            mplew.writeAsciiString(ps.getName(), 37);
            mplew.writeInt(ps.getType().id);
            mplew.writeInt(0);
            for (int i = 0; i < 5; i++) { //all parties in the exped other than the leader
                if (i < me.getParties().size()) {
                    MapleParty party = WorldPartyService.getInstance().getParty(me.getParties().get(i));
                    if (party != null) {
                        addPartyStatus(-1, party, mplew, false, true);
                    } else {
                        mplew.writeZeroBytes(226); //length of the addPartyStatus.
                    }
                } else {
                    mplew.writeZeroBytes(226); //length of the addPartyStatus.
                }
            }
        } else {
            mplew.writeInt(ps.getId());
            mplew.writeAsciiString(ps.getName(), 37);
            addPartyStatus(-1, WorldPartyService.getInstance().getParty(ps.getId()), mplew, false, true); //if exped, send 0, if not then skip
        }

        return mplew.getPacket();
    }

    /*
     * 取消組隊廣告
     * V.118.1 OK
     */
    public static byte[] removePartySearch(PartySearch ps) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_PartyResult.getValue());
        mplew.write(107); //V.118修改  以前0x6B
        mplew.writeInt(ps.getType().id);
        mplew.writeInt(ps.getId());
        mplew.writeInt(0x02); //ps.getType().exped ? 0x04 : 0x02 好像是一樣的

        return mplew.getPacket();
    }

    /*
     * 遠征隊伍狀態
     * V.118.1 OK
     */
    public static byte[] expeditionStatus(MapleExpedition me, boolean created) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(created ? 0x56 : 0x58); //V.118修改 以前創建 0x56 更新 0x58
        mplew.writeInt(me.getType().exped);
        mplew.writeInt(0);
        for (int i = 0; i < 5; i++) { //all parties in the exped other than the leader
            if (i < me.getParties().size()) {
                MapleParty party = WorldPartyService.getInstance().getParty(me.getParties().get(i));
                if (party != null) {
                    addPartyStatus(-1, party, mplew, false, true);
                } else {
                    mplew.writeZeroBytes(226); //length of the addPartyStatus.
                }
            } else {
                mplew.writeZeroBytes(226); //length of the addPartyStatus.
            }
        }

        return mplew.getPacket();
    }

    /*
     * 遠征隊邀請玩家觸發的提示
     * V.118.1 OK
     */
    public static byte[] expeditionInviteMessage(int code, String name) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x64); //V.118修改 以前是0x64
        /*
         * 0 = 在當前伺服器找不到『xxxx』。
         * 1 = 運營員只能邀請運營員。
         * 2 = 『xxxx』已經加入了其他隊伍。
         * 3 = 『xxxx』的等級不符，無法邀請加入遠征隊。
         * 4 = 『xxxx』目前處於拒絕遠征隊邀請的狀態。
         * 5 = 『xxxx』玩家正在做別人的事情。
         * 6 = 已邀請『xxxx』加入遠征隊。
         * 7 = 已邀請『xxxx』加入遠征隊。
         */
        mplew.writeInt(code);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 加入遠征隊伍的提示
     * V.118.1 OK
     */
    public static byte[] expeditionJoined(String name) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x57); //V.116修改 以前0x57
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 離開遠征隊伍
     * V.118.1 OK
     */
    public static byte[] expeditionLeft(boolean left, String name) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        /*
         * 0x5D 隊員自己退出
         * 0x5F 強制驅除別人
         */
        mplew.write(left ? 0x5B : 0x5D);
        mplew.writeMapleAsciiString(name);

        return mplew.getPacket();
    }

    /*
     * 遠征提示信息
     * V.118.1 OK
     */
    public static byte[] expeditionMessage(boolean disbanded) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        /*
          0x60 提示被T出遠征隊伍
          0x61 解散遠征隊伍
         */
        mplew.write(disbanded ? 0x5F : 0x5E);

        return mplew.getPacket();
    }

    /*
     * 遠征隊長改變
     * V.118.1 OK
     */
    public static byte[] expeditionLeaderChanged(int newLeader) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x60); //V.116修改 以前0x60
        mplew.writeInt(newLeader);

        return mplew.getPacket();
    }

    /*
     * 遠征隊伍更新
     * can only update one party in the expedition.
     * V.118.1 OK
     */
    public static byte[] expeditionUpdate(int partyIndex, MapleParty party) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x61); //V.118修改 以前0x61
        mplew.writeInt(0);
        mplew.writeInt(partyIndex);
        if (party == null) {
            mplew.writeZeroBytes(250); //length of the addPartyStatus.
        } else {
            addPartyStatus(-1, party, mplew, false, true);
        }

        return mplew.getPacket();
    }

    /*
     * 遠征隊邀請玩家
     * 該玩家獲得的封包
     * V.118.1 OK
     */
    public static byte[] expeditionInvite(MapleCharacter from, int exped) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        mplew.write(0x63); //V.118修改 以前0x63
        mplew.writeInt(from.getLevel());
        from.writeJobData(mplew);
        mplew.writeInt(0); //V.104新增 貌似是把職業的 Int 改為 Long ?
        mplew.writeMapleAsciiString(from.getName());
        mplew.writeInt(exped);

        return mplew.getPacket();
    }

    /*
     * 隊員搜索
     */
    public static byte[] showMemberSearch(List<MapleCharacter> players) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_PartyMemberCandidateResult.getValue());
        mplew.write(players.size());
        for (MapleCharacter chr : players) {
            mplew.writeInt(chr.getId());
            mplew.writeMapleAsciiString(chr.getName());
            chr.writeJobData(mplew);
            mplew.writeInt(chr.getLevel());//V.162 byte=>int
        }

        return mplew.getPacket();
    }

    /*
     * 隊伍搜索
     */
    public static byte[] showPartySearch(List<MapleParty> partylist) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_PartyCandidateResult.getValue());
        mplew.write(partylist.size());
        for (MapleParty party : partylist) {
            mplew.writeInt(party.getPartyId());
            mplew.writeMapleAsciiString(party.getLeader().getName());
            mplew.writeInt(party.getLeader().getLevel());//V.162 byte=>int
            mplew.write(party.getLeader().isOnline() ? 1 : 0);
            mplew.writeMapleAsciiString(party.getName());
            mplew.write(party.getMemberList().size());
            for (MaplePartyCharacter partyChr : party.getMemberList()) {
                mplew.writeInt(partyChr.getId());
                mplew.writeMapleAsciiString(partyChr.getName());
                mplew.writeInt(partyChr.getJobId()); //V.104修改 以前為 Short
                mplew.writeInt(partyChr.getLevel());//V.162 byte=>int
                mplew.write(partyChr.isOnline() ? 1 : 0);
                mplew.write(-1);
            }
        }

        return mplew.getPacket();
    }
}
