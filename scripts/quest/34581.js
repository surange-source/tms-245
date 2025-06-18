function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(34560, "31", "h0");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "55", "h0");
    qm.dispose();
}