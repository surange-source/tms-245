package scripting.event;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import configs.ServerConfig;
import constants.GameConstants;
import constants.enums.BroadcastMessageType;
import constants.enums.UserChatMessageType;
import database.DatabaseConnectionEx;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import org.apache.logging.log4j.Logger;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import packet.UIPacket;
import scripting.CommonActionManager;
import server.Timer.EventTimer;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMapObject;
import server.squad.MapleSquad;
import tools.Randomizer;

import javax.script.Invocable;
import javax.script.ScriptException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ScheduledFuture;

public class EventManager extends CommonActionManager {

    private static final Logger log = EventScriptManager.log;
    private static final int[] eventChannel = new int[2];
    private final Invocable iv;
    private final int channel;
    private final Map<String, EventInstanceManager> instances = new WeakHashMap<>();
    private final Properties props = new Properties();
    private final String name;

    /**
     * @param cserv
     * @param iv
     * @param name
     */
    public EventManager(ChannelServer cserv, Invocable iv, String name) {
        this.iv = iv;
        this.channel = cserv.getChannel();
        this.name = name;
    }

    public void cancel() {
        for (EventInstanceManager eim : instances.values()) {
            eim.dispose();
        }
        try {
            iv.invokeFunction("cancelSchedule", (Object) null);
        } catch (NoSuchMethodException ex) {
        } catch (ScriptException ex) {
            log.error("Event name: " + name + ", method name : cancelSchedule.", ex);
        }
    }

    /**
     * @param methodName
     * @param delay
     * @return
     */
    public ScheduledFuture<?> schedule(final String methodName, long delay) {
        return EventTimer.getInstance().schedule(() -> {
            try {
                iv.invokeFunction(methodName, (Object) null);
            } catch (Exception ex) {
                log.error("Event name: " + name + ", method name : " + methodName + ".", ex);
            }
        }, delay);
    }

    /**
     * @param methodName
     * @param delay
     * @param eim
     * @return
     */
    public ScheduledFuture<?> schedule(final String methodName, long delay, final EventInstanceManager eim) {
        return EventTimer.getInstance().schedule(() -> {
            try {
                iv.invokeFunction(methodName, eim);
            } catch (Exception ex) {
                log.error("Event name: " + name + ", method name : " + methodName + ".", ex);
            }
        }, delay);
    }

    public ScheduledFuture<?> schedule(final Runnable task, long delay) {
        return EventTimer.getInstance().schedule(task, delay);
    }

    /**
     * @param methodName
     * @param timestamp
     * @return
     */
    public ScheduledFuture<?> scheduleAtTimestamp(final String methodName, long timestamp) {
        return EventTimer.getInstance().scheduleAtTimestamp(() -> {
            try {
                iv.invokeFunction(methodName, (Object) null);
            } catch (Exception ex) {
                log.error("Event name: " + name + ", method name : " + methodName + ".", ex);
            }
        }, timestamp);
    }

    public ScheduledFuture<?> register(final String methodName, final long timestamp) {
        return EventTimer.getInstance().register(() -> {
            try {
                iv.invokeFunction(methodName, (Object) null);
            } catch (Exception ex) {
                log.error("Event name: " + name + ", method name : " + methodName + ".", ex);
            }
        }, timestamp);
    }

    public void start(String function, Object obj) {
        try {
            iv.invokeFunction(function, obj);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : start.", ex);
        }
    }

    /**
     * @return
     */
    public int getChannel() {
        return channel;
    }

    /**
     * @return
     */
    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    /**
     * @param name
     * @return
     */
    public EventInstanceManager getInstance(String name) {
        return instances.get(name);
    }

    /**
     * @return
     */
    public Collection<EventInstanceManager> getInstances() {
        return Collections.unmodifiableCollection(instances.values());
    }

    /**
     * @param name
     * @return
     */
    public EventInstanceManager newInstance(String name) {
        EventInstanceManager ret = new EventInstanceManager(this, name, channel);
        instances.put(name, ret);
        return ret;
    }

    /**
     * @param name
     */
    public void disposeInstance(String name) {
        instances.remove(name);
        if (getProperty("state") != null && instances.isEmpty()) {
            setProperty("state", "0");
        }
        if (getProperty("leader") != null && instances.isEmpty() && getProperty("leader").equals("false")) {
            setProperty("leader", "true");
        }
        if (this.name.equals("CWKPQ")) { //hard code it because i said so
            MapleSquad squad = ChannelServer.getInstance(channel).getMapleSquad("CWKPQ");//so fkin hacky
            if (squad != null) {
                squad.clear();
                squad.copy();
            }
        }
    }

    /**
     * @return
     */
    public Invocable getIv() {
        return iv;
    }

