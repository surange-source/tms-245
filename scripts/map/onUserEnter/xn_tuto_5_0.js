/*
 
 */

var status = -1;

function action(mode, type, selection) {
    status++;

   if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.setDelay(1000);
    ms.setInGameCurNodeEventEnd(true);
    } else if (status == 1) {
    ms.spawnNPCRequestController(2159377, -180,50);
    //ms.spawnNPCRequestController(2159424, -346,83);
    ms.setNPCSpecialAction(2159424, "summon");
    ms.sendDirectionCameraMove(0,100,-272,-63);
    } else if (status == 2) {
        ms.setDelay(2701);
    } else if (status == 3) {
        ms.sendSelfTalk(1, 2159377, "今天的測試和調整已經進入了最後的階段。好的，準備好了嗎？");
    } else if (status == 4) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg2/11", 1200, 0, -120);
        ms.setDelay(900);
    } else if (status == 5) {
        ms.sendDirectionCameraMove(1,100);
    } else if (status == 6) {
        ms.setDelay(2381);
    ms.teachSkill(30021238, 1, 1);
    /*} else {
    ms.teachSkill(30021238, 1, 1);
    ms.EnableUI(0);
    ms.dispose();
    }*/
    } else if (status == 7) {
        ms.sendDirectionCameraMove(0,100,-185,-41);
    } else if (status == 8) {
        ms.setDelay(2604);
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159377, "呵呵呵，非常好！非常讓人滿意的結果。現在只要再進行細微的調整……。");
    } else if (status == 10) {
        ms.getNPCDirectionEffect(2159377, "Effect/Direction12.img/effect/tuto/BalloonMsg1/0", 1200, 0, -120);
        ms.updateNPCSpecialAction(2159377, -1,1, 100);
        ms.setDelay(90);
    } else if (status == 11) {
        ms.sendSelfTalk(1, 2159377, "入侵者？難，難道是殺人鯨？快打開監視器！");
    } else if (status == 12) {
        ms.setDelay(2100);
    } else if (status == 13) {
        ms.setDelay(1200);
    } else if (status == 14) {
        ms.sendSelfTalk(1, 2159377, "是反抗者嗎……不過總比被殺人鯨發現要好。那些煩人的傢伙，為什麼偏偏要在這個時候潛入呢？");
    } else if (status == 15) {
        ms.sendSelfTalk(1, 2159377, "不過這也許是件好事。就最後再進行一次測試，用那些傢伙作為對象，呵呵呵……。");
    } else {
        ms.removeNPCRequestController(2159377);
        ms.EnableUI(0);
        ms.dispose();
        ms.warp(931050940, 0);
        ms.enableActions();
    }
}

