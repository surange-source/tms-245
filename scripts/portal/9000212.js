function start() {
    cm.sendYesNo("你確定要離開這裡到外面去嗎？\r\n請慎重");
}

function action(mode, type, selection) {
    if (mode == 1) {
        cm.warp(910000000);
    }
    cm.dispose();
}