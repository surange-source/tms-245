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
        ms.teachSkill(20021181, 1, 1);
        ms.teachSkill(20021166, 1, 1);
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1);
    ms.DisableUI(true);
        //ms.playMovie("adventurer.avi", true);
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
        ms.setForcedInput(4);
    ms.setDelay(2100);
    } else if (status == 2) {
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/0", 2000, 0, -100, 1, 0);
    ms.setDelay(3000);
    } else if (status == 3) {
    ms.setForcedInput(2);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/1", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else if (status == 4) {
    ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/2", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else if (status == 5) {
    ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/3", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else if (status == 6) {
    ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/4", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else if (status == 7) {
    ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
    ms.sendDirectionEffectPlay("Effect/Direction5.img/effect/mercedesInIce/merBalloon/5", 2000, 0, -100, 1, 0);
    ms.setDelay(2000);
    } else if (status == 8) {
    ms.EnableUI(0);
        ms.enableActions();
        ms.dispose();
    }
}

