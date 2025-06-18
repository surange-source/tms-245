package scripting.event;

import client.MapleCharacter;
import client.MapleQuestStatus;
import client.MapleTraitType;
import client.skills.SkillFactory;
import constants.enums.BroadcastMessageType;
import constants.enums.UserChatMessageType;
import handling.channel.ChannelServer;
import handling.world.WorldPartyService;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import handling.world.party.PartySearch;
import org.apache.logging.log4j.Logger;
import server.MapleItemInformationProvider;
import server.Timer.EventTimer;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.quest.MapleQuest;
import server.squad.MapleSquad;
import packet.MaplePacketCreator;
import tools.Pair;
import packet.MobPacket;
import packet.UIPacket;

import javax.script.ScriptException;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class EventInstanceManager {

    private static final Logger log = EventScriptManager.log;
    private final ReentrantReadWriteLock mutex = new ReentrantReadWriteLock();
    private final Lock rL = mutex.readLock(), wL = mutex.writeLock();
    private final Map<String, Object> values = new HashMap<>();
    private final EventManager em;
    private final int channel;
    private final String name;
    private List<MapleCharacter> chars = new LinkedList<>(); //this is messy
    private List<Integer> dced = new LinkedList<>();
    private List<MapleMonster> mobs = new LinkedList<>();
    private Map<Integer, Integer> killCount = new HashMap<>();
    private Properties props = new Properties();
    private long timeStarted = 0;
    private long eventTime = 0;
    private List<Integer> mapIds = new LinkedList<>();
    private List<Boolean> isInstanced = new LinkedList<>();
    private ScheduledFuture<?> eventTimer;
    private boolean disposed = false, isMapEvent = false, practice = false;
    private int remainingDuration;
    private long remainingStartTime;
    private int eventType;
    private int timeType;
    private int reviveCount = -1;
    private List<ScheduledFuture> scheduledFutureList = new LinkedList<>();

    public EventInstanceManager(EventManager em, String name, int channel) {
        this.em = em;
        this.name = name;
        this.channel = channel;
    }

    public void registerPlayer(MapleCharacter chr) {
        if (disposed || chr == null) {
            return;
        }
        try {
            wL.lock();
            try {
                chars.add(chr);
            } finally {
                wL.unlock();
            }
            chr.setEventInstance(this);
            if (eventTimer != null) {
                showEventTimer(chr, (int) (getTimeLeft() / 1000));
            }
            em.getIv().invokeFunction("playerEntry", this, chr);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : playerEntry.", ex);
        }
    }

    public void changedMap(int mapId) {
        for (MapleCharacter chr : getPlayers()) {
            chr.changeMap(mapId, 0);
        }
    }

    public void changedMap(MapleCharacter chr, int mapid) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("changedMap", this, chr, mapid);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: changedMap.", ex);
        }
    }

    public void enterField(MapleCharacter chr) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("enterField", this, chr);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: enterField.", ex);
        }
    }

    public void timeOut(final long delay) {
        if (disposed) {
            return;
        }
        eventTimer = EventTimer.getInstance().schedule(() -> {
            if (disposed || em == null) {
                return;
            }
            try {
                em.getIv().invokeFunction("scheduledTimeout", this);
            } catch (NoSuchMethodException ex) {
            } catch (ScriptException ex) {
                log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: scheduledTimeout.", ex);
            }
        }, delay);
    }


    public void stopEventTimer() {
        eventTime = 0;
        timeStarted = 0;
        if (eventTimer != null) {
            eventTimer.cancel(false);
            eventTimer = null;
        }
    }

    /**
     * @param duration
     */
    public void startEventTimer(int eventType, int timeType, long duration) {
        try {
            if (disposed) {
                return;
            }
            this.remainingDuration = -1;
            this.remainingStartTime = -1L;
            this.timeStarted = System.currentTimeMillis();
            this.eventTime = duration;
            this.timeType = timeType;
            this.eventType = eventType;
            if (eventTimer != null) {
                eventTimer.cancel(false);
                eventTimer = null;
            }
            int timesend = (int) duration / 1000;
            for (MapleCharacter chr : getPlayers()) {
                this.showEventTimer(chr, timesend);
            }
            timeOut(duration);
        } catch (Exception ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: restartEventTimer.", ex);
        }
    }

    public void restartEventTimer(long duration) {
        stopEventTimer();
        startEventTimer(duration);
    }

    public void showEventTimer(final MapleCharacter chr, final int n) {
        switch (this.eventType) {
            case 3: {
                chr.send(MaplePacketCreator.getClock3(1, n));
            }
            case 2: {
                if (this.timeType == 1) {
                    chr.send(MaplePacketCreator.getClock(this.remainingDuration / 1000));
                    return;
                }
                break;
            }
            case 8: {
                chr.send(MaplePacketCreator.getClock8((int)(this.eventTime - this.getTimeLeft()) / 1000, (int)this.eventTime / 1000));
                break;
            }
            case 6: {
                chr.send(MaplePacketCreator.getClockMillis((int) eventTime));
                break;
            }
            default: {
                if (this.remainingDuration > 0) {
                    chr.send(MaplePacketCreator.getClock40((int)this.getRemainingTime(), this.remainingDuration));
                }
                chr.send(MaplePacketCreator.getClock(n));
                break;
            }
        }
        chr.send(MaplePacketCreator.practiceMode(practice));
    }

    /**
     * @param time
     */
    public void startEventTimer(long time) {
        startEventTimer(0, 2, time); //just incase
    }

    /**
     * @param time
     */
    public void startEventClock(long time) {
        if (disposed) {
            return;
        }
        int timesend = (int) time / 1000;
        for (MapleCharacter chr : getPlayers()) {
            chr.send(MaplePacketCreator.getClock(timesend));
        }
    }


    public void stopEventClock() {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            chr.send(MaplePacketCreator.stopClock());
        }
    }

    /**
     * @return
     */
    public boolean isTimerStarted() {
        return eventTime > 0 && timeStarted > 0;
    }

    /**
     * @return
     */
    public long getTimeLeft() {
        return eventTime - (System.currentTimeMillis() - timeStarted);
    }

    public long getRemainingTime() {
        return this.remainingDuration - (System.currentTimeMillis() - this.remainingStartTime);
    }

    public void setRemainingTimer(final int duration) {
        if (this.disposed) {
            return;
        }
        this.remainingDuration = duration;
        this.remainingStartTime = System.currentTimeMillis();
        if (this.eventTimer != null) {
            this.eventTimer.cancel(false);
            this.eventTimer = null;
        }
        for (MapleCharacter mapleCharacter : this.getPlayers()) {
            this.showEventTimer(mapleCharacter, duration);
        }
        this.timeOut((this.getTimeLeft() > duration) ? ((long)duration) : this.getTimeLeft());
    }

    /**
     * @param party
     * @param map
     */
    public void registerParty(MapleParty party, MapleMap map) {
        registerParty(party, map, 0);
    }

    public void registerParty(MapleParty party, MapleMap map, int questID) {
        if (disposed) {
            return;
        }
        for (MaplePartyCharacter pc : party.getMemberList()) {
            MapleCharacter player = map.getPlayerObject(pc.getId());
            if (player != null && questID > 0) {
                player.getQuestNAdd(MapleQuest.getInstance(questID)).setCustomData(String.valueOf(System.currentTimeMillis()));
            }
            registerPlayer(map.getPlayerObject(pc.getId()));
        }
        PartySearch ps = WorldPartyService.getInstance().getSearch(party);
        if (ps != null) {
            WorldPartyService.getInstance().removeSearch(ps, "開始組隊任務，組隊廣告已被刪除。");
        }
    }

    /*
     * 在活動事件中註銷某個玩家
     */

    /**
     * @param chr
     */

    public void unregisterPlayer(MapleCharacter chr) {
        if (disposed) {
            chr.setEventInstance(null);
            return;
        }
        wL.lock();
        try {
            unregisterPlayer_NoLock(chr);
        } finally {
            wL.unlock();
        }
    }

    private boolean unregisterPlayer_NoLock(MapleCharacter chr) {
        if (name.equals("CWKPQ")) { //hard code it because i said so
            MapleSquad squad = ChannelServer.getInstance(channel).getMapleSquad("CWKPQ");//so fkin hacky
            if (squad != null) {
                squad.removeMember(chr.getName());
                if (squad.getLeaderName().equals(chr.getName())) {
                    em.setProperty("leader", "false");
                }
            }
        }
        chr.setEventInstance(null);
        if (disposed) {
            return false;
        }
        if (chars.contains(chr)) {
            chars.remove(chr);
            return true;
        }
        return false;
    }

    /**
     * @param size
     * @param towarp
     * @return
     */
    public boolean disposeIfPlayerBelow(byte size, int towarp) {
        if (disposed) {
            return true;
        }
        MapleMap map = null;
        if (towarp > 0) {
            map = this.getMapFactory().getMap(towarp);
        }

        wL.lock();
        try {
            if (chars != null && chars.size() <= size) {
                List<MapleCharacter> chrs = new LinkedList<>(chars);
                for (MapleCharacter chr : chrs) {
                    if (chr == null) {
                        continue;
                    }
                    unregisterPlayer_NoLock(chr);
                    if (towarp > 0) {
                        chr.changeMap(map, map.getPortal(0));
                    }
                }
                if (!isMapEvent) {
                    dispose_NoLock();
                }
                return true;
            }
        } catch (Exception ex) {
            log.error("", ex);
        } finally {
            wL.unlock();
        }
        return false;
    }

    /*
     * 保存BOSS任務和給獎勵
     */

    /**
     * @param points
     */

    public void saveBossQuest(int points) {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            MapleQuestStatus record = chr.getQuestNAdd(MapleQuest.getInstance(150001));
            if (record.getCustomData() != null) {
                record.setCustomData(String.valueOf(points + Integer.parseInt(record.getCustomData())));
            } else {
                record.setCustomData(String.valueOf(points)); // First time
            }
            chr.modifyCSPoints(2, points / 5, true);
            chr.getTrait(MapleTraitType.will).addExp(points / 100, chr);
        }
    }

    /*
     * 給參加任務的角色楓點樂豆點
     */

    /**
     * @param points
     */

    public void saveNX(int points) {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            chr.modifyCSPoints(2, points, true);
        }
    }

    /*
     * 獲取參加活動所有角色信息
     */

    /**
     * @return
     */

    public List<MapleCharacter> getPlayers() {
        if (disposed) {
            return Collections.emptyList();
        }
        rL.lock();
        try {
            return new LinkedList<>(chars);
        } finally {
            rL.unlock();
        }
    }

    /**
     * @return
     */
    public List<Integer> getDisconnected() {
        return dced;
    }

    /*
     * 獲取參加活動人數
     */

    /**
     * @return
     */

    public int getPlayerCount() {
        if (disposed) {
            return 0;
        }
        return chars.size();
    }

    public void registerDeadBoundMob(MapleMonster mob, Runnable command, long period) {
        registerMonster(mob);
        mob.setDeadBound(command, period);
    }

    /*
     * 在活動時間中註冊怪物信息
     */

    /**
     * @param mob
     */

    public void registerMonster(MapleMonster mob) {
        if (disposed) {
            return;
        }
        mobs.add(mob);
        mob.setEventInstance(this);
    }

    /*
     * 在活動中取消怪物信息
     * 或者
     * 怪物死亡觸發和刪除這個怪在活動中的信息
     */

    /**
     * @param mob
     */

    public void unregisterMonster(MapleMonster mob) {
        mob.setEventInstance(null);
        if (disposed) {
            return;
        }
        mobs.remove(mob);
        if (mobs.isEmpty()) {
            try {
                em.getIv().invokeFunction("allMonstersDead", this);
            } catch (NoSuchMethodException ex) {
            } catch (ScriptException ex) {
                log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: allMonstersDead.", ex);
            }
        }
    }

    /*
     * 在活動角色死亡觸發事件
     */

    /**
     * @param chr
     */

    public void playerKilled(MapleCharacter chr) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("playerDead", this, chr);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: playerDead.", ex);
        }
    }

    /*
     * 在活動中角色復活觸發事件
     */

    /**
     * @param chr
     * @return
     */

    public boolean revivePlayer(MapleCharacter chr) {
        if (disposed) {
            return false;
        }
        try {
            Object b = em.getIv().invokeFunction("playerRevive", this, chr);
            if (b instanceof Boolean) {
                return (Boolean) b;
            }
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name: playerRevive.", ex);
        }
        return false;
    }

    /*
     * 在活動中角色斷開連接觸發
     */

    /**
     * @param chr
     * @param idz
     */

    public void playerDisconnected(MapleCharacter chr, int idz) {
        if (disposed) {
            return;
        }
        byte ret;
        try {
            ret = ((Double) em.getIv().invokeFunction("playerDisconnected", this, chr)).byteValue();
        } catch (Exception e) {
            ret = 0;
        }

        wL.lock();
        try {
            if (disposed) {
                return;
            }
            if (chr == null || chr.isAlive()) {
                dced.add(idz);
            }
            if (chr != null) {
                unregisterPlayer_NoLock(chr);
            }
            if (ret == 0) {
                if (isMapEvent) {
                    removePlayer(chr);
                } else if (getPlayerCount() <= 0) {
                    dispose_NoLock();
                }
            } else if ((ret > 0 && getPlayerCount() < ret) || (ret < 0 && (isLeader(chr) || getPlayerCount() < (ret * -1)))) {
                List<MapleCharacter> chrs = new LinkedList<>(chars);
                for (MapleCharacter player : chrs) {
                    if (player.getId() != idz) {
                        removePlayer(player);
                    }
                }
                if (!isMapEvent) {
                    dispose_NoLock();
                }
            }
        } catch (Exception ex) {
            log.error("", ex);
        } finally {
            wL.unlock();
        }
    }

