/*
 
 */

var status = -1;

function action(mode, type, selection) {
        status++;

   if (status == 0) {
    ms.setInGameCurNodeEventEnd(true);
    ms.EnableUI(1);
        ms.spawnNPCRequestController(2159384, 700, 193);
        ms.setForcedInput(0);
        ms.setDelay(30);
    } else if (status == 1) {
    ms.setInGameCurNodeEventEnd(true);
        ms.setForcedInput(2);
        ms.setDelay(30);
    } else if (status == 2) {
        ms.setForcedInput(0);
        ms.spawnNPCRequestController(2159380, 450,180);
        ms.setNPCSpecialAction(2159380, "summon");
        ms.setDelay(300);
    } else if (status == 3) {
        ms.setForcedInput(2);
        ms.sendSelfTalk(1, 2159380, "#h0#，#h0#，你在這裡幹什麼？");
    } else if (status == 4) {
        ms.sendSelfTalk(3, 2159380, "魯提，有件事我想問問那個俘虜。你能幫我保密嗎？");
    } else if (status == 5) {
        ms.sendSelfTalk(1, 2159380, "我看你剛才見到那個人的時候好像呆了一下。#h0#，你記起來了嗎？你的過去……。");
    } else if (status == 6) {
        ms.sendSelfTalk(3, 2159380, "記憶？過去？你在說什麼啊？魯提，你是怎麼知道的？");
    } else if (status == 7) {
        ms.sendSelfTalk(1, 2159380, "你先拿著這個。");
    } else if (status == 8) {
        ms.setDelay(4200);
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159380, "這是那個人的東西。我想那個人一定是你找回記憶的重要線索。你們好好談談吧。我去看看格裡梅爾有沒有回來。");
    } else if (status == 10) {
        ms.updateNPCSpecialAction(2159380, 1,700, 100);
        ms.setDelay(1500);
    } else if (status == 11) {
        ms.sendSelfTalk(3, 2159380, "魯提，謝謝你。");
    } else if (status == 12) {
        ms.setDelay(2100);
    } else if (status == 13) {
        ms.setForcedInput(2);
    ms.setInGameCurNodeEventEnd(true);
        ms.setDelay(1500);
    } else if (status == 14) {
        ms.removeNPCRequestController(2159380);
        ms.sendSelfTalk(3, 2159384, "喂……。我想問你。");
    } else if (status == 15) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg1/2",  0, 0, -120, 0, 0);
        ms.setDelay(810);
    } else if (status == 16) {
        ms.sendSelfTalk(1, 2159384, "你！是黑色之翼的……！");
    } else if (status == 17) {
        ms.sendSelfTalk(3, 2159384, "(果然……一看到那個人，就有一種奇怪的感覺。明明是今天第一次見到，但卻感覺好像認識這個人。)");
    } else if (status == 18) {
        ms.sendSelfTalk(3, 2159384, "(還有，這個人的這把短劍，感覺好像是我的東西。)");
    } else if (status == 19) {
        ms.sendSelfTalk(3, 2159384, "這，這個。");
    } else if (status == 20) {
        ms.setDelay(4200);
    } else if (status == 21) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 0, 0, -120, 0, 0);
        ms.setDelay(810);
    } else if (status == 22) {
        ms.sendSelfTalk(1, 2159384, "這是我的短劍！");
    } else if (status == 23) {
        ms.sendSelfTalk(3, 2159384, "這是你的東西吧？這個有什麼特別的力量嗎？你是從哪裡得到的？");
    } else if (status == 24) {
        ms.sendSelfTalk(1, 2159384, "黑色之翼的成員為什麼要問這個？");
    } else if (status == 25) {
        ms.sendSelfTalk(3, 2159384, "看到它的瞬間，我好像想起了什麼，但是卻記不太清楚。魯提說這個東西和你好像跟我的記憶和過去有關……。如果你知道我的過去，請你告訴我。");
    } else if (status == 26) {
        ms.sendSelfTalk(1, 2159384, "(這個人到底在說什麼啊？記憶？)");
    } else if (status == 27) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg1/1",  0, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 28) {
        ms.sendSelfTalk(1, 2159384, "等等，你說那把短劍很眼熟？難道你是……！");
    } else if (status == 29) {
        ms.spawnNPCRequestController(2159381, 1200,180);
        ms.setNPCSpecialAction(2159381, "summon");
        ms.updateNPCSpecialAction(2159381, -1,350, 100);
        ms.sendSelfTalk(1, 2159381, "#h0#，#h0#！");
    } else if (status == 30) {
        ms.sendSelfTalk(1, 2159381, "不好了，格裡梅爾馬上就要回來了！你從那個人那裡知道什麼了嗎？");
    } else if (status == 31) {
        ms.sendSelfTalk(3, 2159381, "不，什麼都沒有。我也想不起剛才那個場面了。");
    } else if (status == 32) {
        ms.sendSelfTalk(1, 2159381, "哎呀……果然光是這樣是無法恢復記憶的。");
    } else if (status == 33) {
        ms.sendSelfTalk(3, 2159381, "記憶？你在說什麼啊，魯提？");
    } else if (status == 34) {
        ms.sendSelfTalk(1, 2159381, "現在不是說這些的時候，#h0#。我看這是最後的機會了。你快和這個人一起逃走。不然的話，你好不容易恢復的記憶又會被格裡梅爾清除掉。");
    } else if (status == 35) {
        ms.sendSelfTalk(3, 2159381, "記憶，清除掉？");
    } else if (status == 36) {
        ms.sendSelfTalk(1, 2159381, "是的，你一定不知道我在說什麼……事實上，過去我曾經答應過。一定要讓你從這裡逃出去。");
    } else if (status == 37) {
        ms.sendSelfTalk(3, 2159381, "答應？答應誰？");
    } else if (status == 38) {
        ms.sendSelfTalk(1, 2159381, "……失去記憶之前的你。");
    } else if (status == 39) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 0, 0, -120, 0, 0);
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 0, 0, -120, 0, 0);
        ms.setDelay(1200);
    } else if (status == 40) {
        ms.sendSelfTalk(1, 2159381, "你也許已經不記得了。那是因為格裡梅爾把你的記憶全部清除了。但是在記憶被清除掉之前，你想離開這裡。我就是那時候答應你的。答應一定要把你從這裡救出去。");
    } else if (status == 41) {
        ms.sendSelfTalk(1, 2159381, "所以我一直裝作是格裡梅爾的忠實部下……。\n\r為了等待今天這個機會。");
    } else if (status == 42) {
        ms.sendSelfTalk(1, 2159381, "這個人一定和你的過去有關。所以你在見到這個人的瞬間好像想起了什麼……");
    } else if (status == 43) {
        ms.sendSelfTalk(1, 2159381, "你快和她一起逃走。不然的話，你好不容易恢復的記憶就又要失去了。");
    } else if (status == 44) {
        ms.sendSelfTalk(3, 2159381, "記憶……剛才浮現在眼前的那個場面是我過去的記憶嗎？");
    } else if (status == 45) {
        ms.sendSelfTalk(1, 2159381, "是的。沒時間了。格裡梅爾馬上就會回來。n\r那樣的話，他一定會清除掉你的記憶，這個人也會有危險。你決定怎麼辦？");
    } else if (status == 46) {
        ms.sendSelfTalk(3, 2159381, "我想找回我的記憶。");
    } else if (status == 47) {
        ms.sendSelfTalk(3, 2159381, "事實上我也不知道那是什麼。但是我有種感覺，我必須找回我的記憶。而這個人，雖然我不認識，但我覺得不能讓她受傷。");
    } else if (status == 48) {
        ms.sendDirectionEffectPlay("Effect/Direction12.img/effect/tuto/BalloonMsg0/1",  0, 0, -120, 0, 0);
        ms.setDelay(900);
    } else if (status == 49) {
        ms.sendSelfTalk(1, 2159381, "好的，既然決定了，就在格裡梅爾回來之前趕快逃走。後面的事情就交給我吧……。");
    } else if (status == 50) {
        ms.sendSelfTalk(3, 2159381, "魯提，你也一起逃走吧。要是格裡梅爾知道我逃走了，你一定會受到牽連。");
    } else if (status == 51) {
        ms.sendSelfTalk(1, 2159381, "但我不是戰鬥型機械人。帶我走只會成為你的累贅。");
    } else if (status == 52) {
        ms.sendSelfTalk(3, 2159381, "那樣的話，我就更不能把你留在這裡了。跟我一起逃走吧。");
    } else if (status == 53) {
        ms.sendSelfTalk(1, 2159381, "……好吧，現在我們沒時間站在這裡多說了。我和你一起走。快點吧！");
    } else {
        ms.removeNPCRequestController(2159381);
    ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(0);
        ms.dispose();
        ms.warp(931050970, 0);
        ms.enableActions();
    }
}

