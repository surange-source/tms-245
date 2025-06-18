/*
 * 芬芬時尚潮流
 * 積分商店
 */
var status = 0;
var eff ="#fUI/UIWindow/Quest/icon6/7#";
var eff1 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "" + eff1 + "在線:#r"+cm.getOnlineTime()+"#k        " + eff1 + "積分：#r"+cm.getPlayerPoints()+"#k\r\n";
        //selStr += "#L0#" + eff1 + "#b積分兌換            [楓點-椅子-點裝-神級飾品]#l#k\r\n\r\n";
        selStr += "#L1#" + eff1 + "#b積分兌換   [頂級裝備-神級飾品-高級卷軸-豪華椅子]#l#k\r\n";        
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900002, "jifen");
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9900001, "huoli");
            break;                
        }
    }
}