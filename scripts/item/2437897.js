function start() {
    if (im.canHold(1114401) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1114401 + ":# #t" + 1114401 + "#");
        im.gainItem(1114401, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}