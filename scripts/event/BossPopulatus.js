/*  
 *  
 *  功能：拉圖斯
 *  
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.拉圖斯;

function init() {
    em.setProperty("leader", "true");
    em.setProperty("state", "0");
}

function setup(eim) {
    em.setProperty("leader", "true");
    em.setProperty("state", "1");
    var eim = em.newInstance("Populatus");
    var map = eim.setInstanceMap(220080001);
    map.resetFully();
    
    if (EventConfig.EventTime != null) {
        eim.startEventTimer(EventConfig.EventTime);
    }
    
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid != 220080001) {
        eim.unregisterPlayer(player);
        if (eim.getPlayerCount() <= 0) {
            if (em.getProperty("state").equals("2")) {
                em.getMapFactoryMap(220080000).resetReactors();
            }
        }
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        if (em.getProperty("state").equals("2")) {
            em.getMapFactoryMap(220080000).resetReactors();
        }
    }
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function end(eim) {
    if (em.getProperty("state").equals("2")) {
        em.getMapFactoryMap(220080000).resetReactors();
    }
    if (eim.disposeIfPlayerBelow(100, 220080000)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
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