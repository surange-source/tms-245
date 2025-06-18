/*
 *活力兌換-兌換圖騰戒指勳章
 */

var status = -1;
var itemList = Array(
Array(1112735, 1500), 
Array(1112915, 500), 
Array(1202050, 800), 
Array(1202062, 800), 
Array(1202058, 800), 
Array(1202054, 800), 
Array(1112427, 480), 
Array(1112428, 480), 
Array(1112429, 480), 
Array(1142546, 480), 
Array(1142362, 480), 
Array(1142369, 480), 
Array(1142540, 480), 
Array(1142536, 480), 
Array(1142393, 480), 
Array(1142409, 480), 
Array(1142541, 480), 
Array(1142530, 480)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎使用活力值兌換飾品.\r\n\r\n#k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#里程：#r"+cm.getPlayerPoints()+"#k 點  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#活力值：#r"+cm.getPlayerEnergy()+"#k 點 \r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#在線時間：#r"+cm.getGamePoints()+"#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":#  #b#t" + itemList[i][0] + "##l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎使用活力值兌換飾品.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#使用#r" + selectedCost + "#k活力值\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##r\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#註：活力值通過[日常]組隊任務快速獲得.");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedItem <= 0 || selectedCost <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getPlayerEnergy() >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "活力值兌換飾品", 3);
            if (gachaponItem != -1) {
                cm.gainPlayerEnergy(-selectedCost);
                cm.sendOk("恭喜您成功兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎使用活力值兌換飾品.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#不足#r" + selectedCost + "#k活力值\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#無法兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##r\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#註：活力值通過[日常]組隊任務快速獲得.");
        }
        cm.dispose();
    }
}