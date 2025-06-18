/* 
傳送NPC
*/
function start() {
    cm.sendYesNo("你想前往維多利亞島維多利亞港嗎?");
}

function action(mode, type, selection) {
    if (mode == 0) {
    cm.sendNext("手續會收取1000楓幣,有足夠的楓幣在來找我把。");
    } else {
    if(cm.getPlayer().getMeso() >= 1000) {
    cm.gainMeso(-1000);
    cm.warp(104000000,0);
    }
    cm.dispose();
}
}
