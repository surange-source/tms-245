/*
 
 */

var status = -1;

function action(mode, type, selection) {
    if (mode >= 0) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.sendSelfTalk("普力特和精靈遊俠應該已經進去了。我不能晚去的。");
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.setDelay(750);
    } else if (status == 2) {
    ms.setForcedInput(2);
    ms.setDelay(1000);
    } else if (status == 3) {
    ms.TutInstructionalBalloon("Effect/OnUserEff.img/normalEffect/demonSlayer/chatBalloon0");
    ms.showWZEffect(24, "Effect/Direction8.img/lightningTutorial2/Scene2");
    ms.sendSelfTalk("門裡面，黑暗的氣息濃的彷彿要令人窒息了。難道這就是黑魔法師的力量……？！必須趕緊進去，支援他們兩個。");
    } else if (status == 4) {
    ms.setDelay(1000);
    } else {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(0);
    ms.dispose();
    ms.warp(927020090, 0);
    ms.enableActions();
    }
}    

