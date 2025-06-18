function enter(pi) {
    if (!pi.canHold(4001261, 1)) {
        pi.playerMessage(5, "請確認其他攔有足夠空間");
        return false;
    }
    pi.gainExpR(pi.getPlayer().getMapId() == 105100301 ? 130000 : 260000);
    pi.gainNX(pi.getPlayer().getMapId() == 105100301 ? 500 : 500);
    pi.gainItem(4001261, 1);
    pi.warp(105100100, 0);
    pi.playPortalSE();
}
