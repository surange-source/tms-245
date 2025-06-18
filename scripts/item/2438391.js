function start() {
    if (im.canHold(1033000) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1033000 + ":# #t" + 1033000 + "#");
        im.gainItem(1033000, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}