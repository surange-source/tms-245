function enter(pi) {
    try {//
        var em = pi.getEventManager("Iceman");
        var eim = pi.getEventInstance();
        if (pi.getPlayer().getParty() != null && pi.getMap().getMonsterById(9300438) != null && pi.isLeader() && eim.getProperty("checkdone").equals(String(pi.getMapId()))) {

            pi.warpParty(((pi.getPlayer().getMapId() / 100) + 1) * 100 - (pi.getPlayer().getMapId() % 100));
            pi.playPortalSE();
        } else {
            pi.playerMessage(5, "請組隊長進入傳送口, 並確認冰騎士在這附近.");
        }
    } catch (e) {
        pi.playerMessage(5, "Error: " + e);
    }
}
