package handling.world.party;

public enum ExpeditionType {

    Normal_Balrog(15, 2000, 50, 250), //魔王巴洛古遠征隊
    Zakum(30, 2002, 50, 250), //殘暴炎魔
    Horntail(30, 2003, 80, 250), //闇黑龍王
    Pink_Bean(30, 2004, 140, 250), //皮卡啾遠征隊
    Chaos_Zakum(30, 2005, 100, 250), //進階殘暴炎魔
    ChaosHT(30, 2006, 110, 250), //進階闇黑龍王
    Von_Leon(18, 2007, 120, 250), //凡雷恩遠征隊
    Cygnus(18, 2008, 170, 250), //西格諾斯女皇 - 楓之谷騎士團遠征隊
    Akyrum(18, 2009, 120, 250), //阿卡伊農遠征隊
    Hillah(6, 2010, 120, 250), //希拉遠征隊
    Chaos_Pink_Bean(6, 2011, 170, 250), //混沌皮卡啾遠征隊
    CWKPQ(30, 2011, 90, 250);
    public final int maxMembers;
    public final int maxParty;
    public final int exped;
    public final int minLevel;
    public final int maxLevel;

    ExpeditionType(int maxMembers, int exped, int minLevel, int maxLevel) {
        this.maxMembers = maxMembers;
        this.exped = exped;
        this.maxParty = (maxMembers / 2) + (maxMembers % 2 > 0 ? 1 : 0);
        this.minLevel = minLevel;
        this.maxLevel = maxLevel;
    }

    public static ExpeditionType getById(int id) {
        for (ExpeditionType pst : ExpeditionType.values()) {
            if (pst.exped == id) {
                return pst;
            }
        }
        return null;
    }
}
