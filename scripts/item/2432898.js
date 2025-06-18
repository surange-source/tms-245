function start() {
    if (im.canHold(5180000) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 5180000 + ":# #t" + 5180000 + "#");
        im.gainItemPeriod(5180000, 1, 90);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}