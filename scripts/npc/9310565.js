var status;

function start() {
    status = -1;
    cm.sendYesNo("你要移動至不夜城上海嗎？");
}

function action(mode, type, selection) {

    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            cm.warp(701102000, 3);
            cm.dispose();
            break;
        case 1: //
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
