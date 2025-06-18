//物品自己添加
var status = -1;
var itemList = Array( 
Array(2049124, 150),  
Array(2046008, 300), 
Array(2046009, 300), 
Array(2046108, 300), 
Array(2046109, 300), 
Array(2046318, 200), 
Array(2046319, 200),    
Array(2049135, 50),
Array(2049300, 80),
Array(2614007, 180), //突破十萬 30%
Array(2048300, 350), //銀光潛能附加印章
Array(2048309, 350),  //附加潛能古卷
Array(2046913, 5500), // 宿命正義單手武器攻擊力卷軸 100% // 為單手武器增加攻擊力屬性。
Array(2046914, 5500), // 宿命正義單手武器魔力卷軸 100% // 為單手武器增加魔法攻擊力屬性。
Array(2046173, 5500), // 宿命正義雙手武器攻擊力卷軸 100% // 為雙手武器增加攻擊力屬性。
Array(2046577, 2500), // 宿命正義防具力量卷軸 100% // 為防具增加力量屬性。
Array(2046578, 2500), // 宿命正義防具智力卷軸 100% // 為防具增加智力屬性。
Array(2046579, 2500), // 宿命正義防具敏捷卷軸 100% // 為防具增加敏捷屬性。
Array(2046580, 2500), // 宿命正義防具運氣卷軸 100% // 為防具增加運氣屬性。
Array(2046763, 2500), // 宿命正義飾品力量卷軸 100% // 為飾品增加力量屬性。
Array(2046764, 2500), // 宿命正義飾品智力卷軸 100% // 為飾品增加智力屬性。
Array(2046765, 2500), // 宿命正義飾品敏捷卷軸 100% // 為飾品增加敏捷屬性。
Array(2046766, 2500) // 宿命正義飾品運氣卷軸 100% // 為飾品增加運氣屬性。

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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k積分#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 積分？");
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "積分商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainPlayerPoints(-selectedCost);
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k。您還有\r\n您還有"+cm.getPlayerPoints()+"積分");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("您沒有那麼多積分。你的積分是:"+cm.getPlayerPoints()+"\r\n\r\n購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 積分。");
        }
        cm.dispose();
    }
}