function start() {
    if (im.getSpace(1) >= 1 && im.getSpace(2) >= 1 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662147 + ":# #t" + 1662147 + "#\r\n#i" + 2437267 + ":# #t" + 2437267 + "#");
        im.gainItem(1662147, 1);
        im.gainItem(2437267, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}