function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662136 + ":# #t" + 1662136 + "#\r\n#i" + 1672003 + ":# #t" + 1672003 + "#");
        im.gainItem(1662136, 1);
        im.gainItemPeriod(1672003, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}