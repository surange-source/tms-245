/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

   if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.setDelay(1200);
    } else if (status == 3) {
        ms.setForcedInput(1);
        ms.setDelay(210);
    } else if (status == 4) {
        ms.setForcedInput(2);
        ms.setDelay(420);
    } else if (status == 5) {
        ms.setForcedInput(1);
        ms.setDelay(420);
    } else if (status == 6) {
        ms.setForcedInput(2);
        ms.setDelay(420);
    } else if (status == 7) {
        ms.setForcedInput(0);
        ms.sendSelfTalk(3, 2159377, "剛才的奇怪場面到底是什麼呢？一回想腦海中就會出現噪音，讓人無法繼續回想。之前好像沒有發生過這種事情啊……。");
    } else if (status == 8) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg0/1", 1200, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 9) {
        ms.sendSelfTalk(3, 2159377, "在格裡梅爾博士回來之前，必須見見剛才那個人。她現在應該被關在監獄裡。");
    } else {
        ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(0);
        ms.dispose();
        ms.warp(931050960, 0);
        ms.enableActions();
    }
}

