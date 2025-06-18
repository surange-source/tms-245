status = -1;
var itemList = Array(
1212120,//神秘之影閃亮克魯 等級要求：200
1222113,//神秘之影靈魂射手 等級要求：200
1232113,//神秘之影魔劍 等級要求：200
1242121,//神秘之影能量劍 等級要求：200
1242122,//神秘之影能量劍 等級要求：200
1252098,//神秘之影魔法槌 等級要求：200
1262039,//神秘之影ESP限製器 等級要求：200
1302343,//神秘之影單手劍 等級要求：200
1312203,//神秘之影斧 等級要求：200
1322255,//神秘之影錘 等級要求：200
1332279,//神秘之影匕首 等級要求：200
1362140,//神秘之影手杖 等級要求：200
1372228,//神秘之影短杖 等級要求：200
1382265,//神秘之影長杖 等級要求：200
1402259,//神秘之影雙手劍 等級要求：200
1412181,//神秘之影雙手戰斧 等級要求：200
1422189,//神秘之影雙手錘 等級要求：200
1432218,//神秘之影長槍 等級要求：200
1442274,//神秘之影矛 等級要求：200
1452257,//神秘之影弓 等級要求：200
1462243,//神秘之影弩 等級要求：200
1472265,//神秘之影拳套 等級要求：200
1482221,//神秘之影指虎 等級要求：200
1492235,//神秘之影火槍 等級要求：200
1522143,//神秘之影雙弩槍 等級要求：200
1532150,//神秘之影攻城炮 等級要求：200
1542117,//神秘之影太刀 等級要求：200
1552119,// 神秘之影扇子  等級要求：200
1582023//神秘之影機甲槍 等級要求：200
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = "";
        for(var i=0; i<itemList.length; i++) {
            text+="#L"+i+"##v"+itemList[i]+"##z"+itemList[i]+"##l\r\n";
        }
        im.sendSimple("請選擇你要換取的神秘之影武器：\r\n#rPS：選擇出來的屬性會額外增加100的全屬性，注意，不能使用還原卷，否則額外的屬性會消失。.\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection];
        var itemnum = Math.floor(Math.random()*1+1);
        if (!im.canHold()) {
                    im.sendOk("獲取失敗，包裹空間不足！請確保所有的背包空格都有一格以上。");
                    im.dispose();
                    return;
                }
        var toDrop = im.getNewEquip(itemid); // 武器
                    toDrop.setStr(toDrop.getStr()+100); //裝備力量
                    toDrop.setDex(toDrop.getDex()+100); //裝備敏捷
                    toDrop.setInt(toDrop.getInt()+100); //裝備智力
                    toDrop.setLuk(toDrop.getLuk()+100); //裝備運氣
                    toDrop.setWatk(toDrop.getWatk()+100); //物理攻擊
                    toDrop.setMatk(toDrop.getMatk()+100); //魔法攻擊
                    im.addFromDrop(toDrop);  
        im.gainItem(2435413, -1);
        im.sendOk("恭喜您，獲得了1個#b#z"+itemid+"#，武器屬性額外增加100.");
        im.worldSpouseMessage(0x9, "『神秘之影武器箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別的["+im.getItemName(itemid)+"].");
        im.worldSpouseMessage(0x9, "『神秘之影武器箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別的["+im.getItemName(itemid)+"].");
        im.worldSpouseMessage(0x9, "『神秘之影武器箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別的["+im.getItemName(itemid)+"].");
        im.safeDispose();
    }
}