package scripting;

import client.*;
import client.inventory.*;
import client.skills.Skill;
import client.skills.SkillFactory;
import configs.Config;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.enums.BroadcastMessageType;
import constants.enums.FieldEffectType;
import constants.enums.InGameDirectionType;
import constants.enums.UserChatMessageType;
import database.DatabaseConnection;
import database.DatabaseConnectionEx;
import database.dao.AccountDao;
import database.tools.SqlTool;
import ecpay.EcpayPayment;
import handling.channel.ChannelServer;
import handling.channel.handler.InterServerHandler;
import handling.channel.handler.PlayerHandler;
import handling.opcode.EffectOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.World;
import handling.world.WorldBroadcastService;
import handling.world.WorldGuildService;
import handling.world.WorldPartyService;
import handling.world.guild.MapleGuild;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import org.apache.logging.log4j.Logger;
import packet.*;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.event.EventScriptManager;
import scripting.npc.NPCScriptManager;
import server.*;
import server.MapleUnionData.MapleUnionRankData;
import server.Timer;
import server.RankingTop.CharNameAndId;
import server.commands.GMCommand;
import server.events.DimensionMirrorEvent;
import server.events.MapleDojoAgent;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.factory.MobCollectionFactory;
import server.life.*;
import server.maps.*;
import server.quest.MapleQuest;
import tools.*;
import tools.data.MaplePacketLittleEndianWriter;
import tools.json.JSONObject;

import java.awt.*;
import java.lang.ref.WeakReference;
import java.sql.*;
import java.util.List;
import java.util.*;
import java.util.stream.Collectors;

@SuppressWarnings("unused")
public abstract class AbstractPlayerInteraction extends CommonActionManager{

    protected static final Logger log = AbstractScriptManager.log;
    private static final Map<Pair, MapleNPC> npcs = new WeakHashMap<>();
    protected final WeakReference<MapleClient> client;
    protected final int npcID;
    protected final String script;
    private String scriptPath;
    private long petSN = -1;
    private int number;
    private String text;
    private final Item item;

    public AbstractPlayerInteraction(MapleClient client) {
        this.client = new WeakReference<>(client);
        this.npcID = 0;
        this.script = "";
        this.item = null;
    }

    public AbstractPlayerInteraction(MapleClient client, int npcID, String script, Item item) {
        this.client = new WeakReference<>(client);
        this.npcID = npcID;
        this.script = script;
        this.item = item;
    }

    public Item getItem() {
        return item;
    }

    /*
     * 獲取連接
     */
    public MapleClient getClient() {
        return client.get();
    }

    public MapleClient getC() {
        return client.get();
    }

    /*
     * 獲取角色
     */
    public MapleCharacter getChar() {
        return getClient().getPlayer();
    }

    public MapleCharacter getPlayer() {
        return getClient().getPlayer();
    }

    public int getPosX() {
        return getClient().getPlayer().getPosition().x;
    }

    public int getPosY() {
        return getClient().getPlayer().getPosition().y;
    }

    /*
     * 獲取頻道
     */
    public ChannelServer getChannelServer() {
        return getClient().getChannelServer();
    }

    public EventManager getEventManager(String event) {
        return getClient().getChannelServer().getEventSM().getEventManager(event);
    }

    public EventInstanceManager getEventInstance() {
        return getClient().getPlayer().getEventInstance();
    }

    public boolean inEvent() {
        return inEvent(false);
    }

    public boolean inEvent(boolean all) {
        return getClient().getPlayer().inEvent(all);
    }

    public boolean inMapEvent() {
        EventInstanceManager eim = getEventInstance();
        return eim != null && eim.isMapEvent();
    }

    /*
     * 角色地圖傳送
     */
    public void warp(int mapId) {
        MapleMap mapz = getWarpMap(mapId);
        if (mapz == null) {
            playerMessage(1, "不存在的地圖ID:" + mapId + "\r\n請聯繫管理員刪除該地圖傳送");
            return;
        }
        try {
            getClient().getPlayer().changeMap(mapz, mapz.getPortalSP().get(nextInt(mapz.getPortalSP().size())));
        } catch (Exception e) {
            getClient().getPlayer().changeMap(mapz, mapz.getPortal(0));
        }
    }

    public void warp_Instanced(int mapId) {
        MapleMap mapz = getMap_Instanced(mapId);
        try {
            getClient().getPlayer().changeMap(mapz, mapz.getPortalSP().get(nextInt(mapz.getPortalSP().size())));
        } catch (Exception e) {
            getClient().getPlayer().changeMap(mapz, mapz.getPortal(0));
        }
    }

    public void warp(int mapId, int portal) {
        MapleMap mapz = getWarpMap(mapId);
        if (portal != 0 && mapId == getClient().getPlayer().getMapId()) { //test
            Point portalPos = new Point(getClient().getPlayer().getMap().getPortal(portal).getPosition());
            if (portalPos.distance(getPlayer().getPosition()) < 448) { //estimation0
                instantMapWarp((byte) portal); //until we get packet for far movement, this will do
                getPlayer().checkFollow();
                getPlayer().setPosition(portalPos);
                getMap().objectMove(-1, getPlayer(), null);
            } else {
                getPlayer().changeMap(mapz, mapz.getPortal(portal));
            }
        } else if (mapz != null) {
            getPlayer().changeMap(mapz, mapz.getPortal(portal));
        } else {
            throw new IllegalArgumentException("錯誤的地圖ID：" + mapId);
        }
    }

    public void warpS(int mapId, int portal) {
        MapleMap mapz = getWarpMap(mapId);
        getClient().getPlayer().changeMap(mapz, mapz.getPortal(portal));
    }

    public void warp(int mapId, String portal) {
        MapleMap mapz = getWarpMap(mapId);
        if (mapId == 109060000 || mapId == 109060002 || mapId == 109060004) {
            portal = mapz.getSnowballPortal();
        }
        MaplePortal objPortal = mapz.getPortal(portal);
        if (objPortal == null) {
            objPortal = mapz.getPortal(0);
        }
        if (mapId == getClient().getPlayer().getMapId()) { //test
            MaplePortal portalPos = getClient().getPlayer().getMap().getPortal(portal);
            if (portalPos != null && portalPos.getPosition().distance(getPlayer().getPosition()) < 300) { //estimation
                getClient().getPlayer().checkFollow();
                instantMapWarp((byte) portalPos.getId());
                getPlayer().setPosition(portalPos.getPosition());
                getMap().objectMove(-1, getPlayer(), null);
            } else {
                getClient().getPlayer().changeMap(mapz, objPortal);
            }
        } else {
            getClient().getPlayer().changeMap(mapz, objPortal);
        }
    }

    public void warpS(int mapId, String portal) {
        MapleMap mapz = getWarpMap(mapId);
        if (mapId == 109060000 || mapId == 109060002 || mapId == 109060004) {
            portal = mapz.getSnowballPortal();
        }
        getClient().getPlayer().changeMap(mapz, mapz.getPortal(portal));
    }

    public void warpMap(int mapId, int portal) {
        MapleMap map = getMap(mapId);
        for (MapleCharacter chr : getClient().getPlayer().getMap().getCharacters()) {
            chr.changeMap(map, map.getPortal(portal));
        }
    }

    public void playPortalSE() {
        getClient().announce(EffectPacket.playPortalSE());
    }

    private MapleMap getWarpMap(int mapId) {
        return ChannelServer.getInstance(getClient().getChannel()).getMapFactory().getMap(mapId);
    }

    public MapleMap getMap() {
        return getClient().getPlayer().getMap();
    }

    public MapleMap getMap(int mapId) {
        return getWarpMap(mapId);
    }

    public MapleMap getMap_Instanced(int mapId) {
        return getClient().getPlayer().getEventInstance() == null ? getMap(mapId) : getClient().getPlayer().getEventInstance().getMapInstance(mapId);
    }

    /*
     * 刷出怪物
     * 通過修改怪物的等級來刷怪
     */
    public void spawnMobLevel(int mobId, int level) {
        spawnMobLevel(mobId, 1, level, getClient().getPlayer().getPosition());
    }

    public void spawnMobLevel(int mobId, int quantity, int level) {
        spawnMobLevel(mobId, quantity, level, getClient().getPlayer().getPosition());
    }

    public void spawnMobLevel(int mobId, int quantity, int level, int x, int y) {
        spawnMobLevel(mobId, quantity, level, new Point(x, y));
    }

