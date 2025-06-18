/*
傳送NPC
*/

function start() {
    cm.sendYesNo("你想去冰雪之島#b裡恩#k嗎?");
}

function action(mode, type, selection) {
    if (mode == 0) {
    cm.sendOk("看來你還有事情沒有辦完,等事情處理好在來找我吧!");
    } else {
    cm.warp(140000000,0);
    }
    cm.dispose();
}
