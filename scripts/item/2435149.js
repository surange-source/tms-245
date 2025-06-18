function start() {
    if (im.canHold(1032261) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1032261 + ":# #t" + 1032261 + "#");
        im.gainItem(1032261, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}