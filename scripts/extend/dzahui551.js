var status = 0;
var choice;
var scrolls = Array(
Array("", 1041081, 0),
Array("", 1041082, 0),
Array("", 1041083, 0),
Array("", 1041084, 0),
Array("", 1041085, 0),
Array("", 1041086, 0),
Array("", 1041087, 0),
Array("", 1041088, 0),
Array("", 1041089, 0),
Array("", 1041091, 0),
Array("", 1041092, 0),
Array("", 1041093, 0),
Array("", 1041094, 0),
Array("", 1041095, 0),
Array("", 1041096, 0),
Array("", 1041097, 0),
Array("", 1041098, 0),
Array("", 1041099, 0),
Array("", 1041100, 0),
Array("", 1041101, 0),
Array("", 1041102, 0),
Array("", 1041103, 0),
Array("", 1041105, 0),
Array("", 1041106, 0),
Array("", 1041107, 0),
Array("", 1041115, 0),
Array("", 1041116, 0),
Array("", 1041117, 0),
Array("", 1041118, 0),
Array("", 1041119, 0),
Array("", 1041120, 0),
Array("", 1041121, 0),
Array("", 1041122, 0),
Array("", 1041123, 0),
Array("", 1041124, 0),
Array("", 1041148, 0),
Array("", 1041149, 0),
Array("", 1041150, 0),
Array("", 1041161, 0),
Array("", 1041162, 0),
Array("", 1041163, 0),
Array("", 1041164, 0),
Array("", 1041165, 0),
Array("", 1041166, 0),
Array("", 1041167, 0),
Array("", 1041168, 0),
Array("", 1041169, 0),
Array("", 1041170, 0),
Array("", 1041171, 0),
Array("", 1041172, 0),
Array("", 1041173, 0),
Array("", 1041174, 0),
Array("", 1041175, 0),
Array("", 1041176, 0),
Array("", 1041177, 0),
Array("", 1041178, 0),
Array("", 1041179, 0),
Array("", 1041180, 0),
Array("", 1041181, 0),
Array("", 1041182, 0),
Array("", 1041183, 0),
Array("", 1041184, 0),
Array("", 1041185, 0),
Array("", 1041186, 0),
Array("", 1041187, 0),
Array("", 1041188, 0),
Array("", 1041190, 0),
Array("", 1041191, 0),
Array("", 1041192, 0),
Array("", 1042003, 0),
Array("", 1042027, 0),
Array("", 1042028, 0),
Array("", 1042057, 0),
Array("", 1042167, 0),
Array("", 1042180, 0),
Array("", 1042223, 0),
Array("", 1042224, 0),
Array("", 1042225, 0),
Array("", 1042226, 0),
Array("", 1042227, 0),
Array("", 1042231, 0),
Array("", 1042243, 0)
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
            cm.sendSimpleS("歡迎來到上衣店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
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