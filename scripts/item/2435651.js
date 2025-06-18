function start() {
    if(im.canHold(4001832, 5000) && im.used()) {
        im.gainItem(4001832, 5000);
        im.dispose();
    }
}