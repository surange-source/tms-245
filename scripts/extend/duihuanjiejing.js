/* 積分商店 - 洗能力
Array(2702001,1,2000),
Array(2702001,10,20000),
 */

var status = -1;
var itemList = Array(
Array(4021014, 1, 2,4021013),
Array(4021015, 1, 2,4021014),
Array(4021016, 1, 2,4021015)
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您要升級的材料：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##kx(" + itemList[i][1] + ") 需要 #v"+itemList[i][3]+"##z"+itemList[i][3]+"##r" + itemList[i][2] + "#k個#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selequantity = item[1];
            selectedCost = item[2];
            selectedneed = item[3];
            cm.sendGetNumber("你選擇的材料為#b#v" + selectedItem + "#  需要#r#z"+itemList[selection][3]+"##k來兌換.比例為 "+itemList[selection][2]+":1 \r\n\r\n請輸入你要兌換的個數",1,1,cm.getItemQuantity(itemList[selection][3]));
            //cm.sendYesNo("您是否購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k 積分？");
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
        if (cm.getItemQuantity(selectedneed) >= (selection*selectedCost)) {
            if (cm.canHold(selectedItem, selection)) {
                //cm.gainPlayerPoints( - (selectedCost*selection));
                cm.gainItem(selectedItem, selection);
                cm.gainItem(selectedneed, -(selection*selectedCost));
                cm.gainMeso(-1000000);
                cm.worldMessage("『結晶材料』 " + cm.getName() + " 玩家在結晶材料處兌換了" + cm.getItemName(selectedItem) + " x " + selection+"扣除固定手續100W");
                cm.sendOk("恭喜您成功購買#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selection + ") 。");
            } else {
                cm.sendOk("購買失敗，請您確認在背包所有欄目窗口中是否有空間。");
            }    
    } else {
            cm.sendOk("請檢查你是否有那麼多材料來兌換");
        }
        status = -1;
    }
}