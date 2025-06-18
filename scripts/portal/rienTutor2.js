function enter(pi) {
    if (pi.getQuestStatus(21011) == 2) {
        pi.playPortalSE();
        pi.warp(140090300, 1);
    } else {
        pi.playerMessage(5, "你必須完成任務後，才能進入下一個地圖！");
    }
}
