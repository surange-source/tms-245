function end(mode, type, selection) {
    if (qm.haveItem(4036100, 50)) {
        qm.deleteAll(4036100);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4036100#50個");
    }
    qm.dispose();
}