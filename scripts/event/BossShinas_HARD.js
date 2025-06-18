/*  
 *  
 *  功能：西格諾斯
 *  
 */

try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.西格諾斯;


function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossShinas_HARD");
    
    var map1 = eim.setInstanceMap(271040100);
    var map2 = eim.setInstanceMap(271040200);
    var map3 = eim.setInstanceMap(271040300);
    map1.resetFully();
    map2.resetFully();
    map3.resetFully();
    map1.killAllMonsters(false);
    map2.killAllMonsters(false);
    map3.killAllMonsters(false);
    
    for each(monsterStatus in EventConfig.Monsters[map1.getId()]) {
        var mob = getMonster(monsterStatus, em);
        if (mob != null) {
            if (map1.getEvent() != null) {
                map1.getEvent().registerMonster(mob);
            }
            map1.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }    
    
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
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    if (player.getEventReviveCount() > 0) {
        var map = eim.getMapFactoryMap(271040200);
        player.changeMap(map, map.getPortal(0));
        return true;
    }
    var map = eim.getMapFactoryMap(271040210);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 271040000);
    eim.dispose();
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function changedMap(eim, player, mapid) {
    if (mapid != 271040100 && mapid != 271040300 && mapid != 271040200) {
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

function openNpc(eim, npcid, mode) {
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).openNpc(npcid, mode);
    }
}
function monsterValue(eim, mobid) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.restReviveCount();
    if (eim.disposeIfPlayerBelow(0, 0)) {
        eim.dispose();
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function end(eim) {
    if (eim.disposeIfPlayerBelow(100, 271040000)) {
        eim.dispose();
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
function monsterKilled(eim, player, mobID) {
    // 可留空，主要处理怪物死亡后的逻辑代码
}