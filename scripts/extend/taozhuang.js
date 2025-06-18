/* 絕版樂豆點商店 鞋 */

var status = -1;
var itemList = Array(
Array(1004450, 8888),
Array(1050356, 8888),
Array(1051426, 8888),
Array(1073041, 8888),
Array(1102809, 8888),
Array(1702565, 8888),
Array(1004568, 8888),
Array(1050372, 8888),
Array(1051441, 8888),
Array(1073079, 8888),
Array(1102844, 8888),
Array(1702607, 8888),
Array(1004739, 8888),
Array(1050423, 8888),
Array(1051491, 8888),
Array(1070079, 8888),
Array(1071096, 8888),
Array(1102920, 8888),
Array(1702681, 8888),
Array(1004486, 8888), 
Array(1050364, 8888), 
Array(1051434, 8888), 
Array(1073056, 8888), 
Array(1102822, 8888), 
Array(1702586, 8888), 
Array(1004540, 8888), 
Array(1052948, 8888),
Array(1702594, 8888),
Array(1004337, 8888),
Array(1052853, 8888),
Array(1102767, 8888),
Array(1702342, 8888),
Array(1004659, 8888), 
Array(1052999, 8888),
Array(1073106, 8888),
Array(1102884, 8888),
Array(1003802, 8888), 
Array(1052594, 8888),
Array(1072791, 8888),
Array(1082511, 8888)
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