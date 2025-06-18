/* 樂豆點商店 - 洗能力
Array(2702001,1,2000),
Array(2702001,10,20000),
 */

var status = -1;
var itemList = Array(
Array(1099011, 1, 800000), 
Array(1099012, 1, 800000), 
Array(1353105, 1, 800000), 
Array(1342095, 1, 800000),
Array(1352009, 1, 800000), 
Array(1352109, 1, 800000), 
Array(1352206, 1, 800000), 
Array(1352216, 1, 800000), 
Array(1352226, 1, 800000), 
Array(1352276, 1, 800000), 
Array(1352286, 1, 800000), 
Array(1352296, 1, 800000), 
Array(1352406, 1, 800000), 
Array(1352506, 1, 800000), 
Array(1352707, 1, 800000), 
Array(1352815, 1, 800000), 
Array(1352906, 1, 800000), 
Array(1352916, 1, 800000), 
Array(1352935, 1, 800000), 
Array(1352945, 1, 800000), 
Array(1352957, 1, 800000), 
Array(1352967, 1, 800000), 
Array(1352975, 1, 800000), 
Array(1353006, 1, 800000),
Array(1352928, 1, 800000),
Array(1352236, 1, 800000),
Array(1352246, 1, 800000),
Array(1352256, 1, 800000),
Array(1352266, 1, 800000),
Array(1352606, 1, 800000)
);
var selectedItem = -1;
var selequantity = -1;
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
        var selStr = "#h0#，#e#b我是皮皮銀河副手購買NPC,請留出一格空間獲取裝備,你當前的樂豆點：#r" + cm.getPlayer().getCSPoints(1) + "\r\n#k請選擇你想要購買的副武器：#b";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k x (" + itemList[i][1] + ")   #r" + itemList[i][2] + "#k樂豆點#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selequantity = item[1];
            selectedCost = item[2];
            cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k 樂豆點？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selequantity <= 0 || selectedItem <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            if (cm.canHold(selectedItem, selequantity)) {
                cm.gainNX( - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("『樂豆點商城』 " + cm.getName() + " 玩家在樂豆點商城購買道具： " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
       if (cm.canHold(selectedItem, selequantity)) {
                cm.gainNX(1, - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("『樂豆點商城』 " + cm.getName() + " 玩家在樂豆點商城購買道具： " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }    
    } else {
            cm.sendOk("您沒有那麼多樂豆點。\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k 樂豆點。");
        }
        status = -1;
    }
}