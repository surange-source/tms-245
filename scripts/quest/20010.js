/*
    NPC Name:         Kimu
    Description:         Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("我一直在這裡，如果你改變注意，可以再次來找我。");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("歡迎來到聖地！你是誰？ 噢，你是 #b#h0##k！ 很高興見到你！ 我在這裡等你好久了， 你將成為一個楓之谷騎士， 對嗎？ 我的名字是 #p1102004#。");
    } else if (status == 1) {
        qm.sendNextPrev("如果你想成為楓之谷騎士團中的一員，你可以找我旁邊的那位先生，他可以幫助你成為楓之谷騎士團中的一員。");
    } else if (status == 2) {
        qm.sendNextPrev("噢，我提醒你一下，這個是一項任務。你可能偶爾可以注意到，NPC頭頂上偶爾會有燈泡，那稱之為#b任務（QUEST）#k。完成任務你將可以得到很多豐富的獎勵！");
    } else if (status == 3) {
        qm.askAcceptDecline("你願意見見 #b#p1102005##k嗎？ 你想知道怎麼打獵嗎？你可以找到 #p1102005# 來教你怎麼打獵！");
    } else if (status == 4) {
        qm.forceStartQuest();
        qm.summonMsg(2);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("Are you the Noblesse my brother #p1102004# sent? Nice to meet you! I''m #p1102005#. I'll give you the reward #p1102004# asked me to give you. Remember, you can check your Inventory by pressing the #bI key#k. Red potions help you recover HP, and blue ones help recover MP. It's a good idea to learn how to use them beforehand so you''ll be ready with them when you're in danger. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000020# 5 #t2000020# \r\n#i2000021# 5 #t2000021# 5 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 15 exp");
    } else if (status == 1) {
        qm.gainItem(2000020, 5);
        qm.gainItem(2000021, 5);
        qm.forceCompleteQuest();
        qm.gainExp(15);
        qm.summonMsg(3);
        qm.dispose();
    }
}
