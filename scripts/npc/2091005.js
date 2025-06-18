var status = -1;
var gainItemId = 0;

function start() {
    if (cm.getMapId() == 925080000) {
        var questStatus = cm.getQuestRecord(3889);
        var leftTime = questStatus.getCustomData() == null || questStatus.getCustomData().isEmpty() ? 0 : parseInt(questStatus.getCustomData());
        var Cards = [
            [1440, 4001882],
            [720, 4001862],
            [540, 4001881],
            [360, 4001854],
            [180, 4001853],
            [60, 4001852],
            [30, 4001851]
        ];
        var msg = "";
        for each(item in Cards) {
            if (item[0] <= leftTime) {
                gainItemId = item[1];
                break;
            }
        }
        if (gainItemId == 0) {
            msg = "現在離開的話雖然沒有可退還的護符。";
        } else {
            msg = "現在離開的話可以退還成#b#t" + gainItemId + "##k。 雖然現在時間還在流失。\r\n但可以回到決定的瞬間，所以快選擇吧。\r\n啊，我可以退還的護符是一天份的，所以不要太晚使用喔。";
        }
        cm.sendYesNo("還沒到出去的時間卻要走了？\r\n還剩下#r#e" + leftTime + "分鐘#k#n耶。 雖然會依照剩餘的時間退還護符，但這樣不是有點浪費嗎？ 再想一想吧。\r\n" + msg);
    } else {
        cm.sendYesNo("都還沒入場就氣餒了？\r\n哈哈，力量消失而感到害怕了吧？");
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -2;
    if (status == i++) {
        if (cm.getMapId() == 925080000) {
            cm.sendNext("真是變化無常，還是專心修練吧。");
        } else {
            cm.sendNext("搞什麼，一下這樣一下那樣的！但是，待不了多久就會邊哭邊吵著要回去了吧？");
        }
    } else if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.dispose();
        if (cm.getMapId() == 925080000) {
            if (gainItemId > 0) {
                cm.gainItemPeriod(gainItemId, 1, 1);
            }
            cm.forceStartQuest(3889, "0");
            cm.getPlayer().getTempValues().remove("DojoExpFieldTime");
            cm.warp(925020001);
        } else {
            cm.updateOneQuestInfo(3847, "NResult", "giveup");
            cm.warp(925020002);
        }
    } else {
        cm.dispose();
    }
}
