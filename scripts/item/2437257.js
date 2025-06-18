function start() {
    if (im.canHold(1114400) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1114400 + ":# #t" + 1114400 + "#");
        im.gainItem(1114400, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}