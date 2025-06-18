/* 絕版楓點商店 臉飾*/

var status = -1;
var itemList = Array(
Array(1662041, 200000),//萬聖節機器人
Array(1662039, 200000),//殺人鯨機器人
Array(1662036, 200000),//神之子貝塔機器人
Array(1662027, 200000),//銀河劍士
Array(1662032, 200000),//女妖機器人
Array(1662035, 100000),//神之子阿爾法機器人
Array(1662033, 300000),//未來機器人(男)
Array(1662034, 300000),//未來機器人(女)
Array(1672039, 100000)//未來機器人心臟 : 最高級

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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k楓點#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 楓點？");
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
        if (cm.getPlayer().getCSPoints(2) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "楓點商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX(2, - selectedCost );
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有那麼多楓點。\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 楓點。");
        }
        cm.dispose();
    }
}