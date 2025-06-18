function start() {
    if (!cm.isQuestFinished(34478)) {
        cm.dispose();
        return;
    } else if (cm.getLevel() < 230) {
        cm.showProgressMessageFont("僅230等級以上才可進入該地區。", 3, 20, 20, 0);
        cm.dispose();
        return;
    } else if (!cm.isQuestFinished(34249)) {
        cm.dispose();
        return;
    }
    cm.sendYesNo("#b（要現在立刻搭乘飛魚前往魔菈斯嗎？）");
}

function action(mode, type, selection) {
    cm.dispose();
    if (mode == 1) {
        cm.warp(450006000, 1);
    }
}