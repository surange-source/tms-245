var status = 0;

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
    } else {
        status++;
        //if (cm.getClient().getChannel() == 1) {
        //    cm.sendNext("The event may not be attempted in channel 1.");
        //    cm.dispose();
        //    return;
        //}
        //cm.sendNext("The event is not taking place at the moment.");
        //cm.dispose();
         if(status == 0){
                    if (cm.getMapId() != 970010000) {
                        cm.sendNext("你想進入#b楓樹山丘#k嗎？這裡有一顆楓樹正在茁長成長，它需要得到更多#b溫暖的陽光#k的滋養");
                    }else{
            cm.sendNext("你好~ 這裡是#b楓樹山丘#k，你是不是想讓楓樹長的更健康一些呢？給我一些#b溫暖的陽光#k吧！楓樹長大以後可以獲得獎勵哦。#b溫暖的陽光#k可以在怪物的身上得到，如果想要楓樹開花，可能需要5000個#b溫暖的陽光#k！");
                    }
        } else if (status == 1) {
                      if (cm.getMapId() != 970010000) {
                         cm.warp(970010000, 0);
                         cm.dispose();
                      }else{
             cm.sendSimple("楓樹每次得到滋養都會長得更強壯一些！\r\n#b#L0#我有一些#r溫暖的陽光#k#l\r\n#b#L1#請告訴我還需要多少#r溫暖的陽光#l#k");    
                      }        
                } else if (status == 2) {
            if (selection == 0) {
                cm.sendGetNumber("你想給我多少#b溫暖的陽光#k？我會好好照顧楓樹的。", cm.itemQuantity(4001246), 0, cm.itemQuantity(4001246));
            } else {
                cm.sendOk("楓樹的成長狀況：\r\n已捐獻#r" + cm.getSunshines() + "#k個，需要5000個\r\n如果你有#r溫暖的陽光#k，記得拿給我。");
                cm.dispose();
            }
        } else if (status == 3) {
            if (selection < 0 || selection > cm.itemQuantity(4001246)) {
                selection = cm.itemQuantity(4001246);
            }
            if (selection == 0) {
                cm.sendOk("請帶來一些#b溫暖的陽光#k");
            } else {
                cm.addSunshines(selection);
                cm.gainItem(4001246, -selection);
                cm.sendOk("謝謝你，有了你的幫助楓樹成長的更快了");
            }
            cm.dispose();
        }
    }
}
