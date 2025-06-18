function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(qm.getQuest(), "flower", "5");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.forceStartQuest(37713);
    qm.updateOneQuestInfo(37700, "08", "h0");
    qm.updateOneQuestInfo(37700, "09", "h0");
    qm.updateOneQuestInfo(37700, "10", "h1");
    qm.updateOneQuestInfo(37700, "11", "h1");
    qm.dispose();
}