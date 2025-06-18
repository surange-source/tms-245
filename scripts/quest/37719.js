function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(37700, "15", "h0");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(37700, "16", "h1");
    qm.updateOneQuestInfo(37700, "17", "h1");
    qm.dispose();
}