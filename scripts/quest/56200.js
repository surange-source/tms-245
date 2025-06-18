/*
    任務 - 充滿恐懼的聲音
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                qm.dispose();
                return;
            } else if (status == 1) {
                qm.sendOk("真的沒人來救我了嗎？嗚嗚……");
                qm.dispose();
            }
            status--;
        }
        if (status == 0) {
            qm.sendNext("嗚嗚……有沒有人來救我啊？我是從埃德爾斯坦到新葉城來旅行的，可是突然有一扇奇怪的大門被打開，有很多怪物從那扇門衝出來，抓走了新葉城的市民，佔領了新葉城！");
        } else if (status == 1) {
            qm.sendYesNo("冒險家，你可不可以來新葉城救我啊？");
        } else if (status == 2) {
            qm.forceCompleteQuest();
            qm.forceCompleteQuest(56201);
            qm.forceCompleteQuest(56202);
            qm.forceCompleteQuest(56203);
            qm.warp(703000000, 0); //703100010
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
