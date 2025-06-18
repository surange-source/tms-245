/*
 * 尋找第3條路
 * 夜光3轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNextNoESC("夜光法師，我已經將秘寶力量全部收集來了。");
    } else if (status == 1) {
        qm.sendNextPrevS("現在利用這種力量，就能將夜光法師身體內的黑暗與光明融合在一起。", 1);
    } else if (status == 2) {
        qm.sendNextPrevS("別忘了。無論秘寶力量有多強大，最終還是要靠夜光法師你去戰勝它。", 1);
    } else if (status == 3) {
        qm.PlayerToNpc("不要擔心。我對自己的承受力有信心。");
    } else if (status == 4) {
        qm.sendNextPrevS("記住這句話。#b<最黑暗的時候，光芒最盛。>#k一定會有幫助的。開始啦。嘿啊啊呀！", 1);
    } else if (status == 5) {
        qm.PlayerToNpc("哇呀呀呀呀！");
    } else if (status == 6) {
        qm.sendNextPrevS("成功了！我就知道這樣，不愧是夜光法師。", 1);
    } else if (status == 7) {
        qm.PlayerToNpc("(流淌在我體內的氣息不太一樣了。有種光與黑暗融為一體的感覺……)");
    } else if (status == 8) {
        qm.sendNextPrevS("剛才應該消耗了不少力氣，先休息休息吧。關於你現在的情況，我一會和你細說。", 1);
    } else if (status == 9) {
        if (qm.getJob() == 2710) {
            qm.changeJob(2711);
        }
        qm.forceCompleteQuest();
        qm.dispose();
    }
}
