/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

   if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
       ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.spawnNPCRequestController(2159381, -1700, 20);
        ms.setNPCSpecialAction(2159381, "summon");
        ms.spawnNPCRequestController(2159384, -1600, 20);
        ms.setNPCSpecialAction(2159384, "summon");
        ms.sendSelfTalk(1, 2159381, "通過這個走廊，就是機庫。通過那裡之後，就能到達外面了。但是一路上到處都是警衛機器人。");
    } else if (status == 3) {
        ms.sendSelfTalk(3, 2159381, "我會想辦法的。別擔心。");
    } else if (status == 4) {
        ms.sendSelfTalk(1, 2159384, "剛才這位朋友說會成為累贅。老實說，我剛才掉進陷阱的時候手臂受了傷，沒辦法幫你。真的沒關係嗎？");
    } else if (status == 5) {
        ms.sendSelfTalk(3, 2159384, "沒關係。我會想辦法的。");
    } else if (status == 6) {
        ms.updateNPCSpecialAction(2159381, 1,2200, 100);
        ms.updateNPCSpecialAction(2159384, 1,2200, 100);
        ms.setDelay(2100);
    } else if (status == 7) {
    ms.EnableUI(0);
        ms.removeNPCRequestController(2159384);
        ms.removeNPCRequestController(2159381);
        ms.dispose();
        ms.enableActions();
    }
}

