function start() {
    if (im.canHold(5689000, 3) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 5689000 + ":# #t" + 5689000 + "# 3個");
        im.gainItem(5689000, 3);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}