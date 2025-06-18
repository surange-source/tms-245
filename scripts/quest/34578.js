function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "50", "h0");
    qm.updateOneQuestInfo(34560, "53", "h0");
    qm.updateOneQuestInfo(34560, "54", "h0");
    qm.dispose();
}