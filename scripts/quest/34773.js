var status = -1;
var nQMaxCount = 3;
var eachRewardCount = 2;
var nQCount;
var aDayQuests = [34780,34781,34782,34783,34784,34785,34786,34787,34788,34789,34790,34791,34792,34793,34794,34795,34796,34797,34798,34799];
var aDayQuest;
var excludeQuest = [];
var aNewDayQuest = [];
var ordQuest = 34774;
var cQuest = 34775;
var reward = [1712005, 8];

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            status = 4;
        } else if (status == 1) {
            qm.sendOk("改變心意了嗎？想接取命令時請再告訴我。");
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
        qm.updateOneQuestInfo(cQuest, "region", "3");

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
        qm.askReplace("您好嗎！今天的命令有這些。\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendYesNo("命令有困難嗎？請求總部重新考慮。\r\n\r\n#b(將排除部分命令或所有命令重新組成目錄。)#k");
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
        qm.sendSimple("請選擇想變更的命令。\r\n\r\n" + menu + "#L" + nQMaxCount + "# #r#e沒有其他想排除的委託。#k#n#l");
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
        qm.sendNext((aNewDayQuest.length > 0 ? ("排除的 " + aNewDayQuest.length + "個命令換成新的命令 " + aNewDayQuest.length + "個告知您。") : "") + "今天的命令全部 " + nQCount + "個！\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendOk("完成所有命令後請回來找我。\r\n可別忘了必須在#r#e晚上十二點前#k#n回來！\r\n提醒您，如果對委託有疑問，可透過#e#b任務情報視窗#k#n確認！");
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
        if (!qm.canHold(reward[0], reward[1] - (nQCount * eachRewardCount))) {
            qm.sendOk("請把裝備欄空出" + (parseInt(reward[1]) - (nQCount * eachRewardCount)) + "格");
            qm.dispose();
            return;
        }
        qm.gainItem(reward[0], reward[1] - nQCount);
        qm.forceCompleteQuest();
        qm.sendNext("您把今天的" + nQCount + "項任務全部完成啦！來，這是#i" + reward[0] + ":# #t" + reward[0] + ":# " + (reward[1] - (nQCount * eachRewardCount)) + "個送給您。");
    } else {
        qm.dispose();
    }
}

function calQuestCount() {
    nQCount = nQMaxCount;
    if (qm.isQuestFinished(35192)) {
        nQCount--;
    }
    if (qm.isQuestFinished(35243)) {
        nQCount--;
    }
}