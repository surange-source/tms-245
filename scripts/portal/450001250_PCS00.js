function enter(pi) {
    if (!pi.isQuestFinished(34120)) {
        pi.teleportPortal(3, 0);
    } else if (pi.getLevel() < 210) {
        pi.teleportPortal(3, 0);
        pi.showProgressMessageFont("僅210等級以上才可進入該地區。", 3, 20, 20, 0);
    } else if (!pi.isQuestFinished(34200)) {
        pi.warp(450002201, 0);
    } else {
        pi.warp(450002015, 7);
    }
}