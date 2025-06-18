var status = 0;
var choice;
var scrolls = Array(
    Array(1003448, 688),
    Array(1003766, 688),
    Array(1003784, 688),
    Array(1003785, 688),
    Array(1002797, 688),
    Array(1003980, 688),
    Array(1004012, 688),
    Array(1003752, 688),
    Array(1003753, 688),
    Array(1003755, 688),
    Array(1003055, 688),
    Array(1003924, 688),
    Array(1003916, 688),
    Array(1012201, 688),
    Array(1012338, 688),
    Array(1012174, 688),
    Array(1022147, 688),
    Array(1022097, 688),
    Array(1022117, 688),
    Array(1032167, 688),
    Array(1032093, 788),
    Array(1032110, 788),
    Array(1032136, 788), 
    Array(1032218, 788), 
    Array(1052526, 788), 
    Array(1052527, 788), 
    Array(1072872, 788), 
    Array(1003979, 788), 
    Array(1072679, 788), 
    Array(1072368, 788), 
    Array(1082431, 788), 
    Array(1092039, 788), 
    Array(1092022, 688),
    Array(1102248, 388), 
    Array(1102497, 788), 
    Array(1102601, 788), 
    Array(1102322, 788), 
    Array(1102562, 788), 
    Array(1102489, 788),       
    Array(1102606, 688)




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
