function end(mode, type, selection) {
    if (!qm.isQuestFinished(qm.getQuest())) {
         if (!qm.haveItem(4036404, 50)) {
             qm.dispose();
             return;
         }
        if (!qm.canHold(1712006, 2)) {
            qm.sendOk("請把裝備欄空出2格");
            qm.dispose();
            return;
        }
        qm.deleteAll(4036404);
        qm.gainItem(1712006, 2);
        qm.forceCompleteQuest();
        var nQCount = qm.getQuestInfo(34775, "count");
        if (nQCount == null || nQCount == "") {
            nQCount = 0;
        } else {
            nQCount = parseInt(nQCount);
        }
        if (nQCount < 3) {
            nQCount++;
            qm.updateOneQuestInfo(34775, "count", nQCount);
        }
    }
    qm.sendNext("真厲害啊！哈！#i1712006:# #t1712006:# 2個，哈哈！");
    qm.dispose();
}