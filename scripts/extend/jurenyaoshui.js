/* 楓點商店 */

var status = -1;
var itemList = Array(

Array(2213019, 5000),
    Array(2003516, 5000),
    Array(2003517, 5000),
    Array(2003518, 5000),
    Array(2210130, 5000),
    Array(2210139, 5000),
    Array(2210138, 5000),
    Array(2210134, 5000),
    Array(2210097, 5000),
    Array(2210096, 5000),
    Array(2210121, 5000),
    Array(2210108, 5000)
    //Array(1402197, 5000),
    //Array(1412136, 5000),
    //Array(1422141, 5000),
    //Array(1432168, 5000),
    //Array(1442224, 5000),
    //Array(1452206, 5000),
    //Array(1462194, 5000),
    //Array(1472215, 5000),
    //Array(1482169, 5000),
    //Array(1492180, 5000),
    //Array(1522095, 5000),
    //Array(1532099, 5000)

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
        var selStr = "楓點餘額：#r"+cm.getPlayer().getCSPoints(2)+" #k點，#r有喜歡的找管理員增加~祝你購買愉快#k";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k楓點#l";
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