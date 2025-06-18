var status = -1;

function start() {
    im.sendYesNo("使用可以擴充 傷害字型儲存欄位 1格。現在要擴充欄位嗎?");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == -1) {
            im.sendNext("下次想要擴充欄位的話在雙點擊道具看看");
            im.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        if (im.used()) {
            if (!im.addDamageSkinSlot()) {
                im.gainItem(im.getItemId(), 1);
                im.sendNext("增加欄位失敗, 可能你無法繼續擴充欄位");
            } else {
                im.sendNext("增加欄位成功");
            }
        } else {
            im.sendOk("出現未知錯誤");
        }
        im.dispose();
    }
}