var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("嗯……說不定這方法能夠讓你恢復記憶～不論怎樣，還是值得一試的。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("英雄！你好！啊？你難道不知道自己是英雄嗎？前面3個人都喊那麼大聲了，我還能聽不見嗎？整個島都知道英雄甦醒的事情了。");
    } else if (status == 1) {
        qm.sendNextPrev("咦，你怎麼好像不開心的樣子？有什麼問題嗎？啊？不知道自己到底是不是英雄？你失憶了嗎？怎麼會……看樣子是被封凍在冰裡數百年來的後遺症。");
    } else if (status == 2) {
        qm.askAcceptDecline("嗯，既然你是英雄，揮揮劍也許就會想起什麼來呢？試著去#b打獵怪獸#k，怎麼樣？");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.sendNext("對了，這附近有許多#r#o9300383##k，請擊退 #r3只#k試試，說不定你就能想起什麼了。");
    } else if (status == 4) {
        qm.sendNextPrevS("哦，你應該還沒有忘記使用技能的方法吧？#b將技能拖到快捷欄上，以方便使用#k。除了技能以外，消費道具也可以拖到這裡來方便使用。", 1);
    } else if (status == 5) {
        qm.summonMsg(17);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("什麼？你不需要藥水？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("嗯……看你的表情就知道你啥都沒想起來。不過不用擔心。說不定這反倒更好。來，這裡有一些藥水，加油吧！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000022# 10個 #t2000022#\r\n#v2000023# 10個 #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
    } else if (status == 1) {
        qm.gainItem(2000022, 10);
        qm.gainItem(2000023, 10);
        qm.gainExp(57);
        qm.forceCompleteQuest();
        qm.sendOkS("#b（就算我真的是英雄……一個什麼能力都沒有的英雄又能有什麼用呢？）#k", 2);
        qm.dispose();
    }
}
