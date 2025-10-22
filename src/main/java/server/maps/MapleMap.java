package server.maps;

import client.*;
import client.inventory.*;
import client.skills.KSPsychicSkillEntry;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.stat.DeadDebuff;
import configs.ServerConfig;
import constants.*;
import constants.enums.FieldEffectType;
import constants.enums.UserChatMessageType;
import constants.skills.*;
import database.DatabaseConnectionEx;
import handling.channel.ChannelServer;
import handling.channel.ChannelServer.ChannelType;
import handling.login.JobType;
import handling.world.PartyOperation;
import handling.world.WorldBroadcastService;
import handling.world.party.ExpeditionType;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.*;
import scripting.defaults.event.EliteBoss;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.map.MapScriptMethods;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.SpeedRunner;
import server.Timer.EtcTimer;
import server.Timer.MapTimer;
import server.events.MapleDojoAgent;
import server.life.*;
import server.life.MapleMonster.AttackerEntry;
import server.maps.MapleNodes.DirectionInfo;
import server.maps.MapleNodes.MapleNodeInfo;
import server.maps.MapleNodes.MaplePlatform;
import server.maps.MapleNodes.MonsterPoint;
import server.quest.MapleQuest;
import server.Randomizer;
import server.squad.MapleSquad;
import server.squad.MapleSquadType;
import tools.*;
import tools.types.*;

import java.awt.Point;
import java.awt.Rectangle;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;

public class MapleMap {

    protected static final Logger log = LogManager.getLogger("MapleMap");
    /*
     * Holds mappings of OID -> MapleMapObject separated by MapleMapObjectType.
     * Please acquire the appropriate lock when reading and writing to the
     * LinkedHashMaps. The MapObjectType Maps themselves do not need to
     * synchronized in any way since they should never be modified.
     */
    private final Map<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> mapobjects;
    private final Map<MapleMapObjectType, ReentrantReadWriteLock> mapobjectlocks;
    private final Lock runningOidLock = new ReentrantLock();
    private final List<Integer> hideNpc = new ArrayList<>();
    private final List<Spawns> monsterSpawn = new ArrayList<>();
    private final AtomicInteger runningOid = new AtomicInteger(500000);
    private final AtomicInteger spawnedMonstersOnMap = new AtomicInteger(0);
    private final AtomicInteger spawnedForcesOnMap = new AtomicInteger(0);
    private final AtomicInteger spawnedAffectedAreaOnMap = new AtomicInteger(0);
    private final Map<Integer, MaplePortal> portals = new HashMap<>();
    private final Map<Integer, Map<Integer, List<Pair<Integer, Integer>>>> kspsychicObjects = new LinkedHashMap<>();
    private final ReentrantReadWriteLock kspsychicLock = new ReentrantReadWriteLock();
    private final Map<Integer, Integer> ksultimates = new LinkedHashMap<>();
    private final float monsterRate;
    private final int channel;
    private final int mapid;
    private final List<Integer> dced = new ArrayList<>();
    private MapleFootholdTree footholds = null;
    private float recoveryRate;
    private MapleMapEffect mapEffect;
    private short decHP = 0, createMobInterval = 7000, top = 0, bottom = 0, left = 0, right = 0;
    private int consumeItemCoolTime = 0;
    private int protectItem = 0;
    private int decHPInterval = 10000;
    private int returnMapId;
    private int timeLimit;
    private int fieldLimit;
    private int maxRegularSpawn = 0;
    private int fixedMob;
    private int forcedReturnMap = 999999999;
    private int instanceid = -1;
    private int lvForceMove = 0;
    private int lvLimit = 0;
    private int qrLimit = 0;
    private int permanentWeather = 0;
    private int partyBonusRate = 0;
    private boolean town, clock, personalShop, miniMapOnOff, everlast = false, dropsDisabled = false, gDropsDisabled = false,
            soaring = false, squadTimer = false, isSpawns = true, checkStates = true;
    private String onUserEnter, onFirstUserEnter, speedRunLeader = "";
    private List<Point> spawnPoints = new ArrayList<>();
    private ScheduledFuture<?> squadSchedule;
    private long speedRunStart = 0, lastSpawnTime = 0, lastHurtTime = 0;
    private MapleNodes nodes;
    private MapleSquadType squad;
    private Map<Integer, MapleSwordNode> swordNodes;
    private long spawnRuneTime = 0;
    private int fieldType;
    private boolean entrustedFishing;
    private Map<Integer, Pair<String, Point>> objTag = new HashMap<>();
    private Map<String, Point> lacheln = new HashMap<>();
    private List<Pair<String, Point>> syncFH = new ArrayList<>();
    private final ReentrantLock mobControllerLock = new ReentrantLock();
    private List<TaggedObjRegenInfo> taggedObjRegenInfo = new ArrayList<>();
    private List<FieldAttackObjInfo> fieldAttackObjInfo = new ArrayList<>();
    private ReentrantLock objectMoveLock = new ReentrantLock();
    private int decHPr;
    private List<Rectangle> randRect = new ArrayList<>();
    private AtomicInteger butterflyCount = new AtomicInteger(0);
    private int limitMobID;
    private int eliteCount;
    private int eliteBossCount;
    private int darkEliteCount;
    private String mapMark;
    private int decMobIntervalR = 0;
    private Map<String, Integer> incSpawnMob = new HashMap<>();
    private Map<String, Integer> eachIncSpawnMob = new HashMap<>();
    private int runeCurseStage = 0;
    private Pair<Integer, Triple<String, String, String>> dynamicObj = null;
    private int breakTimeFieldStep = -1;
    private long breakTimeFieldTime = 0;
    private long breakTimeFieldLastTime = 0;
    private int ownerId = -1;
    private long ownerStartTime = 0;
    public List<MapleQuickMove> QUICK_MOVE;
    private List<String> areaCtrls;
    private int barrier, barrierArc, barrierAut = 0;
    private Map<Integer, Map<Integer, SpecialChairTW>> specialChairTWs;
    private int fieldLevel = -1;
    private EventInstanceManager event = null;
    private int areaBroadcastMobId = -1;

