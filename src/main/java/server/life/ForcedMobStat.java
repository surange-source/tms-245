package server.life;

import configs.ServerConfig;

public final class ForcedMobStat {
    private int PDRate;
    private int watk;
    private int speed;
    private int level;
    private int userCount;
    private int pushed;
    private int MDRate;
    private int eva;
    private int acc;
    private boolean change;
    private int matk;
    private long exp;

    public ForcedMobStat(MapleMonsterStats stats, int newLevel, double r) {
        newLevel = Math.min(newLevel, ServerConfig.CHANNEL_PLAYER_MAXLEVEL);
        if (stats.isBoss()) {
            PDRate = stats.getPDRate();
            MDRate = stats.getMDRate();
        } else {
            PDRate = Math.min(50, (int) Math.round(stats.getPDRate() * r));
            MDRate = Math.min(50, (int) Math.round(stats.getMDRate() * r));
        }
        exp = (int) (stats.getExp() * r);
        watk = (int) (stats.getPhysicalAttack() * r);
        matk = (int) (stats.getMagicAttack() * r);
        acc = Math.round(stats.getAcc() + Math.max(0, newLevel - stats.getLevel()) * 2);
        eva = Math.round(stats.getEva() + Math.max(0, newLevel - stats.getLevel()));
        pushed = (int) (stats.getPushed() * r);
        speed = 0;
        level = newLevel;
        userCount = 0;
        change = true;
    }

    public final int getUserCount() {
        return this.userCount;
    }

    public final void setUserCount(final int userCount) {
        this.userCount = userCount;
    }

    public final int getLevel() {
        return this.level;
    }

    public final void setLevel(final int level) {
        this.level = level;
    }

    public final int getSpeed() {
        return this.speed;
    }

    public final void setSpeed(final int speed) {
        this.speed = speed;
    }

    public final int getPushed() {
        return this.pushed;
    }

    public final void setPushed(final int pushed) {
        this.pushed = pushed;
    }

    public final int getMDRate() {
        return this.MDRate;
    }

    public final void setMDRate(final int mdRate) {
        this.MDRate = mdRate;
    }

    public final int getPDRate() {
        return this.PDRate;
    }

    public final void setPDRate(final int pdRate) {
        this.PDRate = pdRate;
    }

    public final int getEva() {
        return this.eva;
    }

    public final void setEva(final int eva) {
        this.eva = eva;
    }

    public final int getAcc() {
        return this.acc;
    }

    public final void setAcc(final int acc) {
        this.acc = acc;
    }

    public final int getMatk() {
        return this.matk;
    }

    public final void setMatk(final int matk) {
        this.matk = matk;
    }

    public final int getWatk() {
        return this.watk;
    }

    public final void setWatk(final int watk) {
        this.watk = watk;
    }

    public final long getExp() {
        return exp;
    }

    public final void setExp(long exp) {
        this.exp = exp;
    }

    public final boolean isChange() {
        return this.change;
    }

    public final void setChange(final boolean change) {
        this.change = change;
    }
}
