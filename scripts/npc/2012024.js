/*
    Egnet - Before Takeoff To Ariant(200000152)
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
    status++;
    } else {
    cm.sendOk("船在過一會兒就要開了!請耐心等待吧!");
    cm.safeDispose();
    return;
    }
    if (status == 0) {
    cm.sendYesNo("你想離開這裡嗎？？");
    } else if (status == 1) {
    cm.warp(200000151);
    cm.dispose();
    }
}
