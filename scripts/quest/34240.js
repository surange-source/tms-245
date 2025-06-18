function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
    if (qm.haveItem(4036338, 30)) {
        qm.deleteAll(4036338);
        qm.forceCompleteQuest();
        qm.updateOneQuestInfo(34245, "71", "h0");
        qm.updateOneQuestInfo(34245, "73", "h1");
        qm.warp(450006040);
    } else {
        qm.sendOk("請找來#v4036338#30個");
    }
}