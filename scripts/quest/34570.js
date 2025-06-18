function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
    if (qm.haveItem(4036451, 100)) {
        qm.deleteAll(4036451);
        qm.forceCompleteQuest();
        qm.updateOneQuestInfo(34560, "45", "h0");
        qm.warp(450007040, 0);
    } else {
        qm.sendOk("請找來#v4036451#100個");
    }
}