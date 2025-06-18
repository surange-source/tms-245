package server;

import client.force.MapleForceFactory;
import client.skills.SkillFactory;
import constants.ServerConstants;
import database.DatabaseConnection;
import database.DatabaseConnectionEx;
import database.DatabaseException;
import database.tools.SqlTool;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.reactor.ReactorScriptManager;
import server.cashshop.CashItemFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.maps.MapleMapFactory;
import server.maps.field.ActionBarField;
import server.maps.field.BossLucidField;
import server.maps.field.BossWillField;
import server.quest.MapleQuestDumper;
import server.shop.MapleShopFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 初始化伺服器配置，比如更新數據庫格式等
 */
public class InitializeServer {

    private static final Logger log = LogManager.getLogger(InitializeServer.class);

    /**
     * 服務端初始化，應用數據庫更改等
     *
     * @return
     */
    public static boolean initServer() {
        initializeSetting();
        checkTableisExist_wz();
        return initializeUpdateLog() && initializeMySQL();
    }

    /**
     * 初始化設置
     * 1、賬號狀態
     */
    private static void initializeSetting() {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE `accounts` SET `loggedin` = 0, `check` = 0")) {
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            throw new RuntimeException("[EXCEPTION] Please check if the SQL server is active.", ex);
        }
    }

    /**
     * 創建更新日誌的記錄表
     *
     * @return
     */
    private static boolean initializeUpdateLog() {
        if (!checkTableisExist()) {
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                try (PreparedStatement ps = con.prepareStatement("CREATE TABLE `systemupdatelog` (`id`  INT(11) NOT NULL AUTO_INCREMENT,`patchname` varchar(50) NOT NULL ,`lasttime`  TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP ,PRIMARY KEY (`id`))")) {
                    ps.executeUpdate();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return checkTableisExist();
    }

    /**
     * 查看更新日誌記錄表是否存在
     *
     * @return
     */
    private static boolean checkTableisExist() {
        boolean exist = false;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SHOW TABLES LIKE 'systemupdatelog'"); ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    exist = true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return exist;
    }

    private static boolean checkTableisExist_wz() {
        return DatabaseConnection.domain(con -> {
            boolean exist = false;
            try (PreparedStatement ps = con.prepareStatement("SHOW TABLES LIKE 'wztosqllog'"); ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    exist = true;
                }
            }
            if (!exist) {
                StringBuilder s = new StringBuilder("CREATE TABLE `wztosqllog` (`version` smallint NOT NULL,");
                for (String name : WzSqlName.names()) {
                    s.append("`").append(name).append("` BOOLEAN NOT NULL,");
                }
                s.append("PRIMARY KEY (`version`))");
                SqlTool.update(con, s.toString());
            }
            return exist;
        });
    }


    /**
     * 應用MySQL補丁
     *
     * @return
     */
    private static boolean initializeMySQL() {
        // 檢查並應用MySQL補丁
        for (UPDATE_PATCH patch : UPDATE_PATCH.values()) {
            if (!checkIsAppliedSQLPatch(patch.name())) {
                if (!applySQLPatch(patch.getSQL()) || !insertUpdateLog(patch.name())) {
                    return false;
                }
            }
        }
        if (!checkIsAppliedSQLPatch("重置傳授技能_1")) {
            String sql = "DELETE FROM skills WHERE";
            String sql2 = "UPDATE skills SET expiration = -1, teachId = 0 WHERE";
            List<Integer> inID = new ArrayList<>();
            for (java.util.Map.Entry<Integer, Integer> entry : constants.SkillConstants.TeachSkillMap.entrySet()) {
                sql2 += " skillid = " + entry.getKey() + " OR";
                sql += " skillid = " + entry.getValue() + " OR";
                int teamID = constants.SkillConstants.getTeamTeachSkillId(entry.getValue());
                if (teamID > 1 && !inID.contains(teamID)) {
                    sql += " skillid = " + teamID + " OR";
                    inID.add(teamID);
                }
            }
            if (sql.length() > 38) {
                sql = sql.substring(0, sql.length() - 3);
            }
            if (sql2.length() > 66) {
                sql2 = sql2.substring(0, sql2.length() - 3);
            }
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                try (PreparedStatement ps = con.prepareStatement(sql)) {
                    ps.executeUpdate();
                }
                try (PreparedStatement ps = con.prepareStatement(sql2)) {
                    ps.executeUpdate();
                }
            } catch (SQLException e) {
                return false;
            }
            if (!insertUpdateLog("重置傳授技能_1")) {
                return false;
            }
        }
        return true;
    }

    /**
     * 檢查是否已應用補丁
     *
     * @param name
     * @return
     */
    private static boolean checkIsAppliedSQLPatch(String name) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT id FROM systemupdatelog WHERE patchname = ?")) {
                ps.setString(1, name);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        return true;
                    }
                } catch (Exception ex) {
                    SqlTool.update(con, "DROP TABLE IF EXISTS `systemupdatelog`");
                    initializeUpdateLog();
                    return checkIsAppliedSQLPatch(name);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 插入補丁的更新記錄
     *
     * @param patchname 補丁id
     * @return
     */
    private static boolean insertUpdateLog(String patchname) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO systemupdatelog(id, patchname, lasttime) VALUES (DEFAULT, ?, CURRENT_TIMESTAMP)")) {
                ps.setString(1, patchname);
                ps.executeUpdate();
                return true;
            }
        } catch (SQLException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private static boolean applySQLPatch(String sql) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement(sql)) {
                ps.executeUpdate();
                return true;
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate column name")) {
                return true;
            }
            e.printStackTrace();
            return false;
        }
    }

    public static boolean InitDataFinished = false;
    public static void initAllData(DataCacheListener listener) {
        AtomicInteger count = new AtomicInteger(0);
        final int total = 23;
        List<Runnable> runs = new ArrayList<>();
        runs.add(() -> {
            MapleOverrideData.init();
            listener.next(count.incrementAndGet(), total);
            SkillFactory.loadDelays();
            listener.next(count.incrementAndGet(), total);
            SkillFactory.loadSkillData();
            listener.next(count.incrementAndGet(), total);
            SkillFactory.loadMemorySkills();
            listener.next(count.incrementAndGet(), total);
        });
        runs.add(() -> {
            MapleForceFactory.getInstance().initialize();
            listener.next(count.incrementAndGet(), total);
            MapleItemInformationProvider.getInstance().runItems();
            listener.next(count.incrementAndGet(), total);
            MapleItemInformationProvider.getInstance().runEtc();
            listener.next(count.incrementAndGet(), total);
            MapleItemInformationProvider.getInstance().loadSetItemData();
            listener.next(count.incrementAndGet(), total);
            MapleItemInformationProvider.getInstance().loadFamiliarItems();
            listener.next(count.incrementAndGet(), total);
            MapleItemInformationProvider.getInstance().loadPotentialData();
            listener.next(count.incrementAndGet(), total);
            // TwMS無星岩
            //MapleItemInformationProvider.getInstance().loadSocketData();
            //listener.next(count.incrementAndGet(), total);
        });
        runs.add(() -> {
            MapleShopFactory.getInstance().loadShopData();
            listener.next(count.incrementAndGet(), total);
            MobSkillFactory.initialize();
            listener.next(count.incrementAndGet(), total);
            MapleUnionData.getInstance().init();
            listener.next(count.incrementAndGet(), total);
            MapleLifeFactory.initEliteMonster();
            listener.next(count.incrementAndGet(), total);
            MapleMonsterInformationProvider.getInstance().load();
            listener.next(count.incrementAndGet(), total);
        });
        runs.add(() -> {
            MapleMapFactory.loadAllLinkNpc();
            listener.next(count.incrementAndGet(), total);
            MapleMapFactory.loadAllMapName();
            listener.next(count.incrementAndGet(), total);
            CashItemFactory.getInstance().initialize();
            listener.next(count.incrementAndGet(), total);
        });
        runs.add(() -> {
            ReactorScriptManager.getInstance().loadDrops();
            listener.next(count.incrementAndGet(), total);
            MapleDailyGift.getInstance().initialize();
            listener.next(count.incrementAndGet(), total);
        });
        runs.add(() -> {
            MapleLifeFactory.loadQuestCounts();
            listener.next(count.incrementAndGet(), total);
            MapleQuestDumper.getInstance().loadQuest();
            listener.next(count.incrementAndGet(), total);
        });
        runs.add(() -> {
            BossWillField.init();
            BossLucidField.init();
            ActionBarField.init();
            listener.next(count.incrementAndGet(), total);
        });
        for (Runnable run : runs) {
            new Thread(run).start();
        }
    }

    @FunctionalInterface
    public interface DataCacheListener {

        void next(int now, int total);
    }

    /**
     * 補丁列表
     */
    enum UPDATE_PATCH {

        真實符文屬性("ALTER TABLE `inventoryequipment` ADD COLUMN `aut` smallint(6) NOT NULL DEFAULT 0 AFTER `arclevel`"
                + ", ADD COLUMN `autexp` int(6) NOT NULL DEFAULT 0 AFTER `aut`"
                + ", ADD COLUMN `autlevel` smallint(6) NOT NULL DEFAULT 0 AFTER `autexp`"),
        寵物第二BUFF欄位("ALTER TABLE `pets` ADD COLUMN `skillid2` int(11) NOT NULL DEFAULT '0' AFTER `skillid`"),
        公會V240擴充職位欄位("ALTER TABLE `guilds` MODIFY COLUMN `rank1authority` int(10) NOT NULL DEFAULT -1 AFTER `rank5title`"
                + ", MODIFY COLUMN `rank2authority` int(10) NOT NULL DEFAULT 1663 AFTER `rank1authority`"
                + ", MODIFY COLUMN `rank3authority` int(10) NOT NULL DEFAULT 1024 AFTER `rank2authority`"
                + ", MODIFY COLUMN `rank4authority` int(10) NOT NULL DEFAULT 1024 AFTER `rank3authority`"
                + ", MODIFY COLUMN `rank5authority` int(10) NOT NULL DEFAULT 1024 AFTER `rank4authority`"
                + ", ADD COLUMN `rank6title` varchar(45) NOT NULL AFTER `rank5title`"
                + ", ADD COLUMN `rank7title` varchar(45) NOT NULL AFTER `rank6title`"
                + ", ADD COLUMN `rank8title` varchar(45) NOT NULL AFTER `rank7title`"
                + ", ADD COLUMN `rank9title` varchar(45) NOT NULL AFTER `rank8title`"
                + ", ADD COLUMN `rank10title` varchar(45) NOT NULL AFTER `rank9title`"
                + ", ADD COLUMN `rank6authority` int(10) NOT NULL DEFAULT '1024' AFTER `rank5authority`"
                + ", ADD COLUMN `rank7authority` int(10) NOT NULL DEFAULT '1024' AFTER `rank6authority`"
                + ", ADD COLUMN `rank8authority` int(10) NOT NULL DEFAULT '1024' AFTER `rank7authority`"
                + ", ADD COLUMN `rank9authority` int(10) NOT NULL DEFAULT '1024' AFTER `rank8authority`"
                + ", ADD COLUMN `rank10authority` int(10) NOT NULL DEFAULT '1024' AFTER `rank9authority`"),
        移除商城道具extra_flags屬性("ALTER TABLE `cashshop_modified_items` DROP COLUMN `extra_flags`"),
        公會職位預設值("ALTER TABLE `guilds` MODIFY COLUMN `rank6title` varchar(45) NOT NULL DEFAULT '公會成員4' AFTER `rank5title`"
                + ", MODIFY COLUMN `rank7title` varchar(45) NOT NULL DEFAULT '' AFTER `rank6title`"
                + ", MODIFY COLUMN `rank8title` varchar(45) NOT NULL DEFAULT '' AFTER `rank7title`"
                + ", MODIFY COLUMN `rank9title` varchar(45) NOT NULL DEFAULT '' AFTER `rank8title`"
                + ", MODIFY COLUMN `rank10title` varchar(45) NOT NULL DEFAULT '' AFTER `rank9title`"),
        鍵位欄位擴充補丁("ALTER TABLE `keymap` ADD COLUMN `slot` tinyint(3) unsigned NOT NULL DEFAULT 0 AFTER `characterid`"),
        移除pokemon和monsterbook表("DROP TABLE IF EXISTS `pokemon`, `monsterbook`"),
        寵物Buff欄屬性("ALTER TABLE `pets` DROP COLUMN `skillid`, DROP COLUMN `skillid2`"),
        移除extendedslots表("DROP TABLE IF EXISTS `extendedslots`"),
        道具新增extendedSlot屬性("ALTER TABLE `inventoryitems` ADD COLUMN `extendSlot` int(11) NOT NULL DEFAULT -1 AFTER `espos`"),
        增加傳授次數屬性("ALTER TABLE `skills` ADD COLUMN `teachTimes` int(11) NOT NULL DEFAULT 0 AFTER `teachId`"),
        ;

        private final String sql;

        UPDATE_PATCH(String sql) {
            this.sql = sql;
        }

        public String getSQL() {
            return sql;
        }
    }

    public enum WzSqlName {
        wz_delays,
        wz_skilldata,
        wz_skillsbyjob,
        wz_summonskill,
        wz_mountids,
        wz_familiarskill,
        wz_craftings,
        wz_finalattacks,
        wz_itemdata,
        wz_maplinknpcs,
        wz_questdata,
        wz_questactitemdata,
        wz_questactskilldata,
        wz_questactquestdata,
        wz_questreqdata,
        wz_questpartydata,
        wz_questactdata,
        wz_questcount,
        wz_npcnames,
        wz_mobskilldata;


        static String[] names() {
            WzSqlName[] values = values();
            int len = values.length;
            String[] names = new String[len];
            for (int i = 0; i < len; i++) {
                names[i] = values[i].name();
            }
            return names;
        }

        public boolean check(Connection con) {
            synchronized (WzSqlName.class) {
                try (PreparedStatement ps = con.prepareStatement("SELECT * FROM `wztosqllog` WHERE `version` = ?")) {
                    ps.setInt(1, ServerConstants.MapleMajor);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            return rs.getBoolean(this.name());
                        }
                    }
                    StringBuilder s = new StringBuilder("INSERT INTO `wztosqllog` VALUES(").append(ServerConstants.MapleMajor);
                    String[] names = names();
                    for (int i = 0; i < names.length; i++) {
                        s.append(",false");
                    }
                    try {
                        SqlTool.update(con, s.append(")").toString());
                    } catch (DatabaseException e) {
                        SqlTool.update(con, "DROP TABLE IF EXISTS `wztosqllog`");
                    }
                    return false;
                } catch (SQLException e) {
                    throw new DatabaseException(e);
                }
            }
        }

        public synchronized void update(Connection con) {
            SqlTool.update(con, "UPDATE `wztosqllog` SET `" + name() + "` = ? WHERE `version` = ?", new Object[]{true, ServerConstants.MapleMajor});
        }

        public synchronized void drop(Connection con) {
            SqlTool.update(con, "DROP TABLE IF EXISTS `" + name() + "`");
        }
    }
}