    public MapleMap(int mapid, int channel, int returnMapId, float monsterRate) {
        this.mapid = mapid;
        this.channel = channel;
        this.returnMapId = returnMapId;
        if (this.returnMapId == 999999999) {
            this.returnMapId = mapid;
        }
        if (GameConstants.getPartyPlay(mapid) > 0) {
            this.monsterRate = (monsterRate - 1.0f) * 2.5f + 1.0f;
        } else {
            this.monsterRate = monsterRate;
        }
        EnumMap<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> objsMap = new EnumMap<>(MapleMapObjectType.class);
        EnumMap<MapleMapObjectType, ReentrantReadWriteLock> objlockmap = new EnumMap<>(MapleMapObjectType.class);
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            objsMap.put(type, new LinkedHashMap<>());
            objlockmap.put(type, new ReentrantReadWriteLock());
        }
        mapobjects = Collections.unmodifiableMap(objsMap);
        mapobjectlocks = Collections.unmodifiableMap(objlockmap);
        startMapEffect();
    }

    public int getFieldType() {
        return fieldType;
    }

    public void setFieldType(int fieldType) {
        this.fieldType = fieldType;
    }

    public void setFixedMob(int fm) {
        this.fixedMob = fm;
    }

    public int getForceMove() {
        return lvForceMove;
    }

    public void setForceMove(int fm) {
        this.lvForceMove = fm;
    }

    public int getLevelLimit() {
        return lvLimit;
    }

    public void setLevelLimit(int fm) {
        this.lvLimit = fm;
    }

    public int getQuestLimit() {
        return qrLimit;
    }

    public void setQuestLimit(int fm) {
        this.qrLimit = fm;
    }

    public void setSoaring(boolean b) {
        this.soaring = b;
    }

    public boolean canSoar() {
        return soaring;
    }

    public void toggleDrops() {
        this.dropsDisabled = !dropsDisabled;
    }

    public void setDrops(boolean b) {
        this.dropsDisabled = b;
    }

    public void toggleGDrops() {
        this.gDropsDisabled = !gDropsDisabled;
    }

    public int getId() {
        return mapid;
    }

    public MapleMap getReturnMap() {
        ChannelServer channelServer = ChannelServer.getInstance(channel);
        return channelServer == null ? null : channelServer.getMapFactory().getMap(returnMapId);
    }

    public int getReturnMapId() {
        return returnMapId;
    }

    public void setReturnMapId(int rmi) {
        this.returnMapId = rmi;
    }

    public int getForcedReturnId() {
        return forcedReturnMap;
    }

    public MapleMap getForcedReturnMap() {
        ChannelServer channelServer = ChannelServer.getInstance(channel);
        return channelServer == null ? null : channelServer.getMapFactory().getMap(forcedReturnMap);
    }

    public void setForcedReturnMap(int map) {
        this.forcedReturnMap = map;
    }

    public float getRecoveryRate() {
        return recoveryRate;
    }

    public void setRecoveryRate(float recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public int getFieldLimit() {
        return fieldLimit;
    }

    public void setFieldLimit(int fieldLimit) {
        this.fieldLimit = fieldLimit;
    }

    public void setCreateMobInterval(short createMobInterval) {
        this.createMobInterval = createMobInterval;
    }

    public void setTimeLimit(int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public String getMapName() {
        return MapleMapFactory.getMapName(mapid);
    }

    public String getStreetName() {
        return MapleMapFactory.getMapStreetName(mapid);
    }

    public String getFirstUserEnter() {
        return onFirstUserEnter;
    }

    public void setFirstUserEnter(String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public String getUserEnter() {
        return onUserEnter;
    }

    public void setUserEnter(String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public boolean hasClock() {
        return clock;
    }

    public void setClock(boolean hasClock) {
        this.clock = hasClock;
    }

    public boolean isTown() {
        return town;
    }

    public void setTown(boolean town) {
        this.town = town;
    }

    public boolean allowPersonalShop() {
        return personalShop;
    }

    public void setPersonalShop(boolean personalShop) {
        this.personalShop = personalShop;
    }

    public boolean getEverlast() {
        return everlast;
    }

    public void setEverlast(boolean everlast) {
        this.everlast = everlast;
    }

    public int getDecHP() {
        return decHP;
    }

    public void setDecHP(int delta) {
        if (delta > 0 || mapid == 749040100) { //隱藏地圖 - 純淨雪人棲息地
            lastHurtTime = System.currentTimeMillis();
        }
        decHP = (short) delta;
    }

    public int getDecHPInterval() {
        return decHPInterval;
    }

    public void setDecHPInterval(int delta) {
        decHPInterval = delta;
    }

    public int getProtectItem() {
        return protectItem;
    }

    public void setProtectItem(int delta) {
        this.protectItem = delta;
    }

    public boolean isNpcHide(int npcID) {
        return hideNpc.contains(npcID);
    }

    public void addHideNpc(int npcID) {
        hideNpc.add(npcID);
    }

    public boolean isMiniMapOnOff() {
        return miniMapOnOff;
    }

    public void setMiniMapOnOff(boolean on) {
        this.miniMapOnOff = on;
    }

    public List<Point> getSpawnPoints() {
        return spawnPoints;
    }

    public void setSpawnPoints(List<Point> Points) {
        this.spawnPoints = Points;
    }

    public List<MapleMapObject> getCharactersAsMapObjects() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Collections.singletonList(MapleMapObjectType.PLAYER));
    }

    public int getCurrentPartyId() {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (chr.getParty() != null) {
                    return chr.getParty().getPartyId();
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return -1;
    }

    /**
     * 添加對像到地圖
     *
     * @param mapobject 地圖對像
     */
    public void addMapObject(MapleMapObject mapobject) {
        if (mapobject == null) {
            return;
        }
        runningOidLock.lock();
        try {
            if (mapobject.getObjectId() == 0) {
                mapobject.setObjectId(runningOid.getAndIncrement());
            }
        } finally {
            runningOidLock.unlock();
        }
        mapobjectlocks.get(mapobject.getType()).writeLock().lock();
        try {
            mapobjects.get(mapobject.getType()).put(mapobject.getObjectId(), mapobject);
            if (mapobject.getType() == MapleMapObjectType.MONSTER) {
                spawnedMonstersOnMap.incrementAndGet();
            }
        } finally {
            mapobjectlocks.get(mapobject.getType()).writeLock().unlock();
        }
        try {
            if (mapobject.getType() == MapleMapObjectType.SUMMON && mapobject instanceof MapleSummon) {
                MapleSummon summon = (MapleSummon) mapobject;
                if (summon != null && summon.getSkillId() == 80011261) {
                    MapleCharacter chr = summon.getOwner();
                    Equip eq = null;
                    if (chr != null) {
                        for (Item item : chr.getInventory(MapleInventoryType.EQUIPPED).listById(1202193)) {
                            eq = (Equip) item;
                            break;
                        }
                    }
                    int incSpawnMobR = 50;
                    decMobIntervalR = 50;
                    if (chr != null && (eq == null || eq.isMvpEquip())) {
                        int eachIncSpawnMobR;
                        int enhanceNum = 0;
                        boolean forever;
                        if (eq == null) {
                            enhanceNum = 1;
                            incSpawnMobR = 60;
                            eachIncSpawnMobR = 15;
                            decMobIntervalR = 50;
                        } else if ((!(forever = eq.getExpiration() < 0) && !chr.isSilverMvp()) || eq.getStarForceLevel() < 15) {
                            enhanceNum = 2;
                            incSpawnMobR = 70;
                            eachIncSpawnMobR = 20;
                            decMobIntervalR = 60;
                        } else if ((!forever && !chr.isGoldMvp()) || eq.getStarForceLevel() < 20) {
                            enhanceNum = 15;
                            incSpawnMobR = 80;
                            eachIncSpawnMobR = 30;
                            decMobIntervalR = 70;
                        } else if ((!forever && !chr.isDiamondMvp()) || eq.getStarForceLevel() < 25) {
                            enhanceNum = 20;
                            incSpawnMobR = 90;
                            eachIncSpawnMobR = 40;
                            decMobIntervalR = 80;
                        } else {
                            enhanceNum = 25;
                            incSpawnMobR = 100;
                            eachIncSpawnMobR = 50;
                            decMobIntervalR = 100;
                        }
                        if (enhanceNum > 0) {
                            chr.dropSpouseMessage(UserChatMessageType.系統, "MVP" + (enhanceNum == 1 ? "消耗型" : "") + "輪迴碑石" + (enhanceNum > 2 ? ("[" + enhanceNum + "★]") : "") + "效果啟動，怪物重生時間-" + decMobIntervalR + "% 最大怪物量+" + incSpawnMobR + "% 單次生怪量 +" + eachIncSpawnMobR + "%");
                        }
                        setEachIncSpawnMobR("輪迴", eachIncSpawnMobR);
                    }
                    setIncSpawnMobR("輪迴", incSpawnMobR);
                }
            }
        } finally {
        }
    }

    /**
     * 召喚並添加對像到當前範圍地圖
     */
    private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery) {
        addMapObject(mapobject);

        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (chr.getPosition().distance(mapobject.getPosition()) <= mapobject.getRange()) {
                    packetbakery.sendPackets(chr.getClient());
                    chr.addVisibleMapObjectEx(mapobject);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    private void spawnAndAddRangedMapObject(final MapleMapObject mapobject) {
        this.addMapObject(mapobject);
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (chr.getPosition().distance(mapobject.getPosition()) <= mapobject.getRange()) {
                    chr.addVisibleMapObject(mapobject);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    /**
     * 移除地圖對像
     *
     * @param obj 地圖對像
     */
    public void removeMapObject(MapleMapObject obj) {
        mapobjectlocks.get(obj.getType()).writeLock().lock();
        try {
            MapleMapObject object = mapobjects.get(obj.getType()).remove(obj.getObjectId());
            if (object == obj && object.getType() == MapleMapObjectType.MONSTER) {
                spawnedMonstersOnMap.decrementAndGet();
            }
        } finally {
            mapobjectlocks.get(obj.getType()).writeLock().unlock();
        }
        try {
            if (obj instanceof MapleSummon) {
                MapleSummon summon = (MapleSummon) obj;
                if (summon.getSkillId() == 80011261) {
                    removeIncSpawnMobR("輪迴");
                    removeEachIncSpawnMobR("輪迴");
                    decMobIntervalR = 0;
                }
            }
            if (obj instanceof MapleAffectedArea) {
                MapleAffectedArea area = (MapleAffectedArea) obj;
                if (area.isNeedHandle()) {
                    for (MapleCharacter chr : getCharacters()) {
                        area.handleEffect(chr, -2);
                        area.handleMonsterEffect(this, -2);
                    }
                }
            }
        } finally {
        }
    }

    public void removeRangedMapObject(MapleMapObject obj) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (chr.isMapObjectVisible(obj)) {
                    chr.removeVisibleMapObject(obj);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    public Point calcPointBelow(Point initial) {
        MapleFoothold fh = footholds.findBelow(initial);
        if (fh == null) {
            return new Point(initial);
        }
        int dropY = fh.getY1();
        int x = initial.x;
        if (!fh.isWall() && fh.getY1() != fh.getY2()) {
            double s1 = Math.abs(fh.getY2() - fh.getY1());
            double s2 = Math.abs(fh.getX2() - fh.getX1());
            double s5 = Math.cos(Math.atan(s2 / s1)) * (Math.abs(x - fh.getX1()) / Math.cos(Math.atan(s1 / s2)));
            if (fh.getY2() < fh.getY1()) {
                dropY = fh.getY1() - (int) s5;
            } else {
                dropY = fh.getY1() + (int) s5;
            }
        }
        if (x < this.left + 30) {
            x = this.left + 30;
        }
        if (x > this.right - 30) {
            x = this.right - 30;
        }
        return new Point(x, dropY);
    }

    public Point calcDropPos(Point initial, Point fallback) {
        Point ret = calcPointBelow(new Point(initial.x, initial.y - 50));
        if (ret == null) {
            return fallback;
        }
        return ret;
    }

    public void dropFromMonster(MapleCharacter chr, MapleMonster mob, int delay, boolean instanced, boolean steal) {
        if (mob == null || chr == null || ChannelServer.getInstance(channel) == null || dropsDisabled || mob.dropsDisabled() || chr.getPyramidSubway() != null || ServerConfig.WORLD_BANDROPITEM) { //no drops in pyramid ok? no cash either
            return;
        }
        if ((event != null && event.isPractice()) || (chr.getEventInstance() != null && chr.getEventInstance().isPractice())) {
            return;
        }
//        //當地圖道具數量達到 300 自動清理掉落在地圖上的道具
//        int maxSize = 200;
//        if (!instanced && maxSize >= 300 && mapobjects.get(MapleMapObjectType.ITEM).size() >= maxSize) {
//            removeDropsDelay();
//            if (chr.isAdmin()) {
//                dropDebugMessage(1, "[系統提示] 當前地圖的道具數量達到 " + maxSize + " 系統已自動清理掉所有地上的物品信息.");
//            }
//        }
        if (ServerConfig.TESPIA && ServerConfig.MULTIPLAYER_TEST) {
            if (chr.getMap() == null || chr.getMap().getMapObjectsInRange(chr.getPosition(), chr.getRange(), Collections.singletonList(MapleMapObjectType.PLAYER)).size() < 2) {
                chr.dropMessage(-1, "由於需要測試多人BUG, 測試服必須附近有其他玩家才會掉寶。");
                if (!chr.isIntern()) {
                    return;
                }
            }
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        byte droptype = (byte) (mob.getStats().isExplosiveReward() ? 3 : mob.getStats().isPublicReward() ? 2 : chr.getParty() != null ? 1 : 0);
        int mobpos = mob.getPosition().x;
        int curseRate = 100 - (chr != null && chr.getRuneUseCooldown() > 0 ? 0 : getRuneCurseRate());
        DeadDebuff deadDebuff = DeadDebuff.getDebuff(chr, -1);
        if (deadDebuff != null) {
            curseRate = Math.max(0, curseRate - deadDebuff.DecDropR);
        }
        float mesoServerRate = ChannelServer.getInstance(channel).getMesoRate() * curseRate / 100.0f; //楓幣爆率
        float dropServerRate = ChannelServer.getInstance(channel).getDropRate() * curseRate / 100.0f; //物品爆率
        float globalServerRate = ChannelServer.getInstance(channel).getDropgRate() * curseRate / 100.0f; //特殊數據庫道具爆率
        Item idrop;
        byte d = 1;
        Point pos = new Point(0, mob.getPosition().y);
        MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
        List<MonsterDropEntry> drops = new ArrayList<>(mi.retrieveDrop(mob.getId()));
        // 無掉寶資料的怪物添加楓幣掉落
        if (drops.isEmpty()) {
            mi.addMeso(mob, drops);
        }
        // 等級範圍怪物
        if (Math.abs(mob.getMobLevel() - chr.getLevel()) <= 20) {
            drops.addAll(mi.retrieveDrop(9101025));
        }
        // 菁英怪物
        if (mob.isEliteMob()) {
            drops.addAll(mi.retrieveDrop(9101067));
        }
        // 菁英BOSS
        if (mob.getEliteType() == 2) {
            drops.addAll(mi.retrieveDrop(9101064));
        }
        // 燃燒地圖怪物
        if (mob.getMap() != null && mob.getMap().getBreakTimeFieldStep() > 0 && !mob.isBoss()) {
            drops.addAll(mi.retrieveDrop(9101114));
        }
        // 星力怪物
        if (mob.getMap() != null && mob.getMap().getBarrier() > 0 && !mob.isBoss()) {
            drops.addAll(mi.retrieveDrop(9101084));
        }

        List<MapleCharacter> attackers = new LinkedList<>();
        for (AttackerEntry ae : mob.getAttackers()) {
            if (ae == null) {
                continue;
            }
            for (int cid : ae.getAttackers()) {
                MapleCharacter character = getPlayerObject(cid);
                if (character != null) {
                    attackers.add(character);
                }
            }
        }

        boolean mesoDropped = false;
        boolean pointDropped = false;
        if (drops.size() > 0) {
            Collections.shuffle(drops);
            for (MonsterDropEntry de : drops) {
                if (!de.channels.isEmpty() && !de.channels.contains(getChannel())) {
                    continue;
                }
                if (de.itemId != -1 && de.itemId == mob.getStolen()) {
                    continue;
                }
                List<MapleCharacter> rewardChrs = new LinkedList<>();
                if (de.onlySelf) {
                    rewardChrs = new LinkedList<>(attackers);
                }
                if (rewardChrs.isEmpty()) {
                    rewardChrs.add(chr);
                }
                for (MapleCharacter character : rewardChrs) {
                    int finalDropR = (int) (de.chance * dropServerRate * character.getDropMod() * character.getStat().getDropBuff() / 100);

                    if (Randomizer.nextInt(999999) < finalDropR) {
                        if (mesoDropped && droptype != 3 && de.itemId == 0) { //not more than 1 sack of meso
                            continue;
                        }
                        if (de.itemId / 10000 == 238) { // 去掉怪物寶怪物卡 && !mob.getStats().isBoss() && character.getMonsterBook().getLevelByCard(ii.getCardMobId(de.itemId)) >= 2
                            continue;
                        }
                        if (droptype == 3) {
                            pos.x = mobpos + (d % 2 == 0 ? 40 * (d + 1) / 2 : -(40 * d / 2));
                        } else {
                            pos.x = mobpos + (d % 2 == 0 ? 20 * (d + 1) / 2 : -(20 * d / 2));
                        }
                        if (de.itemId == 0) { // meso
                            int mesos = Randomizer.nextInt(1 + Math.abs(de.maximum - de.minimum)) + de.minimum;
                            if (mesos > 0) {
                                int meso = (int) (mesos * character.getStat().getMesoBuff() / 100.0 * character.getDropMod() * mesoServerRate);
                                if (character.isAdmin()) {
                                    character.dropDebugMessage(1, "[怪物掉落] 楓幣 " + meso + " dropRate：" + finalDropR / 10000.0 + "%");
                                }
                                spawnMobMesoDrop(meso, calcDropPos(pos, mob.getPosition()), mob, character, false, droptype, delay);
                                mesoDropped = true;
                                d++;
                            }
                        } else if (de.itemId < 0) {
                            pointDropped = true;

                            int level = mob.getMobLevel();
                            // 怪物等級低於ServerConfig.mobPointMinLv不掉落點數
                            if (level < ServerConfig.mobPointMinLv || de.itemId < -3) {
                                continue;
                            }
                            int point = Randomizer.rand(de.minimum, de.maximum);
                            if (character.isAdmin()) {
                                character.dropDebugMessage(1, "[怪物掉落] " + (de.itemId == -1 ? "樂豆" : de.itemId == -2 ? "楓葉點數" : "里程") + " " + point + "點 dropRate：" + finalDropR / 10000.0 + "%");
                            }

                            spawnMobPointDrop(Math.abs(de.itemId), point, calcDropPos(pos, mob.getPosition()), mob, character, false, droptype, delay);
                        } else {
                            if (ItemConstants.getInventoryType(de.itemId, false) == MapleInventoryType.EQUIP) {
                                idrop = ii.randomizeStats(ii.getEquipById(de.itemId));
                                if (Randomizer.isSuccess(30) && !ii.isCash(de.itemId)) {
                                    NirvanaFlame.randomState((Equip) idrop, 0);
                                }
                            } else {
                                int range = Math.abs(de.maximum - de.minimum);
                                idrop = new Item(de.itemId, (byte) 0, (short) (de.maximum != 1 ? Randomizer.nextInt(range <= 0 ? 1 : range) + de.minimum : 1), 0);
                            }
                            if (de.period > 0) {
                                long period = de.period;
                                if (period < 1000) {
                                    period *= 24 * 60 * 60 * 1000L;
                                }
                                idrop.setExpiration(System.currentTimeMillis() + period);
                            }
                            idrop.setGMLog("怪物掉落: " + mob.getId() + " 地圖: " + mapid + " 時間: " + DateUtil.getCurrentDate());
                            if (ItemConstants.isNoticeItem(de.itemId)) {
                                broadcastMessage(MaplePacketCreator.serverNotice(6, "[掉寶提示] 玩家 " + character.getName() + " 在 " + character.getMap().getMapName() + " 殺死 " + mob.getStats().getName() + " 掉落道具 " + ii.getName(de.itemId)));
                            }
                            if (character.isAdmin()) {
                                character.dropDebugMessage(1, "[怪物掉落] " + idrop + " dropRate：" + finalDropR / 10000.0 + "%");
                            }
                            final MapleMapItem mdrop = new MapleMapItem(idrop, calcDropPos(pos, mob.getPosition()), mob, character, droptype, false, de.questid);
                            if (de.onlySelf) {
                                mdrop.setOnlySelfID(character.getId());
                            }
                            spawnMobDrop(mdrop, mob, character);
                            d++;
                        }
                    }
                }
            }
        }
        List<MonsterGlobalDropEntry> globalEntry = new ArrayList<>(mi.getGlobalDrop());
        Collections.shuffle(globalEntry);
        // Global Drops
        for (MonsterGlobalDropEntry de : globalEntry) {
            if (!de.channels.isEmpty() && !de.channels.contains(getChannel())) {
                continue;
            }
            if (de.minMobLevel > 0 && de.minMobLevel > mob.getMobLevel()) {
                continue;
            }
            if (de.maxMobLevel > 0 && de.maxMobLevel < mob.getMobLevel()) {
                continue;
            }
            if (de.chance == 0) { //如果爆率為0 就直接跳過
                continue;
            }
            List<MapleCharacter> rewardChrs = new LinkedList<>();
            if (de.onlySelf) {
                rewardChrs = new LinkedList<>(attackers);
            }
            if (rewardChrs.isEmpty()) {
                rewardChrs.add(chr);
            }
            for (MapleCharacter character : rewardChrs) {
                int finalDropR = (int) (de.chance * globalServerRate);
                if (Randomizer.nextInt(999999) < finalDropR && (de.continent < 0 || de.continent < 10 && mapid / 100000000 == de.continent || de.continent < 100 && mapid / 10000000 == de.continent || de.continent < 1000 && mapid / 1000000 == de.continent)) {
                    if (!gDropsDisabled) {
                        if (mesoDropped && droptype != 3 && de.itemId == 0) { //not more than 1 sack of meso
                            continue;
                        }
                        if (droptype == 3) {
                            pos.x = mobpos + (d % 2 == 0 ? 40 * (d + 1) / 2 : -(40 * d / 2));
                        } else {
                            pos.x = mobpos + (d % 2 == 0 ? 20 * (d + 1) / 2 : -(20 * d / 2));
                        }
                        if (de.itemId == 0) {
                            int mesos = Randomizer.nextInt(1 + Math.abs(de.Maximum - de.Minimum)) + de.Minimum;
                            if (mesos > 0) {
                                int meso = (int) (mesos * character.getStat().getMesoBuff() / 100.0 * character.getDropMod() * mesoServerRate);
                                if (character.isAdmin()) {
                                    character.dropDebugMessage(1, "[全域怪物掉落] 楓幣 " + meso + " dropRate：" + finalDropR / 10000.0 + "%");
                                }
                                spawnMobMesoDrop(meso, calcDropPos(pos, mob.getPosition()), mob, character, false, droptype, delay);
                                mesoDropped = true;
                                d++;
                            }
                        } else if (de.itemId < 0) {
                            if (pointDropped) {
                                continue;
                            }

                            int level = mob.getMobLevel();
                            // 怪物等級低於ServerConfig.mobPointMinLv不掉落點數
                            if (level < ServerConfig.mobPointMinLv || de.itemId < -3) {
                                continue;
                            }
                            int point = Randomizer.rand(de.Minimum, de.Maximum);
                            if (character.isAdmin()) {
                                character.dropDebugMessage(1, "[全域怪物掉落] " + (de.itemId == -1 ? "樂豆" : de.itemId == -2 ? "楓葉點數" : "里程") + " " + point + "點 dropRate：" + finalDropR / 10000.0 + "%");
                            }

                            spawnMobPointDrop(Math.abs(de.itemId), point, calcDropPos(pos, mob.getPosition()), mob, character, false, droptype, delay);
                        } else {
                            if (ItemConstants.getInventoryType(de.itemId, false) == MapleInventoryType.EQUIP) {
                                idrop = ii.randomizeStats(ii.getEquipById(de.itemId));
                                if (Randomizer.isSuccess(30) && !ii.isCash(de.itemId)) {
                                    NirvanaFlame.randomState((Equip) idrop, 0);
                                }
                            } else {
                                idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum : 1), 0);
                            }
                            if (de.period > 0) {
                                long period = de.period;
                                if (period < 1000) {
                                    period *= 24 * 60 * 60 * 1000L;
                                }
                                idrop.setExpiration(System.currentTimeMillis() + period);
                            }
                            idrop.setGMLog("怪物掉落: " + mob.getId() + " 地圖: " + mapid + " (Global) 時間: " + DateUtil.getCurrentDate());
                            if (ItemConstants.isNoticeItem(de.itemId)) {
                                broadcastMessage(MaplePacketCreator.serverNotice(6, "[掉寶提示] 玩家 " + character.getName() + " 在 " + character.getMap().getMapName() + " 殺死 " + mob.getStats().getName() + " 掉落道具 " + ii.getName(de.itemId)));
                            }
                            if (character.isAdmin()) {
                                character.dropDebugMessage(1, "[全域怪物掉落] " + idrop + " dropRate：" + finalDropR / 10000.0 + "%");
                            }
                            final MapleMapItem mdrop = new MapleMapItem(idrop, calcDropPos(pos, mob.getPosition()), mob, character, droptype, false, de.questid);
                            if (de.onlySelf) {
                                mdrop.setOnlySelfID(character.getId());
                            }
                            spawnMobDrop(mdrop, mob, character);
                            d++;
                        }
                    }
                }
            }
        }
    }

    public void monsterSelfDestruct(final MapleMonster monster) {
        monster.setHp(0L);
        this.killMonster(monster, null, false, false, (byte) 2, 0);
    }

    public void killMonster(MapleMonster monster) { // For mobs with removeAfter
        if (monster == null) {
            return;
        }
        this.killMonster(monster, null, false, false, (byte) 1, 0);

    }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean unRevives, byte animation, final int lastSkill) {
//        if (Config.isDevelop() || chr != null && chr.isAdmin()) {
//            log.info("[KillMonster] id：" + monster.getId() + " oid:" + monster.getObjectId(), new Throwable());
//        }
        if (monster.getId() == 8820014) { //皮卡啾 pb sponge, kills pb(w) first before dying
            killMonster(8820000); //皮卡啾
        } else if (monster.getId() == 8820304) { //混沌皮卡啾
            killMonster(8820100); //混沌皮卡啾
        }
//        } else if (monster.getId() == 9300166) { //炸彈 ariant pq bomb
//            animation = 2; //or is it 3?
//        } else if (monster.getId() == 9101083 || monster.getId() == 8880000 || monster.getId() == 8880002) {  //梅格耐斯
//            if (chr.getQuestStatus(1463) == 1) {
//                chr.dropMessage(-1, "由於梅格耐斯死亡時施放出的能量，不再受到古瓦洛的力量的影響。");
//                MapleQuestStatus quest = chr.getQuest(MapleQuest.getInstance(1463));
//                quest.setCustomData("001");
//                chr.updateQuest(quest);
//            }
//        }
        monster.setAnimation(animation);
        if (!unRevives) {
            monster.spawnRevives();
        }

        if (animation == 1 && chr != null && chr.getLevel() >= getFieldLevel() - 20) {
            // 符文輪處理
            if (chr.getRuneUseCooldown() <= 0 && !ServerConfig.RUNE_CLOSE) {
                respawnRune();
            }
            boolean randomPortalSpawned = false;
            // 賞金獵人處理
            if (!chr.isBountyHunterCoolDown()) {
                long cooltime = 5000;
                if (Randomizer.isSuccess(30)) {
                    randomPortalSpawned = spawnRandomPortal(chr.getId(), (byte) 2);
                    if (randomPortalSpawned) {
                        chr.getTempValues().put("BountyHunterNpc", Randomizer.isSuccess(50) ? 9001059 : 9001060);
                        chr.dropMessage(-1, "出現賞金獵人的傳送點！");
                        cooltime = 15 * 60 * 1000;
                    }
                }
                chr.setBountyHunterTime(cooltime);
            }
            // 烈焰戰狼處理
            if (!randomPortalSpawned && !chr.isFireWolfCoolDown()) {
                long cooltime = 5000;
                if (Randomizer.isSuccess(30)) {
                    randomPortalSpawned = spawnRandomPortal(chr.getId(), (byte) 3);
                    if (randomPortalSpawned) {
                        chr.dropMessage(-1, "出現往烈燄戰狼的巢穴的傳送點！");
                        cooltime = 15 * 60 * 1000;
                    }
                }
                chr.setFireWolfTime(cooltime);
            }
        }

        // 菁英怪物處理
        if (animation == 1 && !isOnEliteBossEvent() && chr != null && (monster.getMobLevel() <= chr.getLevel() + 20 && monster.getMobLevel() >= 30) && !chr.inEvent() && !isBossMap()) {
            if (monster.getEliteGrade() >= 0) {
                if (8644631 == monster.getId()) {
                    darkEliteCount = 0;
                }
                if (!isOnEliteBossEvent()) {
                    eliteBossCount++;
                    if (eliteBossCount < 10) {
                        startMapEffect("黑暗氣息尚未消失,這個地方變的更加陰森.", 5120187, 0);
                    } else {
                        startMapEffect("這個地方充滿了黑暗氣息,好像有什麼事情即將發生的樣子.", 5120187, 0);
                    }
                }
            } else {
                eliteCount++;
                if (!isOnEliteBossEvent() && eliteCount >= ServerConfig.ELITE_COUNT && Randomizer.nextInt(1000) < 100 && monster.getEliteGrade() <= 0 && !chr.checkEvent() && !monster.isFake() && !monster.isSoul() && !monster.isSpongeMob()) {
                    eliteCount = 0;
                    MapleMonster elite;
                    if (darkEliteCount >= 10) {
                        elite = MapleLifeFactory.getEliteMonster(8644631, monster.getStats(), 2);
                    } else if (eliteBossCount >= 10 && Randomizer.nextInt(1000) < (100 * (eliteBossCount - 10))) {
                        eliteBossCount = 0;
                        ChannelServer chs = ChannelServer.getInstance(channel);
                        EventManager eliteBossEM = null;
                        if (chs != null && chs.getEventSM() != null) {
                            eliteBossEM = chs.getEventSM().getEventManager(EliteBoss.class.getSimpleName());
                        }
                        if (eliteBossEM == null) {
                            chr.dropMessage(1, "菁英BOSS副本不存在。");
                        } else {
                            EventInstanceManager eim = eliteBossEM.getInstance(String.valueOf(mapid));
                            if (eim != null) {
                                eim.dispose();
                            }
                            eim = eliteBossEM.newInstance(String.valueOf(mapid));
                            eim.setAutoInstanceMap(mapid);
                        }
                        elite = null;
                    } else {
                        darkEliteCount++;
                        elite = MapleLifeFactory.getEliteMonster(monster.getId());
                    }

                    if (elite != null) {
                        elite.registerKill(300000L);
                        spawnMonsterOnGroundBelow(elite, monster.getPosition());

                        if (elite.getId() == 8644631) {
                            startMapEffect("散發著黑暗出現了黑暗傳令。", 5120187, 0);
                        } else {
                            startMapEffect("強大怪物伴隨著黑暗氣息一同出現.", 5120187, 0);
                        }
                    }
                }
            }
        }
        disappearMapObject(monster);
        monster.killBy(chr);
        monster.killed();
        final int lastKill = monster.getLastKill();
        if (lastKill != -1) {
            monster.killGainExp(chr, lastSkill);
        }
//        this.spawnedMonstersOnMap.decrementAndGet();
        if (monster.getBuffToGive() >= 0) {
            this.getCharacters().forEach(c1073 -> MapleItemInformationProvider.getInstance().getItemEffect(monster.getBuffToGive()).applyTo(c1073));
        }
        monster.getEffects().clear();
        MapleSquad sqd = getSquadByMap();
        int mobid = monster.getId();
        ExpeditionType type = null;
        if (mapid / 10000 == 92507) {
            MapleDojoAgent.checkClearStage(chr);
        } else if (mobid == 8810018 && mapid == 240060200) { // 闇黑龍王
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "經過無數次的挑戰，終於擊破了闇黑龍王的遠征隊！你們才是龍之林的真正英雄~"));
            //FileoutputUtil.log(FileoutputUtil.Horntail_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.Horntail;
            }
            doShrine(true);
        } else if (mobid == 8810122 && mapid == 240060201) { // 進階闇黑龍王
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "經過無數次的挑戰，終於擊破了進階闇黑龍王的遠征隊！你們才是龍之林的真正英雄~"));
            if (speedRunStart > 0) {
                type = ExpeditionType.ChaosHT;
            }
            doShrine(true);
        } else if (mobid == 9400266 && mapid == 802000111) { //9400266 - 努克斯
            doShrine(true);
        } else if (mobid == 9400265 && mapid == 802000211) { //9400265 - 貝爾加莫特
            doShrine(true);
        } else if (mobid == 9400270 && mapid == 802000411) { //9400270 - 都納斯
            doShrine(true);
        } else if (mobid == 9400273 && mapid == 802000611) { //9400273 - 尼貝隆
            doShrine(true);
        } else if (mobid == 9400294 && mapid == 802000711) { //9400294 - 都納斯
            doShrine(true);
        } else if (mobid == 9400296 && mapid == 802000803) { //9400296 - 佈雷茲首腦
            doShrine(true);
        } else if (mobid == 9400289 && mapid == 802000821) { //9400289 - 奧芙赫班
            doShrine(true);
        } else if (mobid == 8830000 && mapid == 105100300) { //8830000 - 巴洛古
            if (speedRunStart > 0) {
                type = ExpeditionType.Normal_Balrog;
            }
        } else if ((mobid == 9420544 || mobid == 9420549) && mapid == 551030200 && monster.getEventInstance() != null && monster.getEventInstance().getName().contains(getEMByMap().getName())) {
            doShrine(getAllReactor().isEmpty());
        } else if (mobid == 8820001 && mapid == 270050100) { //皮卡啾
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "憑借永不疲倦的熱情打敗皮卡啾的遠征隊啊！你們是真正的時間的勝者！"));
            if (speedRunStart > 0) {
                type = ExpeditionType.Pink_Bean;
            }
            doShrine(true);
        } else if (mobid == 8820212 && mapid == 270051100) { //混沌皮卡啾
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "憑借永不疲倦的熱情打敗混沌皮卡啾的遠征隊啊！你們是真正的時間的勝者！"));
            if (speedRunStart > 0) {
                type = ExpeditionType.Chaos_Pink_Bean;
            }
            doShrine(true);
        } else if (mobid == 8850011 && mapid == 271040200 || mobid == 8850012 && mapid == 271040100) { //西格諾斯 274040200
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "被黑魔法師黑化的西格諾斯女皇終於被永不言敗的遠征隊打倒! 混沌世界得以淨化!"));
            if (speedRunStart > 0) {
                type = ExpeditionType.Cygnus;
            }
            doShrine(true);
        } else if (mobid == 8840000 && mapid == 211070100) { //凡雷恩
            if (speedRunStart > 0) {
                type = ExpeditionType.Von_Leon;
            }
            doShrine(true);
        } else if (mobid == 8800002 && (mapid == 280030000 || mapid == 280030100)) { //殘暴炎魔
            //FileoutputUtil.log(FileoutputUtil.Zakum_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.Zakum;
            }
            doShrine(true);
        } else if (mobid == 8800102 && mapid == 280030001) { //進階殘暴炎魔
            //FileoutputUtil.log(FileoutputUtil.Zakum_Log, MapDebug_Log());
            if (speedRunStart > 0) {
                type = ExpeditionType.Chaos_Zakum;
            }
            doShrine(true);
        } else if (mobid == 8870000 && mapid == 262031300) { //希拉 120級 簡單模式
            if (speedRunStart > 0) {
                type = ExpeditionType.Hillah;
            }
            doShrine(true);
        } else if (mobid == 8870100 && mapid == 262031300) { //希拉 170級 困難模式
            if (speedRunStart > 0) {
                type = ExpeditionType.Hillah;
            }
            doShrine(true);
        } else if (mobid == 8860000 && mapid == 272030400) { //阿卡伊農
            if (speedRunStart > 0) {
                type = ExpeditionType.Akyrum;
            }
            doShrine(true);
        } else if (mobid / 100000 == 93 && chr != null && chr.getMapId() / 1000000 == 955 && getMonsters().isEmpty()) {
            switch (chr.getMapId() % 1000 / 100) {
                case 1:
                case 2:
                    chr.send(MaplePacketCreator.showEffect("aswan/clear"));
                    chr.send(MaplePacketCreator.playSound("Party1/Clear"));
                    break;
                case 3:
                    chr.send(MaplePacketCreator.showEffect("aswan/clearF"));
                    chr.send(MaplePacketCreator.playSound("Party1/Clear"));
                    chr.dropMessage(-1, "你已經通過了所有回合。請通過傳送口移動到外部。");
                    break;
            }
        }

        if (mobid >= 8800003 && mobid <= 8800010) { // 殘暴炎魔手臂
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getMonsters();
            for (MapleMonster mons : monsters) {
                if (mons.getId() >= 8800003 && mons.getId() <= 8800010) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMapObject object : monsters) {
                    MapleMonster mons = (MapleMonster) object;
                    if (mons.getId() == 8800000) {
                        Point pos = mons.getPosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800000), pos);
                        break;
                    }
                }
            }
        } else if (mobid >= 8800103 && mobid <= 8800110) { // 混沌殘暴炎魔手臂
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getMonsters();
            for (MapleMonster mons : monsters) {
                if (mons.getId() >= 8800103 && mons.getId() <= 8800110) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMonster mons : monsters) {
                    if (mons.getId() == 8800100) { //進階殘暴炎魔
                        Point pos = mons.getPosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800100), pos); //進階殘暴炎魔
                        break;
                    }
                }
            }
        } else if (mobid >= 8800023 && mobid <= 8800030) { // 殘暴炎魔手臂
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getMonsters();
            for (MapleMonster mons : monsters) {
                if (mons.getId() >= 8800023 && mons.getId() <= 8800030) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMonster mons : monsters) {
                    if (mons.getId() == 8800020) { //進階殘暴炎魔
                        Point pos = mons.getPosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800022), pos); //簡單殘暴炎魔
                        break;
                    }
                }
            }
        } else if (mobid >= 9400903 && mobid <= 9400910) { //粉色殘暴炎魔
            boolean makeZakReal = true;
            Collection<MapleMonster> monsters = getMonsters();
            for (MapleMonster mons : monsters) {
                if (mons.getId() >= 9400903 && mons.getId() <= 9400910) {
                    makeZakReal = false;
                    break;
                }
            }
            if (makeZakReal) {
                for (MapleMonster mons : monsters) {
                    if (mons.getId() == 9400900) { //粉色殘暴炎魔
                        Point pos = mons.getPosition();
                        this.killAllMonsters(true);
                        spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9400900), pos); //粉色殘暴炎魔
                        break;
                    }
                }
            }
        } else if (mobid == 8820008) { // 寶寶BOSS召喚用透明怪物 - 皮卡啾
            for (MapleMapObject mmo : getMonsters()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation, 0);
                }
            }
        } else if (mobid >= 8820010 && mobid <= 8820014) { // 皮卡啾
            for (MapleMapObject mmo : getMonsters()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820000 && mons.getId() != 8820001 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation, 0);
                }
            }
        } else if (mobid == 8820108) { // 8820108 - 寶寶BOSS召喚用透明怪物 - 混沌皮卡啾
            for (MapleMapObject mmo : getMonsters()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation, 0);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "地圖殺死怪物 8820108 : " + mons.getId() + " - " + mons.getStats().getName(), true);
                }
            }
        } else if (mobid >= 8820300 && mobid <= 8820304) { // 混沌皮卡啾
            for (MapleMapObject mmo : getMonsters()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820100 && mons.getId() != 8820101 && mons.getId() != 8820212 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation, 0);
                    //FileoutputUtil.log(FileoutputUtil.Pinkbean_Log, "地圖殺死怪物 混沌皮卡啾 : " + mons.getId() + " - " + mons.getStats().getName(), true);
                }
            }
        } else if (monster.isSpongeMob()) {
            for (MapleMapObject mmo : getMonsters()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId() || mons.getSponge() == monster) {
                    killMonster(mons, chr, false, true, animation, 0);
                }
            }
        }
        eventMobkillCheck(mobid, chr);
        if (type != null) {
            if (speedRunStart > 0 && speedRunLeader.length() > 0) {
                String name = "";
                switch (type.name()) {
                    case "Normal_Balrog":
                        name = "魔王巴洛古";
                        break;
                    case "Zakum":
                        name = "殘暴炎魔";
                        break;
                    case "Horntail":
                        name = "闇黑龍王";
                        break;
                    case "Pink_Bean":
                        name = "皮卡啾";
                        break;
                    case "Chaos_Pink_Bean":
                        name = "混沌皮卡啾";
                        break;
                    case "Chaos_Zakum":
                        name = "進階殘暴炎魔";
                        break;
                    case "ChaosHT":
                        name = "進階闇黑龍王";
                        break;
                    case "Von_Leon":
                        name = "凡雷恩";
                        break;
                    case "Cygnus":
                        name = "西格諾斯女皇";
                        break;
                    case "Akyrum":
                        name = "阿卡伊農";
                        break;
                    case "Hillah":
                        name = "希拉";
                        break;
                }
                long endTime = System.currentTimeMillis();
                String time = StringUtil.getReadableMillis(speedRunStart, endTime);
                broadcastMessage(MaplePacketCreator.serverNotice(5, speedRunLeader + "帶領的遠征隊，耗時: " + time + " 擊敗了 " + name + "!"));
                getRankAndAdd(speedRunLeader, time, type, endTime - speedRunStart, sqd == null ? null : sqd.getMembers());
                endSpeedRun();
            }
        }
