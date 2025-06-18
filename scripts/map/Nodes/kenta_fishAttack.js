function act(oid, time) {
    var em = nm.getEventManager("Kenta");
    var eim = nm.getEventInstance();
    if (em != null && eim != null) {
        nm.startMapEffect("怪物們突然出現在了洞窟裡！我們得用石頭堵住洞窟的入口。", 5120052);
        nm.getMap().setSpawns(true);
        nm.nextNodeAction(9300275, time);
    }
}
