function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034946, 20) || qm.haveItem(4034947, 20)) {
        qm.deleteAll(4034946);
        qm.deleteAll(4034947);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034946#20個和#v4034947#20個");
    }
    qm.dispose();
}