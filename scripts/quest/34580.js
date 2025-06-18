function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(34560, "51", "h0");
    qm.updateOneQuestInfo(34560, "54", "h2");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "54", "h0");
    qm.dispose();
    qm.warp(450007040, 1);
}