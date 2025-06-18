var BossStatu = {};

function Boss( name ){
    return Boss( name ,em );
}

function Boss( name ,em ){
    var bossD = {};
    bossD = BossData[name];
    
    var mobD = em.getMonster(bossD.ID);
    bossD.HP = bossD.HP || mobD.getStats().getHp();
    bossD.MP = bossD.MP || mobD.getStats().getMp();
    bossD.PDRate = bossD.PDRate || mobD.getStats().getPDRate();
    bossD.MDRate = bossD.MDRate || mobD.getStats().getMDRate();
    bossD.PAD = bossD.PAD || mobD.getStats().getPhysicalAttack();
    bossD.MAD = bossD.MAD || mobD.getStats().getMagicAttack();
    bossD.LEVEL = bossD.LEVEL || mobD.getStats().getLevel();
    bossD.USERCOUNT = bossD.USERCOUNT || mobD.getStats().getUserCount();
    bossD.SPEED = bossD.SPEED || mobD.getStats().getSpeed();
    bossD.PUSHED = bossD.PUSHED || mobD.getStats().getPushed();
    bossD.EVA = bossD.EVA || mobD.getStats().getEva();
    bossD.ACC = bossD.ACC || mobD.getStats().getAcc();
    bossD.EXP = bossD.EXP || mobD.getStats().getExp();
    
    return bossD;
}

var BossData = {
    //簡單露希妲一階
    Lucid_1_easy:{
        ID:8880140,
        HP:6000000000000,
        MP:1000000000,
        LEVEL:220,
    },
    //簡單露希妲二階
    Lucid_2_easy:{
        ID:8880151,
        HP:6000000000000,
        MP:1000000000,
        LEVEL:220,
    },
    //普通露希妲一階
    Lucid_1_normal:{
        ID:8880140,
        HP:12000000000000,
        MP:1000000000,
        LEVEL:230,
    },
    //普通露希妲二階
    Lucid_2_normal:{
        ID:8880151,
        HP:12000000000000,
        MP:1000000000,
        LEVEL:230,
    },
    //普通森蘭丸
    Ranmaru_normal:{
        ID:9421581,
        HP:1000000000,
        MP:1000000000,
        LEVEL:160,
    },
    //困難森蘭丸
    Ranmaru_hard:{
        ID:9421589,
        HP:10500000000,
        MP:1000000000,
        LEVEL:210,
    },
    //濃姬
    Nouhime:{
        ID:9450022,
        HP:200000000000,
        MP:1000000000,
    },
    //簡單庫洛斯
    Cross_easy:{
        ID:9440025,
        HP:1500000000,
        MP:1000000000,
    },
    //普通庫洛斯
    Cross_normal:{
        ID:9440028,
        HP:2000000000,
        MP:1000000000,
    },
    //艾畢奈亞無解
    //六手邪神
    sixhands:{
        ID:8800200,
        HP:35000000,
        MP:100000,
    },
    //天狗
    Tiangou:{
        ID:9400080,
        HP:10000000000,
        MP:1000000000,
        LEVEL:160,
    },
    //桃樂絲
    Dorothy:{
        ID:9309207,
        HP:10000000000,
        MP:1000000000,
    },
}