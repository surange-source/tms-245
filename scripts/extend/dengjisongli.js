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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n#b#L0#" + eff + "領取10-89級等級獎勵#l\r\n#L1#" + eff + "領取90-149級等級獎勵#l\r\n#L2#" + eff + "領取150-199級等級獎勵#l\r\n#L3#" + eff + "領取200-249級等級獎勵#l\r\n#L4#" + eff + "領取250級等級獎勵#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
if(cm.getPQLog("10級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 9 && cm.getPlayer().getLevel() < 90) && (cm.getSpace(5)>1 && cm.getSpace(1)>9)){
cm.gainItem(1012057,1,10);//透明面具
cm.gainItem(1002186,1,10);//透明頭盔
cm.gainItem(1102039,1,10);//
cm.gainItem(1082102,1,10);//
cm.gainItem(1092064,1,10);//
cm.gainItem(1072153,1,10);//
cm.gainItem(1702224,1,10);//
cm.gainItem(1022048,1,10);//
cm.gainItem(1032024,1,10);
cm.gainMeso(+200000);
cm.gainItem(5072000,10);
//cm.setPQLog("10級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取10-89等級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(裝備欄9個空位以上,特殊欄1個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 1:
if(cm.getPQLog("50級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 89 && cm.getPlayer().getLevel() < 150) && cm.getSpace(5)>2){
cm.gainMeso(+1000000);
cm.gainItem(5074000,5);
cm.gainItem(5040005,10);
//cm.setPQLog("50級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取90-149等級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 2:
if(cm.getPQLog("100級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 149 && cm.getPlayer().getLevel() < 200) && cm.getSpace(5)>1){
cm.gainItem(5062000,5,7);
cm.gainItem(5074000,5);
//cm.setPQLog("100級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取150-199等級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄2個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 3:
if(cm.getPQLog("150級獎勵",1) < 1 && (cm.getPlayer().getLevel() > 199 && cm.getPlayer().getLevel() < 250) && (cm.getSpace(5)>2 && cm.getSpace(3)>1)){
cm.gainItem(5062000,10,7);
cm.gainItem(5064000,5,7);
cm.gainItem(3010155,1);
cm.gainItem(5390002,5);
//cm.setPQLog("150級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取200-249等級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上,裝飾欄1個空位以上).\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        case 4:
if(cm.getPQLog("200級獎勵",1) < 1 && cm.getPlayer().getLevel() == 250 && cm.getSpace(5)>2){
cm.gainItem(5062002,15,7);
cm.gainItem(5064000,5,7);
cm.gainItem(5390002,10);
//cm.setPQLog("200級獎勵",1);
cm.sendOk("你成功領取獎勵");
cm.worldMessage(cm.getChar().getName() + "玩家成功領取250等級獎勵.");
cm.dispose();
} else {
cm.sendOk("你的等級不滿足條件，或沒有足夠的背包空間\r\n#b(特殊欄3個空位以上).#b\r\n注:等級獎勵只能領取一次.");
cm.dispose();
}
            break;
        }
    }
}