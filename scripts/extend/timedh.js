
var status = -1;
var itemList = Array(
Array(3010519, 1, 400),
Array(3010520, 1, 400),
Array(3012011, 1, 400),
Array(2431945, 1, 300),
Array(2431944, 1, 300),
//Array(5062024, 1, 50),
Array(5062000, 100, 150),
Array(5062002, 100, 150),
Array(5062500, 100, 150),
Array(5062010, 100, 150),
Array(1422036, 1, 30),
Array(1002677, 1, 30)

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
        var selStr = "親愛的#r#h ##k您好，請選擇您希望兌換的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k x(" + itemList[i][1] + ") #r" + itemList[i][2] + "#b個#v4001526##l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selequantity = item[1];
            selectedCost = item[2];
            cm.sendYesNo("您是否兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k #v4001526#？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selequantity <= 0 || selectedItem <= 0) {
            cm.sendOk("兌換道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getItemQuantity(4001526) >= selectedCost) {
            if (cm.canHold(selectedItem, selequantity)) {
                cm.gainItem(4001526, - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("『物品兌換』 " + cm.getName() + " 玩家使用8週年楓幣兌換了： " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("恭喜您成功兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 。");
            } else {
                cm.sendOk("兌換失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else if (cm.getItemQuantity(4001526) >= selectedCost) {
       if (cm.canHold(selectedItem, selequantity)) {
                cm.gainItem(4001526, - selectedCost);
                cm.gainItem(selectedItem, selequantity);
                cm.worldMessage("『物品兌換』 " + cm.getName() + " 玩家使用8週年楓幣兌換了： " + cm.getItemName(selectedItem) + " x " + selequantity);
                cm.sendOk("恭喜您成功兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 。");
            } else {
                cm.sendOk("兌換失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }    
    } else {
            cm.sendOk("您沒有足夠的#v4001526#。\r\n\r\n兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k #v4001526#。");
        }
        status = -1;
    }
}