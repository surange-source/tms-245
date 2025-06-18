package handling.world.party;

public enum PartySearchType {

    Kerning(20, 200, 1000, false),
    Ludi(30, 200, 1001, false),
    Orbis(50, 200, 1002, false),
    Pirate(60, 200, 1003, false),
    Magatia(70, 200, 1004, false),
    ElinForest(40, 200, 1005, false),
    Pyramid(40, 200, 1008, false),
    Dragonica(100, 200, 1009, false), //what the fk
    Hoblin(80, 200, 1011, false),
    Henesys(10, 200, 1012, false),
    武陵道場(25, 200, 1013, false), //武陵道場
    Balrog_Normal(50, 250, 2000, true), //蝙蝠魔
    Zakum(50, 250, 2002, true), //殘暴炎魔遠征
    Horntail(80, 250, 2003, true), //黑龍遠征
    PinkBean(140, 250, 2004, true), //皮卡啾
    ChaosZakum(100, 250, 2005, true), //進階殘暴炎魔遠征
    ChaosHT(110, 250, 2006, true), //進階黑龍遠征
    VonLeon(120, 250, 2007, true), //凡雷恩
    Cygnus(170, 250, 2008, true), //西格諾斯女皇
    Akyrum(120, 250, 2009, true), //阿卡伊農遠征隊
    Hillah(120, 250, 2010, true), //希拉遠征隊
    ChaosPB(170, 250, 2011, true), //混沌皮卡啾
    CWKPQ(90, 250, 2011, true);
    public final int id;
    public final int minLevel;
    public final int maxLevel;
    public final int timeLimit;
    public final boolean exped;

    PartySearchType(int minLevel, int maxLevel, int value, boolean exped) {
        this.id = value;
        this.minLevel = minLevel;
        this.maxLevel = maxLevel;
        this.exped = exped;
        this.timeLimit = exped ? 20 : 5;
    }

    public static PartySearchType getById(int id) {
        for (PartySearchType pst : PartySearchType.values()) {
            if (pst.id == id) {
                return pst;
            }
        }
        return null;
    }
}
