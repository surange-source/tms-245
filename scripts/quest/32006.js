/*
    任務: 稱號 - 秘密機構的特殊工作員
    描述: 為了紀念傑諾第2次轉職而發放的勳章。
    獲得: 1142576
*/

var status = -1;
var level = 30;
var itemId = 1142576;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 3600 && qm.getJob() <= 3612) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 3600 && qm.getJob() <= 3612) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
