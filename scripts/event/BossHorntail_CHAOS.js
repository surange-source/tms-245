/*  
 *  
 *  功能：進階闇黑龍王
 *  
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.闇黑龍王;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("preheadCheck", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossHorntail_CHAOS");
    eim.setInstanceMap(240060001).resetFully();
    eim.setInstanceMap(240060101).resetFully(); 
    eim.setInstanceMap(240060201).resetFully();
    
    if (EventConfig.EventTime != null) {
        eim.startEventTimer(EventConfig.EventTime);
    }
    if (EventConfig.EventReviveCount != null && EventConfig.EventReviveCount > 0) {
        eim.setReviveCount(EventConfig.EventReviveCount);
    }
    
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {

    var mob;
    switch (mapid) {
        case 240060001:
            if (em.getProperty("state").equals("1") && em.getProperty("preheadCheck").equals("1")) {
                //em.setProperty("state", "2");
                em.setProperty("preheadCheck", "2");
                
                mob = em.getMonster(8810128);
                eim.registerMonster(mob);
                eim.setInstanceMap(240060001).spawnMonsterOnGroundBelow(mob, new java.awt.Point(940, 230));
            }
            break;
        case 240060101:
            if (em.getProperty("state").equals("2") && em.getProperty("preheadCheck").equals("2")) {
                //em.setProperty("state", "2");
                em.setProperty("preheadCheck", "3");
                
                mob = em.getMonster(8810129);                
                eim.registerMonster(mob);
                eim.setInstanceMap(240060101).spawnMonsterOnGroundBelow(mob, new java.awt.Point(-400, 230));
            }
            break;
    }
    if (mapid != 240060001 && mapid != 240060101 && mapid != 240060201) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            eim.dispose();
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 240050400);
    eim.dispose();
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        eim.dispose();
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function allMonstersDead(eim) {
}

function playerRevive(eim, player) {
    return false;
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