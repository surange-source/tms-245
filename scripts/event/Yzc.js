/* 
 * 金豬寶藏
 */
function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    //副本實例
    var eim = em.newInstance("Yzc");
    //統計副本擊殺怪物數量
    eim.setProperty("pigcount", 0);
    //兔子次數控制
    eim.setProperty("rabbits", 0);
    //時間計時器
    eim.setProperty("times", 0);
    var map = eim.setInstanceMap(866010454);
    map.resetFully();
    eim.getMapFactoryMap(866010454).killAllMonsters(false);
    //生成一隻被保護的豬
    var mob = em.getMonster(9302000);
    var hprand = 30000000;
    mob.getStats().setHp(hprand);
    mob.getStats().setMp(200000);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0,82)); //刷出這個怪物
    spawnMonster(eim);
    map.spawnNpc(9300006, new java.awt.Point(670,82));
    eim.startEventTimer(1000 * 60 * 10); // 10 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    map.startMapEffect("一定要好好保護金豬！如果不小心殺死了金豬，任務就失敗了！", 5120026);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid != 866010454) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
        return ;
    }
}

function spawnMonster(eim) {
    var map = eim.getMapInstance(0);
    var mob = null;
    var xPoint = Array(-700,-550, -400, -250, -100, 50, 200, 350, 500, 650);
    var hprand = 3000000;
    for(var i=0;i < 10; i++) {
        mob = em.getMonster(5250003);
        mob.getStats().setHp(hprand);
        mob.getStats().setMp(mob.getMobMaxMp() * 10);
        mob.disableDrops();
        eim.registerMonster(mob);
        var x = xPoint[i];
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(x,82)); //刷出這個怪物
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    return 0;
}

function monsterValue(eim, mobId) {
    if (em.getProperty("state")==1) {
        if (eim.getMapInstance(0).getAllMonstersThreadsafe().size() == 1) {
            allMonstersDead(eim);
        }
        var count = 1*eim.getProperty("pigcount");
        count++;
        eim.setProperty("pigcount", count);
        if (mobId == 9302000) {
            eim.startEventTimer(1000 * 10); // 10 min
            for (var i = 0; i < eim.getPlayerCount(); i++) {
                eim.getPlayers().get(i).dropMessage(1,"你打死了金豬，保衛金豬失敗！");
                eim.schedule("OUT", 1000*8);
            }
            return;
        }
    }
    return 1;
}

function monsterKilled(eim, player, cp) {
}

function monsterDamaged(eim, player, mobid, damage) {
}

function OUT(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
}
function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}
function scheduledTimeout(eim) {
    if (em.getProperty("state")!=2) {
        var map = eim.getMapInstance(0);
        em.setProperty("state", "2");
        map.killAllMonsters(true);
        eim.startEventTimer(1000 * 60 * 1); // 10 min
        //em.set
        //eim.disposeIfPlayerBelow(100, 910000000);
        map.startMapEffect("恭喜你成功守衛了金豬，去找蔣老闆領取額外的獎勵吧！", 5120026);
        em.setProperty("leader", "true");
    } else {
        em.setProperty("state", "0");
        eim.disposeIfPlayerBelow(100, 910000000);
    }
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}

function monsterDrop(eim,player,mob){
    
}

function allMonstersDead(eim) {
    var map = eim.getMapInstance(0);
    //eim.getMapFactory().getMap(866010454).killAllMonsters(false);
    spawnMonster(eim);
    //}
}

function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}