/*伏特專櫃*/
var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
        var selStr = "我這裡是有一些簡單的物品出售喲\r\n";
        selStr += "#L0#" + eff + "#r雜貨店(藥/花生/Boss物品/放大鏡/潛能卷/靈魂盾)#l\r\n";
        selStr += "#L1#" + eff + "#b精靈裝備店#l";
        selStr += "#L2#" + eff + "影武裝備店#l";
        selStr += "#L3#" + eff + "重砲裝備店#l\r\n";
        selStr += "#L4#" + eff + "凱撒裝備店#l";
        selStr += "#L5#" + eff + "天使裝備店#l";
        selStr += "#L6#" + eff + "傑諾裝備店#l\r\n";
        selStr += "#L7#" + eff + "夜光裝備店#l";
        selStr += "#L8#" + eff + "低級副手店#l";
        selStr += "#L10#" + eff + "其他商店#l\r\n";
        selStr += "#L9#" + eff + "#g冒險家低級裝備#l";
        selStr += "#L11#" + eff + "#g各職業裝備(70-110)(包括-幻影武器)#l\r\n";

        cm.sendSimpleS(selStr, 2);
    } else if (status == 1) {
        switch (selection) {
        case 10:
            cm.dispose();
            cm.openNpc(1012123,"qitashangdian");
            break;
        case 0:
            cm.dispose();
            cm.openShop(1012123);
            break;
        case 1:
            cm.dispose();
            cm.openShop(1033001);
            break;
        case 2:
            cm.dispose();
            cm.openShop(1012125);
            break;
        case 3:
            cm.dispose();
            cm.openShop(1012124);
            break;
        case 4:
            cm.dispose();
            cm.openShop(1051001);
            break;
        case 5:
            cm.dispose();
            cm.openShop(1012132);
            break;
        case 6:
            cm.dispose();
            cm.openShop(1011101);
            break;
        case 7:
            cm.dispose();
            cm.openShop(1011101);
            break;
        case 8:
            cm.dispose();
            cm.openShop(1011101);
            break;        
        case 9:
            cm.dispose();
            cm.openShop(1051000);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(1013102,"youxishangdian1");
            break;
        case 8:
            cm.dispose();
            //cm.openShop(1011101);
            cm.openShop(9310072);
            break;
        }
    }
}
