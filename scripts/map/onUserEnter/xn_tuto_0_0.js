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
        ms.spawnNPCRequestController(2159368, 665, -14, -20);
        ms.setNPCSpecialAction(2159368, "summon");
        ms.spawnNPCRequestController(2159374, 380, -14, -20);
        ms.setNPCSpecialAction(2159374, "summon");
        ms.spawnNPCRequestController(2159372, 450, -14, -20);
        ms.setNPCSpecialAction(2159372, "summon");
        ms.spawnNPCRequestController(2159373, 520, -14, -20);
        ms.setNPCSpecialAction(2159373, "summon");
        ms.spawnNPCRequestController(2159375, 590, -14, -20);
        ms.setNPCSpecialAction(2159375, "summon");
        ms.setDelay(1900);
    } else if (status == 2) {
        ms.sendSelfTalk(1, 2159373, "好了，走吧？");
    } else if (status == 3) {
        ms.getNPCDirectionEffect(2159373, "Effect/Direction12.img/effect/tuto/BalloonMsg2/0", 900, 0, -120);
        ms.setDelay(900);
    } else if (status == 4) {
        ms.getNPCDirectionEffect(2159375, "Effect/Direction12.img/effect/tuto/BalloonMsg2/1", 900, 0, -120);
        ms.setDelay(1000);
    } else if (status == 5) {
        ms.sendSelfTalk(1, 2159375, "冒險勇者紅鷹！");
    } else if (status == 6) {
        ms.sendSelfTalk(1, 2159373, "冒險勇者黃雄！");
    } else if (status == 7) {
        ms.sendSelfTalk(1, 2159372, "冒險勇者藍鯊！");
    } else if (status == 8) {
        ms.sendSelfTalk(1, 2159374, "冒險勇者綠虎！");
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159368, "冒險勇者熊貓！");
    } else if (status == 10) {
        ms.sendSelfTalk(1, 2159373, "合在一起……");
    } else if (status == 11) {
        ms.getNPCDirectionEffect(2159373, "Effect/Direction12.img/effect/tuto/BalloonMsg2/2", 900, 0, -120);
        ms.setDelay(900);
    } else if (status == 12) {
        ms.setNPCSpecialAction(2159373, "happy");
        ms.setDelay(900);
    } else if (status == 13) {
        ms.sendSelfTalk(1, 2159373, "呀！太帥了！");
    } else if (status == 14) {
        ms.sendSelfTalk(1, 2159372, "貝爾非常喜歡冒險勇者遊戲。");
    } else if (status == 15) {
        ms.sendSelfTalk(1, 2159373, "嗯！不覺得很帥嗎？守護埃德爾斯坦的正義英雄！");
    } else if (status == 16) {
        ms.sendSelfTalk(1, 2159374, "雖然沒有需要擊敗的壞蛋。");
    } else if (status == 17) {
        ms.sendSelfTalk(1, 2159375, "所以每天只能喊喊口號。");
    } else if (status == 18) {
        ms.sendSelfTalk(1, 2159368, "我來當壞蛋不就行了……。");
    } else if (status == 19) {
        ms.sendSelfTalk(1, 2159373, "#h0#！你又在胡說什麼啊？那可不行。大家都應該是正義一方！不然就太讓人難過了。");
    } else if (status == 20) {
        ms.sendSelfTalk(1, 2159368, "嗯……。");
    } else if (status == 21) {
        ms.sendSelfTalk(1, 2159374, "即使沒有壞蛋，只要好玩就行了。該做的遊戲做完了，今天就此解散吧？");
    } else if (status == 22) {
        ms.sendSelfTalk(1, 2159368, "那我先走了。家裡還有事。");
    } else if (status == 23) {
        ms.sendSelfTalk(1, 2159373, "再見。#h0#，明天見！");
    } else if (status == 24) {
        ms.updateNPCSpecialAction(2159368, -1,550, 100);
        ms.getNPCDirectionEffect(2159375, "Effect/Direction12.img/effect/tuto/BalloonMsg2/3", 1200, 0, -120);
        ms.setDelay(600);
    } else if (status == 25) {
        ms.getNPCDirectionEffect(2159374, "Effect/Direction12.img/effect/tuto/BalloonMsg2/4", 1200, 0, -120);
        ms.setDelay(600);
    } else if (status == 26) {
        ms.getNPCDirectionEffect(2159368, "Effect/Direction12.img/effect/tuto/BalloonMsg2/5", 1200, 0, -120);
        ms.setDelay(3000);
    } else {
        ms.removeNPCRequestController(2159368);
        ms.removeNPCRequestController(2159374);
        ms.removeNPCRequestController(2159372);
        ms.removeNPCRequestController(2159373);
        ms.removeNPCRequestController(2159375);
        ms.dispose();
        ms.warp(931050910, 0);
        ms.enableActions();
    }
}

