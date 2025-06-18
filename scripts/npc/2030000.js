/**
    Jeff - El Nath : El Nath : Ice Valley II (211040200)
**/

var status = 0;

function start() {
    if (cm.haveItem(4031450)) {
        cm.warp(921100100, 0);
        cm.dispose();
    } else {
        status = -1;
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (status == 1 && mode == 0 && cm.getPlayerStat("LVL") >= 50) {
        cm.sendNext("做一個冒險的決定很不容易的。如果你以後改變了想法再來找我。守護在這裡是我的使命。");
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.sendNext("你好像要繼續往深處走嘛...你可要考慮清楚哦。據說深處有很多很可怕的怪物，曾經有數十位勇士闖了進去，但是沒有一個人回來……從此再也沒有人敢進去了。不管你準備多麼充分，千萬不要冒然行動啊。");
    } else if (status == 1) {
        if (cm.getPlayerStat("LVL") >= 50) {
            cm.sendYesNo("勸你還是打消這個念頭吧，我不想再看到有人…...你執意要進去？好吧，讓我看看你的資質。嗯～似乎還不錯。你確定要進入嗎？");
        } else {
            cm.sendPrev("勸你還是打消這個念頭吧，我不想再看到有人…...你執意要進去？好吧，讓我看看你的資質。啊～你還沒到50級？！我絕不會讓你去冒險");
        }
    } else if (status == 2) {
        if (cm.getPlayerStat("LVL") >= 50) {
            cm.warp(211040300, 5);
        }
        cm.dispose();
    }
}
