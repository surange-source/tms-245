function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662116 + ":# #t" + 1662116 + "#\r\n#i" + 1672007 + ":# #t" + 1672007 + "#");
        im.gainItem(1662116, 1);
        im.gainItemPeriod(1672007, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}