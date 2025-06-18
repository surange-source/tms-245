/*
    任務: 稱號 - 實習光之騎士
    描述: 為了紀念光之騎士米哈逸成功完成2轉而發放的勳章。
    獲得: 1142400 - 實習光之騎士
*/

var status = -1;
var level = 30
var itemId = 1142400;

function start(mode, type, selection) {
    qm.playerMessage("開始任務... " + qm.canHold(itemId, 1) + "  " + !qm.haveItem(itemId, 1));
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 5000 && qm.getJob() < 5112) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    qm.playerMessage("完成任務..." + qm.canHold(itemId, 1) + "  " + !qm.haveItem(itemId, 1));
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 5000 && qm.getJob() < 5112) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
