function enter(pi) {
    if (pi.getPlayer().getParty() != null && pi.isLeader() && pi.haveItem(4001055,1)) {
        pi.warpParty(920010100);
        pi.playPortalSE();
    } else {
        pi.playerMessage(5,"請組隊長進入這個傳送口,並確定擁有生命草.");
    }
}
