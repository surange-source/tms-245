/*
 
 */

var status = -1;

function action(mode, type, selection) {
    status++;

    if (status == 0) {
        ms.setInGameCurNodeEventEnd(true);
    ms.DublStart(true);
        ms.EnableUI(1);
    ms.setDelay(2000);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.topMsg("某個下雨天");
    ms.setForcedInput(2);
    ms.setDelay(2000);
    } else if (status == 2) {
    ms.DublStart(false);
    ms.setDelay(200);
    } else if (status == 3) {
    ms.DublStart(true);
    ms.topMsg("飛花園深處");
    ms.setInGameCurNodeEventEnd(true);
    ms.setDelay(6000);
    } else{
    //ms.lockUI();
    ms.DublStart(false);
    ms.EnableUI(0);
    ms.DisableUI(false);
        ms.enableActions();
    ms.dispose();
    }
}

