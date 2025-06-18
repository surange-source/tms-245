function start(mode, type, selection) {
    if (!qm.isQuestFinished(34218)) {
        if (qm.canHold(1712002)) {
            qm.gainItem(1712002, 1);
        } else {
            qm.sendOk("請把裝備欄空出一格。");
            qm.dispose();
            return;
        }
    }
    qm.forceCompleteQuest();
    qm.dispose();
}