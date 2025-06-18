/*
    任務: 秘密團體臨時成員
    描述: 按照留下的人偶的指示，通過了秘密團體加入測試，成為了#b秘密團體臨時成員#k。
*/
var status = -1;

function start(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && (qm.getPlayer().getJob() / 100) | 0 == 22) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getLevel() >= 10 && (qm.getPlayer().getJob() / 100) | 0 == 22) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
