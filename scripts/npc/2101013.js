/* Author: aaroncsn(MapleSea Like)
    NPC Name:         Karcasa
    Map(s):         The Burning Sands: Tents of the Entertainers(260010600)
    Description:         Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendNext("還挺膽小的哦～ 不相信我嗎？");
            cm.dispose();
            return;
        }
        if (status == 1 && mode == 0) {
            cm.sendNext("是錢不夠嗎？");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if(status == 0){
            cm.sendAcceptDecline("我不知道是誰叫你來的，不過來的得很正確～ 為了尼哈沙漠中關在香水瓶中的人們，提供回到維多利亞島的特殊路線。忘記飛行船吧～ 在那擁擠的飛行船上長時間飛行，不覺得很悶嗎？不想使用我提供的特別線路嗎？");
        } else if(status == 1){
            cm.sendAcceptDecline("但是需要注意兩點。一 這個路線是貨物運送路線，不是正式路線，所以不能保證去#r哪個村子。#k 二 因為是為您特別準備的所以比較貴。手續費要#e#b10000楓幣#n#k。有馬上出發的運送線，要乘坐嗎？");
        } else if(status == 2){
            cm.sendNext("好，出發～");
        } else if(status == 3){
            if(cm.getMeso() >= 10000){
                cm.gainMeso(-10000);
                cm.warp(towns[Math.floor(Math.random() * towns.length)]);
            } else {
                cm.sendNextPrev("那個，好像錢不夠？要去哦起航的話需要#b10000#k楓幣.");
                cm.dispose();
            }
        }
    }
}
