function start(mode, type, selection) {
    qm.forceStartQuest();
    if (qm.getMapId() != 450002025) {
        qm.warp(450002025, 0);
    }
    qm.updateOneQuestInfo(37700, "26", "h1");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
}