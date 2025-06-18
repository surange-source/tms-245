package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import configs.Config;
import constants.GameConstants;
import handling.channel.ChannelServer;
import handling.opcode.PartyOpcode;
import handling.world.PartyOperation;
import handling.world.World;
import handling.world.WorldFindService;
import handling.world.WorldPartyService;
import handling.world.party.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.quest.MapleQuest;
import tools.StringUtil;
import packet.PartyPacket;
import tools.data.MaplePacketReader;

import java.util.ArrayList;
import java.util.List;

public class PartyHandler {

    private static final Logger log = LogManager.getLogger();

    /*
     * 第2方收到的組隊信息
     * 同意或者拒絕加入隊伍
     */
    public static void DenyPartyRequest(MaplePacketReader slea, MapleClient c) {
        short action = slea.readByte();
        int fromId = slea.readInt();
        PartyOpcode opcode = PartyOpcode.getByAction(action);
        if (opcode == null) {
            log.error("未知PartyOpcode：" + action);
            return;
        }
        final MapleParty party = WorldPartyService.getInstance().getParty(fromId);
        if (party == null) {
            log.error("party is null, partyid:" + fromId);
            return;
        }
        WorldPartyService partyService = WorldPartyService.getInstance();
        switch (opcode) {
            case PartyRes_InviteParty_Sent: {
                MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterById(party.getLeaderID());
                if (chr != null) {
                    chr.getClient().announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_InviteParty_Sent.getValue(), c.getPlayer().getName()));
                }
                break;
            }
            case PartyRes_InviteParty_Rejected: {
                MapleCharacter cfrom = c.getChannelServer().getPlayerStorage().getCharacterById(party.getLeaderID());
                if (cfrom != null) {
                    cfrom.dropMessage(5, "'" + c.getPlayer().getName() + "'玩家拒絕了組隊招待。");
                }
                break;
            }
            case PartyRes_InviteParty_Accepted: //同意組隊
                if (c.getPlayer().getParty() != null) {
                    c.getPlayer().dropMessage(5, "您已經有一個組隊，無法加入其他組隊!");
                    return;
                }
                if (party.getExpeditionId() > 0) {
                    c.getPlayer().dropMessage(5, "要加入的隊伍為遠征小隊，無法進行此操作。");
                    return;
                }
                if (party.getMemberSize() < 6) {
                    c.getPlayer().setParty(party);
                    partyService.updateParty(party.getPartyId(), PartyOperation.加入隊伍, new MaplePartyCharacter(c.getPlayer()));
                    c.getPlayer().receivePartyMemberHP();
                    c.getPlayer().updatePartyMemberHP();
                } else {
                    c.getPlayer().dropMessage(5, "組隊成員已滿");
                }
                break;
            case PartyRes_InviteParty_AlreadyInvitedByInviter: {
                MapleCharacter cfrom = c.getChannelServer().getPlayerStorage().getCharacterById(party.getLeaderID());
                if (cfrom != null) {
                    cfrom.dropMessage(5, "已向'" + c.getPlayer().getName() + "'玩家發送過邀請，請耐心等待。");
                }
                break;
            }
            case PartyRes_CanNotInThisField: {
                MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterById(party.getLeaderID());
                if (chr != null) {
                    chr.getClient().announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_CanNotInThisField.getValue()));
                }
                break;
            }
            default:
                log.error("未處理的PartyOpcode：" + opcode);
                break;
        }
    }

    /*
     * 組隊操作
     */
    public static void PartyOperation(MaplePacketReader slea, MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (player == null) {
            return;
        }
        c.sendEnableActions();
        byte code = slea.readByte();
        PartyOpcode operation = PartyOpcode.getByAction(code);
        if (operation == null) {
            System.out.println("組隊邀請處理( " + code + " ) 未知.");
            return;
        }
        MapleParty party = c.getPlayer().getParty();
        WorldPartyService partyService = WorldPartyService.getInstance();
        MaplePartyCharacter partyPlayer = new MaplePartyCharacter(c.getPlayer());
        switch (operation) {
            case PartyReq_CreateNewParty: // 創建隊伍
                String partyName = slea.readMapleAsciiString();
                boolean isHidden = slea.readByte() == 0;
                boolean leaderPick = slea.readByte() != 0;
                if (party == null) {
                    party = partyService.createParty(partyPlayer, partyName, isHidden, leaderPick);
                    c.getPlayer().setParty(party);
                    c.announce(PartyPacket.partyCreated(party));
                } else {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        return;
                    }
                    if (partyPlayer.getId() == party.getLeaderID() && party.getMemberList().size() == 1) {
                        c.announce(PartyPacket.partyCreated(party));
                    } else {
                        c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_CreateNewParty_AlreayJoined.getValue()));
                    }
                }
                break;
            case PartyReq_WithdrawParty: // 離開隊伍
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        return;
                    }
                    if (partyPlayer.getId() == party.getLeaderID()) { // 如果離開的玩家是隊長就解散隊伍
                        if (c.getPlayer().getPyramidSubway() != null) {
                            c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                        }
                        partyService.updateParty(party.getPartyId(), PartyOperation.解散隊伍, partyPlayer);
                        if (c.getPlayer().getEventInstance() != null) {
                            c.getPlayer().getEventInstance().disbandParty();
                        }
                    } else {
                        if (c.getPlayer().getPyramidSubway() != null) {
                            c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                        }
                        partyService.updateParty(party.getPartyId(), PartyOperation.離開隊伍, partyPlayer);
                        if (c.getPlayer().getEventInstance() != null) {
                            c.getPlayer().getEventInstance().leftParty(c.getPlayer());
                        }
                    }
                    c.getPlayer().setParty(null);
                }
                break;
            case PartyReq_JoinParty: // 加入隊伍
                int partyid = slea.readInt();
                if (party != null) {
                    c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_JoinParty_AlreadyJoined.getValue()));
