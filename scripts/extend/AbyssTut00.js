/*      
 *  
 *  
 */
var chat = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 /*End Chat*/ || mode == 0 && chat == 0 /*Due to no chat -1*/) {
        cm.dispose();
        return;
    }
    mode == 1 ? chat++ : chat--;
    if (chat == 0)
        cm.sendNextS("我正在等你.", 1);
    else if (chat == 1)
        cm.sendNextPrevS("發生什麼事情了， I was in the middle of very important loot-related business.", 3);
    else if (chat == 2)
        cm.sendNextPrevS("聯盟已經收到了一些非常令人震驚的消息。 一個以前未知的地區已經出現在林中之城北部地區。", 1);
    else if (chat == 3)
        cm.sendNextPrevS("出現了嗎？", 3);
    else if (chat == 4)
        cm.sendNextPrevS("是的，很奇怪。我相信它被某種古老的魔法所隱藏。", 1);
    else if (chat == 5)
        cm.sendNextPrevS("給我帶來這個信息的偵察員說，他覺得那裡很邪惡。它可能與黑法師有關。", 1);
    else if (chat == 6)
        cm.sendNextPrevS("聽起來好像我們需要馬上去那裡。", 3);
    else if (chat == 7)
        cm.sendNextPrevS("我已經派出騎士團。該地區的地形非常複雜的，大部分地區被濃霧籠罩。", 1);
    else if (chat == 8)
        cm.sendNextPrevS("...那我該做什麼?", 3);
    else if (chat == 9)
        cm.sendNextPrevS("四處看看。一個探險家的損失將遠比所有的騎士更容易接受。", 1);
    else if (chat == 10)
        cm.sendNextPrevS("我會把你傳送到#b#e#m105010000##n#k去調查. 如果你發現了什麼，立即報告。", 1);
    else if (chat == 11)
        cm.sendNextPrevS("我將用西格諾斯的力量把你傳送到#b#e#m105010000##n#k.", 1);
    else if (chat == 12) {
        cm.forceCompleteQuest(30000);
        cm.EnableUI(0);
        cm.DisableUI(false);
        cm.warp(105010000, 3);
        cm.dispose();
    }
}
