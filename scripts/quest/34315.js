function end(mode, type, selection) {
    if (qm.haveItem(4034982, 20)) {
        qm.deleteAll(4034982);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4034982#20個");
    }
    qm.dispose();
}