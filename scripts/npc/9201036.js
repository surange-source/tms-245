var status;

function start() {
    status = -1;
    action(1, 0, 0);
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
            cm.sendOk("需要我幫忙嗎？\r\n#b#L0##b我想查看結婚禮物。#l#k");
            break;
        case 1: //
            if (!cm.isMarried()) {
                cm.sendOk("只有結婚的夫妻才能查看收到的結婚禮物，想收到結婚禮物的話，先去結婚吧？");
            } else {
                //打開禮物箱查看收到的禮物
            }
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
