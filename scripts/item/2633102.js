function start() {
    if (im.canHold(5152257) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 5152257 + ":# #t" + 5152257 + "#");
        im.gainItemPeriod(5152257, 1, 7);
    } else {
        im.sendNext("請確認特殊欄有足夠欄位.");
    }
    im.dispose();
}