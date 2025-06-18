/*
 * 變得更強的附加契約
 * 天使破壞者4轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 10) {
            qm.sendNext("剛剛那個正義勇士跑哪裡去了？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("#h0#，你在認真修煉啊？");
    } else if (status == 1) {
        qm.sendNextPrevS("嗯，我能幫助那麼多的人，得到他們的喜愛，真開心。", 2)
    } else if (status == 2) {
        qm.sendNextPrev("(呃……這孩子真善良……)嗯，你的想法很積極向上。我有個建議給你，要不要聽聽？");
    } else if (status == 3) {
        qm.sendNextPrevS("你突然那麼一本正經的，讓人好緊張。是什麼建議？", 2)
    } else if (status == 4) {
        qm.sendNextPrev("我一直都很正經的。");
    } else if (status == 5) {
        qm.sendNextPrevS("越看越嚇人額？哈哈哈。", 2)
    } else if (status == 6) {
        qm.sendNextPrev("真被你打敗了。行了，說說正題吧。咱倆被強制結成契約有一段時間了吧，現在應該可以締結額外契約了。");
    } else if (status == 7) {
        qm.sendNextPrevS("額外契約？", 2)
    } else if (status == 8) {
        qm.sendNextPrev("第一次契約不是我們自己決定的，而是受到命運的指引。但額外的契約必須要你我都同意才能締結。");
    } else if (status == 9) {
        qm.sendNextPrevS("呃……是粉紅色又要加深了嗎？不過要是能獲得幫助更多人的力量，粉紅色我忍了。", 2)
    } else if (status == 10) {
        qm.askAcceptDeclineNoESC("那麼就建立額外契約咯！你必須跟我同時締結契約，集中精神吧？");
    } else if (status == 11) {
        if (qm.getJob() == 6511) {
            qm.changeJob(6512);
        }
        if (!qm.haveItem(1142498, 1)) {
            qm.gainItem(1142498, 1);
        }
        qm.forceCompleteQuest();
        qm.sendNextS("為了大家，我要變強！！！", 2);
        qm.dispose();
    }
}
