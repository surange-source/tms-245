var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 5) {
            qm.sendNextS("#b(我們的英雄，你這是怎麼了？)#k", 2);
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextS("現在，身體筋骨差不多舒展開了吧？這種時候還要進一步加強訓練強度才能保證鍛煉出過硬的基礎體力。來吧，繼續基礎體力的鍛煉吧。", 8);
    } else if (status == 1) {
        qm.sendNextPrevS("這次去#b#m140020200##k消滅#r#o0100133##k試試看。大概消滅#r20只#k就行，將會對你的體力增長大有幫助。快去快去……咦？你有什麼話要說嗎？", 8);
    } else if (status == 2) {
        qm.sendNextPrevS("……為什麼消滅的怪獸數量越來越多了？", 2);
    } else if (status == 3) {
        qm.sendNextPrevS("是要越來越多。難道說20只還不夠嗎？要不消滅100只試試？哦，這還不夠，索性不如像林中之城那樣，一口氣消滅999隻怪獸試試……", 8);
    } else if (status == 4) {
        qm.sendNextPrevS("不，不用了，這樣就夠了。", 2);
    } else if (status == 5) {
        qm.askAcceptDecline("哎呦哎呦，用不著這麼謙虛。我充★分★理解英雄大人渴望趕緊變得厲害起來的心情。真不愧是英雄大人……");
    } else if (status == 6) {
        qm.forceStartQuest();
        qm.sendNextS("#b(再這麼說下去，搞不好真得讓我去消滅999這怪獸了，趕緊接任務得了。)#k", 2);
    } else if (status == 7) {
        qm.sendNextPrevS("那就拜託你消滅20只#o0100133#。", 8);
    } else if (status == 8) {
        qm.TutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
