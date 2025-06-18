/* 絕版樂豆點商店 武器 */

var status = -1;
var itemList = Array(
Array(1702346, 5000),
Array(1702608, 5000),
Array(1702607, 5000),
Array(1702577, 5000),
Array(1702593, 5000),
Array(1702594, 5000),
Array(1702595, 5000),
Array(1702611, 5000),
Array(1702588, 5000),
Array(1702589, 5000),
Array(1702623, 5000),
Array(1702625, 5000),
Array(1702626, 5000),
Array(1702617, 5000),
Array(1702624, 5000),
Array(1702628, 5000),
Array(1702630, 5000),
Array(1702633, 5000),
Array(1702635, 5000),
Array(1702560, 5000),
Array(1702567, 5000),
Array(1702566, 5000),
Array(1702507, 5000),
Array(1702489, 5000),
Array(1702486, 5000),
Array(1702488, 5000),
Array(1702557, 5000),
Array(1702534, 5000),
Array(1702533, 5000),
Array(1702505, 5000),
Array(1702503, 5000),
Array(1702528, 5000),
Array(1702501, 5000),
Array(1702305, 5000),
Array(1702478, 5000),
Array(1702530, 5000),
Array(1702382, 5000),
Array(1702466, 4000),
Array(1702334, 4000),
Array(1702480, 4000),
Array(1702485, 4500),
Array(1702509, 4000),
Array(1702013, 5000),
Array(1702374, 4000),
Array(1702512, 4000),
Array(1702459, 4000),
Array(1702508, 4000),
Array(1702233, 4000),
Array(1702228, 1000), //可可香蕉
Array(1702155, 3000), //絢麗彩虹
Array(1702182, 2000), //洛麗波板糖
Array(1702208, 1000), //搞怪鱷魚
Array(1702285, 2000), //藍色蝴蝶結手提包
Array(1702302, 1000), //杯具
Array(1702261, 3000), //櫻花棒
Array(1702091, 2000), //網球拍
Array(1702168, 2000), //閃亮聖誕樹
Array(1702367, 1400),
Array(1702341, 1400),
Array(1322102, 1400),
Array(1702366, 1400),
Array(1702352, 1400),
Array(1302037, 1400),
Array(1302061, 1400),
Array(1302063, 1400),
Array(1302080, 1400),
Array(1302084, 1400),
Array(1302085, 1400),
Array(1302087, 1400),
Array(1302169, 1400),
Array(1322051, 1400),
Array(1332032, 1400),
Array(1332053, 1400),
Array(1372017, 1400),
Array(1372031, 1400),
Array(1402037, 1400),
Array(1402049, 1400),
Array(1402063, 1400),
Array(1422011, 1400),
Array(1432039, 1400),
Array(1432046, 1400),
Array(1442026, 1400),
Array(1442065, 1400),
Array(1442088, 1400),
Array(1472063, 1400),
Array(1702342, 1400),
Array(1702337, 1400),
Array(1702335, 1400),
Array(1702330, 1400),
Array(1702346, 1400),
Array(1702341, 1400),
Array(1702340, 1400),
Array(1702324, 1400),
Array(1322102, 1400),
Array(1412056, 1400),
Array(1402110, 1400),
Array(1702310, 1400),
Array(1702329, 1400),
Array(1702316, 1400),
Array(1702309, 1400),
Array(1702408, 1500),
Array(1702415, 1500),
Array(1702403, 1500),
Array(1702402, 1500),
Array(1702375, 1500),
Array(1702348, 1500),
Array(1702442, 1500),
Array(1702422, 1500),
Array(1702446, 1500),
Array(1702422, 1500)
);
var selectedItem = -1;
var selectedCost = -1;

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k樂豆點#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 樂豆點？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "樂豆點商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost );
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有那麼多樂豆點。\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 樂豆點。");
        }
        cm.dispose();
    }
}