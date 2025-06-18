/*
    腳本類型:         NPC
    所在地圖:        孤星殿
    腳本名字:        紅鸞宮地圖離開NPC
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
            cm.sendSimple("祝兩位喜結娘緣，五福四海，早生貴子！#b\r\n#L0# 結婚好了，想到宴客堂招待宴客。")
        } else if (status == 1) {
            cm.warp(700000200)
            cm.dispose();
        }
    }
}
