/*
    任務: 稱號 - 戰場的偶像
    描述: 為了紀念天使破壞者4轉而發放的勳章。
    獲得: 1142498 - 戰場之星
*/

var status = -1;
var level = 100
var itemId = 1142498;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 6500 && qm.getJob() <= 6512) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 6500 && qm.getJob() <= 6512) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
