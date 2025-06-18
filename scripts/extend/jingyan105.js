var status = 0;
var choice;
var scrolls = Array(
    Array(1032200, 288),
    Array(1152154, 288),
    Array(1113055, 288),
    Array(1222072, 288),
    Array(1212077, 288),
    Array(1232071, 288),
    Array(1402204, 288),
    Array(1242076, 288),
    Array(1302285, 288), 
    Array(1312162, 288), 
    Array(1322213, 288), 
    Array(1332235, 288), 
    Array(1342084, 288), 
    Array(1362099, 288), 
    Array(1372186, 288), 
    Array(1382220, 288), 
    Array(1412144, 288), 
    Array(1422149, 288), 
    Array(1432176, 288),
    Array(1442232, 288), 
    Array(1452214, 288), 
    Array(1462202, 288), 
    Array(1472223, 288), 
    Array(1482177, 288), 
    Array(1492188, 288), 
    Array(1522103, 288), 
    Array(1532106, 288),      
    Array(1252058, 288)




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
