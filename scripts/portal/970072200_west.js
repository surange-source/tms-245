function enter(pi) {
    var returnMap = pi.getSavedLocation("BPReturn");
    var portal = 0;
    if (returnMap == 950000100) {
        returnMap = pi.getSavedLocation("MULUNG_TC");
        pi.clearSavedLocation("MULUNG_TC");
        portal = "unityPortal2";
    } else {
        pi.clearSavedLocation("BPReturn");
        pi.playerMessage("透過Boss選單移動的玩家返回原本的地圖。");
    }

    if (pi.getMapId() != returnMap) {
        pi.playPortalSE();
        pi.warp(returnMap, portal);
    }
}