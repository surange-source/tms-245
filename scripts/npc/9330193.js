var status = -1;
var itemList = Array(
Array(1202000, 480),  
Array(1202001 , 480), 
Array(1202002, 480),  
Array(1202003, 480),  
Array(1202004, 480),  
Array(1202023, 480),  
Array(1202024, 480),  
Array(1202025, 480),  
Array(1202026, 480),  
Array(1202027, 480), 
Array(1202028, 480),  
Array(1202029, 480),  
Array(1202030, 480),  
Array(1202031, 480),  
Array(1202032, 480),  
Array(1202033, 480),  
Array(1202034, 480),  
Array(1202035, 480),  
Array(1202036, 480),  
Array(1202037, 480),  
Array(1202038, 480),  
Array(1202039, 480),  
Array(1202040, 480), 
Array(1202041, 480),  
Array(1202042, 480),  
Array(1202087, 480),  
Array(1202088, 480),  
Array(1202092, 480),  
Array(1202083, 480),  
Array(1202084, 480),  
Array(1202085, 480),  
Array(1202086, 480),  
Array(1202094, 480),  
Array(1202095, 480),  
Array(1202096, 480),  
Array(1202097, 480)
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
        var selStr = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n賬戶考試分數：#r"+cm.getPlayerPoints()+"";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "# #i" + itemList[i][0] + ":#  #b#t" + itemList[i][0] + " # #r" + itemList[i][1] + "#k分#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("你確定使用#r" + selectedCost + "#k點數兌換#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
        } else {
            cm.sendOk("兌換道具出現錯誤。");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedItem <= 0 || selectedCost <= 0) {
            cm.sendOk("兌換道具出現錯誤。");
            cm.dispose();
            return;
        }
        if (cm.getPlayerPoints() >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "分數兌換圖騰", 3);
            if (gachaponItem != -1) {
                cm.gainPlayerPoints(-selectedCost);
                cm.sendOk("兌換成功,#i" + selectedItem + ":# #b#t" + selectedItem + "##k已送往背包。");
            } else {
                cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("兌換失敗。\r\n\r\n你沒有足夠的分數。賬戶組隊總共點數：#r" + cm.getPlayerPoints() + "");
        }
        cm.dispose();
    }
}
