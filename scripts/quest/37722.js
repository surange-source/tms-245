function start(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.forceCompleteQuest(37723);
    qm.forceCompleteQuest(37724);
    qm.updateOneQuestInfo(37700, "16", "h0");
    qm.updateOneQuestInfo(37700, "19", "h0");
    qm.updateOneQuestInfo(37700, "20", "h0");
    qm.updateOneQuestInfo(37700, "29", "h0");
    qm.updateOneQuestInfo(37700, "21", "h1");
    qm.updateOneQuestInfo(37700, "22", "h1");
    qm.updateOneQuestInfo(37700, "23", "h1");
    qm.updateOneQuestInfo(37700, "80", "h1");
    qm.warp(450015270, 0);
    qm.dispose();
}