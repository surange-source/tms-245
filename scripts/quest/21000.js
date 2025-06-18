var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("不行，狂狼勇士……要是拋下孩子我們自己逃掉……就算能活下去也沒什麼意義！我知道這個要求對你而言很勉強，不過還是請你再考慮考慮！");
            qm.dispose();
            return;
        }
        status--
    }
    if (status == 0) {
        qm.sendYesNo("糟糕！有個孩子被留在森林裡了！我們不能丟下孩子就這麼逃走！狂狼勇士……請你救救孩子吧！你傷得這麼重，還要你去戰鬥，我們心裡也很過意不去……但只有你能夠救那個孩子啊！");
    } else if (status == 1) {
        qm.forceStartQuest(21000, "..w?PG"A^E."); // Idk what data lol..
        qm.forceStartQuest(21000, "..w?PG"A^E."); // Twice, intended..
        qm.sendNext("#b孩子可能在森林的深處#k！必須在黑魔法師找到我們之前，啟動方舟，所以必須盡快救出孩子才行！");
    } else if (status == 1) {
        qm.sendNextPrev("關鍵是不要慌張，狂狼勇士。如果你要查看任務進行狀態，按#bQ鍵#k就能在任務欄中查看。");
    } else if (status == 2) {
        qm.sendNextPrev("拜託了，狂狼勇士！救救孩子吧！我們不能再有人因為黑魔法師而犧牲了！");
    } else if (status == 3) {
        qm.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1");
        qm.dispose();
    }
}

/*function end(mode, type, selection) {
    qm.dispose();
}*/
