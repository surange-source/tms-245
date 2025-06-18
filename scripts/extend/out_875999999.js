var isChivalrousFighter;

function start() {
    var job = cm.getMapleJob();
    var isMoXuan = job.getName().contains("墨玄");
    isChivalrousFighter = job.getName().contains("傑特");
    if (isChivalrousFighter) {
        cm.sendYesNo("你好，#h0#。需要轉生成墨玄嗎？");
        return;
    } else if (isMoXuan && !cm.isQuestFinished(66024)) {
        cm.sendOk("請先完成任務。");
        cm.dispose();
        return;
    }
    cm.warp(100000000);
    cm.dispose();
}

var TransmitEquip = new Array (
    [1352820, 1352860],
    [1352821, 1352861],
    [1352822, 1352862],
    [1352823, 1352863],
    [1352824, 1352867],
    [1352825, 1352865],
    [1352826, 1352864],
    [1352828, 1352864],
    [1352829, 1352867],
    [1352850, 1352866]
);
var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == -2) {
        cm.sendGetText("你確定不轉生成#b墨玄#k嗎？\r\n蒼龍俠客#r後續將不會進行更新維護，可能會影響之後的遊玩#k。\r\n\r\n不進行轉生墨玄的話請輸入#b確認#k");
    } else if (status == i++) {
        if (cm.getText() == null || !cm.getText().equals("確認")) {
            cm.sendOk("輸入有誤");
        } else {
            cm.warp(100000000);
        }
        cm.dispose();
    } else if (status == i++) {
        cm.updateOneQuestInfo(66024, "oldJob", cm.getJob());
        cm.changeJob(17000);
        cm.getPlayer().extractVCores();

        var b = 1;
        if (cm.haveItem(1492244)) {
            b++;
        }
        if (cm.haveItem(1492245)) {
            b++;
        }
        cm.getPlayer().setKeyValue("EquipTransmitTimes", b.toString());
        var tps = [-1, 1];
        for each (eqpData in TransmitEquip) {
            for each (tp in tps) {
                cm.getInventory(tp).listById(eqpData[0]).forEach(function(item){
                    item.transmit(eqpData[1], cm.getJob());
                    cm.getPlayer().forceUpdateItem(item);
                });
            }
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}