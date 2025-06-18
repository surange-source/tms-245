/* 絕版樂豆點商店  戒子*/

var status = -1;
var itemList = Array(
Array(1112959, 10000),
Array(1115018, 10000), 
Array(1115105, 10000),
Array(1115010, 10000), 
Array(1112197, 10000),
Array(1112198, 8000),
Array(1115011, 8000),
Array(1115009, 10000), 
Array(1112196, 10000),
Array(1115007, 8000),
Array(1112194, 8000), 
Array(1115008, 10000),
Array(1112195, 10000),
Array(1115006, 8000),
Array(1112193, 8000), 
Array(1115005, 10000), 
Array(1112192, 10000),
Array(1115004, 8000),
Array(1112191, 8000), 
Array(1112915, 2016), 
Array(1112932, 2016),
Array(1112161, 10000),
Array(1112273, 10000),
Array(1112152, 10000),
Array(1112264, 10000),
Array(1112272, 10000),
Array(1112920, 8000),
Array(1112160, 8000), 
Array(1112170, 10000), 
Array(1112282, 10000),
Array(1112166, 8000),
Array(1112278, 8000), 
Array(1112176, 8000),
Array(1112288, 8000), 
Array(1112162, 5000),
Array(1112274, 5000),
Array(1112159, 5000),
Array(1112271, 5000),
Array(1112148, 5000),
Array(1112259, 5000),
Array(1112158, 5000),
Array(1112270, 5000),
Array(1112157, 5000),
Array(1112269, 5000),
Array(1112155, 5000),
Array(1112267, 5000),
Array(1112268, 2000),
Array(1112156, 2000),
Array(1112266, 5000),
Array(1112154, 5000),
Array(1112149, 5000),
Array(1112261, 5000),
Array(1112177, 5000),
Array(1112289, 5000),
Array(1112181, 3000),
Array(1112294, 3000),
Array(1112178, 3000),
Array(1112290, 3000),
Array(1112150, 3000),
Array(1112262, 3000),
Array(1112263, 3000),
Array(1113021, 5000),
Array(1112151, 3000),
Array(1112155, 3000),
Array(1112267, 3000),
Array(1112236, 5000),
Array(1112126, 5000),
Array(1112943, 4000),
Array(1112940, 4000),
Array(1112937, 4000),
Array(1112901, 4000),
Array(1112925, 4000),
Array(1112928, 4000),
Array(1112906, 4000),
Array(1112904, 3000), //彩虹星環繞戒指
Array(1112238, 3000), //水墨花聊天戒指
Array(1112135, 3000), //水墨花名片戒指
Array(1112916, 5000), //寂寞單身戒指
Array(1112118, 1000), //可樂名片戒指
Array(1112119, 1000), //可樂(Red) 名片戒指
Array(1112120, 1000), //可樂(White) 名片戒指
Array(1112228, 1000), //可樂聊天戒指
Array(1112229, 1000), //可樂(Red)聊天戒指
Array(1112230, 1000),  //可樂(White)聊天戒指
Array(1112103, 5000),
Array(1112141, 5000),
Array(1112252, 5000),
Array(1112253, 1000),
Array(1112142, 1000),
Array(1112930, 1000),
Array(1112136, 1000),
Array(1112920, 1400),
Array(1112145, 1500),
Array(1112257, 1500),
Array(1112146, 1500),
Array(1112258, 1500),
Array(1112254, 5000),
Array(1112143, 5000),
Array(1112928, 1500),
Array(1112907, 1500),
Array(1112937, 1500),
Array(1112101, 1000),
Array(1112204, 1400)
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