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
        ms.setVansheeMode(1);
        ms.setForcedInput(0);
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setForcedInput(0);
        ms.spawnNPCRequestController(2159368, -1050,-14, -30);
        ms.setNPCSpecialAction(2159368, "summon");
        ms.spawnNPCRequestController(2159376, -1800,-14, -30);
        ms.setNPCSpecialAction(2159376, "summon");
        ms.updateNPCSpecialAction(2159368, -1,300, 100);
        ms.setDelay(300);
    } else if (status == 2) {
        ms.setDelay(300);
    } else if (status == 3) {
        ms.getNPCDirectionEffect(2159368, "Effect/Direction12.img/effect/tuto/BalloonMsg0/2", 900, 0, -120);
        ms.setDelay(810);
    } else if (status == 4) {
        ms.sendSelfTalk(1, 2159368, "那個爺爺是誰啊？好像不是村裡人。");
    } else if (status == 5) {
        ms.getNPCDirectionEffect(2159376, "Effect/Direction12.img/effect/tuto/BalloonMsg2/6", 900, 0, -120);
        ms.setDelay(810);
    } else if (status == 6) {
        ms.spawnNPCRequestController(2159422, -1450,-14, -30);
        ms.setNPCSpecialAction(2159422, "summon");
        ms.spawnNPCRequestController(2159423, -1350,-14, -30);
        ms.setNPCSpecialAction(2159422, "summon");
        ms.setDelay(1200);
    } else if (status == 7) {
        ms.getNPCDirectionEffect(2159368, "Effect/Direction12.img/effect/tuto/BalloonMsg1/0", 1200, 0, -120);
        ms.setDelay(1200);
    } else if (status == 88) {
        ms.spawnNPCRequestController(2159370, -1400,-10, -30);
        ms.setNPCSpecialAction(2159370, "summon");
        ms.removeNPCRequestController(2159368);
        ms.removeNPCRequestController(2159422);
        ms.removeNPCRequestController(2159422);
        ms.setDelay(600);
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159376, "呵呵……沒想到在這種地方發現了。跑了這麼多村莊，看來是值得的。");
    } else if (status == 10) {
        ms.getNPCDirectionEffect(2159376, "Effect/Direction12.img/effect/tuto/BalloonMsg2/8", 1200, 0, -120);
        ms.setDelay(900);
    } else if (status == 11) {
        ms.updateNPCSpecialAction(2159376, -1,300, 100);
        ms.updateNPCSpecialAction(2159370, -1,300, 100);
        ms.setDelay(1500);
    } else if (status == 12) {
        ms.spawnNPCRequestController(2159372, -500,-10, -30);
        ms.setNPCSpecialAction(2159372, "summon");
        ms.updateNPCSpecialAction(2159372, -1,200, 100);
        ms.sendDirectionCameraMove(0,150,-950,-34);
    } else if (status == 13) {
        ms.setDelay(4335);
    } else if (status == 14) {
        ms.updateNPCSpecialAction(2159372, 1,1, 100);
        ms.setDelay(90);
    } else if (status == 15) {
        ms.updateNPCSpecialAction(2159372, -1,1, 100);
        ms.setDelay(90);
    } else if (status == 16) {
        ms.updateNPCSpecialAction(2159372, 1,1, 100);
        ms.setDelay(90);
    } else if (status == 17) {
        ms.updateNPCSpecialAction(2159372, -1,1, 100);
        ms.setDelay(90);
    } else if (status == 18) {
        ms.sendSelfTalk(1, 2159372, "#h0#已經回家了嗎？我還想把之前借的短劍還給他呢……");
    } else if (status == 19) {
        ms.sendSelfTalk(1, 2159372, "看來只能明天再說了。");
    } else if (status == 20) {
        ms.updateNPCSpecialAction(2159372, 1,100, 100);
        ms.setDelay(150);
    } else {
        ms.removeNPCRequestController(2159376);
        ms.removeNPCRequestController(2159370);
        ms.removeNPCRequestController(2159372);
        ms.dispose();
        ms.warp(931060080, 0);
        ms.enableActions();
    }
}

