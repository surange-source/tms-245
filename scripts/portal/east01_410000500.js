function enter(pi) {
    if (pi.getLevel() < 265) {
        pi.showProgressMessageFont("僅265等級以上才可進入該地區。", 3, 20, 20, 0);
    } else {
        pi.warp(410000800, 4);
    }
}