function start() {
    if (im.getSpace(1) >= 1 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1122334 + ":# #t" + 1122334 + "#");
        im.gainItemPeriod(1122334, 1, 90);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}