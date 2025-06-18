function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(34271, "31", "h1");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34271, "30", "h0");
    qm.dispose();
}