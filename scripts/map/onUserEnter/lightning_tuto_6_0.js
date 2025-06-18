/*
 
 */

var status = -1;

function action(mode, type, selection) {

        status++;

    if (status == 0) {
    ms.spawnNPCRequestController(2159359, 0,-499, -499);
    ms.spawnNPCRequestController(2159358, -153,-308, -508);
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
    ms.spawnNPCRequestController(2159357, 300,-423, -80);
    ms.setNPCSpecialAction(2159357, "summon");
    ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/6", 0, 0, -160, 0, 0);
    ms.setDelay(1200);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
    ms.sendDirectionCameraMove(0,300,0,-500);
    } else if (status == 2) {
    ms.setDelay(2322);
    } else if (status == 3) {
    ms.setDelay(4000);
    } else if (status == 4) {
    ms.sendDirectionCameraMove(0,300,300,-100);
    } else if (status == 5) {
    ms.setDelay(1667);
    } else if (status == 6) {
    ms.getNPCDirectionEffect(2159357, "Effect/Direction5.img/effect/mercedesInIce/merBalloon/0", 0, 0, -90);
    ms.setDelay(2100);
    } else if (status == 7) {
    ms.sendSelfTalk("普力特!... 精靈遊俠!");
    } else if (status == 8) {
    ms.setDelay(300);
    } else if (status == 9) {
    ms.setForcedInput(2);
    ms.sendDirectionCameraMove(1,180);
    } else if (status == 10) {
    ms.setForcedInput(0);
    ms.sendSelfTalk(1, 2159357, "來啦。我們已經盡力了，但還是不行。");
    } else if (status == 11) {
    ms.sendSelfTalk(17, 2159357, "精靈遊俠怎麼啦？");
    } else if (status == 12) {
    ms.sendSelfTalk(1, 2159357, "只是暫時暈過去了。關鍵是黑魔法師比我們想的厲害得多。現在只能靠這個了。");
    } else if (status == 13) {
    ms.getNPCDirectionEffect(2159357, "Effect/Direction6.img/effect/tuto/balloonMsg0/10", 0, 0, -90);
    ms.setDelay(1800);
    } else if (status == 14) {
    ms.getNPCDirectionEffect(2159357, "Skill/2218.img/skill/22181003/affected", 0, 0, 0);
    ms.setDelay(1500);
    } else if (status == 15) {
    ms.sendSelfTalk(1, 2159357, "#b(聽好。從現在開始我說的話你絕不可以告訴其他人。之前提過的封印，你還記得嗎？)#k");
    } else if (status == 16) {
    ms.sendSelfTalk(17, 2159357, "#b(嗯。你和阿弗利埃研究了好長時間嘛。)#k");
    } else if (status == 17) {
    ms.sendSelfTalk(1, 2159357, "#b(那個封印可以逆轉黑魔法師從倫娜那裡搶來的時間力量。因此，無論黑魔法師有多麼厲害，都絕不可能逃脫。只是，要啟動封印的話，必須將黑魔法師的時間的力量牽引出來。)#k");

    } else if (status == 18) {
    ms.sendSelfTalk(1, 2159357, "#b(我發現戰局不利時，就偷偷在這間房間設置了封印。但是光靠我和精靈遊俠，無法引出黑魔法師的時間力量。現在你是我們唯一的希望。)#k");

    } else if (status == 19) {
    ms.sendSelfTalk(17, 2159357, "#b(我應該怎麼做？)#k");

    } else if (status == 20) {
    ms.sendSelfTalk(1, 2159357, "#b(首先要激活設置好的封印。我會用僅剩的力量，使時間暫時停滯，以防黑魔法師發現。你就趁機去把五個封印全部激活。)#k");

    } else if (status == 21) {
    ms.sendSelfTalk(1, 2159357, "#b(右方應該留有第一個封印的痕跡。你走近就能看到封印。你只要將所有封印激活就行。)#k");

    } else if (status == 22) {
    ms.sendSelfTalk(17, 2159357, "#b(知道了。交給我吧。)#k");
    } else if (status == 23) {
    ms.sendSelfTalk(1, 2159357, "(#b封印全部激活後，停滯的時間就會恢復正常。拜託了。時間女神啊，賜予我力量……！！#k)");

    } else {
    ms.EnableUI(0);
    ms.removeNPCRequestController(2159357);
    ms.dispose();
    ms.warp(927020071, 0);
    ms.enableActions();
    }
}

