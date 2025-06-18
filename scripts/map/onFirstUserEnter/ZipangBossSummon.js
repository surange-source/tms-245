function start() {
    var eim = ms.getEventInstance();
    var em = ms.getEventManager("tiangou");
    if (eim != null) {
        //eim.setProperty("summom", "1");
        mobid = 9400080;
        mob = em.getMonster(mobid);
        mob.changeHP(10000000000);
        eim.registerMonster(mob);
        ms.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(199, -28));
        //ms.getMap().startMapEffect("請在規定的時間內擊敗.", 5120124);
    }
    ms.dispose();
}