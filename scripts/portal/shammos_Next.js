function enter(pi) {
    try {//checkdone
        var em = pi.getEventManager("Rex");
        var eim = pi.getEventInstance();
        if (em != null && eim != null) {
            var mapid = pi.getPlayer().getMapId();
            if (pi.getPlayer().getParty() != null && pi.getMap().getMonsterById(9300275) != null && pi.isLeader() && eim.getProperty("checkdone").equals(String(mapid))) {
                pi.warpParty(((pi.getPlayer().getMapId() / 100) + 1) * 100 - (pi.getPlayer().getMapId() % 100));
                pi.playPortalSE();
            } else {
                pi.playerMessage(5, "請讓你的組隊長進入這個傳送口,並確定[邪摩斯]在這附近.");
            }
        }
    } catch (e) {
        pi.playerMessage(5, "Error: " + e);
    }
}
