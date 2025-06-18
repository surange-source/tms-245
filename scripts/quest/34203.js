function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034942, 20)) {
        qm.deleteAll(4034942);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034942#20個");
    }
    qm.dispose();
}