//        if (monster.getStats().isBoss()) {
//            chr.finishActivity(120107);
//        }
        if (!monster.isSoul() && withDrops && lastKill != -1) {
            MapleCharacter drop;
            if (lastKill <= 0) {
                drop = chr;
            } else {
                drop = getPlayerObject(lastKill);
                if (drop == null) {
                    drop = chr;
                }
            }
            int delay = 200;
            if (lastSkill > 0) {
                Skill skill = SkillFactory.getSkill(lastSkill);
                if (skill != null) {
                    delay = skill.getDelay() / 3;
                }
            }
            dropFromMonster(drop, monster, delay, false, false);
        }
    }

    public void eventMobkillCheck(int n2, MapleCharacter player) {
        if (player == null) {
            return;
        }
//        if (player.getSailEvent() != null) {
//            player.getSailEvent().at(player);
//        }
        EventInstanceManager eim = player.getEventInstance();
        if (n2 / 100000 == 98 && player.getMapId() / 10000000 == 95 && this.getMonsters().isEmpty()) {
            switch (player.getMapId() % 1000 / 100) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4: {
                    player.send_other(MaplePacketCreator.showEffect("monsterPark/clear"), true);
                    break;
                }
                case 5: {
                    if (player.getMapId() / 1000000 == 952) {
                        player.send_other(MaplePacketCreator.showEffect("monsterPark/clearF"), true);
                        break;
                    }
                    player.send_other(MaplePacketCreator.showEffect("monsterPark/clear"), true);
                    break;
                }
                case 6: {
                    player.send_other(MaplePacketCreator.showEffect("monsterPark/clearF"), true);
                }
            }
            player.send_other(MaplePacketCreator.showEffect("Party1/Clear"), true);
        } else if (n2 / 100000 == 93 && player.getMapId() / 1000000 == 955 && this.getMonsters().isEmpty()) {
            switch (player.getMapId() % 1000 / 100) {
                case 1:
                case 2: {
                    player.send_other(MaplePacketCreator.showEffect("aswan/clear"), true);
                    player.send_other(MaplePacketCreator.playSound("Party1/Clear"), true);
                    break;
                }
                case 3: {
                    player.send_other(MaplePacketCreator.showEffect("aswan/clearF"), true);
                    player.send_other(MaplePacketCreator.playSound("Party1/Clear"), true);
                    player.dropMessage(-1, "你已經通過了所有回合。請通過傳送口移動到外部。");
                }
            }
        } else if (n2 / 100000 == 93 && (player.getMapId() == 921160200 || player.getMapId() == 921160400) && this.getAllMonster().isEmpty()) {
            this.startMapEffect("請快點移動到下一張地圖。", 5120053);
        } else if (n2 / 100000 == 93 && player.getMapId() / 10000 == 24008 && this.getAllMonster().isEmpty() && eim != null) {
            player.send_other(MaplePacketCreator.showEffect("quest/party/clear"), true);
            player.send_other(MaplePacketCreator.playSound("Party1/Clear"), true);
        }
        boolean bl2 = false;
        switch (player.getMapId()) {
            case 811000100: {
                if (eim == null || !this.getAllMonster().isEmpty()) {
                    break;
                }
                if (eim.getProperty("stage1").equals("1")) {
                    bl2 = true;
                    eim.setProperty("stage1", "clear");
                    break;
                }
                eim.schedule("stage1Check", 100);
                break;
            }
            case 811000200: {
                if (eim == null || !this.getAllMonster().isEmpty()) {
                    break;
                }
                if (eim.getProperty("stage2").equals("5")) {
                    bl2 = true;
                    eim.setProperty("stage2", "clear");
                    break;
                }
                eim.schedule("stage2Check", 100);
                break;
            }
            case 811000300: {
                if (eim == null || !this.getAllMonster().isEmpty()) {
                    break;
                }
                if (eim.getProperty("stage3").equals("2") && n2 == 9450014) {
                    bl2 = true;
                    eim.setProperty("stage3", "clear");
                    break;
                }
                if (!eim.getProperty("stage3").equals("0")) {
                    break;
                }
                eim.schedule("stage3Check", 100);
                break;
            }
            case 811000400: {
                if (eim == null || !this.getAllMonster().isEmpty()) {
                    break;
                }
                if (eim.getProperty("stage4").equals("1")) {
                    bl2 = true;
                    eim.setProperty("stage4", "clear");
                    break;
                }
                eim.schedule("stage4Check", 100);
            }
        }
        if (bl2) {
            player.send_other(MaplePacketCreator.showEffect("aswan/clear"), true);
            player.send_other(MaplePacketCreator.playSound("Party1/Clear"), true);
            showPortalEffect("clear2", 1);
            showPortalEffect("clear1", 1);
            this.changeEnvironment("gate", 2);
        }
    }

    public List<MapleReactor> getAllReactor() {
        return getAllReactorsThreadsafe();
    }

    public List<MapleReactor> getAllReactorsThreadsafe() {
        ArrayList<MapleReactor> ret;
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.REACTOR).values().parallelStream().map(mmo -> (MapleReactor) mmo).collect(Collectors.toCollection(ArrayList::new));
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleRuneStone> getAllRune() {
        return getAllRuneThreadsafe();
    }

    public List<MapleRuneStone> getAllRuneThreadsafe() {
        ArrayList<MapleRuneStone> ret;
        mapobjectlocks.get(MapleMapObjectType.RUNE).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.RUNE).values().parallelStream().map(mmo -> (MapleRuneStone) mmo).collect(Collectors.toCollection(ArrayList::new));
        } finally {
            mapobjectlocks.get(MapleMapObjectType.RUNE).readLock().unlock();
        }
        return ret;
    }

    public List<MapleSummon> getAllSummonsThreadsafe() {
        ArrayList<MapleSummon> ret;
        mapobjectlocks.get(MapleMapObjectType.SUMMON).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.SUMMON).values().parallelStream().filter(mmo -> mmo instanceof MapleSummon).map(mmo -> (MapleSummon) mmo).collect(Collectors.toCollection(ArrayList::new));
        } finally {
            mapobjectlocks.get(MapleMapObjectType.SUMMON).readLock().unlock();
        }
        return ret;
    }

    public List<TownPortal> getAllDoor() {
        return getAllTownPortalsThreadsafe();
    }

    public List<TownPortal> getAllTownPortalsThreadsafe() {
        ArrayList<TownPortal> ret;
        mapobjectlocks.get(MapleMapObjectType.TOWN_PORTAL).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.TOWN_PORTAL).values().parallelStream().filter(mmo -> mmo instanceof TownPortal).map(mmo -> (TownPortal) mmo).collect(Collectors.toCollection(ArrayList::new));
        } finally {
            mapobjectlocks.get(MapleMapObjectType.TOWN_PORTAL).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllRandomPortalThreadsafe() {
        ArrayList<MapleMapObject> ret;
        mapobjectlocks.get(MapleMapObjectType.RANDOM_PORTAL).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.RANDOM_PORTAL).values().parallelStream().filter(mmo -> mmo instanceof MapleRandomPortal).collect(Collectors.toCollection(ArrayList::new));
        } finally {
            mapobjectlocks.get(MapleMapObjectType.RANDOM_PORTAL).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllMechDoorsThreadsafe() {
        ArrayList<MapleMapObject> ret;
        mapobjectlocks.get(MapleMapObjectType.TOWN_PORTAL).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.TOWN_PORTAL).values().parallelStream().filter(mmo -> mmo instanceof MechDoor).collect(Collectors.toCollection(ArrayList::new));
        } finally {
            mapobjectlocks.get(MapleMapObjectType.TOWN_PORTAL).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllMerchant() {
        return getAllHiredMerchantsThreadsafe();
    }

    public List<MapleMapObject> getAllHiredMerchantsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.HIRED_MERCHANT).readLock().lock();
        try {
            ret.addAll(mapobjects.get(MapleMapObjectType.HIRED_MERCHANT).values());
        } finally {
            mapobjectlocks.get(MapleMapObjectType.HIRED_MERCHANT).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMonster> getAllMonster() {
        return getAllMonstersThreadsafe(false);
    }
    public List<MapleMonster> getAllMonstersThreadsafe() {
        return getAllMonstersThreadsafe(true);
    }

    public List<MapleMonster> getMonsters() {
        return getAllMonstersThreadsafe(true);
    }

    public List<MapleMonster> getAllMonstersThreadsafe(boolean filter) {
        final List<MapleMonster> ret;
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.MONSTER).values().parallelStream()
                    .filter(mmo -> filter || !((MapleMonster) mmo).getStats().getName().contains("dummy") && !((MapleMonster) mmo).getStats().isFriendly())
                    .map(MapleMonster.class::cast)
                    .collect(Collectors.toList());
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
        return ret;
    }

    public List<Integer> getAllUniqueMonsters() {
        ArrayList<Integer> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                int theId = ((MapleMonster) mmo).getId();
                if (!ret.contains(theId)) {
                    ret.add(theId);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
        return ret;
    }

    public void killAllMonsters(final boolean animate) {
        this.killAllMonsters(null, animate);
    }

    public void killAllMonsters(final MapleCharacter chr, final boolean animate) {
        this.killAllMonsters(chr, false, animate);
    }

    public void killAllMonsters(final MapleCharacter chr, final boolean withDrops, final boolean animate) {
        for (final MapleMonster i298 : this.getMonsters()) {
            if (withDrops) {
                i298.setLastKill(chr.getId());
            }
            this.killMonster(i298, chr, withDrops, true, (byte) (animate ? 1 : 2), 0);
        }
    }

    public void killMonster(int mobID) {
        for (MapleMapObject mmo : getMonsters()) {
            MapleMonster monster = (MapleMonster) mmo;
            if (monster.getId() == mobID) {
                this.killMonster(monster, null, false, false, (byte) 1, 0);
            }
        }
    }

    public String MapDebug_Log() {
        StringBuilder sb = new StringBuilder("Defeat time : ");
        sb.append(DateUtil.getNowTime());
        sb.append(" | Mapid : ").append(this.mapid);
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            sb.append(" Users [").append(getCharacters().size()).append("] | ");
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter mc = (MapleCharacter) _mmo;
                sb.append(mc.getName()).append(", ");
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return sb.toString();
    }

    public void limitReactor(int rid, int num) {
        List<MapleReactor> toDestroy = new ArrayList<>();
        Map<Integer, Integer> contained = new LinkedHashMap<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (contained.containsKey(mr.getReactorId())) {
                    if (contained.get(mr.getReactorId()) >= num) {
                        toDestroy.add(mr);
                    } else {
                        contained.put(mr.getReactorId(), contained.get(mr.getReactorId()) + 1);
                    }
                } else {
                    contained.put(mr.getReactorId(), 1);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor mr : toDestroy) {
            destroyReactor(mr.getObjectId());
        }
    }

    public void destroyReactors(int first, int last) {
        List<MapleReactor> toDestroy = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    toDestroy.add(mr);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor mr : toDestroy) {
            destroyReactor(mr.getObjectId());
        }
    }

    public void destroyReactor(int oid) {
        final MapleReactor reactor = getReactorByOid(oid);
        if (reactor == null) {
            return;
        }
        broadcastMessage(MaplePacketCreator.destroyReactor(reactor));
        reactor.setAlive(false);
        removeMapObject(reactor);
        reactor.setTimerActive(false);

        if (reactor.getDelay() > 0) {
            MapTimer.getInstance().schedule(() -> respawnReactor(reactor), reactor.getDelay());
        }
    }

    public void reloadReactors() {
        List<MapleReactor> toSpawn = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor reactor = (MapleReactor) obj;
                broadcastMessage(MaplePacketCreator.destroyReactor(reactor));
                reactor.setAlive(false);
                reactor.setTimerActive(false);
                toSpawn.add(reactor);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor r : toSpawn) {
            removeMapObject(r);
            if (!r.isCustom()) { //guardians cpq
                respawnReactor(r);
            }
        }
    }

    /*
     * command to reset all item-reactors in a map to state 0 for GM/NPC use -
     * not tested (broken reactors get removed from mapobjects when destroyed)
     * Should create instances for multiple copies of non-respawning reactors...
     */
    public void resetReactors() {
        setReactorState((byte) 0);
    }

    public void setReactorState() {
        setReactorState((byte) 1);
    }

    public void setReactorState(byte state) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ((MapleReactor) obj).forceHitReactor(state);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public void setReactorDelay(int state) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ((MapleReactor) obj).setDelay(state);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /*
     * command to shuffle the positions of all reactors in a map for PQ purposes
     * (such as ZPQ/LMPQ)
     */
    public void shuffleReactors() {
        shuffleReactors(0, 9999999); //all
    }

    public void shuffleReactors(int first, int last) {
        List<Point> points = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    points.add(mr.getPosition());
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        Collections.shuffle(points);
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    mr.setPosition(points.remove(points.size() - 1));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /**
     * 更新怪物控制器，怪物自動從新的角色對像數據中尋找新的控制權
     *
     * @param monster 怪物
     */
    public void updateMonsterController(MapleMonster monster) {
        mobControllerLock.lock();
        try {
            monster.updateController(getCharacters());
        } finally {
            mobControllerLock.unlock();
        }
    }

    public MapleMapObject getMapObject(int oid, MapleMapObjectType type) {
        mapobjectlocks.get(type).readLock().lock();
        try {
            return mapobjects.get(type).get(oid);
        } finally {
            mapobjectlocks.get(type).readLock().unlock();
        }
    }

    public boolean containsNPC(int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.NPC).values()) {
                MapleNPC n = (MapleNPC) mapleMapObject;
                if (n.getId() == npcid) {
                    return true;
                }
            }
            return false;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public MapleNPC getNPCById(int id) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.NPC).values()) {
                MapleNPC n = (MapleNPC) mapleMapObject;
                if (n.getId() == id) {
                    return n;
                }
            }
            return null;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    @Deprecated
    public MapleMonster getMonsterById(int id) {
        return getMobObjectByID(id);
    }

    public MapleMonster getMobObjectByID(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            MapleMonster ret = null;
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                MapleMonster n = (MapleMonster) mapleMapObject;
                if (n.getId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public int countMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            int ret = 0;
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                MapleMonster n = (MapleMonster) mapleMapObject;
                if (n.getId() == id) {
                    ret++;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public MapleReactor getReactorById(int id) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            MapleReactor ret = null;
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor n = (MapleReactor) mapleMapObject;
                if (n.getReactorId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /**
     * returns a monster with the given oid, if no such monster exists returns
     * null
     *
     * @param oid
     * @return
     */
    public MapleMonster getMonsterByOid(int oid) {
        return getMobObject(oid);
    }

    public MapleSummon getSummonByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.SUMMON);
        if (mmo == null) {
            return null;
        }
        return (MapleSummon) mmo;
    }

    public MapleNPC getNPCByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.NPC);
        if (mmo == null) {
            return null;
        }
        return (MapleNPC) mmo;
    }

    public MapleReactor getReactorByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.REACTOR);
        if (mmo == null) {
            return null;
        }
        return (MapleReactor) mmo;
    }

    public MonsterFamiliar getFamiliarByOid(int oid) {
        MapleMapObject mmo = this.getMapObject(oid, MapleMapObjectType.FAMILIAR);
        if (mmo == null) {
            return null;
        }
        return (MonsterFamiliar) mmo;
    }

    public MapleAffectedArea getAffectedAreaByChr(int id, int sourceid) {
        for (final MapleAffectedArea mist : getAllAffectedAreasThreadsafe()) {
            if (mist.getOwnerId() == id && mist.getEffect().getSourceId() == sourceid) {
                return mist;
            }
        }
        return null;
    }

    public List<MapleAffectedArea> getAffectedAreaObject(int ownerID, int skillID) {
        ArrayList<MapleAffectedArea> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.AFFECTED_AREA).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.AFFECTED_AREA).values()) {
                MapleAffectedArea area = (MapleAffectedArea) mmo;
                if (area.getOwnerId() == ownerID && area.getSourceSkill().getId() == skillID) {
                    ret.add(area);
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.AFFECTED_AREA).readLock().unlock();
        }
    }

    public void spawnMapObject(final int chrID, final MapleMapObject obj, final byte[] packet) {
        this.addMapObject(obj);
        this.objectMove(chrID, obj, packet);
    }

    public void disappearMapObject(final MapleMapObject obj) {
        removeMapObject(obj);
        removeRangedMapObject(obj);
    }

    public boolean removeAffectedArea(int id, int sourceid) {
        boolean succ = false;
        for (MapleAffectedArea area : getAffectedAreaObject(id, sourceid)) {
            area.cancel();
            disappearMapObject(area);
            succ = true;
        }
        return succ;
    }

    public void removeAllAffectedAreaByChr(int id) {
        for (final MapleAffectedArea mist : getAllAffectedAreasThreadsafe()) {
            if (mist.getOwnerId() == id) {
                mist.cancel();
                disappearMapObject(mist);
            }
        }
    }

    //todo 重構
    public final void objectMove(final int chrID, final MapleMapObject obj, final byte[] packet) {
        objectMoveLock.lock();
        try {
            MapleMapObjectType[] values;
            for (int length = (values = MapleMapObjectType.values()).length, i = 0; i < length; ++i) {
                final MapleMapObjectType type = values[i];
                this.mapobjectlocks.get(type).readLock().lock();
                try {
                    for (MapleMapObject mmo : this.mapobjects.get(type).values()) {
                        if ((mmo) != null) {
                            final boolean b = this.getId() / 1000 == 921174 || obj.getPosition().distance(mmo.getPosition()) < mmo.getRange();
                            try {
                                switch (obj.getType()) {
                                    case PLAYER: {
                                        final MapleCharacter chr = (MapleCharacter) obj;
                                        if (mmo.getDwOwnerID() > 0 && mmo.getDwOwnerID() != chr.getId()) {
                                            break;
                                        }
                                        if (b) {
                                            if (!chr.isMapObjectVisible(mmo)) {
                                                chr.addVisibleMapObject(mmo);
                                                break;
                                            }
                                        } else {
                                            if (chr.isMapObjectVisible(mmo)) {
                                                chr.removeVisibleMapObject(mmo);
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case MONSTER: {
                                        final MapleMonster monster = (MapleMonster) obj;
                                        final MapleAffectedArea area;
                                        if (mmo.getType() == MapleMapObjectType.AFFECTED_AREA && !(area = (MapleAffectedArea) mmo).isMobMist() && monster.getEffectHolder(area.getSkillID()) != null && !area.getBounds().contains(monster.getPosition())) {
                                            monster.removeEffect(area.getOwnerId(), area.getSkillID());
                                        }
                                        if (mmo.getType() == MapleMapObjectType.PLAYER && monster.getZoneDataType() > 0) {
                                            monster.checkMobZone((MapleCharacter) mmo);
                                            break;
                                        }
                                        break;
                                    }
                                }
                                switch (mmo.getType()) {
                                    case PLAYER: {
                                        final MapleCharacter chr = (MapleCharacter) mmo;
                                        if (obj.getDwOwnerID() > 0 && obj.getDwOwnerID() != chr.getId()) {
                                            continue;
                                        }
                                        if (b) {
                                            if (!chr.isMapObjectVisible(obj)) {
                                                chr.addVisibleMapObject(obj);
                                            }
                                            if (packet != null && chr.getId() != chrID) {
                                                chr.getClient().announce(packet);
                                            }
                                        } else {
                                            if (chr.isMapObjectVisible(obj)) {
                                                chr.removeVisibleMapObject(obj);
                                            }
                                        }
                                    }
                                }
                            } catch (Exception ex) {
                                log.error(new StringBuilder("Object Move Error:").append(mmo).append(" Map: ").append(this).append("!"), ex);
                            }
                        }
                    }
                } finally {
                    this.mapobjectlocks.get(type).readLock().unlock();
                }
            }
        } finally {
            objectMoveLock.unlock();
        }
    }

    public MapleAffectedArea getAffectedAreaByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.AFFECTED_AREA);
        if (mmo == null) {
            return null;
        }
        return (MapleAffectedArea) mmo;
    }

    public ScheduledFuture affectedAreaScheduled(final MapleAffectedArea area) {
        ScheduledFuture schedule = null;
        if (area.isNeedHandle()) {
            schedule = MapTimer.getInstance().register(new AreaRunnable(area), 1000L, 100L);
        }
        return schedule;
    }

    public void createAffectedArea(final MapleAffectedArea area) {
        addMapObject(area);
        objectMove(-1, area, null);
        area.setPoisonSchedule(affectedAreaScheduled(area));
        area.setSchedule(MapTimer.getInstance().schedule(() -> {
            disappearMapObject(area);
            area.cancel();
            if (area.getSkillID() == 重砲指揮官.ICBM_2 && area.getEffect() != null) {
                Skill skill = SkillFactory.getSkill(重砲指揮官.ICBM_3);
                if (skill != null) {
                    skill.getEffect(area.getEffect().getLevel()).applyAffectedArea(area.getOwner(), area.getPosition());
                }
            }
        }, area.getDuration()));
    }


    private class AreaRunnable implements Runnable {
        private int numTimes = 0;
        private final MapleAffectedArea area;

        public AreaRunnable(MapleAffectedArea area) {
            this.area = area;
        }

        @Override
        public void run() {
            numTimes++;
            handleAffectedArea(area, numTimes);
        }
    }

    public void handleAffectedArea(final MapleAffectedArea area, int numTimes) {
        for (final MapleCharacter chr : getCharacters()) {
            area.handleEffect(chr, numTimes);
        }
        if (area.getSkillID() == 冰雷.冰雪結界_1) {
            return;
        }
        area.handleMonsterEffect(this, numTimes);
    }

    public void removeSummon(final int oid) {
        MapleSummon summon = (MapleSummon) getMapObject(oid, MapleMapObjectType.SUMMON);
        removeMapObject(summon);
        broadcastMessage(SummonPacket.removeSummon(summon, false));
    }

    public MapleReactor getReactorByName(String name) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getName().equalsIgnoreCase(name)) {
                    return mr;
                }
            }
            return null;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public void spawnNpc(int id, Point pos) {
        MapleNPC npc = MapleLifeFactory.getNPC(id, this.mapid);
        npc.setPosition(pos);
        npc.setCy(pos.y);
        npc.setRx0(pos.x + 50);
        npc.setRx1(pos.x - 50);
        npc.setCurrentFh(getFootholds().findBelow(pos).getId());
        npc.setCustom(true);
        addMapObject(npc);
        broadcastMessage(NPCPacket.spawnNPC(npc));
    }

    public void spawnNpcForPlayer(MapleClient c, int id, Point pos) {
        final MapleNPC npc = MapleLifeFactory.getNPC(id, this.mapid);
        npc.setPosition(pos);
        npc.setCy(pos.y);
        npc.setRx0(pos.x + 50);
        npc.setRx1(pos.x - 50);
        npc.setOwnerid(c.getPlayer().getId());
        npc.setCurrentFh(getFootholds().findBelow(pos).getId());
        npc.setCustom(true);
        addMapObject(npc);
        c.announce(NPCPacket.spawnNPC(npc));
    }

    public void removeNpc(int npcid) {
        removeNpc(npcid, 0);
    }

    public void removeNpc(int npcid, int ownerid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).writeLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC npc = (MapleNPC) itr.next();
                if (!npc.isCustom() || npcid != -1 && npc.getId() != npcid || npc.getId() != 0 && npc.getOwnerid() != ownerid) {
                    continue;
                }
                if (!npc.isHidden() && !isNpcHide(npc.getId())) {
                    broadcastMessage(NPCPacket.removeNPCController(npc.getObjectId(), false));
                }
                broadcastMessage(NPCPacket.removeNPC(npc.getObjectId()));
                itr.remove();
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).writeLock().unlock();
        }
    }

    public void hideNpc(int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.NPC).values()) {
                MapleNPC npc = (MapleNPC) mapleMapObject;
                if (npcid == -1 || npc.getId() == npcid) {
                    broadcastMessage(NPCPacket.removeNPCController(npc.getObjectId(), false));
                    broadcastMessage(NPCPacket.removeNPC(npc.getObjectId()));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public void hideNpc(MapleClient c, int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mapleMapObject : mapobjects.get(MapleMapObjectType.NPC).values()) {
                MapleNPC npc = (MapleNPC) mapleMapObject;
                if (npcid == -1 || npc.getId() == npcid) {
                    c.announce(NPCPacket.removeNPCController(npc.getObjectId(), false));
                    c.announce(NPCPacket.removeNPC(npc.getObjectId()));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public void spawnReactorOnGroundBelow(MapleReactor mob, Point pos) {
        mob.setPosition(pos); //reactors dont need FH lol
        mob.setCustom(true);
        spawnReactor(mob);
    }

    public void spawnMonsterOnGroundBelow(MapleMonster mob, Point pos, int spawnType) {
        mob.setPosition(calcPointBelow(new Point(pos.x, pos.y - 1)));
        spawnMonster(mob, spawnType);
    }

    public void spawnMonster(final MapleMonster monster, final Point point, final int n) {
        monster.setPosition(this.calcPointBelow(new Point(point.x, point.y - 1)));
        this.spawnMonster(monster, n);
    }

    public void spawnMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        mob.setPosition(this.calcPointBelow(new Point(pos.x, pos.y - 1)));
        this.spawnMonster(mob, -2);
    }

    /**
     * 刷出殘暴炎魔
     */
    public void spawnZakum(int x, int y, long maxhp) {
        Point pos = new Point(x, y);
        MapleMonster mainb = MapleLifeFactory.getMonster(8800000);
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);
        mainb.getStats().setChange(true);
        mainb.setForcedMobStat(120);
        mainb.changeHP(maxhp);
        spawnFakeMonster(mainb);
        // Might be possible to use the map object for reference in future.
        int[] zakpart = {8800003, 8800004, 8800005, 8800006, 8800007, 8800008, 8800009, 8800010};
        for (int i : zakpart) {
            MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setForcedMobStat(120);
            part.getStats().setChange(true);
            part.setPosition(spos);
            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    /**
     * 刷出進階殘暴炎魔
     */
    public void spawnChaosZakum(int x, int y, long maxhp) {
        Point pos = new Point(-10, -215);
        MapleMonster mainb = MapleLifeFactory.getMonster(8800100);
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);
        mainb.getStats().setChange(true);
        mainb.setForcedMobStat(160);
        if (maxhp > 0) {
            mainb.changeHP(maxhp);
        }
        spawnFakeMonster(mainb);
        // Might be possible to use the map object for reference in future.
        int[] zakpart = {8800103, 8800104, 8800105, 8800106, 8800107, 8800108, 8800109, 8800110};
        for (int i : zakpart) {
            MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setPosition(spos);
            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    public final void spawnSimpleZakum(final int x, final int y, long maxhp) {
        final Point point = new Point(-10, -215);
        final MapleMonster mainb = MapleLifeFactory.getMonster(8800020);
        final Point calcPointBelow = this.calcPointBelow(new Point(point.x, point.y - 1));
        mainb.setPosition(calcPointBelow);
        mainb.setFake(true);
        if (maxhp > 0) {
            mainb.setForcedMobStat(55);
            mainb.getStats().setChange(true);
            mainb.changeHP(maxhp);
        }
        spawnFakeMonster(mainb);
        final int[] zakpart = {8800023, 8800024, 8800025, 8800026, 8800027, 8800028, 8800029, 8800030};
        for (int length = zakpart.length, i = 0; i < length; ++i) {
            final MapleMonster part = MapleLifeFactory.getMonster(zakpart[i]);
            part.setPosition(calcPointBelow);
            this.spawnMonster(part, -2);
        }
        if (this.squadSchedule != null) {
            this.cancelSquadSchedule(false);
        }
    }

    /**
     * 刷出粉色殘暴炎魔
     */
    public void spawnPinkZakum(int x, int y) {
        Point pos = new Point(x, y);
        MapleMonster mainb = MapleLifeFactory.getMonster(9400900);
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);
        // Might be possible to use the map object for reference in future.
        spawnFakeMonster(mainb);
        int[] zakpart = {9400903, 9400904, 9400905, 9400906, 9400907, 9400908, 9400909, 9400910};
        for (int i : zakpart) {
            MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setPosition(spos);
            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    public void spawnFakeMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mob.setPosition(spos);
        spawnFakeMonster(mob);
    }

    private void checkRemoveAfter(MapleMonster monster) {
        int ra = monster.getStats().getRemoveAfter();
        if (ra > 0 && monster.getLinkCID() <= 0) {
            monster.registerKill(ra * 1000);
        }
    }

    public void spawnRevives(final MapleMonster monster, final int oid) {
        if (monster.getStats().isMobile()) {
            final MapleFoothold d = this.getFootholds().findBelow(monster.getPosition());
            monster.setCurrentFh((d != null) ? d.getId() : 0);
        }
        monster.setMap(this);
        monster.setLinkOid(oid);
        monster.setAppearType((short) ((monster.getStats().getSummonType() <= 1) ? -3 : monster.getStats().getSummonType()));
        spawnAndAddRangedMapObject(monster);
        objectMove(-1, monster, null);
        monster.setNewSpawn(false);
        checkRemoveAfter(monster);
//        if (monster.getId() == 9300166) { //炸彈
//            MapTimer.getInstance().schedule(() -> broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 2)), 3000);
//        }
//        spawnedMonstersOnMap.incrementAndGet();
        updateMonsterController(monster);
    }

    public void spawnMonster(MapleMonster monster, int spawnType) {
        spawnMonster(monster, spawnType, false);
    }

    public void spawnMonster(final MapleMonster monster, int spawnType, boolean newSpawn) {
        if (monster.getMap() == null && monster.getStats().isPatrol()) {
            monster.setPatrolScopeX1(monster.getPosition().x);
            monster.setPatrolScopeX2(monster.getPosition().x + monster.getStats().getPatrolRange());
        }
        if (!monster.getStats().isFlyMobile() && monster.getStats().isMobile()) {
            final MapleFoothold d = this.getFootholds().findBelow(monster.getPosition());
            monster.setCurrentFh((d != null) ? d.getId() : 0);
        }

        // 怪物調整屬性
        ChannelServer ch = ChannelServer.getInstance(channel);
        if (ch.getChannelType() != ChannelType.普通) {
            ForcedMobStat changeStats = monster.getForcedMobStat();
            if (changeStats == null) {
                monster.setForcedMobStat(monster.getStats());
                changeStats = monster.getForcedMobStat();
            }
            int level = changeStats.getLevel();
            long hp = monster.getMobMaxHp();
            long exp = changeStats.getExp();
            int watk = changeStats.getWatk();
            int matk = changeStats.getMatk();
            int pdrate = changeStats.getPDRate();
            int mdrate = changeStats.getMDRate();
            int scale = monster.getScale();

            switch (ch.getChannelType()) {
                case 混沌:
                    hp *= 3;
                    exp *= ServerConfig.CHANNEL_CHAOS_BASEEXPr / 100.0;
                    watk *= 2;
                    matk *= 2;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    level += level >= 100 ? 30 : level >= 30 ? 20 : 0;
                    scale += 30;
                    break;
                case 變態:
                    hp *= 10;
                    exp *= ServerConfig.CHANNEL_ABNORMAL_BASEEXPr / 100.0;
                    watk *= 6;
                    matk *= 6;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    pdrate *= 30;
                    mdrate *= 30;
                    level += level >= 100 ? 40 : level >= 30 ? 30 : 0;
                    scale += 50;
                    break;
                case MVP銅牌:
                    hp *= 3;
                    exp *= ServerConfig.MVP_CHANNEL_BRONZE_BASEEXPr / 100.0;
                    watk *= 2;
                    matk *= 2;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    level += level >= 100 ? 30 : level >= 30 ? 20 : 0;
                    scale += 30;
                    break;
                case MVP銀牌:
                    hp *= 3;
                    exp *= ServerConfig.MVP_CHANNEL_SILVER_BASEEXPr / 100.0;
                    watk *= 2;
                    matk *= 2;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    level += level >= 100 ? 20 : level >= 30 ? 10 : 0;
                    scale += 30;
                    break;
                case MVP金牌:
                    hp *= 3;
                    exp *= ServerConfig.MVP_CHANNEL_GOLD_BASEEXPr / 100.0;
                    watk *= 2;
                    matk *= 2;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    level += level >= 100 ? 20 : level >= 30 ? 10 : 0;
                    scale += 30;
                    break;
                case MVP鑽石:
                    hp *= 3;
                    exp *= ServerConfig.MVP_CHANNEL_DIAMOND_BASEEXPr / 100.0;
                    watk *= 2;
                    matk *= 2;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    level += level >= 100 ? 20 : level >= 30 ? 10 : 0;
                    scale += 30;
                    break;
                case MVP紅鑽:
                    hp *= 3;
                    exp *= ServerConfig.MVP_CHANNEL_RED_BASEEXPr / 100.0;
                    watk *= 2;
                    matk *= 2;
                    pdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    mdrate += level >= 240 ? 70 : level >= 200 ? 60 : level >= 150 ? 50 : 0;
                    level += level >= 100 ? 20 : level >= 30 ? 10 : 0;
                    scale += 30;
                    break;
            }
            changeStats.setLevel(Math.min(level, ServerConfig.CHANNEL_PLAYER_MAXLEVEL));
            monster.changeHP(hp < 0 ? Long.MAX_VALUE : hp);
            changeStats.setExp(exp < 0 ? 0 : exp);
            changeStats.setWatk(watk < 0 ? Integer.MAX_VALUE : watk);
            changeStats.setMatk(matk < 0 ? Integer.MAX_VALUE : matk);
            changeStats.setPDRate(pdrate < 0 ? Integer.MAX_VALUE : pdrate);
            changeStats.setMDRate(mdrate < 0 ? Integer.MAX_VALUE : mdrate);
            monster.setScale(scale);
            monster.setForcedMobStat(changeStats);
        }

        monster.setMap(this);
        monster.setAppearType((short) ((monster.getStats().getSummonType() <= 1 || monster.getStats().getSummonType() == 27 || newSpawn) ? spawnType : monster.getStats().getSummonType()));
        spawnAndAddRangedMapObject(monster);
        objectMove(-1, monster, null);
        monster.setNewSpawn(newSpawn);
        checkRemoveAfter(monster);
//        if (monster.getId() == 9300166) { //炸彈
//            MapTimer.getInstance().schedule(() -> broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 2)), 3000);
//        }
//        spawnedMonstersOnMap.incrementAndGet();
        updateMonsterController(monster);
    }

    public void spawnMonsterWithEffect(final MapleMonster monster, final int effect, Point pos) {
        if (!monster.getStats().isFlyMobile() && monster.getStats().isMobile()) {
            final MapleFoothold d = this.getFootholds().findBelow(monster.getPosition());
            monster.setCurrentFh((d != null) ? d.getId() : 0);
        } else {
            monster.setPosition(new Point(pos.x, pos.y - 1));
        }
        spawnMonster(monster, effect, true);
    }

    public void spawnFakeMonster(final MapleMonster monster) {
        monster.setMap(this);
        monster.setFake(true);
        spawnAndAddRangedMapObject(monster, c -> c.announce(MobPacket.spawnMonster(monster)));
        updateMonsterController(monster);
//        spawnedMonstersOnMap.incrementAndGet();
    }

    public void spawnReactor(final MapleReactor reactor) {
        reactor.setMap(this);
        spawnAndAddRangedMapObject(reactor, c -> c.announce(MaplePacketCreator.spawnReactor(reactor)));
    }

    private void respawnReactor(MapleReactor reactor) {
        if (!isSecretMap() && reactor.getReactorId() >= 100000 && reactor.getReactorId() <= 200011) {
            int newRid = (reactor.getReactorId() < 200000 ? 100000 : 200000) + Randomizer.nextInt(11);
            int prop = reactor.getReactorId() % 100;
            if (Randomizer.nextInt(22) <= prop && newRid % 100 < 10) {
                newRid++;
            }
            if (Randomizer.nextInt(110) <= prop && newRid % 100 < 11) {
                newRid++;
            }
            List<Point> toSpawnPos = new ArrayList<>(spawnPoints);
            for (MapleMapObject reactor1l : getAllReactorsThreadsafe()) {
                MapleReactor reactor2l = (MapleReactor) reactor1l;
                if (!toSpawnPos.isEmpty() && toSpawnPos.contains(reactor2l.getPosition())) {
                    toSpawnPos.remove(reactor2l.getPosition());
                    //System.err.println("重置反應堆 - 跳過相同的坐標.");
                }
            }
            //System.err.println("重置反應堆 - toSpawnPos: " + toSpawnPos.size() + " herbRocks: " + spawnPoints.size());
            MapleReactor newReactor = new MapleReactor(MapleReactorFactory.getReactor(newRid), newRid);
            newReactor.setPosition(toSpawnPos.isEmpty() ? reactor.getPosition() : toSpawnPos.get(Randomizer.nextInt(toSpawnPos.size())));
            newReactor.setDelay(newRid % 100 == 11 ? 60000 : 5000);
            spawnReactor(newReactor);
            //System.err.println("重置反應堆 - oldId: " + reactor.getReactorId() + " newId: " + newReactor.getReactorId() + " 是否相同: " + (reactor.getReactorId() == newReactor.getReactorId()));
        } else {
            reactor.setState((byte) 0);
            reactor.setAlive(true);
            spawnReactor(reactor);
        }
    }

    public void spawnRune(final MapleRuneStone rune) {
        rune.setMap(this);
        if (getRunesSize() <= 0) {
            runeCurseStage = 0;
        }

        spawnAndAddRangedMapObject(rune, c -> {
            c.announce(MaplePacketCreator.spawnRuneStone(rune));
            c.sendEnableActions();
        });
    }

    public void respawnRune() {
        if (getFieldLevel() < 30 || getRunesSize() != 0 || isTown() || isBossMap() || eliteCount < (ServerConfig.ELITE_COUNT / 2)) {
            return;
        }
        if (this.getCharactersSize() > 0) {
            if (System.currentTimeMillis() - this.spawnRuneTime > 10 * 60 * 1000) {
                List<Point> spawnPos = new ArrayList<>(spawnPoints);
                MapleRuneStone runeStone = new MapleRuneStone(Randomizer.nextInt(11));
                for (MapleReactor y2 : this.getAllReactorsThreadsafe()) {
                    if (spawnPos.isEmpty() || !spawnPos.contains(y2.getPosition())) {
                        continue;
                    }
                    spawnPos.remove(y2.getPosition());
                }
                if (!spawnPos.isEmpty()) {
                    this.setRuneTime();
                    runeStone.setPosition(spawnPos.get(Randomizer.nextInt(spawnPos.size())));
                    this.spawnRune(runeStone);
                }
            }
        } else {
            this.setRuneTime();
        }
    }

    public void spawnSkillPet(final MapleSkillPet skillpet) {
        spawnAndAddRangedMapObject(skillpet, c -> skillpet.sendSpawnData(c));
    }

    public long getRuneTime() {
        return spawnRuneTime;
    }

    public void setRuneTime() {
        this.spawnRuneTime = System.currentTimeMillis();
    }

    public void removeRune(MapleRuneStone rune, MapleCharacter chr, boolean noText) {
        this.removeMapObject(rune);
        mapobjects.get(MapleMapObjectType.RUNE).clear();
        chr.send(MaplePacketCreator.removeRuneStone(chr.getId(), rune.getExpR() * 100, chr.getLevel() < getFieldLevel() - 20, noText));
        this.broadcastMessage(chr, MaplePacketCreator.removeRuneStone(chr.getId(), 0, false, true), false);
        if (runeCurseStage > 0) {
            broadcastRuneCurseMessage(MaplePacketCreator.sendRuneCurseMsg("已解除精英 Boss的詛咒！！", true));
            runeCurseStage = 0;
        }
    }

    public int getRuneCurseStage() {
        return getRunesSize() <= 0 ? 0 : runeCurseStage;
    }

    public void setRuneCurseStage(int stage) {
        runeCurseStage = stage;
    }

    public int getRuneCurseRate() {
        int rate = getRuneCurseStage() > 0 ? Math.min(100, 35 + runeCurseStage * 15) : 0;
        return rate >= 95 ? 100 : rate;
    }

    public void showRuneCurseStage() {
        showRuneCurseStage(null);
    }

    public void showRuneCurseStage(MapleClient c) {
        if (getRuneCurseStage() > 0) {
            String curseMsg = "需要解放輪來解開精英Boss的詛咒！！\\n詛咒 " + runeCurseStage + "階段 : 套用獲得經驗值、道具掉落率 " + getRuneCurseRate() + "%減少效果中";
            if (c != null) {
                c.announce(MaplePacketCreator.sendRuneCurseMsg(curseMsg));
            } else {
                broadcastRuneCurseMessage(MaplePacketCreator.sendRuneCurseMsg(curseMsg));
            }
        }
    }

    public boolean isSecretMap() {
        switch (mapid) {
            case 910001001: //隱藏地圖 - 斯塔切的藥草田
            case 910001002: //隱藏地圖 - 諾布的礦山
            case 910001003: //隱藏地圖 - 新手秘密農場
            case 910001004: //隱藏地圖 - 中級者秘密農場
            case 910001005: //隱藏地圖 - 新手秘密礦山
            case 910001006: //隱藏地圖 - 中級者秘密礦山
            case 910001007: //隱藏地圖 - 高手秘密農場
            case 910001008: //隱藏地圖 - 高手秘密廣場
            case 910001009: //隱藏地圖 - 專家秘密農場
            case 910001010: //隱藏地圖 - 專家秘密廣場
                return true;
            default:
                return false;
        }
    }

    public void spawnTownPortal(final TownPortal door) {
        spawnAndAddRangedMapObject(door, c -> {
            door.sendSpawnData(c);
            c.sendEnableActions();
        });
        door.setState(1);
    }

    public boolean spawnRandomPortal(final int cid, final byte portalType) {
        if (getFieldLevel() <= 0 || isTown() || isBossMap() || eliteCount < (ServerConfig.ELITE_COUNT / 2)) {
            return false;
        }
        List<Point> spawnPos = new ArrayList<>(spawnPoints);
        Iterator<Point> itr = spawnPos.iterator();
        while (itr.hasNext()) {
            Point position = itr.next();
            for (MapleMapObject obj : getAllRandomPortalThreadsafe()) {
                MapleRandomPortal portalObj = (MapleRandomPortal) obj;
                if (cid == portalObj.getOwerid() && obj.getPosition().equals(position)) {
                    itr.remove();
                }
            }
        }
        if (spawnPos.size() > 0) {
            Collections.shuffle(spawnPos);
            MapleRandomPortal portal = new MapleRandomPortal(portalType, mapid, cid, 60000, spawnPos.get(0));
            spawnAndAddRangedMapObject(portal, c -> {
                portal.sendSpawnData(c);
                c.announce(MaplePacketCreator.getFieldVoice("Field.img/StarPlanet/cashTry"));
                c.sendEnableActions();
            });
            return true;
        }
        return false;
    }

    public void spawnMechDoor(final MechDoor door) {
        spawnAndAddRangedMapObject(door, c -> {
            c.announce(MaplePacketCreator.spawnMechDoor(door, true));
            c.sendEnableActions();
        });
    }

    /**
     * 召喚召喚獸
     *
     * @param summon
     */
    public void spawnSummon(final MapleSummon summon) {
        summon.setMap(this);
        spawnAndAddRangedMapObject(summon, c -> {
            if (c.getPlayer() == null) {
                return;
            }
            if (!summon.isChangedMap() || summon.getOwnerId() == c.getPlayer().getId()) {
                summon.sendSpawnData(c);
            }
        });
    }

    public void spawnFamiliar(MonsterFamiliar familiar) {
        spawnAndAddRangedMapObject(familiar, c -> {
            if (familiar != null && c.getPlayer() != null) {
                familiar.sendSpawnData(c);
            }
        });
    }

    public void spawnExtractor(final MapleExtractor ex) {
        spawnAndAddRangedMapObject(ex, ex::sendSpawnData);
    }

    public void spawnLove(final MapleLove love) {
        spawnAndAddRangedMapObject(love, love::sendSpawnData);

        MapTimer tMan = MapTimer.getInstance();
        tMan.schedule(() -> {
            broadcastMessage(MaplePacketCreator.removeLove(love.getObjectId(), love.getItemId()));
            removeMapObject(love);
        }, 1000 * 60 * 60);
    }

    public void spawnAffectedArea(final MapleAffectedArea mist, final int duration, boolean fake) {
        spawnAndAddRangedMapObject(mist, mist::sendSpawnData);
        mist.setCancelTask(duration);
    }

    public void disappearingItemDrop(MapleMapObject dropper, MapleCharacter owner, Item item, Point pos) {
        Point droppos = calcDropPos(pos, pos);
        MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 1, false);
        drop.setEnterType((byte) 3);
        broadcastMessage(InventoryPacket.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 3), drop.getPosition());
    }

    public void spawnMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final Point droppos = calcDropPos(position, position);
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, c -> c.announce(InventoryPacket.dropItemFromMapObject(mdrop, dropper.getPosition(), droppos, (byte) 1)));
        if (!everlast) {
            mdrop.registerExpire(120000);
            if (droptype == 0 || droptype == 1) {
                mdrop.registerFFA(30000);
            }
        }
    }

    /*
     * 刀飛煉獄推動楓幣
     */
    public void spawnMesoDropEx(final int meso, final Point dropfrom, final Point dropto, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final Point droppos = calcDropPos(dropto, dropto);
        if (Randomizer.nextBoolean()) {
            droppos.x -= Randomizer.rand(0, 20);
        } else {
            droppos.x += Randomizer.rand(0, 20);
        }
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, c -> c.announce(InventoryPacket.dropItemFromMapObject(mdrop, dropfrom, droppos, (byte) 1)));

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
    }

    public void spawnMobMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype, int delay) {
        spawnMobMesoDrop(meso, position, dropper, owner, playerDrop, droptype, delay, 0);
    }

    public void spawnMobMesoDrop(int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype, int delay, int skillID) {
        ChannelServer ch = ChannelServer.getInstance(channel);
        if (ch != null && ch.getChannelType() != ChannelType.普通) {
            int mesoRate = 100;
            switch (ch.getChannelType()) {
                case 混沌:
                    mesoRate = ServerConfig.CHANNEL_CHAOS_MESO;
                    break;
                case 變態:
                    mesoRate = ServerConfig.CHANNEL_ABNORMAL_MESO;
                    break;
                case MVP銅牌:
                    mesoRate = ServerConfig.MVP_CHANNEL_BRONZE_MESO;
                    break;
                case MVP銀牌:
                    mesoRate = ServerConfig.MVP_CHANNEL_SILVER_MESO;
                    break;
                case MVP金牌:
                    mesoRate = ServerConfig.MVP_CHANNEL_GOLD_MESO;
                    break;
                case MVP鑽石:
                    mesoRate = ServerConfig.MVP_CHANNEL_DIAMOND_MESO;
                    break;
                case MVP紅鑽:
                    mesoRate = ServerConfig.MVP_CHANNEL_RED_MESO;
                    break;
            }
            meso *= mesoRate / 100.0;
            if (meso < 0) {
                meso = Integer.MAX_VALUE;
            }
        }
        final MapleMapItem mdrop = new MapleMapItem(meso, position, dropper, owner, droptype, playerDrop);
        mdrop.setSkill(skillID);
        mdrop.setDelay(delay);
        spawnAndAddRangedMapObject(mdrop, c -> c.announce(InventoryPacket.dropItemFromMapObject(mdrop, dropper.getPosition(), position, (byte) 1)));

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
    }

    public void spawnMobPointDrop(final int toCharge, final int point, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype, int delay) {
        if (!ServerConfig.mobPointNeedPickup) {
            pickupPoint(toCharge, point, owner);
            return;
        }
        int itemId;
        switch (toCharge) {
            case 1:
                itemId = 2435892;
                break;
            case 2:
                itemId = 2432107;
                break;
            case 3:
                itemId = 2431872;
                break;
            default:
                return;
        }
        final MapleMapItem mdrop = new MapleMapItem(toCharge, new Item(itemId, (short) 0, (short) point), position, dropper, owner, droptype, playerDrop);
        mdrop.setDelay(delay);
        spawnAndAddRangedMapObject(mdrop, c -> c.announce(InventoryPacket.dropItemFromMapObject(mdrop, dropper.getPosition(), position, (byte) 1)));

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
    }

    public void pickupPoint(final int toCharge, final int point, final MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        switch (toCharge) {
            case 3:
                chr.modifyMileage(point, 2, true, true, "從地圖[" + toString() + "]掉落");
                break;
            default:
                chr.modifyCSPoints(toCharge, point, true);
                break;
        }

        MapleParty party = chr.getParty();
        if (party != null) {
            MapleCharacter pchr = null;
            List<MapleCharacter> mpApplicable = new ArrayList<>();
            for (final MaplePartyCharacter partychar : party.getMemberList()) {
                pchr = getCharacterById(partychar.getId());
                if (pchr != null && pchr.isAlive() && pchr.getCheatTracker().isAttacking()) {
                    if (Math.abs(getFieldLevel() - partychar.getLevel()) <= 20 || Math.abs(chr.getLevel() - partychar.getLevel()) <= 5) {
                        mpApplicable.add(pchr);
                    }
                }
            }
            if (mpApplicable.size() > 1) {
                for (MapleCharacter achr : mpApplicable) {
                    switch (toCharge) {
                        case 3:
                            achr.modifyMileage(ServerConfig.ptyPointModifier, 2, false, true, "隊伍從地圖[" + toString() + "]掉落");
                            break;
                        default:
                            achr.modifyCSPoints(toCharge, ServerConfig.ptyPointModifier, false);
                            break;
                    }
                    achr.dropMessage(6, "組隊獲得" + ServerConfig.ptyPointModifier + (toCharge == 1 ? "樂豆點" : toCharge == 2 ? "楓點" : "里程") + "。");
                }
            }
        }
    }

    public void spawnMobDrop(final MapleMapItem mdrop, final MapleMonster mob, final MapleCharacter chr) {
        if (mdrop == null) {
            return;
        }

        spawnAndAddRangedMapObject(mdrop, c -> {
            if (c != null && c.getPlayer() != null && (mdrop.getQuest() <= 0 || (c.getPlayer().getQuestStatus(mdrop.getQuest()) == 1 && c.getPlayer().needQuestItem(mdrop.getQuest(), mdrop.getItemId()))) && mdrop.getItemId() / 10000 != 238) {
                if (mdrop.getOnlySelfID() >= 0 && c.getPlayer().getId() != mdrop.getOnlySelfID()) {
                    return;
                }
                c.announce(InventoryPacket.dropItemFromMapObject(mdrop, mob != null ? mob.getPosition() : chr != null ? chr.getPosition() : new Point(), mdrop.getPosition(), (byte) 1));
            }
        });

        if (mob != null && chr != null && mob.getStats().getWeaponPoint() > 0 && JobConstants.is神之子(chr.getJob())) {
            chr.gainWeaponPoint(mob.getStats().getWeaponPoint());
        }

        mdrop.registerExpire(120000);
        if (mdrop.getOwnType() == 0 || mdrop.getOwnType() == 1) {
            mdrop.registerFFA(30000);
        }

        if (chr != null) {
            activateItemReactors(mdrop, chr.getClient());
        }
    }

    public void spawnRandDrop() {
        if (mapid != 910000000 || channel != 1) {
            return; //fm, ch1
        }

        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject o : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                if (((MapleMapItem) o).getRand() > 0) {
                    return;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        MapTimer.getInstance().schedule(() -> {
            Point pos = new Point(Randomizer.nextInt(800) + 531, -806);
            int theItem = Randomizer.nextInt(1000);
            int itemid;
            if (theItem < 950) { //0-949 = normal, 950-989 = rare, 990-999 = super
                itemid = GameConstants.normalDrops[Randomizer.nextInt(GameConstants.normalDrops.length)];
            } else if (theItem < 990) {
                itemid = GameConstants.rareDrops[Randomizer.nextInt(GameConstants.rareDrops.length)];
            } else {
                itemid = GameConstants.superDrops[Randomizer.nextInt(GameConstants.superDrops.length)];
            }
            spawnAutoDrop(itemid, pos, 0, 0);
        }, 20000);
    }

    public void spawnAutoDrop(final int itemid, final Point pos, final int dropSpeed, final int sourceOId) {
        Item idrop;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (ItemConstants.getInventoryType(itemid, false) == MapleInventoryType.EQUIP) {
            idrop = ii.randomizeStats(ii.getEquipById(itemid));
            if (Randomizer.isSuccess(30) && !ii.isCash(itemid)) {
                NirvanaFlame.randomState((Equip) idrop, 0);
            }
        } else {
            idrop = new Item(itemid, (byte) 0, (short) 1, 0);
        }
        idrop.setGMLog("自動掉落 " + itemid + " 地圖 " + mapid);
        final MapleMapItem mdrop = new MapleMapItem(idrop, pos);
        mdrop.setDropSpeed(dropSpeed);
        if (dropSpeed > 0) {
            mdrop.setDropMotionType(1);
        }
        mdrop.setSourceOID(sourceOId);
        mdrop.setCollisionPickUp(ii.isRunOnPickup(itemid) || ii.isConsumeOnPickup(itemid));
        if (mdrop.isCollisionPickUp() && mdrop.getDropMotionType() != 0) {
            mdrop.registerExpire(3000);
        } else if (itemid / 10000 != 291) {
            mdrop.registerExpire(120000);
        }
        spawnAndAddRangedMapObject(mdrop, c -> c.announce(InventoryPacket.dropItemFromMapObject(mdrop, pos, pos, (byte) 1)));
        broadcastMessage(InventoryPacket.dropItemFromMapObject(mdrop, pos, pos, (byte) 0));
    }

    public void spawnItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final Item item, Point pos, final boolean ffaDrop, final boolean playerDrop) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 2, playerDrop);

        spawnAndAddRangedMapObject(drop, c -> c.announce(InventoryPacket.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 1)));
        broadcastMessage(InventoryPacket.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 0));

        if (!everlast) {
            drop.registerExpire(120000);
            activateItemReactors(drop, owner.getClient());
        }
    }

    private void activateItemReactors(final MapleMapItem drop, final MapleClient c) {
        final Item item = drop.getItem();

        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (final MapleMapObject o : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                final MapleReactor react = (MapleReactor) o;

                if (react.getReactorType() == 100) {
                    if (item.getItemId() == GameConstants.getCustomReactItem(react.getReactorId(), react.getReactItem().getLeft()) && react.getReactItem().getRight() == item.getQuantity()) {
                        if (react.getArea().contains(drop.getPosition())) {
                            if (!react.isTimerActive()) {
                                MapTimer.getInstance().schedule(new ActivateItemReactor(drop, react, c), 5000);
                                react.setTimerActive(true);
                                break;
                            }
                        }
                    }
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public int getItemsSize() {
        return !mapobjects.containsKey(MapleMapObjectType.ITEM) ? 0 : mapobjects.get(MapleMapObjectType.ITEM).size();
    }

    public int getExtractorSize() {
        return !mapobjects.containsKey(MapleMapObjectType.EXTRACTOR) ? 0 : mapobjects.get(MapleMapObjectType.EXTRACTOR).size();
    }

    public int getMobsSize() {
        return !mapobjects.containsKey(MapleMapObjectType.MONSTER) ? 0 : mapobjects.get(MapleMapObjectType.MONSTER).size();
    }

    public int getRunesSize() {
        return !mapobjects.containsKey(MapleMapObjectType.RUNE) ? 0 : mapobjects.get(MapleMapObjectType.RUNE).size();
    }

    public List<MapleMapItem> getAllItems() {
        return getAllItemsThreadsafe();
    }

    public List<MapleMapItem> getAllItemsThreadsafe() {
        ArrayList<MapleMapItem> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                ret.add((MapleMapItem) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return ret;
    }

    public Point getPointOfItem(int itemid) {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                MapleMapItem mm = (MapleMapItem) mmo;
                if (mm.getItem() != null && mm.getItem().getItemId() == itemid) {
                    return mm.getPosition();
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return null;
    }

    public List<MapleAffectedArea> getAllAffectedAreasThreadsafe() {
        ArrayList<MapleAffectedArea> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.AFFECTED_AREA).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.AFFECTED_AREA).values()) {
                ret.add((MapleAffectedArea) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.AFFECTED_AREA).readLock().unlock();
        }
        return ret;
    }

    public void returnEverLastItem(MapleCharacter chr) {
        for (MapleMapObject o : getAllItemsThreadsafe()) {
            MapleMapItem item = (MapleMapItem) o;
            if (item.getOwnerID() == chr.getId()) {
                item.setPickedUp(true);
                broadcastMessage(InventoryPacket.removeItemFromMap(item.getObjectId(), 2, chr.getId()), item.getPosition());
                if (item.getMeso() > 0) {
                    chr.gainMeso(item.getMeso(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(chr.getClient(), item.getItem(), false);
                }
                removeMapObject(item);
            }
        }
    }

    public void nextNodeAction(int mobid, int time) {
        MapTimer.getInstance().schedule(() -> {
            if (this.getMobObjectByID(mobid) != null) {
                this.broadcastMessage(MobPacket.mobEscortStopEndPermission(this.getMobObjectByID(mobid).getObjectId()));
            }
        }, time);
    }

    public MapleMapEffect getMapEffect() {
        return mapEffect;
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, false);
    }

    public void startMapEffect(String msg, int itemId, boolean jukebox) {
        if (mapEffect != null) {
            if (mapEffect.getScheduledFuture() != null) {
                mapEffect.getScheduledFuture().cancel(false);
            }
            broadcastMessage(mapEffect.makeDestroyData());
            mapEffect = null;
        }
        mapEffect = new MapleMapEffect(msg, itemId);
        mapEffect.setJukebox(jukebox);
        broadcastMessage(mapEffect.makeStartData());
        mapEffect.setScheduledFuture(MapTimer.getInstance().schedule(() -> {
            if (mapEffect != null) {
                broadcastMessage(mapEffect.makeDestroyData());
                mapEffect = null;
                startMapEffect();
            }
        }, jukebox ? 300000 : 15000));
    }

    public void startPredictCardMapEffect(String msg, int itemId, int effectType) {
        startMapEffect(msg, itemId, 30, effectType);
    }

    public void startMapEffect(String msg, int itemId, int time) {
        startMapEffect(msg, itemId, time, -1);
    }

    public void startMapEffect(String msg, int itemId, int time, int effectType) {
        if (mapEffect != null) {
            if (mapEffect.getScheduledFuture() != null) {
                mapEffect.getScheduledFuture().cancel(false);
            }
            broadcastMessage(mapEffect.makeDestroyData());
            mapEffect = null;
        }
        if (time <= 0) {
            time = 5;
        }
        mapEffect = new MapleMapEffect(msg, itemId, effectType);
        mapEffect.setJukebox(false);
        broadcastMessage(mapEffect.makeStartData());
        mapEffect.setScheduledFuture(MapTimer.getInstance().schedule(() -> {
            if (mapEffect != null) {
                broadcastMessage(mapEffect.makeDestroyData());
                mapEffect = null;
                startMapEffect();
            }
        }, time * 1000));
    }

    public void startMapEffect() {
        if (ServerConfig.MAP_EFFECT <= 0 || mapEffect != null) {
            return;
        }
        mapEffect = new MapleMapEffect("", ServerConfig.MAP_EFFECT);
        broadcastMessage(mapEffect.makeStartData());
    }

    public void startExtendedMapEffect(final String msg, final int itemId) {
        broadcastMessage(MaplePacketCreator.startMapEffect(msg, itemId, true));
        MapTimer.getInstance().schedule(() -> {
            broadcastMessage(MaplePacketCreator.removeMapEffect());
            broadcastMessage(MaplePacketCreator.startMapEffect(msg, itemId, false));
        }, 60000);
    }

    public void startSimpleMapEffect(String msg, int itemId) {
        broadcastMessage(MaplePacketCreator.startMapEffect(msg, itemId, true));
    }

    public void showScriptProgressMessage(final String s) {
        this.broadcastMessage(UIPacket.getTopMsg(s));
    }

    public void showScriptProgressItemMessage(final int n, final String s) {
        this.broadcastMessage(UIPacket.ScriptProgressItemMessage(n, s));
    }

    public void setStaticScreenMessage(final int n, final String s, final boolean b) {
        this.broadcastMessage(UIPacket.getMidMsg(n, s, !b));
    }

    public void offStaticScreenMessage() {
        this.broadcastMessage(UIPacket.offStaticScreenMessage());
    }

    public void showWeatherEffectNotice(final String s, final int n, final int n2) {
        this.broadcastMessage(UIPacket.showWeatherEffectNotice(s, n, n2, true));
    }

    public void showWeatherEffectNoticeY(String s, int n, int n2, int n3) {
        this.broadcastMessage(UIPacket.WeatherEffectNoticeY(s, n, n2, n3));
    }

    public void showScreenEffect(final String s) {
        this.broadcastMessage(EffectPacket.showScreenEffect(FieldEffectType.Screen, s, 0));
    }

    public void showScreenDelayedEffect(final String s, final int n) {
        this.showScreenEffect(FieldEffectType.Screen_Delayed, s, n);
    }

    public void showScreenAutoLetterBox(final String s, final int n) {
        this.showScreenEffect(FieldEffectType.Screen_AutoLetterBox, s, n);
    }

    public void showScreenTopScreenDelayedEffect(final String s, final int n) {
        this.showScreenEffect(FieldEffectType.TopScreen_Delayed, s, n);
    }

    private void showScreenEffect(final int n, final String s, final int n2) {
        this.broadcastMessage(EffectPacket.showScreenEffect(n, s, n2));
    }

    public void playFieldSound(final String s) {
        this.broadcastMessage(EffectPacket.playFieldSound(s, 100));
    }

    public void showPortalEffect(final String s, final int n) {
        this.broadcastMessage(MaplePacketCreator.ShowPortal(s, n));
    }

    public void startJukebox(String msg, int itemId) {
        startMapEffect(msg, itemId, true);
    }

    public void userEnterField(MapleCharacter chr) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).writeLock().lock();
        try {
            mapobjects.get(MapleMapObjectType.PLAYER).put(chr.getObjectId(), chr);
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).writeLock().unlock();
        }

        if (!chr.isAlive()) {
            chr.heal();
        }

        chr.getSpecialStat().resetFieldSkillCounters();
        //發送遊戲頂部公告信息
        chr.send(MaplePacketCreator.serverMessage(chr.getClient().getChannelServer().getServerMessage()));
        chr.setChangeTime();
        chr.setInGameCurNode(false);
        if (GameConstants.isTeamMap(mapid) && !chr.inPVP()) {
            chr.setTeam(getAndSwitchTeam() ? 0 : 1);
        }
        broadcastMessage(chr, MaplePacketCreator.spawnPlayerMapobject(chr), true);
        broadcastMessage(chr, EffectPacket.getEffectSwitch(chr.getId(), chr.getEffectSwitch()), true);
        if (chr.getGuild() != null && chr.getGuild().getImageLogo() != null && chr.getGuild().getImageLogo().length > 0) {
            broadcastMessage(chr, GuildPacket.loadGuildIcon(chr), false);
        }
        if (chr.getBuffedValue(MapleBuffStat.AdeleCreateSwords) != null && chr.getBuffedValue(MapleBuffStat.AdeleCharge) != null) {
            List<ForceAtomObject> createList = new ArrayList<>();
            for (ForceAtomObject sword : chr.getForceAtomObjects().values()) {
                if (sword != null) {
                    createList.add(sword);
                }
            }
            broadcastMessage(AdelePacket.ForceAtomObject(chr.getId(), createList, 0), chr.getPosition());
        }
        if (chr.isIntern() && speedRunStart > 0) {
            endSpeedRun();
            broadcastMessage(MaplePacketCreator.serverNotice(5, "The speed run has ended."));
        }
        // 發送地圖控制區域包
        if (areaCtrls != null && !areaCtrls.isEmpty()) {
            chr.send(UIPacket.setAreaControl(null, null, areaCtrls));
        }
        chr.send(MaplePacketCreator.encodeEnableActions());
        // 阿爾卡娜樹
        if (mapid == 450005000) {
            MapleQuestStatus status = new MapleQuestStatus(MapleQuest.getInstance(34479), 1);
            MapleQuestStatus whileTreeStatue = chr.getQuest(MapleQuest.getInstance(34477));
            if (whileTreeStatue != null && whileTreeStatue.getStatus() == 2) {
                status.setStatus((byte) 2);
                status.setCompletionTime(whileTreeStatue.getCompletionTime());
            }
            chr.send(MaplePacketCreator.updateQuest(status));
        }
        // 進圖更新並顯示燃燒場地階段
        int breakTimeFieldStep = getBreakTimeFieldStep();
        updateBreakTimeField();
        if (breakTimeFieldStep == getBreakTimeFieldStep() && breakTimeFieldStep > 0) {
            chr.send(getBreakTimeFieldStepPacket());
        }
//        if (isMiniMapOnOff()) {
//            chr.send(UIPacket.showFreeMarketMiniMap(isMiniMapOnOff()));
//        }
        if (dynamicObj != null) {
            chr.send(UIPacket.sendDynamicObj(false, dynamicObj));
        }
        chr.send(UIPacket.showFreeMarketMiniMap(false));
        //發送給地圖上其他玩家顯示角色的封包
        sendObjectPlacement(chr);
        //地圖觸發腳本事件
        if (!onUserEnter.equals("")) {
            MapScriptMethods.startScript_User(chr.getClient(), onUserEnter);
        }
        if (!onFirstUserEnter.equals("")) {
            if (getCharactersSize() == 1) {
                MapScriptMethods.startScript_FirstUser(chr.getClient(), onFirstUserEnter);
            }
        }
        GameConstants.achievementRatio(chr.getClient());
        //chr.send(MaplePacketCreator.spawnFlags(nodes.getFlags()));
//        if (GameConstants.isTeamMap(mapid) && !chr.inPVP()) {
//            chr.send(MaplePacketCreator.showEquipEffect(chr.getTeam()));
//        }
//        switch (mapid) {
//            case 809000101: //昭和村 - 澡堂(男)
//            case 809000201: //昭和村 - 澡堂(女)
//                chr.send(MaplePacketCreator.showEquipEffect());
//                break;
//        }
        MaplePet[] pets = chr.getSpawnPets();
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null && pets[i].getSummoned()) {
                pets[i].setPos(chr.getPosition());
                chr.petUpdateStats(pets[i], true);
                chr.send(PetPacket.showPet(chr, pets[i], false, (byte) 0, true));
                //chr.send(PetPacket.loadExceptionList(chr, pets[i]));
            }
        }
        if (chr.getAndroid() != null) {
            chr.getAndroid().setPos(chr.getPosition());
            broadcastMessage(AndroidPacket.spawnAndroid(chr, chr.getAndroid()));
        }
        if (chr.getParty() != null) {
            chr.silentPartyUpdate();
            chr.send(PartyPacket.updateParty(chr.getClient().getChannel(), chr.getParty(), PartyOperation.更新隊伍, null));
            chr.updatePartyMemberHP();
            chr.receivePartyMemberHP();
        }

        List<MapleQuickMove> qmList = new LinkedList<>();
        if (!chr.isInBlockedMap() && !chr.inEvent() && 875999999 != mapid) {
            for (MapleQuickMove mqm : QUICK_MOVE) {
                if ((!mqm.TESTPIA || ServerConfig.TESPIA) && chr.getGmLevel() >= mqm.GM_LEVEL && chr.getLevel() >= mqm.MIN_LEVEL) {
                    qmList.add(mqm);
                }
            }
        }
        chr.send(MaplePacketCreator.setQuickMoveInfo(qmList));

        chr.send(MaplePacketCreator.Unknown_42D());
        chr.send(NPCPacket.sendNpcHide(hideNpc));

        List<MapleSummon> ss = chr.getSummonsReadLock();
        try {
            for (MapleSummon summon : ss) {
                summon.setPosition(chr.getPosition());
                chr.addVisibleMapObjectEx(summon);
                this.spawnSummon(summon);
            }
        } finally {
            chr.unlockSummonsReadLock();
        }
        if (mapEffect != null) {
            mapEffect.sendStartData(chr.getClient());
        }
        if (timeLimit > 0 && getForcedReturnMap() != null) {
            chr.startMapTimeLimitTask(timeLimit, getForcedReturnMap());
        }
        if (chr.getBuffedValue(MapleBuffStat.RideVehicle) != null && !JobConstants.is末日反抗軍(chr.getJob())) {
            if (FieldLimitType.TAMINGMOBLIMIT.check(fieldLimit)) {
                chr.dispelEffect(MapleBuffStat.RideVehicle);
            }
        }
        if (chr.getEventInstance() != null && chr.getEventInstance().isTimerStarted()) {
            chr.getEventInstance().showEventTimer(chr, (int) (chr.getEventInstance().getTimeLeft() / 1000));
        }
        if (hasClock()) {
            Calendar cal = Calendar.getInstance();
            chr.send(MaplePacketCreator.getClockTime(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND)));
        }
        if (chr.getEventInstance() != null && chr.getEventReviveCount() >= 0) {
            chr.sendDathCount();
        }
        if (getSquadBegin() != null && getSquadBegin().getTimeLeft() > 0 && getSquadBegin().getStatus() == 1) {
            chr.send(MaplePacketCreator.getClock((int) (getSquadBegin().getTimeLeft() / 1000)));
        }
        if (mapid / 1000 != 105100 && mapid / 100 != 8020003 && mapid / 100 != 8020008 && mapid != 271040100) { //no boss_balrog/2095/coreblaze/auf/cygnus. but coreblaze/auf/cygnus does AFTER
            final MapleSquad sqd = getSquadByMap(); //for all squads
            final EventManager em = getEMByMap();
            if (!squadTimer && sqd != null && chr.getName().equals(sqd.getLeaderName()) && em != null && em.getProperty("leader") != null && em.getProperty("leader").equals("true") && checkStates) {
                //leader? display
                doShrine(false);
                squadTimer = true;
            }
        }
        if (getMobSizeByID() > 0 && (mapid == 280030001 || mapid == 240060201 || mapid == 280030000 || mapid == 280030100 || mapid == 240060200 || mapid == 220080001 || mapid == 541020800 || mapid == 541010100)) {
            String music = "Bgm09/TimeAttack";
            switch (mapid) {
                case 240060200: //生命之穴 - 闇黑龍王洞穴
                case 240060201: //生命之穴 - 進階闇黑龍王洞穴
                    music = "Bgm14/HonTale";
                    break;
                case 280030100: //最後的任務 - 殘暴炎魔的祭台 V.110.1修改
                case 280030000: //神秘島 - 殘暴炎魔的祭台
                case 280030001: //最後的任務 - 進階殘暴炎魔的祭台
                    music = "Bgm06/FinalFight";
                    break;
            }
            chr.send(MaplePacketCreator.musicChange(music));
            //maybe timer too for zak/ht
        }
        if (mapid == 914000000 || mapid == 927000000) { //黑暗領主 - 傷病營舍  秘密地圖 - 時間神殿迴廊1
            chr.send(MaplePacketCreator.temporaryStats_Aran());
        } else if (mapid == 105100300 && chr.getLevel() >= 91) { //巴洛古神殿 - 巴洛古的墓地
            chr.send(MaplePacketCreator.temporaryStats_Balrog(chr));
        }
        if (!lacheln.isEmpty()) {
            chr.send(MobPacket.lucidFieldFoothold(true, getLachelnList()));
        }
        if (!syncFH.isEmpty()) {
            chr.send(MaplePacketCreator.DynamicObjUrusSync(syncFH));
        }
        chr.send(MaplePacketCreator.temporaryStats_Reset());
        if (JobConstants.is龍魔導士(chr.getJob()) && chr.getJob() >= 2200) {
            if (chr.getDragon() == null) {
                chr.makeDragon();
            } else {
                chr.getDragon().setPosition(chr.getPosition());
            }
            if (chr.getDragon() != null) {
                broadcastMessage(SummonPacket.spawnDragon(chr.getDragon()));
            }
        }
        if (JobConstants.is陰陽師(chr.getJob())) {
            if (chr.getHaku() == null) {
                chr.initHaku();
            } else {
                chr.getHaku().setPosition(chr.getPosition());
            }
            spawnSkillPet(chr.getHaku());
        }

        boolean isTutoMap = false;
        for (JobType jt : JobType.values()) {
            if (jt == JobType.終極冒險家) {
                continue;
            }
            if (mapid == jt.mapId) {
                isTutoMap = true;
                break;
            }
        }
        if (mapid == 10000 || isTutoMap) {
            chr.send(MaplePacketCreator.startMapEffect("歡迎來到 " + chr.getClient().getChannelServer().getServerName() + "!", 5122000, true));
            chr.dropMessage(5, "使用 @help 可以查看你當前能使用的命令祝你玩的愉快！");
        }
        if (permanentWeather > 0) {
            chr.send(MaplePacketCreator.startMapEffect("", permanentWeather, false)); //snow, no msg
        }
        if (getPlatforms().size() > 0) {
            chr.send(MaplePacketCreator.getMovingPlatforms(this));
        }
        if (partyBonusRate > 0) {
            //chr.dropMessage(-1, partyBonusRate + "% additional EXP will be applied per each party member here.");
            //chr.dropMessage(-1, "You've entered the party play zone.");
        }
        if (isTown()) {
            chr.dispelEffect(MapleBuffStat.Dance);
        }
        if (!canSoar()) {
            chr.dispelEffect(MapleBuffStat.Flying);
        }
        if (chr.getJob() < 3200 || chr.getJob() > 3212) {
            chr.dispelEffect(MapleBuffStat.BMageAura);
        }
        if (chr.getJob() >= 2400 && chr.getJob() <= 2412) { //幻影職業 更換地圖要顯示角色卡片數量
            chr.updateJudgementStack();
        }
        if (isPvpMap()) {
            chr.dropSpouseMessage(UserChatMessageType.管理員對話, "[系統提示] 您已進入個人PK地圖，請小心。");
        } else if (isPartyPvpMap()) {
            chr.dropSpouseMessage(UserChatMessageType.管理員對話, "[系統提示] 您已進入組隊PK地圖，請小心。");
        } else if (isGuildPvpMap()) {
            chr.dropSpouseMessage(UserChatMessageType.管理員對話, "[系統提示] 您已進入公會PK地圖，請小心。");
        }
