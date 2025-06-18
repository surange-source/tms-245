var status = -1;

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        if (!qm.isQuestFinished(qm.getQuest())) {
            if (!qm.haveItem(4034927, 50)) {
                qm.dispose();
                return;
            }
            if (!qm.canHold(1712001)) {
                qm.sendOk("請把裝備欄空出一格");
                qm.dispose();
                return;
            }
            qm.deleteAll(4034927);
            qm.gainItem(1712001, 1);
            qm.forceCompleteQuest();
            var nQCount = qm.getQuestInfo(34127, "count");
            if (nQCount == null || nQCount == "") {
                nQCount = 0;
            } else {
                nQCount = parseInt(nQCount);
            }
            if (nQCount < 5) {
                nQCount++;
                qm.updateOneQuestInfo(34127, "count", nQCount);
            }
        }
        qm.sendNext("#b(將得知的情報轉達給蘿娜。)#k");
    } else if (status == 1) {
        qm.sendNextPrev("來，這裡#i1712001:# #t1712001:# 1個送給你。因為有你的幫忙，可以提前揭開這個空間的真相了。");
    } else {
        qm.dispose();
    }
}