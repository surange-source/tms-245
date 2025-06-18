/*  
 *  
 *  功能：血腥女王 Normal
 *  
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.血腥皇后;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state0", "1");
    em.setProperty("stage", "1");
    em.setProperty("leader", "true");
    
    var eim = em.newInstance("BossBloody_NORMAL");
    eim.setProperty("BloodyState", "1");
    
    var map = eim.setInstanceMap(105200310);
    map.resetFully();
    eim.getMapFactoryMap(105200310).killAllMonsters(false);
    
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
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    player.changeMap(map, map.getPortal(0))
}

function changedMap(eim, player, mapid) {
    if (mapid != 105200310) {
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
    eim.disposeIfPlayerBelow(100, 105200000);
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
    var map = eim.getMapFactoryMap(105200000);
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
