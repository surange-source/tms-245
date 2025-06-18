function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034950, 20) || qm.haveItem(4034951, 20)) {
        qm.deleteAll(4034950);
        qm.deleteAll(4034951);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034950#20個和#v4034951#20個");
    }
    qm.dispose();
}