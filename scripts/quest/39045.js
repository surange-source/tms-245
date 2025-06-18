function end(mode, type, selection) {
    if (!qm.isQuestFinished(qm.getQuest())) {
        if (!qm.canHold(1712004, 2)) {
            qm.sendOk("請把裝備欄空出2格");
            qm.dispose();
            return;
        }
        qm.gainItem(1712004, 2);
        qm.forceCompleteQuest();
        var nQCount = qm.getQuestInfo(39037, "count");
        if (nQCount == null || nQCount == "") {
            nQCount = 0;
        } else {
            nQCount = parseInt(nQCount);
        }
        if (nQCount < 3) {
            nQCount++;
            qm.updateOneQuestInfo(39037, "count", nQCount);
        }
    }
    qm.sendNext("真厲害啊！哈！#i1712004:# #t1712004:# 2個，哈哈！");
    qm.dispose();
}