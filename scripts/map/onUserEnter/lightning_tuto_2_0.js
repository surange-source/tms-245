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
    ms.sendDirectionEffectPlay("Effect/Direction8.img/effect/tuto/BalloonMsg0/2", 0, 0, -120, 0, 0);
    ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
    ms.setDelay(700);
    } else if (status == 1) {
    ms.sendDirectionEffectPlay("Effect/Direction8.img/effect/tuto/BalloonMsg0/3", 0, 0, -120, 0, 0);
    ms.setDelay(2000);
    } else if (status == 2) {
    ms.sendDirectionEffectPlay("Effect/Direction8.img/effect/tuto/BalloonMsg0/4", 0, 0, -120, 0, 0);
    ms.setDelay(2000);
    } else {
    ms.EnableUI(0);
    ms.dispose();
    //ms.warp(927020050, 0);
    ms.enableActions();
    }
}

