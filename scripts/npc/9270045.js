function start() {
    cm.sendYesNo("你是否想離開這裡?");
}

function action(mode, type, selection) {
        if (mode == 1) {
        cm.warp(541020700,6);
    }
    cm.dispose();
}
