/* 玩具商店 */

var status = -1;
var itemList = Array(
Array(1702302, 1),
Array(1702302, 1),
Array(1702310, 1),
Array(1702336, 1),
Array(1702342, 1),
Array(1702349, 1),
Array(1702366, 1),
Array(1702403, 1),
Array(1702423, 1),
Array(1702456, 1),
Array(1702463, 1),
Array(1702464, 1),
Array(1702470, 1),
Array(1702471, 1),
Array(1702490, 1),
Array(1702521, 1),
Array(1702526, 1),
Array(1702538, 1),
Array(1702548, 1),
Array(1702554, 1),
Array(1702557, 1),
Array(1702561, 1),
Array(1702583, 1),
Array(1702581, 1),
Array(1702586, 1),
Array(1702590, 1),
Array(1702591, 1),
Array(1702598, 1),
Array(1702611, 1),
Array(1702619, 1),
Array(1702616, 1),
Array(1702625, 1),
Array(1702629, 1),
Array(1702630, 1),
Array(1702632, 1),
Array(1702636, 1),
Array(1702640, 1),
Array(1702662, 1),
Array(1702374, 1),
Array(1702436, 1),
Array(1702594, 1),
Array(1702108, 1),
Array(1092112, 1),
Array(1092063, 1)

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