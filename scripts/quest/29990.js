/*
    任務: 稱號 - 繼承凱撒意志的人
    描述: 為了紀念凱撒4轉而發放的勳章。
    獲得: 1142487 - 擁有凱撒的意志的人
*/

var status = -1;
var level = 100
var itemId = 1142487;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 6000 && qm.getJob() <= 6112) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 6000 && qm.getJob() <= 6112) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
