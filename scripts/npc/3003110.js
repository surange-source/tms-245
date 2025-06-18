var status = -1;

function start() {
    if (!cm.isQuestFinished(34107)) {
        cm.dispose();
        return;
    }
    cm.sendYesNo("…我正要前往消滅的火焰地帶…如果你不介意我也可以載你一程…\r\n\r\n#b（接受時會搭船移動至忘卻湖。）");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendNext("…那麼，要出發了…");
    } else if (status == 1) {
        cm.warp(450001105, 1);
        cm.dispose();
    }
}