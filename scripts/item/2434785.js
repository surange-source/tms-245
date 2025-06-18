function start() {
    if (im.canHold(5390027, 3)) {
        if (im.used()) {
            im.gainItemPeriod(5390027, 3, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}