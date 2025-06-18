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
        ms.setDelay(90);
    } else if (status == 1) {
        ms.showEffect(false, "demonSlayer/text11");
        ms.setDelay(4000);
    } else {
        ms.showWZEffect("Effect/Direction6.img/DemonTutorial/Scene2");
        ms.dispose();
    }
}


