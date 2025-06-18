function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
    qm.warp(450007000);
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
    qm.updateOneQuestInfo(34560, "40", "h0");
}