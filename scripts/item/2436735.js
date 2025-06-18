function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662089 + ":# #t" + 1662089 + "#\r\n#i" + 1672007 + ":# #t" + 1672007 + "#");
        im.gainItem(1662089, 1);
        im.gainItemPeriod(1672007, 1, 90);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}