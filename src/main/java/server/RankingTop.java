/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package server;

import client.MapleCharacter;
import database.DatabaseConnectionEx;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.*;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class RankingTop {

    private static final Logger log = LogManager.getLogger(RankingTop.class);
    private static final RankingTop instance = new RankingTop();
    private final Map<String, List<CharNameAndId>> rankcache = new HashMap<>();

    private RankingTop() {
        log.info("正在啟動[排行榜]");
        initAll();
    }
//    private final String levelRankName[] = {"★國王★", "★女王★"};
//    private final String fameRankName[] = {"★世界偶像★", "★魅力寶貝★"};

    public static RankingTop getInstance() {
        return instance;
    }

    public final void initAll() {
        rankcache.clear();
    }

    public final List<CharNameAndId> getRanking(String rankingname) {
        return getRanking(rankingname, 10);
    }

    public final List<CharNameAndId> getRanking(String rankingname, int previous) {
        return getRanking(rankingname, 10, true);
    }

    public final List<CharNameAndId> getRanking(String rankingname, int previous, boolean repeatable) {
        List<CharNameAndId> ret = null;
        if (!rankcache.containsKey(rankingname)) {
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                ResultSet rs;
                try (PreparedStatement ps = con.prepareStatement("SELECT r.accountid, r.characterid, r.rankingname, r.value, r.time, c.name, c.gender FROM (SELECT * FROM rankingtop ORDER BY value DESC) r, characters AS c WHERE r.characterid = c.id AND r.rankingname = ? " + (repeatable ? "" : "GROUP BY r.characterid") + " ORDER BY r.value DESC, r.time DESC LIMIT ?;")) {
                    ps.setString(1, rankingname);
                    ps.setInt(2, previous);
                    rs = ps.executeQuery();
                    ret = new LinkedList<>();
                    while (rs.next()) {
                        ret.add(new CharNameAndId(rs.getInt("accountid"), rs.getInt("characterid"), rs.getString("rankingname"), rs.getInt("value"), rs.getTimestamp("time"), rs.getString("name"), rs.getInt("gender")));
                    }
                }
                rs.close();
            } catch (SQLException ex) {
                log.error(ex);
            }
            rankcache.put(rankingname, ret);
        } else {
            return rankcache.get(rankingname);
        }
        return ret;
    }

    public final void insertRanking(MapleCharacter player, String rankingname, int value) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("INSERT INTO rankingtop (id, accountid, characterid, rankingname, value, time) VALUES (DEFAULT, ?, ?, ?, ?, CURRENT_TIMESTAMP)")) {
                ps.setInt(1, player.getAccountID());
                ps.setInt(2, player.getId());
                ps.setString(3, rankingname);
                ps.setInt(4, value);
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
    }

    public static final class CharNameAndId {

        public final String name, rankingname;
        public final int accountid, characterid, value, gender;
        public final Timestamp time;

        public CharNameAndId(final int accountid, final int characterid, final String rankingname, final int value, final Timestamp time, String name, int gender) {
            super();
            this.accountid = accountid;
            this.characterid = characterid;
            this.rankingname = rankingname;
            this.value = value;
            this.time = time;
            this.name = name;
            this.gender = gender;
        }
    }
}
