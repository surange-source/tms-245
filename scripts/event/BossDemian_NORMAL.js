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
    var eim = em.newInstance("BossDemian_NORMAL");
    var map = eim.setInstanceMap(350160140);
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
    if (mapid != 350160140) {
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

function openNpc(eim, npcid, mode) {
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).openNpc(npcid, mode);
    }
}
function monsterValue(eim, mobid) {
    // Invoked when a monster that's registered has been killed
    // return x amount for this player - "Saved Points"
    //if (em.getProperty("balrogState").equals("1") && eim.getMapInstance(0).getMonsterById(8830000) == null) {
    //    eim.getMapInstance(0).killMonster(8830001);
    //    eim.getMapInstance(0).killMonster(8830002);
    //}
    if ( mobid==8950000 || mobid==8880100 || mobid==8880101 )
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
            
        var map = eim.getMapInstance(350160140);//setInstanceMap
        eim.disposeIfPlayerBelow(100, 100000000);
        em.setProperty("state", "0");
        em.setProperty("state1", "0");
        em.setProperty("leader", "true");
}

function monsterSpawn(eim) {
    var map = eim.getMapInstance(350160140);
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
                if( mob.getId()==8880100 ){
                    if (mob != null) {
                        if (map.getEvent() != null) {
                            map.getEvent().registerMonster(mob);
                        }
                        map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
                    }
                }
            }   
        }
        map.startMapEffect("戴米安的第一形態出現了！", 5120116);
        
        eim.schedule("summonFall", 3000);    
        eim.setProperty("HPstate", "1");
        
        em.setProperty("state", "3");
    } else if (em.getProperty("state").equals("3")==true) {
        for (var i = 0; i < 1; i++) {
            for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
                var mob = getMonster(monsterStatus, em);
                if( mob.getId()==8880101 ){
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

        //eim.getMapInstance(0).spawnNpc(9000056, new java.awt.Point(734, 17));
        em.setProperty("state", "4");
    } else if (em.getProperty("state").equals("4")==true) {
        map.startMapEffect("[偉大的勇者，你是英雄的驕傲~你可以自動傳送回市場/也可以從左邊離開~", 5120116);
        eim.schedule("likai", 1000 * 120);
        map.broadcastMessage(em.getClock(120));
        //em.getMapFactory().getMap(350160140).startSimpleMapEffect("1分鐘中後將關閉次元世界，請盡快領取點擊NPC領取獎勵後退出",5120093);
    }
}

function allMonstersDead(eim) {
    eim.setProperty("HPstate", "-1");
    
}

function beginQuest(eim) {
    var map = eim.getMapInstance(350160140);
    em.getMapFactory().getMap(350160140).startMapEffect("10秒後:將出現巨大X光線將出現!請盡快消滅他！戴米安將會出來覆仇", 5120116);
    eim.schedule("monsterSpawn", 9000);
}



function likai(eim) {
    var map = eim.getMapInstance(350160140);
    eim.disposeIfPlayerBelow(100, 100000000);
    em.setProperty("state", "0");
    em.setProperty("state1", "0");
    em.setProperty("leader", "true");
}


function summonFall(eim) {//
    var state = parseInt(eim.getProperty("HPstate"));
    var time = 3000;
    if (state > 0) {
        
    var mobid = Array(8950103, 8950104, 8950105, 8950107);

    var map;
    map = eim.getMapInstance(0);
    var mob1 = em.getMonster(mobid[0]);
    mob1.setStance(2);
    var mob2 = em.getMonster(mobid[1]);
    var mob3 = em.getMonster(mobid[2]);
    var mob4 = em.getMonster(mobid[3]);
    mob4.setStance(2);
    if ( (map.countMonsterById(mobid[0])+map.countMonsterById(mobid[1])+map.countMonsterById(mobid[2])+map.countMonsterById(mobid[3])) < 2) {
        map.spawnMonsterWithEffect(mob1, -2, new java.awt.Point(226, 27));
        map.spawnMonsterWithEffect(mob2, -2, new java.awt.Point(226, 27));
        map.spawnMonsterWithEffect(mob3, -2, new java.awt.Point(1321,27));
        map.spawnMonsterWithEffect(mob4, -2, new java.awt.Point(1321,27));        
    }

        var map = eim.getMapInstance(0);
        map.obtacleFall(8, 1, 8);//暴君地圖特效
        //map.obtacleFall(3, 0x30, 0x33);//斯烏地圖特效
        eim.schedule("summonFall", time);
    }
}


function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerDead(eim, player) {}

function cancelSchedule() {}
function monsterDrop(eim, player, mob) { }
function pickUpItem(eim, player, itemID) {}
function monsterKilled(eim, player, mobID) {
    // 可留空，主要處理怪物死亡後的邏輯代碼
}