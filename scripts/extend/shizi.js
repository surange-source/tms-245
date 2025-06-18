var status = 0;
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
        var selStr = "#d|----------------------副本中心----------------------|#k\r\n";
        selStr += "#L0#" + eff1 + "鬧鐘#l";
        selStr += "  #L1#" + eff1 + "殘暴炎魔#l";
        selStr += "  #L2#" + eff1 + "獅子王#l";    
        selStr += "#L3#" + eff1 + "#r大運動會#k#l\r\n\r\n";
        selStr += "#L4#" + eff1 + "阿卡伊#l";
        selStr += "#L5#" + eff1 + "奧芙赫班#l";
        selStr += "#L6#" + eff1 + "都納斯#l";
        selStr += "#L7#" + eff1 + "進PK地圖#l\r\n\r\n";
        selStr += "#L8#" + eff1 + "#b暗龍王#k#l";
        selStr += "#L9#" + eff1 + "#b皮卡啾#k#l";
        selStr += "#L10#" + eff1 + "#b西格諾斯#k#l";
        selStr += "#L11#" + eff1 + "#b四大副本#k#l\r\n\r\n";
        selStr += "#L12#" + eff1 + "#d[稀有]惡靈影子        【#v2430051#稀有道具,等您拿】#k#l\r\n";
        selStr += "#L13#" + eff1 + "#d[稀有]最高訪問者    【#v1003893##v1032191##v1122256#】#k#l\r\n";
        selStr += "#L14#" + eff1 + "#r[稀有]培羅德        【#v1052318##v1452111##v1232057#】#k#l\r\n";
        selStr += "#L15#" + eff1 + "#r[稀有]梅格耐斯        【#v1232057##v1052318##v1222058#】#k#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.warp(220080000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 1:
            cm.warp(211042200);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 2:
            cm.warp(211070000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 3:
            cm.warp(744000000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 4:
            cm.warp(272030000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9120050);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9120050);
            break;
        case 7:
            cm.warp(910000018);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 8:
            cm.warp(240040700);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 9:
            cm.warp(270050000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 10:
            cm.warp(271040000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 11:
            cm.warp(105200000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 12:
            cm.warp(328090920);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 13:
            cm.dispose();
            cm.openNpc(9220059);
            break;
        case 14:
            cm.warp(863000100);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        case 15:
            cm.warp(401072000);    
            cm.sendOk("已經為您傳送到當前地圖");
            cm.dispose();
            break;
        }
    }
}