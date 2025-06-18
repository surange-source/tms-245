var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("還沒做好準備嗎？那麼準備好後再來跟我說一聲。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("好了，說明到這裡就告一段落，我們要進入下一階段了。下一階段是什麼？剛才我已經說過了。就是不斷的磨練自己直到你擁有足以戰勝黑魔法師的實力。");
    } else if (status == 1) {
        qm.sendNextPrev("雖然在幾年前你確實是英雄，但這畢竟是很久以前的事情了。就算沒有黑魔法師的詛咒，在冰塊裡封凍了那麼久，身體筋骨什麼的也沒那麼靈活了吧？首先要做些準備活動。想知道是怎麼樣的準備活動？");
    } else if (status == 2) {
        qm.askAcceptDecline("身體是革命的本錢。英雄也要從基本體力開始訓練！……那句話你也知道吧？當然要從#b 基本體力鍛煉#k開始練起……啊，你可能不記的了。不過也沒關係。嘗試一下你就明白了。現在就開始基礎體力鍛煉吧？");
    } else if (status == 3) {
        if (!qm.isQuestActive(21015)) {
            qm.forceStartQuest();
        }
        qm.sendNextS("在這個幾乎全是企鵝的島上，也有幾隻怪獸。去村子右邊的#b冰雪覆蓋的原野1#k，就能看到許多香腸嘴雪精靈。請消滅#r10只香腸嘴雪精靈#k。我們這些苯拙的企鵝用啄都能抓的到香腸嘴雪精靈，你總不能還抓不到吧？", 1);
    } else if (status == 4) {
        qm.TutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
