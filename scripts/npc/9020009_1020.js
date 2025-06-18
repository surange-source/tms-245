/*
  魯塔比斯 封印箱兌換
*/
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("那請繼續加油");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你是否要出去?");
    }
    else if(status == 1){
        cm.warp(940020000,0);
        cm.dispose();
    }
}