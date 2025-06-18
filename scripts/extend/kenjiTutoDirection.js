/*      
 *  
 *  功能：劍豪新手引導相關
 *  
 */
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.spawnNPCRequestController(9131005, 187, 51);
        cm.setInGameCurNodeEventEnd(true);
        cm.EnableUI(1);
        cm.DisableUI(true);
        cm.setDelay(1000);
    } else if (status == 1) {
        cm.sendNextS("我不想把劍對準婦女，讓開。", 3);
    } else if (status == 2) {
        cm.sendSangokuTalk("哼，沒禮貌。你知道我是誰嗎？ 齊籐父親大人的女兒七草，也是第六天魔王織田信長的妻子野姬。", 9131005, true, true);
    } else if (status == 3) {
        cm.sendNextPrevS("好話不說三次，我不會把劍對準婦女的，讓開。", 3);
    } else if (status == 4) {
        cm.sendSangokuTalk("真是沒禮貌的小毛孩，讓我試試你的劍法是否與你那咄咄逼人的氣勢相同？", 9131005, true, true);
    } else if (status == 5) {
        cm.setNPCSpecialAction(9131005, "step");
        cm.setDelay(1080);
    } else if (status == 6) {
        cm.sendDirectionEffectPlay("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/14", 0, -100, -100, 0, 0);
        cm.setDelay(1000);
    } else if (status == 7) {
        cm.sendDirectionEffectPlay("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/15", 0, -150, -150, 0, 0);
        cm.setDelay(2000);
    } else if (status == 8) {
        cm.sendDirectionEffectPlay("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/16", 0, -150, -150, 0, 0);
        cm.setDelay(2000);
    } else if (status == 9) {
        cm.sendDirectionEffectPlay("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/17", 0, 0, -120, 0, 0);
        cm.setDelay(2000);
    } else if (status == 10) {
        cm.setForcedInput(1);
        cm.setDelay(1800);
    } else if (status == 11) {
        cm.setForcedInput(5);
        cm.setDelay(1000);
    } else if (status == 12) {
        cm.setForcedInput(0);
        cm.setDelay(500);
    } else {
        cm.EnableUI(0);
        cm.removeNPCRequestController(9131005);
        cm.dispose();
        cm.warp(807100005, 0);
    }
}