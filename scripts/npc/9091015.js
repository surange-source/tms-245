var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.getPlayer().getMapId() != 450012210) {
        cm.dispose();
        return;
    }
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
        cm.sendYesNo("你想離開這裡嗎？？");
    } else if (status == 1) {
        cm.warp(450012200, 0);
        cm.dispose();
    }
}
