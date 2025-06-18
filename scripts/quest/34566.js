function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
    qm.warp(450007040, 3);
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "43", "h0");
    qm.dispose();
}