/*
  魯塔比斯地圖返回到以前的地圖
*/

function enter(pi) {
    var returnMap = pi.getSavedLocation("BPReturn");
    pi.clearSavedLocation("BPReturn");
    if (returnMap < 0) {
        returnMap = 105000000;;
    }
    pi.warp(returnMap);
    pi.playerMessage("從魯塔比斯回到原來所在的地方。");
}