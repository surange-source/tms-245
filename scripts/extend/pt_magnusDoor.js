var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    if (status < -1) {
        cm.dispose();
    } else if (status == 0) {
        cm.askYesNoS("你想離開這裡嗎？？");
    } else if (status == 1) {
        var map;
        if (cm.getMapId() == 401060300) {
            map = 401060399;
        } else {
            map = 401060000;
        }
        cm.warp(map, 0);
        cm.dispose();
    }
}
