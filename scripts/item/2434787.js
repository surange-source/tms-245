function start() {
    if (im.canHold(5390029, 5)) {
        if (im.used()) {
            im.gainItemPeriod(5390029, 5, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}