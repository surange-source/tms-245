/*
    任務: 稱號 - 憤怒化身
    描述: 為了祝賀惡魔復仇者第2次轉職而發放的勳章。
    獲得: 1142554
*/

var status = -1;
var level = 30;
var itemId = 1142554;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && ((qm.getJob() >= 3120 && qm.getJob() <= 3122) || qm.getJob() == 3101) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && ((qm.getJob() >= 3120 && qm.getJob() <= 3122) || qm.getJob() == 3101) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
