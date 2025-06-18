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
        var selStr = "我是裝備製作達人#b埃珅#k。找我有事嗎？\r\n";
        if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
            selStr += "#k#l\r\n#L2##b提升#e裝備製作#n等級。#l\r\n#L3#裝備製作技術初始化。#k#l";
        } else {
            selStr += "#L0##b聽取有關#e裝備製作#n的說明。#l\r\n#L1#學習#e裝備製作#n技術。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("裝備製作是用採礦提煉好的礦物或寶石，在巨大的熔爐裡融化，製作成自己需要的防具或武器的技術。只要在我這裡學會了裝備製作技術，就可以製作出以前從未見過的武器和防具。");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("哎呀……你好像還不夠強，還不能學些專業技術。#b至少必須達到30級2轉以上，龍魔導士必須3轉以上，影武者必須2轉+以上#k，才能學習專業技術。等達到條件之後再來找我吧。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已經學習了3種專業技術。真想學習的話，就必須先放棄一種技術。");
            } else if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
                cm.sendNext("你已經學些過#e裝備製作#n，難道還想學？");
            } else {
                if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                    cm.sendOk("恭喜你成功的學些#e裝備製作#n。");
                    cm.teachSkill(92020000, 0x1000000, 10);
                } else {
                    cm.sendOk("沒學習採礦的人，是無法學習裝備製作的。沒有材料的話，就不可能堅持下去……你先到旁邊的採礦大師#b諾布#k那裡去學習採礦吧。");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("哎呀！你可真貪心。熟練度還不夠。你再去練習練習吧。");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("你想放棄裝備製作？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
        }
    } else if (status == 2) {
        cm.sendOk("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
            cm.sendOk("裝備製作已經初始化。如果想重新學習，請再來找我。");
            cm.teachSkill(92020000, 0, 0);
        } else {
            cm.sendNext("沒有學習#e裝備製作#n初始化失敗。");
        }
        cm.dispose();
    }
}
