/*
    NPC Name:         Grendel the really old
    Description:         Quest - In search of the lost memory
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
            qm.sendNext("啊，原來是你。沒想到很久之後還能看到你。我很高興看到曾經是青澀的新手的你成為了大魔法師。看到很久不見但還記得我的你，我的心裡充滿了溫暖。你是在尋找遺忘的記憶嗎？想起來那已經是很久很久以前的事了，事隔多年，真是讓人懷念啊。這樣吧。你再去#b旁觀者#k吧。相信他會幫助你。那麼再見……");
            qm.forceCompleteQuest();
            qm.forceCompleteQuest(3507);
            qm.dispose();
        }
        //    qm.forceStartQuest();
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
            qm.sendNextPrev("Test");
            qm.dispose();
        }
    }
}
