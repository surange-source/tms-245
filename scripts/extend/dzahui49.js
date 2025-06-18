var status = 0;
var choice;
var scrolls = Array( 
Array("", 1462000, 0),
Array("", 1462001, 0),
Array("", 1462002, 0),
Array("", 1462003, 0),
Array("", 1462004, 0),
Array("", 1462005, 0),
Array("", 1462006, 0),
Array("", 1462007, 0),
Array("", 1462008, 0),
Array("", 1462009, 0),
Array("", 1462010, 0),
Array("", 1462011, 0),
Array("", 1462012, 0),
Array("", 1462013, 0),
Array("", 1462014, 0),
Array("", 1462015, 0),
Array("", 1462016, 0),
Array("", 1462017, 0),
Array("", 1462018, 0),
Array("", 1462019, 0),
Array("", 1462020, 0),
Array("", 1462021, 0),
Array("", 1462022, 0),
Array("", 1462023, 0),
Array("", 1462024, 0),
Array("", 1462025, 0),
Array("", 1462026, 0),
Array("", 1462027, 0),
Array("", 1462028, 0),
Array("", 1462029, 0),
Array("", 1462030, 0),
Array("", 1462031, 0),
Array("", 1462032, 0),
Array("", 1462033, 0),
Array("", 1462034, 0),
Array("", 1462035, 0),
Array("", 1462036, 0),
Array("", 1462037, 0),
Array("", 1462039, 0),
Array("", 1462040, 0),
Array("", 1462041, 0),
Array("", 1462043, 0),
Array("", 1462044, 0),
Array("", 1462045, 0),
Array("", 1462050, 0),
Array("", 1462051, 0),
Array("", 1462053, 0),
Array("", 1462056, 0),
Array("", 1462057, 0),
Array("", 1462058, 0),
Array("", 1462059, 0),
Array("", 1462060, 0),
Array("", 1462061, 0),
Array("", 1462062, 0),
Array("", 1462063, 0),
Array("", 1462066, 0),
Array("", 1462069, 0),
Array("", 1462070, 0),
Array("", 1462071, 0),
Array("", 1462075, 0),
Array("", 1462076, 0),
Array("", 1462077, 0),
Array("", 1462078, 0),
Array("", 1462081, 0),
Array("", 1462084, 0),
Array("", 1462085, 0),
Array("", 1462086, 0),
Array("", 1462087, 0),
Array("", 1462088, 0),
Array("", 1462089, 0),
Array("", 1462090, 0),
Array("", 1462091, 0),
Array("", 1462092, 0),
Array("", 1462093, 0),
Array("", 1462094, 0),
Array("", 1462095, 0),
Array("", 1462096, 0),
Array("", 1462097, 0),
Array("", 1462099, 0),
Array("", 1462100, 0),
Array("", 1462101, 0),
Array("", 1462102, 0),
Array("", 1462103, 0),
Array("", 1462104, 0),
Array("", 1462105, 0)
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
            cm.sendSimpleS("歡迎來到閃亮克魯,靈魂射手店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
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