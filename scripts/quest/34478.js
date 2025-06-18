function end(mode, type, selection) {
    if (!qm.isQuestFinished(34478)) {
        if (qm.canHold(1712004)) {
            qm.gainItem(1712004, 1);
            qm.forceCompleteQuest();
        } else {
            qm.sendOk("請把裝備欄空出一格。");
            qm.dispose();
            return;
        }
    }
    qm.dispose();
}