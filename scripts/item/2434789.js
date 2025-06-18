function start() {
    if (im.canHold(5121059, 1)) {
        if (im.used()) {
            im.gainItemPeriod(5121059, 1, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}