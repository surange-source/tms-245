var status = -1;
var days = 15;

function start() {
    im.sendYesNo("使用的話額外墜飾欄位可增加使用" + days + "天.現在設置要擴充欄位嗎?");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == -1) {
            im.sendNext("下次設置想要擴充欄位的話在雙點擊道具看看");
            im.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        if (im.used()) {
            if (im.addPendantSlot(days)) {
                im.sendNext("成功地設置額外墜飾欄位時間增加" + days + "天。");
            } else {
                im.sendNext("你當前墜飾欄已經是永久狀態");
                im.gainItem(2438874);
            }
        }
        im.dispose();
    }
}