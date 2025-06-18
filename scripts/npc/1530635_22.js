/* 由WSY工作室小妤製作修改 QQ2861655840*/
/* 霸氣椅子專賣店Array(, 11),*/

var status = -1;
var itemList = Array(
Array(3015854, 5000),
Array(3015853, 15000),
Array(3015852, 15000),
Array(3015851, 15000),
Array(3015843, 15000),
Array(3015840, 15000),
Array(3016204, 18000),
Array(3015818, 18000),
Array(3015817, 18000),
Array(3015816, 18000),
Array(3015815, 18000),
Array(3015814, 20000),
Array(3015830, 20000),
Array(3015811, 20000),
Array(3015800, 200001),
Array(3015799, 20000),
Array(3014025, 20000),
Array(3015809, 20000),
Array(3015808, 20000),
Array(3015797, 20000),
Array(3015795, 20000),
Array(3015713, 20000),
Array(3015759, 20000),
Array(3016104, 20000),
Array(3016000, 20000),
Array(3015783, 20000),
Array(3015782, 20000),
Array(3015781, 20000),
Array(3015779, 20000),
Array(3015778, 20000),
Array(3015766, 20000),
Array(3015760, 1),
Array(3015740, 1),
Array(3015720, 1),
Array(3015719, 1),
Array(3015718, 1),
Array(3015717, 1),
Array(3015716, 1)
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