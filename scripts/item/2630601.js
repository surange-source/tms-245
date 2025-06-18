var amount = 3;
function start() {
    if (im.canHold(2435719, amount) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 2435719 + ":# #t" + 2435719 + "# " + amount + "個");
        im.gainItem(2435719, amount);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}