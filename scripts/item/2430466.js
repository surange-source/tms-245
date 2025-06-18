function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662006 + ":# #t" + 1662006 + "#\r\n#i" + 1672008 + ":# #t" + 1672008 + "#");
        im.gainItem(1662006, 1);
        im.gainItemPeriod(1672008, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}