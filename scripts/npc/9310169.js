/* 全職業副手商店 */

var status = -1;
var itemList = Array(
status = -1;
var itemList = Array(
Array(1099011, 1),
    Array(1099012, 1),
    Array(1353105, 1),
    Array(1342095, 1),
    Array(1352009, 1),
    Array(1352206, 1),
    Array(1352216, 1),
    Array(1352226, 1),
    Array(1352276, 1),
    Array(1352286, 1),
    Array(1352296, 1),
    Array(1352406, 1),
    Array(1352506, 1),
    Array(1352707, 1),
    Array(1352815, 1),
    Array(1352906, 1),
    Array(1352916, 1),
    Array(1352935, 1),
    Array(1352945, 1),
    Array(1352957, 1),
    Array(1352967, 1),
    Array(1352975, 1),
    Array(1353005, 50000),
    Array(1352928, 1),
    Array(1352236, 1),
    Array(1352246, 1),
    Array(1352256, 1),
    Array(1352266, 1),
    Array(1352109, 1),
    Array(1352606, 1)
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = "";
        for(var i=0; i<itemList.length; i++) {
            text+="#L"+i+"##v"+itemList[i][0]+"##z"+itemList[i][0]+"##l\r\n";
        }
        im.sendSimple("請選擇你要換取的極品副手：\r\n#r"+text);
    } else if(status == 1) {
        var itemid = itemList[selection][0];
        var itemnum = Math.floor(Math.random()*1+1);
        var item = im.gainGachaponItem(itemid, itemnum, "150級防具箱子", 3);
        im.gainItem(2430893, -1);
        im.sendOk("恭喜您，獲得了"+itemnum+"個#b#z"+itemid+"#");
        im.safeDispose();
    }
}
//
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
                cm.worldMessage(0x20, "『副手商店』" + " : " + "玩家 " + cm.getChar().getName() + " 成功購買了道具");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有那麼多樂豆點。\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 樂豆點。");
        }
        cm.dispose();
    }
}