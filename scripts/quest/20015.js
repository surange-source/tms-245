/*
    NPC Name:         西格諾斯
    Description:         向年輕女王行禮
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("我知道你猶豫了，但是我可以看到你的勇氣，還沒有迸發出來……。");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("你知道嗎？楓之谷世界看起來很和平，但是在某些地方卻充滿了黑暗的力量。暗黑魔法師，那些即將要復活的暗黑魔法師正威脅著楓之谷世界！");
    } else if (status == 1) {
        qm.sendNextPrev("我們不能在這裡坐以待斃，我們的敵人越來越強壯。我們需要更加強大！");
    } else if (status == 2) {
        qm.askAcceptDecline("但是我不會太擔心，#h#,確定你能保護楓之谷世界嗎？如果你相信自己能成為楓之谷騎士團，我相信你可以做到這一切！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1142065# #t1142065# - 1");
    } else if (status == 3) {
        if (qm.getQuestStatus(20015) == 0) {
            qm.gainItem(1142065, 1);
            qm.forceCompleteQuest();
        }
        qm.sendNext("呵呵，我就知道你會這麼說的。但是你還有很長的路要走，到了巔峰時刻，你就可以保護楓之谷世界了。");
    } else if (status == 4) {
        qm.sendPrev("#p1101002#, 我的謀劃師，他就在我的旁邊，他會幫助你成為一名楓之谷騎士。希望你成功！");
        qm.safeDispose();
    }
}

function end(mode, type, selection) {
}
