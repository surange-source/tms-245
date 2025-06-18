function start(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(37700, "00", "h0");
    qm.updateOneQuestInfo(37700, "81", "h0");
    qm.warp(450015060, 0);
    qm.updateOneQuestInfo(37700, "03", "h1");
    qm.updateOneQuestInfo(37700, "04", "h1");
    qm.updateOneQuestInfo(37700, "05", "h1");
    qm.dispose();
}