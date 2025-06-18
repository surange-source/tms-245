function start() {
    if (im.haveItem(im.getItemId(), 5)) {
        im.gainItem(im.getItemId(), -5);
        im.gainItem(2435719, 1);
    } else {
        im.dropMessage(5, "收集5個能獲得5轉後能夠使用的核心寶石");
    }
    im.dispose();
}
