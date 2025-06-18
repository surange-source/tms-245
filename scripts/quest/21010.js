/*
 * The return of the Hero
 * Rien Cold Forest 1
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 3) {
            qm.sendNext("哎呀，別客氣！送英雄一瓶藥水又不是什麼大事。你要是改了主意，請隨時來找我。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("咦？什麼人在島上……？哎呦，這不是#p1201000#嗎？#p1201000#來這裡是為了……這人是#p1201000#的朋友嗎？啊？你說這人是英雄？");
    } else if (status == 1) {
        qm.sendNextPrev("     #i4001170#");
    } else if (status == 2) {
        qm.sendNextPrev("這位原來就是#p1201000#一族數百年間苦苦守候的英雄啊！啊，乍一看倒是和普通人沒什麼兩樣……");
    } else if (status == 3) {
        qm.askAcceptDecline("不過，既然被黑魔法師的詛咒給冰封了數百年，現在體力一定很虛弱吧。#b我這裡有些恢復體力的藥水，趕緊喝下去吧#k。");
    } else if (status == 4) { // TODO HP set to half
        qm.sendNext("請先喝掉藥水，然後再慢慢談！");
        qm.gainItem(2000022, 1);
        qm.forceStartQuest();
    } else if (status == 5) {
        qm.sendNextPrevS("#b（這藥水怎麼喝？……不記得了……）#k", 3);
    } else if (status == 6) {
        qm.summonMsg(0xE);
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
        qm.sendNext("我們一直試圖在冰層深處尋找傳說中的英雄，不過從沒想過真能找到你！預言果然沒有錯！#p1201000#做出了正確的選擇！既然英雄重新回來了，我們就沒有必要再懼怕黑魔法師了！");
    } else if (status == 1) {
        qm.sendNextPrev("哎呦，我怎麼抓著您聊了這麼久？實在是太高興了……其他的企鵝估計也會像我這樣的。雖然知道你很忙，不過在回村子的路上，#b還是盡量和其他的企鵝搭搭話吧#k。有大英雄和他們說話，他們肯定會驚訝得要死！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000022# #t2000022# 5個\r\n#i2000023# #t2000023# 5個\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 16 exp");
    } else if (status == 2) {
        qm.sendNextPrev("你升級了嗎？不知道你有沒有得到技能點數？在楓之谷世界，每升1級就能獲得技能點數3。按#bK鍵#k，打開技能欄就可確認。");
        if (qm.getQuestStatus(21010) == 1) {
            qm.gainExp(16);
            qm.gainItem(2000022, 5);
            qm.gainItem(2000023, 5);
            qm.forceCompleteQuest();
        }
    } else if (status == 3) {
        qm.sendNextPrevS("#b（對我這麼親切，我卻什麼都想不起來。我真的是英雄嗎？還是先查看一下技能吧……怎麼查看技能呀？）#k");
    } else if (status == 4) {
        qm.summonMsg(0xF);
        qm.dispose();
    }
}
