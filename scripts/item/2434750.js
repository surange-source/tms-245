function start() {
    if (im.getSpace(4) < 1) {
        im.dropMessage(1, "道具欄位不足。");
    } else if (!im.used()) {
        im.dropMessage(1, "發生未知錯誤。");
    } else {
        im.gainMeso(100 + Math.floor(Math.random() * 100000));
        im.gainItem(4310020, 15 + Math.floor(Math.random() * 16));
    }
    im.dispose();
}