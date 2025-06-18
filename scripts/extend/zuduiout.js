var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("呵呵，好吧，你繼續玩吧。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            cm.sendYesNo("怎麼？這就想出去了？還有很多有趣的事情呢？");
    } else if (status == 1) {
        cm.sendNext("真沒耐心。如果你非要走的話，我也不會攔你。再見。");
    } else if (status == 2) {
        cm.warp(910340700,0);
        cm.dispose();
    }
}