var status = 0;
var choice;
var scrolls = Array(
Array("", 1112000, 0),
Array("", 1112001, 0),
Array("", 1112002, 0),
Array("", 1112003, 0),
Array("", 1112005, 0),
Array("", 1112006, 0),
Array("", 1112007, 0),
Array("", 1112012, 0),
Array("", 1112013, 0),
Array("", 1112014, 0),
Array("", 1112015, 0),
Array("", 1112100, 0),
Array("", 1112101, 0),
Array("", 1112102, 0),
Array("", 1112103, 0),
Array("", 1112104, 0),
Array("", 1112105, 0),
Array("", 1112106, 0),
Array("", 1112107, 0),
Array("", 1112108, 0),
Array("", 1112109, 0),
Array("", 1112110, 0),
Array("", 1112111, 0),
Array("", 1112112, 0),
Array("", 1112113, 0),
Array("", 1112114, 0),
Array("", 1112116, 0),
Array("", 1112117, 0),
Array("", 1112118, 0),
Array("", 1112119, 0),
Array("", 1112120, 0),
Array("", 1112121, 0),
Array("", 1112122, 0),
Array("", 1112123, 0),
Array("", 1112124, 0),
Array("", 1112125, 0),
Array("", 1112126, 0),
Array("", 1112134, 0),
Array("", 1112135, 0),
Array("", 1112136, 0),
Array("", 1112138, 0),
Array("", 1112139, 0),
Array("", 1112140, 0),
Array("", 1112200, 0),
Array("", 1112201, 0),
Array("", 1112202, 0),
Array("", 1112203, 0),
Array("", 1112204, 0),
Array("", 1112205, 0),
Array("", 1112206, 0),
Array("", 1112207, 0),
Array("", 1112208, 0),
Array("", 1112209, 0),
Array("", 1112210, 0),
Array("", 1112211, 0),
Array("", 1112212, 0),
Array("", 1112213, 0),
Array("", 1112214, 0),
Array("", 1112215, 0),
Array("", 1112216, 0),
Array("", 1112217, 0),
Array("", 1112218, 0),
Array("", 1112219, 0),
Array("", 1112220, 0),
Array("", 1112221, 0),
Array("", 1112222, 0),
Array("", 1112223, 0),
Array("", 1112224, 0),
Array("", 1112225, 0),
Array("", 1112226, 0),
Array("", 1112227, 0),
Array("", 1112228, 0),
Array("", 1112229, 0),
Array("", 1112230, 0),
Array("", 1112231, 0),
Array("", 1112232, 0),
Array("", 1112233, 0),
Array("", 1112234, 0),
Array("", 1112235, 0),
Array("", 1112236, 0),
Array("", 1112237, 0),
Array("", 1112238, 0),
Array("", 1112239, 0),
Array("", 1112245, 0),
Array("", 1112246, 0),
Array("", 1112247, 0),
Array("", 1112725, 0),
Array("", 1112729, 0),
Array("", 1112730, 0),
Array("", 1112731, 0),
Array("", 1112732, 0),
Array("", 1112733, 0),
Array("", 1112734, 0),
Array("", 1112745, 0),
Array("", 1112785, 0),
Array("", 1112786, 0),
Array("", 1112787, 0),
Array("", 1112800, 0),
Array("", 1112801, 0),
Array("", 1112802, 0),
Array("", 1112803, 0),
Array("", 1112806, 0),
Array("", 1112807, 0),
Array("", 1112808, 0),
Array("", 1112810, 0),
Array("", 1112811, 0),
Array("", 1112812, 0),
Array("", 1112816, 0),
Array("", 1112817, 0),
Array("", 1112820, 0),
Array("", 1112900, 0),
Array("", 1112901, 0),
Array("", 1112902, 0),
Array("", 1112903, 0),
Array("", 1112904, 0),
Array("", 1112905, 0),
Array("", 1112906, 0),
Array("", 1112908, 0),
Array("", 1112917, 0),
Array("", 1112918, 0),
Array("", 1112919, 0),
Array("", 1112920, 0),
Array("", 1112924, 0),
Array("", 1112925, 0),
Array("", 1112926, 0),
Array("", 1112928, 0),
Array("", 1113003, 0)
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
            choices = "\r\n消費幣餘額：#r" + cm.getHyPay(1) + "#k個 (#r買後不支持退貨喲親#k)";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#　#d需要#r" + scrolls[i][2] + "#d消費幣#k#l";
            }
            cm.sendSimpleS("歡迎來到時尚指環店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
        } else if (status == 1) {
            cm.sendYesNo("你確定需要購買#v" + scrolls[selection][1] + "##t" + scrolls[selection][1] + "#?");
        choice = selection;
        } else if (status == 2) {
            var money = scrolls[choice][2];
            if (cm.getHyPay(1) < money) {
                cm.sendOk("抱歉，你沒足夠的消費幣！");
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