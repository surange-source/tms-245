//物品自己添加
var status = -1;
var itemList = Array(
Array(1122122, 35555),
Array(1122123, 35555),
Array(1122124, 35555),
Array(1122125, 35555),
Array(1122126, 35555),
Array(1072743, 39999),
Array(1072744, 39999),
Array(1072745, 39999),
Array(1072746, 39999),
Array(1072747, 39999),
Array(1102481, 39999),
Array(1102482, 39999),
Array(1102483, 39999),
Array(1102484, 39999),
Array(1102485, 39999),
Array(1132174, 39999),
Array(1132175, 39999),
Array(1132176, 39999),
Array(1132177, 39999),
Array(1132178, 39999),
Array(1082543, 39999),
Array(1082544, 39999),
Array(1082545, 39999),
Array(1082546, 39999),
Array(1082547, 39999),
Array(3010029, 864),
Array(3010030, 864),
Array(3010031, 864),
Array(3010032, 864),
Array(3010033, 864),
Array(3010049, 864),
Array(3010054, 864),
Array(3010071, 864),
Array(3010099, 864),
Array(3010098, 864),
Array(3010356, 864),
Array(3010357, 864),
Array(3010361, 864),
Array(3010373, 864),
Array(3010375, 864),
Array(3010522, 864),
Array(3010587, 864),
Array(3010523, 14400),
Array(3010416, 14400),
Array(3010718, 14400),
Array(3010658, 14400),
Array(3010621, 14400),
Array(3010631, 14400),
Array(3010609, 14400),
Array(3010591, 14400),
Array(3010592, 14400),
Array(3010417, 14400),
Array(3010070, 14400),
Array(3010779, 14400),
Array(3010788, 14400)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望兌換的裝備：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k里程#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 里程？");
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
        if (cm.getPlayerPoints() >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "里程商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainPlayerPoints(-selectedCost);
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k。您還有\r\n您還有"+cm.getPlayerPoints()+"里程");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有那麼多里程。你的里程是:"+cm.getPlayerPoints()+"\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 里程。");
        }
        cm.dispose();
    }
}