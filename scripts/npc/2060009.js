var status = -1;
var select = -1;
var togos = [[230030200, 251000100], [230000000]];
var togosName = [[230030200, 251000000], [230000000]];
var togosTicket = [[4031242, 0], [0]];
var maps = [230000000, 251000100];
var cost = [10000, 10000];
var location = -1;

function start() {
    for (var i=0; i < maps.length; i++) {
        if (cm.getMapId() == maps[i]) {
            location = i
            break;
        }
    }
    if (location == -1) {
        cm.sendNext("該地圖還不支持傳送，請向管理員反饋。");
        cm.dispose();
    } else {
        var menu = "";
        for (var i=0; i < togosName[location].length; i++) {
            menu += "\r\n#L" + i + "#去#m" + togosName[location][i] + "#";
            if (i == togosName[location].length -1)
                menu += "。";
            menu += "#l";
        }
        cm.sendSimple ("世界上所有的海都是相通的。走著去很遠的地方，通過大海很快就能到達。怎麼樣？你想乘坐#b海豚出租車嗎#k？\r\n#b" + menu);
    }
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.sendNext("歡迎下次光臨。");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        if (status < 1) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (select == -1)
            select = selection;
        if (cm.haveItem(togosTicket[location][select])) {
            cm.sendYesNo("你有 #t" + togosTicket[location][select] + "# 。你想使用 #t" + togosTicket[location][select] + "# 現在移動嗎？");
        } else {
            cm.sendYesNo("費用是" + cost[location] + "楓幣。你想現在移動嗎？");
        }
    } else if (status == 1) {
        if (!cm.haveItem(togosTicket[location][select]) && cm.getMeso() < cost[location]) {
            cm.sendNext("你好像沒帶夠錢啊。");
        } else {
            if (cm.haveItem(togosTicket[location][select])) {
                cm.gainItem(togosTicket[location][select],-1);
            } else {
                cm.gainMeso(-cost[location]);
            }
            cm.warp(togos[location][select]);
        }
        cm.dispose();
    }
}
