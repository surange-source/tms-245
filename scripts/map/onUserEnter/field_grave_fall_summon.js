function start() {
    ms.fieldGravefall(9, 0x30, 0x33);
    var map = ms.getMap();
    if (map == null) {
        ms.dispose();
        return;
    }
    // 飛翔紅色, 飛翔藍色, 飛翔黃色, 飛翔綠色
    var toSummonIds = [8250031, 8250032, 8250033, 8250034];
    var reviveIds = [8250035, 8250036, 8250037, 8250038];
    var found = false;
    for each(id in toSummonIds) {
        if (map.getMobObjectByID(id) != null) {
            found = true;
            break;
        }
    }
    if (!found) {
        for each(id in reviveIds) {
            if (map.getMobObjectByID(id) != null) {
                found = true;
                break;
            }
        }
    }
    if (!found) {
        ms.spawnMonster(toSummonIds[Math.floor(Math.random() * toSummonIds.length)]);
    }
    ms.dispose();
}