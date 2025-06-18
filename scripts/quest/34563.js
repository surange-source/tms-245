function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
    if (qm.haveItem(4036449, 1)) {
        qm.deleteAll(4036449);
        qm.forceCompleteQuest();
        qm.updateOneQuestInfo(34560, "41", "h0");
    } else {
        qm.sendOk("請找來#v4036449#");
    }
}