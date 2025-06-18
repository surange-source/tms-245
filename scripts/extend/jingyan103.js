var status = 0;
var choice;
var scrolls = Array(
    Array(1003510, 188),
    Array(1003233, 188),
    Array(1003204, 188),
    Array(1002738, 188),
    Array(1003207, 188),
    Array(1003541, 188),
    Array(1003729, 188),
    Array(1040192, 188),
    Array(1041194, 188),
    Array(1042125, 188),
    Array(1042238, 188),
    Array(1048001, 188),
    Array(1051070, 188),
    Array(1051137, 188),
    Array(1052073, 188),
    Array(1052077, 188),
    Array(1052298, 188),
    Array(1062081, 188),
    Array(1062106, 188),
    Array(1062179, 188),
    Array(1072189, 188),
    Array(1072240, 188),
    Array(1072274, 188),
    Array(1082169, 188),
    Array(1102112, 188),
    Array(1102653, 188),
    Array(1142304, 188),
    Array(1702164, 188),
    Array(1702301, 188),
    Array(1702340, 188),
    Array(1702342, 188),
    Array(1702400, 188),
    Array(1702401, 188),
    Array(1802379, 188),
    Array(3010053, 188),
    Array(3010182, 188),
    Array(3010222, 188),
    Array(3010522, 188),
    Array(3010458, 188)






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
