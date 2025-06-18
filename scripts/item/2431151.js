/* global im */

function start() {
    if (im.isQuestActive(30004)) {
        im.forceCompleteQuest(30004);
        im.dispose();
        im.warp(910700000, 0);
    } else {
        im.playerMessage("無法使用卷軸。");
        im.dispose();
    }
}