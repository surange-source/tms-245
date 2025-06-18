function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if (mode == 0) {
        cm.sendOk("那就請加油!");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("你想離開這裡嗎？？");
    } else if (status == 1) {
        cm.warp(932200000, 0);
        cm.dispose();
    }
}