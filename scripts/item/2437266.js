function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662128 + ":# #t" + 1662128 + "#\r\n#i" + 1672007 + ":# #t" + 1672007 + "#");
        im.gainItem(1662128, 1);
        im.gainItemPeriod(1672007, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}