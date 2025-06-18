function end(mode, type, selection) {
    if (qm.haveItem(4036099, 50)) {
        qm.deleteAll(4036099);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4036099#50個");
    }
    qm.dispose();
}