// EL Nath PQ

function enter(pi) {
    if (pi.haveMonster(9300093)) { // Tylus
        var pt = pi.getEventManager("ProtectTylus");
        if (pt == null) {
            pi.warp(211000001, 0);
        } else {
            if (pt.getInstance("ProtectTylus").getTimeLeft() < 180000) { // 小於3分鐘
                pi.warpParty(921100301, 0);
            } else {
                pi.playerMessage("請保衛泰勒斯到3分鐘時間!");
                return false;
            }
        }
    } else {
        pi.warp(211000001, 0);
        pi.playerMessage("哦 不! 保衛泰勒斯 失敗了!");
    }
    return true;
}
