function start() {
    if (!im.getPlayer().isBronzeIVMvp()) {
        im.sendOk("很抱歉，你還未達成#eMVP青銅IV#n等級，無法使用道具包。");
    } else if (im.used()) {
        var rewarded = im.getWorldShareInfo(21, "RW4");
        if (rewarded != "1") {
            if (!im.canHold(3700344)) {
                im.sendOk("請將裝飾欄位空出一格。");
            } else {
                im.gainItemPeriod(3700344, 1, 90);
                im.updateWorldShareInfo(21, "RW4", "1");
            }
        } else {
            im.sendOk("你已經領取過道具包。");
        }
    } else {
        im.sendOk("發生未知錯誤。");
    }
    im.dispose();
}