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
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(true);
        ms.spawnNPCRequestController(3000107, -600, 6, 20);
        ms.setNPCSpecialAction(3000107, "summon"); 
        ms.spawnNPCRequestController(3000106, 500, 6, 20);
        ms.setNPCSpecialAction(3000106, "summon");
        ms.sendSelfTalk(1, 3000107, "糟糕了！！");
    } else if (status == 1) {
        ms.setForcedInput(1);//移動
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 3) {
        ms.setCameraMove("", 0, 300, -400, 27);
    } else if (status == 4) {
        ms.setDelay(2501);
    } else if (status == 5) {
        ms.sendDirectionEvent("EFFECT_PLAY", "Effect/Direction9.img/effect/tuto/BalloonMsg1/0", [7000, 0, -150, 1, 1, 0, 3000107, 0, 0], null);
        ms.updateNPCSpecialAction(3000107, 1,600, 100);
        ms.setCameraMove("", 1, 100, 0, 0);
    } else if (status == 6) {
        ms.setDelay(8339);
    } else if (status == 7) {
        ms.sendSelfTalk(1, 3000107, "樹精族的首都淪陷了！");
    } else if (status == 6) {
        ms.sendSelfTalk(3, 3000107, "(達勒摩爾終於惹出事端了……)");
    } else if (status == 7) {
        ms.sendSelfTalk(1, 3000106, "現在格蘭蒂斯裡幾乎沒有任何勢力能抵抗達勒摩爾了。");
    } else if (status == 8) {
        ms.sendSelfTalk(1, 3000107, "還剩下阿尼瑪族……");
    } else if (status == 9) {
        ms.sendSelfTalk(3, 3000107, "阿尼瑪族和我們一樣，原本就不是太大的勢力。加上他們本性親善，只要不受到攻擊，絕對不會想要主動對抗達勒摩爾的。");
    } else if (status == 10) {
        ms.sendSelfTalk(1, 3000107, "這麼說來現在……");
    } else if (status == 11) {
        ms.sendSelfTalk(3, 3000107, "沒錯，達勒摩爾下一個攻擊目標就是我們的首都赫裡希安。我這就前往赫裡希安，準備抵抗達勒摩爾的侵略。");
    } else if (status == 12) {
        ms.sendSelfTalk(1, 3000106, "我們有沒有什麼辦法打敗達勒摩爾？現在的達勒摩爾擁有能和神一較高下的力量，連時間之超越者克洛尼卡都被他打敗，還被奪去了力量。");
    } else if (status == 13) {
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 14) {
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 15) {
        ms.sendSelfTalk("赫裡希安的防禦膜還算堅固，達勒摩爾沒那麼容易攻進來，只守不攻應該沒太大問題。雖然力量的差異顯著，但絕對不能放棄希望。");
    } else if (status == 16) {
        ms.setForcedInput(1);
        ms.setDelay(30);
    } else if (status == 17) {
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 18) {
        ms.sendSelfTalk(3, 3000106, "卡塔利安，請你留在這裡進行防守。");
    } else if (status == 19) {
        ms.sendSelfTalk(1, 3000107, "比起留在這裡乾著急，我更願意出去戰鬥。我也是堂堂的諾巴劍士啊。");
    } else if (status == 20) {
        ms.sendSelfTalk(3, 3000107, "為了以防萬一，萬神殿裡也得建立防禦膜。另外，建成後的防禦膜也有可能會從內部被破壞，所以得有人負責防止這一切的發生。你應該清楚，以現在的情況，你是不二人選。");
    } else if (status == 21) {
        ms.sendSelfTalk(1, 3000107, "...");
    } else if (status == 22) {
        ms.sendSelfTalk(1, 3000106, "凱撒，你多保重。");
    } else if (status == 23) {
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 24) {
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 25) {
        ms.sendSelfTalk("別擔心，狼牙。我可是凱撒。");
    } else if (status == 26) {
        ms.sendSelfTalk(1, 3000106, "(凱撒……)");
    } else {
    ms.removeNPCRequestController(3000107);
        ms.removeNPCRequestController(3000106);
    ms.EnableUI(false);
        ms.dispose();
    ms.warp(940001010, 0);
        ms.enableActions();
    }

}

