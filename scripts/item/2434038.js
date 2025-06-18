function start() {
    if (im.canHold(1662073) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662073 + ":# #t" + 1662073 + "#");
        im.gainItem(1662073, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}