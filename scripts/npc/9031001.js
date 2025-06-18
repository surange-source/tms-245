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
        var selStr = "你好，可以幫你什麼嗎？\r\n";
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            selStr += "#L2##b提升#e採藥#n等級。#l\r\n#L3#採藥初始化。#k#l\r\n#L4##b交換#t2028066#。#k#l";
        } else {
            selStr += "#L0##b聽取有關#e採藥#n的說明。#l\r\n#L1#學習#e採藥#n。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {
            status = -1;
            cm.sendNext("採藥是利用鏟子之類的工具，採集地圖上的藥草的技能。把採集到的藥草裝在#p9031007#出售的油瓶中提煉，可以獲得裝備、飾品、煉金術所需的材料。");
        } else if (sel == 1) {
            /*if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                cm.sendOk("你已經學會採礦啦。我建議你最好學習#b裝備製作#k或者#b飾品製作#k。你覺得怎麼樣？");
                cm.dispose();
                return;
            }*/
            if (cm.getPlayerStat("LVL") < 30) {
                cm.sendOk("哎呀，你好像還不夠強，還不能學習專業技術。#b至少必須達到30級2轉以上，龍魔導士必須3轉以上，影武者必須2轉+以上#k，才能學習專業技術。請你繼續努力，等達到條件之後再來找我。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已經學習了3種專業技術。真想學習的話，就必須先放棄一種技術。");
            } else if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                cm.sendNext("你已經學些過#e採藥#n，難道還想學？");
            } else {
                cm.sendOk("恭喜你成功的學習#e採藥#n。");
                cm.teachSkill(92000000, 0x1000000, 0);
            }
            cm.dispose();
        } else if (sel == 2) {
            cm.sendNext("熟練度還沒滿啊。等熟練度滿了之後，你再來找我。");
            cm.dispose();
        } else if (sel == 3) {
            if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
                cm.sendOk("你學習了煉金術，現在無法初始化。真想初始化的話，就得先對煉金術進行初始化。");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                status = 3;
                cm.sendYesNo("你想放棄#e採藥#n？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
            }
        } else if (sel == 4) {
            if (!cm.haveItem(4022023, 100)) {
                cm.sendOk("#b#t4022023#100個#k可以交換#i2028066:##b#t2028066#1個#k。請你再去搜集一些#t4022023#。");
            } else if (!cm.canHold(2028066, 1)) {
                cm.sendOk("背包空間不足。");
            } else {
                cm.sendOk("兌換成功.");
                cm.gainItem(2028066, 1);
                cm.gainItem(4022023, -100);
            }
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendOk("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            cm.sendOk("採藥技術已經初始化。如果想重新學習，請再來找我。");
            cm.teachSkill(92000000, 0, 0);
            if (cm.isQuestActive(3195)) {
                cm.forfeitQuest(3195);
            }
            if (cm.isQuestActive(3196)) {
                cm.forfeitQuest(3196);
            }
        } else {
            cm.sendNext("沒有學習#e採藥#n初始化失敗。");
        }
        cm.dispose();
    }
}
