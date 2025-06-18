/*
    NPC Name:         Cobra - Retired dragon trainer
    Map(s):         Leafre : Cabin
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
    cm.sendSimple("如果有翅膀，就可以到達那個地方。但是僅僅有翅膀是不夠的，如果要在比刀還鋒利的風中飛行，還需要有堅硬的鱗片。知道回來的方法的只有我一個……你如果要到那裡去，我會幫你變身。不管你現在的樣子是什麼，在這一瞬間都會變成#b龍#k……\r\n\r\n #L0##b我想變身為龍。#k#l");
    } else if (status == 1) {
    cm.useItem(2210016);
    cm.warp(200090500, 0);
    cm.dispose();
    }
}
