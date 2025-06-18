function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.haveItem(4034958, 1)) {
        qm.deleteAll(4034958);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034958#");
    }
    qm.dispose();
}