//        chr.checkBloodContract();
        chr.send(MaplePacketCreator.showChronosphere(chr.getChronosphere(), (int) Math.ceil(chr.getCSPoints(2) / 5)));
        if (chr.getRuneUseCooldown() <= 0) {
            showRuneCurseStage(chr.getClient());
        }
        DeadDebuff deadDebuff;
        if (getSpawnPoints().size() > 0 && (deadDebuff = DeadDebuff.getDebuff(chr, 1)) != null) {
            chr.send(MaplePacketCreator.sendDeadCurseMsg("套用經驗值獲得、掉落率減少" + deadDebuff.DecExpR + "%效果中！\\r\\n使用護身符咒道具，就能立刻解除。", true));
        }
        if (chr.getEventInstance() == null) {
            // 自動加入活動
            if (event != null) {
                event.registerPlayer(chr);
            }
        } else {
            chr.getEventInstance().enterField(chr);
        }
        // 艾爾達斯的祝福
        int 艾爾達斯的祝福 = 80011993;
        if (chr.getSkillLevel(艾爾達斯的祝福) > 0) {
            MapleBuffStatValueHolder holder = chr.getBuffStatValueHolder(艾爾達斯的祝福);
            if (barrierArc > 0) {
                if (holder == null) {
                    SkillFactory.getSkill(艾爾達斯的祝福).getEffect(1).applyTo(chr);
                }
            } else {
                if (holder != null) {
                    chr.dispelBuff(艾爾達斯的祝福);
                }
            }
        }
        if (!GameConstants.isDojo(mapid)) {
            MapleDojoAgent.checkAgent(chr);
        }

        // 處理永久Buff
        Map<Integer, Integer> foreverBuffs = chr.getForeverBuffs();
        if (foreverBuffs != null && !foreverBuffs.isEmpty()) {
            for (Entry<Integer, Integer> skill : foreverBuffs.entrySet()) {
                if (chr.getBuffStatValueHolder(skill.getKey()) != null) {
                    continue;
                }
                Skill skil = SkillFactory.getSkill(skill.getKey());
                if (skil == null || skil.getEffect(skill.getValue()) == null) {
                    continue;
                }
                skil.getEffect(skill.getValue()).applyTo(chr, chr, false, null, 2100000000);
            }
        }
        chr.giveRebornBuff();
    }

    public int getNumItems() {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            return mapobjects.get(MapleMapObjectType.ITEM).size();
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
    }

    public int getMobSizeByID() {
        return getMobSizeByID(-1);
    }

    public int getMobSizeByID(int mobid) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            if (mobid == -1) {
                return mapobjects.get(MapleMapObjectType.MONSTER).size();
            } else {
                return (int) mapobjects.get(MapleMapObjectType.MONSTER).entrySet().stream().filter(entry -> ((MapleMonster) entry.getValue()).getId() == mobid).count();
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public void doShrine(final boolean spawned) { //false = entering map, true = defeated
        if (squadSchedule != null) {
            cancelSquadSchedule(true);
        }
        final MapleSquad sqd = getSquadByMap();
        if (sqd == null) {
            return;
        }
        final int mode = mapid == 280030000 || mapid == 280030100 ? 1 : mapid == 280030001 ? 2 : mapid == 240060200 || mapid == 240060201 ? 3 : 0;
        //chaos_horntail message for horntail too because it looks nicer
        final EventManager em = getEMByMap();
        if (em != null && getCharactersSize() > 0) {
            final String leaderName = sqd.getLeaderName();
            final String state = em.getProperty("state");
            final Runnable run;
            MapleMap returnMapa = getForcedReturnMap();
            if (returnMapa == null || returnMapa.getId() == mapid) {
                returnMapa = getReturnMap();
            }
            if (mode == 1 || mode == 2) { //chaoszakum
                //broadcastMessage(MaplePacketCreator.showChaosZakumShrine(spawned, 5));
            } else if (mode == 3) { //ht/chaosht
                //broadcastMessage(MaplePacketCreator.showChaosHorntailShrine(spawned, 5));
            } else {
                //broadcastMessage(MaplePacketCreator.showHorntailShrine(spawned, 5));
            }
            if (spawned) { //both of these together dont go well
                broadcastMessage(MaplePacketCreator.getClock(300)); //5 min
            }
            final MapleMap returnMapz = returnMapa;
            if (!spawned) { //no monsters yet; inforce timer to spawn it quickly
                final List<MapleMonster> monsterz = getMonsters();
                final List<Integer> monsteridz = new ArrayList<>();
                for (MapleMapObject m : monsterz) {
                    monsteridz.add(m.getObjectId());
                }
                run = () -> {
                    final MapleSquad sqnow = MapleMap.this.getSquadByMap();
                    if (MapleMap.this.getCharactersSize() > 0 && MapleMap.this.getMobSizeByID() == monsterz.size() && sqnow != null && sqnow.getStatus() == 2 && sqnow.getLeaderName().equals(leaderName) && MapleMap.this.getEMByMap().getProperty("state").equals(state)) {
                        boolean passed = monsterz.isEmpty();
                        for (MapleMapObject m : MapleMap.this.getMonsters()) {
                            for (int i : monsteridz) {
                                if (m.getObjectId() == i) {
                                    passed = true;
                                    break;
                                }
                            }
                            if (passed) {
                                break;
                            } //even one of the monsters is the same
                        }
                        if (passed) {
                            //are we still the same squad? are monsters still == 0?
//                                byte[] packet;
//                                if (mode == 1 || mode == 2) { //chaoszakum
//                                    packet = MaplePacketCreator.showChaosZakumShrine(spawned, 0);
//                                } else {
//                                    packet = MaplePacketCreator.showHorntailShrine(spawned, 0); //chaoshorntail message is weird
//                                }
                            for (MapleCharacter chr : MapleMap.this.getCharacters()) { //warp all in map
                                //chr.send(packet);
                                chr.changeMap(returnMapz, returnMapz.getPortal(0)); //hopefully event will still take care of everything once warp out
                            }
                            checkStates("");
                            resetFully();
                        }
                    }

                };
            } else { //inforce timer to gtfo
                run = () -> {
                    MapleSquad sqnow = MapleMap.this.getSquadByMap();
                    //we dont need to stop clock here because they're getting warped out anyway
                    if (MapleMap.this.getCharactersSize() > 0 && sqnow != null && sqnow.getStatus() == 2 && sqnow.getLeaderName().equals(leaderName) && MapleMap.this.getEMByMap().getProperty("state").equals(state)) {
                        //are we still the same squad? monsters however don't count
//                            byte[] packet;
//                            if (mode == 1 || mode == 2) { //chaoszakum
//                                packet = MaplePacketCreator.showChaosZakumShrine(spawned, 0);
//                            } else {
//                                packet = MaplePacketCreator.showHorntailShrine(spawned, 0); //chaoshorntail message is weird
//                            }
                        for (MapleCharacter chr : MapleMap.this.getCharacters()) { //warp all in map
                            //chr.send(packet);
                            chr.changeMap(returnMapz, returnMapz.getPortal(0)); //hopefully event will still take care of everything once warp out
                        }
                        checkStates("");
                        resetFully();
                    }
                };
            }
            squadSchedule = MapTimer.getInstance().schedule(run, 300000); //5 mins
        }
    }

    public MapleSquad getSquadByMap() {
        MapleSquadType zz;
        switch (mapid) {
            case 105100400: //巴洛古神殿 - 巴洛古的墓地
            case 105100300: //巴洛古神殿 - 巴洛古的墓地
                zz = MapleSquadType.bossbalrog;
                break;
            case 280030000: //神秘島 - 殘暴炎魔的祭台
            case 280030100: //最後的任務 - 殘暴炎魔的祭台 V.110.1修改
                zz = MapleSquadType.zak;
                break;
            case 280030001: //最後的任務 - 進階殘暴炎魔的祭台
                zz = MapleSquadType.chaoszak;
                break;
            case 240060200: //生命之穴 - 闇黑龍王洞穴
                zz = MapleSquadType.horntail;
                break;
            case 240060201: //生命之穴 - 進階闇黑龍王洞穴
                zz = MapleSquadType.chaosht;
                break;
            case 270050100: //神殿的深處 - 神的黃昏
                zz = MapleSquadType.pinkbean;
                break;
            case 270051100: //神殿深處 - 眾神的黃昏
                zz = MapleSquadType.chaospb;
                break;
            case 802000111: //逆奧之城 - 卡姆那 (遠征隊)
                zz = MapleSquadType.nmm_squad;
                break;
            case 802000211: //逆奧之城 - 防禦塔 2100年 (遠征隊)
                zz = MapleSquadType.vergamot;
                break;
            case 802000311: //逆奧之城 - 公園 2095年 (遠征隊)
                zz = MapleSquadType.tokyo_2095;
                break;
            case 802000411: //逆奧之城 - 高科區域 2102年 (遠征隊)
                zz = MapleSquadType.dunas;
                break;
            case 802000611: //逆奧之城 - 天空大戰艦甲板 2102年 (遠征隊)
                zz = MapleSquadType.nibergen_squad;
                break;
            case 802000711: //逆奧之城 - 核心商業區 2102年（遠征隊）
                zz = MapleSquadType.dunas2;
                break;
            case 802000801: //逆奧之城 - 商貿中心 2102年(大廳)
            case 802000802: //逆奧之城 - 商貿中心 2102年(升降機井)
            case 802000803: //逆奧之城 - 商貿中心 2102年(入口)
                zz = MapleSquadType.core_blaze;
                break;
            case 802000821: //逆奧之城 - 商貿中心頂樓 2102年（遠征隊）
            case 802000823: //逆奧之城 - 商貿中心頂樓 2102年（遠征隊）
                zz = MapleSquadType.aufheben;
                break;
            case 211070100: //獅子王之城 - 接見室
            case 211070101: //獅子王之城 - 空中監獄
            case 211070110: //獅子王之城 - 復活塔樓
                zz = MapleSquadType.vonleon;
                break;
            case 551030200: //馬來西亞 - 陰森世界
                zz = MapleSquadType.scartar;
                break;
            case 271040100: //騎士團要塞 - 西格諾斯的殿堂
                zz = MapleSquadType.cygnus;
                break;
            case 689013000: //粉色殘暴炎魔 - 粉色殘暴炎魔 突襲
                zz = MapleSquadType.pinkzak;
                break;
            case 262031300: //希拉之塔 - 希拉之塔
            case 262031310: //希拉之塔 - 靈魂被奪者之屋
                zz = MapleSquadType.hillah;
                break;
            case 272030400: //次元縫隙 - 黑暗祭壇
            case 272030420: //次元縫隙 - 邪惡內心空地
                zz = MapleSquadType.arkarium;
                break;
            default:
                return null;
        }
        return ChannelServer.getInstance(channel).getMapleSquad(zz);
    }

    public MapleSquad getSquadBegin() {
        if (squad != null) {
            return ChannelServer.getInstance(channel).getMapleSquad(squad);
        }
        return null;
    }

    public EventManager getEMByMap() {
        String em;
        switch (mapid) {
            case 105100400: //巴洛古神殿 - 巴洛古的墓地
                em = "BossBalrog_EASY";
                break;
            case 105100300: //巴洛古神殿 - 巴洛古的墓地
                em = "BossBalrog_NORMAL";
                break;
            case 280030100: //最後的任務 - 殘暴炎魔的祭台 V.110.1修改
            case 280030000: //神秘島 - 殘暴炎魔的祭台
                em = "ZakumBattle";
                break;
            case 240060200: //生命之穴 - 闇黑龍王洞穴
                em = "HorntailBattle";
                break;
            case 280030001: //最後的任務 - 進階殘暴炎魔的祭台
                em = "ChaosZakum";
                break;
            case 240060201: //生命之穴 - 進階闇黑龍王洞穴
                em = "ChaosHorntail";
                break;
            case 270050100: //神殿的深處 - 神的黃昏
                em = "PinkBeanBattle";
                break;
            case 270051100: //神殿深處 - 眾神的黃昏
                em = "ChaosPinkBean";
                break;
            case 802000111: //逆奧之城 - 卡姆那 (遠征隊)
                em = "NamelessMagicMonster";
                break;
            case 802000211: //逆奧之城 - 防禦塔 2100年 (遠征隊)
                em = "Vergamot";
                break;
            case 802000311: //逆奧之城 - 公園 2095年 (遠征隊)
                em = "2095_tokyo";
                break;
            case 802000411: //逆奧之城 - 高科區域 2102年 (遠征隊)
                em = "Dunas";
                break;
            case 802000611: //逆奧之城 - 天空大戰艦甲板 2102年 (遠征隊)
                em = "Nibergen";
                break;
            case 802000711: //逆奧之城 - 核心商業區 2102年（遠征隊）
                em = "Dunas2";
                break;
            case 802000801: //逆奧之城 - 商貿中心 2102年(大廳)
            case 802000802: //逆奧之城 - 商貿中心 2102年(升降機井)
            case 802000803: //逆奧之城 - 商貿中心 2102年(入口)
                em = "CoreBlaze";
                break;
            case 802000821: //逆奧之城 - 商貿中心頂樓 2102年（遠征隊）
            case 802000823: //逆奧之城 - 商貿中心頂樓 2102年（遠征隊）
                em = "Aufhaven";
                break;
            case 211070100: //獅子王之城 - 接見室
            case 211070101: //獅子王之城 - 空中監獄
            case 211070110: //獅子王之城 - 復活塔樓
                em = "VonLeonBattle";
                break;
            case 551030200: //馬來西亞 - 陰森世界
                em = "ScarTarBattle";
                break;
            case 271040100: //騎士團要塞 - 西格諾斯的殿堂
                em = "CygnusBattle";
                break;
            case 689013000: //粉色殘暴炎魔 - 粉色殘暴炎魔 突襲
                em = "PinkZakum";
                break;
            case 262031300: //希拉之塔 - 希拉之塔
            case 262031310: //希拉之塔 - 靈魂被奪者之屋
                em = "Hillah_170";
                break;
            case 272030400: //次元縫隙 - 黑暗祭壇
            case 272030420: //次元縫隙 - 邪惡內心空地
                em = "ArkariumBattle";
                break;
            default:
                return null;
        }
        return ChannelServer.getInstance(channel).getEventSM().getEventManager(em);
    }

    public void userLeaveField(MapleCharacter chr) {
        chr.getTempValues().remove("MobZoneState");
        for (MapleAffectedArea area : getAllAffectedAreasThreadsafe()) {
            area.handleEffect(chr, -2);
        }

        if (chr.getBuffStatValueHolder(陰陽師.鬼夜叉_大鬼封魂陣) != null) {
            chr.dispelEffect(陰陽師.鬼夜叉_大鬼封魂陣);
        }

        if (chr.getSpecialStat().getPoolMakerCount() > 0) {
            chr.getSpecialStat().setPoolMakerCount(0);
            chr.send(MaplePacketCreator.poolMakerInfo(false, 0, 0));
            removeAffectedArea(chr.getId(), 重砲指揮官.精準轟炸_2);
        }

        if (everlast) {
            returnEverLastItem(chr);
        }
        removeMapObject(chr);
        chr.checkFollow();
        chr.removeExtractor();
        broadcastMessage(MaplePacketCreator.removePlayerFromMap(chr.getId()));
        if (chr.getHaku() != null) {
            removeMapObject(chr.getHaku());
            chr.getHaku().setObjectId(0);
        }

        removeVisibleSummon(chr);
        checkStates(chr.getName());
        if (mapid == 109020001) { //楓之谷活動 - OX問答
            chr.canTalk(true);
        }
        chr.leaveMap(this);
        if (getOwner() == chr.getId()) {
            setOwner(-1);
        }
    }

    /**
     * 角色離開當前地圖時移除可見的召喚獸
     *
     * @param chr
     */
    public void removeVisibleSummon(MapleCharacter chr) {
        List<MapleSummon> toCancel = new ArrayList<>();
        List<MapleSummon> listSummons = chr.getSummonsReadLock();
        try {
            listSummons.forEach(summon -> {
                broadcastMessage(SummonPacket.removeSummon(summon, true));
                removeMapObject(summon);
                chr.removeVisibleMapObjectEx(summon);
                if (summon.isChangeMapCanceled()) {
                    toCancel.add(summon);
                } else {
                    summon.setChangedMap(true);
                }
            });
        } finally {
            chr.unlockSummonsReadLock();
        }
        toCancel.forEach(summon -> {
            chr.dispelSkill(summon.getSkillId());
            chr.removeSummon(summon);
        });
    }

    public void broadcastGmLvMessage(MapleCharacter source, byte[] packet) {
        broadcastGmLvMessage(source, packet, true);
    }

    public void broadcastGmLvMessage(MapleCharacter source, byte[] packet, boolean repeatToSource) {
        broadcastMessage(source, packet, Double.POSITIVE_INFINITY, source == null ? null : source.getPosition(), repeatToSource, new Pair<>(source == null ? 1 : source.getGmLevel(), Integer.MAX_VALUE));
    }

    public void broadcastBelowGmLvMessage(MapleCharacter source, byte[] packet) {
        broadcastBelowGmLvMessage(source, packet, true);
    }

    public void broadcastBelowGmLvMessage(MapleCharacter source, byte[] packet, boolean repeatToSource) {
        broadcastMessage(source, packet, Double.POSITIVE_INFINITY, source == null ? null : source.getPosition(), repeatToSource, new Pair<>(0, source == null ? 0 : Math.max(source.getGmLevel() - 1, 0)));
    }

    public void broadcastMessage(byte[] packet) {
        broadcastMessage(null, packet, Double.POSITIVE_INFINITY, null, false);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, boolean repeatToSource) {
        broadcastMessage(source, packet, Double.POSITIVE_INFINITY, source.getPosition(), repeatToSource);
    }

    public void broadcastMessage(byte[] packet, Point rangedFrom) {
        broadcastMessage(null, packet, GameConstants.maxViewRange(), rangedFrom, false);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, Point rangedFrom) {
        broadcastMessage(source, packet, GameConstants.maxViewRange(), rangedFrom, true);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, Point rangedFrom, boolean repeatToSource) {
        broadcastMessage(source, packet, GameConstants.maxViewRange(), rangedFrom, repeatToSource);
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, double range, Point rangedFrom, boolean repeatToSource) {
        broadcastMessage(source, packet, range, rangedFrom, repeatToSource, new Pair<>(0, Integer.MAX_VALUE));
    }

    public void broadcastMessage(MapleCharacter source, byte[] packet, double range, Point rangedFrom, boolean repeatToSource, Pair<Integer, Integer> allowGmLevel) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (!repeatToSource && chr == source) {
                    continue;
                }
                if (chr.getGmLevel() < allowGmLevel.getLeft() || chr.getGmLevel() > allowGmLevel.getRight()) {
                    continue;
                }
                if (source != null && source.isHidden() && source.getGmLevel() > chr.getGmLevel()) {
                    continue;
                }
                if (range < Double.POSITIVE_INFINITY && (rangedFrom != null && rangedFrom.distance(chr.getPosition()) > range)) {
                    continue;
                }
                chr.send(packet);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    public void broadcastRuneCurseMessage(byte[] packet) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (chr.getRuneUseCooldown() > 0) {
                    continue;
                }
                chr.send(packet);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    /**
     * 發送對像放置
     *
     * @param chr 角色
     */
    private void sendObjectPlacement(MapleCharacter chr) {
        if (chr == null || chr.getClient() == null) {
            return;
        }
        getMapObjectsInRange(chr.getPosition(), chr.getRange(), GameConstants.rangedMapobjectTypes).forEach(o -> {
            if (o.getType() == MapleMapObjectType.REACTOR) {
                if (!((MapleReactor) o).isAlive()) {
                    return;
                }
            }
            if (chr == o) {
                return;
            }
            o.sendSpawnData(chr.getClient());
            chr.addVisibleMapObjectEx(o);
        });
    }

    /**
     * 獲取地圖節點的距離範圍
     *
     * @param from 位置
     * @param range 距離
     * @return
     */
    public List<MaplePortal> getPortalsInRange(Point from, double range) {
        return portals.values().stream()
                .filter(type -> from.distance(type.getPosition()) <= range && type.getTargetMapId() != mapid && type.getTargetMapId() != 999999999)
                .collect(Collectors.toList());
    }

    /**
     * 獲取地圖上對象的距離範圍
     *
     * @param from 位置
     * @param range 距離
     * @return
     */
    public List<MapleMapObject> getMapObjectsInRange(Point from, double range) {
        List<MapleMapObject> ret = new ArrayList<>();
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                mapobjects.get(type).values().stream().filter(mmo -> from.distance(mmo.getPosition()) <= range).forEach(ret::add);
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    /**
     * 獲取物品的距離範圍
     *
     * @param from 位置
     * @param range 距離
     * @return
     */
    public List<MapleMapObject> getItemsInRange(Point from, double range) {
        return getMapObjectsInRange(from, range, Collections.singletonList(MapleMapObjectType.ITEM));
    }

    /**
     * 獲取怪物的距離範圍
     *
     * @param from 位置
     * @param range 距離
     * @return
     */
    public List<MapleMapObject> getMonstersInRange(Point from, double range) {
        return getMapObjectsInRange(from, range, Collections.singletonList(MapleMapObjectType.MONSTER));
    }

    /**
     * 獲取當前地圖中對像之前的距離範圍
     *
     * @param from 位置
     * @param range 距離
     * @param MapObject_types 對像
     * @return
     */
    public List<MapleMapObject> getMapObjectsInRange(Point from, double range, List<MapleMapObjectType> MapObject_types) {
        List<MapleMapObject> ret = new ArrayList<>();
        for (MapleMapObjectType type : MapObject_types) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                mapobjects.get(type).values().stream().filter(mmo -> from.distance(mmo.getPosition()) <= range).forEach(ret::add);
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public List<MapleMapObject> getItemsInRect(Rectangle box) {
        return getMapObjectsInRect(box, Collections.singletonList(MapleMapObjectType.ITEM));
    }

    public List<MapleMapObject> getMonstersInRect(Rectangle box) {
        return getMapObjectsInRect(box, Collections.singletonList(MapleMapObjectType.MONSTER));
    }

    public List<MapleMapObject> getMapObjectsInRect(Rectangle box, List<MapleMapObjectType> MapObject_types) {
        List<MapleMapObject> ret = new ArrayList<>();
        for (MapleMapObjectType type : MapObject_types) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                mapobjects.get(type).values().stream().filter(mmo -> box.contains(mmo.getPosition())).forEach(ret::add);
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public List<MapleCharacter> getCharactersInRect(Rectangle box) {
        List<MapleCharacter> ret;
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.PLAYER).values().stream().map(it -> ((MapleCharacter) it)).filter(chr -> box.contains(chr.getPosition())).collect(Collectors.toList());
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return ret;
    }

    public List<MapleCharacter> getPlayersInRectAndInList(Rectangle box, List<MapleCharacter> chrList) {
        List<MapleCharacter> character;

        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            character = mapobjects.get(MapleMapObjectType.PLAYER).values().stream().map(it -> ((MapleCharacter) it)).filter(a -> chrList.contains(a) && box.contains(a.getPosition())).collect(Collectors.toList());
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return character;
    }

    public void addPortal(MaplePortal myPortal) {
        portals.put(myPortal.getId(), myPortal);
    }

    public MaplePortal getPortal(String portalname) {
        return portals.values().stream().filter(port -> port.getName().equals(portalname)).findFirst().orElse(null);
    }

    public MaplePortal getPortal(int portalid) {
        return portals.get(portalid);
    }

    public List<MaplePortal> getPortalSP() {
        return portals.values().stream().filter(port -> port.getName().equals("sp")).collect(Collectors.toCollection(LinkedList::new));
    }

    public void resetPortals() {
        for (MaplePortal port : portals.values()) {
            port.setPortalState(true);
        }
    }

    public MapleFootholdTree getFootholds() {
        return footholds;
    }

    public void setFootholds(MapleFootholdTree footholds) {
        this.footholds = footholds;
    }

    public int getNumSpawnPoints() {
        return monsterSpawn.size();
    }

    public void loadMonsterRate() {
        int spawnSize = monsterSpawn.size();
        maxRegularSpawn = (int) Math.ceil(spawnSize * monsterRate);
        if (fixedMob > 0) {
            maxRegularSpawn = fixedMob;
        } else if (maxRegularSpawn <= 2) {
            maxRegularSpawn = 2;
        }

        Collection<Spawns> newSpawn = new LinkedList<>();
        Collection<Spawns> newBossSpawn = new LinkedList<>();
        // Remove carnival spawned mobs
        monsterSpawn.stream().filter(s -> s.getCarnivalTeam() < 2).forEach(s -> {
            if (s.getMonster().isBoss()) {
                newBossSpawn.add(s);
            } else {
                newSpawn.add(s);
            }
        });
        monsterSpawn.clear();
        monsterSpawn.addAll(newBossSpawn);
        monsterSpawn.addAll(newSpawn);

        if (spawnSize > 0 && GameConstants.isForceRespawn(mapid)) {
            createMobInterval = 15000;
        }
    }

    public SpawnPoint addMonsterSpawn(MapleMonster monster, int mobTime, byte carnivalTeam, String msg) {
        if (monster == null) {
            return null;
        }
        Point newpos = calcPointBelow(monster.getPosition());
        newpos.y -= 1;
        SpawnPoint sp = new SpawnPoint(monster, newpos, mobTime, carnivalTeam, msg);
        if (carnivalTeam > -1) {
            monsterSpawn.add(0, sp); //at the beginning
        } else {
            monsterSpawn.add(sp);
        }
        return sp;
    }

    public void addAreaMonsterSpawn(MapleMonster monster, Point pos1, Point pos2, Point pos3, int mobTime, String msg, boolean shouldSpawn, boolean sendWorldMsg) {
        pos1 = calcPointBelow(pos1);
        pos2 = calcPointBelow(pos2);
        pos3 = calcPointBelow(pos3);
        if (pos1 != null) {
            pos1.y -= 1;
        }
        if (pos2 != null) {
            pos2.y -= 1;
        }
        if (pos3 != null) {
            pos3.y -= 1;
        }
        if (pos1 == null && pos2 == null && pos3 == null) {
            System.out.println("WARNING: mapid " + mapid + ", monster " + monster.getId() + " could not be spawned.");
            return;
        } else if (pos1 != null) {
            if (pos2 == null) {
                pos2 = new Point(pos1);
            }
            if (pos3 == null) {
                pos3 = new Point(pos1);
            }
        } else if (pos2 != null) {
            if (pos1 == null) {
                pos1 = new Point(pos2);
            }
            if (pos3 == null) {
                pos3 = new Point(pos2);
            }
        } else if (pos3 != null) {
            if (pos1 == null) {
                pos1 = new Point(pos3);
            }
            if (pos2 == null) {
                pos2 = new Point(pos3);
            }
        }
        monsterSpawn.add(new SpawnPointAreaBoss(monster, pos1, pos2, pos3, mobTime, msg, shouldSpawn, sendWorldMsg));
    }

    public List<Integer> getPlayerIDs(int count) {
        ArrayList<Integer> list = new ArrayList<>();
        List<MapleCharacter> characters = getCharacters();
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (int i = 0; i < count; ++i) {
                list.add(characters.get(Randomizer.nextInt(characters.size())).getId());
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return list;
    }

    public List<MapleCharacter> getCharacters() {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            return mapobjects.get(MapleMapObjectType.PLAYER).values().stream().map(it -> ((MapleCharacter) it)).collect(Collectors.toList());
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    public MapleCharacter getCharacterByName(String id) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter mc = (MapleCharacter) _mmo;
                if (mc.getName().equalsIgnoreCase(id)) {
                    return mc;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return null;
    }

    @Deprecated
    public MapleCharacter getCharacterById(int id) {
        return getPlayerObject(id);
    }

    public MapleCharacter getPlayerObject(int id) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter mc = (MapleCharacter) _mmo;
                if (mc.getId() == id) {
                    return mc;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return null;
    }

    /**
     * 更新當前地圖中的可見對像數據
     *
     * @param chr 角色對像
     * @param mo 地圖對像
     */
    public void updateMapObjectVisibility(MapleCharacter chr, MapleMapObject mo) {
        if (chr == null) {
            return;
        }
        if (!chr.isMapObjectVisible(mo)) { //判斷當前地圖上的對象是否可見
            if (mo.getPosition().distance(chr.getPosition()) <= mo.getRange()) {
                chr.addVisibleMapObjectEx(mo);
                mo.sendSpawnData(chr.getClient());
            }
        } else { // 當前地圖上的對象是可見的
            if (mo.getPosition().distance(chr.getPosition()) > mo.getRange()) {
                chr.removeVisibleMapObjectEx(mo);
                mo.sendDestroyData(chr.getClient());
            } else if (mo.getType() == MapleMapObjectType.MONSTER) { //當前地圖對象的類型為怪物並且是可見的
                if (chr.getPosition().distance(mo.getPosition()) <= GameConstants.maxViewRange_Half()) { //判斷當前角色所在的位置跟地圖中怪物所在的位置是否在遊戲窗口內！
                    updateMonsterController((MapleMonster) mo);
                }
            }
        }
    }

    public void moveMonster(MapleMonster monster, Point reportedPos) {
        monster.setPosition(reportedPos);

        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter mc = (MapleCharacter) _mmo;
                updateMapObjectVisibility(mc, monster);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    //    public void movePlayer(MapleCharacter player, Point newPosition) {
//        player.setPosition(newPosition);
//        if (player.getReactor().get() != null) {
//            player.getReactor().get().setPosition(newPosition);
//        }
//        try {
//            Collection<MapleMapObject> visibleObjects = player.getAndWriteLockVisibleMapObjects();
//            ArrayList<MapleMapObject> copy = new ArrayList<>(visibleObjects);
//            for (MapleMapObject mo : copy) {
//                if (mo != null && getMapObject(mo.getObjectId(), mo.getType()) == mo) {
//                    updateMapObjectVisibility(player, mo);
//                } else if (mo != null) {
//                    visibleObjects.remove(mo);
//                }
//            }
//            for (MapleMapObject mo : getMapObjectsInRange(player.getPosition(), GameConstants.maxViewRange())) {
//                if (mo != null && !player.isMapObjectVisible(mo)) {
//                    mo.sendSpawnData(player.getClient());
//                    visibleObjects.add(mo);
//                }
//            }
//        } finally {
//            player.unlockWriteVisibleMapObjects();
//        }
//    }
    public MaplePortal findClosestSpawnpoint(Point from) {
        MaplePortal closest = getPortal(0);
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distance(from);
            if (portal.getType() >= 0 && portal.getType() <= 2 && distance < shortestDistance && portal.getTargetMapId() == 999999999) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal findClosestPortal(Point from) {
        MaplePortal closest = getPortal(0);
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distance(from);
            if (distance < shortestDistance) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal getRandomSpawnpoint() {
        List<MaplePortal> spawnPoints_ = new ArrayList<>();
        for (MaplePortal portal : portals.values()) {
            if (portal.getType() >= 0 && portal.getType() <= 2) {
                spawnPoints_.add(portal);
            }
        }
        MaplePortal portal = spawnPoints_.get(new Random().nextInt(spawnPoints_.size()));
        return portal != null ? portal : getPortal(0);
    }

    public int getMapObjectSize() {
        return mapobjects.size();
    }

    public int getCharactersSize() {
        int ret = 0;
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            ret = mapobjects.get(MapleMapObjectType.PLAYER).values().size();
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return ret;
    }

    public Collection<MaplePortal> getPortals() {
        return Collections.unmodifiableCollection(portals.values());
    }

    public int getSpawnedMonstersOnMap() {
        return spawnedMonstersOnMap.get();
    }

    public int getSpawnedForcesOnMap() {
        return spawnedForcesOnMap.incrementAndGet();
    }

    public int getSpawnedAffectedAreaOnMap() {
        return spawnedAffectedAreaOnMap.incrementAndGet();
    }

    public void checkRemoveDeadMob() {
        for (MapleMonster mob : getAllMonster()) {
            if (!mob.isAlive()) {
                killMonster(mob);
            }
        }
    }

    public void respawn(boolean force) {
        respawn(force, System.currentTimeMillis());
    }

    public void respawn(boolean force, long now) {
        checkRemoveDeadMob();
        lastSpawnTime = now;
        if (force) { //cpq quick hack
            final int numShouldSpawn = monsterSpawn.size() - spawnedMonstersOnMap.get();

            if (numShouldSpawn > 0) {
                int spawned = 0;

                for (Spawns spawnPoint : monsterSpawn) {
                    spawnPoint.spawnMonster(this);
                    spawned++;
                    if (spawned >= numShouldSpawn) {
                        break;
                    }
                }
            }
        } else {
            int extraSpawnNum = 0;
            ChannelServer ch = ChannelServer.getInstance(channel);
            if (ch != null) {
                switch (ch.getChannelType()) {
                    case 變態:
                    case MVP銅牌:
                        incSpawnMob.put("特別頻道", 10);
                        break;
                    case MVP銀牌:
                        incSpawnMob.put("特別頻道", 20);
                        break;
                    case MVP金牌:
                        incSpawnMob.put("特別頻道", 30);
                        break;
                    case MVP鑽石:
                        incSpawnMob.put("特別頻道", 40);
                        break;
                    case MVP紅鑽:
                        incSpawnMob.put("特別頻道", 50);
                        break;
                }
            } else {
                incSpawnMob.remove("特別頻道");
            }
            for (float rate : incSpawnMob.values()) {
                extraSpawnNum += (int) Math.floor(rate / 100.0 * maxRegularSpawn);
            }
            int maxSpawnNum = GameConstants.isForceRespawn(mapid) ? monsterSpawn.size() : Math.min(maxRegularSpawn + extraSpawnNum, monsterSpawn.size() * 3);
            int eachSpawnNum = monsterSpawn.size();
            for (float rate : eachIncSpawnMob.values()) {
                eachSpawnNum += (int) Math.floor(rate / 100.0 * maxSpawnNum);
            }
            int numShouldSpawn = Math.min(Math.min(eachSpawnNum, (int) (monsterSpawn.size() * 1.5)), maxSpawnNum - spawnedMonstersOnMap.get());
            if (numShouldSpawn > 0) {
                int spawned = 0;

                List<Spawns> randomSpawn = new ArrayList<>(monsterSpawn);
                Collections.shuffle(randomSpawn);

                for (int i = 0; i < (numShouldSpawn > randomSpawn.size() ? 2 : 1); i++) {
                    for (Spawns spawnPoint : randomSpawn) {
                        if (!isSpawns && spawnPoint.getMobTime() > 0) {
                            continue;
                        }
                        if (spawnPoint.shouldSpawn(lastSpawnTime) || GameConstants.isForceRespawn(mapid) || monsterSpawn.size() < 10 && maxRegularSpawn > monsterSpawn.size() && partyBonusRate > 0 && (this.limitMobID <= 0 || this.limitMobID == spawnPoint.getMonster().getId())) {
                            spawnPoint.spawnMonster(this);
                            spawned++;
                        }
                        if (spawned >= numShouldSpawn) {
                            break;
                        }
                    }
                }
            }
        }
    }

    public String getSnowballPortal() {
        int[] teamss = new int[2];
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter chr = (MapleCharacter) _mmo;
                if (chr.getPosition().y > -80) {
                    teamss[0]++;
                } else {
                    teamss[1]++;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        if (teamss[0] > teamss[1]) {
            return "st01";
        } else {
            return "st00";
        }
    }

    public boolean isDisconnected(int id) {
        return dced.contains(id);
    }

    public void addDisconnected(int id) {
        dced.add(id);
    }

    public void resetDisconnected() {
        dced.clear();
    }

    public void startSpeedRun() {
        final MapleSquad squads = getSquadByMap();
        if (squads != null) {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
            try {
                for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                    MapleCharacter chr = (MapleCharacter) _mmo;
                    if (chr.getName().equals(squads.getLeaderName()) && !chr.isIntern()) {
                        startSpeedRun(chr.getName());
                        return;
                    }
                }
            } finally {
                mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
            }
        }
    }

    public void startSpeedRun(String leader) {
        speedRunStart = System.currentTimeMillis();
        speedRunLeader = leader;
    }

    public void endSpeedRun() {
        speedRunStart = 0;
        speedRunLeader = "";
    }

    public void getRankAndAdd(String leader, String time, ExpeditionType type, long timz, Collection<String> squad) {
        try {
            long lastTime = SpeedRunner.getSpeedRunData(type) == null ? 0 : SpeedRunner.getSpeedRunData(type).right;
            StringBuilder rett = new StringBuilder();
            if (squad != null) {
                for (String chr : squad) {
                    rett.append(chr);
                    rett.append(",");
                }
            }
            String z = rett.toString();
            if (squad != null) {
                z = z.substring(0, z.length() - 1);
            }
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                try (PreparedStatement ps = con.prepareStatement("INSERT INTO speedruns(`type`, `leader`, `timestring`, `time`, `members`) VALUES (?,?,?,?,?)")) {
                    ps.setString(1, type.name());
                    ps.setString(2, leader);
                    ps.setString(3, time);
                    ps.setLong(4, timz);
                    ps.setString(5, z);
                    ps.executeUpdate();
                }
            }

            if (lastTime == 0) { //great, we just add it
                SpeedRunner.addSpeedRunData(type, SpeedRunner.addSpeedRunData(new StringBuilder(SpeedRunner.getPreamble(type)), new HashMap<>(), z, leader, 1, time), timz);
            } else {
                //i wish we had a way to get the rank
                //TODO revamp
                SpeedRunner.removeSpeedRunData(type);
                SpeedRunner.loadSpeedRunData(type);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public long getSpeedRunStart() {
        return speedRunStart;
    }

    public void disconnectAll() {
        for (MapleCharacter chr : getCharacters()) {
            if (!chr.isGm()) {
                chr.getClient().disconnect(true, false);
                chr.getClient().getSession().close();
            }
        }
    }

    public List<MapleNPC> getAllNPCs() {
        return getAllNPCsThreadsafe();
    }

    public List<MapleNPC> getAllNPCsThreadsafe() {
        ArrayList<MapleNPC> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.NPC).values()) {
                ret.add((MapleNPC) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
        return ret;
    }

    public void resetNPCs() {
        removeNpc(-1);
    }

    public void resetPQ(int level) {
        resetFully();
        for (MapleMonster mons : getMonsters()) {
            mons.setForcedMobStat(level);
        }
        resetSpawnLevel(level);
    }

    public void resetSpawnLevel(int level) {
        for (Spawns spawn : monsterSpawn) {
            if (spawn instanceof SpawnPoint) {
                ((SpawnPoint) spawn).setLevel(level);
            }
        }
    }

    public void resetFully(final EventInstanceManager eventInstance) {
        this.resetFully(true);
        for (MapleMonster monster : this.getAllMonster()) {
            monster.setEventInstance(eventInstance);
        }
    }

    public void resetFully(final EventInstanceManager eventInstance, final int newLevel) {
        this.resetFully(true);
        for (MapleMonster monster : this.getAllMonster()) {
            monster.setEventInstance(eventInstance);
            monster.setForcedMobStat(newLevel);
        }
        this.resetSpawnLevel(newLevel);
    }

    public void resetFully() {
        resetFully(true);
    }

    public void resetFully(boolean respawn) {
        killAllMonsters(false);
        reloadReactors();
        removeDrops();
        resetNPCs();
        resetSpawns();
        resetDisconnected();
        endSpeedRun();
        cancelSquadSchedule(true);
        resetPortals();
        limitMobID = 0;
        if (respawn) {
            respawn(true);
        }
    }

    public void cancelSquadSchedule(boolean interrupt) {
        squadTimer = false;
        checkStates = true;
        if (squadSchedule != null) {
            squadSchedule.cancel(interrupt);
            squadSchedule = null;
        }
    }

    public void obtacleFall(final int count, final int type1, final int type2) {
        this.broadcastMessage(MaplePacketCreator.createObtacleAtom(count, type1, type2, this));
    }

    public void removeDrops() {
        List<MapleMapItem> mapItems = this.getAllItemsThreadsafe();
        for (MapleMapItem mapItem : mapItems) {
            mapItem.expire(this);
        }
    }

    public void removeDropsDelay() {
        List<MapleMapItem> mapItems = this.getAllItemsThreadsafe();
        int delay = 0, i = 0;
        for (MapleMapItem mapItem : mapItems) {
            i++;
            if (i < 50) { //先清理掉50個道具 然後在處理後面的
                mapItem.expire(this);
            } else {
                delay++;
                if (mapItem.hasFFA()) {
                    mapItem.registerFFA(delay * 20); //最大持續時間為 30000 毫秒 也就是30秒 清理的時候設置為 delay * 20 毫秒
                } else {
                    mapItem.registerExpire(delay * 30); //最大的持續是ian為 120000 毫秒 也就是 120秒 清理的時候設置為 delay * 30 毫秒
                }
            }
        }
    }

    public void resetAllSpawnPoint(int mobid, int mobTime) {
        Collection<Spawns> AllSpawnPoints = new LinkedList<>(monsterSpawn);
        resetFully();
        monsterSpawn.clear();
        for (Spawns spawnPoint : AllSpawnPoints) {
            MapleMonster newMons = MapleLifeFactory.getMonster(mobid);
            newMons.setF(spawnPoint.getF());
            newMons.setCurrentFh(spawnPoint.getFh());
            newMons.setPosition(spawnPoint.getPosition());
            addMonsterSpawn(newMons, mobTime, (byte) -1, null);
        }
        loadMonsterRate();
    }

    public void resetSpawns() {
        boolean changed = false;
        Iterator<Spawns> AllSpawnPoints = monsterSpawn.iterator();
        while (AllSpawnPoints.hasNext()) {
            if (AllSpawnPoints.next().getCarnivalId() > -1) {
                AllSpawnPoints.remove();
                changed = true;
            }
        }
        setSpawns(true);
        if (changed) {
            loadMonsterRate();
        }
    }

    public boolean makeCarnivalSpawn(int team, MapleMonster newMons, int num) {
        MonsterPoint ret = null;
        for (MonsterPoint mp : nodes.getMonsterPoints()) {
            if (mp.team == team || mp.team == -1) {
                Point newpos = calcPointBelow(new Point(mp.x, mp.y));
                newpos.y -= 1;
                boolean found = false;
                for (Spawns s : monsterSpawn) {
                    if (s.getCarnivalId() > -1 && (mp.team == -1 || s.getCarnivalTeam() == mp.team) && s.getPosition().x == newpos.x && s.getPosition().y == newpos.y) {
                        found = true;
                        break; //this point has already been used.
                    }
                }
                if (!found) {
                    ret = mp; //this point is safe for use.
                    break;
                }
            }
        }
        if (ret != null) {
            newMons.setCy(ret.cy);
            newMons.setF(0); //always.
            newMons.setCurrentFh(ret.fh);
            newMons.setRx0(ret.x + 50);
            newMons.setRx1(ret.x - 50); //does this matter
            newMons.setPosition(new Point(ret.x, ret.y));
            newMons.setHide(false);
            SpawnPoint sp = addMonsterSpawn(newMons, 1, (byte) team, null);
            sp.setCarnival(num);
        }
        return ret != null;
    }

    public boolean makeCarnivalReactor(int team, int num) {
        MapleReactor old = getReactorByName(team + "" + num);
        if (old != null && old.getState() < 5) { //already exists
            return false;
        }
        Point guardz = null;
        List<MapleReactor> react = getAllReactorsThreadsafe();
        for (Pair<Point, Integer> guard : nodes.getGuardians()) {
            if (guard.right == team || guard.right == -1) {
                boolean found = false;
                for (MapleReactor r : react) {
                    if (r.getPosition().x == guard.left.x && r.getPosition().y == guard.left.y && r.getState() < 5) {
                        found = true;
                        break; //already used
                    }
                }
                if (!found) {
                    guardz = guard.left; //this point is safe for use.
                    break;
                }
            }
        }
        if (guardz != null) {
            MapleReactor my = new MapleReactor(MapleReactorFactory.getReactor(9980000 + team), 9980000 + team);
            my.setState((byte) 1);
            my.setName(team + "" + num); //lol
            //with num. -> guardians in factory
            spawnReactorOnGroundBelow(my, guardz);
        }
        return guardz != null;
    }

    public void blockAllPortal() {
        for (MaplePortal p : portals.values()) {
            p.setPortalState(false);
        }
    }

    public int getAndAddObjectId() {
        runningOidLock.lock();
        try {
            return runningOid.getAndIncrement();
        } finally {
            runningOidLock.unlock();
        }
    }

    public boolean getAndSwitchTeam() {
        return getCharactersSize() % 2 != 0;
    }

    public void setSquad(MapleSquadType s) {
        this.squad = s;
    }

    public int getChannel() {
        return channel;
    }

    public int getConsumeItemCoolTime() {
        return consumeItemCoolTime;
    }

    public void setConsumeItemCoolTime(int ciit) {
        this.consumeItemCoolTime = ciit;
    }

    public int getPermanentWeather() {
        return permanentWeather;
    }

    public void setPermanentWeather(int pw) {
        this.permanentWeather = pw;
    }

    public void checkStates(String chr) {
        if (!checkStates) {
            return;
        }
        MapleSquad sqd = getSquadByMap();
        EventManager em = getEMByMap();
        int size = getCharactersSize();
        if (sqd != null && sqd.getStatus() == 2) {
            sqd.removeMember(chr);
            if (em != null) {
                if (sqd.getLeaderName().equalsIgnoreCase(chr)) {
                    em.setProperty("leader", "false");
                }
                if (chr.equals("") || size == 0) {
                    em.setProperty("state", "0");
                    em.setProperty("leader", "true");
                    cancelSquadSchedule(!chr.equals(""));
                    sqd.clear();
                    sqd.copy();
                }
            }
        }
        if (em != null && em.getProperty("state") != null && (sqd == null || sqd.getStatus() == 2) && size == 0) {
            em.setProperty("state", "0");
            if (em.getProperty("leader") != null) {
                em.setProperty("leader", "true");
            }
        }
        if (speedRunStart > 0 && size == 0) {
            endSpeedRun();
        }
        //if (squad != null) {
        //    final MapleSquad sqdd = ChannelServer.getInstance(channel).getMapleSquad(squad);
        //    if (sqdd != null && chr != null && chr.length() > 0 && sqdd.getAllNextPlayer().contains(chr)) {
        //	sqdd.getAllNextPlayer().remove(chr);
        //	broadcastMessage(MaplePacketCreator.serverNotice(5, "The queued player " + chr + " has left the map."));
        //    }
        //}
    }

    public void setCheckStates(boolean b) {
        this.checkStates = b;
    }

    public List<MaplePlatform> getPlatforms() {
        return nodes.getPlatforms();
    }

    public Collection<MapleNodeInfo> getNodes() {
        return nodes.getNodes();
    }

    public void setNodes(MapleNodes mn) {
        this.nodes = mn;
    }

    public MapleNodeInfo getNode(int index) {
        return nodes.getNode(index);
    }

    public boolean isLastNode(int index) {
        return nodes.isLastNode(index);
    }

    public List<Rectangle> getAreas() {
        return nodes.getAreas();
    }

    public Rectangle getArea(int index) {
        return nodes.getArea(index);
    }

    public void changeEnvironment(String ms, int type) {
        broadcastMessage(MaplePacketCreator.environmentChange(ms, type));
    }

    public int getNumPlayersInArea(int index) {
        return getNumPlayersInRect(getArea(index));
    }

    public int getNumPlayersInRect(Rectangle rect) {
        int ret = 0;
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            //            MapleCharacter a;
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter character = (MapleCharacter) _mmo;
                if (rect.contains(character.getPosition())) {
                    ret++;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        return ret;
    }

    public int getNumPlayersItemsInArea(int index) {
        return getNumPlayersItemsInRect(getArea(index));
    }

    public int getNumPlayersItemsInRect(Rectangle rect) {
        int ret = getNumPlayersInRect(rect);
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                if (rect.contains(mmo.getPosition())) {
                    ret++;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return ret;
    }

    public List<Pair<Integer, Integer>> getMobsToSpawn() {
        return nodes.getMobsToSpawn();
    }

    public List<Integer> getSkillIds() {
        return nodes.getSkillIds();
    }

    public boolean canSpawn(long now) {
        if (!isSpawns) {
            return false;
        }
        if (lastSpawnTime <= 0) {
            lastSpawnTime = System.currentTimeMillis();
            return false;
        }
        int createMobIntervalTime = createMobInterval - (int) Math.floor(decMobIntervalR / 100.0 * createMobInterval);
        return lastSpawnTime + Math.max(decMobIntervalR >= 100 ? 0 : 2000, createMobIntervalTime) < now;
    }

    public boolean canHurt(long now) {
        if (lastHurtTime > 0 && lastHurtTime + decHPInterval < now) {
            lastHurtTime = now;
            return true;
        }
        return false;
    }

    public void resetShammos(final MapleClient c) {
        killAllMonsters(true);
        broadcastMessage(MaplePacketCreator.serverNotice(5, "A player has moved too far from Shammos. Shammos is going back to the start."));
        EtcTimer.getInstance().schedule(() -> {
            if (c.getPlayer() != null) {
                c.getPlayer().changeMap(MapleMap.this, getPortal(0));
                if (getCharacters().size() > 1) {
                    MapScriptMethods.startScript_FirstUser(c, "shammos_Fenter");
                }
            }
        }, 500); //avoid dl
    }

    public int getInstanceId() {
        return instanceid;
    }

    public void setInstanceId(int ii) {
        this.instanceid = ii;
    }

    public int getPartyBonusRate() {
        return partyBonusRate;
    }

    public void setPartyBonusRate(int ii) {
        this.partyBonusRate = ii;
    }

    public short getTop() {
        return top;
    }

    public void setTop(int ii) {
        this.top = (short) ii;
    }

    public short getBottom() {
        return bottom;
    }

    public void setBottom(int ii) {
        this.bottom = (short) ii;
    }

    public short getLeft() {
        return left;
    }

    public void setLeft(int ii) {
        this.left = (short) ii;
    }

    public short getRight() {
        return right;
    }

    public void setRight(int ii) {
        this.right = (short) ii;
    }

    public List<Pair<Point, Integer>> getGuardians() {
        return nodes.getGuardians();
    }

    public DirectionInfo getDirectionInfo(int i) {
        return nodes.getDirection(i);
    }

    /*
     * 是否是自由市場地圖
     */
    public boolean isMarketMap() {
        return mapid >= 910000000 && mapid <= 910000017;
    }

    /*
     * 是否PK地圖
     */
    public boolean isPvpMaps() {
        return isPvpMap() || isPartyPvpMap() || isGuildPvpMap();
    }

    /*
     * 是否個人PK地圖
     */
    public boolean isPvpMap() {
        return ServerConstants.isPvpMap(mapid);
    }

    /*
     * 是否組隊PK地圖
     */
    public boolean isPartyPvpMap() {
        return mapid == 910000019 || mapid == 910000020;
    }

    /*
     * 是否公會PK地圖
     */
    public boolean isGuildPvpMap() {
        return mapid == 910000021 || mapid == 910000022;
    }

    /*
     * 是否是BOSS地圖
     */
    public boolean isBossMap() {
        switch (mapid) {
            case 105100400: //巴洛古神殿 - 巴洛古的墓地
            case 105100300: //巴洛古神殿 - 巴洛古的墓地
            case 280030000: //神秘島 - 殘暴炎魔的祭台
            case 280030100: //最後的任務 - 殘暴炎魔的祭台
            case 280030001: //最後的任務 - 進階殘暴炎魔的祭台
            case 240040700: //神木村 - 生命之穴入口
            case 240060200: //生命之穴 - 闇黑龍王洞穴
            case 240060201: //生命之穴 - 進階闇黑龍王洞穴
            case 270050100: //神殿的深處 - 神的黃昏
            case 802000111: //逆奧之城 - 卡姆那 (遠征隊)
            case 802000211: //逆奧之城 - 防禦塔 2100年 (遠征隊)
            case 802000311: //逆奧之城 - 公園 2095年 (遠征隊)
            case 802000411: //逆奧之城 - 高科區域 2102年 (遠征隊)
            case 802000611: //逆奧之城 - 天空大戰艦甲板 2102年 (遠征隊)
            case 802000711: //逆奧之城 - 核心商業區 2102年（遠征隊）
            case 802000801: //逆奧之城 - 商貿中心 2102年(大廳)
            case 802000802: //逆奧之城 - 商貿中心 2102年(升降機井)
            case 802000803: //逆奧之城 - 商貿中心 2102年(入口)
            case 802000821: //逆奧之城 - 商貿中心頂樓 2102年（遠征隊）
            case 802000823: //逆奧之城 - 商貿中心頂樓 2102年（遠征隊）
            case 211070100: //獅子王之城 - 接見室
            case 211070101: //獅子王之城 - 空中監獄
            case 211070110: //獅子王之城 - 復活塔樓
            case 551030200: //馬來西亞 - 陰森世界
            case 271040100: //騎士團要塞 - 西格諾斯的殿堂
            case 271040200: //騎士團要塞 - 西格諾斯的後院
            case 300030310: //艾琳森林 - 女王藏身處
            case 220080001: //玩具城 - 時間塔的本源
            case 262031300: //希拉之塔 - 希拉之塔
            case 262031310: //希拉之塔 - 靈魂被奪者之屋
            case 272030400: //次元縫隙 - 黑暗祭壇
            case 272030420: //次元縫隙 - 邪惡內心空地
                return true;
            default:
                return false;
        }
    }

    /*
     * 檢測角色是否吸怪
     */
    public void checkMoveMonster(Point from, boolean fly, MapleCharacter chr) {
        if (maxRegularSpawn <= 2 || monsterSpawn.isEmpty() || monsterRate <= 1.0 || chr == null) {
            return;
        }
        int check = (int) ((fly ? 70 : 60) / 100.0 * maxRegularSpawn);
        //System.err.println("檢測數量: " + check + " 怪物數量: " + getMonstersInRange(from, 4000.0).size() + " 最大刷新: " + maxRegularSpawn);
        if (getMonstersInRange(from, 71).size() >= check) {
            //System.err.println("怪物數量超過 殺死所有怪物...");
            for (MapleMapObject obj : getMonstersInRange(from, Double.POSITIVE_INFINITY)) {
                MapleMonster mob = (MapleMonster) obj;
                killMonster(mob, chr, false, false, (byte) 1, 0);
            }
        }
    }

    /*
     * 召喚箭矢炮盤
     */
    public void createdFieldAttackObject(final MapleFieldAttackObj attackObj) {
        this.addMapObject(attackObj);
        this.objectMove(-1, attackObj, null);
        attackObj.setSchedule(MapTimer.getInstance().schedule(() -> {
            disappearMapObject(attackObj);
            attackObj.cancel();
        }, attackObj.getDuration()));
        attackObj.setState(0);
    }

    public List<MapleFieldAttackObj> getFieldAttackObject(MapleCharacter chr) {
        List<MapleFieldAttackObj> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.FIELD_ATTACK_OBJ).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.FIELD_ATTACK_OBJ).values()) {
                MapleFieldAttackObj obj = (MapleFieldAttackObj) mmo;
                if (obj.getOwnerId() == chr.getId()) {
                    ret.add(obj);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.FIELD_ATTACK_OBJ).readLock().unlock();
        }
        return ret;
    }

    public List<MapleFieldAttackObj> getFieldAttackObject(MapleCharacter chr, int state) {
        List<MapleFieldAttackObj> ret = new ArrayList<>();
        mapobjectlocks.get(MapleMapObjectType.FIELD_ATTACK_OBJ).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.FIELD_ATTACK_OBJ).values()) {
                MapleFieldAttackObj obj = (MapleFieldAttackObj) mmo;
                if (obj.getState() == state && obj.getOwnerId() == chr.getId()) {
                    ret.add(obj);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.FIELD_ATTACK_OBJ).readLock().unlock();
        }
        return ret;
    }

    public void addKSPsychicObject(int chrid, int skillid, List<KSPsychicSkillEntry> infos) {
        Map<Integer, List<Pair<Integer, Integer>>> ksobj = new HashMap<>();
        List<Pair<Integer, Integer>> objs = new ArrayList<>();
        for (KSPsychicSkillEntry ksse : infos) {
            objs.add(new Pair<>(ksse.getOid(), ksse.getMobOid() != 0 ? ksse.getMobOid() : ksse.getObjectid()));
        }
        ksobj.put(skillid, objs);
        kspsychicObjects.put(chrid, ksobj);
    }

    public int removeKSPsychicObject(int chrid, int skillid, int moboid) {
        int oid = -1;
        kspsychicLock.writeLock().lock();
        try {
            if (!kspsychicObjects.containsKey(chrid)) {
                return oid;
            } else if (!kspsychicObjects.get(chrid).containsKey(skillid)) {
                return oid;
            }
            Iterator<Pair<Integer, Integer>> it = kspsychicObjects.get(chrid).get(skillid).iterator();
            while (it.hasNext()) {
                Pair<Integer, Integer> ks = it.next();
                if (ks.getRight() == moboid) {
                    oid = ks.getLeft();
                    it.remove();
                }
            }
        } finally {
            kspsychicLock.writeLock().unlock();
        }
        return oid;
    }

    public void addKSUltimateSkill(int chrid, int moboid) {
        ksultimates.put(chrid, moboid);
    }

    public void removeKSUltimateSkill(int chrid, int moboid) {
        ksultimates.remove(chrid, moboid);
    }

    public boolean isKSUltimateSkill(int chrid, int moboid) {
        return ksultimates.containsKey(chrid) && ksultimates.get(chrid) == moboid;
    }

    public void createFlyingSword(int id) {
        this.createSwordNode(id);
    }

    public void createFlyingSword(int id, Point point) {
        this.createSwordNode(id, point);
    }

    public void createSwordNode(int n2) {
        this.createSwordNode(n2, null);
    }

    public void createSwordNode(int n2, Point point) {
        int oid;
        if (swordNodes == null) {
            swordNodes = new HashMap<>();
        }
        runningOidLock.lock();
        try {
            oid = runningOid.getAndIncrement();
        } finally {
            runningOidLock.unlock();
        }
        Point point2 = point == null ? new Point(Randomizer.rand(left, right), -200) : point;
        MapleSwordNode swordNode = new MapleSwordNode(n2, oid, point2);
        swordNodes.put(oid, swordNode);
        broadcastMessage(MobPacket.CreateDemianFlyingSword(true, oid, n2, point2));
        broadcastMessage(MobPacket.NodeDemianFlyingSword(oid, false, swordNode));
        int chrid = getCharacters().get(Randomizer.nextInt(getCharactersSize())).getId();
        swordNode.setBKM(chrid);
        broadcastMessage(MobPacket.TargetDemianFlyingSword(oid, chrid));
        swordNodeAck(oid, false);
    }

    public void swordNodeAck(int oid, boolean bl2) {
        MapleSwordNode i2 = swordNodes.get(oid);
        if (i2 == null) {
            return;
        }
        if (i2.getSwordNodeInfos().size() < 14) {
            i2.a(top, bottom, left, right, bl2);
            broadcastMessage(MobPacket.NodeDemianFlyingSword(oid, true, swordNodes.get(oid)));
        } else {
            MobSkill mobSkill;
            i2.gainCount();
            if (i2.getCount() >= 14 && (mobSkill = MobSkillFactory.getMobSkill(131, 28)) != null) {
                Point point = new Point(i2.getPoint());
                MapleMonster monster = getMobObjectByID(i2.getMonsterId());
                if (monster != null) {
                    createAffectedArea(new MapleAffectedArea(mobSkill.calculateBoundingBox(point, true), monster, mobSkill, point));
                }
            }
        }
    }

    public void swordNodeEnd(int oid) {
        if (swordNodes == null) {
            return;
        }
        MapleSwordNode swordNode = swordNodes.get(oid);
        if (swordNode == null) {
            return;
        }
        if (swordNode.getSwordNodeInfos().size() >= 14) {
            swordNode.getSwordNodeInfos().clear();
            Point point = swordNode.getPoint();
            createSwordNode(swordNode.getMonsterId(), point);
        }
    }

    public Point getRandomPos(Point pos) {
        pos = new Point(pos);
        List<MapleFoothold> relevants = this.getFootholds().getAllRelevants();
        int size = relevants.size();
        MapleFoothold fh;
        if (size > 0 && (fh = relevants.get(Randomizer.nextInt(size))) != null) {
            final boolean b = fh.getX1() > fh.getX2();
            final int z = Randomizer.rand(b ? fh.getX2() : fh.getX1(), b ? fh.getX1() : fh.getX2());
            final boolean b2 = fh.getY1() > fh.getY2();
            pos = new Point(z, Randomizer.rand(b2 ? fh.getY2() : fh.getY1(), b2 ? fh.getY1() : fh.getY2()));
        }
        return pos;
    }

    public Point getRandomPoint() {
        ArrayList<Point> arrayList = new ArrayList<>();
        this.getFootholds().getAllRelevants().forEach(p2 -> {
            int n2 = p2.getX1();
            int n3 = p2.getX2();
            int n4 = p2.getY1();
            int n5 = p2.getY2();
            int n6 = 0;
            if (n2 > n4) {
                n6 = n2;
                n2 = n4;
                n4 = n6;
            }
            if (n3 > n5) {
                n6 = n3;
                n3 = n5;
                n5 = n6;
            }
            arrayList.add(new Point(Randomizer.rand(n2, n4), Randomizer.rand(n3, n5)));
        }
        );
        return arrayList.get(Randomizer.nextInt(arrayList.size()));
    }

    public void setEntrustedFishing(boolean entrustedFishing) {
        this.entrustedFishing = entrustedFishing;
    }

    public boolean allowFishing() {
        return this.entrustedFishing;
    }

    public Map<Integer, Pair<String, Point>> getObjTag() {
        return objTag;
    }

    public Point getObjTag(final String s) {
        for (final Pair<String, Point> pair : this.objTag.values()) {
            if (s.contains(pair.left)) {
                return new Point(pair.right);
            }
        }
        return new Point();
    }

    public Map<String, Point> getLacheln() {
        return lacheln;
    }

    public List<String> getLachelnList() {
        return new ArrayList<>(lacheln.keySet());
    }

    public List<Pair<String, Point>> getSyncFH() {
        return syncFH;
    }

    public List<MapleMapItem> getStealMesoObject(MapleCharacter chr, int bulletCount, int range) {
        this.mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            final ArrayList<MapleMapItem> list = new ArrayList<>();
            final Iterator<MapleMapObject> iterator = this.mapobjects.get(MapleMapObjectType.ITEM).values().iterator();
            while (iterator.hasNext()) {
                final MapleMapItem item;
                if ((item = (MapleMapItem) iterator.next()).getMeso() > 0 && (item.getSkill() == 暗影神偷.勇者掠奪術 || item.getSkill() == 暗影神偷.血腥掠奪術) && item.getOwnerID() == chr.getId() && (range == -1 || chr.getPosition().distance(item.getPosition()) <= range)) {
                    list.add(item);
                }
                if (bulletCount != -1 && list.size() >= bulletCount) {
                    break;
                }
            }
            return list;
        } finally {
            this.mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
    }

    public MapleMonster getMobObject(int objectID) {
        final MapleMapObject mapObject;
        if ((mapObject = this.getMapObject(objectID, MapleMapObjectType.MONSTER)) == null) {
            return null;
        }
        return (MapleMonster) mapObject;
    }

    public MapleRandomPortal getRandomPortalObject(int objectID) {
        final MapleMapObject mapObject;
        if ((mapObject = this.getMapObject(objectID, MapleMapObjectType.RANDOM_PORTAL)) == null) {
            return null;
        }
        return (MapleRandomPortal) mapObject;
    }

    public MaplePortal getFreePortal(MapleCharacter owner) {
        List<MaplePortal> list = new ArrayList<>();
        for (MaplePortal portal : portals.values()) {
            if (portal.getType() == 6) {
                list.add(portal);
            }
        }
        list.sort(Comparator.comparingInt(MaplePortal::getId));
        this.mapobjectlocks.get(MapleMapObjectType.TOWN_PORTAL).readLock().lock();
        try {
            for (MapleMapObject obj : this.mapobjects.get(MapleMapObjectType.TOWN_PORTAL).values()) {
                if (obj instanceof TownPortal) {
                    final TownPortal door = (TownPortal) obj;
                    if (door.getOwner() != null && door.getOwner().getParty() != null && owner != null && owner.getParty() != null && owner.getParty().getPartyId() == door.getOwner().getParty().getPartyId()) {
                        return null;
                    }
                    list.remove(door.getTownPortal());
                }
            }
        } finally {
            this.mapobjectlocks.get(MapleMapObjectType.TOWN_PORTAL).readLock().unlock();
        }
        if (list.size() <= 0) {
            return null;
        }
        return list.get(Randomizer.nextInt(list.size()));
    }

    public List<MapleMapItem> getKannaSigliObject(MapleCharacter player, int size) {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            List<MapleMapItem> list = new ArrayList<>();
            long limit = size;
            for (MapleMapObject it : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                MapleMapItem mapleMapItem = (MapleMapItem) it;
                if (mapleMapItem.getItem() != null && mapleMapItem.getItemId() == 4033270 && mapleMapItem.getOwnerID() == player.getId() && player.getPosition().distance(mapleMapItem.getPosition()) <= 500.0) {
                    if (limit-- == 0) {
                        break;
                    }
                    list.add(mapleMapItem);
                }
            }
            return list;

        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
    }

    public void checkMapItemExpire(long now) {
        this.mapobjectlocks.get(MapleMapObjectType.ITEM).writeLock().lock();
        try {
            final Iterator<MapleMapObject> iterator = this.mapobjects.get(MapleMapObjectType.ITEM).values().iterator();
            while (iterator.hasNext()) {
                final MapleMapItem mapItem = (MapleMapItem) iterator.next();
                if (mapItem.shouldExpire(now)) {
                    mapItem.setAnimation(mapItem.getDropMotionType() != 0 ? 6 : 0);
                    iterator.remove();
                    removeRangedMapObject(mapItem);
                } else {
                    if (mapItem.shouldFFA(now)) {
                        mapItem.setOwnType((byte) 2);
                    }
                }
            }
        } finally {
            this.mapobjectlocks.get(MapleMapObjectType.ITEM).writeLock().unlock();
        }
    }

    public void checkMobKill() {
        final ArrayList<MapleMonster> list = new ArrayList<>();
        final long currentTimeMillis = System.currentTimeMillis();
        for (MapleMonster monster : getAllMonster()) {
            if (monster.shouldKill(currentTimeMillis)) {
                list.add(monster);
            }
        }
        if (!list.isEmpty()) {
            for (final MapleMonster monster : list) {
                killMonster(monster, null, false, false, (monster.getStats().getSelfD() < 0) ? 1 : monster.getStats().getSelfD(), 0);
            }
        }
    }

    public List<FieldAttackObjInfo> getFieldAttackObjInfo() {
        return fieldAttackObjInfo;
    }

    public List<TaggedObjRegenInfo> getTaggedObjRegenInfo() {
        return taggedObjRegenInfo;
    }

    public void handleMapObject() {
        //todo
        if (!this.fieldAttackObjInfo.isEmpty()) {
            for (FieldAttackObjInfo objInfo : this.fieldAttackObjInfo) {
                if (System.currentTimeMillis() > objInfo.nextHandleTime) {
                    objInfo.nextHandleTime = System.currentTimeMillis() + (objInfo.regenTime + objInfo.destroyTime) * 1000;
                    final MapleFieldAttackObj obj = new MapleFieldAttackObj(objInfo.id, 0, objInfo.destroyTime * 1000);
                    obj.setSide(objInfo.flip);
                    obj.setPosition(this.getObjTag(objInfo.regenObjTag));
                    this.createdFieldAttackObject(obj);
                }
            }
        }
        if (!this.taggedObjRegenInfo.isEmpty()) {
            final ArrayList<TaggedObjRegenInfo> list = new ArrayList<TaggedObjRegenInfo>();
            for (TaggedObjRegenInfo regenInfo : this.taggedObjRegenInfo) {
                if ((regenInfo).isVisible() && System.currentTimeMillis() > regenInfo.ake) {
                    regenInfo.setVisible(false);
                    regenInfo.akd = System.currentTimeMillis() + regenInfo.getRegenTime() * 1000;
                    list.add(regenInfo);
                } else {
                    final TaggedObjRegenInfo a161;
                    if ((a161 = regenInfo).isVisible() || System.currentTimeMillis() <= a161.akd) {
                        continue;
                    }
                    regenInfo.setVisible(true);
                    regenInfo.ake = System.currentTimeMillis() + regenInfo.getRemoveTime() * 1000;
                    list.add(regenInfo);
                }
            }
            if (!list.isEmpty()) {
                this.broadcastMessage(MaplePacketCreator.SetMapTaggedObjectSmoothVisible(list));
            }
        }
        long timeNow = System.currentTimeMillis();
        int mapWidth = Math.abs(getRight() - getLeft());
        int mapHeight = Math.abs(getBottom() - getTop());
        for (MapleMonster monster : getMonsters()) {
            if (monster.getStats().isRewardSprinkle()) {
                int x = (int) monster.getPosition().getX();
                x += mapWidth - Randomizer.nextInt(2 * mapWidth);
                x = Math.min(Math.max(x, getLeft() + 50), getRight() - 50);
                int y = Math.min(Math.max(getTop() + monster.getRewardSprinkleCount() * (Randomizer.nextInt(mapHeight / 40) + 5), getTop() + 50), getBottom() - 50);
                broadcastMessage(MobPacket.mobMoveControl(monster.getObjectId(), new Point(x, y)));
            }
            if (monster.shouldDrop(timeNow)) {
                monster.doDropItem(timeNow);
            } else if (monster.getStats() != null && monster.getStats().isRewardSprinkle() && monster.getRewardSprinkleCount() <= 0) {
                monster.cancelDropItem();
            }
        }
//        if (this.moveFoothold != null && this.moveFoothold.ma()) {
//            this.moveFoothold.D(!this.moveFoothold.mg());
//            this.moveFoothold.mb();
//            this.broadcastMessage(MaplePacketCreator.a(this.moveFoothold));
//        }
    }

    public void setDecHPr(int decHPr) {
        this.decHPr = decHPr;
    }

    public int getDecHPr() {
        return decHPr;
    }

    public List<Rectangle> getRandRect() {
        return randRect;
    }

    public void actionButterfly(boolean b, int n) {
//        final ArrayList<Integer> list = new ArrayList<Integer>();
//        Point c = new Point();
//        if (n == 2) {
//            this.butterflyCount.set(0);
//            for (int i = 0; i < 40; ++i) {
//                if (!this.getCharacters().isEmpty()) {
//                    this.getCharactersSize();
//                }
//                list.add(this.getCharacters().get(Randomizer.nextInt(this.getCharactersSize())).getID());
//            }
//        }
//        else if (n == 0) {
//            c = N1013.c(b, this.butterflyCount.getAndIncrement());
//        }
//        this.broadcastMessage(MaplePacketCreator.a(n, list, new Point(c)));
    }

    public void setLimitMobID(int limitMobID) {
        this.limitMobID = limitMobID;
    }

    public int getLimitMobID() {
        return limitMobID;
    }

    public void forceTrigger(final String reactorName, final byte state) {
        for (MapleReactor reactor : this.getAllReactor()) {
            if (reactor.getName().equalsIgnoreCase(reactorName)) {
                reactor.forceHitReactor(state);
            }
        }
    }

    public void forceTriggerStateEnd(final String reactorName, final byte state, final byte stateEnd) {
        for (MapleReactor reactor : this.getAllReactor()) {
            if (reactor.getName().equalsIgnoreCase(reactorName)) {
                reactor.setStateEnd(stateEnd);
                reactor.forceHitReactor(state);
            }
        }
    }

    public void forceTrigger(final int reactorId, final byte newState) {
        for (MapleReactor reactor : this.getAllReactor()) {
            if (reactor.getReactorId() == reactorId) {
                reactor.forceHitReactor(newState);
            }
        }
    }

    public int getReactorStat(final String s) {
        for (MapleReactor reactor : this.getAllReactor()) {
            if (reactor.getName().equals(s)) {
                return reactor.getState();
            }
        }
        return -999;
    }

    public int getEventMobSize() {
        int n = 0;
        for (MapleMonster mapleMonster : getAllMonster()) {
            if (!mapleMonster.getStats().getType().equalsIgnoreCase("6H")) {
                ++n;
            }
        }
        return n;
    }

    public List<MapleCharacter> getPartyMembersInRange(MapleParty party, Point position, int i) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            final ArrayList<MapleCharacter> list = new ArrayList<MapleCharacter>();
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                assert mmo instanceof MapleCharacter;
                MapleCharacter player = (MapleCharacter) mmo;
                if (player.getParty() != null && player.getParty().getPartyId() == party.getPartyId() && position.distance(player.getPosition()) < i) {
                    list.add(player);
                }
            }
            return list;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
    }

    public void setMapMark(String mapMark) {
        this.mapMark = mapMark;
    }

    public String getMapMark() {
        return mapMark;
    }

    public Map<Integer, Map<Integer, SpecialChairTW>> getSpecialChairTWs() {
        return specialChairTWs;
    }

    public void setSpecialChairTWs(Map<Integer, Map<Integer, SpecialChairTW>> specialChairTWs) {
        this.specialChairTWs = specialChairTWs;
    }

    private interface DelayedPacketCreation {

        void sendPackets(MapleClient c);
    }

    private class ActivateItemReactor implements Runnable {

        private final MapleMapItem mapitem;
        private final MapleReactor reactor;
        private final MapleClient c;

        public ActivateItemReactor(MapleMapItem mapitem, MapleReactor reactor, MapleClient c) {
            this.mapitem = mapitem;
            this.reactor = reactor;
            this.c = c;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId(), mapitem.getType()) && !mapitem.isPickedUp()) {
                mapitem.expire(MapleMap.this);
                reactor.hitReactor(c);
                reactor.setTimerActive(false);

                if (reactor.getDelay() > 0) {
                    MapTimer.getInstance().schedule(() -> reactor.forceHitReactor((byte) 0), reactor.getDelay());
                }
            } else {
                reactor.setTimerActive(false);
            }
        }
    }

    /**
     * 刷新線程
     *
     * @return
     */
    public int getCreateMobInterval() {
        return createMobInterval;
    }

    public int getIncSpawnMobR(String type) {
        return incSpawnMob.getOrDefault(type, 0);
    }

    public void setIncSpawnMobR(String type, int rate) {
        incSpawnMob.put(type, rate);
    }

    public void removeIncSpawnMobR(String type) {
        incSpawnMob.remove(type);
    }

    public int getEachIncSpawnMobR(String type) {
        return eachIncSpawnMob.getOrDefault(type, 0);
    }

    public void setEachIncSpawnMobR(String type, int rate) {
        eachIncSpawnMob.put(type, rate);
    }

    public void removeEachIncSpawnMobR(String type) {
        eachIncSpawnMob.remove(type);
    }

    public int getFieldLevel() {
        if (fieldLevel == -1) {
            List<Integer> lvArr = new LinkedList<>();
            List<Integer> mobArr = new LinkedList<>();
            for (Spawns mob : monsterSpawn) {
                if (mob == null || mob.getMonster() == null || mobArr.contains(mob.getMonster().getId()) || mob.getMobTime() < 0) {
                    continue;
                }
                if (!lvArr.contains(mob.getMonster().getLevel())) {
                    lvArr.add((int) mob.getMonster().getLevel());
                }
                mobArr.add(mob.getMonster().getId());
            }
            int totalLevel = 0;
            for (int lv : lvArr) {
                totalLevel += lv;
            }
            fieldLevel = mobArr.size() == 0 ? 0 : (int) Math.floor(totalLevel / mobArr.size());
        }
        return fieldLevel;
    }

    public int getBreakTimeFieldStep() {
        return breakTimeFieldStep;
    }

    public boolean isBreakTimeField() {
        return !isTown() && getFieldLevel() != 0 && getFieldLevel() >= 100;
    }

    public void setBreakTimeFieldStep(int step) {
        breakTimeFieldStep = step;
    }

    public void updateBreakTimeField() {
        int lastStep = breakTimeFieldStep;
        if (breakTimeFieldStep < 0) {
            lastStep = 0;
        }
        long eachTime = 10 * 60 * 1000; // 10 分鐘
        long now = System.currentTimeMillis();
        if (breakTimeFieldLastTime == 0) {
            int sqlBreakTimeFieldStep = -1;
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                try (PreparedStatement ps = con.prepareStatement("SELECT * FROM breaktimefield WHERE `world` = ? AND `channel` = ? AND `map` = ?")) {
                    ps.setInt(1, 0);
                    ps.setInt(2, channel);
                    ps.setInt(3, mapid);
                    ResultSet rs = ps.executeQuery();
                    if (rs.next()) {
                        sqlBreakTimeFieldStep = rs.getInt("breakTimeFieldStep");
                    }
                    rs.close();
                }
            } catch (SQLException ex) {
                throw new Error("讀取燃燒場地資料出錯.", ex);
            }
            breakTimeFieldStep = !isBreakTimeField() ? 0 : sqlBreakTimeFieldStep < 0 ? ServerConfig.MAX_BREAKTIMEFIELD_STEP : sqlBreakTimeFieldStep;
        } else {
            if (breakTimeFieldTime / eachTime != breakTimeFieldStep) {
                breakTimeFieldTime = ((breakTimeFieldStep + 1) * eachTime) - 1000;
            }
            long time = now - breakTimeFieldLastTime;
            if (time > 0) {
                if (isBreakTimeField() && time >= eachTime) {
                    breakTimeFieldTime = Math.min(((ServerConfig.MAX_BREAKTIMEFIELD_STEP + 1) * eachTime) - 1000, breakTimeFieldTime + time);
                } else {
                    breakTimeFieldTime = Math.max(0, breakTimeFieldTime - time);
                }
                breakTimeFieldStep = (int) (breakTimeFieldTime / eachTime);
            }
        }
        breakTimeFieldLastTime = now;
        if (breakTimeFieldStep != lastStep && breakTimeFieldStep >= 0) {
            broadcastMessage(getBreakTimeFieldStepPacket());
        }
    }

    public void saveBreakTimeFieldStep() {
        if (!isBreakTimeField()) {
            return;
        }
        updateBreakTimeField();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM breaktimefield WHERE `world` = ? AND `channel` = ? AND `map` = ?")) {
                ps.setInt(1, 0);
                ps.setInt(2, channel);
                ps.setInt(3, mapid);
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            throw new Error("移除燃燒場地資料出錯.", ex);
        }
        if (breakTimeFieldStep >= 10 || breakTimeFieldStep < 0) {
            return;
        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO breaktimefield (world, channel, map, breakTimeFieldStep) VALUES (?, ?, ?, ?)")) {
                ps.setInt(1, 0);
                ps.setInt(2, channel);
                ps.setInt(3, mapid);
                ps.setInt(4, breakTimeFieldStep);
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            throw new Error("儲存燃燒場地資料出錯.", ex);
        }
    }

    public byte[] getBreakTimeFieldStepPacket() {
        if (breakTimeFieldStep <= 0) {
            return EffectPacket.showCombustionMessage("#fn哥德 ExtraBold##fs26#          消滅燃燒的範圍！！   ", 1500, -200);
        } else {
            return EffectPacket.showCombustionMessage(String.format("#fn哥德 ExtraBold##fs26#          燃燒%d階段 : 經驗值追加贈送 %d0%%！！   ", breakTimeFieldStep, breakTimeFieldStep), 1500, -200);
        }
    }

    public void setDynamicObj(String sBGM, String sFrame, String sEffect) {
        dynamicObj = new Pair(2, new Triple<>(sBGM, sFrame, sEffect));
        broadcastMessage(UIPacket.sendDynamicObj(true, dynamicObj));
    }

    public void setDynamicObj() {
        dynamicObj = new Pair(3, null);
        broadcastMessage(UIPacket.sendDynamicObj(true, dynamicObj));
    }

    public void removeDynamicObj() {
        dynamicObj = null;
        broadcastMessage(UIPacket.sendDynamicObj(false, dynamicObj));
    }

    public boolean isOnEliteBossEvent() {
        return event != null && event.getEventManager() != null && EliteBoss.class.getSimpleName().equalsIgnoreCase(event.getEventManager().getName());
    }

    public int getOwner() {
        return ownerId;
    }

    public long getOwnerStartTime() {
        return ownerStartTime;
    }

    public void setOwner(int chrId) {
        ownerId = chrId;
        ownerStartTime = System.currentTimeMillis();
        broadcastMessage(EffectPacket.showCombustionMessage("#fn哥德 ExtraBold##fs26#          防搶圖已" + (chrId > -1 ? "開啟" : "解除") + "！！   ", 4000, -100));
    }

    public boolean setOwner(int chrId, int point) {
        if (!canEnterField(chrId) || ownerId == chrId) {
            return false;
        }
        MapleCharacter owner = null;
        mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().lock();
        try {
            for (MapleMapObject _mmo : mapobjects.get(MapleMapObjectType.PLAYER).values()) {
                MapleCharacter mc = (MapleCharacter) _mmo;
                if (mc.getId() == chrId) {
                    owner = mc;
                } else if (!mc.isIntern()) {
                    return false;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).readLock().unlock();
        }
        if (owner == null || owner.checkEvent() || owner.getCSPoints(-1) < point) {
            return false;
        }
        if (owner.getCSPoints(2) >= point) {
            owner.modifyCSPoints(2, -point);
        } else {
            point -= owner.getCSPoints(2);
            owner.modifyCSPoints(2, -owner.getCSPoints(2));
            owner.modifyCSPoints(1, -point);
        }
        setOwner(chrId);
        return true;
    }

    public boolean canEnterField(int chrId) {
        if (ownerId == -1) {
            return true;
        }
        return ownerId == chrId || System.currentTimeMillis() - ownerStartTime >= (30 * 60 * 1000);
    }

    public List<String> getAreaControls() {
        return areaCtrls;
    }

    public void setAreaControls(List<String> list) {
        areaCtrls = list;
    }

    public int getBarrier() {
        return barrier;
    }

    public void setBarrier(int val) {
        barrier = val;
    }

    public int getBarrierArc() {
        return barrierArc;
    }

    public void setBarrierArc(int val) {
        barrierArc = val;
    }

    public int getBarrierAut() {
        return barrierAut;
    }

    public void setBarrierAut(int val) {
        barrierAut = val;
    }

    public void removeSpecialChair(SpecialChair var1, int var2) {
        ArrayList<Integer> var3 = new ArrayList<>();
        boolean var4 = false;
        if (var1.V() == var2) {
            var4 = true;
            for (int i : var1.vt()) {
                if (i > 0) {
                    var3.add(i);
                }
            }
            var1.clear();
        } else {
            var1.oj(var2);
            var3.add(var2);
        }

        for (int integer : var3) {
            MapleCharacter var10 = getPlayerObject(integer);
            if ((var10) != null) {
                var10.setChair(null);
                var10.setSpecialChair(null);
                var10.send(MaplePacketCreator.UserSitResult(var10.getId(), -1));
                boolean var10003;
                SpecialChair var10004;
                if (!var4) {
                    var10003 = true;
                    var10004 = var1;
                } else {
                    var10003 = false;
                    var10004 = var1;
                }

                this.broadcastMessage(MaplePacketCreator.SpecialChairSitResult(integer, false, var10003, var10004));
                this.broadcastMessage(MaplePacketCreator.UserSetActivePortableChair(var10), var10.getPosition());
            }
        }
    }

    public void removeSpecialChairTW(int var1, int var2) {
        ArrayList<Integer> var3 = new ArrayList<>();
        synchronized (this.specialChairTWs) {
            Map<Integer, SpecialChairTW> var9 = this.specialChairTWs.get(var1);
            SpecialChairTW var10;
            if ((var9) != null && (var10 = var9.remove(var2)) != null) {
                for (Integer integer : var10.vu().keySet()) {
                    (var3).add(integer);
                    MapleCharacter var31 = getPlayerObject(integer);
                    if ((var31) != null) {
                        var31.setChair(null);
                        var31.setSpecialChairTW(null);
                        var31.getClient().announce(MaplePacketCreator.UserSitResult(integer, -1));
                        this.broadcastMessage(MaplePacketCreator.UserSetActivePortableChair(var31), var31.getPosition());
                        this.broadcastMessage(MaplePacketCreator.SpecialChairTWRemove(1, integer, 0));
                        this.broadcastMessage(MaplePacketCreator.SpecialChairSitResult(integer, false, false, null));
                    }

                }
                for (Integer var13 : var10.vv().keySet()) {
                    (var3).add(var13);
                    MapleCharacter var31 = getPlayerObject(var13);
                    if ((var31) != null) {
                        var31.setChair(null);
                        var31.setSpecialChairTW(null);
                        var31.getClient().announce(MaplePacketCreator.UserSitResult(var13, -1));
                        this.broadcastMessage(MaplePacketCreator.UserSetActivePortableChair(var31), var31.getPosition());
                        this.broadcastMessage(MaplePacketCreator.SpecialChairTWRemove(1, var13, 0));
                        this.broadcastMessage(MaplePacketCreator.SpecialChairSitResult(var13, false, false, null));
                    }

                }
                var10.clear();
            }
        }

        this.broadcastMessage(MaplePacketCreator.SpecialChairTWSitResult(0, this.specialChairTWs, var3));
    }

    public void removeSpecialChairTW(int var1, int var2, int var3) {
        synchronized (this.specialChairTWs) {
            Map<Integer, SpecialChairTW> var7;
            SpecialChairTW var8;
            if ((var7 = this.specialChairTWs.get(var1)) != null && (var8 = var7.get(var2)) != null) {
                if (var8.vv().containsKey(var3)) {
                    var8.om(var3);
                }

                if (var8.vu().containsKey(var3)) {
                    var8.oj(var3);
                }

                MapleCharacter var9 = getPlayerObject(var3);
                if ((var9) != null) {
                    var9.setChair(null);
                    var9.setSpecialChairTW((SpecialChairTW) null);
                    var9.getClient().announce(MaplePacketCreator.UserSitResult(var9.getId(), -1));
                    this.broadcastMessage(MaplePacketCreator.UserSetActivePortableChair(var9), var9.getPosition());
                    this.broadcastMessage(MaplePacketCreator.SpecialChairSitResult(var3, false, false, null));
                    this.broadcastMessage(MaplePacketCreator.SpecialChairTWRemove(1, var9.getId(), 0));
                }
            }
        }

        this.broadcastMessage(MaplePacketCreator.SpecialChairTWSitResult(0, this.specialChairTWs, Collections.singletonList(var3)));
    }

    public void specialChair$C(int var1, int var2, int var3) {
        synchronized (this.specialChairTWs) {
            Map<Integer, SpecialChairTW> var7;
            if ((var7 = this.specialChairTWs.get(var1)) != null) {
                SpecialChairTW var8 = var7.get(var2);
                if ((var8) != null && var8.ok(var3)) {
                    this.broadcastMessage(MaplePacketCreator.SpecialChairTWInviteResult(1, var3, 1));
                    this.broadcastMessage(MaplePacketCreator.SpecialChairTWSitResult(0, this.specialChairTWs, Collections.emptyList()));
                }
            }
        }
    }

    public void specialChair$D(int var1, int var2, int var3) {
        synchronized (this.specialChairTWs) {
            Map<Integer, SpecialChairTW> var7 = this.specialChairTWs.get(var1);
            if (var7 != null) {
                SpecialChairTW var8 = var7.get(var2);
                if (var8 != null) {
                    var8.ol(var3);
                }
            }
        }
        this.broadcastMessage(MaplePacketCreator.SpecialChairTWSitResult(0, this.specialChairTWs, Collections.emptyList()));
    }

    public void specialChair$b(SpecialChairTW var1) {
        synchronized (this.specialChairTWs) {
            Map<Integer, SpecialChairTW> var3;
            if ((var3 = this.specialChairTWs.get(var1.getItemId())) == null) {
                var3 = new HashMap<>();
                this.specialChairTWs.put(var1.getItemId(), var3);
            }

            var3.put(var1.V(), var1);
        }

        this.broadcastMessage(MaplePacketCreator.SpecialChairTWSitResult(0, this.specialChairTWs, Collections.EMPTY_LIST));
    }

    public EventInstanceManager getEvent() {
        return event;
    }

    public void setEvent(EventInstanceManager eim) {
        event = eim;
    }

    public boolean getSpawns() {
        return isSpawns;
    }

    public void setSpawns(boolean b) {
        this.isSpawns = b;
        if (b) {
            lastSpawnTime = System.currentTimeMillis();
        }
    }

    public int getAreaBroadcastMobId() {
        return areaBroadcastMobId;
    }

    public void setAreaBroadcastMobId(int id) {
        areaBroadcastMobId = id;
    }

    public void startAreaBroadcastMob(int id) {
        setAreaBroadcastMobId(id);
        broadcastAreaMob(0);
    }

    public void stopAreaBroadcastMob() {
        setAreaBroadcastMobId(-1);
        broadcastAreaMob(1);
    }

    public void broadcastAreaMob(int mode) {
        ChannelServer ch = ChannelServer.getInstance(channel);
        if (ch != null) {
            ch.broadcastMapAreaMessage(mapid / 10000000, MaplePacketCreator.bossMessage(mode, mapid, areaBroadcastMobId));
        }
    }

    public String spawnDebug() {
        String sb = "Mobs in map : " + this.getMobsSize()
                + " spawnedMonstersOnMap: "
                + spawnedMonstersOnMap
                + " spawnpoints: "
                + monsterSpawn.size()
                + " maxRegularSpawn: "
                + maxRegularSpawn
                + " actual monsters: "
                + getMobSizeByID()
                + " monster rate: "
                + monsterRate
                + " fixed: "
                + fixedMob
                + " isSpawns: "
                + isSpawns
                + " createMobInterval: "
                + createMobInterval
                + " decMobIntervalR: "
                + decMobIntervalR;

        return sb;
    }

    @Override
    public String toString() {
        return "'" + getStreetName() + " : " + getMapName() + "'(" + getId() + ")";
    }
}
