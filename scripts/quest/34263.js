function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
    if (qm.haveItem(4036312, 1)) {
        qm.deleteAll(4036312);
        qm.forceCompleteQuest();
    } else {
        qm.sendOk("請找來#v4036312#");
    }
}