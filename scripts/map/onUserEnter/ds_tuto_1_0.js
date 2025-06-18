/*
 Made by Wubin
 */


var status = -1;

function action(mode, type, selection) {
    status++;
    if (status == 0) {
        ms.setForcedInput(1);
        ms.setDelay(30);
        ms.setInGameCurNodeEventEnd(true);
        Thread.sleep(1000);
    } else if (status == 1) {
        ms.setForcedInput(0);
        ms.sendSelfTalk(1, 2159310, "除了出去外勤的軍團長，大家都到齊了嗎…那就開始開會吧。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/0");
    } else if (status == 2) {
        ms.sendSelfTalk(1, 2159308, "在偉大的大人——黑魔法師辦完事情之前，我們也要做好我們分內的事情。不能因為他沒監督我們，就偷懶，不是嗎？話說回來#h0#……我聽說你搞到了有趣的情報？");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/1");
    } else if (status == 3) {
        ms.sendSelfTalk(3, 2159308, "我收到了抵抗軍們正在集結的情報。");
    } else if (status == 4) {
        ms.sendSelfTalk(1, 2159308, "抵抗軍……一群烏合之眾能做什麼，咳咳咳……聽說人們叫他們#r英雄#k？可笑至極。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/2");
    } else if (status == 5) {
        ms.sendSelfTalk(1, 2159339, "我還很期待呢，這也算是垂死掙扎吧？真好奇他們會怎麼反抗我們。上次的聖地佔領戰他們不也敗北了嗎~消滅那個被稱為女皇的傢伙太容易了，我都覺得無聊了呢。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/3");
    } else if (status == 6) {
        ms.sendSelfTalk(1, 2159308, "那次的戰鬥能夠輕鬆獲勝，全靠黑魔法師的實力，跟你的能力沒啥關係吧。#p2159339#？別那麼囂張。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/4");
    } else if (status == 7) {
        ms.sendSelfTalk(1, 2159339, "唔…可是我都沒什麼可做的啊！");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/5");
    } else if (status == 8) {
        ms.sendSelfTalk(3, 2159339, "史烏大人好像很忙的樣子，殺人鯨，您在這裡沒問題嗎？");
    } else if (status == 9) {
        ms.sendSelfTalk(1, 2159339, "史烏他是認真過了頭，總會找些沒用的事來做！不過我也正打算去一趟史烏那裡！哼！軍團長都太刻板了，無聊。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/6");
    } else if (status == 10) {
        ms.sendSelfTalk(1, 2159310, "…那會議呢？");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/7");
    } else if (status == 11) {
        ms.sendSelfTalk(1, 2159308, "真是的，#p2159339#一吵起來，會都進行不下去了。嘖嘖…剛才是在說英雄們的事情，對吧？英雄啊…哼，自然會有高貴的#h0#來收拾他們吧。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/8");
    } else if (status == 12) {
        ms.sendSelfTalk(1, 2159308, "連時間女神都能戰勝的人，那麼點英雄算什麼啊？不是嗎？哈哈哈哈…");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/9");
    } else if (status == 13) {
        ms.sendSelfTalk(3, 2159308, "…不能小看了他們。勇於拚命的人總會發揮出超長的能量的。而且我只是讓時間女神陷入了無法行動的狀態…而最終抓住敵人的還是那一位。");
    } else if (status == 14) {
        ms.sendSelfTalk(1, 2159308, "哎喲，哎喲，這麼謙虛啊。不過你也因此在大人那裡記了一個大功，不是嗎？跟這件事比起來，之前我在神殿裡展開的無數地下工作都羞於啟齒了。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/10");
    } else if (status == 15) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, -100);
        ms.setDelay(1500);
    } else if (status == 16) {
        ms.sendSelfTalk(1, 2159310, "…你們兩個夠了吧。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/11");
    } else if (status == 17) {
        ms.sendSelfTalk(1, 2159339, "為什麼？不是很有意思嗎？繼續啊。#p2159309#。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/12");
    } else if (status == 18) {
        ms.sendSelfTalk(1, 2159308, "我只是在稱頌我們軍團最高功臣#h0#而已啊，咳咳咳……");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/13");
    } else if (status == 19) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, -100);
        ms.setDelay(1500);
    } else if (status == 20) {
        ms.sendSelfTalk(1, 2159310, "#p2159309#。自從佔領了神殿，一切都快要結束了…在這件事情上，能把時間女神困住，確實是#h0#的一大功勞啊。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/14");
    } else if (status == 21) {
        ms.sendSelfTalk(1, 2159310, "而且你蒙住女神的眼睛那件事，不是已經得到了相應的報酬了嗎？你還想幹什麼，#p2159309#?");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/15");
    } else if (status == 22) {
        ms.sendSelfTalk(1, 2159308, "我能想幹什麼…哼，那這個話題就到此為止，我們繼續開會吧。那些無聊的英雄就不要再說了，說說其他的抵抗勢力現在怎麼樣了？");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/16");
    } else if (status == 23) {
        ms.sendSelfTalk(1, 2159310, "…按照命令，已經確認過了，他們全部都已經破壞殆盡了。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/17");
    } else if (status == 24) {
        ms.sendSelfTalk(1, 2159308, "哦哦，這樣啊。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/18");
    } else if (status == 25) {
        ms.sendSelfTalk(1, 2159339, "不過啊~黑魔法師他為什麼會突然改變計劃了呢？不是說好佔領神殿就結束的嗎？我當然無所謂了，可是全都破壞乾淨了，以後就沒什麼可玩兒的了，不是嗎？");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/19");
    } else if (status == 26) {
        ms.sendSelfTalk(3, 2159339, "…破壞？那又是…什麼命令？我都沒聽說過。");
    } else if (status == 27) {
        ms.sendSelfTalk(1, 2159308, "啊哈，對了，我是看你之前和女神戰鬥太辛苦，所以沒告訴你。你想知道是什麼命令啊？很簡單。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/20");
    } else if (status == 28) {
        ms.sendSelfTalk(1, 2159308, "偉大的那一位希望我們把這一切戰爭都結束掉。我們接到了命令，要把那些拖拖拉拉的抵抗勢力全都消滅乾淨。所以除了你之外的所有軍團長都出發了。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/21");
    } else if (status == 29) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/18", 2000, -100);
        ms.setDelay(1500);
    } else if (status == 30) {
        ms.sendSelfTalk(1, 2159310, "…對神木村不要留一棵草、一棵樹，全都被消滅乾淨了…");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/22");
    } else if (status == 31) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, -100);
        ms.setDelay(1500);
    } else if (status == 32) {
        ms.sendSelfTalk(3, 2159310, "(神木村所處的南部地區還有我的家人啊…！)");
    } else if (status == 33) {
        ms.sendSelfTalk(1, 2159308, "黑魔法師所希望的事情，也許能為抵抗軍樹立榜樣…所以這次的事情辦得有些過於徹底了。這也算是好事一樁啊，不是嗎？");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/23");
    } else if (status == 34) {
        ms.sendSelfTalk(1, 2159310, "是啊…那個叫龍的種族估計現在已經所剩無幾了。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/24");
    } else if (status == 35) {
        ms.sendSelfTalk(3, 2159308, "…等等，我們不是說好不攻擊南部地區的嗎？現在南部地區都破壞到哪裡了？請告訴我…！");
    } else if (status == 36) {
        ms.sendSelfTalk(1, 2159308, "破壞到哪裡了…那位大人的命令應該不會被草草執行吧？如果接到的命令是徹底毀滅，那應該就是斬草除根了吧，咳咳咳…你幹嘛要這麼敏感啊？有什麼心事嗎？");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/25");
    } else if (status == 37) {
        ms.sendDirectionEffectPlay("Effect/Direction6.img/effect/tuto/balloonMsg0/11", 2000, -100);
        ms.setDelay(1500);
    } else if (status == 38) {
        ms.sendSelfTalk(3, 2159308, "我有事要確認一下，先行告辭了…！");
    } else if (status == 39) {
        ms.sendSelfTalk(1, 2159308, "哎喲~就算你再受黑魔法師的寵愛，也不能這麼隨便啊。我不是說了我們要做份內的事情嗎？你現在離開，就是違抗命令。");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/26");
    } else if (status == 40) {
        ms.setForcedInput(2);
        ms.sendSelfTalk(3, 2159308, "(戴米安，媽媽…但願你們平安無事...)");
    } else if (status == 41) {
        ms.sendSelfTalk(1, 2159308, "他聽都不聽我說的。哼…不過你是有#r家人#k在那裡嗎？咳咳咳…祝你好運了！");
        ms.showWZEffect(30, "Voice.img/DemonSlayertutorial_A/27");
    } else if (status == 42) {
        ms.setInGameCurNodeEventEnd(true);
        ms.enableActions();
        ms.sendchangeMap(924020010);
        ms.enableActions();
        ms.dispose();
    } else {
        ms.dispose();
    }
}

