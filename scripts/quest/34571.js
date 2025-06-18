function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
    qm.warp(450007100);
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "30", "h0");
    qm.dispose();
}