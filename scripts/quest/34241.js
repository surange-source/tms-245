function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
    if (qm.haveItem(4036339, 50)) {
        qm.deleteAll(4036339);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4036339#50個");
    }
}