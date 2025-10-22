/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.commands;

/**
 * @author PlayDK
 */
public enum PlayerRank {

    普通('@', "＠", 0, false),
    MVP銅牌I('$', "￥", 1, false),
    MVP銅牌II('$', "￥", 2, false),
    MVP銅牌III('$', "￥", 3, false),
    MVP銅牌IV('$', "￥", 4, false),
    MVP銀牌('$', "￥", 5, false),
    MVP金牌('$', "￥", 6, false),
    MVP鑽石('$', "￥", 7, false),
    MVP紅鑽('$', "￥", 8, false),
    實習管理員('%', "％", 1, true),
    遊戲管理員('!', "！", 2, true),
    超級管理員('!', "！", 3, true),
    伺服管理員('!', "！", 4, true);

    private final char commandPrefix;
    private final String fullWidthCommandPrefix;
    private final int level;
    private final boolean isGm;

    PlayerRank(char ch, int level, boolean isGm) {
        this(ch, null, level, isGm);
    }

    PlayerRank(char ch, String fw, int level, boolean isGm) {
        this.commandPrefix = ch;
        this.fullWidthCommandPrefix = fw;
        this.level = level;
        this.isGm = isGm;
    }

    public char getCommandPrefix() {
        return commandPrefix;
    }

    public String getFullWidthCommandPrefix() {
        return fullWidthCommandPrefix;
    }

    public int getLevel() {
        return level;
    }

    public boolean isGm() {
        return isGm;
    }

    public static PlayerRank getByLevel(int level, boolean isGm) {
        for (PlayerRank i : PlayerRank.values()) {
            if (i.getLevel() == level && i.isGm == isGm) {
                return i;
            }
        }
        return PlayerRank.普通;
    }

    public static PlayerRank getByCommandPrefix(char ch) {
        for (PlayerRank i : PlayerRank.values()) {
            if (i.getCommandPrefix() == ch || String.valueOf(ch).equals(i.getFullWidthCommandPrefix())) {
                return i;
            }
        }
        return null;
    }
}
