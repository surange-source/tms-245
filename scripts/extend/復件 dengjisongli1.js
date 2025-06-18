var status = 0;
var eff ="#fUI/UIWindow/Quest/icon6/7#";

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n#b#L0#" + eff + "領取50級等級獎勵#l\r\n#L1#" + eff + "領取100級等級獎勵#l\r\n#L2#" + eff + "領取120級等級獎勵#l\r\n#L3#" + eff + "領取140級等級獎勵#l\r\n#L4#" + eff + "領取160級等級獎勵#l\r\n#L5#" + eff + "領取180級等級獎勵#l\r\n#L6#" + eff + "領取200級等級獎勵#l\r\n#L7#" + eff + "領取250級等級獎勵#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
if(cm.getPQLog("50級獎勵10",0) < 1 && (cm.getPlayer().getLevel() > 49 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>2)){
cm.gainItem(4032521,1);//
cm.gainItem(4001714,1);//
//cm.gainItem(1102039,1,10);//
//cm.gainItem(1082102,1,10);//
//cm.gainItem(1092064,1,10);//
//cm.gainItem(1072153,1,10);//
//cm.gainItem(1702224,1,10);//
//cm.gainItem(1022048,1,10);//
//cm.gainItem(1032024,1,10);
//cm.gainMeso(+200000);
//cm.gainItem(5072000,10);
cm.setPQLog("50級獎勵10",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取50級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(裝備欄2個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 1:
if(cm.getPQLog("100級獎勵0",1) < 0 && (cm.getPlayer().getLevel() > 99 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>4)){
    cm.gainItem(2615002, 1); //低級培羅德卷軸
    cm.gainItem(2431098, 1); //低級培羅德隨機
    cm.gainItem(2431097, 1); //傷害皮膚箱子
    cm.gainItem(5062000, 2); //神奇方塊
//cm.setPQLog("50級獎勵0",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取100級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 2:
if(cm.getPQLog("120級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 119 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>4)){
    cm.gainItem(5150040, 3); //皇家理發卷
    cm.gainItem(5152053, 3); //皇家整容卷
    cm.gainItem(2431741, 1); //楓點3000
    cm.gainItem(5062000, 5); //神奇方塊
cm.setPQLog("120級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取120級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄2個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 3:
if(cm.getPQLog("140級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 139 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>11)){
    cm.gainItem(2431944, 1); //140級武器箱子
    cm.gainItem(2430226, 1); //亂鬥翅膀
    cm.gainItem(5062000, 5);
    cm.gainItem(2049124, 10); //正向
    cm.gainItem(2049135, 2); //驚人正義20%2340000
    cm.gainItem(2431741, 1); //楓點3000
    cm.gainItem(4310030, 200); //運動會幣
    cm.gainItem(4000082, 30); //殭屍金牙
    cm.gainItem(4021012, 3); //強烈靈魂的淨水
    cm.gainItem(4021011, 3); //春節靈魂的火花
    cm.gainItem(4021010, 3); //時間之石
cm.setPQLog("140級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取140級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上,裝飾欄1個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 4:
if(cm.getPQLog("160級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 159 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>14)){
    cm.gainItem(2431741, 1); //楓點3000
    cm.gainItem(4310129, 10); //冬季限量硬幣
    cm.gainItem(5062002, 5); //高級方塊
    cm.gainItem(5064000, 5); //防爆
    cm.gainItem(2049116, 10); //強化
    cm.gainItem(2049135, 2); //驚人正義20%2340000
    cm.gainItem(4002000, 1); //蝸牛郵票，兌換樂豆點使用
    cm.gainItem(4033356, 5); //正義火種1
    cm.gainItem(4000124, 5); //戰甲泡泡魚內存卡
    cm.gainItem(4310030, 200); //運動會幣
    cm.gainItem(4000082, 30); //殭屍金牙
    cm.gainItem(4021012, 3); //強烈靈魂的淨水
    cm.gainItem(4021011, 3); //春節靈魂的火花
    cm.gainItem(4021010, 3); //時間之石
cm.setPQLog("160級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取160級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).#b\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 5:
if(cm.getPQLog("180級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 179 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>12)){
    cm.gainItem(2431945, 1); //140防具箱子
    cm.gainItem(2431741, 1); //楓點3000
    cm.gainItem(4310129, 10); //冬季限量硬幣
    cm.gainItem(4000517, 1); //黃金魚，提升15%
    cm.gainItem(4033924, 2); //神話耳環藍圖
    cm.gainItem(4033356, 5); //正義火種1
    cm.gainItem(4000124, 5); //戰甲泡泡魚內存卡
    cm.gainItem(4310030, 300); //運動會幣
    cm.gainItem(4000082, 40); //殭屍金牙
    cm.gainItem(4021012, 3); //強烈靈魂的淨水
    cm.gainItem(4021011, 3); //春節靈魂的火花
    cm.gainItem(4021010, 3); //時間之石
cm.setPQLog("180級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取180級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).#b\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 6:
if(cm.getPQLog("200級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 199 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>1 && cm.getSpace(1)>14)){
    cm.gainItem(2431741, 1); //楓點3000
    cm.gainItem(4310129, 10); //冬季限量硬幣
    cm.gainItem(5062002, 5); //高級方塊
    cm.gainItem(5064000, 5); //防爆
    cm.gainItem(2049116, 10); //強化
    cm.gainItem(2049135, 2); //驚人正義20%2340000
    cm.gainItem(4002000, 1); //蝸牛郵票，兌換樂豆點使用
    cm.gainItem(4033356, 5); //正義火種1
    cm.gainItem(4000124, 5); //戰甲泡泡魚內存卡
    cm.gainItem(4310030, 200); //運動會幣
    cm.gainItem(4000082, 30); //殭屍金牙
    cm.gainItem(4021012, 3); //強烈靈魂的淨水
    cm.gainItem(4021011, 3); //春節靈魂的火花
    cm.gainItem(4021010, 3); //時間之石
cm.setPQLog("200級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取200級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).#b\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 7:
if(cm.getPQLog("250級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 249 && cm.getPlayer().getLevel() < 251) && (cm.getSpace(5)>1 && cm.getSpace(1)>14)){
    cm.gainItem(5062000, 10);
    cm.gainItem(5062002, 10);
    cm.gainItem(5062500, 10);
    cm.gainItem(5064000, 10);
    cm.gainItem(2431995, 1); //驚人卷軸箱子
    cm.gainItem(2431725, 1); //熱力四射蠟筆箱子
    cm.gainItem(4310036, 3000); //征服者
    cm.gainItem(4033356, 10); //正義火種1
    cm.gainItem(4000124, 10); //戰甲泡泡魚內存卡
    cm.gainItem(4000082, 50); //殭屍金牙
    cm.gainItem(4021012, 3); //強烈靈魂的淨水
    cm.gainItem(4021011, 3); //春節靈魂的火花
    cm.gainItem(4021010, 3); //時間之石
    cm.gainItem(4310015, 2) //鬥神證物
cm.setPQLog("250級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取250級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).#b\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        }
    }
}