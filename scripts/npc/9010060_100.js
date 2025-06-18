

/*  
 
 NPC版權:                追憶楓之谷
 NPC類型:                 綜合NPC
 製作人：故事、
 */




var status = -1;
var itemList = Array(
        //現金道具類
        Array(2022893, 1, 1),
        Array(5062000, 1, 1),
        Array(5062002, 2, 1),
        Array(5064000, 5, 1),
        //椅子類
        Array(3010002, 5, 100), //綠色時尚轉椅
        Array(3010003, 5, 100), //紅色時尚轉椅
        Array(3010006, 5, 100), //黃色時尚轉椅
        Array(3010004, 5, 100), //黃藍休閒椅
        Array(3010005, 5, 100), //紅藍休閒椅
        Array(3010018, 5, 100), //椰子樹沙灘椅
        Array(3010029, 6, 100), //藍環凳
        Array(3010030, 6, 100), //黑環凳
        Array(3010031, 6, 100), //紅環凳
        Array(3010032, 6, 100), //黃環凳
        Array(3010033, 6, 100), //綠環凳
        Array(3010043, 8, 100), //魔女的飛掃把
        Array(3013002, 8, 100), //煙花祭
        Array(3010166, 10, 100), //影武同門
        Array(3010044, 10, 100), //同一紅傘下
        Array(3010045, 10, 100), //寒冰椅子
        Array(3010049, 15, 100), //雪房子
        Array(3010068, 15, 100), //露水椅子
        Array(3010050, 15, 100), //公主凳
        Array(3010069, 15, 100), //大黃風
        //玩具類
        Array(1422011, 20, 100),
        Array(1092035, 20, 100),
        Array(1372017, 20, 100),
        Array(1302087, 20, 100),
        Array(1302024, 20, 100),
        Array(1322027, 20, 100),
        Array(1402044, 20, 100),
        Array(1402029, 20, 100),





        
        Array(1142295, 30)

        );
var selectedItem = -1;
var selequantity = -1;
var selectedCos = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n#r注意事項#k：玩具和椅子都無法交易。~~\r\n已收集#v4032398##b#z4032398##k: " + cm.itemQuantity(4032398) + " 個";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selequantity = item[1];
            selectedCost = item[2];
            cm.sendYesNo("兌換 #i" + selectedItem + "# 需要 #r" + selequantity + "個 #v4032398##k 你確定兌換嗎?");
        } else {
            cm.sendOk("兌換出錯,請聯繫管理員...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selequantity <= 0 || selectedItem <= 0) {
            cm.sendOk("兌換出錯,請聯繫管理員...");
            cm.dispose();
            return;
        }
        if (cm.itemQuantity(4032398) >= selequantity) {
            if (cm.canHold(selectedItem, selequantity)) {
                cm.gainItem(4032398, -selequantity);
                cm.gainItemPeriod(selectedItem, 1, 20);
                cm.sendOk("兌換成功,商品#i" + selectedItem + ":# #b#t" + selectedItem + "##k已送往背包。");
            } else {
                cm.sendOk("背包所有欄目窗口有一格以上的空間才可以進行兌換。");
            }

        } else {
            cm.sendOk("你沒有足夠的#i4032398#。\r\n\r\n兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selequantity + "個 #i4032398##k。");
        }
        status = -1;
    }
}
