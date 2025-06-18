/*
 * 光明中的黑暗，黑暗中的光明
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 19) {
            qm.sendOk("要想靈活運用力量，最好是進行實踐……");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("尊敬的夜光法師，現在是該駕馭光之力量與黑暗力量，將其化為你自身力量而使用的時候了。");
    } else if (status == 1) {
        qm.sendNextPrevS("#b該如何駕馭？", 2);
    } else if (status == 2) {
        qm.sendNextPrev("我叫你來，正是為了跟你說說這個。請看畫面右上方。看見跟上圖\r\n#v3800300#\r\n一樣的東西了吧？這個就是提示夜光法師擁有的光之力量與黑暗力量的欄。");
    } else if (status == 3) {
        qm.sendNextPrevS("#b這個翅膀是什麼？", 2);
    } else if (status == 4) {
        qm.sendNextPrev("用於顯示夜光法師可以積累的點數。你可以積累光明/黑暗點數各五個。夜光法師登錄後，初次會各擁有一個光明/黑暗點數。使用和黑暗有關的技能時，將消耗一點黑暗點數，並立即成為#b心靈被黑暗籠罩的月蝕狀態#k。請看下圖。\r\n#v3800301#");
    } else if (status == 5) {
        qm.sendNextPrev("如果你繼續使用暗之魔法，就會如下圖所示，黑暗點數逐漸填滿。\r\n#v3800302#");
    } else if (status == 6) {
        qm.sendNextPrev("#r累積的黑暗點數可以用於#b光明/黑暗狀態切換#k技能。成為月蝕狀態後，#k使用魔法時，#b僅消耗50%的魔力施展技能。每次施展技能時，會恢復1%的體力，使用暗之魔法還可以給敵人造成50%的額外傷害。對了，登錄後只要使用一次和光明有關的技能，#k就可以驅逐心中的黑暗，立刻轉變為太陽火焰狀態。");
    } else if (status == 7) {
        qm.sendNextPrevS("#b心靈被黑暗籠罩，這聽起來真讓人不舒服。", 2);
    } else if (status == 8) {
        qm.sendNextPrev("哈哈哈，你不用擔心。黑暗力量本身並沒什麼不好，歸根結底要看你如何使用它。你是#b#e夜光法師#n#k，我相信你會把黑暗力量用在正道上的。你和某人……不一樣。");
    } else if (status == 9) {
        qm.sendNextPrevS("#b好了，就說到這兒。下面還有什麼內容？", 2);
    } else if (status == 10) {
        qm.sendNextPrev("#b在月蝕狀態下，光/暗之魔法兩種均可使用，點數也會繼續累積。\r\n#v3800303#");
    } else if (status == 11) {
        qm.sendNextPrev("只要你不使用點數，會一直保持月蝕狀態。月蝕增益圖標#v3800310#顯示在畫面右上方。#b夜光法師的眼神和寶珠會發生如下變換，#k很容易就能看見。\r\n#v3800321#");
    } else if (status == 12) {
        qm.sendNextPrev("當心靈被黑暗籠罩時，自然對你使用暗之魔法更有利。不過，當你#r使用光明/黑暗狀態切換技能，開始消耗光明點數後，#k黑暗會逐漸退去，#b光明將充滿你的心靈#k。");
    } else if (status == 13) {
        qm.sendNextPrev("同樣，當#r光明充滿心靈後，#k如下所示，該欄會閃光，提示你成為太陽火焰狀態。\r\n#v3800304#");
    } else if (status == 14) {
        qm.sendNextPrev("#r當光明充滿心靈時，#k畫面右上方也會顯示太陽火焰增益圖標#v3800309#，如下圖所示，#b夜光法師的眼神和寶珠會恢復原樣#k。\r\n#v3800320#");
    } else if (status == 15) {
        qm.sendNextPrev("成為太陽火焰狀態後，#b和月蝕一樣，每次使用光之魔法時，會恢復1%的體力，只消耗50%的魔力，並獲得能在使用光之魔法時造成50%額外傷害的太陽火焰增益#k。在太陽火焰狀態下，和月蝕狀態時一樣，光明/黑暗點數會繼續累積。\r\n在該狀態下使用黑暗點數可以重新變為月蝕狀態。");
    } else if (status == 16) {
        qm.sendNextPrevS("#b所以簡單概括起來，就是使用光之魔法時，消耗黑暗點數就能施展暗之魔法；使用暗之魔法時，消耗光明點數就能改為光之魔法，對吧？", 2);
    } else if (status == 17) {
        qm.sendNextPrev("沒錯，就是這樣。如果你不知道現在該使用什麼魔法，可以看看點數欄下方顯示的強化的技能。\r\n<光之魔法>              <暗之魔法>\r\n#v3800312#  #v3800315#\r\n你都聽明白了嗎？");
    } else if (status == 18) {
        qm.sendNextPrevS("#b嗯，估計得試一試才能完全理解。", 2);
    } else if (status == 19) {
        qm.askAcceptDecline("哈哈哈，實踐出真知，親自使用一下你會更明白的。那麼你去打獵怪物，#b分別轉變一次太陽火焰或月蝕狀態#k怎麼樣？");
    } else if (status == 20) {
        qm.forceStartQuest();
        qm.sendNextNoESC("好了，等你填滿光明/黑暗點數各一次後再向我報告。");
        qm.dispose();
    }
}
