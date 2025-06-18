//蠟筆改寫


var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("想去挑戰蜈蚣副本嗎？需要33個黑羊毛才可召喚蜈蚣王哦！蜈蚣王暴出的赤珠可在聖誕老人那換取物品哦！");
        }
        else if (status == 1) {
            cm.warp(701010321, 0);
            cm.dispose();
        }else{
            cm.sendOk("就這樣吧!");
            cm.dispose();
        }
    }
}    
