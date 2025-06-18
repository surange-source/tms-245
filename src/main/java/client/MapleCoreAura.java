/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import database.DatabaseConnectionEx;
import tools.Randomizer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author PlayDK
 *         龍的傳人寶盒系統
 */
public class MapleCoreAura {

    private int id; //角色ID 如果是傳授的別人的技能 這個地方就是傳授者的ID
    private int level; //角色等級 如果是傳授的別人的技能 這個地方就是傳授者的等級
    private int str; //力量
    private int dex; //敏捷
    private int int_; //智力
    private int luk; //幸運
    private int watk; //物理攻擊
    private int magic; //魔法攻擊
    private long expiration; //寶盒的時間

    public MapleCoreAura() {
    }

    public MapleCoreAura(int chrId) {
        this.id = chrId;
    }

    public MapleCoreAura(int chrId, int chrlevel) {
        this.id = chrId;
        this.level = chrlevel;
    }

    /*
     * 讀取寶盒信息
     * 如果等級大於0 就是讀取自己的 等級小於0就是讀取傳授者的
     */
    public static MapleCoreAura loadFromDb(int chrId) {
        return loadFromDb(chrId, -1);
    }

    public static MapleCoreAura loadFromDb(int chrId, int chrlevel) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            MapleCoreAura ret = new MapleCoreAura(chrId);
            PreparedStatement ps = con.prepareStatement("SELECT * FROM character_coreauras WHERE characterid = ?");
            ps.setInt(1, chrId);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }
            ret.setLevel(chrlevel > 0 ? chrlevel : rs.getInt("level"));
            long expire = rs.getLong("expiredate");
            if (System.currentTimeMillis() > expire) {
                ret.resetCoreAura();
                ret.saveToDb(con);
            } else {
                ret.setStr(rs.getInt("str"));
                ret.setDex(rs.getInt("dex"));
                ret.setInt(rs.getInt("int"));
                ret.setLuk(rs.getInt("luk"));
                ret.setWatk(rs.getInt("watk"));
                ret.setMagic(rs.getInt("magic"));
                ret.setExpiration(expire);
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException ex) {
            System.err.println("加載龍的傳人寶盒信息出錯" + ex);
            return null;
        }
    }

    /*
     * 新建1個寶盒
     */
    public static MapleCoreAura createCoreAura(int chrId, int chrlevel) {
        MapleCoreAura ret = new MapleCoreAura(chrId, chrlevel);
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM character_coreauras WHERE characterid = ?");
            ps.setInt(1, chrId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) { //如果有就直接加載
                ps.close();
                rs.close();
                ret = loadFromDb(chrId, chrlevel);
                return ret;
            }
            ps.close();
            rs.close();
            //沒有就創建1個新的
            ret.resetCoreAura();
            ps = con.prepareStatement("INSERT INTO `character_coreauras` (`characterid`, `level`, `str`, `dex`, `int`, `luk`, `watk`, `magic`, `expiredate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setInt(1, chrId);
            ps.setInt(2, chrlevel);
            ps.setInt(3, ret.getStr());
            ps.setInt(4, ret.getDex());
            ps.setInt(5, ret.getInt());
            ps.setInt(6, ret.getLuk());
            ps.setInt(7, ret.getWatk());
            ps.setInt(8, ret.getMagic());
            ps.setLong(9, ret.getExpiration());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            System.err.println("創建龍的傳人寶盒信息出錯 " + ex);
            return null;
        }
        return ret;
    }

    /*
     * 寶盒時間到期
     * 重置寶盒屬性
     */
    public void resetCoreAura() {
        this.str = 5;
        this.dex = 5;
        this.int_ = 5;
        this.luk = 5;
        this.watk = 0;
        this.magic = 0;
        this.expiration = System.currentTimeMillis() + 24 * 60 * 60 * 1000; //重新設置時間為 24小時
    }

    /*
     * 隨機寶盒屬性
     */
    public void randomCoreAura(int type) {
        int max = Randomizer.nextBoolean() ? (type == 4 ? 32 : type == 3 ? 25 : type == 2 ? 20 : 15) : (type == 4 ? 25 : type == 3 ? 20 : type == 2 ? 15 : 10);
        int min = Randomizer.nextBoolean() ? 5 : 1;
        this.str = Randomizer.rand(min, max);
        this.dex = Randomizer.rand(min, max);
        this.int_ = Randomizer.rand(min, max);
        this.luk = Randomizer.rand(min, max);
        if (Randomizer.nextInt(1000) == 1) {
            this.watk = Randomizer.rand(10, 32);
        } else if (Randomizer.nextInt(500) == 1) {
            this.watk = Randomizer.rand(10, 25);
        } else if (Randomizer.nextInt(200) == 1) {
            this.watk = Randomizer.rand(5, 20);
        } else if (Randomizer.nextInt(100) == 1) {
            this.watk = Randomizer.rand(5, 15);
        } else {
            this.watk = Randomizer.rand(0, 15);
        }
        if (Randomizer.nextInt(1000) == 1) {
            this.magic = Randomizer.rand(10, 32);
        } else if (Randomizer.nextInt(500) == 1) {
            this.magic = Randomizer.rand(10, 25);
        } else if (Randomizer.nextInt(200) == 1) {
            this.magic = Randomizer.rand(5, 20);
        } else if (Randomizer.nextInt(100) == 1) {
            this.magic = Randomizer.rand(5, 15);
        } else {
            this.magic = Randomizer.rand(0, 15);
        }
    }

    /*
     * 保存寶盒信息
     */
    public void saveToDb(Connection con) {
        boolean needclose = false;
        try {
            if (con == null) {
                needclose = true;
                con = DatabaseConnectionEx.getInstance().getConnection();
            }
            PreparedStatement ps = con.prepareStatement("UPDATE `character_coreauras` SET `level` = ?, `str` = ?, `dex` = ?, `int` = ?, `luk` = ?, `watk` = ?, `magic` = ?, `expiredate` = ? WHERE `characterid` = ?");
            ps.setInt(1, level);
            ps.setInt(2, str);
            ps.setInt(3, dex);
            ps.setInt(4, int_);
            ps.setInt(5, luk);
            ps.setInt(6, watk);
            ps.setInt(7, magic);
            ps.setLong(8, expiration);
            ps.setInt(9, id);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            System.err.println("保存龍的傳人寶盒出錯" + ex);
        } finally {
            if (con != null && needclose) {
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /*
     * 角色ID
     * 傳授技能需要
     */
    public int getId() {
        return id;
    }

    /*
     * 角色等級
     * 傳授技能需要
     */
    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    /*
     * 寶盒的等級
     * 5771001 - 寶盒方塊 Lv.1 - 可以重新設定寶盒能力的神秘方塊。只有#c龍的傳人#職業#c30級~69級#的角色可以使用。
     * 5771002 - 寶盒方塊 Lv.2 - 可以重新設定寶盒能力的神秘方塊。只有#c龍的傳人#職業#c70級~119級#的角色可以使用。
     * 5771003 - 寶盒方塊 Lv.3 - 可以重新設定寶盒能力的神秘方塊。只有#c龍的傳人#職業#c120級~159級#的角色可以使用。
     * 5771004 - 寶盒方塊 Lv.4 - 可以重新設定寶盒能力的神秘方塊。只有#c龍的傳人#職業#c160級以上#的角色可以使用。
     */
    public int getCoreAuraLevel() {
        if (level >= 30 && level < 70) {
            return 1;
        } else if (level >= 70 && level < 120) {
            return 2;
        } else if (level >= 120 && level < 160) {
            return 3;
        } else if (level >= 160) {
            return 4;
        }
        return 1;
    }

    /*
     * 力量
     */
    public int getStr() {
        return str;
    }

    public void setStr(int str) {
        this.str = str;
    }

    /*
     * 敏捷
     */
    public int getDex() {
        return dex;
    }

    public void setDex(int dex) {
        this.dex = dex;
    }

    /*
     * 智力
     */
    public int getInt() {
        return int_;
    }

    public void setInt(int int_) {
        this.int_ = int_;
    }

    /*
     * 幸運
     */
    public int getLuk() {
        return luk;
    }

    public void setLuk(int luk) {
        this.luk = luk;
    }

    /*
     * 物理攻擊
     */
    public int getWatk() {
        return watk;
    }

    public void setWatk(int watk) {
        this.watk = watk;
    }

    /*
     * 魔法攻擊
     */
    public int getMagic() {
        return magic;
    }

    public void setMagic(int magic) {
        this.magic = magic;
    }

    /*
     * 總點數
     */
    public int getTotal() {
        return str + dex + int_ + luk + watk + magic;
    }

    /*
     * 寶盒的時間
     */
    public long getExpiration() {
        return expiration;
    }

    public void setExpiration(long expire) {
        this.expiration = expire;
    }
}
