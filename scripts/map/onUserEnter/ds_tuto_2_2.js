/*
 Author: Pungin
 */
var status = -1;

function action(mode, type, selection) {
    if (mode == 0) {
        status--;
    } else {
        status++;
    }

    if (status == 0) {
        ms.spawnNPCRequestController(2159309, 500, 50);
        ms.setNPCSpecialAction(2159309, "summon");
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1);
        ms.DisableUI(true);
        ms.setDelay(30);
        ms.setInGameCurNodeEventEnd(true);
    } else if (status == 1) {
        ms.sendNextS("鏋滅扐鎿佹湁鐩哥晏濱骨緱鐨勫鍔涒�� 閫鬱笉鏄姍熸渻鍡峬紵 鎴戛棭灝辨簪瑕佷竴杓江珮涓嬶紝鐪嬬湅瑾版槸鏈�寮風殑杌嶅葑闀楓�� 濂戒簡錛岸氨渚嗙湅鐪嬩縫鐨勫姏閱忏擠鍛紵閭勤槸鎴戠殑欖旀磣寮鳳紵", 5, 2159308);
    } else if (status == 2) {
        ms.topMsg("璜嬮�ｇ簩鐫變笅鎺埠壼碉紝闃繪搵闃垮崱浼匊靜鐨勤繕鎿婁笖閫茶鍙嶆搳銆�");
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/guide1/0", 5010, 150, -300, 0, 0);
        ms.setNPCSpecialAction(2159309, "alert");
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/arkyrimAttack", [0, 0, -7, 1, 1, 0, 5406110, 0, 0]);
        ms.setDelay(2010);
    } else if (status == 3) {
        ms.environmentChange("demonSlayer/arkAttack0", 5);
        ms.setPatternInputRequest("17#17#17#", 4, 2, 3000);
    } else if (status == 4) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/9", 5010, 150, -300, 0, 0);
        ms.setForcedAction(370, 0);
        ms.sendDirectionEvent("EFFECT_PLAY", "Skill/3112.img/skill/31121000/effect", [0, 323, 83, 1, 1, 0, 0, 1, 0]);
        ms.environmentChange("demonSlayer/31121000", 5);
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/9", 2000, 0, -100, 0, 0);
        ms.setDelay(900);
    } else if (status == 5) {
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/balloonMsg1/4", [1000, 0, -150, 1, 1, 0, 5406110, 0, 0]);
        ms.environmentChange("demonSlayer/31121000h", 5);
        ms.setNPCSpecialAction(2159309, "teleportation");
        ms.setDelay(570);
    } else if (status == 6) {
        ms.removeNPCRequestController(2159309);
        ms.spawnNPCRequestController(2159309, 108, 50, 1);
        ms.setNPCSpecialAction(2159309, "summon");
        ms.setDelay(1000);
    } else if (status == 7) {
        ms.sendNextS("鏋滅扐寰壟湁涓�濂椻�� 鐪熸槸鏈夎叮銆� 鍝堝雉鍝堝雉錛�", 5, 2159308);
    } else if (status == 8) {
        ms.setNPCSpecialAction(2159309, "resolve");
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/balloonMsg1/10", [2000, 0, -150, 1, 1, 0, 5406917, 0, 0]);
        ms.setDelay(1500);
    } else if (status == 9) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/11", 2000, 0, -100, 0, 0);
        ms.setDelay(1500);
    } else if (status == 10) {
        ms.sendDirectionEvent("EFFECT_PLAY", "Skill/3112.img/skill/31121005/effect", [0, 323, 71, 1, 1, 1, 0, 1, 1]);
        ms.sendDirectionEvent("EFFECT_PLAY", "Skill/3112.img/skill/31121005/effect0", [0, 323, 71, 1, 1, -1, 0, 1, 1]);
        ms.environmentChange("demonSlayer/31121005", 5);
        ms.setForcedAction(364, 0);
        ms.setDelay(1980);
    } else if (status == 11) {
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/gateOpen/0", [2100, 918, -195, 1, 1, 0, 0, 1, 0]);
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/gateLight/0", [2100, 926, -390, 1, 1, 0, 0, 1, 0]);
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/gateStair/0", [2100, 879, 30, 1, 1, 1, 0, 1, 0]);
        ms.environmentChange("demonSlayer/openGate", 5);
        ms.setDelay(1950);
    } else if (status == 12) {
        ms.forceStartQuest(23203);
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction6.img/effect/tuto/balloonMsg0/0", [2000, 0, -150, 1, 1, 0, 5406917, 0, 0]);
        ms.setDelay(1200);
    } else if (status == 13) {
        ms.sendNextS("鈥﹀櫌錛岄磷欖旀磣甯Κ鑷締榪庢帴浣犱簡銆� 闆栫扐寰堝螭鎯滐紝灝卞埌姝偤姝一惂錛� 閭ｉ杭錛屾垛寰楀幓瑕嬭閭ｄ塞琚ū鐐鴻嫳闆動殑濱洪曆浠�楹兼ǎ瀛愩��", 5, 2159308);
    } else if (status == 14) {
        ms.sendNextPrevS("宸茬梗涓嶆渻鍐嶈闈簡錛� #h0# 閫欐槸浣犵殑姒垢銆� 鍥犵偤鍙互姝誨渜閭ｅ�嬩漢鐨勤墜涓紒 鍝堝雉鍝堝雉錛�", 5, 2159308);
    } else if (status == 15) {
        ms.setNPCSpecialAction(2159309, "teleportation");
        ms.setDelay(570);
    } else if (status == 16) {
        ms.removeNPCRequestController(2159309);
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg2/2", 2000, 0, -100, 0, 0);
        ms.setForcedInput(2);
    } else if (status == 17) {
        ms.environmentChange("demonSlayer/whiteOut", 13);
        ms.setDelay(1950);
    } else {
        ms.forceCompleteQuest(23203);
        ms.setInGameCurNodeEventEnd(true);
        ms.dispose();
        ms.warp(931050300, 0);
    }
}


