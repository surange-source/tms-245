function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1666004 + ":# #t" + 1666004 + "#\r\n#i" + 1672002 + ":# #t" + 1672002 + "#");
        im.gainItem(1666004, 1);
        im.gainItemPeriod(1672002, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}