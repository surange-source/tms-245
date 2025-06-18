function start() {
    if (im.canHold(5150188) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 5150188 + ":# #t" + 5150188 + "#");
        im.gainItemPeriod(5150188, 1, 7);
    } else {
        im.sendNext("請確認特殊欄有足夠欄位.");
    }
    im.dispose();
}