var status = 0;
var choice;
var scrolls = Array(
Array("", 5700000, 0),    
Array("", 1662000, 0),
Array("", 1662001, 0),
Array("", 1662002, 0),
Array("", 1662003, 0),
Array("", 1662004, 0),
Array("", 1662005, 0),
Array("", 1662006, 0),
Array("", 1662007, 0),
Array("", 1662008, 0),
Array("", 1662009, 0),
Array("", 1662010, 0),
Array("", 1662011, 0),
Array("", 1662012, 0),
Array("", 1662013, 0),
Array("", 1662014, 0),
Array("", 1662015, 0),
Array("", 1662016, 0),
Array("", 1662017, 0),
Array("", 1662018, 0),
Array("", 1662019, 0),
Array("", 1662020, 0),
Array("", 1666000, 0),
Array("", 1672000, 0),
Array("", 1672001, 0),
Array("", 1672002, 0),
Array("", 1672003, 0),
Array("", 1672004, 0),
Array("", 1672005, 0),
Array("", 1672006, 0),
Array("", 1672007, 0),
Array("", 1672008, 0),
Array("", 1672009, 0),
Array("", 1672010, 0),
Array("", 1672011, 0),
Array("", 1672012, 0),
Array("", 1672013, 0),
Array("", 1672014, 0),
Array("", 1672015, 0),
Array("", 1672016, 0),
Array("", 1672018, 0),
Array("", 1672019, 0),
Array("", 1672020, 0),
Array("", 1672021, 0),
Array("", 1672022, 0)
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
            cm.sendSimpleS("歡迎來到時尚機械店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
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