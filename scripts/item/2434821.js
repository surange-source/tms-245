function start() {
    if (im.canHold(4001864, 3)) {
        if (im.used()) {
            im.gainItemPeriod(4001864, 3, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}