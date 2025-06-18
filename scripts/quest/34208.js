function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034944, 20) || qm.haveItem(4034945, 20)) {
        qm.deleteAll(4034944);
        qm.deleteAll(4034945);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034944#20個和#v4034945#20個");
    }
    qm.dispose();
}