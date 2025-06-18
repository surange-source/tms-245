function start() {
    var id = Math.random()*1+1 == 1 ? 2434815 : 2434814
    if (im.canHold(id, 1)) {
        if (im.used()) {
            im.gainItemPeriod(id, 1, 3);
        }
    } else {
        im.sendOk("道具欄不足。");
    }
    im.dispose();
}