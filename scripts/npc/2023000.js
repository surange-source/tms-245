var status = 0;
var togos = [[220050300, 300000100], [220000000, 211000000], [211040200, 300000100, 211060000], [211000000], [220000000], [240030000]];
var togosName = [["時間通道", "艾琳森林"], ["玩具城", "冰峰雪域"], ["冰雪峽谷Ⅱ", "艾琳森林", "獅子王之城"], ["冰峰雪域"], ["玩具城"], ["龍林入口"]];
var maps = [220000000, 300000100, 211000000, 211060000, 220050300, 240000000];
var cost = [25000, 55000, 45000, 45000, 35000, 55000];
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
        var selects = "";
        for (var i=0; i < togos[location].length; i++) {
            selects += togosName[location][i];
            if (i != togos[location].length -1)
                selects += "、";
        }
        cm.sendNext("你好！我是隨時可以去神秘島大陸危險地區的危險地區快速出租車！現在運營線路為從#m" + cm.getMapId() + "#到#b" + selects + "#k之間！價格是 #b" + cost[location] + "楓幣#k儘管有點貴，但你一定不會後悔的！");
    }
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    status++;

    if (status == 1) {
        var selects = "";
        for (var i=0; i < togos[location].length; i++) {
            selects += "\r\n#L" + i + "#" + togosName[location][i] + "#l";
        }
        cm.sendSimple("#b" + cost[location] + "#k楓幣支付後，想移動到什麼地區呢？#b" + selects);
    } else if (status == 2) {
        if (cm.getMeso() < cost[location]) {
            cm.sendNext("你的楓幣好像不夠。非常抱歉，不支付楓幣的話，是不能使用出租車的。繼續努力打獵，獲取楓幣後再來吧。");
        } else {
            cm.warp(togos[location][selection]);
            cm.gainMeso(-cost[location]);
        }
        cm.dispose();
    }
    
}
