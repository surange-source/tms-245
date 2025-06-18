function enter(pi) {
    if (pi.getLevel() < 215) {
        pi.showProgressMessageFont("僅215等級以上才可進入該地區。", 3, 20, 20, 0);
    } else if (!pi.isQuestFinished(37702)) {
        pi.showProgressMessageFont("※ 執行「[嚼嚼] 咆哮的菇菇樹林」任務後才可進入。", 3, 20, 20, 0);
        if (!pi.isQuestFinished(37701) && pi.getQuestInfo(37700, "26") != "h1") {
            pi.updateOneQuestInfo(37700, "26", "h1");
        }
    } else {
        pi.warp(450015020, 0);
    }
}