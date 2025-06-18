try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.頓凱爾;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossDunkel_NORMAL");
    var map = eim.setInstanceMap(450012210); //設置活動腳本的地圖
    map.resetFully(false); //重置地圖
    map.setSpawns(false);
    
    addFirstMonsters(eim);
    em.setProperty('ZhaoHuan', '1');
    eim.schedule('summonMob', 1000 );
    
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
    return eim;
}

function addFirstMonsters(d) {
    var f = new java.util.Random();
    var e = f.nextInt(2) + 2;
    var b = d.getMapInstance(450012210);
    b.showWeatherEffectNotice('親衛隊長敦凱爾：有我和我的軍團存在的一天，就不會讓偉大的那一位動一根手指！ ', 272, 5000);
    for (var c = 0; c < e; c++) {
        var a = f.nextInt(100);
        var g = 0;
        if (f.nextInt(100) > 50) {
            g = 8644618;
        } else {
            g = 8644619;
        }
        var monster = em.getMonster(g);
        var changeStats = monster.getForcedMobStat();
        if (changeStats == null) {
            monster.setForcedMobStat(monster.getStats());
            changeStats = monster.getForcedMobStat();
        }
        monster.changeHP(300000000);
        changeStats.setWatk(10000);
        changeStats.setMatk(10000);
        changeStats.setAcc(500000);
        changeStats.setSpeed(300);
        changeStats.setLevel(235);
        monster.setForcedMobStat(changeStats);
        
        d.registerMonster(monster);
        var b = d.getMapInstance(450012210);
        b.spawnMonsterOnGroundBelow(monster, new java.awt.Point(a, 29));
    }
    var h = f.nextInt(3) + 2;
    if (em.getProperty('ZhaoHuan')==1) {
        addMonsterTask = em.schedule('addFirstMonsters', 1000 * 5 * h, d);
    }
}

function summonMob(a) {
    var b;
    b = a.getMapInstance(450012210);
    var c = 8220022;
    if (em.getProperty('ZhaoHuan')==1) {
        a.schedule('summonMob', 1000 * 20);
    }
}

function playerEntry(eim, player) {
    player.restReviveCount();
    var map = eim.getMapInstance(0);
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != 450012210) {
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
    eim.disposeIfPlayerBelow(100, 450012200);
    eim.dispose();
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
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
    var map = eim.getMapFactoryMap(450012200);
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
    if (cp == 8645039) {
        player.getMap().killMonster(8645067);
        em.setProperty('ZhaoHuan', '0');
    }
}
