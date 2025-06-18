function start(mode, type, selection) {
    qm.dispose();
}

var status = -1;
function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 4) {
            qm.sendNext("嗚嗚，你是嫌這把劍太寒磣嗎？");
            qm.dispose();
            return;
        }
        status--;
    }
        if (qm.getQuestStatus(21011) == 0) {
            qm.forceStartQuest();
        }
            qm.dispose();
            return;

}

function end(mode, type, selection) {
        if (mode == 1) {
        status++;
    } else {
        if (status == 4) {
            qm.sendNext("嗚嗚，你是嫌這把劍太寒磣嗎？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (qm.getQuestStatus(21011) == 0) {
            qm.forceStartQuest();
            qm.dispose();
            return;
        }
        qm.sendNext("和#p1201000#在一起的，難道……難道就是傳說中的英雄？#p1201000#！別不耐煩地點頭，給我們介紹介紹呀！這位就是傳說中的英雄嗎？！");
    } else if (status == 1) {
        qm.sendNextPrev("   #i4001171#");
    } else if (status == 2) {
        qm.sendNextPrev("……真對不起，太激動了，忍不住嗓門大了些。嗚嗚～真是令人激動……唉，眼淚都快出來了……#p1201000#這回可開心了。");
    } else if (status == 3) {
        qm.sendNextPrev("等等……英雄大人怎麼能沒有武器呢？我聽說每個英雄都有自己的獨特武器……啊，估計是和黑魔法師戰鬥的時候遺失了。");
    } else if (status == 4) {
        qm.sendYesNo("雖然寒磣了點，不過#b先拿這把劍用著吧#k。算是送給英雄的禮物。英雄如果沒有武器，豈不是會有些奇怪？\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1302000# 1個 #t1302000#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 5) {
        if (qm.getQuestStatus(21011) == 1) {
            qm.gainItem(1302000, 1);
            qm.gainExp(35);
        }
        qm.forceCompleteQuest();
        qm.sendNextPrevS("#b（看自己這技能水平沒一點英雄的樣子……這把劍感覺也很陌生。以前的我是用劍的嗎？這把劍怎麼用呢？）#k", 3);
    } else if (status == 6) {
        qm.summonMsg(16); // How to equip shiet
        qm.dispose();
    }
}
