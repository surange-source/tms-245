/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

    if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.sendSelfTalk("天空作美。今天天氣很合適決戰。");
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.setDelay(500);
    } else if (status == 2) {
    ms.setForcedInput(1);
    ms.setDelay(120);
    } else if (status == 3) {
    ms.sendSelfTalk("下雨天可憐兮兮的等人，可不是什麼好習慣。");
    } else if (status == 4) {
    ms.spawnNPCRequestController(2159353, 1210,18, 10);
    ms.setNPCSpecialAction(2159353 , "summon");
    ms.setNPCSpecialAction(2159353 , "summon");
    ms.setForcedInput(2);
    ms.setDelay(30);
    } else if (status == 5) {
    ms.setForcedInput(0);
    ms.sendSelfTalk("你來晚了。即使是世界上最棒的怪盜，也無法偷取時間啊。");
    } else if (status == 6) {
    ms.sendSelfTalk(1, 2159353, "嗯，反正對方還沒來，你這傢伙算是來的早了。漫長的戰鬥今天就要結束了，有什麼好著急的呢？怎麼樣。有信心嗎？");
    } else if (status == 7) {
    ms.sendSelfTalk("自信不是要獲勝後才能感覺的嘛。");
    } else if (status == 8) {
    ms.sendSelfTalk(1, 2159353, "這種時候還耍嘴皮子。就是因為這樣，一開始才不喜歡你啊。");
    } else if (status == 9) {
    ms.sendSelfTalk("你這狡猾的傢伙，還真是不會說話。");
    } else if (status == 10) {
    ms.sendSelfTalk(1, 2159353, "也是，反正我們之間唯一的共同點就是互相不順眼了。話說回來，讓我們來的普力特那傢伙究竟是怎麼回事。他，是不是有什麼不順心的事啊？");
    } else if (status == 11) {
    ms.sendSelfTalk("不過是頭疼怎麼才能讓5個人配合的最好罷了。也有可能和每個人關係都太好了，希望所有人能夠高興。");
    } else if (status == 12) {
    ms.sendSelfTalk(1, 2159353, "就算這樣，普力特不是還沒分配好嘛。不過我覺得，普力特沒我想像的那麼簡單。");
    } else if (status == 13) {
    ms.sendSelfTalk("也許吧。閒聊到此為止。空氣凝結起來了。");
    } else if (status == 14) {
    ms.sendSelfTalk(1, 2159353, "有趣的傢伙。好吧，不扯閒話了。下次見的時候一起去問問普力特吧。前提是不要在這裡耽誤太久。");
    } else if (status == 15) {
    ms.setDelay(300);
    } else if (status == 16) {
    ms.setNPCSpecialAction(2159353 , "teleportation");
    ms.setDelay(840);
    } else if (status == 17) {
    ms.removeNPCRequestController(2159353);
    ms.setDelay(1000);
    } else if (status == 18) {
    ms.sendSelfTalk("現在就剩最後一步了。");
    } else if (status == 19) {
    ms.setForcedInput(1);
    ms.setInGameCurNodeEventEnd(true);
    ms.spawnNPCRequestController(2159354, 128,18, 10);
    ms.setNPCSpecialAction(2159354, "summon");
    ms.sendSelfTalk(1, 2159354, "站住。這裡是你我的戰場。");
    } else if (status == 20) {
    ms.sendDirectionCameraMove(0,450,-200,18);
    } else if (status == 21) {
    ms.setDelay(1938);
    } else if (status == 22) {
    ms.setForcedInput(1);
    ms.setInGameCurNodeEventEnd(true);
    ms.sendSelfTalk(1, 2159354, "你所具備的光之力量，對精靈來說就好像溫暖的陽光一樣。所以一想到我必須在這裡幹掉你，心裡很不是滋味啊。");
    } else if (status == 23) {
    ms.sendSelfTalk(3, 2159354, "這話可不像是你這種給黑魔法師衝鋒陷陣，破壞世界的瘋狂精靈說的。");
    } else if (status == 24) {
    ms.sendSelfTalk(3, 2159354, "這話可不像是你這種給黑魔法師衝鋒陷陣，破壞世界的瘋狂精靈說的。");
    } else if (status == 25) {
    ms.sendSelfTalk(1, 2159354, "如果全心全意追求自己的夢想是瘋了的話，那麼我就是瘋了。但是你，還有這世界上的一切，不是都瘋了嗎？");
    } else if (status == 26) {
    ms.sendSelfTalk(3, 2159354, "不要狡辯啦。 #p2159354#.");
    } else if (status == 27) {
    ms.sendSelfTalk(1, 2159354, "真是對牛彈琴。那就拿出你的本事來吧。");
    } else if (status == 28) {
    ms.setDelay(500);
    } else if (status == 29) {
    ms.setNPCSpecialAction(2159355, "special");
    ms.setDelay(1600);
    } else if (status == 30) {
    ms.TutInstructionalBalloon("Effect/OnUserEff.img/normalEffect/demonSlayer/chatBalloon0");
    ms.setDelay(2280);
    } else if (status == 31) {
    ms.spawnNPCRequestController(2159355, 0,18, 10);
    ms.setNPCSpecialAction(2159355 , "summon");
    ms.setDelay(700);
    } else if (status == 32) {
    ms.removeNPCRequestController(2159354);
    ms.sendSelfTalk(9, 2159355, "你，還得感謝你讓事情變得簡單了呢，謝謝啊。");
    } else if (status == 33) {
    ms.sendSelfTalk(3, 2159355, "#p2159355#！連同伴都要傷害嗎？");
    } else if (status == 34) {
    ms.setForcedAction(436, 540);
    ms.sendDirectionEffectPlay("Skill/2711.img/skill/27111100/prepare", 540, -40, -25, 0, 0);
    ms.setDelay(90);
    } else if (status == 35) {
    ms.setNPCSpecialAction(2159355 , "barrier");
    ms.setDelay(450);
    } else if (status == 36) {
    ms.setForcedAction(437, 3000);
    ms.sendDirectionEffectPlay("Skill/2711.img/skill/27111100/keydown", 3000, -40, -25, 0, 0);
    ms.setDelay(30);
    } else if (status == 37) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 38) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 39) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 40) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 41) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 42) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 43) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 44) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 45) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(270);
    } else if (status == 46) {
    ms.getNPCDirectionEffect(2159355, "Effect/OnUserEff.img/normalEffect/lightning/guard", 0, 0, 0);
    ms.setDelay(540);
    } else if (status == 47) {
    ms.sendDirectionEffectPlay("Skill/2711.img/skill/27111101/keyedownend", 0, -40, -25, 0, 0);
    ms.setDelay(600);
    } else if (status == 48) {
    ms.sendSelfTalk(9, 2159355, "這種程度算什麼。不過時間到了。可惜啊，只能下次再解決你這傢伙了。");
    } else if (status == 49) {
    ms.sendSelfTalk(3, 2159355, "什麼聲音？");
    } else if (status == 50) {
    ms.sendSelfTalk(9, 2159355, "沒時間和你玩了。這世界上，已經沒什麼我要做的了，哈哈哈。");
    } else if (status == 51) {
    ms.setNPCSpecialAction(2159355, "teleportation");
    ms.setDelay(450);
    } else if (status == 52) {
    ms.removeNPCRequestController(2159355);
    ms.sendSelfTalk(3, 2159355, "吸收古瓦洛的力量後，離開戰鬥了……？還說什麼#b'這世界'#k，一定有陰謀。不過多虧了你，我省的麻煩了。現在就集中解決黑魔法師吧。先出發的同伴們應該已經到時間神殿那頭了吧。我們必須盡快與他們會合。");
    } else {
    ms.EnableUI(0);
    ms.dispose();
    ms.warp(927020010, 0);
    ms.enableActions();
    }
}

