function start() {
    if (im.canHold(5121104)) {
        if (im.used()) {
            im.gainItemPeriod(5121104, 1, 10);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}