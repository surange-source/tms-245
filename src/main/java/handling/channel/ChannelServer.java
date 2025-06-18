package handling.channel;

import client.MapleCharacter;
import configs.ServerConfig;
import handling.ServerType;
import handling.channel.handler.HiredFisherStorage;
import handling.login.LoginServer;
import handling.netty.ServerConnection;
import handling.world.CheaterData;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.MaplePacketCreator;
import scripting.event.EventScriptManager;
import server.events.*;
import server.life.PlayerNPC;
import server.maps.AramiaFireWorks;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.market.MarketEngine;
import server.shops.HiredFisher;
import server.shops.HiredMerchant;
import server.squad.MapleSquad;
import server.squad.MapleSquadType;
import tools.ConcurrentEnumMap;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

public class ChannelServer {

    private static final Logger log = LogManager.getLogger(ChannelServer.class);
    private static final short port_default = 7575;
    private static final Map<Integer, ChannelServer> instances = new HashMap<>();
    public static long serverStartTime;
    private final MapleMapFactory mapFactory;
    private final Map<MapleEventType, MapleEvent> events = new EnumMap<>(MapleEventType.class);
    private final int channel;
    private final int flags = 0;
    private final MarketEngine me = new MarketEngine();
    private final AramiaFireWorks works = new AramiaFireWorks();
    private final Map<MapleSquadType, MapleSquad> mapleSquads = new ConcurrentEnumMap<>(MapleSquadType.class);
    private final List<PlayerNPC> playerNPCs = new LinkedList<>();
    private ServerConnection init;
    private int doubleExp = 1;
    private short port;
    private volatile boolean shutdown = false, finishedShutdown = false, MegaphoneMuteState = false;
    private PlayerStorage players;
    private MerchantStorage merchants;
    private HiredFisherStorage fishers;
    private EventScriptManager eventSM;
    private int eventmap = -1;
    private AtomicInteger runningIdx = new AtomicInteger(0);
    private static final ExecutorService saveExecutor = Executors.newSingleThreadExecutor();

    public enum ChannelType {

        普通(0x01),
        混沌(0x02),
        變態(0x04),
        MVP銅牌(0x08),
        MVP銀牌(0x10),
        MVP金牌(0x20),
        MVP鑽石(0x40),
        MVP紅鑽(0x80);
        private int type;

        ChannelType(int type) {
            this.type = type;
        }

        public int getType() {
            return type;
        }

        public ChannelType getByType(int type) {
            for (ChannelType ct : values()) {
                if (ct.getType() == type) {
                    return ct;
                }
            }
            return 普通;
        }

        public boolean check(int type) {
            return (type & getType()) != 0;
        }
    }

    private ChannelServer(int channel) {
        this.channel = channel;
        mapFactory = new MapleMapFactory(channel);
    }

    public static Set<Integer> getAllInstance() {
        return new HashSet<>(instances.keySet());
    }

    public static ChannelServer newInstance(int channel) {
        return new ChannelServer(channel);
    }

    public static ChannelServer getInstance(int channel) {
        return instances.get(channel);
    }

    public static ArrayList<ChannelServer> getAllInstances() {
        return new ArrayList<>(instances.values());
    }

    public static void startChannel_Main() {
        serverStartTime = System.currentTimeMillis();
        int ch = Math.min(ServerConfig.CHANNEL_PORTS, 40);
        for (int i = 1; i <= ch; i++) {
            newInstance(i).run_startup_configurations();
        }
    }

    public static Set<Integer> getChannelServer() {
        return new HashSet<>(instances.keySet());
    }

    public static int getChannelCount() {
        return instances.size();
    }

    public static Map<Integer, Integer> getChannelLoad() {
        Map<Integer, Integer> ret = new HashMap<>();
        for (ChannelServer cs : instances.values()) {
            ret.put(cs.getChannel(), cs.getConnectedClients());
        }
        return ret;
    }