//    public final void registerCarnivalParty(final MapleCharacter leader, final MapleMap map, final byte team) {
//        if (disposed) {
//            return;
//        }
//        leader.clearCarnivalRequests();
//        List<MapleCharacter> characters = new LinkedList<>();
//        final MapleParty party = leader.getParty();
//
//        if (party == null) {
//            return;
//        }
//        for (MaplePartyCharacter pc : party.getMembers()) {
//            final MapleCharacter c = map.getCharacterById(pc.getId());
//            if (c != null) {
//                characters.add(c);
//                registerPlayer(c);
//                c.resetCP();
//            }
//        }
//        PartySearch ps = World.Party.getSearch(party);
//        if (ps != null) {
//            World.Party.removeSearch(ps, "The Party Listing has been removed because the Party Quest started.");
//        }
//        final MapleCarnivalParty carnivalParty = new MapleCarnivalParty(leader, characters, team);
//        try {
//            em.getIv().invokeFunction("registerCarnivalParty", this, carnivalParty);
//        } catch (Exception ex) {
//            System.out.println("Event name" + em.getName() + ", instance name: " + name + ", method Name : registerCarnivalParty:\n" + ex);
//        }
//    }

    /**
     * 活動中角色殺死怪物觸發事件
     *
     * @param chr
     * @param mob
     */
    public void monsterKilled(MapleCharacter chr, MapleMonster mob) {
        if (disposed) {
            return;
        }
        try {
            int inc = (int) em.getIv().invokeFunction("monsterValue", this, mob.getId());
            if (disposed || chr == null) {
                return;
            }
            Integer kc = killCount.get(chr.getId());
            if (kc == null) {
                kc = inc;
            } else {
                kc += inc;
            }
            killCount.put(chr.getId(), kc);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name" + em.getName() + ", instance name: " + name + ", method name: monsterValue.", ex);
        }
        try {
            em.getIv().invokeFunction("monsterKilled", this, chr, mob.getId());
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name" + em.getName() + ", instance name: " + name + ", method name: monsterKilled.", ex);
        }
    }

    /*
     * 在活動中怪物攻擊觸發
     */

    /**
     * @param chr
     * @param mob
     * @param damage
     */

    public void monsterDamaged(MapleCharacter chr, MapleMonster mob, long damage) {
        if (disposed || chr == null) { //幽靈船船長ghost PQ boss only.
            return;
        }
        try {
            em.getIv().invokeFunction("monsterDamaged", this, chr, mob.getId(), damage);
        } catch (NoSuchMethodException ignore) {
        } catch (Exception ex) {
            log.error("Event name: " + (em == null ? "null" : em.getName() + ".js") + ", instance name: " + name + ", method name: monsterValue.", ex);
        }
    }

    /**
     * 怪物掉落道具
     *
     * @param chr
     * @param mob
     */
    public void monsterDrop(final MapleCharacter chr, final MapleMonster mob) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("monsterDrop", this, chr, mob);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + (em == null ? "null" : em.getName() + ".js") + ", instance name: " + name + ", method name: monsterDrop.", ex);
        }
    }

    /**
     * @param chr
     * @param score
     */
    public void addPVPScore(MapleCharacter chr, int score) {
        if (disposed) { //ghost PQ boss only.
            return;
        }
        try {
            em.getIv().invokeFunction("addPVPScore", this, chr, score);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + (em == null ? "null" : em.getName() + ".js") + ", instance name: " + name + ", method name: monsterValue.", ex);
        }
    }

    /*
     * 獲取角色在活動中殺怪數量
     */

    /**
     * @param chr
     * @return
     */

    public int getKillCount(MapleCharacter chr) {
        if (disposed) {
            return 0;
        }
        Integer kc = killCount.get(chr.getId());
        if (kc == null) {
            return 0;
        } else {
            return kc;
        }
    }

    /*
     * 清除活動事件
     */


    public void dispose_NoLock() {
        if (disposed || em == null) {
            return;
        }
        String emName = em.getName();
        try {
            for (MapleCharacter chr : chars) {
                removePlayer(chr);
                chr.setEventInstance(null);
            }
            chars.clear();
            chars = null;
            disposed = true;
            if (mobs.size() >= 1) {
                for (MapleMonster mob : mobs) {
                    if (mob != null) {
                        mob.setEventInstance(null);
                    }
                }
            }
            mobs.clear();
            mobs = null;
            killCount.clear();
            killCount = null;
            values.clear();
            dced.clear();
            dced = null;
            stopEventTimer();
            props.clear();
            props = null;
            for (int i = 0; i < mapIds.size(); i++) {
                MapleMap map = this.getMapFactory().getMap(mapIds.get(i));
                if (map != null && map.getEvent() == this) {
                    map.setEvent(null);
                }
                if (isInstanced.get(i)) {
                    this.getMapFactory().removeInstanceMap(mapIds.get(i));
                }
            }
            mapIds.clear();
            mapIds = null;
            isInstanced.clear();
            isInstanced = null;
            em.disposeInstance(name);
            for (ScheduledFuture sc : scheduledFutureList) {
                if (!sc.isDone() && !sc.isCancelled()) {
                    sc.cancel(true);
                }
            }
            scheduledFutureList.clear();
        } catch (Exception e) {
            log.error("Caused by : " + emName + " instance name: " + name + " method: dispose.", e);
        }
    }


    public void dispose() {
        wL.lock();
        try {
            dispose_NoLock();
        } finally {
            wL.unlock();
        }
    }

    /**
     * @return
     */
    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    /**
     * @return
     */
    public List<MapleMonster> getMobs() {
        return mobs;
    }

    /**
     * @param type
     * @param msg
     */
    public void broadcastPlayerMsg(int type, String msg) {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            chr.dropMessage(type, msg);
        }
    }

    //PVP

    /**
     * @return
     */
    public List<Pair<Integer, String>> newPair() {
        return new ArrayList<>();
    }

    /**
     * @param e
     * @param e1
     * @param e2
     */
    public void addToPair(List<Pair<Integer, String>> e, int e1, String e2) {
        e.add(new Pair<>(e1, e2));
    }

    /**
     * @return
     */
    public List<Pair<Integer, MapleCharacter>> newPair_chr() {
        return new ArrayList<>();
    }

    /**
     * @param e
     * @param e1
     * @param e2
     */
    public void addToPair_chr(List<Pair<Integer, MapleCharacter>> e, int e1, MapleCharacter e2) {
        e.add(new Pair<>(e1, e2));
    }

    /**
     * @param packet
     */
    public void broadcastPacket(byte[] packet) {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            chr.send(packet);
        }
    }

    /**
     * @param packet
     * @param team
     */
    public void broadcastTeamPacket(byte[] packet, int team) {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            if (chr.getTeam() == team) {
                chr.send(packet);
            }
        }
    }

    public void environmentChange(final String env, final int mode) {
        if (disposed) {
            return;
        }
        for (MapleCharacter chr : getPlayers()) {
            chr.send(MaplePacketCreator.environmentChange(env, mode));
        }
    }

    public final void addInstanceMap(final int mapid) {
        if (disposed) {
            return;
        }
        mapIds.add(mapid);
        isInstanced.add(true);
    }

    /*
     * 創建1個新的地圖模版
     * int mapid, - 地圖ID
     * boolean respawns, - 是否刷新怪物
     * boolean npcs, - 是否有NPC
     * boolean reactors, - 是否有反應堆
     * int instanceid - 分配的ID
     */

    /**
     * @param mapid
     * @return
     */

    public MapleMap createInstanceMap(int mapid) {
        if (disposed) {
            return null;
        }
        int assignedid = EventScriptManager.getNewInstanceMapId();
        mapIds.add(assignedid);
        isInstanced.add(true);
        return this.getMapFactory().CreateInstanceMap(mapid, true, true, true, assignedid);
    }

    /*
     * 創建1個新的地圖模版
     * int mapid, - 地圖ID
     * boolean respawns, - 是否刷新怪物
     * boolean npcs, - 是否有NPC
     * boolean reactors, - 是否有反應堆
     * int instanceid - 分配的ID
     */

    /**
     * @param mapid
     * @return
     */

    public MapleMap createInstanceMapS(int mapid) {
        if (disposed) {
            return null;
        }
        int assignedid = EventScriptManager.getNewInstanceMapId();
        mapIds.add(assignedid);
        isInstanced.add(true);
        return this.getMapFactory().CreateInstanceMap(mapid, false, false, false, assignedid);
    }

    /*
     * gets instance map from the channelserv
     * 從頻道中獲取地圖
     */

    /**
     * @param mapid
     * @return
     */

    public MapleMap setInstanceMap(int mapid) {
        if (disposed) {
            return this.getMapFactory().getMap(mapid);
        }
        mapIds.add(mapid);
        isInstanced.add(false);
        return this.getMapFactory().getMap(mapid);
    }

    public MapleMap setAutoInstanceMap(int mapid) {
        MapleMap map = this.getMapFactory().getMap(mapid);
        if (disposed || map == null) {
            return map;
        }
        mapIds.add(mapid);
        isInstanced.add(false);
        isMapEvent = true;
        map.setEvent(this);
        for (MapleCharacter chr : map.getCharacters()) {
            if (!chars.contains(chr)) {
                registerPlayer(chr);
            }
        }
        try {
            em.getIv().invokeFunction("startAutoInstance", this, map);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : startAutoInstance.", ex);
        }
        return map;
    }

    /**
     * @return
     */
    public MapleMapFactory getMapFactory() {
        return getChannelServer().getMapFactory();
    }

    public MapleMap getMapFactoryMap(int mapid) {
        return getMapFactory().getMap(mapid);
    }

    /**
     * @param args
     * @return
     */
    public MapleMap getMapInstance(int args) {
        if (disposed) {
            return null;
        }
        try {
            boolean instanced = false;
            int trueMapID;
            if (args >= mapIds.size()) {
                trueMapID = args;
                MapleMap instance;
                for (int i = 0; i < mapIds.size(); i++) {
                    instance = getMapFactory().getInstanceMap(mapIds.get(i));
                    if (instance != null && instance.getId() == trueMapID) {
                        trueMapID = mapIds.get(i);
                        instanced = isInstanced.get(i);
                        break;
                    }
                }
            } else {
                trueMapID = mapIds.get(args);
                instanced = isInstanced.get(args);
            }
            MapleMap map;
            if (instanced) {
                map = getMapFactory().getInstanceMap(trueMapID);
            } else {
                map = getMapFactory().getMap(trueMapID);
            }
            if (map == null) {
                return null;
            }
            if (map.getCharactersSize() == 0 && em.getProperty("shuffleReactors") != null && em.getProperty("shuffleReactors").equals("true")) {
                map.shuffleReactors();
            }
            return map;
        } catch (Exception ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method Name : getMapInstance", ex);
            return null;
        }
    }

    /**
     * @param methodName
     * @param delay
     */
    public ScheduledFuture schedule(final String methodName, final long delay) {
        if (disposed) {
            return null;
        }
        Iterator<ScheduledFuture> iterator = scheduledFutureList.iterator();
        while (iterator.hasNext()) {
            ScheduledFuture sc = iterator.next();
            if (sc.isDone() || sc.isCancelled()) {
                iterator.remove();
            }
        }
        ScheduledFuture scheduled = EventTimer.getInstance().schedule(() -> {
            if (disposed || em == null) {
                return;
            }
            try {
                em.getIv().invokeFunction(methodName, EventInstanceManager.this);
            } catch (Exception ex) {
                log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : " + methodName + ":\n", ex);
            }
        }, delay);
        scheduledFutureList.add(scheduled);
        return scheduled;
    }

    /**
     * @param methodName
     * @param delay
     * @param player
     */
    public ScheduledFuture schedule(final String methodName, final long delay, final MapleCharacter player) {
        if (disposed) {
            return null;
        }
        Iterator<ScheduledFuture> iterator = scheduledFutureList.iterator();
        while (iterator.hasNext()) {
            ScheduledFuture sc = iterator.next();
            if (sc.isDone() || sc.isCancelled()) {
                iterator.remove();
            }
        }
        ScheduledFuture scheduled = EventTimer.getInstance().schedule(() -> {
            if (disposed || em == null) {
                return;
            }
            try {
                em.getIv().invokeFunction(methodName, EventInstanceManager.this, player);
            } catch (Exception ex) {
                log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : " + methodName + ".", ex);
            }
        }, delay);
        scheduledFutureList.add(scheduled);
        return scheduled;
    }

    public ScheduledFuture schedule(Runnable command, long delay) {
        if (disposed) {
            return null;
        }
        Iterator<ScheduledFuture> iterator = scheduledFutureList.iterator();
        while (iterator.hasNext()) {
            ScheduledFuture sc = iterator.next();
            if (sc.isDone() || sc.isCancelled()) {
                iterator.remove();
            }
        }
        ScheduledFuture scheduled = EventTimer.getInstance().schedule(command, delay);
        scheduledFutureList.add(scheduled);
        return scheduled;
    }

    /**
     * @return
     */
    public String getName() {
        return name;
    }

    public void setProperty(String key, long value) {
        setProperty(key, String.valueOf(value));
    }

    /**
     * @param key
     * @param value
     */
    public void setProperty(String key, String value) {
        if (disposed) {
            return;
        }
        props.setProperty(key, value);
    }

    /**
     * @param key
     * @param value
     * @param prev
     * @return
     */
    public Object setProperty(String key, String value, boolean prev) {
        if (disposed) {
            return null;
        }
        return props.setProperty(key, value);
    }

    /**
     * @param key
     * @return
     */
    public String getProperty(String key) {
        if (disposed) {
            return "";
        }
        return props.getProperty(key);
    }

    /**
     * @return
     */
    public Properties getProperties() {
        return props;
    }

    public final void setObjectProperty(final Object obj1, final Object obj2) {
        if (disposed) {
            return;
        }
        props.put(obj1, obj2);
    }

    public final Object getObjectProperty(final Object obj) {
        if (disposed) {
            return null;
        }
        return props.get(obj);
    }

    /*
     * 離開隊伍觸發
     */

    /**
     * @param chr
     */

    public void leftParty(MapleCharacter chr) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("leftParty", this, chr);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : leftParty.", ex);
        }
    }

    /*
     * 解散隊伍觸發
     */


    public void disbandParty() {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("disbandParty", this);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : disbandParty.", ex);
        }
    }

    //Separate function to warp players to a "finish" map, if applicable


    public void finishPQ() {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("clearPQ", this);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : clearPQ.", ex);
        }
    }

    /*
     * 角色退出時觸發
     */

    /**
     * @param chr
     */

    public void removePlayer(MapleCharacter chr) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("playerExit", this, chr);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : playerExit.", ex);
        }
    }

    /**
     * @param chr
     */
    public void onMapLoad(MapleCharacter chr) {
        if (disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("onMapLoad", this, chr);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : onMapLoad:\n", ex);
        }
    }

    public void pickUpItem(MapleCharacter player, int itemID) {
        if (this.disposed) {
            return;
        }
        try {
            em.getIv().invokeFunction("pickUpItem", this, player, itemID);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + em.getName() + ", instance name: " + name + ", method name : pickUpItem.", ex);
        }
    }

    /**
     * @param chr
     * @return
     */
    public boolean isLeader(MapleCharacter chr) {
        return (chr != null && chr.getParty() != null && chr.getParty().getLeaderID() == chr.getId());
    }

    /*
     * 用任務ID來記錄是否進行過BOSS遠征任務
     */

    /**
     * @param squad
     * @param map
     * @param questID
     */

    public void registerSquad(MapleSquad squad, MapleMap map, int questID) {
        if (disposed) {
            return;
        }
        int mapid = map.getId();
        for (String chr : squad.getMembers()) {
            MapleCharacter player = squad.getChar(chr);
            if (player != null && player.getMapId() == mapid) {
                if (questID > 0) {
                    player.getQuestNAdd(MapleQuest.getInstance(questID)).setCustomData(String.valueOf(System.currentTimeMillis()));
                }
                registerPlayer(player);
                if (player.getParty() != null) {
                    PartySearch ps = WorldPartyService.getInstance().getSearch(player.getParty());
                    if (ps != null) {
                        WorldPartyService.getInstance().removeSearch(ps, "開始組隊任務，組隊廣告已被刪除。");
                    }
                }
            }
        }
        squad.setStatus((byte) 2);
        squad.getBeginMap().broadcastMessage(MaplePacketCreator.stopClock());
    }

    /*
     * 用SQL來記錄是否進行過BOSS遠征任務
     */

    /**
     * @param squad
     * @param map
     * @param bossid
     */

    public void registerSquad(MapleSquad squad, MapleMap map, String bossid) {
        if (disposed) {
            return;
        }
        int mapid = map.getId();
        for (String chr : squad.getMembers()) {
            MapleCharacter player = squad.getChar(chr);
            if (player != null && player.getMapId() == mapid) {
                if (bossid != null) {
                    player.setBossLog(bossid);
                }
                registerPlayer(player);
                if (player.getParty() != null) {
                    PartySearch ps = WorldPartyService.getInstance().getSearch(player.getParty());
                    if (ps != null) {
                        WorldPartyService.getInstance().removeSearch(ps, "開始組隊任務，組隊廣告已被刪除。");
                    }
                }
            }
        }
        squad.setStatus((byte) 2); //設置活動開始
        squad.getBeginMap().broadcastMessage(MaplePacketCreator.stopClock());
    }

    /*
     * 檢測角色是否在活動中的斷開列表中
     */

    /**
     * @param chr
     * @return
     */

    public boolean isDisconnected(MapleCharacter chr) {
        return !disposed && (dced.contains(chr.getId()));
    }

    /*
     * 刪除角色在活動中斷開列表中的信息
     */

    /**
     * @param id
     */

    public void removeDisconnected(int id) {
        if (disposed) {
            return;
        }
        if (dced.contains(id)) {
            dced.remove(id);
        }
    }

    /**
     * @return
     */
    public EventManager getEventManager() {
        return em;
    }

    /**
     * @param chr
     * @param id
     */
    public void applyBuff(MapleCharacter chr, int id) {
        MapleItemInformationProvider.getInstance().getItemEffect(id).applyTo(chr);
        chr.send(UIPacket.getStatusMsg(id));
    }

    /**
     * @param chr
     * @param id
     */
    public void applySkill(MapleCharacter chr, int id) {
        SkillFactory.getSkill(id).getEffect(1).applyTo(chr);
    }

