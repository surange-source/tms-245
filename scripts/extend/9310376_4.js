/* 絕版樂豆點商店 帽子*/

var status = -1;
var itemList = Array(
Array(1003588, 5000),
Array(1004633, 5000),
Array(1004482, 5000),
Array(1003855, 5000),
Array(1004438, 5000),
Array(1004690, 5000),
Array(1003171, 5000),
Array(1004279, 5000),
Array(1004026, 5000),
Array(1003790, 5000),
Array(1003279, 5000),
Array(1004167, 5000),
Array(1004282, 5000),
Array(1003952, 5000),
Array(1003131, 5000),
Array(1004094, 5000),
Array(1004112, 5000),
Array(1004211, 5000),
Array(1004193, 5000),
Array(1003859, 5000),
Array(1004137, 5000),
Array(1003831, 5000),
Array(1003955, 5000),
Array(1004095, 5000),
Array(1004029, 5000),
Array(1003204, 4000),
Array(1004110, 4000),
Array(1001083, 4000),
Array(1001095, 4500),
Array(1004200, 4500),
Array(1003892, 5000),
Array(1004124, 5000),
Array(1003953, 5000),
Array(1001097, 4000),
Array(1000074, 4000),
Array(1004200, 4000),
Array(1001076, 4000),
Array(1004204, 5000),
Array(1004205, 5000),
Array(1003950, 5000),
Array(1004126, 4000),
Array(1002846, 4000),
Array(1004158, 4000),
Array(1004114, 4000),
Array(1002598, 4000),
Array(1004157, 10000),
Array(1004156, 10000),
Array(1004025, 4000),
Array(1004093, 4000),
Array(1002845, 1000), //粉紅兔耳帽
Array(1002721, 1000), //狸毛護耳
Array(1002568, 1000), //手工編織髮夾
Array(1002888, 1000), //絲帶髮箍(紅色)
Array(1002890, 1000), //絲帶髮箍(藍色)
Array(1002863, 2000), //小熊熊可愛帽
Array(1003207, 2000), //胡蘿蔔兔爆炸頭
Array(1003051, 2000), //小狐狸
Array(1003048, 2000), //聖誕裝飾帽
Array(1002995, 1000), //皇家海軍帽
Array(1003012, 2000), //嫦娥髮式
Array(1002876, 2000), //聖誕紅髮夾
Array(1002839, 2000), //南瓜棒球帽
Array(1001048, 3000), //鬼娃娃帽
Array(1003214, 1400),
Array(1003141, 1400),
Array(1003269, 1400),
Array(1003268, 1400),
Array(1003492, 1400),
Array(1003493, 1400),
Array(1003494, 1400),
Array(1003495, 1400),
Array(1003496, 1400),
Array(1003519, 1400),
Array(1003520, 1400),
Array(1002726, 1400),
Array(1002524, 1400),
Array(1002714, 1400),
Array(1002841, 1400),
Array(1003220, 1400),
Array(1003170, 1400),
Array(1003226, 1400),
Array(1000050, 1400),
Array(1003232, 1400),
Array(1001064, 1400),
Array(1001075, 1400),
Array(1003252, 1400),
Array(1003249, 1400),
Array(1001036, 1400),
Array(1002998, 1400),
Array(1003091, 1400),
Array(1003114, 1400),
Array(1003075, 1400),
Array(1000043, 1400),
Array(1003149, 1400),
Array(1002988, 1400),
Array(1003505, 1500),
Array(1003504, 1500),
Array(1003965, 1500),
Array(1003964, 1500),
Array(1003920, 1500),
Array(1003921, 1500),
Array(1003918, 1500),
Array(1003861, 1500),
Array(1003865, 1500),
Array(1003919, 1500),
Array(1002566, 1500),
Array(1003581, 1500),
Array(1003417, 1400),
Array(1003271, 1400),
Array(1003196, 1400),
Array(1003193, 1400),
Array(1003194, 1400)
//
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