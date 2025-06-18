/*
    NPC Name:         Kinu
    Description:         Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("普通攻擊是最基礎的攻擊技能。");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("我一直在等你，h0#。 我的名字是 #p1102006# 。 嗯……。看來你已經學過了普通攻擊了？你想學會除了普通攻擊外的其它技能嗎？學會這些技能將會在楓葉谷世界中很有幫助哦。");
    } else if (status == 1) {
        qm.sendNextPrev("每一次升級，都有相應的#b技能點#k。可以按#bk#k鍵查看你的技能。把技能點加在你想要加的技能上面，別忘了。常用的技能可以用鍵盤設置放在自己喜歡的鍵盤上面。");
    } else if (status == 2) {
        qm.askAcceptDecline("趁現在你還沒忘記，你會發現在這裡有很多怪物，使用你的蝸牛殼技能，打敗他們！成功後，再來找我吧。我就在這裡等你。");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.summonMsg(8);
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
        qm.sendNext("除了蝸牛投擲術，還有很多有趣的技能。好吧，按照約定，我將送你一些東西。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 exp");
    } else if (status == 1) {
        qm.gainItem(4000483, -1);
        qm.forceCompleteQuest();
        qm.gainExp(40);
        qm.dispose();
    }
}
