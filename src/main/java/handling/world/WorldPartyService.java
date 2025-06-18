/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.world;

import client.MapleCharacter;
import client.inventory.Item;
import constants.enums.UserChatMessageType;
import database.DatabaseConnectionEx;
import handling.auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.PlayerStorage;
import handling.world.party.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.MaplePacketCreator;
import packet.PartyPacket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * @author admin
 */
public class WorldPartyService {

    private static final Logger log = LogManager.getLogger(WorldPartyService.class);
    private final Map<Integer, MapleParty> partyList;
    private final Map<Integer, MapleExpedition> expedsList;
    private final Map<PartySearchType, List<PartySearch>> searcheList;
    private final AtomicInteger runningPartyId;
    private final AtomicInteger runningExpedId;
    private final ReentrantReadWriteLock lock;

    private WorldPartyService() {
        log.info("正在啟動[WorldPartyService]");
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET party = -1, fatigue = 0");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("更新角色組隊為-1失敗...", e);
        }
        lock = new ReentrantReadWriteLock();
        runningPartyId = new AtomicInteger(1);
        runningExpedId = new AtomicInteger(1);
        partyList = new HashMap<>();
        expedsList = new HashMap<>();
        searcheList = new EnumMap<>(PartySearchType.class);
        for (PartySearchType pst : PartySearchType.values()) {
            searcheList.put(pst, new ArrayList<>()); //according to client, max 10, even though theres page numbers ?!
        }
    }

    public static WorldPartyService getInstance() {
        return SingletonHolder.instance;
    }

    /*
     * 組隊聊天
     */
    public void partyChat(int partyId, String chatText, String nameFrom, Item item) {
        partyChat(partyId, chatText, nameFrom, 1, item);
    }

    /*
     * 遠征聊天
     */
    public void expedChat(int expedId, String chatText, String nameFrom, Item item) {
        MapleExpedition expedition = getExped(expedId);
        if (expedition == null) {
            return;
        }
        for (int i : expedition.getParties()) {
            partyChat(i, chatText, nameFrom, 4, item);
        }
    }

    /*
     * 發送遠征隊封包
     */
    public void sendExpedPacket(int expedId, byte[] packet, MaplePartyCharacter exception) {
        MapleExpedition expedition = getExped(expedId);
        if (expedition == null) {
            return;
        }
        for (int i : expedition.getParties()) {
            sendPartyPacket(i, packet, exception);
        }
    }

    /*
     * 發送組隊封包
     */
    public void sendPartyPacket(int partyId, byte[] packet, MaplePartyCharacter exception) {
        MapleParty party = getParty(partyId);
        if (party == null) {
            return;
        }
        for (MaplePartyCharacter partychar : party.getMemberList()) {
            int ch = WorldFindService.getInstance().findChannel(partychar.getName());
            if (ch > 0 && (exception == null || partychar.getId() != exception.getId())) {
                MapleCharacter player = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(partychar.getName());
                if (player != null) {
                    player.getClient().announce(packet);
                }
            }
        }
    }

    /*
     * 組隊聊天
     */
    public void partyChat(int partyId, String chatText, String nameFrom, int mode, Item item) {
        MapleParty party = getParty(partyId);
        if (party == null) {
            return;
        }
        for (MaplePartyCharacter partychar : party.getMemberList()) {
            int ch = WorldFindService.getInstance().findChannel(partychar.getName());
            if (ch > 0) {
                MapleCharacter player = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(partychar.getName());
                if (player != null && !player.getName().equalsIgnoreCase(nameFrom)) {
                    if (item == null) {
                        player.getClient().announce(MaplePacketCreator.multiChat(nameFrom, chatText, mode));
                    } else {
                        player.getClient().announce(MaplePacketCreator.multiItemChat(nameFrom, chatText, mode, item));
                    }
                    if (player.getClient().isMonitored()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.spouseMessage(UserChatMessageType.方塊洗洗樂, "[GM消息] " + nameFrom + " said to " + player.getName() + " (組隊): " + chatText));
                    }
                }
            }
        }
    }

    /*
     * 發送組隊隊伍信息
     */
    public void partyMessage(int partyId, String chatText) {
        MapleParty party = getParty(partyId);
        if (party == null) {
            return;
        }
        for (MaplePartyCharacter partychar : party.getMemberList()) {
            int ch = WorldFindService.getInstance().findChannel(partychar.getName());
            if (ch > 0) {
                MapleCharacter player = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(partychar.getName());
                if (player != null) {
                    player.dropMessage(5, chatText);
                }
            }
        }
    }

    /*
     * 發送遠征隊伍信息
     */
    public void expedMessage(int expedId, String chatText) {
        MapleExpedition expedition = getExped(expedId);
        if (expedition == null) {
            return;
        }
        for (int i : expedition.getParties()) {
            partyMessage(i, chatText);
        }
    }

    /*
     * 更新隊伍信息設置信息
     */
    public void updatePartySetup(int partyId, PartyOperation operation, String partyName, boolean isHidden, boolean leaderPick) {
        MapleParty party = getParty(partyId);
        if (party == null) {
            System.out.println("no party with the specified partyid exists.");
            return;
        }
        party.setName(partyName);
        party.setHidden(isHidden);
        party.setLeaderPick(leaderPick);
        if (party.getMemberList().size() <= 0) { //當隊伍中沒有玩家 就解散這個隊伍
            disbandParty(partyId);
        }
        for (MaplePartyCharacter partychar : party.getMemberList()) {
            if (partychar == null) {
                continue;
            }
            int ch = WorldFindService.getInstance().findChannel(partychar.getName());
            if (ch > 0) {
                MapleCharacter chr = getStorage(ch).getCharacterByName(partychar.getName());
                if (chr != null) {
                    chr.setParty(party);
                    chr.send(PartyPacket.updateParty(chr.getClient().getChannel(), party, operation, null));
                }
            }
        }
    }

    /*
     * 更新隊伍信息
     */
    public void updateParty(int partyId, PartyOperation operation, MaplePartyCharacter target) {
        MapleParty party = getParty(partyId);
        if (party == null) {
            System.out.println("no party with the specified partyid exists.");
            return;
        }
        int oldExped = party.getExpeditionId(); //遠征隊ID
        int oldIndex = -1; //遠征隊小組ID
        if (oldExped > 0) {
            MapleExpedition exped = getExped(oldExped);
            if (exped != null) {
                oldIndex = exped.getIndex(partyId);
            }
        }
        switch (operation) {
            case 加入隊伍:
                party.addMember(target);
                if (party.getMemberList().size() >= 6) {
                    PartySearch toRemove = getSearchByParty(partyId);
                    if (toRemove != null) {
                        removeSearch(toRemove, "隊伍人數已滿，組隊廣告已被刪除。");
                    } else if (party.getExpeditionId() > 0) {
                        MapleExpedition exped = getExped(party.getExpeditionId());
                        if (exped != null && exped.getAllMembers() >= exped.getType().maxMembers) {
                            toRemove = getSearchByExped(exped.getId());
                            if (toRemove != null) {
                                removeSearch(toRemove, "隊伍人數已滿，組隊廣告已被刪除。");
                            }
                        }
                    }
                }
                break;
            case 驅逐成員:
            case 離開隊伍:
                party.removeMember(target.getId());
                break;
            case 解散隊伍:
                disbandParty(partyId);
                break;
            case 更新隊伍:
            case LOG_ONOFF:
                party.updateMember(target);
                break;
            case 改變隊長:
            case CHANGE_LEADER_DC:
                party.setLeader(target.getId());
                break;
            default:
                throw new RuntimeException("Unhandeled updateParty operation " + operation.name());
        }
        if (operation == PartyOperation.離開隊伍 || operation == PartyOperation.驅逐成員) {
            int chz = WorldFindService.getInstance().findChannel(target.getName());
            if (chz > 0) {
                MapleCharacter player = getStorage(chz).getCharacterByName(target.getName());
                if (player != null) {
                    player.setParty(null);
                    if (oldExped > 0) {
                        player.getClient().announce(PartyPacket.expeditionMessage(false));
                    }
                    player.getClient().announce(PartyPacket.updateParty(player.getClient().getChannel(), party, operation, target));
                }
            }
            if (target.getId() == party.getLeaderID() && party.getMemberList().size() > 0) { //pass on lead
                MaplePartyCharacter lchr = null;
                for (MaplePartyCharacter pchr : party.getMemberList()) {
                    if (pchr != null && (lchr == null || lchr.getLevel() < pchr.getLevel())) {
                        lchr = pchr;
                    }
                }
                if (lchr != null) {
                    updateParty(partyId, PartyOperation.CHANGE_LEADER_DC, lchr);
                }
            }
        }
        if (party.getMemberList().size() <= 0) { //當隊伍中沒有玩家 就解散這個隊伍
            disbandParty(partyId);
        }
        for (MaplePartyCharacter partychar : party.getMemberList()) {
            if (partychar == null) {
                continue;
            }
            int ch = WorldFindService.getInstance().findChannel(partychar.getName());
            if (ch > 0) {
                MapleCharacter chr = getStorage(ch).getCharacterByName(partychar.getName());
                if (chr != null) {
                    if (operation == PartyOperation.解散隊伍) { //解散遠征隊伍
                        chr.setParty(null);
                        if (oldExped > 0) {
                            chr.send(PartyPacket.expeditionMessage(true));
                        }
                    } else {
                        chr.setParty(party);
                    }
                    chr.send(PartyPacket.updateParty(chr.getClient().getChannel(), party, operation, target));
                }
            }
        }
        if (oldExped > 0) {
            sendExpedPacket(oldExped, PartyPacket.expeditionUpdate(oldIndex, party), operation == PartyOperation.LOG_ONOFF || operation == PartyOperation.更新隊伍 ? target : null);
        }
    }

    /*
     * 創建隊伍
     */
    public MapleParty createParty(MaplePartyCharacter chrfor) {
        return createParty(chrfor, "快去組隊遊戲吧，GoGo", false, false);
    }

    public MapleParty createParty(MaplePartyCharacter chrfor, String partyName, boolean isHidden, boolean leaderPick) {
        MapleParty party = new MapleParty(runningPartyId.getAndIncrement(), chrfor, partyName, isHidden, leaderPick);
        partyList.put(party.getPartyId(), party);
        return party;
    }

    /*
     * 創建遠征隊伍
     */
    public MapleParty createParty(MaplePartyCharacter chrfor, int expedId) {
        ExpeditionType ex = ExpeditionType.getById(expedId);
        MapleParty party = new MapleParty(runningPartyId.getAndIncrement(), chrfor, ex != null ? runningExpedId.getAndIncrement() : -1);
        partyList.put(party.getPartyId(), party);
        if (ex != null) {
            MapleExpedition expedition = new MapleExpedition(ex, chrfor.getId(), party.getExpeditionId());
            expedition.getParties().add(party.getPartyId());
            expedsList.put(party.getExpeditionId(), expedition);
        }
        return party;
    }

    public MapleParty createPartyAndAdd(MaplePartyCharacter chrfor, int expedId) {
        MapleExpedition expedition = getExped(expedId);
        if (expedition == null) {
            return null;
        }
        MapleParty party = new MapleParty(runningPartyId.getAndIncrement(), chrfor, expedId);
        partyList.put(party.getPartyId(), party);
        expedition.getParties().add(party.getPartyId());
        return party;
    }

    /*
     * 通過組隊ID獲取隊伍信息
     */
    public MapleParty getParty(int partyId) {
        return partyList.get(partyId);
    }

    /*
     * 通過隊長ID來獲取隊伍信息
     */
    public MapleParty getPartyByLeaderId(int leaderId) {
        lock.readLock().lock();
        try {
            for (MapleParty party : partyList.values()) {
                if (party != null && party.getLeaderID() == leaderId) {
                    return party;
                }
            }
        } finally {
            lock.readLock().unlock();
        }
        return null;
    }

    public MapleExpedition getExped(int partyId) {
        return expedsList.get(partyId);
    }

    /*
     * 解散遠征隊伍
     */
    public MapleExpedition disbandExped(int partyId) {
        PartySearch toRemove = getSearchByExped(partyId);
        if (toRemove != null) {
            removeSearch(toRemove, "遠征隊解散，組隊廣告已被刪除。");
        }
        MapleExpedition ret = expedsList.remove(partyId);
        if (ret != null) {
            for (int p : ret.getParties()) {
                MapleParty pp = getParty(p);
                if (pp != null) {
                    updateParty(p, PartyOperation.解散隊伍, pp.getLeader());
                }
            }
        }
        return ret;
    }

    /*
     * 解散隊伍
     */
    public MapleParty disbandParty(int partyId) {
        PartySearch toRemove = getSearchByParty(partyId);
        if (toRemove != null) {
            removeSearch(toRemove, "組隊解散，組隊廣告已被刪除。");
        }
        MapleParty ret = partyList.remove(partyId);
        if (ret == null) {
            return null;
        }
        if (ret.getExpeditionId() > 0) {
            MapleExpedition expedition = getExped(ret.getExpeditionId());
            if (expedition != null) {
                int index = expedition.getIndex(partyId);
                if (index >= 0) {
                    expedition.getParties().remove(index);
                    sendExpedPacket(expedition.getId(), PartyPacket.expeditionUpdate(index, null), null);
                }
            }
        }
        ret.disband();
        return ret;
    }

    /*
     * 組隊廣告
     */
    public List<PartySearch> searchParty(PartySearchType pst) {
        return searcheList.get(pst);
    }

    /*
     * 刪除組隊廣告
     */
    public void removeSearch(PartySearch ps, String text) {
        List<PartySearch> ss = searcheList.get(ps.getType());
        if (ss.contains(ps)) {
            ss.remove(ps);
            ps.cancelRemoval();
            if (ps.getType().exped) {
                expedMessage(ps.getId(), text);
                sendExpedPacket(ps.getId(), PartyPacket.removePartySearch(ps), null);
            } else {
                partyMessage(ps.getId(), text);
                sendPartyPacket(ps.getId(), PartyPacket.removePartySearch(ps), null);
            }
        }
    }

    /*
     * 添加組隊廣告
     */
    public void addSearch(PartySearch ps) {
        searcheList.get(ps.getType()).add(ps);
    }

    /*
     * 通過隊伍信息來獲取組隊廣告
     */
    public PartySearch getSearch(MapleParty party) {
        for (List<PartySearch> ps : searcheList.values()) {
            for (PartySearch p : ps) {
                if ((p.getId() == party.getPartyId() && !p.getType().exped) || (p.getId() == party.getExpeditionId() && p.getType().exped)) {
                    return p;
                }
            }
        }
        return null;
    }

    /*
     * 通過隊伍ID來獲取組隊廣告
     */
    public PartySearch getSearchByParty(int partyId) {
        for (List<PartySearch> ps : searcheList.values()) {
            for (PartySearch p : ps) {
                if (p.getId() == partyId && !p.getType().exped) {
                    return p;
                }
            }
        }
        return null;
    }

    /*
     * 通過遠征ID來獲取組隊廣告
     */
    public PartySearch getSearchByExped(int partyId) {
        for (List<PartySearch> ps : searcheList.values()) {
            for (PartySearch p : ps) {
                if (p.getId() == partyId && p.getType().exped) {
                    return p;
                }
            }
        }
        return null;
    }

    /*
     * 檢測組隊是否已經有組隊廣告
     */
    public boolean partyListed(MapleParty party) {
        return getSearchByParty(party.getPartyId()) != null;
    }

    public PlayerStorage getStorage(int channel) {
        if (channel == -20) {
            return AuctionServer.getInstance().getPlayerStorage();
        } else if (channel == -10) {
            return CashShopServer.getPlayerStorage();
        }
        return ChannelServer.getInstance(channel).getPlayerStorage();
    }

    private static class SingletonHolder {

        protected static final WorldPartyService instance = new WorldPartyService();
    }
}
