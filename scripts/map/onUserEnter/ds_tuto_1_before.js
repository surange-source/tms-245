/*
 Author: Pungin
 */
var status = -1;

function action(mode, type, selection) {
    status++;
    if (status == 0) {
        ms.EnableUI(1);
        ms.DisableUI(true);
        ms.setForcedInput(1);
        ms.setDelay(30);
        ms.setInGameCurNodeEventEnd(true);
    } else if (status == 0) {
        ms.setForcedInput(0);
        ms.showEffect(false, "demonSlayer/text8");
        ms.setDelay(500);
    } else if (status == 1) {
        ms.showEffect(false, "demonSlayer/text9");
        ms.setDelay(3000);
    } else {
        ms.dispose();
        ms.warp(927000010, 0);
    }
}


