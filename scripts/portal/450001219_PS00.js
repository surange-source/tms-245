function enter(pi) {
    if (!pi.isQuestFinished(34119) && !pi.isQuestActive(34119)) {
        return;
    }
    if (pi.isQuestFinished(34119)) {
        pi.warp(450001230, 1);
    } else if (pi.isQuestActive(34119)) {
        pi.warp(450001340, 0);
    }
}