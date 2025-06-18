function start() {
    if (im.canHold(1113228) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1113228 + ":# #t" + 1113228 + "#");
        im.gainItem(1113228, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}