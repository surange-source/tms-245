/*
 Violet Balloon - LudiPQ Crack on the Wall NPC
 **/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == -1 && cm.isLeader()) {
        var eim = cm.getEventInstance();

        if (eim.getProperty("crackLeaderPreamble") == null) {
            eim.setProperty("crackLeaderPreamble", "done");
            cm.sendNext("這裡是最後一個階段; 消滅#b阿麗莎樂#k獲得#b次元的鑰匙#k,就能通過考驗,祝你好運!!");
            cm.dispose();
        } else {
            if (cm.haveItem(4001023)) {
                status = 0;
                cm.sendNext("恭喜你打敗了#b阿麗莎樂#k.現在就進入獎勵階段麼?");
            } else {
                cm.sendNext("請擊敗#b阿麗莎樂#k,並把#b次元的鑰匙#k交給我.");
                cm.dispose();
            }
        }
    } else if (status == -1 && !cm.isLeader()) {
        cm.sendNext("請擊敗#b阿麗莎樂#k,並把#b次元的鑰匙#k交給組隊長讓他帶給我!.!");
        cm.dispose();
    } else if (status == 0 && cm.isLeader()) {
        var eim = cm.getEventInstance();
        clear(9, eim, cm);
        cm.gainItem(4001023, -1);
        var players = eim.getPlayers();
        cm.givePartyExp_PQ(70, 1.0, players);
        eim.setProperty("cleared", "true"); //set determine
        eim.restartEventTimer(60000);
        var bonusmap = cm.getMap(922011100);
        for (var i = 0; i < players.size(); i++) {
            players.get(i).changeMap(bonusmap, bonusmap.getPortal(0));
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}

function clear(stage, eim) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}
