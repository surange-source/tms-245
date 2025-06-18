function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "49", "h0");
    qm.updateOneQuestInfo(34560, "52", "h0");
    qm.dispose();
}