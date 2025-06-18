function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034954, 20) || qm.haveItem(4034955, 20)) {
        qm.deleteAll(4034954);
        qm.deleteAll(4034955);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034954#20個和#v4034955#20個");
    }
    qm.dispose();
}