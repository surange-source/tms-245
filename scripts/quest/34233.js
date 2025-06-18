function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(34245, "71", "h1");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}