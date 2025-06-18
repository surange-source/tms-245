/*
  魯塔比斯地圖返回到以前的地圖
*/
function enter(pi) {
    var returnMap = pi.getSavedLocation("BPReturn");
    var portal = 0;
    if (returnMap == 950000100) {
        returnMap = pi.getSavedLocation("MULUNG_TC");
        pi.clearSavedLocation("MULUNG_TC");
        portal = "unityPortal2";
    } else {
        pi.clearSavedLocation("BPReturn");
    }

    if (returnMap == 950000100) {
        returnMap = 105010000;
        portal = 0;
    }
    pi.playerMessage("回到原本去魯塔必思的地方.");
    pi.playPortalSE();
    pi.warp(returnMap, portal);
}
