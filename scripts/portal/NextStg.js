/*
 * 功能:濃姬副本
 * 下一階段傳送口
 * 
 */
function enter(pi) {
    if (pi.getPlayer().getParty() != null && pi.getMap().getAllMonster().size() == 0 && pi.isLeader()) {
        pi.warpParty(pi.getPlayer().getMapId() + 100);
        pi.playPortalSE();
    } else {
        pi.playerMessage(5, "請確認當前地圖是否還存在怪物！");
    }
}
