function enter(pi) {
    if (pi.getLevel() < 205) {
        pi.showProgressMessageFont("僅205等級以上才可進入該地區。", 3, 20, 20, 0);
    } else if (!pi.isQuestFinished(37601)) {
        pi.showProgressMessageFont("※ 執行「[反轉城市] 順著河水留下來的物品」任務後才可進入。", 3, 20, 20, 0);
    } else {
        pi.warp(450001002, 0);
    }
}