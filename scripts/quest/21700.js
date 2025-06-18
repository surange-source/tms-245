var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNextS("你似乎在回想什麼。這個長矛果然認出了你。那麼你肯定就是#b使用長矛的英雄，狂狼勇士了#k。你想起什麼其他的了嗎？有關長矛的技能之類……", 8);
    } else if (status == 1) {
        qm.sendNextPrevS("#b(說技能倒是想起來了幾個。)#k", 2);
    } else if (status == 2) {
        qm.sendNextPrevS("如果數量不多，不過也已經很不容易了。現在讓我們集中精力來恢復過去的技能吧。雖然你失憶了，但畢竟是以前曾經爛熟與心的東西，要恢復起來應該很快。", 8);
    } else if (status == 3) {
        qm.sendNextPrevS("怎麼恢復過去的技能？", 2);
    } else if (status == 4) {
        qm.sendNextPrevS("這個方法只有一個。修煉！修煉！修煉！除了修煉還是修煉，總有一天身體會回想起那些被遺忘的技能！所以我要給你介紹一個知道你修煉的老師。", 8);
    } else if (status == 5) {
        qm.sendNextPrevS("老師？", 2);
    } else if (status == 6) {
        qm.forceStartQuest();
        qm.sendNext("武器要是能使的更熟練就好了。送你一支#p1201001#。希望你在修煉的時候能夠進步的很快。帶著這支長矛……");
    } else if (status == 7) {
        qm.sendPrev("從村子出去後往#b左#k走，有個小修煉場。去見見那裡的#b普奧#k。他偶爾會有點老年癡呆……不過他一直在等待著英雄的出現，並不段研究著各種技能。你要是能夠得到他的幫助，肯定會受益非淺。");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
