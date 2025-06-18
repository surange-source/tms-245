var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage1status = eim.getProperty("stage1status");

    if (stage1status == null) {
    if (cm.isLeader()) { // Leader
        var stage1leader = eim.getProperty("stage1leader");
        if (stage1leader == "done") {

        if (cm.haveItem(4001007, 30)) { // Clear stage
                eim.setProperty("1stageclear",1);
            cm.sendNext("恭喜你！ 你成功通過了第1階段！快點，向第2階段前進吧！");
            cm.gainItem(4001007, -30);
            clear(1, eim, cm);
            cm.givePartyExp(2100, eim.getPlayers());
            cm.dispose();
        } else { // Not done yet
            cm.sendNext("確定你帶來了 #r30 張證書卡#k 了嗎？ 請檢查一下你的背包~");
        }
        cm.dispose();
        } else {
        cm.sendOk("你好，歡迎來到第一個階段，在這裡你可能會考到很多凶狠的鱷魚，打倒凶狠的鱷魚獲取相應數目的證書卡交給我，就行了。你們把證書卡全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
        eim.setProperty("stage1leader","done");
        cm.dispose();
        }
    } else { // Members
        cm.sendNext("你好，歡迎來到第一個階段，在這裡你可能會考到很多凶狠的鱷魚，打倒凶狠的鱷魚獲取相應數目的證書卡交給我，就行了。你們把證書卡全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
        cm.dispose();
    }
    } else {
    cm.sendNext("恭喜你！ 你成功通過了第1階段！快點，向第2階段前進吧！");
    cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}