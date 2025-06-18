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
            qm.sendNext("你來啦，陌生人。\r\n\r\n雖然你並不屬於我們世界，但如果你願意守護我們的世界，我肯定會盡全力幫助你的。");
        } else if (status == 1) {
            qm.sendNext("如果你想獲得我的幫助，應該向我證明你的強大和勇猛吧。你能對抗#r梅格耐斯#k嗎？");
        } else if (status == 2) {
            qm.sendNext("我相信你肯定能做到的。\r\n\r\n#b(消滅梅格耐斯1次後，再回來吧。)#k");
        } else if (status == 3) {
            qm.forceStartQuest();
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
            qm.sendNext("你這麼快就回來啦。你果然不是一般的強大。\r\n\r\n#b#i2435735:# #t2435735:# 1個");
        } else if (status == 1) {
            if (qm.canHold(2435735)) {
                qm.sendOkS("通過了女神的考驗，獲得了神秘石。現在去找其他女神吧。\r\n\r\n#b#p1540944##k : 墮落世界樹的#b#m105300000##k");
                qm.gainItem(2435735, 1);
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("背包空間不足！請清理");
            }
            qm.dispose();
        }
    }
}
