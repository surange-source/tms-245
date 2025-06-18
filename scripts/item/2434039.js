function start() {
    if (im.canHold(1662072) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662072 + ":# #t" + 1662072 + "#");
        im.gainItem(1662072, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}