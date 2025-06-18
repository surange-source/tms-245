var status = -1;
var nQMaxCount = 3;
var nQCount;
var aDayQuests = [34381,34382,34383,34384,34385,34386,34387,34388,34389,34390,34391,34392,34393,34394];
var aDayQuest;
var excludeQuest = [];
var aNewDayQuest = [];
var ordQuest = 34379;
var cQuest = 34380;
var reward = [1712003, 4];

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            status = 4;
        } else if (status == 1) {
            qm.sendOk("今天有點累了嗎？如果有了餘力，隨時都可以來找我。\r\n我會等你的。");
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
        qm.askReplace("快來#h0#。謝謝你今天也答應了我的請託。\r\n\r\n" + menu);
    } else if (status == i++) {
        qm.sendYesNo("請託對你來說負擔太大了嗎？那麼請嘗試其他請託吧。\r\n\r\n#b（排除部分委託或所有委託，並重新組成目錄。）#k");
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
        qm.sendOk("完成所有請託後請回來找我。\r\n可別忘了一定要在#r#e黎明#k#n回來。\r\n提醒您，如果對請託有疑問，可透過#e#b任務情報視窗#k#n確認。");
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
            qm.sendOk("請把裝備欄空出" + (parseInt(reward[1]) - nQCount) + "格");
            qm.dispose();
            return;
        }
        qm.gainItem(reward[0], reward[1] - nQCount);
        qm.forceCompleteQuest();
        qm.sendNext("今天的請託 " + nQCount + "項都完成了，謝謝你。來，這裡#i" + reward[0] + ":# #t" + reward[0] + ":# " + (reward[1] - nQCount) + "個，請收下。");
    } else {
        qm.dispose();
    }
}

function calQuestCount() {
    nQCount = nQMaxCount;
    if (qm.isQuestFinished(34478)) {
        nQCount--;
    }
    if (qm.isQuestFinished(34269)) {
        nQCount--;
    }
}