//                    c.getPlayer().dropMessage(5, "您已經有一個組隊，無法加入其他組隊!");
                    return;
                }
                party = partyService.getParty(partyid);
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        return;
                    }
                    if (party.getMemberList().size() < 6) {
                        c.getPlayer().setParty(party);
                        partyService.updateParty(party.getPartyId(), PartyOperation.加入隊伍, partyPlayer);
                        c.getPlayer().receivePartyMemberHP();
                        c.getPlayer().updatePartyMemberHP();
                    } else {
                        c.getPlayer().dropMessage(5, "組隊成員已滿");
                    }
                } else {
                    c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_JoinParty_Unknown.getValue()));
//                    c.getPlayer().dropMessage(5, "要加入的隊伍不存在");
                }
                break;
            case PartyReq_InviteParty: // 組隊邀請
                if (party == null) { //玩家進行組隊邀請 如果玩家的隊伍為空 就新建1個隊伍信息
                    party = partyService.createParty(partyPlayer);
                    c.getPlayer().setParty(party);
                    c.announce(PartyPacket.partyCreated(party));
                }
                String theName = slea.readMapleAsciiString();
                int theCh = WorldFindService.getInstance().findChannel(theName);
                if (theCh > 0) {
                    MapleCharacter invited = ChannelServer.getInstance(theCh).getPlayerStorage().getCharacterByName(theName);
                    if (invited != null) {
                        if (party.getExpeditionId() > 0) {
                            c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        } else if (invited.getParty() != null) {
                            c.getPlayer().dropMessage(5, "'" + theName + "'已經加入其他組。");
                        } else if (invited.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PARTY_INVITE)) != null) {
                            c.getPlayer().dropMessage(5, "'" + theName + "'玩家處於拒絕組隊狀態。");
                        } else if (party.getMemberList().size() < 6) {
                            invited.getClient().announce(PartyPacket.partyInvite(c.getPlayer()));
                        } else {
                            c.getPlayer().dropMessage(5, "組隊成員已滿");
                        }
                    } else {
                        c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_InviteIntrusion_BlockedUser.getValue()));
//                        c.getPlayer().dropMessage(5, "在當前伺服器找不到..'" + theName + "'。");
                    }
                } else {
                    c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_InviteIntrusion_BlockedUser.getValue()));
