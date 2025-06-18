/* 聊天戒指商店 */

var status = -1;
var itemList = Array(
Array(1112238, 50000),
Array(1112229, 50000),
Array(1112230, 50000),
Array(1112252, 50000),
Array(1115015, 30000),
Array(1115018, 30000),
Array(1112271, 30000),
Array(1112269, 30000),
Array(1112263, 30000),
Array(1112261, 30000),
Array(1112259, 30000),
Array(1112290, 30000),
Array(1112253, 30000),
Array(1112254, 30000),
Array(1112291, 30000),
Array(1112285, 30000),
Array(1112286, 30000),
Array(1112287, 30000),
Array(1112288, 30000),
Array(1112273, 30000),
Array(1112276, 30000),
Array(1112277, 30000),
Array(1112274, 30000),
Array(1112275, 30000),
Array(1115003, 25000),
Array(1115011, 25000),
Array(1115010, 25000),
Array(1115009, 25000),
Array(1115008, 25000),
Array(1115007, 25000),
Array(1112296, 25000)

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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k樂豆點#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 5;
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
                cm.gainNX( - selectedCost);
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