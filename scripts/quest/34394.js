function end(mode, type, selection) {
    if (!qm.isQuestFinished(qm.getQuest())) {
         if (!qm.haveItem(4036572, 50)) {
             qm.dispose();
             return;
         }
        if (!qm.canHold(1712003)) {
            qm.sendOk("請把裝備欄空出一格");
            qm.dispose();
            return;
        }
        qm.deleteAll(4036572);
        qm.gainItem(1712003, 1);
        qm.forceCompleteQuest();
        var nQCount = qm.getQuestInfo(34380, "count");
        if (nQCount == null || nQCount == "") {
            nQCount = 0;
        } else {
            nQCount = parseInt(nQCount);
        }
        if (nQCount < 3) {
            nQCount++;
            qm.updateOneQuestInfo(34380, "count", nQCount);
        }
    }
    qm.sendNext("真厲害啊！哈！#i1712003:# #t1712003:# 1個，哈哈！");
    qm.dispose();
}