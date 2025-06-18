/* 
 * 天狗（进击的女帝丶修改）
 */
try{load("scripts_custom/config/BossStatus.js");}catch(e){load("scripts/config/BossStatus.js");}

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("tiangou_NORMAL");
    var map = eim.setInstanceMap(800024500);
    map.resetFully();
    eim.getMapFactory().getMap(800024500).killAllMonsters(false);
    //載入BOSS自訂數值        
    BossStatu = Boss("Tiangou",em);
    var mob = em.getMonster(BossStatu.ID);
    mob.getStats().setHp(BossStatu.HP);
    mob.getStats().setMp(BossStatu.MP);
    mob.getStats().setPhysicalAttack(BossStatu.PAD);
    mob.getStats().setMagicAttack(BossStatu.MAD);
    mob.getStats().setPDRate(BossStatu.PDRate);
    mob.getStats().setMDRate(BossStatu.MDRate);
    mob.getStats().setLevel(BossStatu.LEVEL); 
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(675, -28));
    eim.startEventTimer(1000 * 60 * 60); // 30 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != 800024500) {
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
    eim.disposeIfPlayerBelow(100, 910000000);
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
    return false;
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}
function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}
function monsterDrop(eim, player, mob) {}