function start() {
    if (im.canHold(5044012, 1)) {
        if (im.used()) {
            im.gainItemPeriod(5044012, 1, 1);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}