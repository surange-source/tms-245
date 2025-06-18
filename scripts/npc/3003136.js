var status = -1;

function start() {
    if (!cm.isQuestFinished(34113)) {
        cm.dispose();
        return;
    }
    cm.sendNext("#b(火焰鳥心情看起來好像很好，很爽快地要讓你搭在他背上。)");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendYesNo("#b(接受時會搭乘火焰鳥移動至安息的洞窟。)");
    } else if (status == 1) {
        cm.warp(450001200, 2);
        cm.dispose();
    }
}