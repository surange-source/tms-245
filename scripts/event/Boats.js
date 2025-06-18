/*
 * 玩具城船來 1
 * 離開  520
 * 魔法密林 船來 3
 * 船離開 
 */

function init() {
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("docked", "true");
    em.setProperty("entry", "true");
    em.setProperty("haveBalrog", "false");
    em.schedule("stopentry", 180000); // [3 min]
    em.schedule("takeoff", 240000); //  [4 min]
    em.getMapFactoryMap(200090000).killAllMonsters(false);
    em.getMapFactoryMap(200090010).killAllMonsters(false);
}

function stopentry() {
    em.setProperty("entry", "false");
    em.getMapFactoryMap(200090011).resetReactors();
    em.getMapFactoryMap(200090001).resetReactors();
}

function takeoff() {
    em.warpAllPlayer(200000112, 200090000);//天空 - 維多利亞島
    em.warpAllPlayer(104020111, 200090010);//維多利亞島 -天空
    em.broadcastShip(200000111, 3);
    em.broadcastShip(104020110, 3);
    em.setProperty("docked", "false");
    em.schedule("invasion", 60000); // 召喚蝙蝠魔 [1 min]
    em.schedule("arrived", 300000); // 飛行時間 [5 min]
}

function arrived() {
    em.warpAllPlayer(200090010, 200000100);
    em.warpAllPlayer(200090011, 200000100);
    em.warpAllPlayer(200090000, 104020110);
    em.warpAllPlayer(200090001, 104020110);
    em.broadcastShip(200000111, 1);
    em.broadcastShip(104020110, 1);
    em.getMapFactoryMap(200090010).killAllMonsters(false);
    em.getMapFactoryMap(200090000).killAllMonsters(false);
    em.setProperty("haveBalrog", "false");
    scheduleNew();
}

function invasion() {
    if (Math.floor(Math.random() * 10) < 10) {
        var map1 = em.getMapFactoryMap(200090000);
        var pos1 = new java.awt.Point(-538, 143);
        var mob11 = em.getMonster(8150000);
        mob11.getStats().setChange(true);
        mob11.setForcedMobStat(170);
        var mob12 = em.getMonster(8150000);
        mob12.getStats().setChange(true);
        mob12.setForcedMobStat(170);
        map1.spawnMonsterOnGroundBelow(mob11, pos1);
        map1.spawnMonsterOnGroundBelow(mob12, pos1);

        var map2 = em.getMapFactoryMap(200090010);
        var pos2 = new java.awt.Point(339, 148);

        var mob21 = em.getMonster(8150000);
        mob21.getStats().setChange(true);
        mob21.setForcedMobStat(170);
        var mob22 = em.getMonster(8150000);
        mob22.getStats().setChange(true);
        mob22.setForcedMobStat(17);
        map2.spawnMonsterOnGroundBelow(mob21, pos2);
        map2.spawnMonsterOnGroundBelow(mob22, pos2);

        em.setProperty("haveBalrog", "true");
        em.sendBatShipEffect(200090000, 1034);
        em.sendBatShipEffect(200090010, 1034);
    }
}

function cancelSchedule() {
}