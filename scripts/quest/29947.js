/*
    任務: 冒險騎士團的繼承人
    描述: 冒險騎士團的繼承人終極冒險家誕生了。
    需要: 1142257 - 冒險騎士繼承者
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.haveItem(1142257, 1) && qm.getPlayer().getLevel() >= 10) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(1142257, 1) && qm.getPlayer().getLevel() >= 10) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
