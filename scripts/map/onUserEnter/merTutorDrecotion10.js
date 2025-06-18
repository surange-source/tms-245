/*
 
 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1);
    ms.DisableUI(true);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/6", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.setForcedInput(2);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/8", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else{
    ms.EnableUI(0);
        ms.enableActions();
        ms.dispose();
    }
}

