function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(37700, "03", "h0");
    qm.updateOneQuestInfo(37700, "05", "h0");
    qm.updateOneQuestInfo(37700, "06", "h1");
    qm.updateOneQuestInfo(37700, "07", "h1");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}