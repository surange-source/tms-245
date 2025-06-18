/*
 玩具城組隊任務NPC
 **/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage1status = eim.getProperty("stage1status");

    if (stage1status == null) {
        if (cm.isLeader()) { // 隊長開始階段
            var stage1leader = eim.getProperty("stage1leader");
            if (stage1leader == "done") {

                if (cm.getMap().getAllMonster().size() == 0 && cm.haveItem(4001022, 20)) { // 判斷怪物是否全部消滅。
                    cm.sendNext("你們已經成功完成了第一階段,趕快向第二階段前進吧。");
                    cm.removeAll(4001022);
                    clear(1, eim, cm);
                    cm.givePartyExp(2100, eim.getPlayers());
                    cm.dispose();
                } else {
                    cm.sendNext("消滅了所有的老鼠並且帶來#b20#k張通行證才可以進入第二階段。請檢查一下你的背包~");
                }
                cm.dispose();
            } else {
                cm.sendOk("歡迎來到第1階段,看看周圍,是不是有很多#r老鼠#k請消滅它們並且帶來20張#b通行證給我#k,如果你成功拿到了1張通行證，請交給你們的組長，然後再轉交給我。");
                eim.setProperty("stage1leader", "done");
                cm.dispose();
            }
        } else { // 開始階段
            cm.sendNext("歡迎來到第1階段,看看周圍,是不是有很多#r老鼠#k請消滅它們並且帶來20張#b通行證給我#k,如果你成功拿到了1張通行證，請交給你們的組長，然後再轉交給我。");
            cm.dispose();
        }
    } else {
        cm.sendNext("你們已經成功完成了第一階段,趕快向第二階段前進吧。");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status", "clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}
