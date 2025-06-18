/*
 * 商城NPC
 */
var status;

function start() {
    status = -1;
    cm.sendSimpleS("請選擇需要的功能：\r\n#L1##b進入#b商城#k#l\r\n#L2##b打開#b拍賣NPC#k#l\r\n", 2);
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

    switch (selection) {
        case 1: //
            cm.dispose();//這是結束腳本，請按照實際情況使用
            cm.enterCS();
            break;
        case 2:
            cm.dispose();//這是結束腳本，請按照實際情況使用
            cm.openNpc(9310362);
            break;
        case 3:
            cm.dispose();
            break;
    }
}