    /**
     * 通過角色ID在所有頻道中查找角色 @返回 角色
     */
    public static MapleCharacter getCharacterById(int id) {
        for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterById(id);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    /**
     * 通過角色名字在所有頻道中查找角色 @返回 角色
     */
    public static MapleCharacter getCharacterByName(String name) {
        for (ChannelServer cserv_ : ChannelServer.getAllInstances()) {
            MapleCharacter ret = cserv_.getPlayerStorage().getCharacterByName(name);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    public static int getPort_default() {
        String property = System.getProperty("channel.defaultPort");
        if (property != null) {
            try {
                return Integer.parseInt(property);
            } catch (Exception e) {

            }
        }
        return port_default;
    }

    public void loadEvents() {
        if (!events.isEmpty()) {
            return;
        }
        events.put(MapleEventType.CokePlay, new MapleCoconut(channel, MapleEventType.CokePlay)); //yep, coconut. same shit
        events.put(MapleEventType.Coconut, new MapleCoconut(channel, MapleEventType.Coconut));
        events.put(MapleEventType.Fitness, new MapleFitness(channel, MapleEventType.Fitness));
        events.put(MapleEventType.OlaOla, new MapleOla(channel, MapleEventType.OlaOla));
        events.put(MapleEventType.OxQuiz, new MapleOxQuiz(channel, MapleEventType.OxQuiz));
        events.put(MapleEventType.Snowball, new MapleSnowball(channel, MapleEventType.Snowball));
        events.put(MapleEventType.Survival, new MapleSurvival(channel, MapleEventType.Survival));
    }

    public MapleEvent getEvent(MapleEventType t) {
        return events.get(t);
    }

    public void run_startup_configurations() {
        setChannel(channel); //instances.put
        try {
            players = new PlayerStorage(channel);
            merchants = new MerchantStorage(channel);
            fishers = new HiredFisherStorage(channel);
            eventSM = new EventScriptManager(this, ServerConfig.CHANNEL_EVENTS.split(","));
            port = Short.parseShort(System.getProperty("channel.port" + channel, String.valueOf(getPort_default() + channel - 1)));
            init = new ServerConnection(port, 0, channel, ServerType.ChannelServer);
            init.run();
            log.info("頻道: " + channel + " 監聽連接埠: " + port);
            eventSM.init();
            loadEvents();
        } catch (Exception e) {
            throw new RuntimeException("綁定連接埠: " + port + " 失敗 (ch: " + getChannel() + ")", e);
        }
    }

    public void shutdown() {
        if (finishedShutdown) {
            return;
        }
//        broadcastPacket(MaplePacketCreator.serverNotice(0, "伺服器即將關閉維護"));

        // dc all clients by hand so we get sessionClosed...
        shutdown = true;

        log.info("頻道 " + channel + " 正在儲存地圖訊息");

        for (MapleMap map : mapFactory.getAllMaps()) {
            map.saveBreakTimeFieldStep();
        }

        log.info("頻道 " + channel + " 正在清理事件腳本");

        eventSM.cancel();

        log.info("頻道 " + channel + " 解除綁定連接埠");

        init.close();

        instances.remove(channel);
        setFinishShutdown();
    }

    public int getChannel() {
        return channel;
    }

    public void setChannel(int channel) {
        instances.put(channel, this);
        LoginServer.addChannel(channel);
    }

    public MapleMapFactory getMapFactory() {
        return mapFactory;
    }

    public void addPlayer(MapleCharacter chr) {
        getPlayerStorage().registerPlayer(chr);
    }

    public PlayerStorage getPlayerStorage() {
        if (players == null) {
            players = new PlayerStorage(channel);
        }
        return players;
    }

    public void removePlayer(MapleCharacter chr) {
        removePlayer(chr.getId());
    }

    public void removePlayer(int idz) {
        getPlayerStorage().deregisterPlayer(idz);
    }

    public String getServerMessage() {
        return ServerConfig.LOGIN_SERVERMESSAGE;
    }

    public void setServerMessage(String newMessage) {
        broadcastPacket(MaplePacketCreator.serverMessage(newMessage));
    }

    public void broadcastPacket(byte[] data) {
        getPlayerStorage().broadcastPacket(data);
    }

    public void broadcastSmegaPacket(byte[] data) {
        getPlayerStorage().broadcastSmegaPacket(data);
    }

    public void broadcastGMPacket(byte[] data) {
        getPlayerStorage().broadcastGMPacket(data);
    }

    public boolean isShutdown() {
        return shutdown;
    }

    public int getLoadedMaps() {
        return mapFactory.getLoadedMaps();
    }

    public EventScriptManager getEventSM() {
        return eventSM;
    }

    public void reloadEvents() {
        eventSM.cancel();
        eventSM = new EventScriptManager(this, ServerConfig.CHANNEL_EVENTS.split(","));
        eventSM.init();
    }

    /**
     * 根據事件名稱重載事件
     * 其他事件不會受到影響
     *
     * @param eventName 事件名稱
     * @see EventScriptManager#reload(String)
     */
    public void reloadEvent(String eventName) {
        eventSM.reload(eventName);
    }

    /**
     * 基礎經驗倍率
     */
    public int getBaseExpRate() {
        return ServerConfig.CHANNEL_RATE_BASEEXP;
    }

    /**
     * 遊戲經驗倍率
     */
    public int getExpRate() {
        return ServerConfig.CHANNEL_RATE_EXP;
    }

    public void setExpRate(int rate) {
        ServerConfig.CHANNEL_RATE_EXP = rate;
    }

    /**
     * 遊戲楓幣爆率
     */
    public int getMesoRate() {
        return ServerConfig.CHANNEL_RATE_MESO;
    }

    public void setMesoRate(int rate) {
        ServerConfig.CHANNEL_RATE_MESO = rate;
    }

    /**
     * 遊戲裝備爆率
     */
    public int getDropRate() {
        return ServerConfig.CHANNEL_RATE_DROP;
    }

    public void setDropRate(int rate) {
        ServerConfig.CHANNEL_RATE_DROP = rate;
    }

    /**
     * 特殊數據庫道具的爆率
     */
    public int getDropgRate() {
        return ServerConfig.CHANNEL_RATE_GLOBALDROP;
    }

    public void setDropgRate(int rate) {
        ServerConfig.CHANNEL_RATE_GLOBALDROP = rate;
    }

    /**
     * 雙倍經驗活動
     */
    public int getDoubleExp() {
        if (doubleExp < 0 || doubleExp > 2) {
            return 1;
        } else {
            return doubleExp;
        }
    }

    public void setDoubleExp(int doubleExp) {
        if (doubleExp < 0 || doubleExp > 2) {
            this.doubleExp = 1;
        } else {
            this.doubleExp = doubleExp;
        }
    }

    public Map<MapleSquadType, MapleSquad> getAllSquads() {
        return Collections.unmodifiableMap(mapleSquads);
    }

    public MapleSquad getMapleSquad(String type) {
        return getMapleSquad(MapleSquadType.valueOf(type.toLowerCase()));
    }

    public MapleSquad getMapleSquad(MapleSquadType type) {
        return mapleSquads.get(type);
    }

    public boolean addMapleSquad(MapleSquad squad, String type) {
        MapleSquadType types = MapleSquadType.valueOf(type.toLowerCase());
        if (types != null && !mapleSquads.containsKey(types)) {
            mapleSquads.put(types, squad);
            squad.scheduleRemoval();
            return true;
        }
        return false;
    }

    public boolean removeMapleSquad(MapleSquadType types) {
        if (types != null && mapleSquads.containsKey(types)) {
            mapleSquads.remove(types);
            return true;
        }
        return false;
    }

    /**
     * 關閉所有僱傭商店
     */
    public void closeAllMerchants() {
        merchants.closeAllMerchants();
    }

    /**
     * 添加僱傭商店
     */
    public int addMerchant(HiredMerchant hMerchant) {
        return merchants.addMerchant(hMerchant);
    }

    /**
     * 刪除僱傭商店
     */
    public void removeMerchant(HiredMerchant hMerchant) {
        merchants.removeMerchant(hMerchant);
    }

    /**
     * 檢測賬號是否開過僱傭商店
     */
    public boolean containsMerchant(int accId) {
        return merchants.containsMerchant(accId);
    }

    /**
     * 檢測賬號下的玩家是否開過僱傭商店
     */
    public boolean containsMerchant(int accId, int chrId) {
        return merchants.containsMerchant(accId, chrId);
    }

    public List<HiredMerchant> searchMerchant(int itemSearch) {
        return merchants.searchMerchant(itemSearch);
    }

    /**
     * 獲取賬號下的玩家的僱傭商店信息 返回 僱傭商店
     */
    public HiredMerchant getHiredMerchants(int accId, int chrId) {
        return merchants.getHiredMerchants(accId, chrId);
    }

    public void closeAllFisher() {
        fishers.closeAllFisher();
    }

    public int addFisher(HiredFisher hiredFisher) {
        return fishers.addFisher(hiredFisher);
    }

    public void removeFisher(HiredFisher hiredFisher) {
        fishers.removeFisher(hiredFisher);
    }

    public boolean containsFisher(int accId, int chrId) {
        return fishers.containsFisher(accId, chrId);
    }

    public HiredFisher getHiredFisher(int accId, int chrId) {
        return fishers.getHiredFisher(accId, chrId);
    }

    public void toggleMegaphoneMuteState() {
        this.MegaphoneMuteState = !this.MegaphoneMuteState;
    }

    public boolean getMegaphoneMuteState() {
        return MegaphoneMuteState;
    }

    public int getEvent() {
        return eventmap;
    }

    public void setEvent(int ze) {
        this.eventmap = ze;
    }

    public Collection<PlayerNPC> getAllPlayerNPC() {
        return playerNPCs;
    }

    public void addPlayerNPC(PlayerNPC npc) {
        if (playerNPCs.contains(npc)) {
            return;
        }
        playerNPCs.add(npc);
        getMapFactory().getMap(npc.getMapId()).addMapObject(npc);
    }

    public void removePlayerNPC(PlayerNPC npc) {
        if (playerNPCs.contains(npc)) {
            playerNPCs.remove(npc);
            getMapFactory().getMap(npc.getMapId()).removeMapObject(npc);
        }
    }

    public String getServerName() {
        return ServerConfig.LOGIN_SERVERNAME;
    }

    public void setServerName(String sn) {
        ServerConfig.LOGIN_SERVERNAME = sn;
    }

    public String getTrueServerName() {
        return ServerConfig.LOGIN_SERVERNAME.substring(0, ServerConfig.LOGIN_SERVERNAME.length() - 3);
    }

    public int getPort() {
        return port;
    }

    public void setShutdown() {
        this.shutdown = true;
        log.info("頻道 " + channel + " 正在關閉和儲存僱傭商店數據訊息...");
    }

    public void setFinishShutdown() {
        this.finishedShutdown = true;
        log.info("頻道 " + channel + " 已關閉完成.");
    }

    public boolean hasFinishedShutdown() {
        return finishedShutdown;
    }

    public int getTempFlag() {
        return flags;
    }

    public int getConnectedClients() {
        return getPlayerStorage().getConnectedClients();
    }

    public List<CheaterData> getCheaters() {
        List<CheaterData> cheaters = getPlayerStorage().getCheaters();
        Collections.sort(cheaters);
        return cheaters;
    }

    public List<CheaterData> getReports() {
        List<CheaterData> cheaters = getPlayerStorage().getReports();
        Collections.sort(cheaters);
        return cheaters;
    }

    public void broadcastMessage(byte[] message) {
        broadcastPacket(message);
    }

    public void broadcastSmega(byte[] message) {
        broadcastSmegaPacket(message);
    }

    public void broadcastGMMessage(byte[] message) {
        broadcastGMPacket(message);
    }

    public void broadcastMapAreaMessage(int area, byte[] message) {
        for (MapleMap load : getMapFactory().getAllMaps()) {
            if (load.getId() / 10000000 == area && load.getCharactersSize() > 0) {
                load.broadcastMessage(message);
            }
        }
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, 10);
    }

    public void startMapEffect(String msg, int itemId, int time) {
        for (MapleMap load : getMapFactory().getAllMaps()) {
            if (load.getCharactersSize() > 0) {
                load.startMapEffect(msg, itemId, time);
            }
        }
    }

    public AramiaFireWorks getFireWorks() {
        return works;
    }

    public boolean isConnected(String name) {
        return getPlayerStorage().getCharacterByName(name) != null;
    }

    public MarketEngine getMarket() {
        return me;
    }

    public int getSessionIdx() {
        return runningIdx.getAndIncrement();
    }

    public static ExecutorService getSaveExecutor() {
        return saveExecutor;
    }

    public ChannelType getChannelType() {
        String[] chList = new String[]{
                ServerConfig.CHANNEL_CHAOS_CH,
                ServerConfig.CHANNEL_ABNORMAL_CH,
                ServerConfig.MVP_CHANNEL_BRONZE,
                ServerConfig.MVP_CHANNEL_SILVER,
                ServerConfig.MVP_CHANNEL_GOLD,
                ServerConfig.MVP_CHANNEL_DIAMOND,
                ServerConfig.MVP_CHANNEL_RED
        };

        int i = 0;
        for (String chArrs : chList) {
            for (String s : chArrs.split(",")) {
                if (s == null || s.isEmpty() || !s.matches("^\\d+$")) {
                    continue;
                }
                if (Integer.parseInt(s) == channel) {
                    switch (i) {
                        case 0:
                            return ChannelType.混沌;
                        case 1:
                            return ChannelType.變態;
                        case 2:
                            return ChannelType.MVP銅牌;
                        case 3:
                            return ChannelType.MVP銀牌;
                        case 4:
                            return ChannelType.MVP金牌;
                        case 5:
                            return ChannelType.MVP鑽石;
                        case 6:
                            return ChannelType.MVP紅鑽;
                    }
                    break;
                }
            }
            i++;
        }
        return ChannelType.普通;
    }
}
