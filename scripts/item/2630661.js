function start() {
    if (im.getSpace(1) >= 5 && im.used()) {
        im.gainItem(1702830, 1);
        im.gainItem(1005152, 1);
        im.gainItem(1053305, 1);
        im.gainItem(1073273, 1);
        im.gainItem(1103096, 1);
    } else {
        im.sendNext("請確認裝備欄有足夠欄位.");
    }
    im.dispose();
}