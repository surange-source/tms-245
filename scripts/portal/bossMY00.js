function enter(pi) {
    if (!pi.haveItem(4032246)) {
        pi.playerMessage(5, "你沒有夢幻主題公園魂魄。");
    } else if (pi.getPQLog(4032246) >= 3) {
        pi.playerMessage(5, "夢幻主題公園一天只能進去3次");
    } else {
        //pi.openNpc(9270047);
        var em = pi.getEventManager("ScarTarBattle");
        if (em == null) {
            pi.playerMessage(1, "配置文件不存在,請聯繫管理員。");
        } else {
            var prop = em.getProperty("state");
            if (prop == null || prop.equals("0")) {
                var FantMap = pi.getMap(551030200);
                FantMap.resetReactors();
                FantMap.killAllMonsters(false);
                pi.playPortalSE();
                em.startInstance(pi.getPlayer());
                pi.setPQLog(4032246);
            } else if (prop.equals("1")) {
                var eim = pi.getEIMbyEvenName("ScarTarBattle");
                if (eim != null) {
                    pi.setPQLog(4032246);
                    eim.registerPlayer(pi.getPlayer());
                } else {
                    pi.playerMessage(1, "執行錯誤,請聯繫管理員。");
                }
            } else {
                pi.playerMessage(5, "對抗怪物的挑戰已經開始了，你不能進去。");
            }
        }
    }
}
