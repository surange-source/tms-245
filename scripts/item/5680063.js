function start() {
    if (im.canHold(1672023) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 1672023 + ":# #t" + 1672023 + "#");
        im.gainItemPeriod(1672023, 1, 30);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}