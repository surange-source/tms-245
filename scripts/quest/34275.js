var status = -1;
var nQMaxCount = 3;
var eachRewardCount = 2;
var nQCount;
var aDayQuests = [34276,34277,34278,34279,34280,34281,34282,34283,34284/*,34285*/,34286,34287,34288,34289,34290,34291,34292,34293/*,34294,34295,34296*/];
var aDayQuest;
var excludeQuest = [];
var aNewDayQuest = [];
var ordQuest = 34297;
var cQuest = 34298;
var reward = [1712005, 8];

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            status = 4;
        } else if (status == 1) {
            qm.sendOk("咦？不想弄了嗎？要接收委託的話，再跟我說吧！");
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
        qm.updateOneQuestInfo(cQuest, "region", "1");

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
        qm.askReplace("嗨 #h0#！今天的委託有這些。\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendYesNo("不喜歡這委託嗎？那要看看其他委託嗎？\r\n\r\n#b(除外部份委託或整體委託後，把委託清單重新讀取。)#k");
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
        qm.sendSimple("選擇想要換的委託吧。\r\n\r\n" + menu + "#L" + nQMaxCount + "# #r#e已經沒有可以除外的委託。#k#n#l");
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
        qm.sendNext((aNewDayQuest.length > 0 ? ("排除的 " + aNewDayQuest.length + "個委託換成新的委託 " + aNewDayQuest.length + "個提供給你。") : "") + "今天的委託全部 " + nQCount + "種！\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendOk("完成所有委託後，再回來找我就可以囉！但別忘了一定要在凌晨回來！");
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
        qm.sendNext("今天的委託 " + nQCount + "都完成啦？來，這是#i" + reward[0] + ":# #t" + reward[0] + ":# " + (reward[1] - (nQCount * eachRewardCount)) + "個，送給你。希望你能善加運用。");
    } else {
        qm.dispose();
    }
}

function calQuestCount() {
    nQCount = nQMaxCount;
    if (qm.isQuestFinished(34585)) {
        nQCount--;
    }
    if (qm.isQuestFinished(35192)) {
        nQCount--;
    }
}