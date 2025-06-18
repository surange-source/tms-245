function start() {
    if (im.canHold(5076100)) {
        if (im.used()) {
            im.gainItemPeriod(5076100, 1, 10);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}