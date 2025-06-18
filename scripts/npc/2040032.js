/*
    Weaver - Ludibrium : Ludibrium Pet Walkway (220000006)
**/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
    cm.sendNext("唉…你現在沒有空嗎？好吧～那如果你改變想法了！隨時都可以來找我喔～！");
    cm.dispose();
    return;
    } else if (status >= 1 && mode == 0) {
    cm.dispose();
    return;
    }
    if (mode == 1)
    status++;
    else
    status--;
    if (status == 0) {
    cm.sendYesNo("在這裡可以和寵物一起散步，除了散步之外，也可以和寵物一起進行障礙物訓練。如果和寵物的關係不夠親密，寵物大概就不會聽你的話了！所以呀！？要不要再陪寵物做個訓練咧？");
    } else if (status == 1) {
    if (cm.haveItem(4031128)) {
        cm.sendNext("帶著信封，通過障礙物把信封給我弟弟將有好事情發生在你的寵物上喔。");
        cm.dispose();
    } else {
        cm.gainItem(4031128, 1);
        cm.sendOk("好了～來！這封信你收下，如果你這樣直接過去了，他一定不知道是我派去的人。你要帶著寵物一起越過障礙物，再到最上面去找弟弟#b#p2040033##k並且把信交給他。這個不會很困難的啦～加油吧！");
        cm.dispose();
    }
    }
}
