function enter(pi) {
    if (!pi.isQuestFinished(34118)) {
        return;
    }
    pi.warp(450001219, 1);
    if (!pi.isQuestFinished(34119) && !pi.isQuestActive(34119)) {
        pi.forceStartQuest(34119);
    }
}