package client.inventory;

public enum EnchantScrollEntry {

    武器_100("武器攻擊力卷軸", 100, 0, 160, 4, 3),
    武器_70("武器攻擊力卷軸", 70, 1, 200, 5, 4),
    武器_30("武器攻擊力卷軸", 30, 2, 250, 6, 5),
    武器_15("武器攻擊力卷軸", 15, 3, 320, 8, 7),
    攻擊力_100("攻擊力卷軸", 100, 0, 160, 1, 0),
    攻擊力_70("攻擊力卷軸", 70, 1, 200, 2, 0),
    攻擊力_30("攻擊力卷軸", 30, 2, 250, 3, 0),
    攻擊力_15("攻擊力卷軸", 15, 3, 300, 4, 0),
    回真卷軸("回真卷軸", 30, 4, 5000, 0, 0),
    亞克回真卷軸("亞克回真卷軸", 30, 4, 10000, 0, 0),
    純白的咒文書("純白的咒文書", 5, 5, 2000, 0, 0),
    ;

    private final String scrollName;
    private final int successRate;
    private final int viewType;
    private final int cost;
    private final int mask;
    private final int atk;
    private final int stat;

    EnchantScrollEntry(final String scrollName, final int successRate, final int viewType, final int cost, final int atk, final int stat) {
        this.scrollName = scrollName;
        this.successRate = successRate;
        this.viewType = viewType;
        this.cost = cost;
        this.atk = atk;
        this.stat = stat;
        this.mask = (atk <= 0 ? 0 : (EnchantScrollFlag.物攻.getValue() | EnchantScrollFlag.魔攻.getValue())) | (stat <= 0 ? 0 : (EnchantScrollFlag.力量.getValue() | EnchantScrollFlag.敏捷.getValue() | EnchantScrollFlag.智力.getValue() | EnchantScrollFlag.幸運.getValue()));
    }
    public String getName() {
        return scrollName + successRate + "%";
    }

    public final int getSuccessRate() {
        return this.successRate;
    }

    public final int getViewType() {
        return this.viewType;
    }

    public final int getCost() {
        return this.cost;
    }

    public final int getMask() {
        return this.mask;
    }

    public int getAtk() {
        return atk;
    }

    public int getStat() {
        return stat;
    }
}
