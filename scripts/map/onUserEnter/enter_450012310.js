function start() {
    var map = ms.getMap();
    if (map == null) {
        ms.dispose();
        return;
    }
    // 帝斯塔比翁
    var toSummonId = 8645026;
    var reviveId = 8645027;
    if (map.getMobObjectByID(toSummonId) == null && map.getMobObjectByID(reviveId) == null) {
        ms.spawnMonster(toSummonId);
    }
    ms.dispose();
}