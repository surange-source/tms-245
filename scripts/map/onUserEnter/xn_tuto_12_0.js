/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

    if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
        ms.spawnNPCRequestController(2159377, -889,-311);
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.spawnNPCRequestController(2159381,-1040, 20);
        ms.setNPCSpecialAction(2159381, "summon");
        ms.spawnNPCRequestController(2159384,-990 ,20);
        ms.setNPCSpecialAction(2159384, "summon");
        ms.spawnNPCRequestController(2159379, -780, 20);
        ms.setNPCSpecialAction(2159379, "summon");
        ms.spawnNPCRequestController(2159385, -470,20);
        ms.setNPCSpecialAction(2159385, "summon");
        ms.spawnNPCRequestController(2159386, -550,20);
        ms.setNPCSpecialAction(2159386, "summon");
        ms.spawnNPCRequestController(2159387, -370,20);
        ms.setNPCSpecialAction(2159387, "summon");
        ms.spawnNPCRequestController(2159388, -620,20);
        ms.setNPCSpecialAction(2159388, "summon");
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg2/17", 900, 0, -120, 0, 0);
        ms.setDelay(2400);
    } else if (status == 3) {
        ms.getNPCDirectionEffect(2159385, "Effect/Direction12.img/effect/tuto/BalloonMsg2/18", 1500, 0, -145);
        ms.setDelay(1380);
    } else if (status == 4) {
        ms.sendSelfTalk(1, 2159384, "各位！");
    } else if (status == 5) {
        ms.sendSelfTalk(1, 2159387, "吉格蒙特，我來救你了。我們等回去之後再寒暄吧。啊哈！");
    } else if (status == 6) {
        ms.setNPCSpecialAction(2159387, "shoot");
        ms.setDelay(720);
    } else if (status == 7) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/smogStart", 900, 0, -120, 0, 0);
        ms.setDelay(1050);
    } else if (status == 8) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/smog", 900, 0, -120, 0, 0);
        ms.setDelay(1500);
    } else if (status == 9) {
        ms.removeNPCRequestController(2159381);
        ms.removeNPCRequestController(2159384);
        ms.removeNPCRequestController(2159385);
        ms.removeNPCRequestController(2159386);
        ms.removeNPCRequestController(2159387);
        ms.removeNPCRequestController(2159388);
        ms.setVansheeMode(1);
        ms.setDelay(2220);
    } else if (status == 10) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/smogEnd",900, 0, -120, 0, 0);
        ms.setDelay(420);
    } else if (status == 11) {
        ms.setDelay(600);
    } else if (status == 12) {
        ms.setDelay(600);
    } else if (status == 13) {
        ms.getNPCDirectionEffect(2159379, "Effect/Direction12.img/effect/tuto/BalloonMsg0/1", 1200, 0, -120);
        ms.setDelay(1200);
    } else {
        ms.removeNPCRequestController(2159379);
        ms.EnableUI(0);
    ms.DisableUI(false);
        ms.dispose();
        ms.warp(931060070, 0);
        ms.enableActions();
    }
}