    /**
     * @param key
     * @param value
     */
    public void setProperty(String key, String value) {
        props.setProperty(key, value);
    }

    /**
     * @param key
     * @return
     */
    public String getProperty(String key) {
        return props.getProperty(key);
    }

    /**
     * @return
     */
    public final Properties getProperties() {
        return props;
    }

    public final void setObjectProperty(final Object obj1, final Object obj2) {
        props.put(obj1, obj2);
    }

    public final Object getObjectProperty(final Object obj) {
        return props.get(obj);
    }

    /**
     * @return
     */
    public String getName() {
        return name;
    }

    public void startInstance() {
        try {
            iv.invokeFunction("setup", (Object) null);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup.", ex);
        }
    }

    /**
     * @param mapid
     * @param chr
     */
    public void startInstance_Solo(int mapid, MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", chr.getId(), mapid);
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerPlayer(chr);
        } catch (NoSuchMethodException ex) {
            try {
                EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", mapid);
                if (getProperty("practice") != null) {
                    eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
                }
                eim.registerPlayer(chr);
            } catch (Exception e) {
                log.error("Event name : " + name + ", method Name : setup.", e);
            }
        } catch (ScriptException ex) {
            log.error("Event name : " + name + ", method Name : setup.", ex);
        }
    }

    /**
     * @param mapid
     * @param chr
     */
    public void startInstance(int mapid, MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", chr.getId(), mapid);
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
        } catch (NoSuchMethodException ex) {
            try {
                EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", mapid);
                if (getProperty("practice") != null) {
                    eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
                }
            } catch (Exception e) {
                log.error("Event name : " + name + ", method Name : setup.", e);
            }
        } catch (ScriptException ex) {
            log.error("Event name : " + name + ", method Name : setup.", ex);
        }
    }

    /**
     * @param mapid
     * @param chr
     */
    public void startInstance_Party(int mapid, MapleCharacter chr) {
        try {
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", mapid);
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerParty(chr.getParty(), chr.getMap());
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup.", ex);
        }
    }

    public void startInstance_Party(int value, MapleCharacter player, int averageLevel) {
        try {
            int totalLevel = 0;
            int memberSize = 0;
            for (MaplePartyCharacter member : player.getParty().getMemberList()) {
                if (member.isOnline() && member.getMapid() == player.getMap().getId() && member.getChannel() == player.getMap().getChannel()) {
                    totalLevel += member.getLevel();
                    ++memberSize;
                }
            }
            if (memberSize <= 0) {
                return;
            }
            EventInstanceManager eim = (EventInstanceManager) iv.invokeFunction("setup", value, Math.min(averageLevel, (totalLevel /= memberSize) <= 0 ? (int) player.getLevel() : totalLevel));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerParty(player.getParty(), player.getMap());
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup.", ex);
        }
    }

    //GPQ
    /**
     * @param character
     * @param leader
     */
    public void startInstance(MapleCharacter character, String leader) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", (Object) null));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerPlayer(character);
            eim.setProperty("leader", leader);
            eim.setProperty("guildid", String.valueOf(character.getGuildId()));
            setProperty("guildid", String.valueOf(character.getGuildId()));
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-Guild.", ex);
        }
    }

    /**
     * @param character
     */
    public void startInstance_CharID(MapleCharacter character) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", character.getId()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerPlayer(character);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-CharID.", ex);
        }
    }

    /**
     * @param character
     */
    public void startInstance_CharMapID(MapleCharacter character) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", character.getId(), character.getMapId()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerPlayer(character);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-CharID.", ex);
        }
    }

    /**
     * @param character
     */
    public void startInstance(MapleCharacter character) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", character.getId()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerPlayer(character);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-character.", ex);
        }
    }

    //PQ method: starts a PQ
    /**
     * @param party
     * @param map
     */
    public void startInstance(MapleParty party, MapleMap map) {
        startInstance(party, map, ServerConfig.CHANNEL_PLAYER_MAXLEVEL);
    }

    /**
     * @param party
     * @param map
     * @param maxLevel
     */
    public void startInstance(MapleParty party, MapleMap map, int maxLevel) {
        startInstance(party, map, maxLevel, 0);
    }

    /**
     * @param party
     * @param map
     * @param maxLevel
     */
    public void startInstance(MapleParty party, MapleMap map, int maxLevel, int questID) {
        try {
            int averageLevel = 0, size = 0;
            for (MaplePartyCharacter mpc : party.getMemberList()) {
                if (mpc.isOnline() && mpc.getMapid() == map.getId() && mpc.getChannel() == map.getChannel()) {
                    averageLevel += mpc.getLevel();
                    size++;
                }
            }
            if (size <= 0) {
                return;
            }
            averageLevel /= size;
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", Math.min(maxLevel, averageLevel), party.getPartyId()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerParty(party, map, questID);
        } catch (ScriptException ex) {
            log.error("Event name : " + name + ", method Name : setup-partyid.", ex);
        } catch (Exception ex) {
            //ignore
            startInstance_NoID(party, map, ex);
        }
    }

    /**
     * @param party
     * @param map
     */
    public void startInstance_NoID(MapleParty party, MapleMap map) {
        startInstance_NoID(party, map, null);
    }

    /**
     * @param party
     * @param map
     * @param old
     */
    public void startInstance_NoID(MapleParty party, MapleMap map, Exception old) {
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", (Object) null));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerParty(party, map);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-party.", ex);
        }
    }

    //non-PQ method for starting instance
    /**
     * @param eim
     * @param leader
     */
    public void startInstance(EventInstanceManager eim, String leader) {
        try {
            iv.invokeFunction("setup", eim);
            eim.setProperty("leader", leader);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-leader.", ex);
        }
    }

    /**
     * @param squad
     * @param map
     */
    public void startInstance(MapleSquad squad, MapleMap map) {
        startInstance(squad, map, -1);
    }

    /**
     * @param squad
     * @param map
     * @param questID
     */
    public void startInstance(MapleSquad squad, MapleMap map, int questID) {
        if (squad.getStatus() == 0) {
            return; //we dont like cleared squads
        }
        if (!squad.getLeader().isGm()) {
            checkSquad(squad, map);
        }
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", squad.getLeaderName()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerSquad(squad, map, questID);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-squad.", ex);
        }
    }

    private void checkSquad(MapleSquad squad, MapleMap map) {
        int mapid = map.getId();
        int chrSize = 0;
        for (String chr : squad.getMembers()) {
            MapleCharacter player = squad.getChar(chr);
            if (player != null && player.getMapId() == mapid) {
                chrSize++;
            }
        }
        if (chrSize < squad.getType().i) {
            squad.getLeader().dropMessage(5, "遠征隊中人員少於 " + squad.getType().i + " 人，無法開始遠征任務。注意必須隊伍中的角色在線且在同一地圖。當前人數: " + chrSize);
            return;
        }
        if (name.equals("CWKPQ") && squad.getJobs().size() < 5) {
            squad.getLeader().dropMessage(5, "遠征隊中成員職業的類型小於5種，無法開始遠征任務。");
        }
    }

    /*
     * 另外的1種記錄方式
     * 默認檢測遠征隊人數
     */
    /**
     * @param squad
     * @param map
     * @param bossid
     */
    public void startInstance(MapleSquad squad, MapleMap map, String bossid) {
        startInstance(squad, map, bossid, true);
    }

    /*
     * 是否檢測遠征隊人數
     */
    /**
     * @param squad
     * @param map
     * @param bossid
     * @param checkSize
     */
    public void startInstance(MapleSquad squad, MapleMap map, String bossid, boolean checkSize) {
        if (squad.getStatus() == 0) {
            return; //we dont like cleared squads
        }
        if (!squad.getLeader().isGm() && checkSize) {
            checkSquad(squad, map);
        }
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", squad.getLeaderName()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerSquad(squad, map, bossid);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-squad.", ex);
        }
    }

    /*
     * 檢測遠征隊腳本指定的人數
     */
    /**
     * @param squad
     * @param map
     * @param bossid
     * @param memberSize
     */
    public void startInstance(MapleSquad squad, MapleMap map, String bossid, int memberSize) {
        if (squad.getStatus() == 0) {
            return; //we dont like cleared squads
        }
        if (!squad.getLeader().isGm()) {
            int mapid = map.getId();
            int chrSize = 0;
            for (String chr : squad.getMembers()) {
                MapleCharacter player = squad.getChar(chr);
                if (player != null && player.getMapId() == mapid) {
                    chrSize++;
                }
            }
            if (chrSize < memberSize) { //less than 3
                squad.getLeader().dropMessage(5, "遠征隊中人員少於 " + memberSize + " 人，無法開始遠征任務。注意必須隊伍中的角色在線且在同一地圖。當前人數: " + chrSize);
                return;
            }
        }
        try {
            EventInstanceManager eim = (EventInstanceManager) (iv.invokeFunction("setup", squad.getLeaderName()));
            if (getProperty("practice") != null) {
                eim.setPractice(Boolean.parseBoolean(getProperty("practice")));
            }
            eim.registerSquad(squad, map, bossid);
        } catch (Exception ex) {
            log.error("Event name : " + name + ", method Name : setup-squad.", ex);
        }
    }

    /**
     * @param from
     * @param to
     */
    public void warpAllPlayer(int from, int to) {
        if (getMapFactory() != null) {
            MapleMap tomap = getMapFactory().getMap(to);
            MapleMap frommap = getMapFactory().getMap(from);
            if (tomap != null && frommap != null) {
                List<MapleCharacter> list = frommap.getCharacters();
                if (list != null && frommap.getCharactersSize() > 0) {
                    for (MapleMapObject mmo : list) {
                        ((MapleCharacter) mmo).changeMap(tomap, tomap.getPortal(0));
                    }
                }
            }
        }
    }

    /**
     * @return
     */
    public MapleMapFactory getMapFactory() {
        return getChannelServer().getMapFactory();
    }

    public MapleMap getMapFactoryMap(int mapid) {
        return getChannelServer().getMapFactory().getMap(mapid);
    }


    /**
     * @param mapid
     * @param effect
     */
    public void broadcastShip(int mapid, int effect) {
        getMapFactory().getMap(mapid).broadcastMessage(MaplePacketCreator.boatPacket(effect));
    }

    public void sendBatShipEffect(int mapid, int effect) {
        broadcastShip(mapid, effect);
    }

    /**
     * @param msg
     */
    public void broadcastYellowMsg(String msg) {
        getChannelServer().broadcastPacket(MaplePacketCreator.yellowChat(msg));
    }

    /**
     * @param msg
     */
    public void broadcastServerMsg(String msg) {
        getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(6, msg));
    }

    /**
     * @param type
     * @param msg
     * @param weather
     */
    public void broadcastServerMsg(int type, String msg, boolean weather) {
        if (!weather) {
            getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(type, msg));
        } else {
            for (MapleMap load : getMapFactory().getAllMaps()) {
                if (load.getCharactersSize() > 0) {
                    load.startMapEffect(msg, type);
                }
            }
        }
    }

    public void worldSpouseMessage(int type, String message) {
        UserChatMessageType cType = UserChatMessageType.getByType(type);
        if (cType != null) {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.spouseMessage(cType, message));
        } else {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(BroadcastMessageType.NOTICE_WITHOUT_PREFIX, message));
        }
    }

    public void sendEventMsg(MapleClient c, String msg, int type, int delay, boolean b) {
        c.announce(UIPacket.showWeatherEffectNotice(msg, type, delay, b));
    }

    public void broadcastEventMsg(int type, String text) {
        getChannelServer().broadcastPacket(UIPacket.showWeatherEffectNotice(text, type, 5000, true));
    }

    public void setWorldEvent() {
        for (int i = 0; i < eventChannel.length; i++) {
            eventChannel[i] = Randomizer.nextInt(ChannelServer.getAllInstances().size() - 4) + 2 + i; //2-13
        }
    }

    public boolean scheduleRandomEvent() {
        boolean bl2 = false;
        for (int anEventChannel : eventChannel) {
            bl2 |= this.scheduleRandomEventInChannel(anEventChannel);
        }
        return bl2;
    }

    public boolean scheduleRandomEventInChannel(int chz) {
        ChannelServer channelServer = getChannelServer();
        if (channelServer == null || channelServer.getEvent() > -1) {
            return false;
        }
        MapleEventType type = null;
        block0:
        while (type == null) {
            for (MapleEventType subtype : MapleEventType.values()) {
                if (Randomizer.nextInt(MapleEventType.values().length) != 0 || subtype == MapleEventType.OxQuiz) {
                    continue;
                }
                type = subtype;
                continue block0;
            }
        }
        String string = MapleEvent.scheduleEvent(type, channelServer);
        if (string.length() > 0) {
            this.broadcastYellowMsg(string);
            return false;
        }
        EventTimer.getInstance().schedule(() -> {
            if (channelServer.getEvent() >= 0) {
                MapleEvent.setEvent(channelServer, true);
            }
        }, 180000);
        return true;
    }

    public void setEventStart() {
        MapleEvent.setEvent(getChannelServer(), true);
    }

    public void setEvent(String event) {
        String string2 = MapleEvent.scheduleEvent(MapleEventType.getByString(event), this.getChannelServer());
        if (string2.length() > 0) {
            this.broadcastYellowMsg(string2);
        }
    }

    /**
     * @param start
     */
    public void DoubleRateEvent(boolean start) {
        getChannelServer().setDoubleExp(start ? 2 : 1);
    }

    public byte[] showEffect(String effect) {
        return MaplePacketCreator.showEffect(effect);
    }

    public byte[] playSound(String sound) {
        return MaplePacketCreator.playSound(sound);
    }

    public byte[] getClock(int time) {
        return MaplePacketCreator.getClock(time);
    }

    public void showCombustionMessage(MapleClient c, String message, int second, int posY) {
        c.announce(EffectPacket.showCombustionMessage(message, second * 1000, posY));
    }
}
