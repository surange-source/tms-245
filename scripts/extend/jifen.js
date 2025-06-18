//物品自己添加
var status = -1;
var itemList = Array(
Array(500, 50),
Array(6000, 500),
Array(13000, 1000),
Array(18000, 1500),
Array(22000, 2000)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望兌換的樂豆點數量：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "# 兌換 #r[" + itemList[i][0] + "]#k 樂豆點  需要：#r" + itemList[i][1] + "#k里程#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否購買  " + selectedItem + "樂豆點  需要 #r" + selectedCost + "#k 里程？");
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
            //var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "里程商店", 3, true);
            if (cm.gainNX(1,selectedItem)) {
                cm.gainPlayerPoints(-selectedCost);
                cm.sendOk("恭喜您成功購買#i" + selectedItem + " 樂豆點成功 。\r\n您還有"+cm.getPlayerPoints()+"里程");
            } else {
                cm.sendOk("購買失敗");
            }
        } else {
            cm.sendOk("您沒有那麼多里程。你的里程是:"+cm.getPlayerPoints()+"\r\n\r\n購買" + selectedItem + "樂豆點 需要 #r" + selectedCost + "#k 里程。");
        }
        cm.dispose();
    }
}