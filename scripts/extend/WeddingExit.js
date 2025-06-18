var status;

function start() {
    status = -1;
    action(1, 0, 0);
}
var check = 10;
function action(mode, type, selection) {

    if (mode == 0) {
        cm.sendNext("請好好享受剩下的婚禮時光吧。");
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }
    var eim = cm.getEventInstance();
    if (eim == null) {
        cm.sendOk("配置出錯,請聯繫管理員。");
        cm.dispose();
        return;
    }

    switch (status) {
        case 0:
            var partyid = parseInt(eim.getProperty("partyID"));
            if (cm.getPartyID() <= 0 || cm.getPartyID() != partyid) {
                cm.sendYesNo("你要離開這裡了嗎?");
            } else {
                var marr = cm.getQuestRecord(160002);
                var data = marr.getCustomData();
                if (data == null) {
                    marr.setCustomData("0");
                    data = "0";
                }
                check = parseInt(data);
                if (check == 10) {//10 20 30
                    cm.sendYesNo("你們真像是一對兒相親相愛的蝸牛啊！婚禮結束了，要出去嗎？");
                } else if (check >= 20) {//10 20 30
                    cm.sendYesNo("你們真像是一對兒相親相愛的蝸牛啊！婚禮結束了，是否要進入下一個環節呢？");
                }
            }
            break;
        case 1: //
            if (check == 10) {
                cm.warp(680000500, 0);
            } else if (check >= 20) {//10 20 30
                cm.warpMap(680000300, 0);
            }
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
    }
}
