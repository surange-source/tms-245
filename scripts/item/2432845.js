//增加墜飾欄位：永久
var status = -1;

function start() {
    im.sendYesNo("使用的話額外墜飾欄位可永久使用.現在設置要擴充欄位嗎?");
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
        if (im.getQuestCustomData(122700) == "0") {
            im.sendNext("你當前墜飾欄已經是永久狀態");
        } else if (im.used()) {
            im.setForeverPendantSlot();
        } else {
            im.sendOk("出現未知錯誤");
        }
        im.dispose();
    }
}