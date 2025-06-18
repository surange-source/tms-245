function start(mode, type, selection) {
    if (!qm.isQuestFinished(34586)) {
        if (qm.canHold(1712006) && qm.canHold(2438411)) {
            qm.forceCompleteQuest(34586);
            qm.gainItem(1712006, 1);
            qm.gainItem(2438411, 1);
        } else {
            qm.topMsg("請把裝備欄和消耗欄各空出一格");
            qm.dispose();
            return;
        }
    }
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(34560, "58", "h0");
    qm.updateOneQuestInfo(34560, "31", null);
    qm.updateOneQuestInfo(34560, "30", null);
    qm.dispose();
    qm.warp(450007040);
}