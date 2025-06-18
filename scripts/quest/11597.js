var status = -1;

function start(mode, type, selection) {
    qm.sendOk("任務暫時性完成.");
    qm.forceStartQuest();
    qm.forceCompleteQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.sendOk("任務暫時性完成.");
    qm.forceStartQuest();
    qm.forceCompleteQuest();
    qm.dispose();
}
