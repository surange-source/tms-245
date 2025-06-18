var status = 0;
var choice;
var scrolls = Array(
Array("", 3700000, 0),
Array("", 3700001, 0),
Array("", 3700002, 0),
Array("", 3700003, 0),
Array("", 3700004, 0),
Array("", 3700005, 0),
Array("", 3700006, 0),
Array("", 3700007, 0),
Array("", 3700008, 0),
Array("", 3700009, 0),
Array("", 3700010, 0),
Array("", 3700011, 0),
Array("", 3700012, 0),
Array("", 3700013, 0),
Array("", 3700014, 0),
Array("", 3700015, 0),
Array("", 3700016, 0),
Array("", 3700017, 0),
Array("", 3700018, 0),
Array("", 3700019, 0),
Array("", 3700020, 0),
Array("", 3700025, 0),
Array("", 3700026, 0),
Array("", 3700030, 0),
Array("", 3700031, 0),
Array("", 3700032, 0),
Array("", 3700033, 0),
Array("", 3700034, 0),
Array("", 3700035, 0),
Array("", 3700036, 0),
Array("", 3700037, 0),
Array("", 3700039, 0),
Array("", 3700040, 0),
Array("", 3700041, 0),
Array("", 3700042, 0),
Array("", 3700043, 0),
Array("", 3700044, 0),
Array("", 3700045, 0),
Array("", 3700046, 0),
Array("", 3700047, 0),
Array("", 3700048, 0),
Array("", 3700049, 0),
Array("", 3700052, 0),
Array("", 3700069, 0),
Array("", 3700070, 0),
Array("", 3700071, 0),
Array("", 3700089, 0)
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
            cm.sendSimpleS("歡迎來到時尚稱號店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
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