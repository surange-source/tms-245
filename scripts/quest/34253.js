function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
    if (qm.haveItem(4036309, 20)) {
        qm.deleteAll(4036309);
        qm.forceCompleteQuest();
        qm.updateOneQuestInfo(34271, "23", "h0");
        qm.warp(450006130);
    } else {
        qm.sendOk("請找來#v4036309#20個");
    }
}