var status = -1;
var sel = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        var selStr = "我是採礦達人 #b諾布#k，找我有事嗎？\r\n";
        if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            selStr += "#L2##b提升#e採礦#n等級。#l\r\n#L3#採礦初始化。#k#l\r\n#L4##b交換#t4011010#。#k#l";
        } else {
            selStr += "#L0##b聽取有關#e採礦#n的說明。#l\r\n#L1#學習#e採礦#n。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {
            status = -1;
            cm.sendNext("採礦是用十字鎬之類的工具，採集地圖上的礦石的技能。採集到的礦石，可以用#p9031007#出售的鐵砧進行冶煉，獲得裝備、飾品、煉金術所需的材料。");
        } else if (sel == 1) {
            /*if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                cm.sendOk("你已經學會採藥啦。我建議你最好學習#b裝備製作#k或者#b飾品製作#k。你覺得怎麼樣？");
                cm.dispose();
                return;
            }*/
            if (cm.getPlayerStat("LVL") < 30) {
                cm.sendOk("小毛孩！你還不夠強，還不能學習專業技術。#b至少必須達到30級2轉以上，龍魔導士必須3轉以上，影武者必須2轉+以上#k，才能學習專業技術。等達到條件之後再來找我吧。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已經學習了3種專業技術。真想學習的話，就必須先放棄一種技術。");
            } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                cm.sendNext("你已經學些過#e採礦#n，難道還想學？");
            } else {
                cm.sendOk("恭喜你成功的學習#e採礦#n。");
                cm.teachSkill(92010000, 0x1000000, 10);
            }
            cm.dispose();
        } else if (sel == 2) {
            cm.sendNext("熟練度還沒滿啊。等熟練度滿了之後，你再來找我。");
            cm.dispose();
        } else if (sel == 3) {
            if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
                cm.sendOk("你學習了裝備製作，現在無法初始化。真想初始化的話，就得先對裝備製作或飾品製作進行初始化。");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
                cm.sendOk("你學習了飾品製作，現在無法初始化。真想初始化的話，就得先對裝備製作或飾品製作進行初始化。");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                status = 3;
                cm.sendYesNo("你想放棄#e採礦#n？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
            }
        } else if (sel == 4) {
            if (!cm.haveItem(4011010, 100)) {
                cm.sendOk("#b#t4011010#100個#k可以交換#i2028067:##b#t2028067#1個#k。請再去搜集一些#t4011010#。");
            } else if (!cm.canHold(2028067, 1)) {
                cm.sendOk("背包空間不足。");
            } else {
                cm.sendOk("兌換成功.");
                cm.gainItem(2028067, 1);
                cm.gainItem(4011010, -100);
            }
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendOk("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            cm.sendOk("採礦技術已經初始化。如果想重新學習，請再來找我。");
            cm.teachSkill(92010000, 0, 0);
            if (cm.isQuestActive(3197)) {
                cm.forfeitQuest(3197);
            }
            if (cm.isQuestActive(3198)) {
                cm.forfeitQuest(3198);
            }
        } else {
            cm.sendNext("沒有學習#e採礦#n初始化失敗。");
        }
        cm.dispose();
    }
}