//    public void displayNode(MapleMonster monster, MapleCharacter player) {
//        if (monster != null) {
//            monster.switchController(player, false);
//            player.getClient().announce(n.a(monster, player.getMap()));
//        }
//    }

    public void EventGainNX() {
        if (this.disposed) {
            return;
        }
        int averlevel = getAverlevel();
        for (MapleCharacter player : this.getPlayers()) {
            player.modifyCSPoints(1, averlevel / 250 * 1000, true);
        }
    }

    public int getAverlevel() {
        int ret = 0;
        for (MapleCharacter player : this.getPlayers()) {
            ret += player.getLevel();
        }
        return ret / this.getPlayers().size();
    }

    public Map<String, Object> getValues() {
        return values;
    }

    public void setPQLog(String log) {
        getPlayers().parallelStream().forEach(p -> p.setPQLog(log));
    }

    public void setEventCount(String log) {
        getPlayers().parallelStream().forEach(p -> p.setEventCount(log));
    }

    public void sendMarriedDone() {
        this.broadcastPacket(MaplePacketCreator.sendMarriedDone());
    }

    public void showEffect(String effect) {
        getPlayers().parallelStream().forEach(p -> p.getClient().announce(MaplePacketCreator.showEffect(effect)));
    }

    public void updateInfoQuest(int questid, String data) {
        getPlayers().parallelStream().forEach(p -> p.updateInfoQuest(questid, data));
    }

    public void updateOneInfo(int questid, String key, String info) {
        getPlayers().parallelStream().forEach(p -> p.updateOneInfo(questid, key, info));
    }

    public void broadcastWeatherEffectNotice(final String s, final int n, final int n2) {
        this.broadcastPacket(UIPacket.showWeatherEffectNotice(s, n, n2, true));
    }

    public void broadcastScriptProgressMessage(final String s) {
        this.broadcastPacket(UIPacket.getTopMsg(s));
    }

    public int getAllItemNumber(int itemId) {
        if (this.disposed) {
            return 0;
        }
        int n2 = 0;
        for (MapleCharacter chr : this.getPlayers()) {
            n2 += chr.getItemQuantity(itemId);
        }
        return n2;
    }

    public void removeAllItem(int itemId) {
        if (this.disposed) {
            return;
        }
        for (MapleCharacter chr : this.getPlayers()) {
            chr.removeAll(itemId);
        }
    }

    public void setMonsterEscortInfo(MapleMonster mob, MapleCharacter player) {
        if (mob != null) {
            mob.switchController(player);
            player.getClient().announce(MobPacket.MobRequestResultEscortInfo(mob, player.getMap()));
        }
    }

    public void broadcastDropMessage(int type, String msg) {
        UserChatMessageType cType = UserChatMessageType.getByType(type);
        if (cType == null && type < -2) {
            type = -1;
        }
        switch (type) {
            case -1: {
                this.broadcastPacket(MaplePacketCreator.serverNotice(BroadcastMessageType.EVENT, msg));
            }
            case -2: {
                this.broadcastPacket(UIPacket.getTopMsg(msg));
            }
            default: {
                if (type >= 0) {
                    this.broadcastPacket(MaplePacketCreator.spouseMessage(cType, msg));
                }
            }
        }
    }


    public boolean isMapEvent() {
        return isMapEvent;
    }

    public boolean isPractice() {
        return practice;
    }

    public void setPractice(boolean b) {
        if (practice != b) {
            practice = b;
            for (MapleCharacter chr : chars) {
                chr.send(MaplePacketCreator.practiceMode(practice));
            }
        }
    }

    public int getReviveCount() {
        return reviveCount;
    }

    public void setReviveCount(int reviveCount) {
        this.reviveCount = reviveCount;
    }

    public void restReviveCount() {
        this.reviveCount = -1;
    }
}
