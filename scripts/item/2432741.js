function start() {
    if (im.getSpace(1) >= 7 && im.used()) {        
        im.gainItem(1003863, 1);
        im.gainItem(1052612, 1);
        im.gainItem(1102562, 1);
        im.gainItem(1012376, 1);
        im.gainItem(1122252, 1);
        im.gainItem(1132228, 1);
        im.gainItem(1113034, 1);
    } else {
        im.sendNext("請確認消耗欄有7格以上.");
    }
    im.dispose();
}