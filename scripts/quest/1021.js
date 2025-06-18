/* Author: Xterminator (Modified by RMZero213)
 NPC Name:         Roger
 Map(s):         Maple Road : Lower level of the Training Camp (2)
 Description:         Quest - Roger's Apple
 任務 - 羅傑和蘋果
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("哈嘍, 小傢伙~跟我聊聊啊？哈哈！我是專門為初來這裡的冒險家們提供信息的教官， #p2000#。");
        } else if (status == 1) {
            qm.sendNextPrev("你問我是誰指認我為教官的？呵呵，你的好奇心還挺多啊！不錯不錯~是我自己喜歡當教官的。");
        } else if (status == 2) {
            qm.askAcceptDecline("來。。。開個小玩笑怎麼樣？咦！");
        } else if (status == 3) {
            if (qm.getPlayerStat("HP") >= 50) {
                //        qm.getPlayer().setHp(25);
                //        qm.getPlayer().updateSingleStat(client.MapleStat.HP, 25);
            }
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            qm.sendNext("是不是嚇了一跳？HP跌到0就壞了。來，給你#r#t2010007##k，把它吃掉就會恢復了。你打開道具窗看看#I");
        } else if (status == 4) {
            qm.sendPrev("你要把我給你的#t2010007#全部吃掉，停滯在一個地方什麼都不做HP也會恢復的。。。你恢復了全部的HP在跟我聊聊吧。#I");
        } else if (status == 5) {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (qm.getPlayerStat("HP") < 50) {
                qm.sendNext("嗨，你的HP還沒有完全恢復，使用我給你的蘋果來補充吧！快去試試!");
                qm.dispose();
            } else {
                qm.sendNext("消耗道具。。。怎麼樣？很簡單吧？可以在右下角設定#b快捷鍵#k，你還不知道吧？哈哈~");
            }
        } else if (status == 1) {
            qm.sendNextPrev("不錯！學得很好應該給你禮物。這些都是在旅途中必需的，謝謝我吧！危機的時候好好使用。");
        } else if (status == 2) {
            qm.sendNextPrev("我能教你的只有這些了。有點兒捨不得也沒辦法，到了要離別的時候。路上小心，一路順風啊！！！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
        } else if (status == 3) {
            qm.gainExp(10);
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}
