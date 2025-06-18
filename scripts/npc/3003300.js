function start() {
    if (cm.getLevel() < 225) {
        cm.showProgressMessageFont("僅225等級以上才可進入該地區。", 3, 20, 20, 0);
        cm.dispose();
        return;
    } else if (!cm.isQuestFinished(34450)) {
        cm.showProgressMessageFont("※ 執行「[阿爾卡娜] 再見，惡夢的都市」任務後才可進入。", 3, 20, 20, 0);
        cm.dispose();
        return;
    }
    cm.sendYesNo("#b（要現在立刻搭乘飛魚前往阿爾卡娜嗎？）");
}

function action(mode, type, selection) {
    cm.dispose();
    if (mode == 1) {
        if (!cm.isQuestFinished(34451)) {
            cm.warp(450005015);
        } else {
            cm.warp(450005010, 1);
        }
    }
}