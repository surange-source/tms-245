var amount = 5;
function start() {
    if (im.canHold(2439869, amount) && im.used()) {
        im.sendOk("#e<獲得道具>#b\r\n#i" + 2439869 + ":# #t" + 2439869 + "# " + amount + "個");
        im.gainItem(2439869, amount);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}