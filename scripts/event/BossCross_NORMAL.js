//自定義復活次數
try{load("scripts_custom/config/BossStatus.js");}catch(e){load("scripts/config/BossStatus.js");}
var reviveCount = 5;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossCross_NORMAL");
    var map = eim.setInstanceMap(806300500); //設置活動腳本的地圖
    map.resetFully(false); //重置地圖
    map.setSpawns(false);
    //載入BOSS自訂數值        
    BossStatu = Boss("Cross_normal",em);
    var mob = em.getMonster(BossStatu.ID);
    mob.getStats().setHp(BossStatu.HP);
    mob.getStats().setMp(BossStatu.MP);
    mob.getStats().setPhysicalAttack(BossStatu.PAD);
    mob.getStats().setMagicAttack(BossStatu.MAD);
    mob.getStats().setPDRate(BossStatu.PDRate);
    mob.getStats().setMDRate(BossStatu.MDRate);
    mob.getStats().setLevel(BossStatu.LEVEL); 
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(304, -393));
    eim.startEventTimer(3600000);
    return eim;
}

function playerEntry(eim, player) {
    player.restReviveCount();
    var map = eim.getMapInstance(0);
    player.setReviveCount(reviveCount);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != 806300500) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 806300400);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function allMonstersDead(eim) {
    var state = em.getProperty("state");
    if (state.equals("1")) {
        em.setProperty("state", "2");
    } else if (state.equals("2")) {
        em.setProperty("state", "3");
    }
}

function playerRevive(eim, player) {
    if (player.getEventReviveCount() > 0) {
        return false;
    }
    var map = eim.getMapFactoryMap(806300400);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}
function leftParty(eim, player) {
}
function disbandParty(eim) {
}
function playerDead(eim, player) {
}
function cancelSchedule() {
}
function pickUpItem(eim, player, itemID) {
}
function monsterDamaged(eim, player, mobid, damage) {
}
function monsterKilled(eim, player, cp) {
}
