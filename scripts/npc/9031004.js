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
        var selStr = "#b梅茲#k大人我高尚的業餘愛好是寶石鑒賞。看著閃光的寶石，不知不覺一天就過去了。嗯～你也感興趣嗎？看你也不像是對寶石感興趣的人啊？\r\n";
        if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
            selStr += "#k#l\r\n#L2##b提升#e飾品製作#n等級。#l\r\n#L3#飾品製作技術初始化。#k#l";
        } else {
            selStr += "#L0##b聽取有關#e飾品製作#n的說明。#l\r\n#L1#學習#e飾品製作#n技術。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("要想說明飾品製作，就必須先談談寶石之美。不過都說的話，可能說上一整天都不夠，我就長話短說吧……\r\n飾品製作非常簡單。就是對未加工的寶石和礦石進行加工，製作成美麗的飾品。通過這個過程，可以發揮出材料隱藏的力量，讓人變得更美或者更強。");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("嘖嘖……哎呀哎呀……你想早點學習，我也可以理解，不過都得按規矩辦事。你還太弱，現在還不能學習專業技術。你對寶石和美的熱情，我已經知道。不過#b至少必須達到30級2轉以上，龍魔導士必須3轉以上，影武者必須2轉+以上#k，才能學習專業技術。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已經學習了3種專業技術。真想學習的話，就必須先放棄一種技術。");
            } else if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
                cm.sendNext("你已經學些過#e飾品製作#n，難道還想學？");
            } else {
                if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                    cm.sendOk("恭喜你成功的學些#e飾品製作#n。");
                    cm.teachSkill(92030000, 0x1000000, 10);
                } else {
                    cm.sendOk("哎呀～這可怎麼辦呢？要想學習飾品製作的話，就必須先學習採礦。要想製作飾品，需要有各種金屬和寶石～你先到左邊去，那裡有個長得像蘑菇一樣的叫#b諾布#k的採礦大師，你先去那裡學習採礦吧。");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("哎呀！你可真貪心。熟練度還不夠。你再去練習練習吧。");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("你想放棄飾品製作？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
        }
    } else if (status == 2) {
        cm.sendOk("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
            cm.sendOk("飾品製作已經初始化。如果想重新學習，請再來找我。。");
            cm.teachSkill(92030000, 0, 0);
        } else {
            cm.sendNext("沒有學習#e飾品製作#n初始化失敗。");
        }
        cm.dispose();
    }
}
