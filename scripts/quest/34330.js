function end(mode, type, selection) {
    if (!qm.isQuestFinished(34330)) {
        if (qm.canHold(1712003)) {
            qm.forceCompleteQuest();
            if (!qm.isQuestFinished(34331)) {
                qm.forceCompleteQuest(34331);
            }
        } else {
            qm.sendOk("請把裝備欄空出一格。");
            qm.dispose();
            return;
        }
    }
    qm.dispose();
}