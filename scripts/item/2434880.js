function start() {
    if (im.canHold(1113220) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1113220 + ":# #t" + 1113220 + "#");
        im.gainItem(1113220, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}