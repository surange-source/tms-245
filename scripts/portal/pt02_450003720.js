function enter(pi) {
    pi.warp(450003100, 0);
    if (pi.isQuestActive(34302)) {
        pi.forceCompleteQuest(34302);
    }
}