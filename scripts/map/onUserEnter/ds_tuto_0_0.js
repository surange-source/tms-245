/*
 Made by Wubin
*/


var status = -1;

function action(mode, type, selection) {
    status++;
    if (status == 0) {
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1); // IntroEnableUI
        ms.DisableUI(true);//IntroDisableUI
        ms.teachSkill(30011109, 1, 1);
        ms.teachSkill(30011110, 1, 1);
        ms.teachSkill(30010111, 1, 1);
        ms.teachSkill(30010185, 1, 1);
        ms.setForcedInput(0);
        ms.spawnNPCRequestController(2159307, 1430, 69, 50);
        ms.setNPCSpecialAction(2159307, "summon");
        ms.sendPyramidEnergy("mastema", "31156017");
        ms.showEffect("demonSlayer/back");
        ms.showEffect("demonSlayer/text0");
        ms.setDelay(500);
        ms.spawnPortal();
    } else if (status == 1) {
        ms.showEffect("demonSlayer/text1");
        ms.setDelay(1000);
    } else if (status == 2) {
        ms.setForcedInput(2);
        ms.setDelay(3000);
    } else if (status == 3) {
        ms.showEffect("demonSlayer/text2");
        ms.setDelay(500);
    } else if (status == 4) {
        ms.showEffect("demonSlayer/text3");
        ms.setDelay(4000);
    } else if (status == 5) {
        ms.showEffect("demonSlayer/text4");
        ms.setDelay(500);
    } else if (status == 6) {
        ms.showEffect("demonSlayer/text5");
        ms.setDelay(4000);
    } else if (status == 7) {
        ms.showEffect("demonSlayer/text6");
        ms.setDelay(500);
    } else if (status == 8) {
        ms.showEffect("demonSlayer/text7");
        Thread.sleep(5500);
        ms.sendSelfTalk(1, 2159307, "軍團長！這段時間聯繫都沒有，你到哪兒去了？你也知道，#p2159309#老是喜歡挑我的毛病，經常為難我……");
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159307, "真讓人氣憤。你去時間神殿抓到了女神，他一定是在嫉妒你。哼！#p2159309#做的事情只不過是蒙蔽了女神的眼睛而已，而且還是利用原來的地位！");
    } else if (status == 10) {
        ms.setForcedInput(2);
        ms.setInGameCurNodeEventEnd(true);
        ms.sendSelfTalk(1, 2159307, "嗯？……平時的話，你應該會責備我，讓我別說這種廢話的啊……發生什麼事了嗎？我現在才發現，你的臉色好像非常不好……有什麼地方不舒服嗎？在之前的戰鬥中受傷了嗎？");
    } else if (status == 11) {
        ms.sendSelfTalk(3, 2159307, "……#p2151009#。你……在黑魔法師和我之中，你是誰的部下？");
    } else if (status == 12) {
        ms.sendSelfTalk(1, 2159307, "嗯？幹嘛突然問這種問題……？");
    } else if (status == 13) {
        ms.sendSelfTalk(3, 2159307, "請你回答。");
    } else if (status == 14) {
        ms.sendSelfTalk(1, 2159307, "當……當然是效忠於那位偉大的人。但是自從你救了我之後，我就決定為你獻出生命……！你不是知道嗎？！為什麼要問這個……？");
    } else if (status == 15) {
        ms.sendSelfTalk(3, 2159307, "……我想拜託你一件事。");
    } else if (status == 16) {
        ms.sendSelfTalk(3, 2159307, "請幫我把這封信……交給他們，被稱為#r英雄#k的人。");
    } else if (status == 17) {
        ms.sendSelfTalk(1, 2159307, "嗯？為什麼要把這個交給他們……光是你這段時間不在，可能就已經不太好了。如果和他們接觸的事情被人知道，你一定會背上背叛黑魔法師的污名！一定會那樣的！你在想什麼啊，軍團長！");
    } else if (status == 18) {
        ms.sendSelfTalk(3, 2159307, "……我已經不再是軍團長了。");
    } else if (status == 19) {
        ms.sendSelfTalk(1, 2159307, "難道……你背叛了黑魔法師？！原來比誰都忠誠的你？！佔領時間神殿才剛剛不久！現在應該是領取獎勵的時候……為什麼……為什麼？");
    } else if (status == 20) {
        ms.sendSelfTalk(3, 2159307, "……沒時間了。如果你覺得太為難，就算了……我不想和你戰鬥。");
    } else if (status == 21) {
        ms.sendSelfTalk(1, 2159307, "沒什麼為難的！我只是擔心你……！");
    } else if (status == 21) {
        ms.sendSelfTalk(3, 2159307, "......");
    } else if (status == 22) {
        ms.sendSelfTalk(1, 2159307, "家人們你想怎麼處理呢？！這樣的話，家人們也許會受到危害……！");
    } else if (status == 23) {
        ms.sendSelfTalk(3, 2159307, "不要再說了！這件事就說到這裡！");
    } else if (status == 24) {
        ms.sendSelfTalk(1, 2159307, "……為什麼……難道……難道他們出了什麼事……？");
    } else if (status == 25) {
        ms.sendSelfTalk(3, 2159307, "......");
    } else if (status == 26) {
        ms.sendSelfTalk(1, 2159307, "你又這樣……不說話了……好吧，你本來就不喜歡說這些。");
    } else if (status == 27) {
        ms.sendSelfTalk(1, 2159307, "好的。我就是拼了命，也會把這封信交給他們。");
    } else if (status == 28) {
        ms.sendSelfTalk(3, 2159307, "對不起，#p2151009#……");
    } else if (status == 29) {
        ms.sendSelfTalk(1, 2159307, "用不著道歉。我的生命是為你而存在的。你能把這件事交給我，我感到很高興。");
    } else if (status == 30) {
        ms.sendSelfTalk(1, 2159307, "既然接到了命令，我馬上就走。希望你能實現自己的目標……");
    } else if (status == 31) {
        ms.setNPCSpecialAction(2159307, "teleportation");
        ms.setDelay(720);
    } else if (status == 32) {
        ms.removeNPCRequestController(2159307);
        ms.enableActions();
        ms.sendSelfTalk(3, 2159307, "(真是謝謝你了，#p2151009#。)");
    } else if (status == 33) {
        ms.setForcedInput(2);
        ms.setInGameCurNodeEventEnd(true);
        Thread.sleep(5500);
         ms.setInGameCurNodeEventEnd(true);
        ms.enableActions();
        ms.sendchangeMap(927000080);
        ms.enableActions();
        ms.dispose();
    } else {
        ms.dispose();
    }
}

