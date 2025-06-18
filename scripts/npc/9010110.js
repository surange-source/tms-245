function start() {
    if (cm.getPlayer().isIntern()) {
        cm.warp(100000000);
        cm.sendOk("離開真實之房");
    }
    cm.dispose();
}