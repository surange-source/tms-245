package scripting;

import client.*;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import configs.Config;
import constants.GameConstants;
import constants.ItemConstants;
import database.DatabaseConnectionEx;
import database.tools.SqlTool;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;
import org.apache.logging.log4j.Logger;
import packet.UIPacket;
import server.*;
import server.life.*;
import server.maps.MapleMap;
import server.maps.MapleReactor;
import server.maps.MapleReactorFactory;
import tools.DateUtil;
import tools.types.Pair;

import java.awt.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CommonActionManager {

    private static final Logger log = AbstractScriptManager.log;

    public MapleItemInformationProvider getItemInfo() {
        return MapleItemInformationProvider.getInstance();
    }

    public MapleMonsterInformationProvider getMonsterInfo() {
        return MapleMonsterInformationProvider.getInstance();
    }

    public MapleReactor getReactor(int id) {
        return new MapleReactor(MapleReactorFactory.getReactor(id), id);
    }

    @Deprecated
    public OverrideMonsterStats newMonsterStats() {
        log.trace("scripting.event.EventManager中的函數 newMonsterStats() 已過時，且標記為待刪除");
        return new OverrideMonsterStats();
    }

    public final MapleMonster getMonster(final int mobId) {
        return MapleLifeFactory.getMonster(mobId);
    }

    public MapleMonster getEliteMonster(int id) {
        return MapleLifeFactory.getEliteMonster(id);
    }

    public MapleMonster getEliteMonster(int mobId, MapleMonsterStats stats) {
        return MapleLifeFactory.getEliteMonster(mobId, stats);
    }

    public MapleMonster getEliteMonster(int mobId, MapleMonsterStats stats, int eliteGrade) {
        return MapleLifeFactory.getEliteMonster(mobId, stats, eliteGrade);
    }

    public MapleMonster getEliteMonster(int mobId, MapleMonsterStats stats, int eliteGrade, int eliteType) {
        return MapleLifeFactory.getEliteMonster(mobId, stats, eliteGrade, eliteType);
    }


    /**
     * 獲取怪物狀態
     *
     * @param hp  最大HP
     * @param mp  最大MP
     * @param exp 經驗值
     * @return 重載後的怪物狀態對像
     */
    @Deprecated
    public final OverrideMonsterStats getOverrideMonsterStats(final long hp, final int mp, final int exp) {
        log.trace("scripting.AbstractPlayerInteraction中的函數 getOverrideMonsterStats(hp, mp, exp) 已過時，且標記為待刪除");
        return new OverrideMonsterStats(hp, mp, exp);
    }

    public List<MapleCharacter> newCharList() {
        return new ArrayList<>();
    }

    public long getCurrentTime() {
        return System.currentTimeMillis();
    }

    public final void insertRanking(MapleCharacter player, String rankingname, int value) {
        RankingTop.getInstance().insertRanking(player, rankingname, value);
    }

    public final List<RankingTop.CharNameAndId> getRanking(String rankingname) {
        return RankingTop.getInstance().getRanking(rankingname);
    }

    public final List<RankingTop.CharNameAndId> getRanking(String rankingname, int previous) {
        return RankingTop.getInstance().getRanking(rankingname, previous);
    }

    public final List<RankingTop.CharNameAndId> getRanking(String rankingname, int previous, boolean repeatable) {
        return RankingTop.getInstance().getRanking(rankingname, previous, repeatable);
    }

    public boolean addById(MapleClient c, int itemId, int quantity, String gmLog) {
        return MapleInventoryManipulator.addById(c, itemId, quantity, null, null, 0, 0, gmLog);
    }

    public boolean removeById(MapleClient c, int itemId, int quantity, boolean fromDrop, boolean consume) {
        return MapleInventoryManipulator.removeById(c, ItemConstants.getInventoryType(itemId), itemId, quantity, fromDrop, consume);
    }

    public Equip getNewEquip(int equipId) {
        Equip equip = getItemInfo().getEquipById(equipId);
        return getItemInfo().randomizeStats(equip);
    }

    public final Item newItem(final int id, final byte position, final short quantity, final int flag) {
        return new Item(id, position, quantity, flag);
    }

    public final Item newItem(final int id, final byte position, final short quantity) {
        Item ret;
        MapleItemInformationProvider ii = getItemInfo();
        if (ItemConstants.getInventoryType(id, false).equals(MapleInventoryType.EQUIP)) {
            ret = ii.randomizeStats(ii.getEquipById(id));
        } else {
            ret = new Item(id, position, quantity);
        }
        return ret;
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

    public void spawnMonsterOnGroundBelow(final MapleMap map, final MapleMonster monster, final int x, final int y) {
        map.spawnMonsterOnGroundBelow(monster, new Point(x, y));
    }

    public void spawnDoJangMonster(final MapleMap map, final MapleMonster monster, final int x) {
        final Point point = new Point(x, 0);
        map.spawnMonsterWithEffect(monster, 15, point);
//            map.spawnMonsterOnGroundBelow(monster, point);
//            WorldTimer.EventTimer.getInstance().schedule(new Runnable() {
//
//                @Override
//                public void run() {
////                    map.spawnMonsterWithEffect(monster, 15, point);
//                    map.spawnMonsterOnGroundBelow(monster, point);
//                }
//            }, 5000);
    }

    public boolean addDropItem(int itemId, int mobId, int chance, int minimumQuantity, int maximumQuantity) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("INSERT INTO `drop_data` (`dropperid`, `itemid`, `itemname`, `minimum_quantity`, `maximum_quantity`,`chance`) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, mobId);
            ps.setInt(2, itemId);
            ps.setString(3, MapleItemInformationProvider.getInstance().getName(itemId));
            ps.setInt(4, minimumQuantity);
            ps.setInt(5, maximumQuantity);
            ps.setInt(6, chance);
            ps.executeUpdate();
        } catch (Exception e) {
            log.error("添加掉寶失敗 itemId:" + itemId + " mobId:" + mobId + " chance:" + chance + " minimumQuantity:" + minimumQuantity + " maximumQuantity:" + maximumQuantity);
            return false;
        }
        return true;
    }


    public RankingTop getRankingTopInstance() {
        return RankingTop.getInstance();
    }


    public final long getNextDayDiff(int day) {
        return DateUtil.getNextDayDiff(day);
    }

    public List<Pair<Integer, Integer>> getAllHotTimeItems() {
        return server.commands.SuperGMCommand.HotTime.HotTimeItems;
    }

    public List<RaffleItem> getRaffleMainReward(int type) {
        return RafflePool.getMainReward(type);
    }

    public String getConfig(String config) {
        return Config.getProperty(config, null);
    }

    public boolean isItemType(String type, int itemID) {
        return ItemConstants.isItemType(type, itemID);
    }

    public int getItemGender(int itemID) {
        return ItemConstants.類型.getGender(itemID);
    }

    public long[] getLvMobExp() {
        return GameConstants.lvMobExp;
    }

    public MapleJob getMapleJobById(int id) {
        return MapleJob.getById(id);
    }

    public MapleJob[] getAllMapleJobs() {
        return MapleJob.values();
    }

    public MapleCharacter sendChrReward(int characterId, int itemId, long amount, String desc) {
        return sendChrRewardPeriod(characterId, 0, itemId, amount, desc);
    }

    public MapleCharacter sendChrRewardPeriod(int characterId, int day, int itemId, long amount, String desc) {
        return sendReward(0, characterId, DateUtil.getNextDayTime(0), day <= 0 ? 0 : (DateUtil.getNextDayTime(day) - 60000), itemId, amount, desc);
    }

    public MapleCharacter sendAccReward(int accountId, int itemId, long amount, String desc) {
        return sendAccRewardPeriod(accountId, 0, itemId, amount, desc);
    }

    public MapleCharacter sendAccRewardPeriod(int accountId, int day, int itemId, long amount, String desc) {
        return sendReward(accountId, 0, DateUtil.getNextDayTime(0), day <= 0 ? 0 : (DateUtil.getNextDayTime(day) - 60000), itemId, amount, desc);
    }

    public MapleCharacter sendReward(int accountId, int characterId, long start, long end, int itemId, long amount, String desc) {
        int type;
        if (itemId < 1000000) {
            if (itemId > 2 && itemId < 6) {
                type = itemId;
            } else {
                return null;
            }
        } else if (getItemInfo().isCash(itemId)) {
            type = MapleReward.現金道具;
        } else if (getItemInfo().itemExists(itemId)) {
            type = MapleReward.道具;
        } else {
            return null;
        }
        MapleCharacter.addReward(accountId, characterId, start, end, type, amount, itemId, desc);
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                if (mch.getAccountID() == accountId || mch.getId() == characterId) {
                    mch.updateReward();
                    return mch;
                }
            }
        }
        return null;
    }

    public MapleBuffStat getMapleBuffStat(String stat) {
        for (MapleBuffStat buffStat : MapleBuffStat.values()) {
            if (buffStat.name().equalsIgnoreCase(stat)) {
                return buffStat;
            }
        }
        return null;
    }

    public final void worldMessageEffect(final String message, final int type, final int time) {
        WorldBroadcastService.getInstance().broadcastMessage(UIPacket.showWeatherEffectNotice(message, type, time, true));
    }

    public String getPriceName(int type) {
        switch (type) {
            case 0:
                return "楓幣";
            case 1:
                return "樂豆點";
            case 2:
                return "楓葉點數";
            case 3:
                return "里程點數";
            default:
                return ("#v" + type + "#");
        }
    }

    public void addFromDrop(MapleClient c, Item item, boolean show) {
        MapleInventoryManipulator.addFromDrop(c, item, show);
    }

    @Deprecated
    public Connection getConnection() throws SQLException {
        log.trace("scripting.event.AbstractPlayerInteraction中的函數 getConnection() 已過時，且標記為待刪除");
        return DatabaseConnectionEx.getInstance().getConnection();
    }

}
