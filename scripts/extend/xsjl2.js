var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
    cm.dispose();
    return;
    }
    if (mode == 1)
    status++;
    else
    status--;
    if (status == 0) {
    cm.sendOk("#e#r你已經領取過了,去市場看看吧.點擊下方拍賣,看不到需要把遊戲設置分辨率調高,或者輸入@PM");
    cm.dispose();
    }
}