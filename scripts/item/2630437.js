var status = -1;
var itemList = [];
var select = -1;
var count = -1;

function start() {
    if (im.isQuestFinished(34585)) {
        itemList.push(1712006);
    }
    if (im.isQuestFinished(34269)) {
        itemList.push(1712005);
    }
    if (im.isQuestFinished(34478)) {
        itemList.push(1712004);
    }
    if (im.isQuestFinished(34331)) {
        itemList.push(1712003);
    }
    if (im.isQuestFinished(34218)) {
        itemList.push(1712002);
    }
    if (im.isQuestFinished(34120)) {
        itemList.push(1712001);
    }
    var menu = "";
    for(var i = 0; i < itemList.length; i++) {
        menu += "#L" + i + "# #b#i" + itemList[i] + ":# #t" + itemList[i] + ":# 1個#k#l\r\n";
    }
    if (menu == "") {
        im.sendOk("請先完成奧術之河任務");
        im.dispose();
        return;
    }
    im.sendSimple("請選擇想要領取的#b秘法符文#k!\r\r\r\r" + menu);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 1) {
            im.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status == i++) {
        im.dispose();
    } else if (status == i++) {
        if (select == -1) {
            select = selection;
        }
        if (select >= itemList.length) {
            im.sendOk("發生未知錯誤");
            im.dispose();
            return;
        }
        var quantity = im.getItemQuantity(im.getItemId());
        if (quantity > 1) {
            im.sendGetNumber("請輸入要領取的數量\r\n\r\n", quantity, 1, quantity);
        } else {
            action(1, 0, 1);
        }
    } else if (status == i++) {
        if (count == -1) {
            count = selection;
        }
        var quantity = im.getItemQuantity(im.getItemId());
        if (count > quantity || count < 1) {
            im.sendOk("發生未知錯誤");
            im.dispose();
            return;
        }
        im.sendYesNo("#b#i" + itemList[select] + ":# #t" + itemList[select] + ":# " + count + "個#k要領取嗎?");
    } else if (status == i++) {
        if (!im.canHold(itemList[select], count)) {
            im.sendNext("背包空間不足");
        } else {
            im.gainItem(im.getItemId(), -count);
            im.gainItem(itemList[select], count);
            im.sendNext("\r\n#b#t" + itemList[select] + ":# " + count + "個#k已配發!\r\n\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0##b#e\r\n#i" + itemList[select] + ":# #t" + itemList[select] + ":# " + count + "個#n#k");
        }
        im.dispose();
    } else {
        im.dispose();
    }
}