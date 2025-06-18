/*
 Author: Pungin
 */
var status = -1;

function action(mode, type, selection) {
    status++;
    if (status == 0) {
        ms.EnableUI(1);
        ms.DisableUI(true);
        ms.setDelay(3000);
        ms.setInGameCurNodeEventEnd(true);
    } else if (status == 1) {
        ms.showEffect(false, "demonSlayer/text12");
        ms.setForcedInput(1);
        ms.setDelay(10);
    } else {
        ms.setForcedInput(0);
        ms.dispose();
        ms.openNpc(2159311);
    }
}
