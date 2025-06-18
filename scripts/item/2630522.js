function start() {
    if (im.getSpace(1) >= 1 && im.getSpace(5) >= 1 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662150 + ":# #t" + 1662150 + "#\r\n#i" + 5680063 + ":# #t" + 5680063 + "#");
        im.gainItem(1662150, 1);
        im.gainItem(5680063, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}