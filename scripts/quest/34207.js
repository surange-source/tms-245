function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034943, 20)) {
        qm.deleteAll(4034943);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034943#20個");
    }
    qm.dispose();
}