/*
 * 頓悟 夜光4轉
 * 對於光明和黑暗的力量的理解突然增加了。
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendPlayerNext("(這是什麼感覺？我體內的兩股力量合二為一，成為一種新的力量啦。)");
    } else if (status == 1) {
        qm.sendPlayerNextPrev("(光與黑暗的融合提升了一個階段。)");
    } else if (status == 2) {
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