//                    c.getPlayer().dropMessage(5, "在當前伺服器找不到..'" + theName + "'。");
                }
                break;
            case PartyReq_KickParty: // 驅逐成員
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        return;
                    }
                    MaplePartyCharacter expelled = party.getMemberById(slea.readInt());
                    if (expelled != null) {
                        if (c.getPlayer().getPyramidSubway() != null && expelled.isOnline()) {
                            c.getPlayer().getPyramidSubway().fail(c.getPlayer());
                        }
                        partyService.updateParty(party.getPartyId(), PartyOperation.驅逐成員, expelled);
                        if (c.getPlayer().getEventInstance() != null) {
                            if (expelled.isOnline()) {
                                c.getPlayer().getEventInstance().disbandParty();
                            }
                        }
                    }
                } else {
                    c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_KickParty_Unknown.getValue()));
                }
                break;
            case PartyReq_ChangePartyBoss: // 改變隊長
                if (party != null) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        return;
                    }
                    MaplePartyCharacter newleader = party.getMemberById(slea.readInt());
                    if (newleader != null && partyPlayer.getId() == party.getLeaderID()) {
                        partyService.updateParty(party.getPartyId(), PartyOperation.改變隊長, newleader);
                    } else {
                        c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_ChangePartyBoss_Unknown.getValue()));
                    }
                } else {
                    c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_ChangePartyBoss_Unknown.getValue()));
                }
                break;
            case PartyReq_ApplyParty: //尋找組隊後退出自己的隊伍然後加入別人的隊伍
                //檢測是否有隊伍 如果有就退出以前的隊伍
                if (party != null) {
                    if (c.getPlayer().checkEvent() || c.getPlayer().getPyramidSubway() != null || party.getExpeditionId() > 0 || GameConstants.isDojo(c.getPlayer().getMapId())) {
                        c.getPlayer().dropMessage(5, "加入遠征隊伍的狀態下無法進行此操作。");
                        return;
                    }
                    if (partyPlayer.getId() == party.getLeaderID()) { // 如果玩家有隊伍而且是隊長就解散這個隊伍
                        partyService.updateParty(party.getPartyId(), PartyOperation.解散隊伍, partyPlayer);
                    } else { //玩家是隊員就離開這個隊伍
                        partyService.updateParty(party.getPartyId(), PartyOperation.離開隊伍, partyPlayer);
                    }
                    c.getPlayer().setParty(null);
                }
                //在檢測1次是否還有組隊
                party = c.getPlayer().getParty();
                if (party != null) {
                    c.getPlayer().dropMessage(5, "無法退出或解散以前的隊伍，請手動退出隊伍後在進行操作。");
                    return;
                }
                //現在處理需要加入的隊伍
                int toPartyId = slea.readInt();
                party = partyService.getParty(toPartyId);
                if (party != null && party.getMemberList().size() < 6) {
                    if (party.getExpeditionId() > 0) {
                        c.getPlayer().dropMessage(5, "該隊伍為遠征小隊，無法進行此操作加入隊伍中。");
                        return;
                    }
                    MapleCharacter cfrom = c.getPlayer().getMap().getPlayerObject(party.getLeaderID());
                    if (cfrom != null) {
                        c.announce(PartyPacket.partyStatusMessage(PartyOpcode.PartyRes_SetAppliable.getValue(), cfrom.getName()));
                        cfrom.getClient().announce(PartyPacket.partyRequestInvite(c.getPlayer()));
                    } else {
                        c.getPlayer().dropMessage(5, "沒有在該地圖找此隊伍的隊長.");
                    }
                } else {
                    c.getPlayer().dropMessage(5, "要加入的隊伍不存在或者人數已滿");
                }
                break;
            case PartyReq_SetAppliable: //在搜索組隊界面設置是否容許其他玩家加入隊伍
                if (slea.readByte() > 0) {
                    c.getPlayer().getQuestRemove(MapleQuest.getInstance(GameConstants.PARTY_REQUEST));
                    break;
                }
                c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.PARTY_REQUEST));
                break;
            case PartyReq_PartySetting: //修改隊伍設置
                partyName = slea.readMapleAsciiString();
                isHidden = slea.readByte() == 0;
                leaderPick = slea.readByte() != 0;
                if (party != null) {
                    partyService.updatePartySetup(party.getPartyId(), PartyOperation.隊伍設置, partyName, isHidden, leaderPick);
                }
                break;
            default:
                if (Config.isDevelop()) {
                    System.out.println("組隊邀請處理( " + code + " ) 未知.");
                }
                break;
        }
    }

    public static void AllowPartyInvite(MaplePacketReader slea, MapleClient c) {
        if (slea.readByte() > 0) {
            c.getPlayer().getQuestRemove(MapleQuest.getInstance(GameConstants.PARTY_INVITE));
        } else {
            c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.PARTY_INVITE));
        }
    }

    /*
     * 搜索成員
     */
    public static void MemberSearch(MaplePacketReader slea, MapleClient c) {
        if (c != null && c.getPlayer() != null) {
            if (c.getPlayer().isInBlockedMap()) {
                c.getPlayer().dropMessage(5, "無法在這個地方進行搜索.");
                c.sendEnableActions();
                return;
            }
            List<MapleCharacter> members = new ArrayList<>();
            for (MapleCharacter findchr : c.getPlayer().getMap().getCharacters()) {
                if (findchr != null && findchr.getId() != c.getPlayer().getId() && !members.contains(c.getPlayer()) && !findchr.isHidden() && findchr.getParty() == null) {
                    members.add(findchr);
                }
            }
            c.announce(PartyPacket.showMemberSearch(members));
        }
    }

    /*
     * 搜索隊伍
     */
    public static void PartySearch(MaplePacketReader slea, MapleClient c) {
        if (c.getPlayer().isInBlockedMap()) {
            c.getPlayer().dropMessage(5, "無法在這個地方進行搜索.");
            c.sendEnableActions();
            return;
        }
        MapleParty party = c.getPlayer().getParty();
        List<MapleParty> parties = new ArrayList<>();
        for (MapleCharacter findchr : c.getPlayer().getMap().getCharacters()) {
            if (findchr.getParty() != null && !findchr.isHidden() && !findchr.getParty().isHidden()) {
                if (party != null && findchr.getParty().getPartyId() == party.getPartyId()) {
                    continue;
                }
                if (!parties.contains(findchr.getParty())) {
                    parties.add(findchr.getParty());
                }
            }
        }
        c.announce(PartyPacket.showPartySearch(parties));
    }

    public static void PartyListing(MaplePacketReader slea, MapleClient c) {
        int mode = slea.readByte();
        WorldPartyService partyService = WorldPartyService.getInstance();
        PartySearchType pst;
        MapleParty party;
        int typeId;
        switch (mode) {
            case 0x79: //
                break;
            case 0x72: //添加遠征隊信息
                typeId = slea.readInt();
                pst = PartySearchType.getById(typeId);
                if (pst == null || c.getPlayer().getLevel() > pst.maxLevel || c.getPlayer().getLevel() < pst.minLevel) {
                    System.out.println("創建遠征隊信息不符合條件 - 類型: " + (pst == null) + " ID: " + typeId);
                    return;
                }
                if (c.getPlayer().getParty() == null && partyService.searchParty(pst).size() < 10) {
                    party = partyService.createParty(new MaplePartyCharacter(c.getPlayer()), pst.id);
                    c.getPlayer().setParty(party);
                    c.announce(PartyPacket.partyCreated(party));
                    PartySearch ps = new PartySearch(slea.readMapleAsciiString(), pst.exped ? party.getExpeditionId() : party.getPartyId(), pst);
                    partyService.addSearch(ps);
                    if (pst.exped) {
                        c.announce(PartyPacket.expeditionStatus(partyService.getExped(party.getExpeditionId()), true));
                    }
                    c.announce(PartyPacket.partyListingAdded(ps));
                } else {
                    c.getPlayer().dropMessage(1, "您已經有個1個隊伍了，請離開隊伍後在進行嘗試。");
                }
                break;
            case 0x73: //取消添加遠征廣告信息
                party = c.getPlayer().getParty();
                if (party != null) {
                    PartySearch toRemove = partyService.getSearchByParty(party.getPartyId());
                    if (toRemove != null) {
                        partyService.removeSearch(toRemove, "組隊廣告已被刪除。");
                    } else {
                        System.out.println("取消添加遠征廣告信息 - 廣告信息為空");
                    }
                } else {
                    System.out.println("取消添加遠征廣告信息 - 是否有隊伍: " + (party != null));
                }
                break;
            case 0x74: //顯示遠征隊列表信息
                typeId = slea.readInt();
                pst = PartySearchType.getById(typeId);
                if (pst == null || c.getPlayer().getLevel() > pst.maxLevel || c.getPlayer().getLevel() < pst.minLevel) {
                    System.out.println("顯示遠征隊信息不符合條件 - 類型是否為空: " + (pst == null) + " ID: " + typeId);
                    return;
                }
                c.announce(PartyPacket.getPartyListing(pst));
                break;
            case 0x75: //關閉尋找遠征隊
                break;
            case 0x76: //加入遠征隊
                party = c.getPlayer().getParty();
                MaplePartyCharacter partyPlayer = new MaplePartyCharacter(c.getPlayer());
                if (party == null) { //are we in a party? o.O"
                    int theId = slea.readInt();
                    party = partyService.getParty(theId);
                    if (party != null) {
                        PartySearch ps = partyService.getSearchByParty(party.getPartyId());
                        if (ps != null && c.getPlayer().getLevel() <= ps.getType().maxLevel && c.getPlayer().getLevel() >= ps.getType().minLevel && party.getMemberList().size() < 6) {
                            c.getPlayer().setParty(party);
                            partyService.updateParty(party.getPartyId(), PartyOperation.加入隊伍, partyPlayer);
                            c.getPlayer().receivePartyMemberHP();
                            c.getPlayer().updatePartyMemberHP();
                        } else {
                            c.announce(PartyPacket.partyStatusMessage(0x11));
                        }
                    } else {
                        MapleExpedition exped = partyService.getExped(theId);
                        if (exped != null) {
                            PartySearch ps = partyService.getSearchByExped(exped.getId());
                            if (ps != null && c.getPlayer().getLevel() <= ps.getType().maxLevel && c.getPlayer().getLevel() >= ps.getType().minLevel && exped.getAllMembers() < exped.getType().maxMembers) {
                                int partyId = exped.getFreeParty();
                                if (partyId < 0) {
                                    c.announce(PartyPacket.partyStatusMessage(0x11));
                                } else if (partyId == 0) { //signal to make a new party
                                    party = partyService.createPartyAndAdd(partyPlayer, exped.getId());
                                    c.getPlayer().setParty(party);
                                    c.announce(PartyPacket.partyCreated(party));
                                    c.announce(PartyPacket.expeditionStatus(exped, true));
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(c.getPlayer().getName()), null);
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionUpdate(exped.getIndex(party.getPartyId()), party), null);
                                } else {
                                    c.getPlayer().setParty(partyService.getParty(partyId));
                                    partyService.updateParty(partyId, PartyOperation.加入隊伍, partyPlayer);
                                    c.getPlayer().receivePartyMemberHP();
                                    c.getPlayer().updatePartyMemberHP();
                                    c.announce(PartyPacket.expeditionStatus(exped, true));
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(c.getPlayer().getName()), null);
                                }
                            } else {
                                c.announce(PartyPacket.expeditionInviteMessage(0, c.getPlayer().getName())); //在當前伺服器找不到『xxxx』。
                            }
                        }
                    }
                } else {
                    c.getPlayer().dropMessage(1, "您已經有隊伍，請退出隊伍後在試.");
                }
                break;
            default:
                if (Config.isDevelop()) {
                    System.out.println("Unknown PartyListing : 0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(mode).toUpperCase(), '0', 2) + " " + slea);
                }
                break;
        }
    }

    /*
     * 遠征隊伍操作
     */
    public static void Expedition(MaplePacketReader slea, MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (player == null || player.getMap() == null) {
            return;
        }
        int mode = slea.readByte();
        WorldPartyService partyService = WorldPartyService.getInstance();
        MapleParty part, party;
        String name;
        int partySearchId;
        switch (mode) {
            case 0x4E: //創建遠征隊 create [PartySearchID]
                partySearchId = slea.readInt();
                ExpeditionType et = ExpeditionType.getById(partySearchId);
                if (et != null && player.getParty() == null && player.getLevel() <= et.maxLevel && player.getLevel() >= et.minLevel) {
                    party = partyService.createParty(new MaplePartyCharacter(player), et.exped);
                    player.setParty(party);
                    c.announce(PartyPacket.partyCreated(party));
                    c.announce(PartyPacket.expeditionStatus(partyService.getExped(party.getExpeditionId()), true));
                } else {
                    c.announce(PartyPacket.expeditionInviteMessage(0, "遠征模式ID[" + partySearchId + "]"));
                }
                break;
            case 0x4F: //遠征邀請 invite [name]
                name = slea.readMapleAsciiString();
                int theCh = WorldFindService.getInstance().findChannel(name);
                if (theCh > 0) {
                    MapleCharacter invited = ChannelServer.getInstance(theCh).getPlayerStorage().getCharacterByName(name);
                    party = c.getPlayer().getParty();
                    if (invited != null && invited.getParty() == null && party != null && party.getExpeditionId() > 0) {
                        MapleExpedition me = partyService.getExped(party.getExpeditionId());
                        if (me != null && me.getAllMembers() < me.getType().maxMembers && invited.getLevel() <= me.getType().maxLevel && invited.getLevel() >= me.getType().minLevel) {
                            c.announce(PartyPacket.expeditionInviteMessage(0x07, invited.getName()));
                            invited.getClient().announce(PartyPacket.expeditionInvite(player, me.getType().exped));
                        } else {
                            c.announce(PartyPacket.expeditionInviteMessage(3, invited.getName())); //『xxxx』的等級不符，無法邀請加入遠征隊。
                        }
                    } else {
                        c.announce(PartyPacket.expeditionInviteMessage(2, name)); //『xxxx』已經加入了其他隊伍。
                    }
                } else {
                    c.announce(PartyPacket.expeditionInviteMessage(0, name)); //在當前伺服器找不到『xxxx』。
                }
                break;
            case 0x50: //接受遠征邀請 accept invite [name] [int - 7, then int 8? lol.]
                name = slea.readMapleAsciiString();
                slea.readInt(); //partySearchId
                int action = slea.readInt();
                int theChh = WorldFindService.getInstance().findChannel(name);
                if (theChh > 0) {
                    MapleCharacter cfrom = ChannelServer.getInstance(theChh).getPlayerStorage().getCharacterByName(name);
                    if (cfrom != null && cfrom.getParty() != null && cfrom.getParty().getExpeditionId() > 0) {
                        party = cfrom.getParty();
                        MapleExpedition exped = partyService.getExped(party.getExpeditionId());
                        if (exped != null && action == 8) {
                            if (player.getLevel() <= exped.getType().maxLevel && player.getLevel() >= exped.getType().minLevel && exped.getAllMembers() < exped.getType().maxMembers) {
                                int partyId = exped.getFreeParty();
                                if (partyId < 0) {
                                    c.announce(PartyPacket.partyStatusMessage(0x11));
                                } else if (partyId == 0) { //signal to make a new party
                                    party = partyService.createPartyAndAdd(new MaplePartyCharacter(player), exped.getId());
                                    player.setParty(party);
                                    c.announce(PartyPacket.partyCreated(party));
                                    c.announce(PartyPacket.expeditionStatus(exped, true));
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(player.getName()), null);
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionUpdate(exped.getIndex(party.getPartyId()), party), null);
                                } else {
                                    player.setParty(partyService.getParty(partyId));
                                    partyService.updateParty(partyId, PartyOperation.加入隊伍, new MaplePartyCharacter(player));
                                    player.receivePartyMemberHP();
                                    player.updatePartyMemberHP();
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionJoined(player.getName()), null);
                                    c.announce(PartyPacket.expeditionStatus(exped, false));
                                }
                            } else {
                                c.announce(PartyPacket.expeditionInviteMessage(3, cfrom.getName())); //『xxxx』的等級不符，無法邀請加入遠征隊
                            }
                        } else if (action == 9) { //拒絕遠征隊邀請
                            cfrom.dropMessage(5, "'" + player.getName() + "'拒絕了遠征隊邀請。");
                        }
                    }
                }
                break;
            case 0x51: //離開遠征隊伍 leaving
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null) {
                        if (exped.getLeader() == player.getId()) { //解散遠征隊伍
                            partyService.disbandExped(exped.getId()); //should take care of the rest
                            if (player.getEventInstance() != null) {
                                player.getEventInstance().disbandParty();
                            }
                        } else if (part.getLeaderID() == player.getId()) {
                            partyService.updateParty(part.getPartyId(), PartyOperation.解散隊伍, new MaplePartyCharacter(player));
                            if (player.getEventInstance() != null) {
                                player.getEventInstance().disbandParty();
                            }
                            //發送給還在遠征隊的隊員消息
                            //partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeft(0x4E, player.getName()), null);
                        } else {
                            partyService.updateParty(part.getPartyId(), PartyOperation.離開隊伍, new MaplePartyCharacter(player));
                            if (player.getEventInstance() != null) {
                                player.getEventInstance().leftParty(player);
                            }
                            //發送給還在遠征隊的隊員消息
                            partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeft(true, player.getName()), null);
                        }
                        if (player.getPyramidSubway() != null) {
                            player.getPyramidSubway().fail(c.getPlayer());
                        }
                        player.setParty(null);
                    }
                }
                break;
            case 0x52: //遠征隊伍驅逐 kick [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        int cid = slea.readInt();
                        for (int i : exped.getParties()) {
                            MapleParty par = partyService.getParty(i);
                            if (par != null) {
                                MaplePartyCharacter expelled = par.getMemberById(cid);
                                if (expelled != null) {
                                    partyService.updateParty(i, PartyOperation.驅逐成員, expelled);
                                    if (player.getEventInstance() != null) {
                                        if (expelled.isOnline()) {
                                            player.getEventInstance().disbandParty();
                                        }
                                    }
                                    if (player.getPyramidSubway() != null && expelled.isOnline()) {
                                        player.getPyramidSubway().fail(player);
                                    }
                                    partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeft(false, expelled.getName()), null);
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            case 0x53: //改變遠征隊長 give exped leader [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        MaplePartyCharacter newleader = part.getMemberById(slea.readInt());
                        if (newleader != null) {
                            partyService.updateParty(part.getPartyId(), PartyOperation.改變隊長, newleader);
                            exped.setLeader(newleader.getId());
                            partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionLeaderChanged(0), null);
                        }
                    }
                }
                break;
            case 0x54: //改變小組隊長 give party leader [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        int cid = slea.readInt();
                        for (int i : exped.getParties()) {
                            MapleParty par = partyService.getParty(i);
                            if (par != null) {
                                MaplePartyCharacter newleader = par.getMemberById(cid);
                                if (newleader != null && par.getPartyId() != part.getPartyId()) {
                                    partyService.updateParty(par.getPartyId(), PartyOperation.改變隊長, newleader);
                                }
                            }
                        }
                    }
                }
                break;
            case 0x55: //change party of diff player [partyIndexTo] [cid]
                part = player.getParty();
                if (part != null && part.getExpeditionId() > 0) {
                    MapleExpedition exped = partyService.getExped(part.getExpeditionId());
                    if (exped != null && exped.getLeader() == player.getId()) {
                        int partyIndexTo = slea.readInt();
                        if (partyIndexTo < exped.getType().maxParty && partyIndexTo <= exped.getParties().size()) {
                            int cid = slea.readInt();
                            for (int i : exped.getParties()) {
                                MapleParty par = partyService.getParty(i);
                                if (par != null) {
                                    MaplePartyCharacter expelled = par.getMemberById(cid);
                                    if (expelled != null && expelled.isOnline()) {
                                        MapleCharacter chr = World.getStorage(expelled.getChannel()).getCharacterById(expelled.getId());
                                        if (chr == null) {
                                            break;
                                        }
                                        if (partyIndexTo < exped.getParties().size()) { //already exists
                                            party = partyService.getParty(exped.getParties().get(partyIndexTo));
                                            if (party == null || party.getMemberList().size() >= 6) {
                                                player.dropMessage(5, "Invalid party.");
                                                break;
                                            }
                                        }
                                        partyService.updateParty(i, PartyOperation.驅逐成員, expelled);
                                        if (partyIndexTo < exped.getParties().size()) { //already exists
                                            party = partyService.getParty(exped.getParties().get(partyIndexTo));
                                            if (party != null && party.getMemberList().size() < 6) {
                                                partyService.updateParty(party.getPartyId(), PartyOperation.加入隊伍, expelled);
                                                chr.receivePartyMemberHP();
                                                chr.updatePartyMemberHP();
                                                chr.send(PartyPacket.expeditionStatus(exped, true));
                                            }
                                        } else {
                                            party = partyService.createPartyAndAdd(expelled, exped.getId());
                                            chr.setParty(party);
                                            chr.send(PartyPacket.partyCreated(party));
                                            chr.send(PartyPacket.expeditionStatus(exped, true));
                                            partyService.sendExpedPacket(exped.getId(), PartyPacket.expeditionUpdate(exped.getIndex(party.getPartyId()), party), null);
                                        }
                                        if (player.getEventInstance() != null) {
                                            if (expelled.isOnline()) {
                                                player.getEventInstance().disbandParty();
                                            }
                                        }
                                        if (player.getPyramidSubway() != null) {
                                            player.getPyramidSubway().fail(c.getPlayer());
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            default:
                if (Config.isDevelop()) {
                    System.out.println("未知的遠征隊操作 : 0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(mode).toUpperCase(), '0', 2) + " " + slea);
                }
                break;
        }
    }
}
