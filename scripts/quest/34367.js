function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

var status = -1;
function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.sendYesNo("你是真正的惡夢破壞者呢。\r\n為了表彰你的功績，這裡準備了勳章。\r\n\r\n#b#v1143029# #t1143029#");
    } else if (status == i++) {
        if (!qm.isQuestFinished(34367)) {
            if (qm.canHold(1143029)) {
                qm.gainItem(1143029, 1);
            } else {
                qm.sendOk("請把裝備欄空出一格。");
                qm.dispose();
                return;
            }
        }
        qm.forceCompleteQuest();
        qm.dispose();
    } else {
        qm.dispose();
    }
}