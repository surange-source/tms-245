/*
    任務: 龍魔導士
    描述: 獲得了更強的鱗片，製作出了發出金光的#b龍魔導士#k勳章。
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        if (qm.canHold(1142157, 1) && !qm.haveItem(1142157, 1)) {
            qm.gainItem(1142157, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && ((qm.getPlayer().getJob() / 100) | 0) == 22) {
        if (qm.canHold(1142157, 1) && !qm.haveItem(1142157, 1)) {
            qm.gainItem(1142157, 1);
        }
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
