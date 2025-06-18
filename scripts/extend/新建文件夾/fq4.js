var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage2status = eim.getProperty("stage2status");

    if (stage2status == null) {
    if (cm.isLeader()) { // Leader
        var stage2leader = eim.getProperty("stage2leader");
        if (stage2leader == "done") {

        if (cm.haveItem(4001008, 1)) { // Clear stage
                eim.setProperty("4stageclear",1);
            cm.sendNext("恭喜你！ 你成功通過了第4階段！快點，向第5階段前進吧！");
            cm.gainItem(4001008, -13);
            clear(1, eim, cm);
            cm.givePartyExp(2100, eim.getPlayers());
            cm.dispose();
        } else { // Not done yet
            cm.sendNext("確定你帶來了 #r10 張通行證#k 了嗎？ 請檢查一下你的背包~");
        }
        cm.dispose();
        } else {
        cm.sendOk("你好，歡迎來到第4階段，到處走走，可能會發現很多兇猛的怪物，打敗它們，獲取通行證#r10#k張，再把他們交給我。記住，怪物可能比你強大很多，請小心一點，祝你通過這一關。");
        eim.setProperty("stage2leader","done");
        cm.dispose();
        }
    } else { // Members
        cm.sendNext("歡迎來到第4階段，在地圖上走走，你就會看見許多兇猛的怪物，打敗他們獲取他們身上的通行證#r10#k張，交給你們的組隊長。");
        cm.dispose();
    }
    } else {
    cm.sendNext("恭喜你！ 你成功通過了第4階段！快點，向第5階段前進吧！");
    cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}