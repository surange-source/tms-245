function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
    qm.updateOneQuestInfo(34271, "28", "h1");
    qm.updateOneQuestInfo(34271, "29", "h1");
    qm.updateOneQuestInfo(34271, "53", "h1");
    qm.updateOneQuestInfo(34271, "54", "h1");
    qm.warp(450006240);
}