function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(34271, "21", "h1");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34271, "20", "h0");
    qm.dispose();
}