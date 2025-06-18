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
        var selStr = "你好。你對煉金術感興趣嗎？\r\n";
        if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
            selStr += "#k#l\r\n#L2##b提升#e煉金術#n等級。#l\r\n#L3#煉金術技術初始化。#k#l";
        } else {
            selStr += "#L0##b聽取有關#e煉金術#n的說明。#l\r\n#L1#學習#e煉金術#n。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("煉金術是用草藥的精油製作各種藥水的技術。除了恢復HP和MP的藥水之外，還可以製作各種讓你變強的藥水。還能製作你從來沒有體驗過的神奇藥水。");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("#b至少必須達到30級2轉以上，龍魔導士必須3轉以上，影武者必須2轉+以上#k，才能學習專業技術。你能達到條件之後再來找我嗎？");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已經學習了3種專業技術。真想學習的話，就必須先放棄一種技術。");
            } else if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
                cm.sendNext("你已經學些過#e煉金術#n，難道還想學？");
            } else {
                if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                    cm.sendOk("恭喜你成功的學些#e煉金術#n。");
                    cm.teachSkill(92040000, 0x1000000, 10);
                } else {
                    cm.sendOk("煉金術必須先學習採藥。往右邊走，可以看到在大鍋旁用心提煉草藥的採藥大師#b斯塔切#k，你可以向她學習採藥。");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("哎呀！你可真貪心。熟練度還不夠。你再去練習練習吧。");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("你想放棄煉金術？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
        }
    } else if (status == 2) {
        cm.sendOk("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
            cm.sendOk("煉金術已經初始化。如果想重新學習，請再來找我。");
            cm.teachSkill(92040000, 0, 0);
        } else {
            cm.sendNext("沒有學習#e煉金術#n初始化失敗。");
        }
        cm.dispose();
    }
}
