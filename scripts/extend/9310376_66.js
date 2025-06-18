/* 絕版樂豆點商店新加專賣Array(, 13000),*/

var status = -1;
var itemList = Array(
Array(1004716, 8000), 
Array(1102915, 8000), 
Array(1050422, 8000), 
Array(1051490, 8000),  
Array(1070078, 8000),  
Array(1071095, 8000),      
Array(1702676, 8000), 
Array(1004488, 8000),      
Array(1051497, 8000), 
Array(1050429, 8000), 
Array(1004724, 8000), 
Array(1004689, 8000), 
Array(1050414, 8000), 
Array(1051483, 8000), 
Array(1004776, 8000), 
Array(1053049, 8000),  
Array(1050389, 8000),  
Array(1051459, 8000), 
Array(1051495, 8000), 
Array(1050427, 8000), 
Array(1053096, 8000), 
Array(1053146, 8000), 
Array(1051453, 8000), 
Array(1053126, 8000), 
Array(1053127, 8000),  
Array(1053102, 8000),  
Array(1053099, 8000),      
Array(1053082, 8000),  
Array(1053035, 8000),  
Array(1052940, 8000),  
Array(1052923, 8000),  
Array(1702733, 8000),  
Array(1702688, 8000),  
Array(1702620, 8000),  
Array(1702621, 8000),  
Array(1702347, 8000)
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