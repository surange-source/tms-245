/* 
 5th Job Quests.
 Made by Kent
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.sendOk("考慮好後再來找我吧。");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("如果說楓之谷世界是井然有序的，那緋紅就是混亂、充滿未知的。我們從很久前開始就充當著這個世界的影子。");
        } else if (status == 1) {
            qm.sendNextPrev("其實，我並不想幫助楓之谷世界。不過，如果楓之谷世界消失，我們的世界也會受到威脅。就算是為我們自己考慮，我們也要盡全力阻止黑魔法師。");
        } else if (status == 2) {
            qm.sendNextPrevS("那你願意幫忙嘍？");
        } else if (status == 3) {
            qm.sendNextPrev("嗯？我好像沒那麼說吧？");
        } else if (status == 4) {
            qm.sendNextPrevS("……");
        } else if (status == 5) {
            qm.sendNextPrev("……");
        } else if (status == 6) {
            qm.sendNextPrevS("……");
        } else if (status == 7) {
            qm.askMenu("我知道了。你不要露出這種表情。我幫你不就行了嘛。不過，在此之前，我想進行簡單的測試！\r\n\r\n#L0#測試？");
        } else if (status == 8) {
            qm.askMenu("嗯，是非常簡單的運氣測試。我會把你趕走，你只要重新回來就行了。不過，入口將會被轉移到其他地方，而不是原來的地方。\r\n\r\n#L0#等等，怎麼能這樣...");
        } else if (status == 9) {
            qm.sendNextPrev("我不會等你太久的，讓我看看你的運氣吧。\r\n\r\n#b(5分鐘內，在世界樹上端找到傳送口吧！)#k");
        } else if (status == 10) {
            /*qm.forceStartQuest();
             qm.setQuestCustomData("find=0;r=1");
             qm.startQuestTimeLimitTask(1464, 5 * 60 * 1000);
             qm.warp(105300000);
             qm.dispose();*/
            if (qm.canHold(2435736)) {
                qm.sendOkS("見到了女神，集齊了3個神秘石。旁觀者好像說他會重新聯絡我的…等等看他的消息吧。");
                qm.gainItem(2435736, 1);
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("背包空間不足！請清理");
            }
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            qm.sendNext("我開玩笑的。你想要的是這東西吧？其實，我從一開始就打算給你了，快拿走吧。\r\n\r\n#b#i2435736:# #t2435736:# 1個");
        } else if (status == 1) {
            if (qm.canHold(2435736)) {
                qm.sendOkS("見到了女神，集齊了3個神秘石。旁觀者好像說他會重新聯絡我的…等等看他的消息吧。");
                qm.gainItem(2435736, 1);
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("背包空間不足！請清理");
            }
            qm.dispose();
        }
    }
}
