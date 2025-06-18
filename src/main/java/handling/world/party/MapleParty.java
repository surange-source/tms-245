package handling.world.party;

import client.MapleCharacter;

import java.util.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * 隊伍
 *
 * @author Ethan
 */
public class MapleParty {

    private final Map<Integer, MaplePartyCharacter> members = new LinkedHashMap<>();
    private int leaderID;
    private int partyId, expeditionLink = -1;
    private boolean disbanded = false;
    private String name = ""; //隊伍的名字
    private boolean hidden = false; //是否隱藏隊伍信息
    private boolean leaderPick = false;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public MapleParty(int partyId, MaplePartyCharacter leader, String partyName, boolean isHidden, boolean leaderPick) {
        this.leaderID = leader.getId();
        this.members.put(this.leaderID, leader);
        this.partyId = partyId;
        this.name = partyName;
        this.hidden = isHidden;
        this.leaderPick = leaderPick;
    }

    public MapleParty(int partyId, MaplePartyCharacter leader, int expeditionLink) {
        this.leaderID = leader.getId();
        this.members.put(this.leaderID, leader);
        this.partyId = partyId;
        this.expeditionLink = expeditionLink;
        this.name = "";
        this.hidden = false;
        this.leaderPick = false;
    }

    public final int getMemberSize() {
        return this.members.size();
    }

    /**
     * 添加隊伍成員
     */
    public void addMember(MaplePartyCharacter member) {
        lock.writeLock().lock();
        try {
            members.put(member.getId(), member);
        } finally {
            lock.writeLock().unlock();
        }
    }

    /**
     * 移除隊伍成員
     */
    public MaplePartyCharacter removeMember(int memID) {
        lock.writeLock().lock();
        try {
            return members.remove(memID);
        } finally {
            lock.writeLock().unlock();
        }
    }

    /**
     * 更新隊伍成員
     */
    public void updateMember(MaplePartyCharacter member) {
        if (member == null) return;
        lock.readLock().lock();
        try {
            MaplePartyCharacter m = members.get(member.getId());
            if (m != null) {
                m.updateInfo(member);
            }
        } finally {
            lock.readLock().unlock();
        }
    }

    /**
     * 通過角色ID獲取1個隊伍成員的信息
     */
    public MaplePartyCharacter getMemberById(int chrId) {
        lock.readLock().lock();
        try {
            return members.get(chrId);
        } finally {
            lock.readLock().unlock();
        }
    }

    /**
     * 隊伍成員全部信息
     */
    public final Map<Integer, MaplePartyCharacter> getMembers() {
        this.lock.readLock().lock();
        try {
            return this.members;
        }
        finally {
            this.lock.readLock().unlock();
        }
    }

    public List<MaplePartyCharacter> getMemberList() {
        List<MaplePartyCharacter> list = new ArrayList<>(getMembers().values());
        list.sort((m1, m2) -> {
            if (m1.getDoorSkill() > 0 && m2.getDoorSkill() == 0) {
                return -1;
            } else {
                return 1;
            }
        });
        return list;
    }

    public final int getMemberSizeOnMap(final int n) {
        this.lock.readLock().lock();
        try {
            int n2 = 0;
            for (MaplePartyCharacter member : this.members.values()) {
                if (member.getChr() != null && member.getMapid() == n) {
                    ++n2;
                }
            }
            return n2;
        }
        finally {
            this.lock.readLock().unlock();
        }
    }

    /*
     * 隊伍的ID
     */
    public int getPartyId() {
        return partyId;
    }

    /*
     * 設置隊伍的ID
     */
    public void setPartyId(int id) {
        this.partyId = id;
    }

    /*
     * 獲取隊長信息
     */
    public MaplePartyCharacter getLeader() {
        lock.readLock().lock();
        try {
            return members.get(leaderID);
        } finally {
            lock.readLock().unlock();
        }
    }

    /*
     * 設置新的隊長
     */
    public void setLeader(int leaderID) {
        this.leaderID = leaderID;
    }

    public int getLeaderID() {
        return leaderID;
    }

    /*
     * 隊伍在遠征中的隊伍ID
     */
    public int getExpeditionId() {
        return expeditionLink;
    }

    /*
     * 隊伍是否解散
     */
    public boolean isDisbanded() {
        return disbanded;
    }

    /*
     * 解散隊伍
     */
    public void disband() {
        this.disbanded = true;
    }

    /*
     * 隊伍的名字
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*
     * 隊伍是否隱藏
     */
    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    /*
     * 隊伍是否隱藏
     */
    public boolean isLeaderPick() {
        return leaderPick;
    }

    public void setLeaderPick(boolean leaderPick) {
        this.leaderPick = leaderPick;
    }

    public int getAverageLevel() {
        lock.readLock().lock();
        try {
            int n2 = 0;
            for (MaplePartyCharacter d2 : members.values()) {
                n2 += d2.getLevel();
            }
            return n2 / members.size();
        } finally {
            lock.readLock().unlock();
        }
    }
}
