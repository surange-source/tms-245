function start() {
    if (im.canHold(2643008, 10) >= 1 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 2643008 + ":# #t" + 2643008 + "#");
        im.gainItem(2643008, 10);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}