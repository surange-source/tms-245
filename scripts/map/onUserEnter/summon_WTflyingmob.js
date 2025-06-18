function start() {
    var map = ms.getMap();
    if (map == null) {
        ms.dispose();
        return;
    }
    var mapId = map.getId();
    var toSummonId;
    var reviveId
    if (Math.floor(mapId / 100) == 1053001) {
        // 墮落小魔鬼
        toSummonId = 3503012;
        reviveId = 3503013;
    } else {
        // 墮落魔族老鷹騎士
        toSummonId = 3503010;
        reviveId = 3503011;
    }
    if (map.getMobObjectByID(toSummonId) == null && map.getMobObjectByID(reviveId) == null) {
        ms.spawnMonster(toSummonId);
    }
    ms.dispose();
}