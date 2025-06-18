/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：怪物公園
 *  @Author Kent 
 */
var minPlayers = 1;

function init() {
}

function setup(cid, mapid) {
    var eim = em.newInstance("MonsterPark" + cid);
    var map = parseInt(mapid);
    eim.setProperty("boss", "0");
    eim.setProperty("mobIds", "0");
    for (var i = 0; i < 6; i++) {
        eim.createInstanceMap(map + (i * 100)).resetFully();
        eim.setProperty("map" + i, "" + (map + (i * 100)));
    }
    eim.startEventTimer(600000);
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    for (var i = 0; i < 6; i++) {
        if (mapid == parseInt(eim.getProperty("map" + i))) {
            return;
        }
    }
    eim.unregisterPlayer(player);

    eim.disposeIfPlayerBelow(0, 0);
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId, mapid) {
    for (var i = 0; i < 6; i++) {
        var mapo = eim.getMapInstance(i);
        eim.setProperty("mobIds", parseInt(eim.getProperty("mobIds")) + 1);
        var exp = eim.getProperty("mobIds") * (parseInt(eim.getProperty("map" + i)) - 953990000) * 20;
        eim.updateOneInfo(15180, "exp", exp.toString());
        var sExp = "";
        while (exp > 0) {
            var n = parseInt(exp % 1000);
            if (parseInt(exp / 1000) > 0) {
                if (n < 10) {
                    n = "00" + n;
                } else if (n < 100) {
                    n = "0" + n;
                } else {
                    n = n.toString();
                }
            }
            sExp = n + "," + sExp;
            exp = parseInt(exp / 1000);
        }
        if (sExp != "") {
            mapo.startMapEffect("經驗值獎勵 " + sExp.substring(0, sExp.length - 1) + " 累積！", 5120162);
        }
    }
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    eim.disposeIfPlayerBelow(0, 0);
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 951000000);
}

function clearPQ(eim) {
    end(eim);
}

function leftParty(eim, player) {
    end(eim);
}

function disbandParty(eim) {
    end(eim);
}