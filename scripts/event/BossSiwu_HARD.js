/*  
 *  
 *  功能：史烏 BlackHeaven 困難模式
 *  
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.史烏;

var mobid = Array(8950003, 8950004, 8950005, 8950007);
var reviveCount = 5;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, partyid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossSiwu_HARD");
    var map = eim.setInstanceMap(350060700);
    eim.setInstanceMap(350060800);
    eim.setInstanceMap(350060900);
    map.resetFully();
    
    
    for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, em);
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }    
    
    if (EventConfig.EventTime != null) {
        eim.startEventTimer(EventConfig.EventTime);
    }
    if (EventConfig.EventReviveCount != null && EventConfig.EventReviveCount > 0) {
        eim.setReviveCount(EventConfig.EventReviveCount);
    }
    
    eim.setProperty("summom", "0");
    eim.schedule("summonMob", 2000);
    eim.schedule("summonFall", 4000);
    eim.setProperty("stop", "0");
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != 350060700 && mapid != 350060800 && mapid != 350060900) {
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
    eim.disposeIfPlayerBelow(100, 350060300);
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
    var state = em.getProperty("state");
    if (state.equals("1")) {
        em.setProperty("state", "2");
        eim.schedule("warpNext", 6700);
    } else if (state.equals("2")) {
        em.setProperty("state", "3");
        eim.schedule("warpNext", 4700);
    } else {
        eim.setProperty("stop", "1");
    }
    return 1;
}

function allMonstersDead(eim) {
    
}

function playerRevive(eim, player) {
    if (player.getEventReviveCount() > 0) {
        var map = player.getMap();
        for (i = 0; i < 4; i++) {
            map.killMonster(mobid[i]);
        }
        return false;
    }
    var map = eim.getMapFactoryMap(350060300);
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
function warpNext(eim) {
    var map;
    var state = parseInt(em.getProperty("state"));
    for (i = 0; i < eim.getPlayers().size(); i++) {
        map = eim.getMapInstance(state - 1);
        eim.getPlayers().get(i).changeMap(map, map.getPortal(0));        
    }
    eim.schedule("summonBoss", 0);
}

function summonBoss(eim){
    var state = parseInt(em.getProperty("state"));
    
    var map = eim.getMapInstance(state - 1);
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


function summonMob(eim) {
    
    var changeStats = null;
    
    var map;
    map = eim.getMapInstance(0);
    var mob1 = em.getMonster(mobid[0]);    
	//設經驗值
    changeStats = mob1.getForcedMobStat();
    if (changeStats == null) {
        mob1.setForcedMobStat(mob1.getStats());
        changeStats = mob1.getForcedMobStat();
    }
    changeStats.setExp(0);
    mob1.setForcedMobStat(changeStats);
    
    mob1.setStance(2);
    var mob2 = em.getMonster(mobid[1]);
	//設經驗值
    changeStats = mob2.getForcedMobStat();
    if (changeStats == null) {
        mob2.setForcedMobStat(mob2.getStats());
        changeStats = mob2.getForcedMobStat();
    }
    changeStats.setExp(0);
    mob2.setForcedMobStat(changeStats);
    
    var mob3 = em.getMonster(mobid[2]);
	//設經驗值
    changeStats = mob3.getForcedMobStat();
    if (changeStats == null) {
        mob3.setForcedMobStat(mob3.getStats());
        changeStats = mob3.getForcedMobStat();
    }
    changeStats.setExp(0);
    mob3.setForcedMobStat(changeStats);
    
    var mob4 = em.getMonster(mobid[3]);
	//設經驗值
    changeStats = mob4.getForcedMobStat();
    if (changeStats == null) {
        mob4.setForcedMobStat(mob4.getStats());
        changeStats = mob4.getForcedMobStat();
    }
    changeStats.setExp(0);
    mob4.setForcedMobStat(changeStats);
    
    mob4.setStance(2);
    if ((map.countMonsterById(mobid[0])+map.countMonsterById(mobid[1])+map.countMonsterById(mobid[2])+map.countMonsterById(mobid[3])) < 100) {
        map.spawnMonsterWithEffect(mob1, -2, new java.awt.Point(-404, -400));
        map.spawnMonsterWithEffect(mob2, -2, new java.awt.Point(423, -400));
        map.spawnMonsterWithEffect(mob3, -2, new java.awt.Point(505, -230));
        map.spawnMonsterWithEffect(mob4, -2, new java.awt.Point(-514, -230));
    }
    if (em.getProperty("state").equals("1")) {
        eim.schedule("summonMob", 6000);
    }
}


function summonFall(eim) {
    var stop = parseInt(eim.getProperty("stop"));
    if (stop == 0) {
        var state = parseInt(em.getProperty("state"));
        var map = eim.getMapInstance(state - 1);
        map.obtacleFall(3, 0x30, 0x33);
        eim.schedule("summonFall", 5000);
    }
}
function pickUpItem(eim, player, itemID) {
}
function monsterKilled(eim, player, cp) {
}
