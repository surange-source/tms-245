var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("啊！狂狼勇士大人拒絕了！");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.askAcceptDecline("呃呃……嚇死我了……快，快帶到赫麗娜那邊去！");
    } else if (status == 1) {
        if (qm.getQuestStatus(21001) == 0) {
            qm.gainItem(4001271, 1);
            qm.forceStartQuest(21001, null);
        }
        qm.warp(914000300, 0);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("孩子呢？孩子救出來了的話，就趕緊讓我們看看。");
            qm.dispose();
            return;
        } else if (status == 8) { // watching the introduction
            if (qm.haveItem(4001271)) {
                qm.gainItem(4001271, -1);
            }
            qm.MovieClipIntroUI(true);
            qm.forceCompleteQuest();
            qm.warp(914090010, 0);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("呵呵，平安回來了？孩子呢？孩子也帶回來了嗎？");
    } else if (status == 1) {
        qm.sendNext("太好了……真是太好了。");
    } else if (status == 2) {
        qm.sendNextPrevS("趕快上船！已經沒時間了！", 3);
    } else if (status == 3) {
        qm.sendNextPrev("啊，沒錯。現在不是感傷的時候。黑魔法師的氣息越來越近！似乎他們已經察覺方舟的位置，得趕緊啟航，不然就來不及了！");
    } else if (status == 4) {
        qm.sendNextPrevS("立刻出發！", 3);
    } else if (status == 5) {
        qm.sendNextPrev("狂狼勇士！請你也上船吧！我們理解你渴望戰鬥的心情……不過，現在已經晚了！戰鬥就交給你的那些同伴吧，和我們一起去維多利亞島吧！");
    } else if (status == 6) {
        qm.sendNextPrevS("不行！", 3);
    } else if (status == 7) {
        qm.sendNextPrevS("赫麗娜，你先出發去維多利亞島。一定要活著，我們一定會再見的。我要和同伴們一起同黑魔法師戰鬥！", 3);
    } else if (status == 8) {
        qm.sendYesNo("Would you like to skip the video clip?  Even if you skip the scene, game play will not be affected.");
    } else if (status == 9) { // Not watching
        if (qm.haveItem(4001271)) {
            qm.gainItem(4001271, -1);
        }
        qm.forceCompleteQuest();
        qm.warp(140090000, 0);
        qm.dispose();
    }
}
