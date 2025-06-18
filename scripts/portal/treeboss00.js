function enter(pi) {
    if (pi.getPQLog("克雷塞爾") > 2) {
        pi.playerMessage(5, "你今天已經不能進入到裡面去了。");
        return false;
    }
    var em = pi.getEventManager("BossKrexel");
    if (em == null) {
        pi.playerMessage(1, "配置文件不存在,請聯繫管理員。");
    } else {
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            pi.playPortalSE();
            pi.setPQLog("克雷塞爾");
            em.startInstance(pi.getPlayer());
        } else if (prop.equals("1")) {
            var eim = pi.getEIMbyEvenName("BossKrexel");
            if (eim != null) {
                pi.setPQLog("克雷塞爾");
                eim.registerPlayer(pi.getPlayer());
            } else {
                pi.playerMessage(1, "執行錯誤,請聯繫管理員。");
            }
        } else {
            pi.playerMessage(5, "對抗克雷塞爾的挑戰已經開始了，你不能進入到裡面。");
            return false;
        }
    }
}
