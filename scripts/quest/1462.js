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
            qm.sendNext("遠道而來，真是辛苦你了。\r\n\r\n我們一直守護著這個世界的勇士，但卻很少有人見過我們的樣子。");
        } else if (status == 1) {
            qm.sendNext("你想獲得控制艾爾達斯的力量？\r\n\r\n你的體內也存在著艾爾達斯。如果好好利用這艾爾達斯，你就能發揮出新力量。當然，前提是我為你提供一點點幫助。");
        } else if (status == 2) {
            qm.sendNext("不過，在此之前希望你能回答我一個問題。\r\n\r\n#b(女神好像有什麼疑問。去聽聽是什麼疑問吧。)#k");
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
            qm.sendNext("我想問的問題非常簡單。");
        } else if (status == 1) {
            qm.askMenu("你在這個世界上最珍惜、最想守護的東西是什麼？\r\n\r\n#L0#和我一起對抗黑魔法師的同伴們#l\r\n");
        } else if (status == 2) {
            qm.askMenu("艾爾達斯不停地重複著誕生與消亡，構成並支撐著這個世界。不僅楓之谷世界，其他次元的世界中也充斥著艾爾達斯。從你剛剛踏上這個世界開始，無論是泥土和樹木，還是光明和黑暗中...都存在艾爾達斯\r\n\r\n#L0##b看來艾爾達斯真的很重要啊。#k#l");
        } else if (status == 3) {
            qm.sendNext("我認為可以相互信任的同伴最為珍貴。\r\n\r\n所以我最珍惜跟我一起對抗黑魔法師的同伴們。當然，其中也有些不可靠的傢伙，但... 這都是小問題。");
        } else if (status == 4) {
            qm.sendNext("這樣啊。這並不是一個簡單的問題。因為對所有人來說，珍惜的東西都不僅只有一個。\r\n\r\n這個問題並沒有正確答案。我只是好奇勇士你為什麼想守護這個世界而已。\r\n\r\n#b#i2435734:# #t2435734:# 1個");
        } else if (status == 5) {
            qm.sendNext("這個石頭被稱為#b神秘石#k。如果勇士你把自己的力量記錄在這石頭上，艾爾達斯之力就會化作適合你的形態，滲入你的體內。");
        } else if (status == 6) {
            if (qm.canHold(2435734)) {
                qm.sendNext("通過了女神的考驗，獲得了神秘石。現在去找其他女神吧。\r\n\r\n#b#p1540943##k : 萬神殿的#b#m400000001##k\r\n#b#p1540944##k : 墮落世界樹的#b#m105300000##k");
                qm.gainItem(2435734, 1);
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("背包空間不足！請清理");
            }
            qm.dispose();
        }
    }
}
