function start(mode, type, selection) {
    qm.dispose();
    if (qm.getMapId() != 450005400) {
        qm.warp(450005400);
    } else {
        qm.forceCompleteQuest();
        qm.warp(940204001, 1);
        qm.updateOneQuestInfo(34271, "20", "h1");
    }
}