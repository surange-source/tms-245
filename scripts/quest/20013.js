/*
    NPC Name:         Kia
    Description:         Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
    status++;
    } else {
    if (status == 2) {
        qm.sendNext("嗯……。我就在這裡。");
        qm.safeDispose();
        return;
    }
    status--;
    }
    if (status == 0) {
    qm.sendNext("#b(*嘩……嘩……。*)#k");
    } else if (status == 1) {
    qm.sendNextPrev("哇唔！ 嘿！ 你嚇了我一跳，我都不知道有客人了。 你一定是剛才和 #p1102006# 聊天的人吧。歡迎你！我是 #p1102007#，和我的製作品 #b椅子#k。我在考慮做一個你喜歡的禮物。");
    } else if (status == 2) {
    qm.sendNextPrev("等等！ 我不能白白的送給你東西，因為我的材料沒有了， 你可以找到製作禮物的材料嗎？ 你看看周圍這個地方， 你可以看到有很多箱子， 你可以帶來 #t4032267# 和 #t4032268# 給我嗎？");
    } else if (status == 3) {
    qm.sendNextPrev("你知道怎麼從箱子裡面拿到材料呢？你就把眼前的箱子當成是一個怪物，使用普通攻擊攻擊他。攻擊幾次，就可以獲取裡面的材料了。");
    } else if (status == 4) {
    qm.askAcceptDecline("請帶來 1歌 #b#t4032267##k 和 1個 #b#t4032268##k 。用這些道具我將送你一樣禮物！");
    } else if (status == 5) {
    qm.forceStartQuest();
    qm.summonMsg(9);
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
    qm.sendNext("你帶來了我要的東西了嗎？讓我看看。 噢， 這些東西就是我想要的。 他們的確是一歌 #t4032267# 和一個 #t4032268#！我會用這些材料送給你一把椅子。");
    } else if (status == 1) {
    qm.sendNextPrev("給，這個就是 #t3010060#。你覺得怎麼樣，很漂亮吧。 坐上椅子，你可以更快的回復HP\MP。 可以放在快捷鍵上乘坐。好了，就到這裡了，祝你愉快！ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010060# 1 #t3010060# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
    } else if (status == 2) {
    qm.gainItem(4032267, -1);
    qm.gainItem(4032268, -1);
    qm.gainItem(3010060, 1);
    qm.forceCompleteQuest();
    qm.forceCompleteQuest(20000);
    qm.forceCompleteQuest(20001);
    qm.forceCompleteQuest(20002);
    qm.forceCompleteQuest(20015);
    qm.gainExp(95);
    qm.summonMsg(10);
    qm.dispose();
    }
}
