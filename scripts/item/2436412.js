function start() {
    if (im.canHold(2450124, 2)) {
        if (im.used()) {
            im.gainItemPeriod(2450124, 2, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}