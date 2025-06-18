function enter(pi) {
    if (pi.getQuestStatus(6134) == 1) {
        var em = pi.getEventManager("s4resurrection2");
        if (em == null) {
            pi.playerMessage("由於未知的原因，你不能進入到裡面。");
        } else {
            var prop = em.getProperty("started");
            if (prop == null || prop.equals("false")) {
                em.startInstance(pi.getPlayer());
                return true;
            } else {
                pi.playerMessage("已經有人在挑戰任務。");
            }
        }
    } else {
        pi.playerMessage("你不能進入到裡面。");
    }
    return false;
}
