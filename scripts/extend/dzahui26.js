var status = 0;
var choice;
var scrolls = Array(
Array("", 1080000, 0),
Array("", 1080001, 0),
Array("", 1080003, 0),
Array("", 1080004, 0),
Array("", 1081000, 0),
Array("", 1081001, 0),
Array("", 1081002, 0),
Array("", 1081003, 0),
Array("", 1081004, 0),
Array("", 1081006, 0),
Array("", 1081007, 0),
Array("", 1081009, 0),
Array("", 1081010, 0),
Array("", 1082040, 0),
Array("", 1082041, 0),
Array("", 1082057, 0),
Array("", 1082058, 0),
Array("", 1082077, 0),
Array("", 1082078, 0),
Array("", 1082079, 0),
Array("", 1082101, 0),
Array("", 1082102, 0),
Array("", 1082113, 0),
Array("", 1082124, 0),
Array("", 1082155, 0),
Array("", 1082156, 0),
Array("", 1082157, 0),
Array("", 1082161, 0),
Array("", 1082162, 0),
Array("", 1082169, 0),
Array("", 1082170, 0),
Array("", 1082171, 0),
Array("", 1082172, 0),
Array("", 1082173, 0),
Array("", 1082224, 0),
Array("", 1082225, 0),
Array("", 1082227, 0),
Array("", 1082229, 0),
Array("", 1082231, 0),
Array("", 1082233, 0),
Array("", 1082247, 0),
Array("", 1082249, 0),
Array("", 1082250, 0),
Array("", 1082251, 0),
Array("", 1082255, 0),
Array("", 1082261, 0),
Array("", 1082263, 0),
Array("", 1082267, 0),
Array("", 1082268, 0),
Array("", 1082272, 0),
Array("", 1082273, 0),
Array("", 1082282, 0),
Array("", 1082310, 0),
Array("", 1082312, 0),
Array("", 1082407, 0),
Array("", 1082408, 0),
Array("", 1082423, 0),
Array("", 1082448, 0),
Array("", 1082493, 0),
Array("", 1082500, 0)
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
            cm.sendSimpleS("歡迎來到時尚手套店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
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