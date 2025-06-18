// 泡點地圖
var maps = [910000000, 910001000, 100000000, 450001000];
// 泡點生效頻道
var channels = [1];
// 點數類型 1 - 樂豆點, 2 - 楓點, 3 - 里程
var toCharge = 3;
// 泡點點數
var amount = 1;
// 測試機泡點點數
var testpiaAmount = 5;
// 泡點間隔時間(ms)
var perTime = 2 * 60 * 1000;

function init() {
    var found = false;
    for each (channel in channels) {
        if (em.getChannel() == channel) {
            found = true;
            break;
        }
    }
    if (!found) {
        return;
    }
    if (em.getConfig("tespia").equalsIgnoreCase("true")) {
        amount = testpiaAmount;
    }
    var eim = em.newInstance("Paodian");
    for each (mapId in maps) {
        eim.setAutoInstanceMap(mapId);
    }
    eim.startEventTimer(perTime);
}

function playerEntry(eim, player) {
    em.showCombustionMessage(player.getClient(), "#fn哥德 ExtraBold##fs26#          已進入泡點地圖          ", 10, -120);
}

function scheduledTimeout(eim) {
    var success = false;
    for each(player in eim.getPlayers()) {
        switch (toCharge) {
            case 1:
            case 2:
                success = player.modifyCSPoints(toCharge, amount, true);
                break;
            case 3:
                success = player.modifyMileage(amount, true) == 0;
                break;
            default:
                return;
        }
        if (success) {
            player.dropMessage(5, "[泡點獎勵]：獲得 [ " + amount + " ] " + (toCharge == 1 ? "樂豆點" : toCharge == 2 ? "楓點" : "里程"));
        }
    }
    eim.restartEventTimer(perTime);
}

function changedMap(eim, player, mapId) {
    for each (id in maps) {
        if (mapId == id) {
            return;
        }
    }
    eim.unregisterPlayer(player);
}