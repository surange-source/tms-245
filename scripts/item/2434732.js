function start() {
    if (im.used()) {
        im.gainNX(2, 350);
    } else {
        im.sendOk("發生未知錯誤。");
    }
    im.dispose();
}