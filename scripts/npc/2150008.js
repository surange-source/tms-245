var status = -1;

function start() {
    cm.sendSimple("你想離開埃德爾斯坦，到其他大陸去嗎？這裡的船開往維多利亞島和神秘島的天空之城。費用是800楓幣。你想去哪裡？\r\n#L0#維多利亞島#l\r\n#L1#天空之城#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    
    if (status == 0) {
        if (cm.getMeso() < 800) {
            cm.sendNext("嗯……你確定自己有#b800#k楓幣嗎？請你打開背包確認一下。不夠的話，就先去吧錢湊齊。");
        } else {
            cm.gainMeso(-800);
            if (selection == 0)
                cm.warp(104020130,0);
            else if (selection == 1)
                cm.warp(200000100,0);
        }
        cm.dispose(); 
    } else {
        cm.dispose(); 
    }
}
