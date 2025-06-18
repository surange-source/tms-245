function start() {
    if (!cm.isQuestFinished(34218)) {
        cm.dispose();
        return;
    } else if (cm.getLevel() < 220) {
        cm.showProgressMessageFont("僅220等級以上才可進入該地區。", 3, 20, 20, 0);
        cm.dispose();
        return;
    }
    cm.sendYesNo("#b武藤#k…現在吃飽了…#b要讓他移動嗎#k…？\r\n\r\n（武藤讓開時, 會跟著奧術之河前往至下個地區。）");
}

function action(mode, type, selection) {
    cm.dispose();
    if (mode == 1) {
        cm.warp(450003000);
    }
}