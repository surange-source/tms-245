function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(qm.getQuest(), "flower", "5");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(37700, "06", "h0");
    qm.updateOneQuestInfo(37700, "07", "h0");
    qm.updateOneQuestInfo(37700, "08", "h1");
    qm.updateOneQuestInfo(37700, "09", "h1");
    qm.dispose();
}