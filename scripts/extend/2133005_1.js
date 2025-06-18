function start() {
    cm.sendYesNo("如果你現在離開，你將不得不重新開始。你確定要離開這裡到外面去嗎？");
}

function action(mode, type, selection) {
    if (mode == 1) {
        cm.warp(300030300);
    }
    cm.dispose();
}