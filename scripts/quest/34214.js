function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034956, 20) || qm.haveItem(4034957, 20)) {
        qm.deleteAll(4034956);
        qm.deleteAll(4034957);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034956#20個和#v4034957#20個");
    }
    qm.dispose();
}