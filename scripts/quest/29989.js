/*
    任務: 稱號 - 覺醒的凱撒
    描述: 為了紀念凱撒3轉而發放的勳章。
    獲得: 1142486 - 覺醒的凱撒
*/

var status = -1;
var level = 60
var itemId = 1142486;

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
