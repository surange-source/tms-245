function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendYesNo("親愛的#r "+cm.getPlayer().getName()+"#k 玩家你好\r\n\r\n請在這裡收集 #r30個#k #v4000194#後來找我。");
        } else if (status == 1) {
           if (cm.haveItem(4000194,30)) {
               cm.warp(701010322,0);
               cm.gainItem(4000194,-30)
               cm.dispose();
           } else {
               cm.sendOk("你確定有你 40個 黑羊毛？");
               cm.dispose();
           }
       }
    }
}