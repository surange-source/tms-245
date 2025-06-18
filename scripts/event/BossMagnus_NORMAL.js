/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：梅格耐斯[普通] Level:130  NORMAL
 *  401060200 - 暴君城堡 - 暴君之王座
 *  @Author Kent 
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.梅格耐斯;

function init() {        
    em.setProperty("leader", "true");
    em.setProperty("state", "0");
}

function setup(eim, leaderid) {
    em.setProperty("leader", "true");
    em.setProperty("state", "1");
    var eim = em.newInstance("BossMagnus_NORMAL");
    var map = eim.setInstanceMap(401060200);
    map.resetFully();
    map.killAllMonsters(false);
        
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
    eim.setProperty("HPstate", "1");
    eim.schedule("summonFall", 5000);
    eim.schedule("checkChrHP", 2000);
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    player.changeMap(map, map.getPortal(0));
    //player.openNpc(9310136,"jiance");
}

function playerRevive(eim, player) {
    if (player.getEventReviveCount() > 0) {
        return false;
    }
    var map = eim.getMapFactoryMap(401060000);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 401060000);
    eim.dispose();
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    
}

function changedMap(eim, player, mapid) {
    if (mapid != 401060200) {
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

function monsterValue(eim, mobId) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        eim.dispose();
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function end(eim) {
    if (eim.disposeIfPlayerBelow(100, 401060000)) {
        eim.dispose();
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
    
    eim.setProperty("HPstate", "-1");
}

function leftParty(eim, player) {
}
function disbandParty(eim) {
}
function playerDead(eim, player) {
}
function cancelSchedule() {
}

function summonFall(eim) {
    var state = parseInt(eim.getProperty("HPstate"));
    var time = 4500;
    if (state > 0) {
        var map = eim.getMapInstance(0);
        map.obtacleFall(2 * state + 1, 1, 8);
        eim.schedule("summonFall", time);
    }
}

function checkChrHP(eim) {
    var state = parseInt(eim.getProperty("HPstate"));
    if (state > 0) {
        var map = eim.getMapInstance(0);
        var mob = map.getMonsterById(8880010);
        if (mob != null) {
            for (i = 0; i < eim.getPlayers().size(); i++) {
                mob.checkMobZone(eim.getPlayers().get(i), true);
            }
            eim.schedule("checkChrHP", 2000);
        }
    }
}
function monsterDamaged(eim, player, mobid, damage) {
}
function monsterKilled(eim, player, cp) {
}
