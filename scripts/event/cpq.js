var exitMap = 0;
var waitingMap = 1;
var reviveMap = 2;
var fieldMap = 3;
var winnerMap = 4;
var loserMap = 5;

function init() {}

function monsterValue(eim, mobId) {
    return 1;
}

function setup(mapid) {
    var map = parseInt(mapid);
    var eim = em.newInstance("cpq" + mapid);
    eim.setInstanceMap(980000000); // <exit>
    eim.setInstanceMap(map);
    eim.setInstanceMap(map + 2);
    eim.setInstanceMap(map + 1).resetFully();
    eim.setInstanceMap(map + 3);
    eim.setInstanceMap(map + 4);
    eim.setProperty("forfeit", "false");
    eim.setProperty("blue", "-1");
    eim.setProperty("red", "-1");
    var portal = eim.getMapInstance(reviveMap).getPortal("pt00");
    portal.setScriptName("MCrevive1");
    //em.schedule("timeOut", 30 * 60000);
    eim.setProperty("started", "false");
    return eim;
}

/*
 * 參加事件人員
 */
function playerEntry(eim, player) {
    var map = eim.getMapInstance(waitingMap);
    player.changeMap(map, map.getPortal(0));
}

/*
 * 嘉年華副本定時器
 */
function registerCarnivalParty(eim, carnivalParty) {
    if (eim.getProperty("red").equals("-1")) {
        eim.setProperty("red", carnivalParty.getLeader().getId() + "");
        // display message about recieving invites for next 3 minutes;
        //eim.restartEventTimer(180000);
          eim.schedule("end", 3 * 60 * 1000); // 3 minutes
        //eim.startEventTimer(2 * 60 * 1000);
    } else {
        eim.setProperty("blue", carnivalParty.getLeader().getId() + "");
        //eim.restartEventTimer(10000);
        eim.schedule("start", 10000);
    }
}

/*
 * 組員死亡後
 */
function playerDead(eim, player) {}

/*
 * 剩下的隊伍
 */
function leftParty(eim, player) {
    disbandParty(eim);
}

/*
 * 解散隊伍後
 */
function disbandParty(eim) {
    //if (eim.getProperty("started").equals("true")) {
    //    warpOut(eim);
    //} else {
    disposeAll(eim);
    //}
}

/*
 * 處理全部
 */
function disposeAll(eim) {
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        var player = iter.next();
        eim.unregisterPlayer(player);
        player.changeMap(eim.getMapInstance(exitMap), eim.getMapInstance(exitMap).getPortal(0));
        //player.getCarnivalParty().removeMember(player);
    }
    eim.dispose();
}

/*
 * 玩家退出
 */
function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    //player.getCarnivalParty().removeMember(player);
    player.changeMap(eim.getMapInstance(exitMap), eim.getMapInstance(exitMap).getPortal(0));
    eim.disposeIfPlayerBelow(0, 0);
}

/*
 * 玩家離線
 */
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    //player.getCarnivalParty().removeMember(player);
    player.getMap().removePlayer(player);
    player.setMap(eim.getMapInstance(exitMap));
    eim.disposeIfPlayerBelow(0, 0);
}

/*
 * 得到組隊
 */
function getParty(eim, property) {
    var chr = em.getChannelServer().getPlayerStorage().getCharacterById(parseInt(eim.getProperty(property)));
    if (chr == null) {
        eim.broadcastPlayerMsg(5, "The leader of the party " + property + " was not found.");
        disposeAll(eim);
        return null;
    } else {
        return chr.getCarnivalParty();
    }
}

/*
 * 事件開始
 */
function start(eim) {
    eim.setProperty("started", "true");
    eim.startEventTimer(10 * 60 * 1000);
    getParty(eim, "blue").warp(eim.getMapInstance(fieldMap), "blue00");
    getParty(eim, "red").warp(eim.getMapInstance(fieldMap), "red00");
}

/*
 * 殺死怪物後
 */
function monsterKilled(eim, chr, cp) {
    chr.getCarnivalParty().addCP(chr, cp);
    chr.CPUpdate(false, chr.getAvailableCP(), chr.getTotalCP(), 0);
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        iter.next().CPUpdate(true, chr.getCarnivalParty().getAvailableCP(), chr.getCarnivalParty().getTotalCP(), chr.getCarnivalParty().getTeam());
    }
}

/*
 * 怪物數值
 */
function monsterValue(eim, mobId) {
    return 0;
}

/*
 * 事件結束
 */
function end(eim) {
    if (!eim.getProperty("started").equals("true")) {
        disposeAll(eim);
    }
}

/*
 * 傳送離開
 */
function warpOut(eim) {
    if (!eim.getProperty("started").equals("true")) {
        if (eim.getProperty("blue").equals("-1")) {
            disposeAll(eim);
        }
    } else {
        var blueParty = getParty(eim, "blue");
        var redParty = getParty(eim, "red");
        if (blueParty.isWinner()) {
            blueParty.warp(eim.getMapInstance(winnerMap), 0);
            redParty.warp(eim.getMapInstance(loserMap), 0);
        } else {
            redParty.warp(eim.getMapInstance(winnerMap), 0);
            blueParty.warp(eim.getMapInstance(loserMap), 0);
        }
        eim.disposeIfPlayerBelow(100, 0);
    }
}

/*
 * 雙方勝利 失敗 後 傳入地圖
 */
function scheduledTimeout(eim) {
    eim.stopEventTimer();
    if (!eim.getProperty("started").equals("true")) {
        if (eim.getProperty("blue").equals("-1")) {
            disposeAll(eim);
        }
    } else {
        var blueParty = getParty(eim, "blue");
        var redParty = getParty(eim, "red");
        if (blueParty.getTotalCP() > redParty.getTotalCP()) {
            blueParty.setWinner(true);
        } else if (redParty.getTotalCP() > blueParty.getTotalCP()) {
            redParty.setWinner(true);
        }
        blueParty.displayMatchResult();
        redParty.displayMatchResult();
        eim.schedule("warpOut", 10000);
    }
}

/*
 * 玩家復活
 */
function playerRevive(eim, player) {
    player.getCarnivalParty().useCP(player, 10);
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
        iter.next().CPUpdate(true, player.getCarnivalParty().getAvailableCP(), player.getCarnivalParty().getTotalCP(), player.getCarnivalParty().getTeam());
    }
    player.changeMap(eim.getMapInstance(reviveMap), eim.getMapInstance(reviveMap).getPortal(0));
    return true;
}

/*
 * 組隊消失後
 */
function playerDisconnected(eim, player) {
    player.setMap(eim.getMapInstance(exitMap));
    eim.unregisterPlayer(player);
    player.getCarnivalParty().removeMember(player);
    eim.broadcastPlayerMsg(5, player.getName() + " has quit the Monster Carnival.");
    disposeAll(eim);
}

/*
 * 當地圖加載
 */
function onMapLoad(eim, chr) {
    if (!eim.getProperty("started").equals("true")) {
        disposeAll(eim);
    } else if (chr.getCarnivalParty().getTeam() == 0) {
        var blueParty = getParty(eim, "blue");
        chr.startMonsterCarnival(blueParty.getAvailableCP(), blueParty.getTotalCP());
    } else {
        var redParty = getParty(eim, "red");
        chr.startMonsterCarnival(redParty.getAvailableCP(), redParty.getTotalCP());
    }
}

function cancelSchedule() {}

function clearPQ(eim) {}

function allMonstersDead(eim) {}

function changedMap(eim, chr, mapid) {}