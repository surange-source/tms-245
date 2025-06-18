/*
 筆芯製作★風雲工作室所有
 完成時間：2013年8月31日 12:39:02
 腳本功能：納希沙漠相關
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
            if (cm.getMap().getId() == 980010101 || cm.getMap().getId() == 180000000) {
                cm.sendOk("#e<納希沙漠競技場:注意事項>#n\r\n#d\r\n\r\n#b1）進入競技場後，將有五分鐘的時間消滅怪物。\r\n2）在規定時間內，消滅的怪物越多，結束時獲得獎勵越多。\r\n#e3）如果觸碰陷阱，將會有可怕的怪物出現。#n\r\n4）組隊中，消滅怪物最多的將會有額外的獎勵。\r\n5）從競技場獲取的積分，可以從拍賣處兌換獎勵。")
            } else {
                cm.warp(910000000);
            }
            cm.dispose();
        }//a
    }//mode
}//f