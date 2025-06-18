var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.sendYesNo("這周要幫助我們調查團的研究嗎？\r\n(接收後 #e#r星期天凌晨#k#n為止，完成#e#b#y34129##k#n完成 #e#b2次以上#k#n時，可以獲得特別的獎勵。)");
    } else if (status == i++) {
        if (qm.getQuestStatus(qm.getQuest()) == 0) {
            qm.forceStartQuest();
            var wd = java.util.Calendar.getInstance().get(java.util.Calendar.DAY_OF_WEEK) - 1;
            qm.updateOneQuestInfo(qm.getQuest(), "clear", null);
            qm.updateOneQuestInfo(qm.getQuest(), "dowS", String(wd == 0 ? 7 : wd));
            qm.updateOneQuestInfo(qm.getQuest(), "startDate", new java.text.SimpleDateFormat("yy/MM/dd").format(new java.util.Date()));
        }
        qm.sendNext("我會再期待#b#h0##k大人的活躍。\r\n我再提醒一次，如果經過 #e#r星期天凌晨#k#n的話，任務記錄就會被初始化的關係，請再麻煩我方注意。");
    } else if (status == i++) {
        qm.dispose();
    } else {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        var clear = qm.getQuestInfo(34151, "clear");
        if (clear == null || clear == "") {
            clear = 0;
        } else {
            clear = parseInt(clear);
        }
        if (clear < 2) {
            qm.dispose();
            return;
        }
        qm.sendNext("這周也透過 #b#h0##k大人的活躍而我們調查團的研究上有了很大的幫助。\r\n#b請接收我們準備的特別獎勵吧。\r\n(#i2436078:# #b#t2436078:#  3個#k)\r\n#r(注意：若星期天凌晨為止沒有接收獎勵的話，任務的記錄就會被初始化。)#n");
    } else if (status == i++) {
        if (qm.getQuestStatus(qm.getQuest()) == 1) {
            if (qm.canHold(2436078, 3)) {
                qm.forceCompleteQuest();
                var wd = java.util.Calendar.getInstance().get(java.util.Calendar.DAY_OF_WEEK) - 1;
                qm.updateOneQuestInfo(qm.getQuest(), "dowE", String(wd == 0 ? 7 : wd));
                qm.gainItemPeriod(2436078, 3, 7);
                qm.updateOneQuestInfo(qm.getQuest(), "clearDate", new java.text.SimpleDateFormat("yy/MM/dd").format(new java.util.Date()));
                var first = qm.getQuestInfo(qm.getQuest(), "first");
                if (first == null || first == "") {
                    qm.updateOneQuestInfo(qm.getQuest(), "first", "1");
                }
            } else {
                qm.sendOk("請把消耗欄空出3格。");
                qm.dispose();
                return;
            }
        }
        qm.sendNextPrev("已贈送獎勵。\r\n之後也再麻煩你了。");
    } else if (status == i++) {
        qm.dispose();
    } else {
        qm.dispose();
    }
}