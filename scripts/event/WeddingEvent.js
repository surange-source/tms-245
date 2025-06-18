/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：西式婚禮
 *  @Author Kent 
 */
function init() {
    em.setProperty("leader", "true");
    em.setProperty("state", "0");
}

function setup(level, partyID) {
    em.setProperty("leader", "true");
    em.setProperty("state", "1");
    var eim = em.newInstance("WeddingEvent");
    eim.setProperty("done", "0");
    eim.setProperty("on", "0");
    eim.setProperty("partyID", partyID);
    var map = eim.setInstanceMap(680000210);
    map.resetFully();
    eim.setInstanceMap(680000300).resetFully();
    eim.setInstanceMap(680000400).resetFully();
    eim.setInstanceMap(680000401).resetFully();

    eim.startEventTimer(60 * 1000 * 20);
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
    if (mapid != 680000210 && mapid != 680000300 && mapid != 680000400 && mapid != 680000401) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
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
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function end(eim) {
    if (eim.disposeIfPlayerBelow(100, 680000500)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
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

function doWedding(eim) {
    var map = eim.getMapInstance(0);
    eim.setProperty("done", "1");
    var on = parseInt(eim.getProperty("on")) + 1;
    switch (on) {
        case 1:
            em.setProperty("state", "2");
            map.startMapEffect("今天，我們為了祝福兩位新人相聚於此。", 5121011, 5);
            break;
        case 2:
            map.startMapEffect("大家常說，天賜的姻緣是用漂漂豬的紅色緞帶連在一起的。", 5121011, 5);
            break;
        case 3:
            map.startMapEffect("在我看來，這兩位新人已經找到了自己緞帶相連的那一位。", 5121011, 5);
            break;
        case 4:
            map.startMapEffect("在茫茫人海中找到屬於自己的對方，說明兩位都是非常幸運的人。", 5121011, 5);
            break;
        case 5:
            map.startMapEffect("如何讓這個來之不易的緣分變成幸福，就是今後交給兩位的任務。", 5121011, 5);
            break;
        case 6:
            map.startMapEffect("新郎，你願意愛你的新娘，直到黑髮變為白雪人的毛那麼白嗎？", 5121011, 5);
            break;
        case 7:
            map.startMapEffect("新娘，你願意愛你的新郎，直到冰峰雪域融化為尼哈沙漠嗎？", 5121011, 5);
            break;
        case 8:
            map.startMapEffect("請在場的所有賓客，都為這兩位幸福的新人作證。", 5121011, 5);
            break;
        case 9:
            map.startMapEffect("在所有人的祝福聲中，我宣佈兩位年輕人結為夫妻。", 5121011, 5);
            break;
        case 10:
            eim.setProperty("done", "2");
            map.startMapEffect("新郎，可以吻你的新娘了。", 5121011, 30);
            eim.sendMarriedDone();
            break;
    }
    if (on < 10) {
        eim.setProperty("on", on);
        eim.schedule("doWedding", 5500);
    }
}