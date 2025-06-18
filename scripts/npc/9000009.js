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
    cm.sendOk("我丟失了藏寶圖,它在維多利亞島的某個位子~~~");
    cm.dispose();
    }
}
