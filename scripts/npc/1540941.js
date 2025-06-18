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
            cm.sendOkS("這個傳送口有著奇妙的能量流動。通過這個傳送口，應該能到達其他地方。\r\n\r\n#b(請按下向上按鈕，進入傳送口。)#k");
            cm.dispose();
            break;
        case 1: //
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
