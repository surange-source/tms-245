/* 終極神奇方塊碎片 */

var status = -1;
var itemList = Array(
Array(2049300, 10), //高級裝備強化卷軸
Array(2049750, 400)  //s潛能卷80%
);
var itemId = -1;
var amount = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            if (status == 1) {
                im.sendNext("如果您需要兌換的話，那麼請下次來找我！");
            }
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "您現在持有#r" + im.getItemQuantity(2431894) + "#k個#b#i2431894:# #t2431894##k\r\n請選擇您希望兌換的類型:";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "#搜集#r" + itemList[i][1] + "個#k可以獲得#b#i" + itemList[i][0] + ":# #t" + itemList[i][0] + "##k#l";
        }
        im.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            itemId = item[0];
            amount = item[1];
            if (im.getItemQuantity(2431894) >= amount) {
                im.sendYesNo("您現在持有#r" + im.getItemQuantity(2431894) + "#k個#b#i2431894:# #t2431894##k \r\n您要用#r" + amount + "個#k#t2431894#交換#i" + itemId + ":# #b#t" + itemId + "##k 嗎？");
            } else {
                im.sendOk("兌換#i" + itemId + ":# #b#t" + itemId + "##k需要#r" + amount + "個#k#b#t2431894##k\r\n您還需收集#r" + (amount - im.getItemQuantity(2431894)) + "#k個我才能為您兌換。");
                im.dispose();
            }
        } else {
            im.sendOk("出現錯誤...");
            im.dispose();
        }
    } else if (status == 2) {
        if (itemId <= 0 || amount <= 0) {
            im.sendOk("兌換道具出現錯誤...");
            im.dispose();
            return;
        }
        if (im.getItemQuantity(2431894) >= amount) {
            if (im.canHold(itemId)) {
                im.gainItem(2431894, -amount);
                im.gainItem(itemId, 1);
                im.sendOk("恭喜您成功兌換#i" + itemId + ":# #b#t" + itemId + "##k 。");
            } else {
                im.sendOk("請在消耗欄清理出1格以上的空間。");
            }
        } else {
            im.sendOk("兌換#i" + itemId + ":# #b#t" + itemId + "##k需要#r" + amount + "個#k#b#t2431894##k\r\n您還需收集#r" + (amount - im.getItemQuantity(2431894)) + "#k個我才能為您兌換。");
        }
        im.dispose();
    }
}