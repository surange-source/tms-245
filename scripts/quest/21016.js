var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("還沒做好準備嗎？那麼準備好後再來跟我說一聲。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.askAcceptDecline("開始基礎體力鍛煉吧？準備好了？再確認一下劍是否裝備好了？技能和藥水是否已經托到了快捷欄中？");
    } else if (status == 1) {
        if (!qm.isQuestActive(21016)) {
            qm.forceStartQuest();
        }
        qm.sendNextS("很好。下面要去打獵的#r#o0100132#s#k，是比#o0100131#s更厲害一些的怪獸。去#b#m140020100##k抓#r15只#k，這將有助於你的體力提高。體力就是冒險動力的來源！快出去吧！", 1);
    } else if (status == 2) {
        qm.TutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
