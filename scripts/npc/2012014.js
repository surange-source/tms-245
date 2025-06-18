var status = -1;
var location = -1;
var select = -1;
var cost;
var maps = [200080200, 200080600, 200081400, 200082100];

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
        var selects = "";
        for (var i=0; i < maps.length; i++) {
            if (maps[i] != cm.getMapId()) {
                cost = 5000;
                if ((location == 1 && i == 2) || (location == 2 && i == 1))
                    cost = 0;
                selects += "\r\n#L" + (i+1) + "# #m" + maps[i] + "# (" + cost + " 楓幣)#l";
            }
        }
        cm.sendSimple("這是為通天塔的旅行者而設的魔法石。你只要支付費用，就能移動至任意的樓層。\r\n(如果持有#b#t4001019##k，可以用#b#t4001019##k代替楓幣使用。)\r\n#b" + selects);
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0 && mode == 0) {
            cm.sendNext("歡迎下次使用。");
        }
        status--;
    }
    if (status == 0) {
        if (select == -1)
            select = selection;
        if ((location == 1 && select == 3) || (location == 2 && select == 2))
            cost = 0;
        cm.sendYesNo("#b#m" + maps[select-1] + "要使用##k進行移動嗎？費用為#b" + cost + "楓幣#k。");
    } else if (status == 1) {
        if(!cm.haveItem(4001019) && cm.getMeso() < cost) {
            cm.sendNext("你的楓幣不足。很抱歉，如果不支付費用，就無法使用。");
            cm.dispose();
            return;
        }
        if(cm.haveItem(4001019))
            cm.gainItem(4001019, -1);
        else
            cm.gainMeso(-cost);
        cm.warp(maps[select-1],0);
        cm.dispose();
    } else {
        cm.dispose();
    }
}
