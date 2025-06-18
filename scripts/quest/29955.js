/*
    任務: 稱號 - 精靈的英雄
    描述: 身為精靈的英雄，為了找回力量而努力吧！
    獲得: 1142339 - 精靈的英雄
*/

var status = -1;
var level = 100
var itemId = 1142339;

function start(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 2300 && qm.getJob() <= 2312) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(itemId, 1)) {
        qm.forceCompleteQuest();
    } else if (qm.canHold(itemId, 1) && (qm.getJob() >= 2300 && qm.getJob() <= 2312) && qm.getLevel() >= level) {
        qm.gainItem(itemId, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
