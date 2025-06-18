/*
    腳本類型:         NPC
    所在地圖:        宴客堂
    腳本名字:         離開NPC
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
            cm.sendSimple("你做想什麼呢？#b\r\n#L0# 查看關於宴客堂。\r\n#L1# 我想離開這裡。");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("宴客堂是婚禮主人招待宴客的地方，你可以在這裡給婚禮主人道賀禮，送紅包。");
            } else {
                status = 2;
                if (mode == 1) {
                    cm.sendYesNo("離開這裡不能退還請帖哦，下次再進來的時候還要交出請帖。");
                } else {
                    cm.dispose();
                }
            }
        } else if (status == 2) {
            cm.sendNext("在這裡你可以和別的宴客聊天，這段時間很有趣哦！");
            cm.dispose();
        } else if (status == 3) {
            cm.sendNext("即使如此，還是要離開嗎？");
        } else if (status == 4) {
            cm.sendNext("好的，我這就送你出去。");
        } else if (status == 5) {
            cm.warp(700000000);
            cm.dispose();
        }
    }
}
