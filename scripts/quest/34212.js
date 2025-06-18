function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034952, 20) || qm.haveItem(4034953, 20)) {
        qm.deleteAll(4034952);
        qm.deleteAll(4034953);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034952#20個和#v4034953#20個");
    }
    qm.dispose();
}