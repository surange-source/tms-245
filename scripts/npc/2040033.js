/*
    Neru - Ludibrium : Ludibrium Pet Walkway (220000006)
*/

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
    if (cm.haveItem(4031128)) {
        cm.sendNext("咦…這是我哥的信啊！大概又是說些我都不做事只知道玩的話吧？！…喔？哈哈～是我哥要你一路到這裡來訓練的呀？不錯～不錯～辛苦了！我幫你提高與寵物的親密度吧！");
    } else {
        cm.sendOk("我哥哥一直要我管理這些訓練寵物的障礙物設備…不過～既然我哥離我這麼遠，我就先去偷玩一下啦！…嘿嘿…反正我哥也不會知道～");
        cm.dispose();
    }
    } else if (status == 1) {
    if (cm.getPlayer().getNoPets() <= 0) {
        cm.sendNextPrev("嗯？你沒有召喚寵物啊");
        cm.dispose();
    } else {
        cm.gainItem(4031128, -1);
        cm.gainClosenessAll(4);
        cm.sendNextPrev("怎麼樣呀？有沒有覺得和寵物變親密了呢？下次有空要帶寵物多做一些障礙物訓練，但是，一定要先得到我哥的允許喔！");
        cm.dispose();
    }
    }
}