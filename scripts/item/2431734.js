function start() {
    if (im.getSpace(2) >= 3 && im.used()) {        
        im.gainItem(2430482, 1);
        im.gainItem(2432741, 1);
        im.gainItem(2438908, 1);
    } else {
        im.sendNext("請確認消耗欄有三格以上.");
    }
    im.dispose();
}