var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            qm.sendNext("只要消滅5只就可以了，你怕了嗎？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("來，讓我測試一下，你至今為止的基礎體力訓練結果。測試方法很簡單。這座島上有一種最強悍兇猛的怪獸，叫呆呆雪精靈，你只要擊退它就可以！要是能擊退#r50#k只就最好了……");
    } else if (status == 1) {
        qm.askAcceptDecline("不過#o0100134#的數量本來就不多，殺掉那麼多恐怕不利生態平衡的保持，你消滅5只就差不多了。你看，這訓練與自然環境之間是多麼滴和諧啊！真是完美啊……");
    } else if (status == 2) {
        if (!qm.isQuestActive(21018)) {
            qm.forceStartQuest();
        }
        qm.sendNextNoESC("#o0100134#在島的較深處。村子左邊的路一直走，就能看到#b#m140010200##k，請去那裡消滅#r5只#o0100134#s#k。");
    } else if (status == 3) {
        qm.TutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
