function start(mode, type, selection) {
    if (!qm.canHold(2630437, 20)) {
        qm.sendOk("請把消耗欄欄空出一格");
        qm.dispose();
        return;
    }
    qm.gainItemPeriod(2630437, 20, 14);
    qm.forceCompleteQuest();
    qm.updateOneQuestInfo(37700, "03", "h2");
    qm.updateOneQuestInfo(37700, "04", "h2");
    qm.updateOneQuestInfo(37700, "05", "h2");
    qm.updateOneQuestInfo(37700, "27", "h2");
    qm.dispose();
}