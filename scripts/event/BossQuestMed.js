var eventmapid = 932100003;
var returnmap = 910002000;

var monster = new Array(
        4130103, // Rombot
        9300039, // Papa Pixie
        9300119, // Lord Pirate
        9300152, // Angry Frankenroid
        9400549, // Headless Horseman
        9300028, // Ergoth
        8180000, // Manon
        8180001, // Griffey
        8220003, // Leviathan
        8210011, // Ani (Second Tower)
        9400014, // Black Crow
        8500001 // Papulatus
        );

/*  Old List:
 4130103, // Rombot
 9300039, // Papa Pixie
 9300119, // Lord Pirate
 9300152, // Angry Franken Lloyd
 9400549, // Headless Horseman
 9300028, // Ergoth
 8180000, // Manon
 8180001, // Griffey
 9500392, // Ravana HARD
 8220003, // Lev
 8210011, // Ani (Second Tower)
 9400014, // Black Crow
 8500001 // Papulatus
 */

function init() {
// After loading, ChannelServer
}

function setup(partyid) {
    var instanceName = "BossQuest" + partyid;

    var eim = em.newInstance(instanceName);
    // If there are more than 1 map for this, you'll need to do mapid + instancename
    var map = eim.createInstanceMapS(eventmapid);
    map.toggleDrops();
    map.spawnNpc(9000207, -772, -11);

    eim.setProperty("points", 0);
    eim.setProperty("monster_number", 0);

    beginQuest(eim);
    return eim;
}

function beginQuest(eim) { // Custom function
    if (eim != null) {
        eim.startEventTimer(5000); // After 5 seconds -> scheduledTimeout()
    }
}

function monsterSpawn(eim) { // Custom function
    var monsterid = monster[parseInt(eim.getProperty("monster_number"))];
    var mob = em.getMonster(monsterid);

    switch (monsterid) {
        case 8180000:
        case 8180001: //Manon Griffey
            mob.getStats().setHp(mob.getMobMaxHp() * 2);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.5);
            break;
        case 4130103: // Rombot
            mob.getStats().setHp(mob.getMobMaxHp() * 6);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.5);
            break;
        case 8220003: // Lev
            mob.getStats().setHp(mob.getMobMaxHp() * 2);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.5);
            break;
        case 9300119: // Lord Pirate
        case 9300152: // Angry Frankenlloyd
        case 9400549: // Headless Horseman
            mob.getStats().setHp(mob.getMobMaxHp() * 2);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.5);
            break;
        case 9500392: // Ravana HARD
        case 9300028: // Ergoth
            mob.getStats().setHp(mob.getMobMaxHp() * 2);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.5);
            break;
        case 8500001: // Papulatus
            mob.getStats().setHp(mob.getMobMaxHp() * 2.5);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.5);
            break;
        case 9400014: // Black Crow
        case 9300039: // Papa Pixie
            mob.getStats().setHp(mob.getMobMaxHp() * 1.4);
            mob.getStats().setMp(mob.getMobMaxMp() * 1.4);
            break;
        case 8210011: // Ani 2
            mob.getStats().setHp(mob.getMobMaxHp() * 1.2);
            mob.getStats().setMp(mob.getMobMaxMp() * 0.8);
            break;
    }
    eim.registerMonster(mob);

    var map = eim.getMapInstance(0);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-378, -11));
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != eventmapid) {
        eim.unregisterPlayer(player);

        eim.disposeIfPlayerBelow(0, 0);
    }
}

function scheduledTimeout(eim) {
    var num = parseInt(eim.getProperty("monster_number"));
    if (num < monster.length) {
        monsterSpawn(eim);
        eim.setProperty("monster_number", num + 1);
    } else {
        eim.disposeIfPlayerBelow(100, returnmap);
    }
// When event timeout..

// restartEventTimer(long time)
// stopEventTimer()
// startEventTimer(long time)
// isTimerStarted()
}

function allMonstersDead(eim) {
    eim.restartEventTimer(3000);

    var mobnum = parseInt(eim.getProperty("monster_number"));
    var num = mobnum * 75; // Total 5850
    var totalp = parseInt(eim.getProperty("points")) + num;

    eim.setProperty("points", totalp);

    eim.broadcastPlayerMsg(5, "獲得了" + num + " 點數!當前共有 " + totalp + "點.");

    eim.saveBossQuest(num);

    if (mobnum < monster.length) {
        eim.broadcastPlayerMsg(6, "請準備,下一個BOSS即將出現!");
    } else {
        eim.saveBossQuest(2500);
        eim.broadcastPlayerMsg(5, "你的隊伍通過了簡單模式獲得了額外的2500點數!");

    }
// When invoking unregisterMonster(MapleMonster mob) OR killed
// Happens only when size = 0
}

function playerDead(eim, player) {
// Happens when player dies
}

function playerRevive(eim, player) {
    return true;
// Happens when player's revived.
// @Param : returns true/false
}

function playerDisconnected(eim, player) {
    return 0;
// return 0 - Deregister player normally + Dispose instance if there are zero player left
// return x that is > 0 - Deregister player normally + Dispose instance if there x player or below
// return x that is < 0 - Deregister player normally + Dispose instance if there x player or below, if it's leader = boot all
}

function monsterValue(eim, mobid) {
    return 0;
// Invoked when a monster that's registered has been killed
// return x amount for this player - "Saved Points"
}

function leftParty(eim, player) {
    // Happens when a player left the party
    eim.unregisterPlayer(player);

    var map = em.getMapFactoryMap(returnmap);
    player.changeMap(map, map.getPortal(0));

    eim.disposeIfPlayerBelow(0, 0);
}

function disbandParty(eim, player) {
    // Boot whole party and end
    eim.disposeIfPlayerBelow(100, returnmap);
}

function clearPQ(eim) {
// Happens when the function EventInstanceManager.finishPQ() is invoked by NPC/Reactor script
}

function removePlayer(eim, player) {
    eim.dispose();
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