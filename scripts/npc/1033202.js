var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (cm.isQuestActive(24007) || cm.isQuestFinished(24007)) {
        cm.sendNext("Please, save us.");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendPlayerToNpc("長老們！大家沒事吧！但是……但是我們的村子……");
    } else if (status == 1) {
        cm.sendNextNoESC("非常寒冷的氣息包圍了村子。精靈遊俠，在你身上也能感覺到強烈的寒氣。");
    } else if (status == 2) {
        cm.sendNextNoESC("你身上的寒氣是最強烈的！難道……這是黑魔法師的力量？！", 1033203);
    } else if (status == 3) {
         cm.sendNextNoESC("……小孩子們開始被封在冰裡。再過一段時間，連大人們都……好像力量越強，受那種氣息的影響就越慢。雖然我們還在堅持，不過也堅持不了太久……", 1033204);
    } else if (status == 4) {
         cm.sendPlayerToNpc("這一切……都是我的錯……雖然封印黑魔法師成功了，但是他留下的#r詛咒#k……連我們村……");
    } else if (status == 5) {
        cm.sendNextNoESC("詛咒？！", 1033203);
    } else if (status == 6) {
        cm.sendNextNoESC("就是把村子冰起來的這個力量……", 1033204);
    } else if (status == 7) {
        cm.sendNextNoESC("原來黑魔法師對國王詛咒，所有精靈都會受到影響啊……");
    } else if (status == 8) {
        cm.sendPlayerToNpc("對不起……全都是我的錯。要是我沒有被黑魔法師詛咒的話……");
    } else if (status == 9) {
        cm.sendNextNoESC("讓楓之谷世界陷入絕境的黑魔法師……真是個可怕的人。雖然封印成功了，但還是這麼厲害……沒想到我們竟然能把他封印起來。");
    } else if (status == 10) {
        cm.sendNextNoESC("精靈遊俠，連你這麼強的人都無法阻止的詛咒，其他人就更不可能阻止了", 1033204);
    } else if (status == 11) {
        cm.sendNextNoESC("精靈遊俠！這不是你的錯！封印成功了！都是因為邪惡的黑魔法師！", 1033203);
    } else if (status == 12) {
        cm.sendPlayerToNpc("但是……我應該避免這種事情發生。也許我當初不應該去和黑魔法師戰鬥！……讓精靈們落入了現在的境地……雖然我是國王，但我沒有這樣的資格！");
    } else if (status == 13) {
        cm.sendNextNoESC("別說這種話，精靈遊俠。和黑魔法師的戰鬥要是能避免的話……我們也不會讓你，讓我們的國王到那麼危險的地方去戰鬥。", 1033204);
    } else if (status == 14) {
        cm.sendNextNoESC("該說抱歉的反倒是我們。你成為國王還沒多久……就因為你是我們中力量最強的人而讓你去面對黑魔法師……");
    } else if (status == 15) {
        cm.sendNextNoESC("我這個戰鬥長老太弱了，無法和黑魔法師戰鬥。我……我才應該跟你說抱歉……", 1033203);
    } else if (status == 16) {
        cm.sendPlayerToNpc("不，不是長老們的錯！是我說要去和黑魔法師戰鬥的……我並不後悔參戰。我後悔的只是沒能保護好你們而已……");
    } else if (status == 17) {
        cm.sendNextNoESC("那是我們所有人的責任。");
    } else if (status == 18) {
        cm.sendNextNoESC("你沒有必要一個人背負這個責任。和黑魔法師戰鬥是我們全體精靈的決定，詛咒也必須由我們全體精靈來承擔。..", 1033204);
    } else if (status == 19) {
        cm.sendNextNoESC("被凍起來的人們都在擔心你！沒有任何人抱怨你！", 1033203);
    } else if (status == 20) {
        cm.sendPlayerToNpc("大家..");
    } else if (status == 21) {
        cm.sendNextNoESC("真正可怕的不是詛咒。要是我們精靈相互埋怨，忘記了互敬互愛之心，那才是真正可怕的事情。不管黑魔法師的詛咒多麼可怕，只要我們能活下去，就一定有辦法。");
    } else if (status == 22) {
        cm.sendNextNoESC("只要有你在，我們精靈就還有希望。");
    } else if (status == 23) {
        cm.sendPlayerToNpc("有什麼……辦法嗎？");
    } else if (status == 24) {
        cm.sendNextNoESC("現在要阻止詛咒好像太難了。但我們是精靈，是可以生活很長時間的人……時間總是站在我們一邊。");
    } else if (status == 25) {
        cm.sendNextNoESC("請在黑魔法師的詛咒讓我們全部沉睡之前，把埃歐雷封印起來，精靈遊俠。如果詛咒無法避免的話，就把村莊完全封印起來，#b和所有的精靈一起沉睡#k，直到封印解開為止。");
    } else if (status == 26) {
        cm.sendNextNoESC("雖然我不知道詛咒什麼時候才會解開，但是我們沒有必要害怕時間。讓我們耐心地等待吧，精靈遊俠。", 1033204);
    } else if (status == 27) {
        cm.sendNextNoESC("等大家都醒來的時候，黑魔法師的詛咒應該就會解開！", 1033203);
    } else if (status == 28) {
        cm.sendNextNoESC("就算是黑魔法師的詛咒，也無法戰勝時間的力量……最終的勝利，必定是屬於我們的。");
    } else if (status == 29) {
        cm.sendPlayerToNpc("是的……我們一定要堅持下去！");
    } else if (status == 30) {
        cm.sendNextNoESC("那當然.啊....我也無法抵擋住詛咒的力量了.快去把村子封印起來吧,精靈遊俠.讓我們在漫長的歲月中沉睡,等待詛咒解開的時候,不要有昂張的人來玷污我們美麗的村莊....");
    } else if (status == 31) {
        cm.sendNextNoESC("在封印之前,需要做幾樣準備.你最好先去去問問阿斯迪拉.");
    } else if (status == 32) {
        //cm.sendPlayerToNpc("好的. I'll seal the village with my remaining strength...");
        cm.forceStartQuest(24007, "1");
        cm.dispose();
    }
}



