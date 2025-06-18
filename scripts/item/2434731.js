function start() {
    if (im.used()) {
        im.gainNX(2, 120);
    } else {
        im.sendOk("發生未知錯誤。");
    }
    im.dispose();
}