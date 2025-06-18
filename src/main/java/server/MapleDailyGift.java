/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import database.DatabaseConnection;
import database.tools.SqlTool;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.*;

public class MapleDailyGift {

    public static final int MINLEVEL = 33;
    private static final MapleDailyGift instance = new MapleDailyGift();
    private final Map<Integer, DailyGiftMonth> rewards = new HashMap<>();

    public static MapleDailyGift getInstance() {
        return instance;
    }

    /**
     * 獲得當前時間
     *
     * @return
     */
    public static String getCurrentTime() {
        return "check1=0;cDate=" + new SimpleDateFormat("yy/MM/dd").format(new Date());
    }

    public DailyGiftMonth getRewards() {
        return rewards.get(Calendar.getInstance().get(Calendar.MONTH) + 1);
    }

    public void initialize() {
        rewards.clear();
        DatabaseConnection.domain(con -> {
            ResultSet rs = SqlTool.query(con, "SELECT * FROM `zdata_dailygifts`");
            while (rs.next()) {
                int month = rs.getInt("month");
                int day = rs.getInt("day");
                int itemid = rs.getInt("itemid");
                int count = rs.getInt("count");
                int commodityid = rs.getInt("commodityid");
                int term = rs.getInt("term");
                rewards.computeIfAbsent(month, m -> new DailyGiftMonth(Calendar.getInstance().getActualMaximum(Calendar.DATE)))
                        .dailyGifts.put(day, new DailyGiftInfo(day, itemid, count, commodityid, term));
            }
            return null;
        }, "加載簽到獎勵出錯");
    }

    public static final class DailyGiftMonth {
        public final Map<Integer, DailyGiftInfo> dailyGifts;
        public final long startTime;
        public final long endTime;
        public final int days;
        public final int minLevel;
//        public final Map unknownMap;

        public DailyGiftMonth(final int days) {
            this.dailyGifts = new HashMap<>();
//            this.unknownMap = new HashMap<>();
            this.startTime = -2L;
            this.endTime = -1L;
            this.days = days;
            this.minLevel = 33;
        }
    }

    public static final class DailyGiftInfo {
        public final int day;
        public final int itemId;
        public final int count;
        public final int commodityid;
        public final int term;

        public DailyGiftInfo(final int day, final int itemId, final int count, final int commodityid, final int term) {
            this.day = day;
            this.itemId = itemId;
            this.count = count;
            this.commodityid = commodityid;
            this.term = term;
        }
    }

}
