function start() {
    if (im.canHold(4001853, 1)) {
        if (im.used()) {
            im.gainItemPeriod(4001853, 1, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}