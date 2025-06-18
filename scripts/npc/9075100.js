/*
進化系統NPC 9075100

*/
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status == 2 && mode == 0) {
            cm.sendNext("。。。");
            cm.dispose();
        }
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            cm.sendSimple("開始進化系統。\r\n#b#L0#連接進化系統。(剩餘入場次數: 0 / 5 )#l\r\n#b#L1#聽聽關於進化系統的說明。#l");
        } else if (status == 1) {
            if (selection == 0) { 
                //status = -1;
                cm.sendESLab();
        cm.dispose();
            } else if (selection == 1) { // How do I take down the monsters?
                cm.sendNext("關於進化系統。。。。。");
        cm.dispose();
            } 
        } else if (status == 2) { 
        cm.dispose();
        } 
    }
}
