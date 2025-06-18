function start() {
    if (!im.getPlayer().isBronzeIIIMvp()) {
        im.sendOk("很抱歉，你還未達成#eMVP青銅III#n等級，無法使用道具包。");
    } else if (im.used()) {
        var rewarded = im.getWorldShareInfo(21, "RW3");
        if (rewarded != "1") {
            if (!im.canHold(3700343)) {
                im.sendOk("請將裝飾欄位空出一格。");
            } else {
                im.gainItemPeriod(3700343, 1, 90);
                im.updateWorldShareInfo(21, "RW3", "1");
            }
        } else {
            im.sendOk("你已經領取過道具包。");
        }
    } else {
        im.sendOk("發生未知錯誤。");
    }
    im.dispose();
}