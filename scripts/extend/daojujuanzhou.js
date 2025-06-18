/* 樂豆點商店 - 洗能力
Array(2702001,1,2000),
Array(2702001,10,20000),
 */

var status = -1;
var itemList = Array(
Array(2500001, 1, 1),
Array(2500002, 1, 1),
Array(4009439, 1, 200),
Array(4009453, 1, 200),
Array(5251004, 1, 300000),
Array(5251005, 1, 400000),
Array(5251006, 1, 500000),
Array(2022530, 1, 30000),
Array(2450062, 1, 3000),
Array(5252017, 1, 500),
Array(2049116, 1, 25000),
Array(2048306, 1, 10000),
Array(5190011, 1, 2000),
Array(2022799, 1, 500),
Array(5520000, 1, 20000),
Array(5520001, 1, 20000),
Array(2040727, 1, 20000),
Array(5570000, 1, 2000),
Array(2049032, 1, 30000),
Array(2049005, 1, 5000),
Array(1012553, 1, 150000),
Array(2049033, 1, 2000),
Array(4000664, 1, 6000),
Array(2049606, 1, 8000),
Array(2702000, 1, 600),
Array(5062800, 1, 1000),
Array(5537000, 1, 500),
Array(5743003, 1, 1000),
Array(2431935, 1, 8000),
Array(2431936, 1, 10000),
Array(2049405, 1, 50000),
Array(5062500, 1, 3500),
Array(5062009, 1, 3500),
Array(2610003, 1, 10000),
Array(4033999, 1, 10000),
Array(2046010, 1, 50000),
Array(2046011, 1, 50000),
Array(2046110, 1, 50000),
Array(2046111, 1, 50000),
Array(2049323, 1, 8000),
Array(2049300, 1, 300),   
Array(2340000, 1, 3000),   
Array(2501000, 1, 3000),
Array(5062400,1,10000),
Array(2500000, 1, 3000),
Array(5530268,1,3000),
Array(2049500,1,3000),
Array(2048309,1, 2000),
Array(2048702,1,2000),
Array(2048703,1,5000),
Array(2048704,1,10000),
Array(2048725,1,20000),
Array(2048724,1,40000),
Array(2048723,1,60000),
Array(4001839,1,50),
Array(3062102,1,100000),
Array(3062112,1,100000),
Array(3063102,1,200000),
Array(3063112,1,200000)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的道具：";
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
            cm.sendGetNumber("你選擇的商品為#b#v" + selectedItem + "#售價為：" + selectedCost + "樂豆點/張\r\n請輸入你購買的數量",1,1,cm.getPlayer().getCSPoints(1));
            //cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k 樂豆點？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selection <= 0 || selectedItem <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= (selection*selectedCost)) {
            if (cm.canHold(selectedItem, selection)) {
                cm.gainNX( - (selectedCost*selection));
                cm.gainItem(selectedItem, selection);
                cm.worldMessage("『樂豆點商城』 " + cm.getName() + " 玩家在樂豆點商城購買道具： " + cm.getItemName(selectedItem) + " x " + selection);
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selection + ") 。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }    
    } else {
            cm.sendOk("您沒有那麼多樂豆點。\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k 樂豆點。");
        }
        status = -1;
    }
}