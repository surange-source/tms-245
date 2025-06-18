/*
 
 */

var status = -1;

function action(mode, type, selection) {
    if (mode >= 0) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.setForcedInput(0);
    ms.spawnNPCRequestController(2159356, 1500,60, 50);
    ms.setNPCSpecialAction(2159356 , "summon");
    ms.spawnNPCRequestController(2159360, 1350,60, 50);
    ms.setNPCSpecialAction(2159360 , "summon");
    ms.spawnNPCRequestController(2159361, 1300,60, 50);
    ms.setNPCSpecialAction(2159361 , "summon");
    ms.sendDirectionEffectPlay("Effect/OnUserEff.img/normalEffect/demonSlayer/chatBalloon0", 1000, 0, 0, 0, 0);
    ms.setDelay(1200);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.setNPCSpecialAction(2159356, "attack");
    ms.setDelay(450);
    } else if (status == 2) {
    ms.sendDirectionEffectPlay("Effect/Direction8.img/effect/tuto/BalloonMsg0/5", 0, 0, -120, 0, 0);
    ms.setNPCSpecialAction(2159360, "hit");
    ms.setNPCSpecialAction(2159361, "hit");
    ms.getNPCDirectionEffect(2159360, "Skill/2112.img/skill/21120005/hit/0", 0, -5, -50);
    ms.getNPCDirectionEffect(2159361, "Skill/2112.img/skill/21120005/hit/0", 0, -5, -50);
    ms.setDelay(270);
    } else if (status == 3) {
    ms.getNPCDirectionEffect(2159360, "Skill/2112.img/skill/21120005/hit/0", 0, -5, -50);
    ms.getNPCDirectionEffect(2159361, "Skill/2112.img/skill/21120005/hit/0", 0, -5, -50);
    ms.setDelay(900);
    } else if (status == 4) {
    ms.setNPCSpecialAction(2159360, "die");
    ms.setNPCSpecialAction(2159361, "die");
    ms.getNPCDirectionEffect(2159360, "Skill/2112.img/skill/21120005/hit/0", 0, -5, -50);
    ms.getNPCDirectionEffect(2159361, "Skill/2112.img/skill/21120005/hit/0", 0, -5, -50);
    ms.setDelay(2200);
    } else if (status == 5) {
    ms.setForcedInput(2);
    ms.removeNPCRequestController(2159360);
    ms.removeNPCRequestController(2159361);
    ms.sendSelfTalk(1, 2159356, "他們也不是省油的燈，來的挺快啊。果然是光之守護者。");
    } else if (status == 6) {
    ms.sendSelfTalk(17, 2159356, "你怎麼會一個人在這？普力特和精靈遊俠呢？怎麼還受傷了？");
    } else if (status == 7) {
    ms.sendSelfTalk(1, 2159356, "他們先出發了。也許已經和黑魔法師交手了。我有點事，所以遲了。");
    } else if (status == 8) {
    ms.sendSelfTalk(17, 2159356, "狂狼勇士，一起走吧？");
    } else if (status == 9) {
    ms.sendSelfTalk(1, 2159356, "你是在擔心我嗎？人真好。不過我沒事。這點小傷算不了什麼。你還是快跟上去吧。就算普力特和精靈遊俠合作默契，也無法抵擋黑魔法師。");
    } else if (status == 10) {
    ms.sendSelfTalk(17, 2159356, "…知道了。你也別太勉強自己。");
    } else if (status == 11) {
    ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
    ms.sendDirectionEffectPlay("Effect/Direction8.img/effect/tuto/BalloonMsg0/7", 4000, 0, -100, 0, 0);
    ms.setDelay(1500);
    } else if (status == 12) {
    ms.getNPCDirectionEffect(2159356, "Effect/Direction8.img/effect/tuto/BalloonMsg0/6", 2500, 0, -100);
    ms.setDelay(1500);
    } else {
    ms.EnableUI(0);
    ms.removeNPCRequestController(2159356);
    ms.dispose();
    ms.warp(927020060, 0);
    ms.enableActions();
    }
}

