function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.forceCompleteQuest(34235);
    qm.forceCompleteQuest(34236);
    qm.dispose();
}