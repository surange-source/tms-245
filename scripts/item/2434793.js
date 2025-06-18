function start() {
    if (im.canHold(2001584, 50)) {
        if (im.used()) {
            im.gainItem(2001584, 50);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}