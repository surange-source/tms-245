var status = 0;
var choice;
var scrolls = Array(
    Array(1532098, 5888),
    Array(1522094, 5888),
    Array(1492179, 5888),
    Array(1482168, 5888),
    Array(1472214, 5888),
    Array(1462193, 5888),
    Array(1452205, 5888),
    Array(1442223, 5888),
    Array(1432167, 5888),
    Array(1422140, 5888),
    Array(1412135, 5888),
    Array(1402196, 5888),
    Array(1382208, 5888),
    Array(1372177, 5888),
    Array(1362090, 5888),
    Array(1342082, 5888),
    Array(1332225, 5888),
    Array(1322203, 5888),
    Array(1312153, 5888),
    Array(1302275, 5888),
    Array(1242061, 5888),
    Array(1242060, 5888),
    Array(1232057, 5888),
    Array(1222058, 5888),
    Array(1212063, 5888)





);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) cm.dispose();
    else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("好吧，歡迎下次繼續光臨！.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            choices = "\r\n兔兔幣餘額：#r" + cm.getHyPay(1) + "#k #e鼠標移到名字上顯示屬性 (#r買後不支持退貨喲親#k)";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#L" + i + "##v" + scrolls[i][0] + "##z" + scrolls[i][0] + "#　#d需要#r" + scrolls[i][1] + "#d兔兔幣#k#l";
            }
            cm.sendSimpleS("歡迎來到絕版點裝店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
           } else if (cm.getSpace(1) < 2) {  
                cm.sendOk("#r -  溫馨提示>> #k\r\n\r\n溫馨提示，您的裝備欄小於2個。");  
                 cm.dispose(); 
        } else if (status == 1) {
            cm.sendYesNo("你確定需要購買#v" + scrolls[selection][0] + "##t" + scrolls[selection][0] + "#?");
            choice = selection;
        } else if (status == 2) {
            var money = scrolls[choice][1];
            if (cm.getHyPay(1) < money) {
                cm.sendOk("抱歉，你沒足夠的兔兔幣！");
                cm.dispose();
            } else {
                cm.addHyPay(money);
                cm.gainItem(scrolls[choice][0], 1);
                cm.sendOk("購買成功.");
                cm.dispose();
            }
        }
    }
}
