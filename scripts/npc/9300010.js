/* 
    腳本類型:         NPC
    所在地圖:        孤星殿
    腳本名字:        離婚地圖離開NPC
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            cm.sendSimple("離婚可能是一件很魯莽的決定，你可能決定了，我也不多說什麼了。#b\r\n#L0# 我想離開這裡。");
        } else if (status == 1) {
            cm.warp(700000000);
            cm.dispose();
        }
    }
}
