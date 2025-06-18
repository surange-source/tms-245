/* 豆豆/現金
Array(2702001,1,2000),
Array(2702001,10,20000),
 */

var status = -1;
var itemList = Array(
Array(2431892, 1, 5000),
Array(5030022, 1, 2000),
Array(2432970, 6, 10000),
Array(2432970, 1, 2000),
Array(2049300, 10, 145000),
Array(2049300, 1, 15000),
Array(5064003, 10, 90000),
Array(5064003, 1, 10000),
Array(2614002, 10, 300000),
Array(2614002, 1, 31000),
Array(2048721, 1, 40000),
Array(2501000, 1, 6000),
Array(1672030, 1, 5000),
Array(1672032, 1, 10000),
Array(2431845, 1, 350),
Array(2431846, 1, 600),
Array(3700031, 1, 250),
Array(3700032, 1, 500),
Array(3700033, 1, 1000),
Array(3700034, 1, 2000),
Array(5156000, 1, 10000),
Array(2048307, 1, 1000),
Array(2049600, 1, 5000),
Array(5192000, 1, 3000),
Array(1142145, 1, 200000),
Array(5520000, 1, 1000),
Array(2720001, 1, 2000),
Array(2470000, 1, 3000),
Array(2531000, 1, 7000),
Array(5062500, 6, 7000),
Array(5062500, 1, 1200),
Array(5062000, 6, 8000),
Array(5062000, 1, 1500),
Array(5062009, 6, 11000),
Array(5062009, 1, 2500),
Array(5062006, 6, 17000),
Array(5062006, 1, 3000),
Array(5750001, 1, 3000),
Array(5251006, 1, 10000),
Array(5390006, 50, 40000),
Array(1112585, 1, 15000),
Array(1112586, 1, 25000),
Array(1112663, 1, 3500), 
Array(5190010, 1, 4500),
Array(5360014, 1, 300),
Array(5360000, 1, 1500), 
Array(5420008, 1, 2000), 
Array(5211070, 1, 500), 
Array(5211069, 1, 500), 
Array(5211063, 1, 3000), 
Array(5211064, 1, 3000), 
Array(5210002, 1, 1500),
Array(5210004, 1, 1500),
Array(5210003, 1, 7500),
Array(5210005, 1, 7500),
Array(2022670, 1, 2000),
Array(2290285, 1, 500),
Array(5490005, 1, 500),
Array(5490006, 1, 500),
Array(4033284, 1, 0),
Array(4009324, 1, 1000),
Array(4033302, 1, 1500),
Array(4033982, 1, 1000),
Array(4033406, 1, 1500),
Array(4033304, 1, 500),
Array(4033255, 1, 500),
Array(4032923, 1, 500),
Array(4032002, 1, 500),
Array(4001086, 1, 1000),
Array(5060003, 1, 8000)
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
        var selStr = "親愛的#r#h ##k您好，請選擇您希望購買的道具：";
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