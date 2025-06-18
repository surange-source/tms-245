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
        ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/9", 2000, 0, -100, 1, 0);
        ms.setDelay(2000);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.setForcedInput(1);
    ms.setDelay(30);
    } else{
        ms.teachSkill(20021181, -1, 0);
        ms.teachSkill(20021166, -1, 0);
        ms.teachSkill(20020109, 1, 1);
        ms.teachSkill(20020111, 1, 1);
        ms.teachSkill(20020112, 1, 1);
        ms.EnableUI(0);
    ms.DisableUI(false);
    ms.dispose();
    ms.warp(910150100, 0);
        ms.enableActions();
    }
}

