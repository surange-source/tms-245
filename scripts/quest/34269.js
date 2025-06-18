function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(34271, "36", "h1");
    qm.dispose();
    qm.warp(450006040);
}

function end(mode, type, selection) {
    if (!qm.isQuestFinished(34269)) {
        if (!qm.canHold(1712005, 1)) {
            qm.dropMessage(1, "請把裝備欄空出一格。");
            qm.dispose();
            return;
        }
        qm.gainItem(1712005, 1);
    }
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34271, "34", "h0");
    qm.dispose();
}