function start() {
    if (im.getSpace(1) >= 2 && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1662035 + ":# #t" + 1662035 + "#\r\n#i" + 1672029 + ":# #t" + 1672029 + "#");
        im.gainItem(1662035, 1);
        im.gainItemPeriod(1672029, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}