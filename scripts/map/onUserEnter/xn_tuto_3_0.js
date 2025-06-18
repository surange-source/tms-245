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
        ms.spawnNPCRequestController(2159377, -200,10);
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.DisableUI(true);
        ms.setNPCSpecialAction(2159377, "summon");
        ms.setForcedInput(2);//改變方向走
        ms.setDelay(300);
    } else if (status == 1) {
        ms.setForcedInput(3);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/doorOpen", 0, 0, -100, 0, 0);
        ms.setDelay(3000);
    } else if (status == 2) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg2/8", 1200, 0, -120);
        ms.setDelay(1200);
    } else if (status == 3) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg2/9", 1200, 0, -120);
        ms.setDelay(1200);
    } else if (status == 4) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg2/10", 1200, 30, -250);
        ms.setDelay(1200);
    } else if (status == 5) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg2/8", 1200, 0, -120);
        ms.setDelay(1200);
    } else if (status == 6) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg2/7", 1200, 0, -250);
        ms.setDelay(1200);
    } else {
        ms.removeNPCRequestController(2159377);
        ms.EnableUI(0);
        ms.dispose();
        ms.warp(931060081, 0);
        ms.enableActions();
    }
}

