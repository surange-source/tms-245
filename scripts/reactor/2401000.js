function act() {
    var eim = rm.getEventInstance();
    if (eim != null) {
        var em = eim.getEventManager();
        var mob = em.getMonster(8810026);
        //mob.setChangeHP(2100000000);
        eim.registerMonster(mob);
        var map = eim.getMapInstance(2);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(71, 260));
        rm.changeMusic("Bgm14/HonTale");
        rm.mapMessage("一聲巨響，黑龍閃亮登場。");
        //rm.scheduleWarp(43200, 240000000);
        if (!rm.getPlayer().isGm()) {
            rm.getMap().startSpeedRun();
        }
    }
}
