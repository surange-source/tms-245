/* 最強勳章樂豆點商店 勳章*/

var status = -1;
var itemList = Array(
Array(1142742, 6000000),
Array(1142788, 1000000),
Array(1142789, 1000000),
Array(1142790, 800000),
Array(1142717, 10000),
Array(1142249, 500000),
Array(1142520, 400000),
Array(1142374, 300000),
Array(1142573, 300000),
Array(1142561, 400000),
Array(1142562, 400000),
Array(1142711, 200000),
Array(1142567, 200000),
Array(1142593, 500000),
Array(1182136, 400000),
Array(1182158, 300000),
Array(1182061, 200000),
Array(1182006, 300000),
Array(1182011, 300000),
Array(1182016, 1000000),
Array(1182017, 1200000),
Array(1182067, 300000),
Array(1182069, 300000),
Array(1162023, 200000),
Array(1162016, 200000),
Array(1162006, 200000),
Array(1162007, 300000),
Array(1162011, 400000),
Array(1162029, 300000),
Array(1162030, 350000),
Array(1162033, 400000),
Array(1162025, 200000),
Array(1162032, 200000),
Array(1162018, 400000),
Array(1162035, 300000)
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
