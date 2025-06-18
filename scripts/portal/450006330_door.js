function enter(pi) {
    if (pi.getLevel() < 235) {
        pi.showProgressMessageFont("僅235等級以上才可進入該地區。", 3, 20, 20, 0);
    } else if (pi.isQuestFinished(34269)) {
        pi.warp(450007000, 2);
    }
}