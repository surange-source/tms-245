var status = -1;
var nQMaxCount = 3;
var eachRewardCount = 2;
var nQCount;
var aDayQuests = [39038,39039,39040,39041,39042,39043,39044,39045,39046,39047,39048,39049,39050];
var aDayQuest;
var excludeQuest = [];
var aNewDayQuest = [];
var ordQuest = 39036;
var cQuest = 39037;
var reward = [1712004, 8];

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            status = 4;
        } else if (status == 1) {
            qm.sendOk("     很忙嗎？我會等你的。準備好再告訴我吧。");
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
            menu += "     #b#e#y" + quest + "##k#n\r\n";
        }
        if (menu == "") {
            qm.sendOk("     發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.askReplace("     為了樹林能做的事情如下。\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendYesNo("     如何？看來能毫不勉強地幫我吧？\r\n     還有其他的事情要做，你也可以幫我看看嗎？\r\n\r\n     #b（排除部分委託或全部委託\r\n     重新組成目錄。）#k");
    } else if (status == i++) {
        var menu = "";
        for (var j = 0; j < aDayQuest.length; j++) {
            if (excludeQuest.indexOf(aDayQuest[j]) == -1) {
                menu += "     #b#e#L" + j + "# #y" + aDayQuest[j] + "##l#k#n\r\n";
            } else {
                menu += "     #e#L" + j + "# #y" + aDayQuest[j] + "##l#n\r\n";
            }
        }
        if (menu == "") {
            qm.sendOk("     發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.sendSimple("     選擇替換要做的事吧。\r\n\r\n" + menu + "     #L" + nQMaxCount + "# #r#e似乎沒有可以換的委託了。#k#n#l");
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
            menu += "     #b#e#y" + quest + "##k" + (aNewDayQuest.indexOf(quest) == -1 ? "" : " #r[NEW]#k") + "#n\r\n";
        }
        if (menu == "") {
            qm.sendOk("     發生未知錯誤");
            qm.dispose();
            return;
        }
        qm.sendNext((aNewDayQuest.length > 0 ? ("     選擇的 " + aNewDayQuest.length + "件該做的事改為新的事情" + aNewDayQuest.length + "個顯示。") : "") + "大家 " + nQCount + "種。\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendOk("     所有事情結束了再告訴我吧。\r\n      畢竟我們精靈是很懂得心懷感激的。\r\n     不過，一定要黎明前跟我說。");
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
            qm.sendOk("     請把裝備欄空出" + (parseInt(reward[1]) - (nQCount * eachRewardCount)) + "格");
            qm.dispose();
            return;
        }
        qm.gainItem(reward[0], reward[1] - nQCount);
        qm.forceCompleteQuest();
        qm.sendNext("     已經結束了？！比預想的還要厲害呢。\r\n     做為謝禮 #i" + reward[0] + ":# #t" + reward[0] + ":# " + (reward[1] - (nQCount * eachRewardCount)) + "個送給你，\r\n 來，這裡。");
    } else {
        qm.dispose();
    }
}

function calQuestCount() {
    nQCount = nQMaxCount;
    if (qm.isQuestFinished(34269)) {
        nQCount--;
    }
    if (qm.isQuestFinished(34585)) {
        nQCount--;
    }
}