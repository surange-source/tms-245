function start() {
    if (im.used()) {
        im.getPlayer().addHPMP(100, 100);
        im.useItem(2002093);
    }
    im.dispose();
}