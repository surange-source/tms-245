try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.戴米安;

function init() {
    em.setProperty("state", "0");
    em.setProperty("state1", "0");
    em.setProperty("leader", "true");
}

function setup(level,eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("state1", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossDemian_HARD");
    var map = eim.setInstanceMap(350160240);
    map.resetFully();
    eim.schedule("beginQuest", 1000);
    eim.schedule("pf", 1000 * 60 * 3);
    
    eim.schedule("summonFall", 5000);    
    eim.setProperty("HPstate", "1");
    
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
        return false;
    }
    var map = eim.getMapFactoryMap(105300303);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid != 350160240) {
        eim.unregisterPlayer(player);

        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("state1", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobid) {
    if ( mobid==8950000 || mobid==8880110 || mobid==8880111 )
        eim.schedule("monsterSpawn", 1000);
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function clearPQ(eim) {
    end(eim);
}

function pf(eim) {
    if (em.getProperty("state1").equals("1")==true){
        em.setProperty("state1", "2");
        eim.schedule("pf", 1000 * 60 * 3);
    } else if (em.getProperty("state1").equals("2")==true){
        em.setProperty("state1", "3");
        eim.schedule("pf", 1000 * 60 * 6);
    } else if (em.getProperty("state1").equals("3")==true){
        em.setProperty("state1", "4");
    }
}


function end(eim) {
        var map = eim.getMapInstance(350160240);//setInstanceMap
        eim.disposeIfPlayerBelow(100, 100000000);
        em.setProperty("state", "0");
        em.setProperty("state1", "0");
        em.setProperty("leader", "true");
}

function monsterSpawn(eim) {
    var map = eim.getMapInstance(350160240);
    if (em.getProperty("state").equals("1")==true){
        var mob = em.getMonster(8950000);//怪物                 
        eim.registerMonster(mob);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(833,16)); //刷出這個
        
        map.startMapEffect("請盡快消滅X光線！戴米安將會出來覆仇！", 5120116);
        eim.schedule("summonFall", 5000);    
        eim.setProperty("HPstate", "1");
        em.setProperty("state", "2");
    } else if (em.getProperty("state").equals("2")==true) {
        for (var i = 0; i < 1; i++) {
            for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
                var mob = getMonster(monsterStatus, em);
                if( mob.getId()==8880110 ){
                    if (mob != null) {
                        if (map.getEvent() != null) {
                            map.getEvent().registerMonster(mob);
                        }
                        map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
                    }
                }
            }   
        }
        map.startMapEffect("戴米安的第一形態出現了", 5120116);

        eim.schedule("summonFall", 3000);    
        eim.setProperty("HPstate", "1");

        em.setProperty("state", "3");
    } else if (em.getProperty("state").equals("3")==true) {
        for (var i = 0; i < 1; i++) {
            for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
                var mob = getMonster(monsterStatus, em);
                if( mob.getId()==8880111 ){
                    if (mob != null) {
                        if (map.getEvent() != null) {
                            map.getEvent().registerMonster(mob);
                        }
                        map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
                    }
                }
            }   
        }
        map.startMapEffect("戴米安的最終形態出現了!!!!!!!!", 5120116);
        eim.schedule("summonFall", 1500);    
        eim.setProperty("HPstate", "1");

        em.setProperty("state", "4");
    } else if (em.getProperty("state").equals("4")==true) {
        //map.startMapEffect("[伟大的勇者，你是英雄的骄傲~你可以自动传送回市场/也可以从左边离开~", 5120116);
        eim.schedule("likai", 1000 * 120);
        map.broadcastMessage(em.getClock(120));
    }
}

function allMonstersDead(eim) {
    eim.setProperty("HPstate", "-1");
}

function beginQuest(eim) {
    var map = eim.getMapInstance(350160240);
    em.getMapFactory().getMap(350160240).startMapEffect("10秒後:將出現巨大X光線將出現!請盡快消滅他！戴米安將會出來覆仇", 5120116);
    eim.schedule("monsterSpawn", 9000);
}



function likai(eim) {
    var map = eim.getMapInstance(350160240);
    eim.disposeIfPlayerBelow(100, 100000000);
    em.setProperty("state", "0");
    em.setProperty("state1", "0");
    em.setProperty("leader", "true");
}


function summonFall(eim) {//
    var state = parseInt(eim.getProperty("HPstate"));
    var time = 3000;
    if (state > 0) {
        var map = eim.getMapInstance(0);
        map.obtacleFall(5 * state + 1, 1, 8);//暴君地圖特效
        map.obtacleFall(3, 0x30, 0x33);//史烏地圖特效
        eim.schedule("summonFall", time);
    }
}


function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerDead(eim, player) {}

function cancelSchedule() {}
function monsterDrop(eim, player, mob) { }
function pickUpItem(eim, player, itemID) {}
function monsterDamaged(eim, player, mobid, damage) {
}
