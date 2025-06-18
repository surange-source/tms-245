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
    ms.EnableUI(1);
        ms.setVansheeMode(1);
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setForcedInput(1);
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.setDelay(3000);
    } else {
        ms.dispose();
        ms.warp(931050920, 0);
        ms.enableActions();
    }
}

