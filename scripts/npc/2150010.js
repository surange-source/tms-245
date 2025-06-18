var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("看來你不太喜歡到陌生的地方去旅行。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你想到埃德爾斯坦去？費用是800楓幣……想去的話，就快點上來。");
    } else if (status == 1) {
        if (cm.getMeso() < 800) {
            cm.sendNext("嗯……你確定自己有#b800#k楓幣嗎？請你打開背包確認一下。不夠的話，就先去吧錢湊齊。");
        } else {
            cm.gainMeso(-800);
            cm.warp(310000010,0);
        }
        cm.dispose(); 
    }
}
