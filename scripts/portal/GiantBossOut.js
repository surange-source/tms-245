function enter(pi) {
    var returnMap = pi.getSavedLocation("BPReturn");
    var portal = 0;
    pi.clearSavedLocation("BPReturn");
    pi.playerMessage("透過Boss選單移動的玩家返回原本的地圖。");
    pi.playPortalSE();
    pi.warp(returnMap, portal);
}
