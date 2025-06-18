/*
 Slyn - Before Takeoff To Orbis(260000110)
 */

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if (mode == 0) {
        cm.sendOk("船在過一會兒就要開了!請耐心等待吧!");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("你想離開這裡嗎？？");
    } else if (status == 1) {
        cm.warp(260000100, 0);
        cm.dispose();
    }
}