var status = 0;
var choice;
var scrolls = Array(
Array("", 1202000, 0),
Array("", 1202001, 0),
Array("", 1202002, 0),
Array("", 1202003, 0),
Array("", 1202004, 0),
Array("", 1202023, 0),
Array("", 1202024, 0),
Array("", 1202025, 0),
Array("", 1202026, 0),
Array("", 1202027, 0),
Array("", 1202028, 0),
Array("", 1202029, 0),
Array("", 1202030, 0),
Array("", 1202031, 0),
Array("", 1202032, 0),
Array("", 1202033, 0),
Array("", 1202034, 0),
Array("", 1202035, 0),
Array("", 1202036, 0),
Array("", 1202037, 0),
Array("", 1202038, 0),
Array("", 1202039, 0),
Array("", 1202040, 0),
Array("", 1202041, 0),
Array("", 1202042, 0),
Array("", 1202087, 0),
Array("", 1202088, 0)
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
            choices = "\r\n兔兔幣餘額：#r" + cm.getHyPay(1) + "#k個 (#r買後不支持退貨喲親#k)";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#　#d需要#r" + scrolls[i][2] + "#d兔兔幣#k#l";
            }
            cm.sendSimpleS("歡迎來到圖騰店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
        } else if (status == 1) {
            cm.sendYesNo("你確定需要購買#v" + scrolls[selection][1] + "##t" + scrolls[selection][1] + "#?");
        choice = selection;
        } else if (status == 2) {
            var money = scrolls[choice][2];
            if (cm.getHyPay(1) < money) {
                cm.sendOk("抱歉，你沒足夠的兔兔幣！");
                cm.dispose();
            } else {
                cm.addHyPay(money);
                cm.gainItem(scrolls[choice][1], 1);
                cm.sendOk("購買成功.");
                cm.dispose();
            }
        }
    }
}