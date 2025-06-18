/*  
 *  
 *  功能：普通殘暴炎魔
 *  
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.殘暴炎魔;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(partyLevel, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("BossZakum_NORMAL");
    eim.setInstanceMap(280030100).resetFully();
    
    if (EventConfig.EventTime != null) {
        eim.startEventTimer(EventConfig.EventTime);
    }
    if (EventConfig.EventReviveCount != null && EventConfig.EventReviveCount > 0) {
        eim.setReviveCount(EventConfig.EventReviveCount);
    }    
    return eim;
}

function playerEntry(eim, player) {
    if( eim.isLeader(player) && !player.haveItem(4001017,1)){
        player.openNpc(0,"獲得火焰之眼");
        player.dropMessage(6, "火焰之眼交給隊長了，去擊敗炎魔吧!!");
    }
    
    var map = eim.getMapInstance(0);
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid != 280030100) {
        eim.unregisterPlayer(player);

        if (eim.disposeIfPlayerBelow(0, 0)) {
            eim.dispose();
            em.setProperty("leader", "true");
            em.setProperty("state", "0");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function scheduledTimeout(eim) {
    end(eim);
}

function monsterValue(eim, mobId) {
    if (eim.getMapInstance(0).getMonsterById(8800002) == null) {
        for(i=0;i<20;i++){
            eim.getMapInstance(0).killMonster(8800000+i);
        }
        eim.broadcastPlayerMsg(6, "擊殺炎魔!!");
    }
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        eim.dispose();
        em.setProperty("leader", "true");
        em.setProperty("state", "0");
    }
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 211042300);
    eim.dispose();
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    em.setProperty("zakSummoned", "0");
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
    eim.restartEventTimer(1 * 60 * 1000);
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
