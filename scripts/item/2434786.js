function start() {
    if (im.canHold(5390028, 4)) {
        if (im.used()) {
            im.gainItemPeriod(5390028, 4, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}