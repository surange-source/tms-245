var eventMapId = 925080000;
var setupTask = null;

function init() {
    var eim = em.newInstance("ExpField");
    eim.setAutoInstanceMap(eventMapId);
    scheduleNew(eim);
}

function scheduleNew(eim) {
    setupTask = em.schedule("scheduledTimeout", 5000, eim);
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}

function scheduledTimeout(eim) {
    var lvMobExp = em.getLvMobExp();
    var outMap = eim.getMapFactoryMap(925020001);
    var timeNow = java.lang.System.currentTimeMillis();
    for each(player in eim.getPlayers()) {
        var time = player.getTempValues().getOrDefault("DojoExpFieldTime", null);
        if (time == null) {
            player.changeMap(outMap);
            continue;
        }
        if (timeNow >= time) {
            var questStatus = chr.getQuest(3889);
            var leftTime = questStatus.getCustomData();
            if (leftTime == null || leftTime.isEmpty()) {
                leftTime = "0";
            } else {
                leftTime = (Math.max(0, parseInt(leftTime) - 1)).toString();
            }
            questStatus.getQuest().forceStart(player, 0, leftTime);
            if (parseInt(leftTime) <= 0) {
                player.getTempValues().remove("DojoExpFieldTime");
                player.changeMap(outMap);
                continue;
            }
            player.getTempValues().put("DojoExpFieldTime", timeNow + parseInt(leftTime) * 60000);
        }

        var n = player.getLevel() < 1 ? 1 : lvMobExp.length < player.getLevel() ? lvMobExp.length : player.getLevel();
        player.gainFieldExp(parseInt(lvMobExp[n - 1] * 1.5), false);
    }
    scheduleNew(eim);
}

function changedMap(eim, player, mapId) {
    if (mapId == eventMapId) {
        return;
    }
    eim.unregisterPlayer(player);
}