    public void spawnMobLevel(int mobId, int quantity, int level, Point pos) {
        for (int i = 0; i < quantity; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob == null) {
                if (getClient().getPlayer().isAdmin()) {
                    getClient().getPlayer().dropMessage(-11, "[系統提示] spawnMobLevel召喚怪物出錯，ID為: " + mobId + " 怪物不存在！");
                }
                continue;
            }
            mob.setForcedMobStat(level);
            getClient().getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
        }
    }

    /*
     * 自定義改變怪物的血和經驗
     */
    public void spawnMobStats(int mobId, long newhp, int newExp) {
        spawnMobStats(mobId, 1, newhp, newExp, getClient().getPlayer().getPosition());
    }

    public void spawnMobStats(int mobId, int quantity, long newhp, int newExp) {
        spawnMobStats(mobId, quantity, newhp, newExp, getClient().getPlayer().getPosition());
    }

    public void spawnMobStats(int mobId, int quantity, long newhp, int newExp, int x, int y) {
        spawnMobStats(mobId, quantity, newhp, newExp, new Point(x, y));
    }

    public void spawnMobStats(int mobId, int quantity, long newhp, int newExp, Point pos) {
        for (int i = 0; i < quantity; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob == null) {
                if (getClient().getPlayer().isAdmin()) {
                    getClient().getPlayer().dropMessage(-11, "[系統提示] spawnMobStats召喚怪物出錯，ID為: " + mobId + " 怪物不存在！");
                }
                continue;
            }
            mob.setForcedMobStat(mob.getMobLevel());
            mob.changeHP(newhp);
            if (newExp > 0) {
                mob.getForcedMobStat().setExp(newExp);
            }
            getClient().getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
        }
    }

    /*
     * 按倍數計算刷怪
     */
    public void spawnMobMultipler(int mobId, int multipler) {
        spawnMobMultipler(mobId, 1, multipler, getClient().getPlayer().getPosition());
    }

    public void spawnMobMultipler(int mobId, int quantity, int multipler) {
        spawnMobMultipler(mobId, quantity, multipler, getClient().getPlayer().getPosition());
    }

    public void spawnMobMultipler(int mobId, int quantity, int multipler, int x, int y) {
        spawnMobMultipler(mobId, quantity, multipler, new Point(x, y));
    }

    public void spawnMobMultipler(int mobId, int quantity, int multipler, Point pos) {
        for (int i = 0; i < quantity; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(mobId);
            if (mob == null) {
                if (getClient().getPlayer().isAdmin()) {
                    getClient().getPlayer().dropMessage(-11, "[系統提示] spawnMobMultipler召喚怪物出錯，ID為: " + mobId + " 怪物不存在！");
                }
                continue;
            }
            mob.setForcedMobStat(mob.getMobLevel());
            mob.changeHP(mob.getMobMaxHp() * multipler);
            mob.getForcedMobStat().setExp((int) Math.min(mob.getMobExp() * multipler, Integer.MAX_VALUE));
            getClient().getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
        }
    }

    /*
     * 普通刷怪
     */
    public void spawnMonster(int mobId, int quantity) {
        spawnMob(mobId, quantity, getClient().getPlayer().getPosition());
    }

    public void spawnMobOnMap(int mobId, int quantity, int x, int y, int map) {
        for (int i = 0; i < quantity; i++) {
            getMap(map).spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), new Point(x, y));
        }
    }

    public void spawnMob(int mobId, int quantity, int x, int y) {
        spawnMob(mobId, quantity, new Point(x, y));
    }

    public void spawnMob(int mobId, int x, int y) {
        spawnMob(mobId, 1, new Point(x, y));
    }

    private void spawnMob(int mobId, int quantity, Point pos) {
        for (int i = 0; i < quantity; i++) {
            getClient().getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
        }
    }

    /*
     * 通過怪物ID殺死地圖怪物
     */
    public void killMob(int mobId) {
        getClient().getPlayer().getMap().killMonster(mobId);
    }

    /*
     * 殺死地圖裡面所有怪物
     */
    public void killAllMob() {
        getClient().getPlayer().getMap().killAllMonsters(true);
    }

    /*
     * 改變角色血量
     */
    public void addHP(int delta) {
        getClient().getPlayer().addHP(delta);
    }

    public int getPlayerStat(String type) {
        switch (type) {
            case "LVL":
                return getClient().getPlayer().getLevel();
            case "STR":
                return getClient().getPlayer().getStat().getStr();
            case "DEX":
                return getClient().getPlayer().getStat().getDex();
            case "INT":
                return getClient().getPlayer().getStat().getInt();
            case "LUK":
                return getClient().getPlayer().getStat().getLuk();
            case "HP":
                return getClient().getPlayer().getStat().getHp();
            case "MP":
                return getClient().getPlayer().getStat().getMp();
            case "MAXHP":
                return getClient().getPlayer().getStat().getMaxHp();
            case "MAXMP":
                return getClient().getPlayer().getStat().getMaxMp();
            case "RAP":
                return getClient().getPlayer().getRemainingAp();
            case "RSP":
                return getClient().getPlayer().getRemainingSp();
            case "GID":
                return getClient().getPlayer().getGuildId();
            case "GRANK":
                return getClient().getPlayer().getGuildRank();
            case "ARANK":
                return getClient().getPlayer().getAllianceRank();
            case "GM":
                return getClient().getPlayer().isGm() ? 1 : 0;
            case "ADMIN":
                return getClient().getPlayer().isAdmin() ? 1 : 0;
            case "GENDER":
                return getClient().getPlayer().getGender();
            case "FACE":
                return getClient().getPlayer().getFace();
            case "HAIR":
                return getClient().getPlayer().getHair();
        }
        return -1;
    }

    /*
     * 獲取機器人的屬性
     */
    public int getAndroidStat(String type) {
        switch (type) {
            case "HAIR":
                return getClient().getPlayer().getAndroid().getHair();
            case "FACE":
                return getClient().getPlayer().getAndroid().getFace();
            case "SKIN":
                return getClient().getPlayer().getAndroid().getSkin();
            case "GENDER":
                return getClient().getPlayer().getAndroid().getGender();
        }
        return -1;
    }

    /*
     * 獲取角色名字
     */
    public String getName() {
        return getClient().getPlayer().getName();
    }

    /*
     * 獲取伺服器的名稱
     */
    public String getServerName() {
        return getClient().getPlayer().getClient().getChannelServer().getServerName();
    }

    /*
     * 獲取伺服器的名稱 只顯示前2個字的名字
     */
    public String getTrueServerName() {
        return getClient().getPlayer().getClient().getChannelServer().getTrueServerName();
    }

    /*
     * 檢測是否擁有道具
     */
    public boolean haveItem(int itemId) {
        return haveItem(itemId, 1);
    }

    public boolean haveItem(int itemId, int quantity) {
        return haveItem(itemId, quantity, false, true);
    }

    public boolean haveItem(int itemId, int quantity, boolean checkEquipped, boolean greaterOrEquals) {
        return getClient().getPlayer().haveItem(itemId, quantity, checkEquipped, greaterOrEquals);
    }

    /*
     * 新增變量獲取玩家背包道具的數量
     */
    public int getItemQuantity(int itemId) {
        return getClient().getPlayer().getItemQuantity(itemId);
    }

    public boolean canHold() {
        return getClient().getPlayer().canHold();
    }

    public boolean canHoldSlots(int slot) {
        return getClient().getPlayer().canHoldSlots(slot);
    }

    public boolean canHold(int itemId) {
        return getClient().getPlayer().canHold(itemId);
    }

    public boolean canHold(int itemId, int quantity) {
        return MapleInventoryManipulator.checkSpace(getClient(), itemId, quantity, "");
    }

    /*
     * 任務相關
     */
    public MapleQuestStatus getQuestRecord(int questId) {
        return getClient().getPlayer().getQuestNAdd(MapleQuest.getInstance(questId));
    }

    public MapleQuestStatus getQuestNoRecord(int questId) {
        return getClient().getPlayer().getQuestNoAdd(MapleQuest.getInstance(questId));
    }

    public byte getQuestStatus(int questId) {
        return getClient().getPlayer().getQuestStatus(questId);
    }

    public boolean isQuestActive(int questId) {
        return getQuestStatus(questId) == 1;
    }

    public boolean isQuestFinished(int questId) {
        return getQuestStatus(questId) == 2;
    }

    public void showQuestMsg(String msg) {
        getClient().announce(MaplePacketCreator.showQuestMsg(msg));
    }

    public void forceStartQuest(int questId, String data) {
        forceStartQuest(questId, data, false);
    }

    public void forceStartQuest(int questId, String data, boolean isWorldShare) {
        MapleQuest.getInstance(questId).forceStart(getClient().getPlayer(), 0, data, isWorldShare);
    }

    public void forceStartQuest(int questId) {
        forceStartQuest(questId, 0);
    }

    public void forceStartQuest(int questId, boolean isWorldShare) {
        forceStartQuest(questId, 0, isWorldShare);
    }

    public void forceStartQuest(int questId, int npcID) {
        forceStartQuest(questId, npcID, false);
    }

    public void forceStartQuest(int questId, int npcID, boolean isWorldShare) {
        MapleQuest.getInstance(questId).forceStart(getClient().getPlayer(), npcID, null, isWorldShare);
    }

    public void forceCompleteQuest(int questId) {
        forceCompleteQuest(questId, 0);
    }

    public void forceCompleteQuest(int questId, boolean isWorldShare) {
        forceCompleteQuest(questId, 0, isWorldShare);
    }

    public void forceCompleteQuest(int questId, int npcID) {
        forceCompleteQuest(questId, npcID, false);
    }

    public void forceCompleteQuest(int questId, int npcID, boolean isWorldShare) {
        MapleQuest.getInstance(questId).forceComplete(getPlayer(), npcID, isWorldShare);
    }

    /**
     * 重置任務
     *
     * @param questId 任務ID
     */
    public void resetQuest(int questId) {
        MapleQuest.getInstance(questId).reset(getPlayer());
    }

    /**
     * 放棄任務
     *
     * @param questId 任務ID
     */
    public void forfeitQuest(int questId) {
        MapleQuest.getInstance(questId).forfeit(getPlayer());
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    /*
     * 刷出NPC
     */
    public void spawnNpc(int npcId) {
        getClient().getPlayer().getMap().spawnNpc(npcId, getClient().getPlayer().getPosition());
    }

    public void spawnNpc(int npcId, int x, int y) {
        getClient().getPlayer().getMap().spawnNpc(npcId, new Point(x, y));
    }

    public void spawnNpc(int npcId, Point pos) {
        getClient().getPlayer().getMap().spawnNpc(npcId, pos);
    }

    public boolean start_DojoAgent() {
        return MapleDojoAgent.warpStartAgent(this.getPlayer());
    }

    /*
     * 移除NPC
     */
    public void removeNpc(int mapid, int npcId) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).removeNpc(npcId);
    }

    public void removeNpcforQ(int mapid, int npcId) {
        getChannelServer().getMapFactory().getMap(mapid).removeNpc(npcId, getChar().getId());
    }

    public void removeNpc(int npcId) {
        getClient().getPlayer().getMap().removeNpc(npcId);
    }

    public void destroyReactor(int mapId, int reactorId) {
        MapleMap map = getClient().getChannelServer().getMapFactory().getMap(mapId);
        MapleReactor react;

        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            react = (MapleReactor) remo;
            if (react.getReactorId() == reactorId) {
                react.hitReactor(getClient());
                break;
            }
        }
    }

    public void hitReactor(int mapId, int reactorId) {
        MapleMap map = getClient().getChannelServer().getMapFactory().getMap(mapId);
        MapleReactor react;

        for (MapleMapObject remo : map.getAllReactorsThreadsafe()) {
            react = (MapleReactor) remo;
            if (react.getReactorId() == reactorId) {
                react.hitReactor(getClient());
                break;
            }
        }
    }

    public void forceTrigger(int mapId, int reactorId) {
        forceTrigger(mapId, reactorId, (byte) 1);
    }

    public void forceTrigger(final String reactorName, final byte state) {
        this.getMap().forceTrigger(reactorName, state);
    }

    public void forceTriggerStateEnd(final String reactorName, final byte state, final byte stateEnd) {
        this.getMap().forceTriggerStateEnd(reactorName, state, stateEnd);
    }

    public void forceTrigger(final int reactorId, final byte newState) {
        this.getMap().forceTrigger(reactorId, newState);
    }

    public void forceTrigger(final int mapId, final int reactorId, final byte newState) {
        final MapleMap map;
        if ((map = this.getMap(mapId)) != null) {
            map.forceTrigger(reactorId, newState);
        }
    }

    public void forceStartReactor(final int reactorId) {
        for (MapleReactor reactor : this.getMap().getAllReactor()) {
            if (reactor.getReactorId() == reactorId) {
                reactor.forceStartReactor(this.getClient());
            }
        }
    }

    public void forceStartReactor(final int mapId, final int reactorId) {
        for (MapleReactor reactor : this.getMap(mapId).getAllReactor()) {
            if (reactor.getReactorId() == reactorId) {
                reactor.forceStartReactor(this.getClient());
            }
        }
    }

    /*
     * 獲取角色的職業ID
     */
    public int getJob() {
        return getClient().getPlayer().getJob();
    }

    public int getJobWithSub() {
        return getClient().getPlayer().getJobWithSub();
    }

    /*
     * 獲取角色的職業ID
     */
    public int getJobId() {
        return getJob();
    }

    public int getBeginner() {
        return JobConstants.getBeginner((short) getJob());
    }

    public int getTrueJobGrade() {
        return JobConstants.getJobBranch(getJob());
    }

    /*
     * 通過職業ID獲取職業名字
     */
    public String getJobName(int jobId) {
        return getMapleJob().getTrueName();
    }

    /*
     * 檢測角色是否是新手職業
     */
    public boolean isBeginnerJob() {
        return JobConstants.is零轉職業(getJob()) && getLevel() < 11;
    }

    /*
     * 檢測角色是否是騎士團職業
     */
    public boolean is騎士團() {
        return JobConstants.is皇家騎士團(getJob());
    }

    /*
     * 獲取角色當前的等級
     */
    public int getLevel() {
        return getClient().getPlayer().getLevel();
    }

    public void getLevelup() {
        getPlayer().levelUp();
    }

    /*
     * 獲取角色當前的人氣點數
     */
    public int getFame() {
        return getClient().getPlayer().getFame();
    }

    /*
     * 加減角色人氣和更新角色人氣
     */
    public void gainFame(int famechange) {
        gainFame(famechange, false);
    }

    public void gainFame(int famechange, boolean show) {
        getClient().getPlayer().gainFame(famechange, show);
    }

    /*
     * 玩家樂豆點和楓點函數
     */
    public int getNX(int type) {
        return getClient().getPlayer().getCSPoints(type);
    }

    public boolean gainNX(int amount) {
        return getClient().getPlayer().modifyCSPoints(1, amount, true);
    }

    public boolean gainNX(int type, int amount) {
        if (type <= 0 || type > 2) {
            type = 2;
        }
        return getClient().getPlayer().modifyCSPoints(type, amount, true);
    }

    public boolean gainACash(int accID, int amount) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE accounts SET ACash = ACash + ? WHERE id = ?")) {
                ps.setInt(1, amount);
                ps.setInt(2, accID);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("獲取角色樂豆點失敗。" + e);
            return false;
        }
        return true;
    }

    /**
     * 刷道具
     *
     * @param cmd      指令
     * @param itemId   道具ID
     * @param quantity 道具數量
     */
    public void getItem(String cmd, int itemId, int quantity) {
        if (getClient() == null || getClient().getPlayer() == null || !getClient().getPlayer().isGm()) {
            return;
        }
        String[] splitted = new String[]{
                cmd,
                String.valueOf(itemId),
                String.valueOf(quantity),};
        new GMCommand.道具().execute(getClient(), splitted);
    }

    /**
     * 刷道具
     *
     * @param cmd      指令
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param period   時間小於 1000 按天算 大於使用給的時候計算的預設時間
     */
    public void getItem(String cmd, int itemId, int quantity, long period) {
        if (getClient() == null || getClient().getPlayer() == null || !getClient().getPlayer().isGm()) {
            return;
        }
        String[] splitted = new String[]{
                cmd,
                String.valueOf(itemId),
                String.valueOf(quantity),
                String.valueOf(period),};
        new GMCommand.道具().execute(getClient(), splitted);
    }

    public void gainItemMonthly(int itemId, int quantity) {
        gainItemPeriod(itemId, quantity, DateUtil.getLastTimeOfMonth() - System.currentTimeMillis());
    }

    public void reviveOrGainItemMonthly(int itemId) {
        MapleInventoryType type = ItemConstants.getInventoryType(itemId, false);
        Equip eq = null;
        if (type == MapleInventoryType.EQUIP) {
            MapleInventoryType[] tps = {MapleInventoryType.EQUIPPED, MapleInventoryType.EQUIP, MapleInventoryType.DECORATION};
            for (MapleInventoryType tp : tps) {
                for (Item item : getPlayer().getInventory(tp).listById(itemId)) {
                    eq = (Equip) item;
                    if (EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff()) && eq.isMvpEquip()) {
                        break;
                    } else {
                        eq = null;
                    }
                }
                if (eq != null) {
                    break;
                }
            }
        }
        if (eq == null) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            Equip item = ii.getEquipById(itemId);
            item.setExpiration(DateUtil.getLastTimeOfMonth());
            String gmlog = null;
            if (this.item != null && this.item.getGMLog() != null && !this.item.getGMLog().isEmpty()) {
                gmlog = "道具腳本的道具訊息 {" + this.item.getGMLog() + "} 取得";
            }
            item.setMvpEquip(true);
            item.setGMLog("腳本獲得 " + this.npcID + " (" + this.script + ")" + ((gmlog == null || gmlog.isEmpty()) ? "" : (" 備註: " + gmlog)) + " 地圖: " + getClient().getPlayer().getMapId() + " 時間: " + DateUtil.getNowTime());
            String name = ii.getName(itemId);
            if (itemId / 10000 == 114 && name != null && name.length() > 0) { //獲得勳章道具
                String msg = "<" + name + ">獲得稱號。";
                getClient().getPlayer().dropMessage(-1, msg);
                getClient().getPlayer().dropMessage(5, msg);
            }
            MapleInventoryManipulator.addbyItem(getClient(), item.copy());
            getClient().announce(MaplePacketCreator.getShowItemGain(itemId, 1, true));
        } else {
            eq.setExpiration(DateUtil.getLastTimeOfMonth());
            eq.setEnchantBuff((short) (eq.getEnchantBuff() - EnhanceResultType.EQUIP_MARK.getValue()));
            getPlayer().forceUpdateItem(eq);
        }
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param period   時間小於 1000 按天算 大於使用給的時候計算的默認時間
     */
    public void gainItemPeriod(int itemId, int quantity, long period) {
        gainItem(itemId, quantity, false, period, -1, "", 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param period   時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param owner    道具上面帶角色名字
     */
    public void gainItemPeriod(int itemId, int quantity, long period, String owner) {
        gainItem(itemId, quantity, false, period, -1, owner, 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     */
    public void gainItem(int itemId, int quantity) {
        gainItem(itemId, quantity, false, 0, -1, "", 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param state    是否有潛能
     */
    public void gainItem(int itemId, int quantity, int state) {
        gainItem(itemId, quantity, false, 0, -1, "", state);
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     */
    public void gainItem(int itemId, int quantity, boolean randomStats) {
        gainItem(itemId, quantity, randomStats, 0, -1, "", 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param owner    道具上面帶角色名字
     */
    public void gainItem(int itemId, int quantity, String owner) {
        gainItem(itemId, quantity, false, 0, -1, owner, 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param owner    道具上面帶角色名字
     */
    public void gainItem(int itemId, int quantity, String owner, int state) {
        gainItem(itemId, quantity, false, 0, -1, owner, state);
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     * @param slots       設置道具的可升級次數
     */
    public void gainItem(int itemId, int quantity, boolean randomStats, int slots) {
        gainItem(itemId, quantity, randomStats, 0, slots, "", 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param period   時間小於 1000 按天算 大於使用給的時候計算的默認時間
     */
    public void gainItem(int itemId, int quantity, long period) {
        gainItem(itemId, quantity, false, period, -1, "", 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param state    潛能狀態
     */
    public void gainItemByState(int itemId, int quantity, int state) {
        gainItem(itemId, quantity, false, 0, -1, "", state);
    }

    /**
     * 給玩家道具
     *
     * @param itemId   道具ID
     * @param quantity 道具數量
     * @param period   時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param state    是否有潛能
     */
    public void gainItem(int itemId, int quantity, long period, int state) {
        gainItem(itemId, quantity, false, period, -1, "", state);
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     * @param period      時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param slots       設置道具的可升級次數
     */
    public void gainItem(int itemId, int quantity, boolean randomStats, long period, int slots) {
        gainItem(itemId, quantity, randomStats, period, slots, "", 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     * @param period      時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param slots       設置道具的可升級次數
     * @param owner       道具上面帶角色名字
     */
    public void gainItem(int itemId, int quantity, boolean randomStats, long period, int slots, String owner) {
        gainItem(itemId, quantity, randomStats, period, slots, owner, 0);
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     * @param period      時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param slots       設置道具的可升級次數
     * @param owner       道具上面帶角色名字
     * @param state       是否帶潛能
     */
    public void gainItem(int itemId, int quantity, boolean randomStats, long period, int slots, String owner, int state) {
        gainItem(itemId, quantity, randomStats, period, slots, owner, state, getClient());
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     * @param period      時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param slots       設置道具的可升級次數
     * @param owner       道具上面帶角色名字
     * @param state       是否帶潛能
     * @param cg          當前角色的連接(MapleClient對像)
     */
    public void gainItem(int itemId, int quantity, boolean randomStats, long period, int slots, String owner, int state, MapleClient cg) {
        gainItem(itemId, quantity, randomStats, period, slots, owner, state, null, getClient());
    }

    /**
     * 給玩家道具
     *
     * @param itemId      道具ID
     * @param quantity    道具數量
     * @param randomStats 是否隨機屬性
     * @param period      時間小於 1000 按天算 大於使用給的時候計算的默認時間
     * @param slots       設置道具的可升級次數
     * @param owner       道具上面帶角色名字
     * @param state       是否帶潛能
     * @param gmlog       備註訊息
     * @param cg          當前角色的連接(MapleClient對像)
     */
    public void gainItem(int itemId, int quantity, boolean randomStats, long period, int slots, String owner, int state, String gmlog, MapleClient cg) {
        if (ItemConstants.isLogItem(itemId)) {
            String itemText = "玩家 " + StringUtil.getRightPaddedStr(cg.getPlayer().getName(), ' ', 13) + (quantity >= 0 ? " 獲得道具: " : " 失去道具: ") + itemId + " 數量: " + StringUtil.getRightPaddedStr(String.valueOf(Math.abs(quantity)), ' ', 5) + " 道具名字: " + getItemName(itemId);
            log.info("[道具] " + itemText);
            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.spouseMessage(UserChatMessageType.藍加粉, "[GM訊息] " + itemText));
        }
        if (quantity >= 0) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (!MapleInventoryManipulator.checkSpace(cg, itemId, quantity, "")) {
                return;
            }
            if (ItemConstants.getInventoryType(itemId, false).equals(MapleInventoryType.EQUIP) && !ItemConstants.類型.飛鏢(itemId) && !ItemConstants.類型.子彈(itemId)) {
                for (int i = 0; i < quantity; i++) {
                    Equip item = randomStats ? ii.randomizeStats(ii.getEquipById(itemId)) : ii.getEquipById(itemId);
                    if (period > 0) {
                        if (period < 1000) {
                            item.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                        } else {
                            item.setExpiration(System.currentTimeMillis() + period);
                        }
                    }
                    if (slots > 0) {
                        item.setRestUpgradeCount((byte) (item.getRestUpgradeCount() + slots));
                    }
                    if (state > 0) {
                        int newstate = 16 + state;
                        if (newstate > 20) {
                            newstate = 20;
                        } else if (newstate < 17) {
                            newstate = 17;
                        }
                        item.setPotential1(-newstate);
                        item.initState(false);
                    }
                    if (owner != null) {
                        item.setOwner(owner);
                    }
                    if ((gmlog == null || gmlog.isEmpty()) && this.item != null && this.item.getGMLog() != null && !this.item.getGMLog().isEmpty()) {
                        gmlog = "道具腳本的道具訊息 {" + this.item.getGMLog() + "} 取得";
                    }
                    item.setGMLog("腳本獲得 " + this.npcID + " (" + this.script + ")" + ((gmlog == null || gmlog.isEmpty()) ? "" : (" 備註: " + gmlog)) + " 地圖: " + cg.getPlayer().getMapId() + " 時間: " + DateUtil.getNowTime());
                    String name = ii.getName(itemId);
                    if (itemId / 10000 == 114 && name != null && name.length() > 0) { //獲得勳章道具
                        String msg = "<" + name + ">獲得稱號。";
                        cg.getPlayer().dropMessage(-1, msg);
                        cg.getPlayer().dropMessage(5, msg);
                    }
                    MapleInventoryManipulator.addbyItem(cg, item.copy());
                }
            } else {
                final MaplePet pet;
                if (ItemConstants.類型.寵物(itemId)) {
                    pet = MaplePet.createPet(itemId);
                    if (pet != null && period == 0) {
                        period = ii.getLife(itemId) * 24 * 60 * 60 * 1000;
                        if (period < 0) {
                            period = 0;
                        }
                    }
                } else {
                    pet = null;
                }
                MapleInventoryManipulator.addById(cg, itemId, quantity, owner == null ? "" : owner, pet, period, "腳本獲得 " + this.npcID + " (" + this.script + ") 地圖: " + cg.getPlayer().getMapId() + " 時間: " + DateUtil.getNowTime());
            }
        } else {
            MapleInventoryManipulator.removeById(cg, ItemConstants.getInventoryType(itemId), itemId, -quantity, true, false);
        }
        cg.announce(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
    }

    /**
     * 移除角色道具 數量為: 1
     *
     * @param itemId 道具ID
     */
    public boolean removeItem(int itemId) { //quantity 1
        if (MapleInventoryManipulator.removeById_Lock(getClient(), ItemConstants.getInventoryType(itemId), itemId)) {
            getClient().announce(MaplePacketCreator.getShowItemGain(itemId, -1, true));
            return true;
        }
        return false;
    }

    public boolean removeItem(int slot, int invType, int quantity) {
        MapleInventoryType inv = MapleInventoryType.getByType((byte) invType);
        return inv != null && MapleInventoryManipulator.removeFromSlot(getClient(), inv, (short) slot, (short) quantity, true);
    }

    public void removeAllItem(int type) {
        MapleInventoryManipulator.removeAll(getClient(), this.getInvType(type));
    }

    /*
     * 給玩家道具並且裝備上該道具
     */
    public void gainItemAndEquip(int itemId, short slot) {
        MapleInventoryManipulator.addItemAndEquip(getClient(), itemId, slot);
    }

    public void gainLockItem(int itemId, short quantity, boolean lock, long period) {
        gainLockItem(itemId, quantity, lock, period, "");
    }

    public void gainLockItem(int itemId, short quantity, boolean lock, long period, String from) {
        gainLockItem(itemId, quantity, lock, period, from, true);
    }

    public void gainLockItem(int itemId, int quantity, boolean lock, long period, String from, boolean broad) {
        if (quantity <= 0) {
            if (getClient().getPlayer().isAdmin()) {
                getClient().getPlayer().dropMessage(5, "輸入的數量錯誤，數量必須大於0.如果是裝備道具不管設置多少都只給1個.");
            }
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (!ii.itemExists(itemId)) {
            if (getClient().getPlayer().isAdmin()) {
                getClient().getPlayer().dropMessage(5, itemId + " 這個道具不存在.");
            }
            return;
        }
        if (!MapleInventoryManipulator.checkSpace(getClient(), itemId, quantity, "")) {
            if (getClient().getPlayer().isAdmin()) {
                getClient().getPlayer().dropMessage(5, "背包空間不足.");
            }
            return;
        }
        Item item;
        if (ItemConstants.getInventoryType(itemId, false) == MapleInventoryType.EQUIP) {
            item = ii.getEquipById(itemId);
        } else {
            item = new Item(itemId, (byte) 0, (short) Math.min(ii.getSlotMax(itemId), quantity), 0);
        }
        if (lock) {
            item.addAttribute(ItemAttribute.Seal.getValue());
        }
        if (period > 0) {
            if (period < 1000) {
                item.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
            } else {
                item.setExpiration(System.currentTimeMillis() + period);
            }
        }
        if ((from == null || from.isEmpty()) && this.item != null && this.item.getGMLog() != null && !this.item.getGMLog().isEmpty()) {
            from = "道具腳本的道具訊息 {" + this.item.getGMLog() + "} 取得";
        }
        if (!from.equals("")) {
            item.setGMLog("從" + from + "中獲得 時間: " + DateUtil.getNowTime());
        }
        MapleInventoryManipulator.addbyItem(getClient(), item);
        getClient().announce(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
        if (!from.equals("") && broad) {
            if (ItemConstants.getInventoryType(itemId, false) == MapleInventoryType.EQUIP) {
                WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(getClient().getPlayer().getName() + " : 從" + from + "中獲得" + ii.getName(itemId) + "！大家一起恭喜他（她）吧！！！！", false, getClient().getChannel(), item));
            } else {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(getClient().getPlayer().getName(), " : 從" + from + "中獲得{" + ii.getName(item.getItemId()) + "}！大家一起恭喜他（她）吧！！！！", item, (byte) 3, getClient().getChannel()));
            }
        }
    }

    public void worldMessageItem(String message, Item item) {
        WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(message, false, getClient().getChannel(), item));
    }

    public final void worldMessageYellow(final String message) {
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(9, getClient().getChannel(), message, true));
    }

    public final void worldBrodcastEffect(final int itemid, final String message) {
        if (itemid > 0) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.startMapEffect(message, itemid, true));
        } else {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.environmentChange(message, FieldEffectType.Screen));
        }

        Timer.WorldTimer.getInstance().schedule(() -> WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.removeMapEffect()), 20000);  //20秒
    }

    /*
     * 改變角色當前地圖的音樂
     */
    public void changeMusic(String songName) {
        getMap().broadcastMessage(MaplePacketCreator.musicChange(songName));
    }

    /*
     * 發送全頻道公告
     */
    public void channelMessage(int type, String message) {
        getClient().getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(type, getClient().getChannel(), message));
    }

    /*
     * 發送全服公告
     */
    public void worldMessage(String message) {
        worldMessage(6, message);
    }

    public void laba(int type, String message) {
        worldMessage(type, message);
    }

    public void worldMessage(int type, String message) {
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public void worldSpouseMessage(int type, String message) {
        UserChatMessageType cType = UserChatMessageType.getByType(type);
        if (cType != null) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.spouseMessage(cType, message));
        } else {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(BroadcastMessageType.NOTICE_WITHOUT_PREFIX, message));
        }
    }

    /*
     * 發送給角色信息 默認為類型 5
     */
    public void playerMessage(String message) {
        playerMessage(5, message);
    }

    /*
     * 發送給地圖信息 默認為類型 5
     */
    public void mapMessage(String message) {
        mapMessage(5, message);
    }

    /*
     * 發送給公會信息 默認為類型 5
     */
    public void guildMessage(String message) {
        guildMessage(5, message);
    }

    /**
     * 給玩家發送消息
     *
     * @param type    消息類型
     * @param message 消息內容
     */
    public void playerMessage(int type, String message) {
        getClient().getPlayer().dropMessage(type, message);
    }

    /**
     * 給玩家發送消息
     *
     * @param type    消息類型
     * @param message 消息內容
     */
    public void dropMessage(int type, String message) {
        UserChatMessageType cType = UserChatMessageType.getByType(type);
        if (cType != null) {
            getClient().announce(MaplePacketCreator.spouseMessage(cType, message));
        } else {
            getClient().announce(MaplePacketCreator.serverNotice(BroadcastMessageType.EVENT, message));
        }
    }

    /**
     * 給當前地圖的所有玩家發送信息
     *
     * @param type    消息類型
     * @param message 消息內容
     */
    public void mapMessage(int type, String message) {
        getClient().getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    /**
     * 發送給公會信息
     *
     * @param type    消息類型
     * @param message 消息內容
     */
    public void guildMessage(int type, String message) {
        if (getPlayer().getGuildId() > 0) {
            WorldGuildService.getInstance().guildPacket(getPlayer().getGuildId(), MaplePacketCreator.serverNotice(type, message));
        }
    }

    /**
     * 頂部公告
     *
     * @param message 消息內容
     */
    public void topMessage(String message) {
        getClient().announce(UIPacket.getTopMsg(message));
    }

    public void topMsg(String string) {
        topMessage(string);
    }

    /**
     * 獲取角色公會對像
     *
     * @return
     */
    public MapleGuild getGuild() {
        return getGuild(getPlayer().getGuildId());
    }

    /*
     * 通過公會ID獲取公會
     */
    public MapleGuild getGuild(int guildid) {
        return WorldGuildService.getInstance().getGuild(guildid);
    }

    /*
     * 獲得所有公會
     */
    public List<Pair<Integer, MapleGuild>> getGuildList() {
        return WorldGuildService.getInstance().getGuildList();
    }

    /*
     * 獲取角色組隊
     */
    public MapleParty getParty() {
        return getPlayer().getParty();
    }

    public int getPartySize() {
        return getParty() != null ? getParty().getMemberList().size() : -1;
    }

    public int getPartyID() {
        return getParty() != null ? getParty().getPartyId() : -1;
    }

    public boolean isChrInParty(int cid) {
        return getParty() != null && getParty().getMemberById(cid) != null;
    }

    public int getCurrentPartyId(int mapId) {
        return getMap(mapId).getCurrentPartyId();
    }

    public int getPartyAverageLevel() {
        return getParty().getAverageLevel();
    }

    /*
     * 檢測角色是否是隊長
     */
    public boolean isLeader() {
        return getPlayer().getParty() != null && getParty().getLeaderID() == getClient().getPlayer().getId();
    }

    public void partyMessage(int partyId, String string) {
        WorldPartyService.getInstance().partyMessage(partyId, string);
    }

    public boolean isAllPartyMembersAllowedJob(int jobId) {
        if (getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter mem : getClient().getPlayer().getParty().getMemberList()) {
            if (mem.getJobId() / 100 != jobId) {
                return false;
            }
        }
        return true;
    }

    public final boolean isAllPartyMembersAllowedLevel(int min, int max) {
        if (getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter d2 : getParty().getMemberList()) {
            if (d2.getLevel() >= min && d2.getLevel() <= max) {
                continue;
            }
            return false;
        }
        return true;
    }

    public final boolean isAllPartyMembersNotCoolDown(int questID, int coolDownTime) {
        return getParty() != null && this.getIsInCoolDownMember(questID, coolDownTime) == null;
    }

    public final String getIsInCoolDownMemberName(int questID, int coolDownTime) {
        MaplePartyCharacter d2 = this.getIsInCoolDownMember(questID, coolDownTime);
        return d2 != null ? d2.getName() : null;
    }

    public final MaplePartyCharacter getIsInCoolDownMember(int questID, int coolDownTime) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = partyCharacter.getChr();
                if (player == null) {
                    return partyCharacter;
                }
                MapleQuestStatus status = player.getQuestNAdd(MapleQuest.getInstance(questID));
                if (status == null || status.getCustomData() == null || Long.valueOf(status.getCustomData()) + (long) coolDownTime <= System.currentTimeMillis()) {
                    continue;
                }
                return partyCharacter;
            }
        }
        return null;
    }

    public String getCustomData(int questid) {
        return getPlayer().getQuestNAdd(MapleQuest.getInstance(questid)).getCustomData();
    }

    public void setCustomData(int questid, String customdata) {
        setCustomData(getPlayer(), questid, customdata);
    }

    public void setCustomData(MapleCharacter chr, int questid, String customdata) {
        chr.getQuestNAdd(MapleQuest.getInstance(questid)).setCustomData(customdata);
    }

    public final boolean isAllPartyMembersHaveItem(int itemId, int quantity) {
        if (getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
            MapleCharacter player = partyCharacter.getChr();
            if (player != null && player.getItemQuantity(itemId) >= quantity) {
                continue;
            }
            return false;
        }
        return true;
    }

    public final String getNotHaveItemMemberName(int itemId, int quantity) {
        MaplePartyCharacter partyCharacter = this.getNotHaveItemMember(itemId, quantity);
        return partyCharacter != null ? partyCharacter.getName() : null;
    }

    public final MaplePartyCharacter getNotHaveItemMember(int itemId, int quantity) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = partyCharacter.getChr();
                if (player != null && player.getItemQuantity(itemId) >= quantity) {
                    continue;
                }
                return partyCharacter;
            }
        }
        return null;
    }

    public final boolean isAllPartyMembersAllowedPQ(String pqName, int times) {
        return this.isAllPartyMembersAllowedPQ(pqName, times, 1);
    }

    public final boolean isAllPartyMembersAllowedPQ(String pqName, int times, int day) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = partyCharacter.getChr();
                if (player == null || player.getDaysPQLog(pqName, day) >= times) {
                    return false;
                }
            }
        }
        return true;
    }

    public final boolean isAllPartyMembersAllowedDayOfWeekPQ(String pqName, int times, int day) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = partyCharacter.getChr();
                if (player == null || player.getDayOfWeekPQLog(pqName, day) >= times) {
                    return false;
                }
            }
        }
        return true;
    }

    public final MaplePartyCharacter getNotAllowedPQMember(String pqName, int times, int day) {
        if (getParty() == null) {
            return null;
        }
        for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
            MapleCharacter player = partyCharacter.getChr();
            if (player != null && getDaysPQLog(pqName, day) < times) {
                continue;
            }
            return partyCharacter;
        }
        return null;
    }

    public final String getNotAllowedPQMemberName(String pqName, int times) {
        return this.getNotAllowedPQMemberName(pqName, times, 1);
    }

    public final String getNotAllowedPQMemberName(String string, int times, int day) {
        if (this.getNotAllowedPQMember(string, times, day) != null) {
            return this.getNotAllowedPQMember(string, times, day).getName();
        }
        return null;
    }

    public final MaplePartyCharacter getNotAllowedDayOfWeekPQMember(String pqName, int times, int day) {
        if (getParty() == null) {
            return null;
        }
        for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
            MapleCharacter player = partyCharacter.getChr();
            if (player != null && getDayOfWeekPQLog(pqName, day) < times) {
                continue;
            }
            return partyCharacter;
        }
        return null;
    }

    public final String getNotAllowedDayOfWeekPQMemberName(String string, int times, int day) {
        if (this.getNotAllowedDayOfWeekPQMember(string, times, day) != null) {
            return this.getNotAllowedDayOfWeekPQMember(string, times, day).getName();
        }
        return null;
    }

    public final void gainMembersPQ(String pqName, int num) {
        if (getParty() == null) {
            return;
        }
        for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
            MapleCharacter player = partyCharacter.getChr();
            if (player == null) {
                continue;
            }
            player.setPQLog(pqName, 0, num);
        }
    }

    public int getDaysPQLog(String pqName, int days) {
        return getPlayer().getDaysPQLog(pqName, 0, days);
    }

    public int getDayOfWeekPQLog(String pqName, int day) {
        return getPlayer().getDayOfWeekPQLog(pqName, day);
    }

    public int getDayOfWeekPQLog(String pqName, int day, int refreshHour) {
        return getPlayer().getDayOfWeekPQLog(pqName, day, refreshHour);
    }

    public int getPQLog(String pqName) {
        return getPlayer().getPQLog(pqName);
    }

    public int getPQLog(String pqName, int type) {
        return getPlayer().getPQLog(pqName, type);
    }

    public int getPQLog(String pqName, int type, int days) {
        return getPlayer().getDaysPQLog(pqName, type, days);
    }

    public int getPQLog(String pqName, int type, int day, int refreshHour) {
        return getPlayer().getPQLog(pqName, type, day, refreshHour);
    }

    public void setPQLog(String pqName) {
        getPlayer().setPQLog(pqName);
    }

    public void setPQLog(String pqName, int type) {
        getPlayer().setPQLog(pqName, type);
    }

    public void setPQLog(String pqName, int type, int count) {
        getPlayer().setPQLog(pqName, type, count);
    }

    public void setPQLog(String pqName, int type, int count, int refresh) {
        getPlayer().setPQLog(pqName, type, count, refresh);
    }

    public void setPQLog(String pqName, int type, int count, int refresh, boolean updateTime) {
        getPlayer().setPQLog(pqName, type, count, refresh, updateTime);
    }

    public void resetPQLog(String pqName) {
        getPlayer().resetPQLog(pqName);
    }

    public void resetPQLog(String pqName, int type) {
        getPlayer().resetPQLog(pqName, type);
    }

    public void setPartyPQLog(String pqName) {
        this.setPartyPQLog(pqName, 0);
    }

    public void setPartyPQLog(String pqName, int type) {
        this.setPartyPQLog(pqName, type, 1);
    }

    public void setPartyPQLog(String pqName, int type, int count) {
        if (this.getPlayer().getParty() == null || this.getPlayer().getParty().getMemberList().size() == 1) {
            getPlayer().setPQLog(pqName, type, count);
            return;
        }
        int n4 = this.getPlayer().getMapId();
        for (MaplePartyCharacter partyCharacter : this.getPlayer().getParty().getMemberList()) {
            MapleCharacter player = this.getPlayer().getMap().getPlayerObject(partyCharacter.getId());
            if (player == null || player.getMapId() != n4) {
                continue;
            }
            player.setPQLog(pqName, type, count);
        }
    }

    /*
     * 檢測組隊成員是否都在同一地圖
     */
    public boolean allMembersHere() {
        if (getClient().getPlayer().getParty() == null) {
            return false;
        }
        for (MaplePartyCharacter mem : getClient().getPlayer().getParty().getMemberList()) {
            MapleCharacter chr = getClient().getPlayer().getMap().getPlayerObject(mem.getId());
            if (chr == null) {
                return false;
            }
        }
        return true;
    }

    /*
     * 組隊地圖傳送
     */
    public void warpParty(int mapId) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            warp(mapId, 0);
            return;
        }
        MapleMap target = getMap(mapId);
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.changeMap(target, target.getPortal(0));
            }
        }
    }

    /*
     * 組隊地圖傳送和傳送點
     */
    public void warpParty(int mapId, int portal) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            if (portal < 0) {
                warp(mapId);
            } else {
                warp(mapId, portal);
            }
            return;
        }
        boolean rand = portal < 0;
        MapleMap target = getMap(mapId);
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                if (rand) {
                    try {
                        curChar.changeMap(target, target.getPortal(nextInt(target.getPortals().size())));
                    } catch (Exception e) {
                        curChar.changeMap(target, target.getPortal(0));
                    }
                } else {
                    curChar.changeMap(target, target.getPortal(portal));
                }
            }
        }
    }

    /*
     * 組隊地圖傳送
     */
    public void warpParty_Instanced(int mapId) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            warp_Instanced(mapId);
            return;
        }
        MapleMap target = getMap_Instanced(mapId);

        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.changeMap(target, target.getPortal(0));
            }
        }
    }

    /*
     * 改變角色楓幣
     */
    public void gainMeso(long gain) {
        getClient().getPlayer().gainMeso(gain, true, true);
    }

    /*
     * 改變角色經驗
     */
    public void gainExp(long gain) {
        getClient().getPlayer().gainExp(gain, true, true, true);
    }

    /*
     * 改變角色經驗是否按頻道經驗倍數
     */
    public void gainExpR(long gain) {
        getClient().getPlayer().gainExp(gain * getClient().getChannelServer().getExpRate(), true, true, true);
    }

    /*
     * 給組隊中所有角色道具
     */
    public void givePartyItems(int itemId, int quantity, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            if (quantity >= 0) {
                MapleInventoryManipulator.addById(chr.getClient(), itemId, quantity, "Received from party interaction " + itemId + " (" + this.npcID + ")");
            } else {
                MapleInventoryManipulator.removeById(chr.getClient(), ItemConstants.getInventoryType(itemId), itemId, -quantity, true, false);
            }
            chr.send(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
        }
    }

    /*
     * 給組隊中所有角色傾向系統的經驗
     */
    public void addPartyTrait(String t, int e, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.getTrait(MapleTraitType.valueOf(t)).addExp(e, chr);
        }
    }

    /*
     * 給組隊中所有角色傾向系統的經驗
     */
    public void addPartyTrait(String t, int e) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            addTrait(t, e);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.getTrait(MapleTraitType.valueOf(t)).addExp(e, curChar);
            }
        }
    }

    /*
     * 給角色傾向系統的經驗
     */
    public void addTrait(String t, int e) {
        getPlayer().getTrait(MapleTraitType.valueOf(t)).addExp(e, getPlayer());
    }

    /*
     * 給組隊中所有角色道具
     */
    public void givePartyItems(int itemId, short quantity) {
        givePartyItems(itemId, quantity, false);
    }

    /*
     * 給組隊中所有角色道具 是否刪除道具
     */
    public void givePartyItems(int itemId, int quantity, boolean removeAll) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            gainItem(itemId, removeAll ? -getPlayer().itemQuantity(itemId) : quantity);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                gainItem(itemId, removeAll ? -curChar.itemQuantity(itemId) : quantity, false, 0, 0, "", 0, curChar.getClient());
            }
        }
    }

    public void givePartyExp_PQ(int maxLevel, double mod, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            int amount = (int) Math.round(GameConstants.getExpNeededForLevel(chr.getLevel() > maxLevel ? (maxLevel + ((maxLevel - chr.getLevel()) / 10)) : chr.getLevel()) / (Math.min(chr.getLevel(), maxLevel) / 5.0) / (mod * 2.0));
            chr.gainExp(amount * getClient().getChannelServer().getExpRate(), true, true, true);
        }
    }

    public void gainExp_PQ(int maxLevel, double mod) {
        int amount = (int) Math.round(GameConstants.getExpNeededForLevel(getPlayer().getLevel() > maxLevel ? (maxLevel + (getPlayer().getLevel() / 10)) : getPlayer().getLevel()) / (Math.min(getPlayer().getLevel(), maxLevel) / 10.0) / mod);
        gainExp(amount * getClient().getChannelServer().getExpRate());
    }

    public void givePartyExp_PQ(int maxLevel, double mod) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            int amount = (int) Math.round(GameConstants.getExpNeededForLevel(getPlayer().getLevel() > maxLevel ? (maxLevel + (getPlayer().getLevel() / 10)) : getPlayer().getLevel()) / (Math.min(getPlayer().getLevel(), maxLevel) / 10.0) / mod);
            gainExp(amount * getClient().getChannelServer().getExpRate());
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                int amount = (int) Math.round(GameConstants.getExpNeededForLevel(curChar.getLevel() > maxLevel ? (maxLevel + (curChar.getLevel() / 10)) : curChar.getLevel()) / (Math.min(curChar.getLevel(), maxLevel) / 10.0) / mod);
                curChar.gainExp(amount * getClient().getChannelServer().getExpRate(), true, true, true);
            }
        }
    }

    public void givePartyExp(long amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.gainExp(amount * getClient().getChannelServer().getExpRate(), true, true, true);
        }
    }

    public void givePartyExp(long amount) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            gainExp(amount * getClient().getChannelServer().getExpRate());
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.gainExp(amount * getClient().getChannelServer().getExpRate(), true, true, true);
            }
        }
    }

    public void givePartyNX(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.modifyCSPoints(2, amount, true);
        }
    }

    public void givePartyNX(int amount) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            gainNX(2, amount);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.modifyCSPoints(2, amount, true);
            }
        }
    }

    public void endPartyQuest(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.endPartyQuest(amount);
        }
    }

    public void endPartyQuest(int amount) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            getPlayer().endPartyQuest(amount);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.endPartyQuest(amount);
            }
        }
    }

    public void removeFromParty(int itemId, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            int possesed = chr.getInventory(ItemConstants.getInventoryType(itemId)).countById(itemId);
            if (possesed > 0) {
                MapleInventoryManipulator.removeById(getClient(), ItemConstants.getInventoryType(itemId), itemId, possesed, true, false);
                chr.send(MaplePacketCreator.getShowItemGain(itemId, -possesed, true));
            }
        }
    }

    public void removeFromParty(int itemId) {
        givePartyItems(itemId, (short) 0, true);
    }

    public void useSkill(int skillId, int skillLevel) {
        if (skillLevel <= 0) {
            return;
        }
        Skill skill = SkillFactory.getSkill(skillId);
        if (skill != null) {
            skill.getEffect(skillLevel).applyTo(getClient().getPlayer());
        }
    }

    public void useItem(int itemId) {
        MapleItemInformationProvider.getInstance().getItemEffect(itemId).applyTo(getClient().getPlayer());
        getClient().announce(UIPacket.getStatusMsg(itemId));
    }

    public void cancelItem(int itemId) {
        getClient().getPlayer().cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(itemId), false, -1);
    }

    public int getMorphState() {
        return getClient().getPlayer().getMorphState();
    }

    public void removeAll(int itemId) {
        getClient().getPlayer().removeAll(itemId);
    }

    public void gainCloseness(int closeness, int index) {
        MaplePet pet = getPlayer().getSpawnPet(index);
        if (pet != null) {
            pet.setCloseness(pet.getCloseness() + (closeness * ServerConfig.CHANNEL_RATE_TRAIT));
            getPlayer().petUpdateStats(pet, true);
        }
    }

    public void gainClosenessAll(int closeness) {
        MaplePet[] pets = getPlayer().getSpawnPets();
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null && pets[i].getSummoned()) {
                pets[i].setCloseness(pets[i].getCloseness() + closeness);
                getPlayer().petUpdateStats(pets[i], true);
            }
        }
    }

    /*
     * 重置地圖
     */
    public void resetMap(int mapId) {
        getMap(mapId).resetFully();
    }

    /*
     * 打開NPC
     */
    public void openNpc(int npcId) {
        getClient().removeClickedNPC();
        NPCScriptManager.getInstance().start(getClient(), npcId);
    }

    /*
     * 打開NPC 是另外的連接
     */
    public void openNpc(MapleClient cg, int npcId) {
        cg.removeClickedNPC();
        NPCScriptManager.getInstance().start(cg, npcId);
    }

    /*
     * 打開NPC和NPC模式
     */
    public void openNpc(int npcId, String npcMode) {
        getClient().removeClickedNPC();
        NPCScriptManager.getInstance().start(getClient(), npcId, npcMode);
    }

    /*
     * 獲取地圖ID
     */
    public int getMapId() {
        return getClient().getPlayer().getMapId();
    }

    /*
     * 檢測地圖是否有指定的怪物ID
     */
    public boolean haveMonster(int mobId) {
        for (MapleMapObject obj : getClient().getPlayer().getMap().getMonsters()) {
            MapleMonster mob = (MapleMonster) obj;
            if (mob.getId() == mobId) {
                return true;
            }
        }
        return false;
    }

    /*
     * 獲取頻道
     */
    public int getChannelNumber() {
        return getClient().getChannel();
    }

    public boolean getMonsterByID(int mobid) {
        return getMap().getMobObjectByID(mobid) != null;
    }

    /**
     * 獲取當前中指定地圖的怪物數量
     *
     * @param mapId 地圖ID
     * @return
     */
    public int getMonsterCount(int mapId) {
        return getMonsterCount(mapId, -1);
    }

    /**
     * 獲取當前中指定地圖的怪物數量
     *
     * @param mapId 地圖ID
     * @param mobid 怪物ID
     * @return
     */
    public int getMonsterCount(int mapId, int mobid) {
        return getClient().getChannelServer().getMapFactory().getMap(mapId).getMobSizeByID();
    }

    /*
     * 改變技能等級 參數 技能ID 技能等級 技能最大等級
     */
    public void teachSkill(int skillId, int skilllevel, byte masterlevel) {
        getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(skillId), skilllevel, masterlevel);
    }

    /*
     * 改變技能等級 參數 技能ID 技能等級
     */
    public void teachSkill(int skillId, int skilllevel) {
        Skill skil = SkillFactory.getSkill(skillId);
        if (skil == null) {
            return;
        }
        if (getPlayer().getSkillLevel(skil) > skilllevel) {
            skilllevel = getPlayer().getSkillLevel(skil);
        }
        getPlayer().changeSingleSkillLevel(skil, skilllevel, (byte) skil.getMaxLevel());
    }

    public int getSkillLevel(int skillId) {
        return getPlayer().getSkillLevel(skillId);
    }

    /*
     * 獲取當前中指定地圖的角色數量
     */
    public int getPlayerCount(int mapId) {
        return getClient().getChannelServer().getMapFactory().getMap(mapId).getCharactersSize();
    }

    public void instantMapWarp(byte by2) {
        getClient().announce(MaplePacketCreator.instantMapWarp(by2));
    }

    public void currentMapWarp(int type, Point pos) {
        getClient().announce(MaplePacketCreator.instantMapWarp(type, pos));
    }

    public void teleport(final int n) {
        this.teleport(0, n, null);
    }

    public void teleport(final int n, final int n2, final Point point) {
        getClient().announce(MaplePacketCreator.userTeleport(false, n, n2, point));
    }

    public void teleportPortal(final int n, final int portal) {
        MapleMap map = getMap();
        if (map == null) {
            return;
        }
        MaplePortal portalPos = map.getPortal(portal);
        if (portalPos == null) {
            return;
        }
        getClient().announce(MaplePacketCreator.userTeleport(false, n, getPlayer().getId(), portalPos.getPosition()));
    }

    public void teleportPortal(final int n, final String portal) {
        MapleMap map = getMap();
        if (map == null) {
            return;
        }
        MaplePortal portalPos = map.getPortal(portal);
        if (portalPos == null) {
            return;
        }
        getClient().announce(MaplePacketCreator.userTeleport(false, n, getPlayer().getId(), portalPos.getPosition()));
    }

    public boolean dojoAgent_NextMap() {
        return MapleDojoAgent.warpNextMap_Agent(getPlayer());
    }

    public MapleEvent getEvent(String string) {
        return getChannelServer().getEvent(MapleEventType.getByString(string));
    }

    public boolean isEventStart(String string) {
        return getChannelServer().getEvent() == getChannelServer().getEvent(MapleEventType.getByString(string)).getMap(0).getId();
    }

    public int getSavedLocation(String loc) {
        Integer ret = getClient().getPlayer().getSavedLocation(SavedLocationType.fromString(loc));
        if (ret <= 0) {
            return 950000100;
        }
        return ret;
    }

    public void saveLocation(String loc) {
        getClient().getPlayer().saveLocation(SavedLocationType.fromString(loc));
    }

    public void saveLocation(String loc, int mapID) {
        getClient().getPlayer().saveLocation(SavedLocationType.fromString(loc), mapID);
    }

    public void saveReturnLocation(String loc) {
        getClient().getPlayer().saveLocation(SavedLocationType.fromString(loc), getClient().getPlayer().getMap().getReturnMap().getId());
    }

    public void clearSavedLocation(String loc) {
        getClient().getPlayer().clearSavedLocation(SavedLocationType.fromString(loc));
    }

    public void summonMsg(String msg) {
        if (!getClient().getPlayer().hasSummon()) {
            playerSummonHint(true);
        }
        getClient().announce(UIPacket.summonMessage(msg));
    }

    public void summonMsg(int type) {
        if (!getClient().getPlayer().hasSummon()) {
            playerSummonHint(true);
        }
        getClient().announce(UIPacket.summonMessage(type));
    }

    public void showInstruction(String msg, int width, int height) {
        getClient().announce(MaplePacketCreator.sendHint(msg, width, height, null));
    }

    public void playerSummonHint(boolean summon) {
        getClient().getPlayer().setHasSummon(summon);
        getClient().announce(UIPacket.summonHelper(summon));
    }

    public String getInfoQuest(int questId) {
        return getClient().getPlayer().getInfoQuest(questId);
    }

    public void updateInfoQuest(int questId, String data) {
        getClient().getPlayer().updateInfoQuest(questId, data);
    }

    public boolean getEvanIntroState(String data) {
        return getInfoQuest(22013).equals(data);
    }

    public void updateEvanIntroState(String data) {
        updateInfoQuest(22013, data);
    }

    public void Aran_Start() {
        getClient().announce(UIPacket.Aran_Start());
    }

    public void evanTutorial(String data, int v1) {
        getClient().announce(NPCPacket.getEvanTutorial(data));
    }

    public void AranTutInstructionalBubble(String data) {
        getClient().announce(EffectPacket.showAvatarOriented(data));
    }

    public void TutInstructionalBalloon(String data) {
        AranTutInstructionalBubble(data);
    }

    public void showWZEffect(String data) {
        getClient().announce(EffectPacket.showReservedEffect(data));
    }

    public void showReservedEffect(final boolean screenCoord, final int rx, final int ry, final String data) {
        getClient().announce(EffectPacket.showReservedEffect(screenCoord, rx, ry, data));
    }

    public void showEffect(String effect) {
        getClient().announce(MaplePacketCreator.showEffect(effect));
    }

    public void setAnimationEffect(String path, String name) {
        getClient().announce(EffectPacket.playSpineScreen(true, false, true, 0, path, name, "", false, 0, 0, 0, 0, null));
    }

    public void playSound(String sound) {
        playSound(false, sound);
    }

    public void playSound(boolean broadcast, String sound) {
        if (broadcast) {
            getMap().broadcastMessage(MaplePacketCreator.playSound(sound));
        } else {
            getClient().announce(MaplePacketCreator.playSound(sound));
        }
    }

    public void startMapEffect(String msg, int itemId) {
        getClient().getPlayer().getMap().startMapEffect(msg, itemId);
    }

    public void showWeatherEffectNotice(final String s, final int n, final int n2) {
        this.getMap().showWeatherEffectNotice(s, n, n2);
    }

    public void showWeatherEffectNoticeY(final String s, final int n, final int n2, final int n3) {
        this.getMap().showWeatherEffectNoticeY(s, n, n2, n3);
    }

    public void showMapEffect(String path) {
        getClient().announce(UIPacket.showMapEffect(path));
    }

    public void EnableUI(short i) {
        getClient().announce(UIPacket.IntroEnableUI(i));
    }

    public void EnableUI(short i, boolean block) {
        getClient().announce(UIPacket.IntroEnableUI(i, block));
    }

    public void DisableUI(boolean enabled) {
        getClient().announce(UIPacket.SetStandAloneMode(enabled));
    }

    public void MovieClipIntroUI(boolean enabled) {
        getClient().announce(UIPacket.SetStandAloneMode(enabled));
        getClient().announce(UIPacket.setDirectionMod(enabled));
    }

    public void lockUI() {
        getClient().announce(UIPacket.SetStandAloneMode(true));
        getClient().announce(UIPacket.setDirectionMod(true));
    }

    public void unlockUI() {
        getClient().announce(UIPacket.SetStandAloneMode(false));
        getClient().announce(UIPacket.setDirectionMod(false));
    }

    public MapleInventoryType getInvType(int i) {
        return MapleInventoryType.getByType((byte) i);
    }

    public String getItemName(int itemId) {
        return MapleItemInformationProvider.getInstance().getName(itemId);
    }

    public void gainPetItem(int itemid) {
        gainPetItem(itemid, (short) 1);
    }

    public void gainPetItem(int itemid, short quantity) {
        Item item = new client.inventory.Item(itemid, (byte) 0, !this.getC().getPlayer().isSuperGm() ? 1 : quantity, 0);
        MapleInventoryManipulator.addbyItem(this.getC(), item);
        //以下方法已經不能用了!
        //MapleInventoryManipulator.addById(getClient(), itemid, quantity, "", MaplePet.createPet(itemid, MapleInventoryIdentifier.getInstance()), 45, getName() + "腳本獲得");
    }

    public void gainPet(int itemId, String name, int level, int closeness, int fullness, long period, short flags) {
        if (itemId / 10000 != 500) {
            itemId = 5000000;
        }
        if (level > 30) {
            level = 30;
        }
        if (closeness > 30000) {
            closeness = 30000;
        }
        if (fullness > 100) {
            fullness = 100;
        }
        try {
            MapleInventoryManipulator.addById(getClient(), itemId, 1, "", MaplePet.createPet(itemId, name, level, closeness, fullness, MapleInventoryIdentifier.getInstance(), MapleItemInformationProvider.getInstance().getLimitedLife(itemId) > 0 ? (int) period : 0, flags, -1), 45, "Pet from interaction " + itemId + " (" + this.npcID + ")" + " on " + DateUtil.getCurrentDate());
        } catch (NullPointerException ex) {
            ex.printStackTrace();
        }
    }

    public void removeSlot(int invType, short slot, short quantity) {
        MapleInventoryManipulator.removeFromSlot(getClient(), getInvType(invType), slot, quantity, true);
    }

    public void gainGP(int gp) {
        if (getPlayer().getGuildId() <= 0) {
            return;
        }
        WorldGuildService.getInstance().gainGP(getPlayer().getGuildId(), gp); //1 for
    }

    public int getGP() {
        if (getPlayer().getGuildId() <= 0) {
            return 0;
        }
        return WorldGuildService.getInstance().getGP(getPlayer().getGuildId()); //1 for
    }

    public int itemQuantity(int itemId) {
        return getPlayer().itemQuantity(itemId);
    }

    public EventInstanceManager getDisconnected(String event) {
        EventManager em = getEventManager(event);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (eim.isDisconnected(getClient().getPlayer()) && eim.getPlayerCount() > 0) {
                return eim;
            }
        }
        return null;
    }

    public EventInstanceManager getEIMbyEvenName(String string) {
        EventManager em = this.getEventManager(string);
        if (em == null) {
            return null;
        }
        for (EventInstanceManager eim : em.getInstances()) {
            if (eim.getPlayerCount() <= 0) {
                continue;
            }
            return eim;
        }
        return null;
    }

    public boolean isAllReactorState(int reactorId, int state) {
        boolean ret = false;
        for (MapleReactor r : getMap().getAllReactorsThreadsafe()) {
            if (r.getReactorId() == reactorId) {
                ret = r.getState() == state;
            }
        }
        return ret;
    }

    public void spawnMonster(int mobId) {
        spawnMonster(mobId, 1, getPlayer().getPosition());
    }

    // summon one monster, remote location
    public void spawnMonster(int mobId, int x, int y) {
        spawnMonster(mobId, 1, new Point(x, y));
    }

    // multiple monsters, remote location
    public void spawnMonster(int mobId, int quantity, int x, int y) {
        spawnMonster(mobId, quantity, new Point(x, y));
    }

    // handler for all spawnMonster
    public void spawnMonster(int mobId, int quantity, Point pos) {
        for (int i = 0; i < quantity; i++) {
            getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), pos);
        }
    }

    public void sendNPCText(String text, int npcId) {
        getMap().broadcastMessage(NPCPacket.getNPCTalk(npcId, (byte) 0, text, "00 00 00 00 00 00", (byte) 0));
    }

    public boolean getTempFlag(int flag) {
        return (getClient().getChannelServer().getTempFlag() & flag) == flag;
    }

    public void logPQ(String text) {
//	FileoutputUtil.log(FileoutputUtil.PQ_Log, text);
    }

    public void trembleEffect(int type, int delay) {
        getClient().announce(MaplePacketCreator.trembleEffect(type, delay));
    }

    public int nextInt(int arg0) {
        return Randomizer.nextInt(arg0);
    }

    public MapleQuest getQuest(int arg0) {
        return MapleQuest.getInstance(arg0);
    }

    public void achievement(int a) {
        getClient().getPlayer().getMap().broadcastMessage(MaplePacketCreator.achievementRatio(a));
    }

    public MapleInventory getInventory(int type) {
        return getClient().getPlayer().getInventory(MapleInventoryType.getByType((byte) type));
    }

    public int randInt(int arg0) {
        return Randomizer.nextInt(arg0);
    }

    public void sendDirectionFacialExpression(int expression, int duration) {
        getClient().announce(UIPacket.UserEmotionLocal(expression, duration));
    }

    public void sendDirectionCameraMove(byte type, int value) {
        getClient().announce(UIPacket.getDirectionCameraMove(type, value));
    }

    public void sendDirectionCameraMove(byte type, int x, int y, int z) {
        getClient().announce(UIPacket.getDirectionCameraMove(type, x, y, z));
    }

    public void sendDirectionEffectPlay(String data) {
        getClient().announce(UIPacket.getDirectionEffectPlay(data, 2000, 0, -100, 0));
        getClient().announce(UIPacket.getDirectionEvent(InGameDirectionType.DELAY, 2000));
    }

    public void sendDirectionEffectPlay(String data, int value, int s) {
        getClient().announce(UIPacket.getDirectionEffectPlay(data, value, s));
    }

    public void sendDirectionEffectPlay(String data, int value, int x, int y) {
        getClient().announce(UIPacket.getDirectionEffectPlay(data, value, x, y));
    }

    public void sendDirectionEffectPlay(String data, int value, int x, int y, int a, int b) {
        getClient().announce(UIPacket.getDirectionEffectPlay(data, value, x, y, a, b));
    }

    public void sendDirectionEvent(String type, int value) {
        getClient().announce(UIPacket.getDirectionEvent(InGameDirectionType.valueOf(type), value));
    }

    public void sendDirectionEvent(String type, String data, int[] values) {
        sendDirectionEvent(type, data, values, null);
    }

    public void sendDirectionEvent(String type, String data, int[] values, String data2) {
        getClient().announce(UIPacket.getDirectionEvent(InGameDirectionType.valueOf(type), data, values, data2));
    }

    /*
     * 獲取角色專業技能學習的個數
     */
    public int getProfessions() {
        int ii = 0;
        int skillId;
        for (int i = 0; i < 5; i++) {
            skillId = 92000000 + i * 10000;
            if (getClient().getPlayer().getProfessionLevel(skillId) > 0) {
                ii++;
            }
        }
        return ii;
    }

    /*
     * 獲取挑戰BOSS次數
     */
    public int getBossLog(String bossid) {
        return getClient().getPlayer().getBossLog(bossid);
    }

    public int getBossLog(String bossid, int type) {
        return getClient().getPlayer().getBossLog(bossid, type);
    }

    /*
     * 設置或增加挑戰BOSS次數
     */
    public void setBossLog(String bossid) {
        getClient().getPlayer().setBossLog(bossid);
    }

    public void setBossLog(String bossid, int type) {
        getClient().getPlayer().setBossLog(bossid, type);
    }

    public void setBossLog(String bossid, int type, int count) {
        getClient().getPlayer().setBossLog(bossid, type, count);
    }

    /*
     * 重置挑戰BOSS次數
     */
    public void resetBossLog(String bossid) {
        getClient().getPlayer().resetBossLog(bossid);
    }

    public void resetBossLog(String bossid, int type) {
        getClient().getPlayer().resetBossLog(bossid, type);
    }

    /*
     * 設置或增加組隊成員的挑戰BOSS次數
     * bossid 挑戰BOSS任務的名稱
     * type 0 = 0點重置 大於0不重置
     * count 設置的次數
     * checkMap 是否檢測在同一地圖
     */
    public void setPartyBossLog(String bossid) {
        setPartyBossLog(bossid, 0);
    }

    public void setPartyBossLog(String bossid, int type) {
        setPartyBossLog(bossid, type, 1);
    }

    public void setPartyBossLog(String bossid, int type, int count) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            getClient().getPlayer().setBossLog(bossid, type, count);
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getPlayer().getMap().getPlayerObject(chr.getId());
            if (curChar != null && curChar.getMapId() == cMap) {
                curChar.setBossLog(bossid, type, count);
            }
        }
    }

    public int getBossLogAcc(String bossid) {
        return getClient().getPlayer().getBossLogAcc(bossid);
    }

    public void setBossLogAcc(String bossid) {
        getClient().getPlayer().setBossLogAcc(bossid);
    }

    public void setBossLogAcc(String bossid, int bosscount) {
        getClient().getPlayer().setBossLogAcc(bossid, bosscount);
    }

    public int getEventLogForDay(String eventId) {
        return getClient().getPlayer().getEventLogForDay(eventId);
    }

    public void setEventLogForDay(String eventId) {
        getClient().getPlayer().setEventLogForDay(eventId);
    }

    public void setEventLogForDay(String eventId, int eventCount) {
        getClient().getPlayer().setEventLogForDay(eventId, eventCount);
    }

    public void resetEventLogForDay(String eventId) {
        getClient().getPlayer().resetEventLogForDay(eventId);
    }

    /*
     * 新的在線泡點
     */
    public int getGamePoints() {
        return getClient().getPlayer().getGamePoints();
    }

    public void gainGamePoints(int amount) {
        getClient().getPlayer().gainGamePoints(amount);
    }

    public void resetGamePoints() {
        getClient().getPlayer().resetGamePoints();
    }

    /*
     * 打開時鐘
     */
    public void getClock(int time) {
        getClient().announce(MaplePacketCreator.getClock(time));
    }

    /*
     * 打開1個網頁
     */
    public void openWeb(String web) {
        openWeb((byte) 0, (byte) 1, web);
    }

    public void openWeb(byte nValue1, byte nValue2, String web) {
        getClient().announce(MaplePacketCreator.openWeb(nValue1, nValue2, web));
    }

    public void openWebUI(int n, String s, String s2) {
        getClient().announce(MaplePacketCreator.openWebUI(n, s, s2));
    }

    /*
     * 是否開啟Pvp大亂戰鬥地圖
     */
    public boolean isCanPvp() {
        return ServerConfig.CHANNEL_OPENPVP;
    }

    /*
     * 顯示武林道場排名
     */
    public void showDoJangRank() {
        getClient().announce(MaplePacketCreator.getDojangRanking());
    }

    /*
     * 結婚腳本檢測
     */
    public int MarrageChecking() {
        if (getPlayer().getParty() == null) { //沒有組隊 - -1
            return -1;
        } else if (getPlayer().getMarriageId() > 0) { //檢測角色是否結婚 - 0
            return 0;
        } else if (getPlayer().getParty().getMemberList().size() != 2) { //組隊成員不等於2 - 1
            return 1;
        } else if (getPlayer().getGender() == 0 && !(getPlayer().haveItem(1050121) || getPlayer().haveItem(1050122) || getPlayer().haveItem(1050113))) {
            return 5;
        } else if (getPlayer().getGender() == 1 && !(getPlayer().haveItem(1051129) || getPlayer().haveItem(1051130) || getPlayer().haveItem(1051114))) {
            return 5;
        } else if (!getPlayer().haveItem(1112001)) { //沒有戀人戒指
            return 6;
        }
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            if (chr.getId() == getPlayer().getId()) {
                continue;
            }
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null) { //找不到組隊成員
                return 2;
            } else if (curChar.getMarriageId() > 0) { //組隊成員中有人結婚
                return 3;
            } else if (curChar.getGender() == getPlayer().getGender()) { //性別相同
                return 4;
            } else if (curChar.getGender() == 0 && !(curChar.haveItem(1050121) || curChar.haveItem(1050122) || curChar.haveItem(1050113))) {
                return 5;
            } else if (curChar.getGender() == 1 && !(curChar.haveItem(1051129) || curChar.haveItem(1051130) || curChar.haveItem(1051114))) {
                return 5;
            } else if (!curChar.haveItem(1112001)) { //沒有戀人戒指
                return 6;
            }
        }
        return 9;
    }

    /*
     * 結婚腳本獲取組隊成員中另外1個玩家的ID
     */
    public int getPartyFormID() {
        int curCharID = -1;
        if (getPlayer().getParty() == null) { //沒有組隊 - -1
            curCharID = -1;
        } else if (getPlayer().getMarriageId() > 0) { //檢測角色是否結婚 - 0
            curCharID = -2;
        } else if (getPlayer().getParty().getMemberList().size() != 2) { //組隊成員不等於2 - 1
            curCharID = -3;
        }
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            if (chr.getId() == getPlayer().getId()) {
                continue;
            }
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar == null) {
                curCharID = -4;
            } else {
                curCharID = chr.getId();
            }
        }
        return curCharID;
    }

    /*
     * 獲取角色的GM等級
     */
    public int getGMLevel() {
        return getClient().getPlayer().getGmLevel();
    }

    /*
     * 轉身繫統
     */
    public int getReborns() {
        return getClient().getPlayer().getReborns();
    }

    public int getReborns1() {
        return getClient().getPlayer().getReborns1();
    }

    public int getReborns2() {
        return getClient().getPlayer().getReborns2();
    }

    public int getReborns3() {
        return getClient().getPlayer().getReborns3();
    }

    public void doReborn(int type) {
        getClient().getPlayer().doReborn(type);
    }

    public void doReborn(int type, int ap) {
        getClient().getPlayer().doReborn(type, ap);
    }

    /*
     * 多顏色聊天代碼
     */
    public void spouseMessage(int op, String msg) {
        dropMessage(op, msg);
    }

    /*
     * GM警告信息
     */
    public void sendPolice(String text, boolean dc) {
        if (dc) {
            getClient().getPlayer().sendPolice(text);
        } else {
            getClient().announce(MaplePacketCreator.sendPolice(text));
        }
    }

    /*
     * 給組隊中所有角色名聲值
     */
    public void givePartyHonorExp(int gain, boolean show) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            getClient().getPlayer().gainHonor(gain);
            if (show) {
                getClient().announce(MaplePacketCreator.spouseMessage(UserChatMessageType.普通, "扎比埃爾的悄悄話：阿斯旺剩下的希拉殘黨全部消滅掉啦？剛來了一些新東西，你可以來看看。說不定你能用得上～"));
            }
            return;
        }
        int cMap = getPlayer().getMapId();
        for (MaplePartyCharacter chr : getPlayer().getParty().getMemberList()) {
            MapleCharacter curChar = getChannelServer().getPlayerStorage().getCharacterById(chr.getId());
            if (curChar != null && (curChar.getMapId() == cMap || curChar.getEventInstance() == getPlayer().getEventInstance())) {
                curChar.gainHonor(gain);
                if (show) {
                    curChar.getClient().announce(MaplePacketCreator.spouseMessage(UserChatMessageType.普通, "扎比埃爾的悄悄話：阿斯旺剩下的希拉殘黨全部消滅掉啦？剛來了一些新東西，你可以來看看。說不定你能用得上～"));
                }
            }
        }
    }

    /*
     * 取系統時間 格式為: yyyy年MM月dd日HH時mm分ss秒
     */
    public String getTime() {
        return DateUtil.getNowTime();
    }

    public boolean checkPartyEvent(int minLevel, int maxLevel, int minPartySize, int maxPartySize, int itemId) {
        MapleParty party = getClient().getPlayer().getParty();
        if (party == null || party.getMemberList().size() < minPartySize || party.getLeaderID() != getClient().getPlayer().getId()) {
            return false;
        }
        int inMap = 0;
        boolean next = true;
        int checkMapId = getPlayer().getMapId(); //需要檢測的地圖ID
        for (MaplePartyCharacter cPlayer : party.getMemberList()) {
            MapleCharacter ccPlayer = getPlayer().getMap().getPlayerObject(cPlayer.getId());
            if (ccPlayer != null && ccPlayer.getLevel() >= minLevel && ccPlayer.getLevel() <= maxLevel && ccPlayer.getMapId() == checkMapId && ccPlayer.haveItem(itemId)) {
                inMap += 1;
            } else {
                return false;
            }
        }
        if (party.getMemberList().size() > maxPartySize || inMap < minPartySize) {
            next = false;
        }
        return next;
    }

    /*
     * 新增變量
     */
    public int getPlayerPoints() {
        return getClient().getPlayer().getPlayerPoints();
    }

    public void setPlayerPoints(int gain) {
        getClient().getPlayer().setPlayerPoints(gain);
    }

    public void gainPlayerPoints(int gain) {
        getClient().getPlayer().gainPlayerPoints(gain);
    }

    public int getPlayerEnergy() {
        return getClient().getPlayer().getPlayerEnergy();
    }

    public void setPlayerEnergy(int gain) {
        getClient().getPlayer().setPlayerEnergy(gain);
    }

    public void gainPlayerEnergy(int gain) {
        getClient().getPlayer().gainPlayerEnergy(gain);
    }

    /*
     * 新增函數
     */
    public int getEventCount(String eventId) {
        return getClient().getPlayer().getEventCount(eventId);
    }

    public int getEventCount(String eventId, int type) {
        return getClient().getPlayer().getEventCount(eventId, type);
    }

    public int getEventCount(String eventId, int type, int resetDay) {
        return getClient().getPlayer().getEventCount(eventId, type, resetDay);
    }

    public void setEventCount(String eventId) {
        getClient().getPlayer().setEventCount(eventId);
    }

    public void setEventCount(String eventId, int type) {
        getClient().getPlayer().setEventCount(eventId, type);
    }

    public void setEventCount(String eventId, int type, int count) {
        getClient().getPlayer().setEventCount(eventId, type, count);
    }

    public void setEventCount(String eventId, int type, int count, int date, boolean updateTime) {
        getClient().getPlayer().setEventCount(eventId, type, count, date, updateTime);
    }

    public void resetEventCount(String eventId) {
        getClient().getPlayer().resetEventCount(eventId);
    }

    public void resetEventCount(String eventId, int type) {
        getClient().getPlayer().resetEventCount(eventId, type);
    }

    public void setPartyEventCount(String eventId) {
        setPartyEventCount(eventId, 0);
    }

    public void setPartyEventCount(String eventId, int type) {
        setPartyEventCount(eventId, type, 1);
    }

    public void setPartyEventCount(String eventId, int type, int count) {
        if (getPlayer().getParty() == null || getPlayer().getParty().getMemberList().size() == 1) {
            getClient().getPlayer().setEventCount(eventId, type, count);
            return;
        }
        int checkMap = getPlayer().getMapId();
        for (MaplePartyCharacter partyPlayer : getPlayer().getParty().getMemberList()) {
            MapleCharacter chr = getPlayer().getMap().getPlayerObject(partyPlayer.getId());
            if (chr != null && chr.getMapId() == checkMap) {
                chr.setEventCount(eventId, type, count);
            }
        }
    }

    public boolean checkPartyEventCount(String eventId) {
        return checkPartyEventCount(eventId, 1);
    }

    public boolean checkPartyEventCount(String eventId, int checkcount) {
        MapleParty party = getClient().getPlayer().getParty();
        int count;
        if (party == null || party.getMemberList().size() == 1) {
            count = getEventCount(eventId);
            return count >= 0 && count < checkcount;
        }
        int check = 0;
        int partySize = party.getMemberList().size();
        for (MaplePartyCharacter partyPlayer : party.getMemberList()) {
            MapleCharacter chr = getPlayer().getMap().getPlayerObject(partyPlayer.getId());
            if (chr != null) {
                count = chr.getEventCount(eventId);
                if (count >= 0 && count < checkcount) {
                    check++;
                }
            }
        }
        return partySize == check;
    }

    public Equip getEquipBySlot(short slot) {
        return (Equip) getClient().getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
    }

    public Equip getEquippedBySlot(short slot) {
        return (Equip) getClient().getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
    }

    public Equip getDecorationBySlot(short slot) {
        return (Equip) getClient().getPlayer().getInventory(MapleInventoryType.DECORATION).getItem(slot);
    }

    public void updateEquip(Item item) {
        List<ModifyInventory> mods = new ArrayList<>();
        mods.add(new ModifyInventory(3, item)); //刪除裝備
        mods.add(new ModifyInventory(0, item)); //獲得裝備
        getC().announce(InventoryPacket.modifyInventory(true, mods, getPlayer()));
    }

    public int getRandomPotential(short slot, int potId) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip equip = (Equip) getClient().getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
        if (equip == null || ii.isCash(equip.getItemId()) || ii.getPotentialInfo(potId) == null) {
            return -1;
        }
        List<List<StructItemOption>> pots = new LinkedList<>(ii.getPotentialInfos(40000).values());
        int reqLevel = ii.getReqLevel(equip.getItemId()) / 10;
        int count = 0;
        boolean rewarded = false;
        while (!rewarded) {
            count++;
            StructItemOption pot = pots.get(nextInt(pots.size())).get(reqLevel);
            if (pot != null && pot.reqLevel / 10 <= reqLevel && pot.opID == potId) {
                rewarded = true;
            } else if (count > 3000) {
                rewarded = true;
            }
        }
        return count;
    }

    public boolean changePotential(short slot, int potline, int potId, boolean show) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Equip equip = (Equip) getClient().getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
        if (equip == null || ii.isCash(equip.getItemId()) || ii.getPotentialInfo(potId) == null) {
            return false;
        }
        if (potline >= 1 && potline <= 6) {
            equip.setPotential(potId, potline > 3 ? potline - 3 : potline, potline > 3);
            getClient().getPlayer().forceUpdateItem(equip);
            if (show) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(getClient().getPlayer().getName(), " : 使用 一鍵潛能功能 將裝備{" + ii.getName(equip.getItemId()) + "}第" + potline + "條潛能修改.大家一起恭喜他（她）吧！！！！", equip, 3, getClient().getChannel()));
            }
            return true;
        } else {
            return false;
        }
    }

    public byte getSubcategory() {
        return getClient().getPlayer().getSubcategory();
    }

    public final int getActivity() {
        return MapleActivity.getActivity(getPlayer());
    }

    public final int getMaxActivity() {
        return MapleActivity.getMaxActivity();
    }

    public final int getDiffActivity() {
        return MapleActivity.getDiffActivity(getPlayer());
    }

    public final int getNextStage() {
        return MapleActivity.getNextStage(getPlayer());
    }

    public final void finishActivity(int questid) {
        MapleActivity.finish(getPlayer(), questid);
    }

    public final int getAQActivity(final int questid) {
        return MapleActivity.QuestActivity.getActivityById(questid);
    }

    public final int getAQMaxTimes(final int questid) {
        return MapleActivity.QuestActivity.getMaxTimesById(questid);
    }

    public final int getAQNextStageNeed() {
        return MapleActivity.getNextStageNeed(getPlayer());
    }

    public final int getRecevieReward() {
        return MapleActivity.getRecevieReward(getPlayer());
    }

    public List<Integer> getSevenDayPayLog(int day) {
        List<Integer> ret = new ArrayList<>();
        for (int i = 0; i < day; i++) {
            ret.add(0);
        }
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM paylog WHERE account = ?");
            ps.setString(1, getAccountName());
            ResultSet rs = ps.executeQuery();

            Timestamp currtime = new Timestamp(System.currentTimeMillis());
            while (rs.next()) {
                int twd = rs.getInt("rmb");
                Timestamp time = rs.getTimestamp("paytime");
                int diffday = (int) ((currtime.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
                if (diffday < day) {
                    ret.set(diffday, (ret.get(diffday)) + twd);
                }
            }
            ps.close();
            rs.close();
        } catch (SQLException e) {
            System.err.println("獲取儲值記錄失敗" + e);
        }
        return ret;
    }

//    public List<CharNameAndId> getPayRankingTop() {
//        List<CharNameAndId> ret = new LinkedList<>();
//        Calendar cal = Calendar.getInstance();
//        cal.add(Calendar.DATE, -(cal.get(Calendar.DAY_OF_WEEK) - 1));
//
//        try {
//            Connection con = DatabaseConnection.getConnection();
//            PreparedStatement ps = con.prepareStatement("SELECT SUM(rmb) FROM paylog WHERE ORDER BY rmb DESC LIMIT 10");
//            ps.setString(1, getClient().getAccountName());
//            ResultSet rs = ps.executeQuery();
//
//            Timestamp currtime = new Timestamp(System.currentTimeMillis());
//            while (rs.next()) {
//                int twd = rs.getInt("rmb");
//                Timestamp time = rs.getTimestamp("paytime");
//                int diffday = (int) ((currtime.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
//                if (diffday < day) {
//                    ret.set(diffday, (int) (ret.get(diffday)) + twd);
//                }
//            }
//            ps.close();
//            rs.close();
//        } catch (SQLException e) {
//            System.err.println("獲取儲值記錄失敗" + e);
//        }
//        return ret;
//    }

    /**
     * 高級任務系統 - 檢查基礎條件是否符合所有任務前置條件
     *
     * @param missionid
     * @return
     */
    public final boolean MissionCanMake(final int missionid) {
        return getPlayer().MissionCanMake(missionid);
    }

    /**
     * 高級任務系統 - 檢查基礎條件是否符合指定任務前置條件
     *
     * @param missionid
     * @param checktype
     * @return
     */
    public final boolean MissionCanMake(final int missionid, final int checktype) {
        return getPlayer().MissionCanMake(missionid, checktype);
    }

    /**
     * 高級任務函數 - 得到任務的等級數據
     *
     * @param missionid
     * @param checktype
     * @return
     */
    public final int MissionGetIntData(final int missionid, final int checktype) {
        return getPlayer().MissionGetIntData(missionid, checktype);
    }

    /**
     * 高級任務函數 - 得到任務的的字符串型數據
     *
     * @param missionid
     * @param checktype
     * @return
     */
    public final String MissionGetStrData(final int missionid, final int checktype) {
        return getPlayer().MissionGetStrData(missionid, checktype);
    }

    /**
     * 高級任務函數 - 直接輸出需要的職業列表串
     *
     * @param joblist
     * @return
     */
    public final String MissionGetJoblist(final String joblist) {
        return getPlayer().MissionGetJoblist(joblist);
    }

    /**
     * 高級任務系統 - 任務創建
     *
     * @param charid
     * @param missionid
     * @param repeat
     * @param repeattime
     * @param lockmap
     * @param mobid
     */
    public final void MissionMake(final int charid, final int missionid, final int repeat, final int repeattime, final int lockmap, final int mobid) {
        getPlayer().MissionMake(charid, missionid, repeat, repeattime, lockmap, mobid);
    }

    /**
     * 高級任務系統 - 重新做同一個任務
     *
     * @param charid     角色ID
     * @param missionid  任務ID
     * @param repeat     重複次數
     * @param repeattime 重複間隔時間
     * @param lockmap    鎖定地圖ID
     */
    public final void MissionReMake(final int charid, final int missionid, final int repeat, final int repeattime, final int lockmap) {
        getPlayer().MissionReMake(charid, missionid, repeat, repeattime, lockmap);
    }

    /**
     * 高級任務系統 - 任務完成
     *
     * @param charid
     * @param missionid
     */
    public final void MissionFinish(final int charid, final int missionid) {
        getPlayer().MissionFinish(charid, missionid);
    }

    /**
     * 高級任務系統 - 放棄任務
     *
     * @param charid
     * @param missionid
     */
    public final void MissionDelete(final int charid, final int missionid) {
        getPlayer().MissionDelete(charid, missionid);
    }

    /**
     * 添加最小任務
     *
     * @param charid
     * @param missionid
     * @param num
     */
    public final void MissionSetMinNum(final int charid, final int missionid, final int num) {
        getPlayer().MissionSetMinNum(charid, missionid, num);
    }

    /**
     * 獲取最小任務
     *
     * @param charid
     * @param missionid
     * @param mobid
     * @return
     */
    public final int MissionGetMinNum(final int charid, final int missionid, final int mobid) {
        return getPlayer().MissionGetMinNum(charid, missionid, mobid);
    }

    public final int MissionGetMaxNum(final int charid, final int missionid, final int mobid) {
        return getPlayer().MissionGetMaxNum(charid, missionid, mobid);
    }

    public final int MissionGetMobId(final int charid, final int missionid) {
        return getPlayer().MissionGetMobId(charid, missionid);
    }

    public final void MissionSetMobId(final int charid, final int missionid, final int mobid) {
        getPlayer().MissionSetMobId(charid, missionid, mobid);
    }

    public final int MissionGetFinish(final int charid, final int missionid) {
        return getPlayer().MissionGetFinish(charid, missionid);
    }

    /**
     * 高級任務系統 - 指定任務的需要最大打怪數量
     *
     * @param missionid
     * @param maxnum
     */
    public final void MissionMaxNum(final int missionid, final int maxnum) {
        getPlayer().MissionMaxNum(missionid, maxnum);
    }

    /**
     * 高級任務系統 - 放棄所有未完成任務
     *
     * @param charid
     */
    public final void MissionDeleteNotFinish(final int charid) {
        getPlayer().MissionDeleteNotFinish(charid);
    }

    /**
     * 高級任務系統 - 獲得任務是否可以做
     *
     * @param charid
     * @param missionid
     * @param maxtimes
     * @param checktype
     * @return
     */
    public final boolean MissionStatus(final int charid, final int missionid, final int maxtimes, final int checktype) {
        return getPlayer().MissionStatus(charid, missionid, maxtimes, checktype);
    }

    public final long MissionGetRepeattime(final int charid, final int missionid) {
        return getPlayer().MissionGetRepeattime(charid, missionid);
    }

    public final void MissionAddMinNum(final int charid, final int missionid, final int num) {
        getPlayer().MissionAddMinNum(charid, missionid, num);
    }

    public int getTWD() {
        return getPlayer().getTWD();
    }

    public void setTWD(int twd) {
        getPlayer().setTWD(twd);
    }

    public void gainTWD(int twd) {
        getPlayer().gainTWD(twd);
    }

    public int getTotalTWD() {
        return getPlayer().getTotalTWD();
    }

    public List<Pair<String, Integer>> getTotalTWDRanking(int limit) {
        return getPlayer().getTotalTWDRanking(limit);
    }

    public final void addByItem(final Item item) {
        MapleInventoryManipulator.addbyItem(getClient(), item);
    }

    public void changeDamageSkin(int id) {
        getPlayer().changeDamageSkin(id);
    }

    public void updateSubmitBug(int id, int status) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE buglog SET status = ? WHERE id = ?")) {
                ps.setInt(1, status);
                ps.setInt(2, id);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public void submitBug(String title, String content) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO buglog VALUES (DEFAULT, ?, ?, ?, DEFAULT)")) {
                ps.setInt(1, getPlayer().getId());
                ps.setString(2, title);
                ps.setString(3, content);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public List<Quadruple> getSubmitBug() {
        List<Quadruple> buglist = new LinkedList<>();
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM buglog WHERE charid = ?")) {
                ps.setInt(1, getPlayer().getId());
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        buglist.add(new Quadruple<>(rs.getInt("id"), rs.getString("title"), rs.getString("content"), rs.getInt("status")));
                    }
                }
            }
        } catch (SQLException e) {
            log.error(e.toString());
        }
        return buglist;
    }

    public final void getShowItemGain(int itemId, int quantity, boolean inChat) {
        getClient().announce(MaplePacketCreator.getShowItemGain(itemId, quantity, inChat));
    }

    public final void insertRanking(String rankingname, int value) {
        RankingTop.getInstance().insertRanking(getPlayer(), rankingname, value);
    }

    public void setCredit(String name, int value) {
        getClient().getPlayer().setCredit(name, value);
    }

    public void gainCredit(String name, int value) {
        getClient().getPlayer().gainCredit(name, value);
    }

    public int getCredit(String name) {
        return getClient().getPlayer().getCredit(name);
    }

    public int getWp() {
        return getClient().getPlayer().getWeaponPoint();
    }

    public void setWp(int wp) {
        getClient().getPlayer().setWeaponPoint(wp);
    }

    public void gainWp(int wp) {
        getClient().getPlayer().gainWeaponPoint(wp);
    }

    public MapleMonsterInformationProvider getMonsterInfo() {
        return MapleMonsterInformationProvider.getInstance();
    }

    public void enterCS() {
        InterServerHandler.enterCS(getClient(), getClient().getPlayer());
    }

    public void enterAuction() {
        InterServerHandler.EnterAuction(getClient(), getClient().getPlayer());
    }

    public void playMovie(String data, boolean show) {
        getClient().announce(UIPacket.playMovie(data, show));
    }

    public void openUI(int id) {
        getClient().announce(UIPacket.sendOpenWindow(id));
    }

    public void putGeneralData(String key, String value) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT general_data (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?")) {
                ps.setString(1, key);
                ps.setString(2, value);
                ps.setString(3, value);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("添加通用數據失敗", e);
        }
    }

    public void removeGeneralData(String key) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM general_data WHERE `key` = ?")) {
                ps.setString(1, key);
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("刪除通用數據失敗", e);
        }
    }

    public JSONObject getGeneralData(String key) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT `value` FROM general_data WHERE `key` = ?")) {
                ps.setString(1, key);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        return new JSONObject(rs.getString("value"));
                    } else {
                        return new JSONObject();
                    }
                }
            }
        } catch (SQLException e) {
            log.error("獲得通用數據失敗", e);
            return new JSONObject();
        }
    }

    public ResultSet select(String SQL) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement(SQL)) {
                return ps.executeQuery();
            }
        } catch (SQLException e) {
            log.error("查詢數據失敗", e);
            return null;
        }
    }

    public void update(String SQL) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement(SQL)) {
                ps.executeUpdate();
            }
        } catch (SQLException e) {
            log.error("插入數據失敗", e);
        }
    }

    public boolean changePetColor(int index) {
        MaplePet pet = getPlayer().getSpawnPet(index);
        if (pet != null) {
            pet.setColor(this.nextInt(153));
            this.getPlayer().getMap().broadcastMessage(PetPacket.changePetColor(getPlayer(), pet));
            return true;
        }
        return false;
    }

    public List<MaplePet> getSummonedPet() {
        return this.getPlayer().getSummonedPets();
    }

    public final boolean canSpawn(int mapid, Point point) {
        return this.getMap(mapid).getFootholds().findBelow(point) != null;
    }

    public void checkMedalQuest() {
        scripting.map.MapScriptMethods.explorationPoint(getClient());
    }

    public boolean checkPartyMemberNearby(Point point) {
        return this.getPlayer().getParty() != null && this.getPlayer().getParty().getMemberList().parallelStream().map(partyCharacter -> this.getPlayer().getMap().getPlayerObject(partyCharacter.getId())).allMatch(player -> player == null || player.getPosition().distance(point) <= 29);
    }

    public int deleteCharacter(int cid) {
        return AccountDao.deleteCharacter(getClient().getAccID(), cid);
    }

    public void dispelBuff(int skillid) {
        getPlayer().dispelBuff(skillid);
    }

    public void displayNode(MapleMonster mob) {
        if (mob != null) {
            mob.switchController(this.getPlayer());
            this.getClient().announce(MobPacket.MobRequestResultEscortInfo(mob, this.getMap()));
        }
    }

    public void EventGainNX() {
        gainNX(2, (int) (getPlayer().getParty().getAverageLevel() / 250.0 * 30.0));
    }

    public final void fieldGravefall(int count, int type1, int type2) {
        getMap().broadcastMessage(getPlayer(), MaplePacketCreator.createObtacleAtom(count, type1, type2, getMap()), true);
    }

    public final void gainPQPoint() {
        if (getPlayer() == null) {
            return;
        }
        long l2 = (int) ((double) (Randomizer.rand(25, 50) * getLevel()) * 1.5);
        getPlayer().gainPQPoint(l2);
        getPlayer().dropMessage(-9, "獲得了" + l2 + "組隊點數!");
    }

    public boolean gainSailBouns() {
        int n2 = this.getSailCoins();
        if (getPlayer().canHold(4310100)) {
            getPlayer().gainItem(4310100, n2, "航海獎勵領取");
            getPlayer().updateInfoQuest(17011, "");
            return true;
        }
        return false;
    }

    public int getSailStat() {
        String string = getPlayer().getOneInfo(17011, "S");
        if (string != null) {
            return Integer.valueOf(string);
        }
        return -1;
    }

    public int getSailCoins() {
        String string = getPlayer().getOneInfo(17011, "C");
        if (string != null) {
            return Integer.valueOf(string);
        }
        return 0;
    }

    public void setCanSail() {
        getPlayer().doneSailQuestion();
    }

    public void GainSpecial(int type) {
        switch (type) {
            case 1: {
                if (nextInt(100) >= 15) {
                    break;
                }
                this.gainItem(ItemConstants.fa()[nextInt(ItemConstants.fa().length)], 1);
                break;
            }
            case 2: {
                if (nextInt(100) >= 15) {
                    break;
                }
                this.gainItem(ItemConstants.fb()[nextInt(ItemConstants.fb().length)], 1);
                break;
            }
            case 3: {
                if (nextInt(100) >= 15) {
                    break;
                }
                this.gainItem(ItemConstants.fc()[nextInt(ItemConstants.fc().length)], 5);
            }
        }
    }

    public final String getAccountName() {
        return getClient().getAccountName();
    }

    public List getCashItemlist() {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleInventory items = getPlayer().getInventory(MapleInventoryType.DECORATION);
        ArrayList<Item> ret = new ArrayList<>();
        for (Item item : items) {
            if (ii.isCash(item.getItemId())) {
                ret.add(item);
            }
        }
        return ret;
    }

    public boolean Singin() {
        int n2 = this.getSinginCount();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT `count` , `lastdate` FROM singin WHERE characterid = ?")) {
                ps.setInt(1, this.getPlayer().getId());
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        boolean bl2;
                        Timestamp timestamp2 = rs.getTimestamp("lastdate");
                        boolean bl3 = this.getPlayer().getDaybyDay(0).getTimeInMillis() - timestamp2.getTime() > 0;
                        long l2 = timestamp2.getTime() - this.getPlayer().getDaybyDay(-1).getTimeInMillis();
                        boolean bl4 = bl2 = l2 <= 86400000 && l2 >= 0;
                        if (bl3) {
                            try (PreparedStatement preparedStatement = con.prepareStatement("UPDATE singin SET lastdate = ?, count = ? WHERE characterid = ?")) {
                                preparedStatement.setTimestamp(1, timestamp);
                                preparedStatement.setInt(2, bl2 && n2 < 31 ? rs.getInt("count") + 1 : 1);
                                preparedStatement.setInt(3, this.getPlayer().getId());
                                preparedStatement.executeUpdate();
                            }
                            return true;
                        }
                        return false;
                    }
                }
            }
            try (PreparedStatement preparedStatement = con.prepareStatement("INSERT INTO singin (characterid, lastdate, count) VALUES (?, ?, ?)")) {
                preparedStatement.setInt(1, this.getPlayer().getId());
                preparedStatement.setTimestamp(2, timestamp);
                preparedStatement.setInt(3, 1);
                preparedStatement.execute();
            }
            return true;
        } catch (SQLException e) {
            log.error("簽到出現錯誤", e);
            return false;
        }
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public int getSinginCount() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT `count` FROM singin WHERE characterid = ?")) {
                ps.setInt(1, this.getPlayer().getId());
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        return 0;
                    }
                    {
                        return rs.getInt("count");
                    }
                }
            }
        } catch (SQLException e) {
            log.error("簽到出現錯誤", e);
        }
        return 0;
    }

    public void getChoiceText(byte type, byte mode, int npc) {
        getClient().announce(NPCPacket.getNPCTalkText(type, mode, npc));
    }

    public List<MapleCharacter> getchrlist() {
        return getClient().loadCharacters(getPlayer().getWorld());
    }

    public int getOnline() {
        return World.getTotalConnected();
    }

    public int getOnlineTime() {
        return getPlayer().getOnlineTime();
    }

    public int getTodayOnlineTime() {
        return getPlayer().getTodayOnlineTime();
    }

    public void initTodayOnlineTime() {
        getPlayer().initTodayOnlineTime();
    }

    public final void spawnNpcForPlayer(int mapid, int id, Point pos) {
        this.getMap(mapid).spawnNpcForPlayer(getClient(), id, pos);
    }

    public final Point getSpawnPoint(int mapid) {
        ArrayList<Point> arrayList = new ArrayList<>();
        MapleMap map = this.getMap(mapid);
        map.getFootholds().getAllRelevants().forEach(p2 -> arrayList.add(new Point(Randomizer.rand(map.getLeft(), map.getRight()), p2.getY2())));
        return arrayList.get(nextInt(arrayList.size()));
    }

    public void onUserEnter(String onUserEnter) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = this.getPlayer().getMap().getPlayerObject(partyCharacter.getId());
                if (player == null) {
                    continue;
                }
                scripting.map.MapScriptMethods.startScript_FirstUser(player.getClient(), onUserEnter);
            }
        }
    }

    public void openMapScript(String onUserEnter) {
        getClient().removeClickedNPC();
        scripting.map.MapScriptMethods.startScript_FirstUser(this.getClient(), onUserEnter);
    }

    public boolean isAdmin() {
        return getPlayer().isAdmin();
    }

    public boolean isMarried() {
        return getPlayer().getMarriageId() > 0;
    }

    public void sendMarriedBefore() {
        EventInstanceManager eim = this.getEventInstance();
        if (eim != null) {
            int ringid1 = Integer.valueOf(eim.getProperty("male"));
            int ringid2 = Integer.valueOf(eim.getProperty("female"));
            this.getPlayer().getMap().broadcastMessage(MaplePacketCreator.sendMarriedBefore(ringid1, ringid2));
        }
    }

    public void nextNodeAction(int mobid, int time) {
        getMap().nextNodeAction(mobid, time);
    }

    public void outputFileError(Throwable throwable) {
        log.error("腳本異常", throwable);
    }

    public void sendRemoveNPC(int npcid) {
        getClient().announce(NPCPacket.removeNPC(npcid));
    }

    public void sendPyramidEnergy(String object, String amount) {
        getPlayer().writeEnergy(object, amount);
    }

    public void spawnPortal() {
        getClient().announce(MaplePacketCreator.onTownPortal(999999999, 999999999, 0, null));
    }

    public void spawnNPCRequestController(int npcid, int x, int y) {
        this.spawnNPCRequestController(npcid, x, y, 0);
    }

    public void spawnNPCRequestController(int npcid, int x, int y, int f) {
        MapleNPC npc;
        npcs.remove(new Pair<>(npcid, client));
        if ((npc = MapleLifeFactory.getNPC(npcid, getMapId())) == null) {
            return;
        }
        npc.setPosition(new Point(x, y));
        npc.setCy(y);
        npc.setRx0(x - 50);
        npc.setRx1(x + 50);
        npc.setF(f);
        npc.setCurrentFh(getMap().getFootholds().findBelow(new Point(x, y)).getId());
        npc.setCustom(true);
        npc.setObjectId(npcid);
        npcs.put(new Pair<>(npcid, client), npc);
        getClient().announce(NPCPacket.spawnNPCRequestController(npc, true));
    }

    public void setNPCSpecialAction(int npcid, String action) {
        if (!npcs.containsKey(new Pair<>(npcid, this.client))) {
            return;
        }
        MapleNPC npc = npcs.get(new Pair<>(npcid, client));
        getClient().announce(NPCPacket.setNPCSpecialAction(npc.getObjectId(), action));
    }

    public void updateNPCSpecialAction(int npcid, int value, int x, int y) {
        if (!npcs.containsKey(new Pair<>(npcid, this.client))) {
            return;
        }
        MapleNPC npc = npcs.get(new Pair<>(npcid, client));
        getClient().announce(NPCPacket.updateNPCSpecialAction(npc.getObjectId(), value, x, y));
    }

    public void getNPCDirectionEffect(int npcid, String data, int value, int x, int y) {
        if (!npcs.containsKey(new Pair<>(npcid, this.client))) {
            return;
        }
        MapleNPC npc = npcs.get(new Pair<>(npcid, client));
        getClient().announce(UIPacket.getDirectionEffectPlayNpc(data, value, x, y, npc.getObjectId()));
    }

    public void removeNPCRequestController(int npcid) {
        if (!npcs.containsKey(new Pair<>(npcid, this.client))) {
            return;
        }
        MapleNPC npc = npcs.get(new Pair<>(npcid, client));
        getClient().announce(NPCPacket.removeNPCController(npc.getObjectId(), false));
        sendRemoveNPC(npc.getObjectId());
        npcs.remove(new Pair<>(npcid, this.client));
    }

    public void enableActions() {
        getClient().sendEnableActions();
    }

    public void spawnReactorOnGroundBelow(int id, int x, int y) {
        getMap().spawnReactorOnGroundBelow(new MapleReactor(MapleReactorFactory.getReactor(id), id), new Point(x, y));
    }

    public void removeNPCController(int npcid) {
        if (!npcs.containsKey(new Pair<>(npcid, this.client))) {
            return;
        }
        MapleNPC npc = npcs.get(new Pair<>(npcid, client));
        getClient().announce(NPCPacket.removeNPCController(npc.getObjectId(), false));
    }

    public void sendESLab() {
        openUI(100);
    }

    public void sendSceneUI() {
        getClient().announce(UIPacket.sendSceneUI());
    }

    public void sendUIWindow(int op, int npc) {
        getClient().announce(UIPacket.sendUIWindow(op, npc));
    }

    public void setDirection(int z) {
        setDirection(z);
    }

    public void showVisitorResult(int type) {
        getClient().announce(MaplePacketCreator.showVisitorResult(type));
    }

    public void showVisitoKillResult(int total) {
        getPlayer().updateVisitorKills(0, total);
    }

    public void showEventMesssage(int type, int dally, String text) {
        getClient().announce(UIPacket.showWeatherEffectNotice(text, type, dally, true));
    }

    public void broadcastWeatherEffectNotice(final String s, final int n, final int n2) {
        WorldBroadcastService.getInstance().broadcastMessage(UIPacket.showWeatherEffectNotice(s, n, n2, true));
    }

    public void showPQEffect(int type, String str, String count) {
        getMap().broadcastMessage(getPlayer(), UIPacket.showPQEffect(type, str, count), true);
    }

    public void showScreenShaking(int mapID, boolean stop) {
        getClient().announce(UIPacket.screenShake(mapID, stop));
    }

    public void showSetAction(String str, String act) {
        getMap().broadcastMessage(getPlayer(), MaplePacketCreator.showFieldValue(str, act), true);
    }

    public void updatePartyOneInfo(int questid, String key, String value) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = partyCharacter.getChr();
                if (player == null) {
                    continue;
                }
                player.updateOneInfo(questid, key, value);
            }
        }
    }

    public void updatePartyInfoQuest(int questid, String data) {
        this.updatePartyInfoQuest(questid, data, true);
    }

    public void updatePartyInfoQuest(int questid, String data, boolean check) {
        if (getParty() != null) {
            for (MaplePartyCharacter partyCharacter : getParty().getMemberList()) {
                MapleCharacter player = partyCharacter.getChr();
                if (player == null || !player.getInfoQuest(30200).isEmpty() && check) {
                    continue;
                }
                player.updateInfoQuest(questid, data);
            }
        }
    }

    /**
     * 儲值函數 - 獲取
     *
     * @param type 1 = 當前儲值金額 2 = 已經消費金額 3 = 總計消費金額 4 = 儲值獎勵
     * @return
     */
    public int getHyPay(int type) {
        return getPlayer().getHyPay(type);
    }

    /**
     * 儲值函數 - 消費, 如需增加請加負號, 如: -100
     *
     * @param pay 1 = 當前儲值金額 2 = 已經消費金額 3 = 總計消費金額 4 = 儲值獎勵
     * @return
     */
    public int addHyPay(int pay) {
        return getPlayer().addHyPay(pay);
    }

    public int addPayUsed(int pay) {
        return getPlayer().addPayUsed(pay);
    }

    public int addPayReward(int pay) {
        return getPlayer().addPayReward(pay);
    }

    /**
     * 儲值函數 - 加減消費獎勵
     *
     * @param pay
     * @return
     */
    public int delPayReward(int pay) {
        return getPlayer().delPayReward(pay);
    }

    /**
     * 製作道具
     *
     * @param id     道具ID
     * @param str    力量
     * @param dex    敏捷
     * @param ints   智力
     * @param luk    幸運
     * @param watk   物攻
     * @param matk   魔攻
     * @param period 時間
     */
    public void makeitem(int id, short str, short dex, short ints, short luk, short watk, short matk, long period) {
        makeitem(id, str, dex, ints, luk, watk, matk, period, 0);
    }

    /**
     * 製作道具
     *
     * @param id     道具ID
     * @param str    力量
     * @param dex    敏捷
     * @param ints   智力
     * @param luk    幸運
     * @param watk   物攻
     * @param matk   魔攻
     * @param period 時間
     * @param state  潛能狀態
     */
    public void makeitem(int id, short str, short dex, short ints, short luk, short watk, short matk, long period, int state) {
        makeitem(id, str, dex, ints, luk, watk, matk, period, state, "");
    }

    /**
     * 製作道具
     *
     * @param id     道具ID
     * @param str    力量
     * @param dex    敏捷
     * @param ints   智力
     * @param luk    幸運
     * @param watk   物攻
     * @param matk   魔攻
     * @param period 時間
     * @param state  潛能狀態
     * @param owner  道具簽名
     */
    public void makeitem(int id, short str, short dex, short ints, short luk, short watk, short matk, long period, int state, String owner) {
        if (!canHold(id) || !ItemConstants.類型.裝備(id)) {
            playerMessage("裝備欄空間不足或添加的道具不是裝備");
            return;
        }

        Equip equip = MapleItemInformationProvider.getInstance().getEquipById(id);
        equip.setStr(str);
        equip.setDex(dex);
        equip.setInt(ints);
        equip.setLuk(luk);
        equip.setPad(watk);
        equip.setMad(matk);
        equip.setExpiration(period);
        equip.setState((byte) state, false);
        if (!owner.isEmpty()) {
            equip.setOwner(owner);
        }
        equip.setGMLog("腳本獲得 " + this.npcID + " (" + this.script + ") 地圖: " + getPlayer().getMapId() + " 時間: " + DateUtil.getNowTime());
        MapleInventoryManipulator.addbyItem(getC(), equip.copy());
    }

    public int isSocketDone(short s2) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Item item = getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(s2);
        if (item != null) {
            Equip equip = (Equip) item;
            if (ii.isCash(equip.getItemId()) || ItemConstants.類型.飾品(equip.getItemId())) {
                return 2;
            }
            if (equip.getSocket1() >= 0 || (equip.getSocketState() & SocketFlag.已打孔01.getValue()) != 0) {
                return 0;
            }
            equip.setSocket1(0);
            getPlayer().forceUpdateItem(equip);
            return 1;
        }
        return -1;
    }

    public void startQuestTimeLimitTask(int n2, int n3) {
        getPlayer().startQuestTimeLimitTask(n2, n3);
    }

    public void setForcedAction(int n2, int n3) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.FORCED_ACTION, null, new int[]{n2, n3}, null));
    }

    public void setDelay(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.DELAY, null, new int[]{n2}, null));
    }

    public void setEffectPlay(String string, int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9, int n10, String str) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.EFFECT_PLAY, string, new int[]{n2, n3, n4, n5, n6, n7, n8, n9, n10}, str));
    }

    public void setForcedInput(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.FORCED_INPUT, null, new int[]{n2}, null));
    }

    public void setPatternInputRequest(String string, int n2, int n3, int n4) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.PARTERN_INPUT_REQUEST, string, new int[]{n2, n3, n4}, null));
    }

    public void setCameraMove(int n2, int n3, int n4, int n5) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.CAMERA_MOVE, null, new int[]{n2, n3, n4, n5}, null));
    }

    public void setCameraOnCharacter(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.CAMERA_ON_CHARACTER, null, new int[]{n2}, null));
    }

    public void setCameraZoom(int n2, int n3, int n4, int n5, int n6) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.CAMERA_ZOOM, null, new int[]{0, n2, n3, n4, n5, n6}, null));
    }

    public void setCameraZoom() {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.CAMERA_ZOOM, null, new int[]{1}, null));
    }

    public void setCameraReleaseFromUserPoint() {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.CAMERA_RELEASE_FROM_USER_POINT, null, null, null));
    }

    public void setVansheeMode(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.VANSHEE_MODE, null, new int[]{n2}, null));
    }

    public void setFaceOff(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.FACE_OFF, null, new int[]{n2}, null));
    }

    public void setMonologue(String string, int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.MONOLOGUE, string, new int[]{n2}, null));
    }

    public void setMonologueScroll(String string, int n2, int n3, int n4, int n5) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.MONOLOGUE_SCROLL, string, new int[]{n2, n3, n4, n5}, null));
    }

    public void setMonologue(String string, boolean n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.MONOLOGUE, string, new int[]{n2 ? 1 : 0}, null));
    }

    public void setMonologueScroll(String string, boolean n2, int n3, int n4, int n5) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.MONOLOGUE_SCROLL, null, new int[]{n2 ? 1 : 0, n3, n4, n5}, null));
    }

    public void setAvatarLookSet(int[] list) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.AVATARLOOK_SET, null, list, null));
    }

    public void removeAdditionalEffect() {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.REMOVE_ADDITIONAL_EFFECT, null, null, null));
    }

    public void setForcedMove(int n2, int n3) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.FORCED_MOVE, null, new int[]{n2, n3}, null));
    }

    public void setForcedFlip(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.FORCED_FLIP, null, new int[]{n2}, null));
    }

    public void setInputUI(int n2) {
        getC().announce(UIPacket.getDirectionEvent(InGameDirectionType.INPUT_UI, null, new int[]{n2}, null));
    }

    public void show5thJobEffect() {
        getC().announce(MaplePacketCreator.environmentChange("Effect/5skill.img/screen", FieldEffectType.TopScreen));
        getC().announce(MaplePacketCreator.environmentChange("Sound/SoundEff.img/5thJobd", FieldEffectType.Sound));
        this.TutInstructionalBalloon("Effect/5skill.img/character_delayed");
    }

    public void setLTime() {
        getPlayer().setLTime();
    }

    public void gainVCraftCore(int n2) {
        getPlayer().gainVCraftCore(n2);
    }

    /**
     * 斗燃消息提示框
     *
     * @param message 消息內容
     * @param second  持續時間, 單位: 秒
     */
    public void showCombustionMessage(String message, int second, int posY) {
        getClient().announce(EffectPacket.showCombustionMessage(message, second * 1000, posY));
    }

    public int getNewInstanceMapId() {
        return EventScriptManager.getNewInstanceMapId();
    }

    public void openMapleUnion() {
        PlayerHandler.openMapleUnionRequest(getPlayer());
    }

    public final MapleUnionRankData getMapleUnionRank() {
        MapleUnionData data = MapleUnionData.getInstance();
        int state = getPlayer().getMapleUnion().getState();
        int level = state / 100;
        int grade = state % 10;
        MapleUnionRankData nowRank = null;
        if (data.getRankInfo().containsKey(level) && data.getRankInfo().get(level).containsKey(grade)) {
            nowRank = data.getRankInfo().get(level).get(grade);
        }
        return nowRank;
    }

    public final MapleUnionRankData getNextMapleUnionRank() {
        MapleUnionData data = MapleUnionData.getInstance();
        int state = getPlayer().getMapleUnion().getState();
        int level = state / 100;
        int grade = state % 10;
        MapleUnionRankData nextRank = null;
        if (data.getRankInfo().containsKey(level) && data.getRankInfo().get(level).containsKey(grade)) {
            if (grade < data.getRankInfo().get(level).size()) {
                nextRank = data.getRankInfo().get(level).get(grade + 1);
            } else if (level < data.getRankInfo().size()) {
                nextRank = data.getRankInfo().get(level + 1).get(1);
            }
        }
        return nextRank;
    }

    public final int getMapleUnionLevel() {
        MapleUnion mu = getPlayer().getMapleUnion();
        if (mu != null) {
            return mu.getLevel();
        }
        return 0;
    }

    public long getExpNeededForLevel(int level) {
        return GameConstants.getExpNeededForLevel(level);
    }

    public boolean gainVCoreSkill(final int vcoreoid) {
        return gainVCoreSkill(vcoreoid, 1);
    }

    public boolean gainVCoreSkill(final int vcoreoid, final int nCount) {
        return getPlayer().gainVCoreSkill(vcoreoid, nCount, false);
    }

    public boolean gainRandVSkill(final int nCoreType, final boolean indieJob, final boolean onlyJob) {
        return getPlayer().gainRandVSkill(nCoreType, indieJob, onlyJob);
    }

    public boolean gainRandVSkill() {
        return gainRandVSkill(Randomizer.isSuccess(20) ? 0 : 1, false, false);
    }

    public void customSqlInsert(String sql, Object... values) {
        SqlTool.update(sql, values);
    }

    public int customSqlUpdate(final String sql, final Object... values) {
        return SqlTool.executeUpdate(sql, values);
    }

    public List<Map<String, Object>> customSqlResult(final String sql, final Object... values) {
        return SqlTool.customSqlResult(sql, values);
    }

    public void setScriptPath(String scriptPath) {
        this.scriptPath = scriptPath;
    }

    public String getScriptPath() {
        return scriptPath;
    }

    public void setPetSN(long petSN) {
        this.petSN = petSN;
    }

    public long getPetSN() {
        return petSN;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getNumber() {
        return number;
    }

    public List<Item> getAllPetItem() {
        final ArrayList<Item> list = new ArrayList<Item>();
        for (Item item : this.getPlayer().getInventory(MapleInventoryType.CASH).getInventory().values()) {
            if (ItemConstants.類型.寵物(item.getItemId())) {
                list.add(item);
            }
        }
        return list;
    }

    public void showScreenEffect(final String s) {
        this.getPlayer().showScreenEffect(s);
    }

    public void showTopScreenEffect(final String s, final int n) {
        getClient().announce(EffectPacket.showScreenEffect(FieldEffectType.TopScreen, s, n));
    }

    public void showScreenDelayedEffect(final String s, final int n) {
        this.getPlayer().showScreenDelayedEffect(s, n);
    }

    public void showScreenAutoLetterBox(final String s, final int n) {
        this.getPlayer().showScreenAutoLetterBox(s, n);
    }

    public void broadcastScreenEffect(final String s) {
        this.broadcastScreenEffect(FieldEffectType.Screen_Delayed, s, 0);
    }

    public void broadcastScreenEffect(final int n, final String s, final int n2) {
        this.getMap().broadcastMessage(EffectPacket.showScreenEffect(n, s, 0));
    }

    public void playFieldSoundMap(final String s) {
        this.getMap().broadcastMessage(EffectPacket.playFieldSound(s, 100));
    }

    public void playFieldSound(final String s, final int val) {
        this.getClient().announce(EffectPacket.playFieldSound(s, val));
    }

    public void playFieldSound(final String s) {
        playFieldSound(s, 100);
    }

    public void playSpineScreen(boolean binary, boolean loop, boolean postRender, int endDelay, String path, String aniamtionName, String str, boolean bool, int val2, int val3, int val4, int val5, String keyName) {
        getClient().announce(EffectPacket.playSpineScreen(binary, loop, postRender, endDelay, path, aniamtionName, str, bool, val2, val3, val4, val5, keyName));
    }

    public void offSpineScreen(String str, int val) {
        getClient().announce(EffectPacket.offSpineScreen(str, val));
    }

    public void playExclSoundWithDownBGM(final String s) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_UserEffectLocal);
        hh.write(EffectOpcode.UserEffect_PlayExclSoundWithDownBGM.getValue());
        hh.writeMapleAsciiString(s);
        hh.writeInt(100);
        getClient().announce(hh.getPacket());
    }

    public void setUserEmotionLocal(final int n, final int n2) {
        getClient().announce(UIPacket.UserEmotionLocal(n, n2));
    }

    public void showBlindEffect(final boolean b) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_UserEffectLocal);
        hh.write(EffectOpcode.UserEffect_BlindEffect.getValue());
        hh.writeBool(b);
        getClient().announce(hh.getPacket());
    }

    public void showSpecialUI(final boolean b, final String s) {
        getClient().announce(UIPacket.ShowSpecialUI(b, s));
    }

    public void showPortalEffect(final String s, final int n) {
        this.getClient().announce(MaplePacketCreator.ShowPortal(s, n));
    }

    public void setInGameCurNodeEventEnd(final boolean inGameCurNode) {
        this.getPlayer().setInGameCurNode(inGameCurNode);
        getClient().announce(UIPacket.inGameCurNodeEventEnd(inGameCurNode));
    }

    public void setStandAloneMode(final boolean b) {
        getClient().announce(UIPacket.SetStandAloneMode(b));
    }

    public void setDirectionMod(final boolean b) {
        getClient().announce(UIPacket.setDirectionMod(b));
    }

    public void setInGameDirectionMode(final boolean b, final boolean b2, final boolean b3, final boolean b4) {
        getClient().announce(UIPacket.SetInGameDirectionMode(b, b2, b3, b4));
    }

    public void showDimensionMirror() {
        List<DimensionMirrorEvent> list = Arrays.stream(DimensionMirrorEvent.values()).filter(it -> it.getMapID() > 0).collect(Collectors.toList());
        getClient().announce(UIPacket.showDimensionMirror(list));
    }

    public String getQuestCustomData(final int questid) {
        final MapleQuest quest = MapleQuest.getInstance(questid);
        String data = null;
        if (quest != null) {
            data = this.getPlayer().getQuestNAdd(quest).getCustomData();
        }
        return data;
    }

    public void updateOneQuestInfo(final int n, final String s, final String s2) {
        this.getPlayer().updateOneInfo(n, s, s2);
    }

    public void updateQuestInfo(final int n, final String s) {
        this.getPlayer().updateInfoQuest(n, s, true);
    }

    public String getQuestInfo(final int n) {
        return this.getPlayer().getInfoQuest(n);
    }

    public String getQuestInfo(final int n, final String s) {
        return this.getPlayer().getOneInfo(n, s);
    }

    public void setUserTimerInfo(int n, int n2, int n3, int n4, int n5) {
        getClient().announce(MaplePacketCreator.LobbyTimeAction(n, n2, n3, n4, n5));
    }

    public final void gainQuestPoint(final int questId, final int value) {
        this.updateOneQuestInfo(questId, "point", String.valueOf(Math.max(0, this.getQuestPoint(questId) + value)));
    }

    public final void gainWorldShareQuestPoint(final int questId, final int value) {
        this.updateWorldShareInfo(questId, "point", String.valueOf(Math.max(0, this.getQuestPoint(questId) + value)));
    }

    public final int getQuestPoint(int questid) {
        if (this.getPlayer() != null) {
            return this.getPlayer().getQuestPoint(questid);
        }
        return -1;
    }

    public void showSystemMessage(String msg) {
        getClient().announce(MaplePacketCreator.showRedNotice(msg));
    }

    public void dropAlertNotice(String msg) {
        getPlayer().dropMessage(1, msg);
    }

    public void setObjectState(String s) {
        getMap().broadcastMessage(MaplePacketCreator.setObjectState(s));
    }

    public void playSoundWithMuteBGM(String wzPath) {
        getClient().announce(EffectPacket.playSoundWithMuteBGM(wzPath));
    }

    public int getReactorStat(final String s) {
        return this.getMap().getReactorStat(s);
    }

    public void showAvatarOriented(final String s) {
        showAvatarOriented(s, false);
    }

    public void showAvatarOriented(final String s, final boolean toOther) {
        getClient().announce(EffectPacket.showAvatarOriented(s));
        if (toOther) {
            getPlayer().getMap().broadcastMessage(getPlayer(), EffectPacket.showAvatarOriented(getPlayer().getId(), s), false);
        }
    }

    public void showAvatarOrientedRepeat(final boolean b, String s) {
        getClient().announce(EffectPacket.showAvatarOrientedRepeat(b, s));
    }

    public int getEventMobSize() {
        return getMap().getEventMobSize();
    }

    public void updateTowerRank(int stage, int time) {
        int world = getPlayer().getWorld();
        int chrId = getPlayer().getId();
        String chrName = getPlayer().getName();
        DatabaseConnection.domain(con -> {
            ResultSet rs = SqlTool.query(con, "SELECT * FROM `zrank_lobby` WHERE `world` = ? AND `characters_id` = ?", world, chrId);
            if (rs.next()) {
                Calendar c = Calendar.getInstance();
                c.set(Calendar.DAY_OF_WEEK, 2);
                c.set(Calendar.HOUR_OF_DAY, 0);
                c.set(Calendar.MINUTE, 0);
                c.set(Calendar.SECOND, 0);
                c.set(Calendar.MILLISECOND, 0);
                SqlTool.update(con, "UPDATE `zrank_lobby` SET `stage` = ?, `time` = ? WHERE `world` = ? AND `characters_id` = ? AND ((`stage` < ? OR (`stage` = ? AND `time` > ?)) OR (`logtime` < ?))", stage, time, world, chrId, stage, stage, time, c.getTime().getTime());
                return null;
            }
            SqlTool.update("INSERT INTO `zrank_lobby` (`world`, `characters_id`, `characters_name`, `stage`, `time`)VALUES (?, ?, ?, ?, ?)", world, chrId, chrName, stage, time);
            return null;
        });
    }

    public void updateWorldShareInfo(final int n, final String s, final String s2) {
        this.getPlayer().updateWorldShareInfo(n, s, s2);
    }

    public void updateWorldShareInfo(final int n, final String s) {
        this.getPlayer().updateWorldShareInfo(n, s);
    }

    public String getWorldShareInfo(final int n) {
        return this.getPlayer().getWorldShareInfo(n);
    }

    public String getWorldShareInfo(final int n, final String s) {
        return this.getPlayer().getWorldShareInfo(n, s);
    }

    public void doneCollection() {
        MobCollectionFactory.doneCollection(this.getPlayer());
    }

    public void registerMobCollection(final int n) {
        MobCollectionFactory.registerMobCollection(this.getPlayer(), n);
    }

    public boolean checkMobCollection(final int n) {
        return MobCollectionFactory.checkMobCollection(this.getPlayer(), n);
    }

    public boolean checkMobComplete(final String s) {
        return MobCollectionFactory.checkMobCollection(this.getPlayer(), s);
    }

    public void handleRandCollection(final int n) {
        MobCollectionFactory.handleRandCollection(this.getPlayer(), n);
    }

    /**
     * 屏幕中上方黃色消息
     *
     * @param msg
     */
    public void showScriptProgressMessage(final String msg) {
        getClient().announce(UIPacket.getTopMsg(msg));
    }

    public void showItemMsg(final int n, final String s) {
        showScriptProgressItemMessage(n, s);
    }

    public void showScriptProgressItemMessage(final int n, final String s) {
        scriptProgressItemMessage(n, s);
    }

    public void scriptProgressItemMessage(final int n, final String s) {
        getClient().announce(UIPacket.ScriptProgressItemMessage(n, s));
    }

    public void setStaticScreenMessage(final int n, final String s, final boolean b) {
        getClient().announce(UIPacket.setStaticScreenMessage(n, s, b));
    }

    public void offStaticScreenMessage() {
        getClient().announce(UIPacket.offStaticScreenMessage());
    }

    public void showProgressMessageFont(String msg, int fontNameType, int fontSize, int fontColorType, int fadeOutDelay) {
        getClient().announce(UIPacket.getSpecialTopMsg(msg, fontNameType, fontSize, fontColorType, fadeOutDelay));
    }

    public final void showBalloonMsg(final String msg, final int width, final int timeout, final Point point) {
        getClient().announce(MaplePacketCreator.sendHint(msg, width, timeout, point));
    }

    /**
     * 發送NPC右下角對話，單位：秒
     *
     * @param npcid 顯示的NPCID, 為0的話 顯示的是玩家自己
     * @param text  文本內容
     * @param time  持續時間
     */
    public void getNpcNotice(int npcid, String text, int time) {
        showPopupSay(npcid, time * 1000, text, "");
    }

    public final void showPopupSay(final int npcid, final int time, final String msg, final String sound) {
        getClient().announce(UIPacket.addPopupSay(npcid, time, msg, sound));
    }

    public void setTicktockCrane() {
        this.getMap().broadcastMessage(EffectPacket.PapulatusFieldEffect());
    }

    public Item getItemBySN(final long n) {
        Item agg = null;
        for (byte b = -1; b <= 5; ++b) {
            final MapleInventory inventory = this.getPlayer().getInventory(b);
            if ((inventory) != null) {
                final Item byLiSN = inventory.findByLiSN(n);
                if (byLiSN != null) {
                    agg = byLiSN;
                }
            }
        }
        return agg;
    }

    public void updateItem(Item petItem) {
        MapleInventoryManipulator.updateItem(getClient(), Collections.singletonList(petItem), false);
    }

    public void setLayerOn(int n, String s, int n2, int n3, int n4, String s2, int n5) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_FieldEffect);
        hh.write(FieldEffectType.OnOffLayer);
        hh.write(0);
        hh.writeInt(n);
        hh.writeMapleAsciiString(s);
        hh.writeInt(n2);
        hh.writeInt(n3);
        hh.writeInt(n4);
        hh.writeMapleAsciiString(s2);
        hh.writeInt(n5);
        hh.write(1);
        hh.writeInt(-1);
        hh.write(0);
        getClient().announce(hh.getPacket());
    }

    public void setLayerMove(int n, String s, int n2, int n3) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_FieldEffect);
        hh.write(FieldEffectType.OnOffLayer);
        hh.write(1);
        hh.writeInt(n);
        hh.writeMapleAsciiString(s);
        hh.writeInt(n2);
        hh.writeInt(n3);
        getClient().announce(hh.getPacket());
    }

    public void setLayerOff(int n, String s) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_FieldEffect);
        hh.write(FieldEffectType.OnOffLayer);
        hh.write(2);
        hh.writeInt(n);
        hh.writeMapleAsciiString(s);
        hh.write(0);
        getClient().announce(hh.getPacket());
    }

    public void setOverlapDetail(int n, int n2, int n3, final boolean b) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_FieldEffect);
        hh.write(FieldEffectType.Overlap_Detail);
        hh.writeInt(n);
        hh.writeInt(n2);
        hh.writeInt(n3);
        hh.writeBool(b);
        getClient().announce(hh.getPacket());
    }

    public void removeOverlapDetail(int n) {
        final MaplePacketLittleEndianWriter hh;
        (hh = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_FieldEffect);
        hh.write(FieldEffectType.Remove_Overlap_Detail);
        hh.writeInt(n);
        getClient().announce(hh.getPacket());
    }

    public void setLayerBlind(final boolean b, final int n, final int n2) {
        getClient().announce(EffectPacket.showBlind(b, n, 0, 0, 0, n2));
    }

    public void setLayerBlindWhite(final boolean b, final int n, final int n2) {
        getClient().announce(EffectPacket.showBlind(b, n, 255, 255, 255, n2));
    }

    public int[] getSetItems(int setId) {
        StructSetItem setItem = MapleItemInformationProvider.getInstance().getSetItem(setId);
        int[] items = new int[setItem.itemIDs.size()];
        for (int i = 0; i < items.length; i++) {
            items[i] = setItem.itemIDs.get(i);
        }
        return items;
    }

    public int[] getForeverBuffs() {
        MapleCharacter chr = getPlayer();
        if (chr == null) {
            return null;
        }
        Map<Integer, Integer> buffs = chr.getForeverBuffs();
        int[] buffsArr = new int[buffs.size()];
        int i = 0;
        for (int skill : buffs.keySet()) {
            buffsArr[i++] = skill;
        }
        return buffsArr;
    }

    public int getForeverBuffLevel(int skillId) {
        MapleCharacter chr = getPlayer();
        if (chr == null) {
            return 0;
        }
        Map<Integer, Integer> buffs = chr.getForeverBuffs();
        if (!buffs.containsKey(skillId)) {
            return 0;
        }
        return buffs.get(skillId);
    }

    public boolean giveForeverBuff(int skillId, int level) {
        MapleCharacter chr = getPlayer();
        Skill sk = SkillFactory.getSkill(skillId);
        if (sk == null || chr == null || level > sk.getMaxLevel()) {
            return false;
        }
        Map<Integer, Integer> buffs = chr.getForeverBuffs();
        if (buffs.containsKey(skillId) && buffs.get(skillId) == level) {
            return false;
        }
        buffs.put(skillId, level);
        chr.updateForeverBuffs(buffs);
        if (getPlayer().getBuffStatValueHolder(skillId) == null) {
            if (sk.getEffect(level) != null) {
                sk.getEffect(level).applyTo(chr, chr, false, null, 2100000000);
            }
        }
        return true;
    }

    public boolean removeForeverBuff(int skillId) {
        MapleCharacter chr = getPlayer();
        Skill sk = SkillFactory.getSkill(skillId);
        if (sk == null || chr == null) {
            return false;
        }
        Map<Integer, Integer> buffs = chr.getForeverBuffs();
        if (!buffs.containsKey(skillId)) {
            return false;
        }
        buffs.remove(skillId);
        chr.updateForeverBuffs(buffs);
        return true;
    }

    public boolean revivePet(int uniqueId, int itemId) {
        Item item = getPlayer().getInventory(MapleInventoryType.CASH).findByLiSN(uniqueId);
        if (item == null) {
            return false;
        }
        if (!ItemConstants.類型.寵物(item.getItemId())) {
            return false;
        }
        if (item.getPet() == null) {
            return false;
        }
        if (MapleItemInformationProvider.getInstance().getLimitedLife(item.getItemId()) != 0) {
            return false;
        }
        if (item.getExpiration() < 0 || item.getExpiration() > System.currentTimeMillis()) {
            return false;
        }
        switch (itemId) {
            case 4070000: // 生命水
            case 5180000: // 生命水
            case 5689000: // 優質生命水
                item.setExpiration(System.currentTimeMillis() + (90 * 24 * 60 * 60 * 1000L));
                break;
            case 5689005: // 高濃縮優質生命水
                item.setExpiration(System.currentTimeMillis() + (270 * 24 * 60 * 60 * 1000L));
                break;
            case 5180003: // 永恆的生命水
                item.setExpiration(-1);
                break;
            default:
                return false;
        }
        getPlayer().forceReAddItem(item);
        return true;
    }

    public List<Item> getDeadPets() {
        List<Item> petList = new LinkedList<>();

        for (final Item item : getPlayer().getInventory(MapleInventoryType.CASH)) {
            if (!ItemConstants.類型.寵物(item.getItemId())) {
                continue;
            }
            if (item.getPet() == null) {
                continue;
            }
            if (MapleItemInformationProvider.getInstance().getLimitedLife(item.getItemId()) != 0) {
                continue;
            }
            if (item.getExpiration() < 0 || item.getExpiration() > System.currentTimeMillis()) {
                continue;
            }
            petList.add(item);
        }
        return petList;
    }

    public void changePlayer() {
        handling.channel.handler.InterServerHandler.ChangePlayer(null, getC());
    }


    public List<Integer> getAllRaffleTypes() {
        return RafflePool.getAllType();
    }

    public boolean checkCreateCharacterName(String name) {
        return MapleCharacterUtil.canCreateChar(name, getPlayer().isIntern());
    }

    public void showMileage() {
        getC().announce(MTSCSPacket.showMileageInfo(getC()));
    }

    public MapleJob getMapleJob() {
        return getMapleJobById(getJobWithSub());
    }

    public int getSkinSlot() {
        return getCombingRoomSlot(1);
    }

    public boolean setSkinSlot(int slot) {
        return setCombingRoomSlot(1, slot);
    }

    public int getFaceSlot() {
        return getCombingRoomSlot(2);
    }

    public boolean setFaceSlot(int slot) {
        return setCombingRoomSlot(2, slot);
    }

    public int getHairSlot() {
        return getCombingRoomSlot(3);
    }

    public boolean setHairSlot(int slot) {
        return setCombingRoomSlot(3, slot);
    }

    public int getCombingRoomSlot(int style) {
        int defaultSlot = style == 1 ? 0 : 3;
        MapleCharacter chr = getPlayer();
        if (chr == null) {
            return defaultSlot;
        }
        List<Pair<Integer, Integer>> slots = chr.getSalon().getOrDefault(style, null);
        if (slots == null) {
            slots = new LinkedList<>();
            for (int i = 0; i < defaultSlot; i++) {
                slots.add(new Pair<>(0, 0));
            }
            chr.getSalon().put(style, slots);
        }

        return slots.size();
    }

    public boolean setCombingRoomSlot(int style, int slot) {
        int maxSlot = style == 1 ? 6 : 102;
        MapleCharacter chr = getPlayer();
        if (slot > maxSlot || chr == null) {
            return false;
        }

        int oldSlot = getCombingRoomSlot(style);
        List<Pair<Integer, Integer>> slots = chr.getSalon().get(style);
        if (slot < oldSlot) {
            for (int i = 0; i < oldSlot - slot; i++) {
                slots.remove(slots.size() - 1);
            }
        } else if (slot > oldSlot) {
            for (int i = 0; i < slot - oldSlot; i++) {
                slots.add(new Pair<>(0, 0));
            }
        }
        chr.send(MaplePacketCreator.encodeUpdateCombingRoomSlotCount(3 - style, 0, slot, slot));
        chr.send(MaplePacketCreator.encodeCombingRoomOldSlotCount(3 - style, 0, oldSlot));
        return true;
    }


    public long getPrice(int type) {
        switch(type) {
            case 0:
                return getPlayer().getMeso();
            case 1:
                return getNX(1);
            case 2:
                return getNX(2);
            case 3:
                return getPlayer().getMileage();
            default:
                return getItemQuantity(type);
        }
    }

    public boolean gainPrice(int type, long amount) {
        if (type == 0) {
            if (amount >= 0 || getPlayer().getMeso() >= -amount) {
                gainMeso(amount);
            } else {
                return false;
            }
        } else if (type == 1) {
            if (amount >= 0 || getNX(1) >= -amount) {
                gainNX(1, (int) amount);
            } else {
                return false;
            }
        } else if (type == 2) {
            if (amount >= 0) {
                gainNX(1, (int) amount);
            } else if (getNX(1) + getNX(2) >= -amount) {
                if (getNX(2) >= -amount) {
                    gainNX(2, (int) amount);
                } else {
                    if (getNX(2) > 0) {
                        amount += getNX(2);
                        gainNX(2, -getNX(2));
                    }
                    gainNX(1, (int) amount);
                }
            } else {
                return false;
            }
        } else if (type == 3) {
            if (amount >= 0 || getPlayer().getMileage() >= -amount) {
                getPlayer().modifyMileage((int) amount);
            } else {
                return false;
            }
        } else if (type >= 1000000) {
            if (amount >= 0 || (type >= 2000000 && haveItem(type, (int) -amount))) {
                gainItem(type, (int) amount);
            } else if (amount < 0 && type < 2000000) {
                List<Short> slots = new LinkedList<>();
                int iv = 0;
                int[] tps = {1, 6};
                for (int tp : tps) {
                    iv = tp;
                    for (Item item : getInventory(tp).listById(type)) {
                        if (item instanceof Equip) {
                            Equip eqp = (Equip) item;
                            if ((eqp.getAttribute() & 0x1400) == 0 && !eqp.isMvpEquip()) {
                                slots.add(item.getPosition());
                            }
                        }
                    }
                    if (slots.size() > 0) {
                        break;
                    }
                }
                if (slots.size() < -amount || iv == 0) {
                    return false;
                }
                int i = 0;
                for (int slot : slots) {
                    removeItem(slot, iv, 1);
                    i++;
                    if (-amount <= i) {
                        break;
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    public String getPayInfoCVS(int amount) {
        if (ServerConfig.MIN_DONATE > amount || amount > 6000) {
            return "※超商代碼繳費捐贈金額必須在 " + ServerConfig.MIN_DONATE + " 以上 6000 以下,閣下輸入的金額不在範圍內,請重新嘗試。";
        }
        return EcpayPayment.getPayInfoCVS(EcpayPayment.genAioCheckOutCVS(getPlayer(), String.valueOf(amount)));
    }

    public String getPayInfoCvv(int amount) {
        if (ServerConfig.MIN_DONATE > amount || amount > 20000) {
            return "※信用卡繳費捐贈金額必須在 " + ServerConfig.MIN_DONATE + " 以上 20000 以下,閣下輸入的金額不在範圍內,請重新嘗試。";
        }
        String var10003 = EcpayPayment.genAioCheckOutCVV(getPlayer(), String.valueOf(amount));
        return "一次性贊助網址:\r\n" + EcpayPayment.getPayInfoCVV(getClient().getAccountName(), var10003);
    }

    public String getPayInfoATM(int amount) {
        if (ServerConfig.MIN_DONATE > amount || amount > 20000) {
            return "※atm轉帳繳費捐贈金額必須在 " + ServerConfig.MIN_DONATE + " 以上 20000 以下,閣下輸入的金額不在範圍內,請重新嘗試。";
        }
        return EcpayPayment.getPayInfoATM(EcpayPayment.genAioCheckOutATM(getPlayer(), String.valueOf(amount), "CHINATRUST"));
    }
}
