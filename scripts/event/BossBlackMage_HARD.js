try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.黑魔法師;

var mapIds = [
    450013000,
    450013100,
    450013200,
    450013300,
    450013400,
    450013500,
    450013600,
    450013700
];

var random = new java.util.Random();
function init() {
    em.setProperty("state", "0");
    em.setProperty("state1", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    var eim = em.newInstance("BossBlackMage_HARD");
    for (var i = 0; i < mapIds.length; i++) {
        var map = eim.setInstanceMap(mapIds[i]);
        map.resetPQ(level);
        map.resetFully();
        map.killAllMonsters(true);
    }
    if (EventConfig.EventTime != null) {
        eim.startEventTimer(EventConfig.EventTime);
    }
    if (EventConfig.EventReviveCount != null && EventConfig.EventReviveCount > 0) {
        eim.setReviveCount(EventConfig.EventReviveCount);
    }
    
    startOnePart(eim);
    return eim;
}

function playerEntry(eim, player) {
    
    player.restReviveCount();
    
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    if (player.getEventReviveCount() > 0) {
        return false;
    }
    var map = eim.getMapFactoryMap(450012500);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    var isEventMap = false;
    for (var i = 0; i < mapIds.length; i++) {
        if( mapid==mapIds[i]){
            isEventMap = true;
        }
    }
    if(!isEventMap){
        eim.unregisterPlayer(player);
    }    
    
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("state1", "0");
        em.setProperty("leader", "true");
    }
    
    
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    var map = eim.getMapInstance(1);
    if ( mobId==8880500 ){
        em.setProperty("state1", parseInt(em.getProperty("state1"))+1);
    }
    if ( mobId==8880501 ){
        em.setProperty("state1", parseInt(em.getProperty("state1"))+1);
    }
    
    if ( parseInt(em.getProperty("state1"))==2 && parseInt(em.getProperty("state"))==1 ){
        var map2 = eim.getMapInstance(mapIds[2]);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).changeMap(map2, map2.getPortal(0));
        }
        em.setProperty("state", "2");
        startTwoPart(eim);
    }
    
    if ( mobId==8880502 ){
        var map3 = eim.getMapInstance(mapIds[4]);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).changeMap(map3, map3.getPortal(0));
        }
        em.setProperty("state", "3");
        startThreePart(eim);
    }
    
    if ( mobId==8880503 ){
        var map4 = eim.getMapInstance(mapIds[6]);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).changeMap(map4, map4.getPortal(0));
        }
        em.setProperty("state", "4");
        startFourPart(eim);
    }
    
    
    
    
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}


function allMonstersDead(eim) {
    /*
    eim.broadcastPlayerMsg(11,'怪物死光');
    var state = parseInt( em.getProperty("state") );
    switch (state) {
        case 1:
            eim.broadcastPlayerMsg(11,'怪物死光1');
            var map2 = eim.getMapInstance(mapIds[2]);
            for (var i = 0; i < eim.getPlayerCount(); i++) {
                eim.getPlayers().get(i).changeMap(map2, map2.getPortal(0));
            }
            em.setProperty("state", "2");
            startTwoPart(eim);
            break;
        case 2:
            var map3 = eim.getMapInstance(mapIds[4]);
            for (var i = 0; i < eim.getPlayerCount(); i++) {
                eim.getPlayers().get(i).changeMap(map3, map3.getPortal(0));
            }
            em.setProperty("state", "3");
            startThreePart(eim);
            break;
        case 3:
            var map4 = eim.getMapInstance(mapIds[6]);
            for (var i = 0; i < eim.getPlayerCount(); i++) {
                eim.getPlayers().get(i).changeMap(map4, map4.getPortal(0));
            }
            em.setProperty("state", "4");
            startFourPart(eim);
            break;
    }
    */
}

function leftParty(eim, player) {
}

function disbandParty(eim) {
}

function playerDead(eim, player) {
}

function cancelSchedule() {
}

function monsterDrop(eim, player, mob) {
}

function pickUpItem(eim, player, itemID) {
}


function startOnePart(eim) {
    var map = eim.getMapInstance(1);
    for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, em);
        //mob.disableSpawnRevives();
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }    
    
}

function startTwoPart(eim) {
    var map = eim.getMapInstance(3);
    for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, em);
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }    
}

function startThreePart(eim) {
    var map = eim.getMapInstance(5);
    for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, em);
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }    
}

function startFourPart(eim) {
    var map = eim.getMapInstance(7);
    for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, em);
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }    
}
