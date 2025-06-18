/*
    任務: 龍魔導士
    描述: 利用從米樂那裡獲得的鱗片，製作出了#b龍魔導士#k勳章。
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        if (qm.canHold(1142156, 1) && !qm.haveItem(1142156, 1)) {
            qm.gainItem(1142156, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        if (qm.canHold(1142156, 1) && !qm.haveItem(1142156, 1)) {
            qm.gainItem(1142156, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
