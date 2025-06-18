var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage3status = eim.getProperty("stage3status");

    if (stage3status == null) {
    if (cm.isLeader()) { // Leader
        var stage3leader = eim.getProperty("stage3leader");
        if (stage3leader == "done") {

        if (!cm.haveMonster(9500007)) { // Clear stage
            clear(1, eim, cm);
                    cm.warpParty(910340600, 0);
            cm.givePartyExp(2100, eim.getPlayers());
            cm.dispose();
        } else { // Not done yet
            cm.sendNext("請檢查地圖上是否還存在怪物，否則無法通過！");
        }
        cm.dispose();
        } else {
        cm.sendOk("你好，歡迎來到第5個階段，消滅BOSS，然後組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
        cm.spawnMobStats(9500007,1,1000000,1);
        eim.setProperty("stage3leader","done");
        cm.dispose();
        }
    } else { // Members
        cm.sendNext("你好，歡迎來到第5個階段，消滅BOSS，然後組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
        cm.dispose();
    }
    } else {
    cm.sendNext("恭喜你！ 你成功通過了第5階段！快點，向最後階段前進吧！");
    cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}