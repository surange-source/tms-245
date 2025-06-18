/*
 筆芯製作★風雲工作室所有
 完成時間：2013年8月21日 10:50:59
 腳本功能：黃金寺院傳送
 */

var a = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            cm.sendSimple("勇敢的旅行者#b#h0##k，請你幫我！！\n我是黃金寺院的僧人#b諾伊#k。原本和平的這裡，不久前因為邪惡的惡魔#r拉瓦那#k的覺醒陷入了危機。\n只有你才能和我一起拯救陷入危機的黃金寺院。你一定要挺清楚哦！\r\n#L0##b這樣的事為什麼找我呢？我只是在楓之谷世界旅行的旅行者。我不是你所想的那種強大的人。#l\n#k")
        } else if (a == 1) {
            cm.sendNext("不！拯救黃金寺院危機的人只有你。智慧的靈魂讓我想到了你，我需要你的幫助，請你幫我吧。")
        } else if (a == 2) {
            cm.sendYesNo("是否現在就前往#b黃金寺院#k？怪物死亡後會掉落130-140裝備哦。")
        } else if (a == 3) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(252030000, 0)
            cm.dispose();
        }//a
    }//mode
}//f