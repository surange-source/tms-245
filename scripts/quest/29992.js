/*
    任務: 稱號 - 契約的開始
    描述: 為了紀念天使破壞者1轉而發放的勳章。
    獲得: 1142495 - 古代諾巴的契約者
*/

var status = -1;
var level = 10
var itemId = 1142495;

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
