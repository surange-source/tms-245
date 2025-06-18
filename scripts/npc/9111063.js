var status = -1;

function start() {
    cm.sendYesNo("要前往弓箭手村嗎？");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.warp(100000000);
    }
    cm.dispose();
}
