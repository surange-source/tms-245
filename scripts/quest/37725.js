function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.updateOneQuestInfo(37700, "21", "h0");
    qm.updateOneQuestInfo(37700, "22", "h0");
    qm.updateOneQuestInfo(37700, "23", "h0");
    qm.updateOneQuestInfo(37700, "80", "h0");
    qm.updateOneQuestInfo(37700, "03", "h1");
    qm.updateOneQuestInfo(37700, "04", "h1");
    qm.updateOneQuestInfo(37700, "05", "h1");
    qm.updateOneQuestInfo(37700, "27", "h1");
    qm.updateOneQuestInfo(37700, "28", "h1");
    qm.warp(450015060, 6);
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(37700, "28", "h0");
    qm.dispose();
}