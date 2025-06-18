/*    
 *  
 *  功能：BOSS 闇黑龍王
 *  
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.闇黑龍王;

function init() {
    // 0 = Not started, 1 = started, 2 = first head defeated, 3 = second head defeated
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    em.setProperty("checkBossDead", "0");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("preheadCheck", "1");
    em.setProperty("leader", "true");
    em.setProperty("checkBossDead", "0");
    var eim = em.newInstance("BossHorntail_NORMAL");
    
    var map = eim.setInstanceMap(240060000).resetFully();
    var map = eim.setInstanceMap(240060100).resetFully();
    var map = eim.setInstanceMap(240060200).resetFully();
    
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
    
    switch (mapid) {
        case 240060000:            
            if (em.getProperty("state").equals("1") && em.getProperty("preheadCheck").equals("1")) {                
                em.setProperty("preheadCheck", "2");
                //em.setProperty("state", "2");
                var map = eim.getMapInstance(0);
                var mob = em.getMonster(8810024);
                map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(940, 230));
            }
            break;
        case 240060100:
            if (em.getProperty("state").equals("2") && em.getProperty("preheadCheck").equals("2")) { 
                em.setProperty("preheadCheck", "3");
                //em.setProperty("state", "3");
                var map = eim.getMapInstance(1);
                var mob = em.getMonster(8810025);
                map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-400, 230));
            }
            break;
    }
    
    if (mapid != 240060000 && mapid != 240060100 && mapid != 240060200) {
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
    switch(mobId){
        case 8810002:
        case 8810003:
        case 8810004:
        case 8810005:
        case 8810006:
        case 8810007:
        case 8810008:
        case 8810009:
            em.setProperty("checkBossDead", parseInt(em.getProperty("checkBossDead"))+1 );
            break;
    }
    /*
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1,parseInt(em.getProperty("checkBossDead")));
    }*/
    if( parseInt(em.getProperty("checkBossDead")) >= 8 ){
        var map = eim.getMapInstance(240060200);
        map.killAllMonsters(eim.getPlayers().get(0),true,true);
    }
    return 1;
}

function allMonstersDead(eim) {
}

function playerRevive(eim, player) {
    return false;
}

function clearPQ(eim) {
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