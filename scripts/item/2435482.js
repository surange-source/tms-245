function start() {
    if (im.getSpace(1) >= 1 && im.getSpace(2) >= 1 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662146 + ":# #t" + 1662146 + "#\r\n#i" + 2439704 + ":# #t" + 2439704 + "#");
        im.gainItem(1662146, 1);
        im.gainItem(2439704, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}