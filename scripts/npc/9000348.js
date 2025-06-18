var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("看來你還不想離開這裡..");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你是否想要現在就離開這裡了,回到弓箭手村？");
    } else if (status == 1) {
        cm.warp(100000000, 0);
        cm.dispose();
    }
}
