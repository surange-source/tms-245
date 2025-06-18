function enter(pi) {
    var returnMap = pi.getSavedLocation("BPReturn");

    var portal = 0;
    if (returnMap == 950000100) {
        returnMap = 105100000;
        portal = 1;
    } else {
        pi.clearSavedLocation("BPReturn");
        pi.playerMessage("透過Boss選單移動的玩家返回原本的地圖。");
    }
    pi.playPortalSE();
    pi.warp(returnMap, portal);
}
