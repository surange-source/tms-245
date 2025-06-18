var status = -1;
var nQMaxCount = 5;
var nQCount;
var aDayQuests = [34130,34131,34132,34133,34134,34135,34136,34137,34138,34139,34140,34141,34142,34143,34144,34145,34146,34147,34148,34149,34150];
var aDayQuest;
var excludeQuest = [];
var aNewDayQuest = [];
var ordQuest = 34127;
var cQuest = 34127;
var reward = [1712001, 8];

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            status = 4;
        } else if (status == 1) {
            qm.sendOk("啊，你改變心意拉。想要接任務的話請再次跟我搭話。");
            qm.dispose();
            return;
        } else {
            status--;
        }
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        calQuestCount();

        if (qm.getQuestInfo(cQuest, "count") != nQMaxCount - nQCount) {
            qm.updateOneQuestInfo(cQuest, "count", nQMaxCount - nQCount);
        }

        aDayQuest = new Array();
        var order = qm.getQuestInfo(ordQuest, "order");
        if (order != null && order != "" && nQCount == order.split("/").length) {
            for each (sOrder in order.split("/")) {
                if (sOrder != null && sOrder != "") {
                    aDayQuest.push(parseInt(sOrder));
                    if (aDayQuest.length >= nQCount) {
                        break;
                    }
                }
            }
        }
        if (aDayQuest.length < nQCount) {
            order = "";
            for (var j = 0; j < nQCount; j++) {
                while (true) {
                    var quest = aDayQuests[Math.floor(Math.random() * aDayQuests.length)];
                    if (aDayQuest.indexOf(quest) == -1) {
                        aDayQuest.push(quest);
                        order += quest;
                        if (j != nQCount - 1) {
                            order += "/";
                        }
                        break;
                    }
                }
            }
            if (order != "") {
                qm.updateOneQuestInfo(ordQuest, "order", order);
            }
        }
        var menu = "";
        for each (quest in aDayQuest){
            menu += "#b#e#y" + quest + "##k#n\r\n";
        }
        if (menu == "") {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.askReplace("來的太好了， #ho#。 今天要拜託 #ho#的事情是 " + nQCount + "這個。 現在馬上可以執行嗎？ 不喜歡的話，可以按替換鈕換成下個任務。\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendYesNo("不想執行目錄中的任務？也可以找其他任務。\r\n\r\n#b(將去除部分任務或全部任務後重新組成目錄。)#k");
    } else if (status == i++) {
        var menu = "";
        for (var j = 0; j < aDayQuest.length; j++) {
            if (excludeQuest.indexOf(aDayQuest[j]) == -1) {
                menu += "#b#e#L" + j + "# #y" + aDayQuest[j] + "##l#k#n\r\n";
            } else {
                menu += "#e#L" + j + "# #y" + aDayQuest[j] + "##l#n\r\n";
            }
        }
        if (menu == "") {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.sendSimple("請選擇想要排除在外的任務。\r\n\r\n" + menu + "#L" + nQMaxCount + "# #r#e沒有其他任務想要排除。#k#n#l");
    } else if (status == i++) {
        switch (selection) {
            case nQMaxCount:
                start(1, 3, 0);
                break;
            default:
                if (selection < aDayQuest.length && excludeQuest.indexOf(aDayQuest[selection]) == -1) {
                    excludeQuest.push(aDayQuest[selection]);
                }
                if (excludeQuest.length != aDayQuest.length) {
                    status = 1;
                }
                start(1, 3, 0);
                break;
        }
    } else if (status == i++) {
        if (aNewDayQuest.length < excludeQuest.length) {
            for each (quest in excludeQuest){
                if (aDayQuest.indexOf(quest) != -1) {
                    while (true) {
                        var qid = aDayQuests[Math.floor(Math.random() * aDayQuests.length)];
                        if (excludeQuest.indexOf(qid) == -1 && aDayQuest.indexOf(qid) == -1) {
                            aDayQuest[aDayQuest.indexOf(quest)] = qid;
                            aNewDayQuest.push(qid);
                            break;
                        }
                    }
                }
            }
            if (aNewDayQuest.length > 0) {
                var order = "";
                for (var j = 0; j < aDayQuest.length; j++) {
                    order += aDayQuest[j];
                    if (j != aDayQuest.length - 1) {
                        order += "/";
                    }
                }
                if (order != "") {
                    qm.updateOneQuestInfo(ordQuest, "order", order);
                }
            }
        }
        if (qm.getQuestStatus(qm.getQuest()) == 0) {
            qm.forceStartQuest();
            for each (quest in aDayQuest){
                qm.forceStartQuest(quest);
            }
        }
        var menu = "";
        for each (quest in aDayQuest){
            menu += "#b#e#y" + quest + "##k" + (aNewDayQuest.indexOf(quest) == -1 ? "" : " #r[NEW]#k") + "#n\r\n";
        }
        if (menu == "") {
            qm.sendOk("發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.sendNext((aNewDayQuest.length > 0 ? ("排除的 " + aNewDayQuest.length + "個，找到了新的任務 " + aNewDayQuest.length + "個。") : "") + "今天要拜託你的事情有這 " + nQCount + "個。 \r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendPrev("執行完任務之後來我這裡結束即可，一定要在今天午夜以前來喔！那麼再見囉。");
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
        calQuestCount();
        var nCount = qm.getQuestInfo(cQuest, "count");
        if (nCount == null || nCount == "") {
            nCount = 0;
        } else {
            nCount = parseInt(nCount);
        }
        if (nCount < nQMaxCount) {
            qm.dispose();
            return;
        }
        if (!qm.canHold(reward[0], reward[1] - nQCount)) {
            qm.sendOk("請把裝備欄空出" + (reward[1] - nQCount) + "格");
            qm.dispose();
            return;
        }
        qm.gainItem(reward[0], reward[1] - nQCount);
        qm.forceCompleteQuest();
        if (qm.isQuestActive(34151)) {
            var clear = qm.getQuestInfo(34151, "clear");
            if (clear == null || clear == "") {
                clear = 1;
            } else {
                clear = parseInt(clear) + 1;
            }
            qm.updateOneQuestInfo(34151, "clear", clear);
        }
        qm.sendNext("#ho#， " + nQCount + "個任務都完成啦？來，這邊#i" + reward[0] + ":# #t" + reward[0] + ":# " + (reward[1] - nQCount) + "個已送出。");
    } else {
        qm.dispose();
    }
}

function calQuestCount() {
    nQCount = nQMaxCount;
    if (qm.isQuestFinished(34164)) {
        nQCount--;
    }
    if (qm.isQuestFinished(34165)) {
        nQCount--;
    }
    if (qm.isQuestFinished(34166)) {
        nQCount--;
    }
    if (qm.isQuestFinished(34167)) {
        nQCount--;
    }
}