try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.巴洛古;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    // Setup the instance when invoked, EG : start PQ
    var eim = em.newInstance("BossBalrog_EASY");
    eim.setInstanceMap(105100400).resetFully();
    var map = eim.getMapInstance(0);
    
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

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    player.changeMap(map, map.getPortal(0));
    /*eim.applyBuff(player, 2022536);
    if (player.haveItem(1302014)) {
        eim.applyBuff(player, 2022537);
    }*/
}

function changedMap(eim, player, mapid) {
    if (mapid != 105100400 ) {
        playerExit(eim, player);
    }
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    //player.dispelBuff(2022536);
    //player.dispelBuff(2022537);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        eim.dispose();
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function scheduledTimeout(eim) {
    end(eim);
}

function allMonstersDead(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        party.get(i).forceCompleteQuest(2241);
        party.get(i).forceCompleteQuest(2242);
        party.get(i).forceCompleteQuest(2243);
        party.get(i).forceCompleteQuest(2244);
        party.get(i).forceCompleteQuest(2245);
    }
}


function playerDead(eim, player) {
    // Happens when player dies
}

function playerRevive(eim, player) {
    // Happens when player's revived.
    // @Param : returns true/false
    return false;
}

function playerDisconnected(eim, player) {
    return 0;
    // return 0 - Deregister player normally Dispose instance if there are zero player left
    // return x that is > 0 - Deregister player normally + Dispose instance if there x player or below
    // return x that is < 0 - Deregister player normally + Dispose instance if there x player or below, if it's leader = boot all
}

function monsterValue(eim, mobid) {
    // Invoked when a monster that's registered has been killed
    // return x amount for this player - "Saved Points"
    if (eim.getMapInstance(0).getMonsterById(8830007) == null) {
        eim.getMapInstance(0).killMonster(8830008);
        eim.getMapInstance(0).killMonster(8830009);
        eim.broadcastPlayerMsg(6, "擊敗巴洛古!!");
        eim.getMapInstance(0).changeEnvironment("balog/clear/stone", 3);
    }
    return 1;
}

function leftParty(eim, player) {
    // Happens when a player left the party
}

function disbandParty(eim, player) {
    // Happens when the party is disbanded by the leader.
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 105100100);
    eim.dispose();
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    end(eim);
}

function removePlayer(eim, player) {
    // Happens when the funtion NPCConversationalManager.removePlayerFromInstance() is invoked
}

function registerCarnivalParty(eim, carnivalparty) {
    // Happens when carnival PQ is started. - Unused for now.
}

function onMapLoad(eim, player) {
    // Happens when player change map - Unused for now.
}

function cancelSchedule() {
}
function pickUpItem(eim, player, itemID) {
}
function monsterDamaged(eim, player, mobid, damage) {
}
