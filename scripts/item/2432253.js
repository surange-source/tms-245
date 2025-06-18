/* global im */

function start() {
    if (im.used()) {
        im.addHP(500000);
    }
    im.dispose();
}