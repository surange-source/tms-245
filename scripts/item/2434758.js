function start() {
    if (!im.getPlayer().isBronzeIIMvp()) {
        im.sendOk("很抱歉，你還未達成#eMVP青銅II#n等級，無法使用道具包。");
    } else if (im.used()) {
        var rewarded = im.getWorldShareInfo(21, "RW2");
        if (rewarded != "1") {
            if (!im.canHold(3700342)) {
                im.sendOk("請將裝飾欄位空出一格。");
            } else {
                im.gainItemPeriod(3700342, 1, 90);
                im.updateWorldShareInfo(21, "RW2", "1");
            }
        } else {
            im.sendOk("你已經領取過道具包。");
        }
    } else {
        im.sendOk("發生未知錯誤。");
    }
    im.dispose();
}