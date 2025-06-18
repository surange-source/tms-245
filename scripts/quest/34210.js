function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034948, 20) || qm.haveItem(4034949, 20)) {
        qm.deleteAll(4034948);
        qm.deleteAll(4034949);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034948#20個和#v4034949#20個");
    }
    qm.dispose();
}