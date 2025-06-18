function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.canHold(1143105)) {
        qm.gainItem(1143105, 1);
        qm.forceCompleteQuest();
    } else {
        qm.topMsg("請把裝備欄空出一格");
    }
    qm.dispose();
}