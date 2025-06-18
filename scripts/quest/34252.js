function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34271, "21", "h0");
    qm.updateOneQuestInfo(34271, "23", "h1");
    qm.dispose();
    qm.warp(450006110, 1);
}