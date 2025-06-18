function start() {
    if (!im.getPlayer().isBronzeIMvp()) {
        im.sendOk("很抱歉，你還未達成#eMVP青銅I#n等級，無法使用道具包。");
    } else if (im.used()) {
        var rewarded = im.getWorldShareInfo(21, "RW1");
        if (rewarded != "1") {
            if (!im.canHold(3700341)) {
                im.sendOk("請將裝飾欄位空出一格。");
            } else {
                im.gainItemPeriod(3700341, 1, 90);
                im.updateWorldShareInfo(21, "RW1", "1");
            }
        } else {
            im.sendOk("你已經領取過道具包。");
        }
    } else {
        im.sendOk("發生未知錯誤。");
    }
    im.dispose();
}