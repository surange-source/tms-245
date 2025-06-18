var status = 0;
var choice;
var itemxh=new Array("2120000","2120008","5240000","5240001","5240002","5240003","5240004","5240005","5240006","5240007","5240008","5240009","5240010","5240011","5240012","5240013","5240014","5240015","5240016","5240017","5240018","5240019","5240021","5240022","5240023","5240024","5240027","5240028","5240029","5240030","5240031","5240032","5240034","5240035","5240037","5240038","5240039","5240040","5240041","5240042","5240043","5240044","5240045","5240046","5240047","5240048","5240049","5240050","5240051","5240052","5240053","5240054","5240055","5240056","5240057","5240059","5240060","5240061","5240063","5240065","5240067","5240069","5240070","5240071","5240072","5240076");
var itemxhcost=new Array("0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0");

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
            choices = "\r\n兔兔幣餘額：#r" + cm.getHyPay(1) + "#k兔兔幣 (#r買後不支持退貨喲親#k)";
            for (var i = 0; i < itemxh.length; i++) {
                choices += "\r\n#L" + i + "##v" + itemxh[i] + "##z" + itemxh[i] + "#　#d需要#r" + itemxhcost[i] + "#d兔兔幣#k#l";
            }
            cm.sendSimpleS("歡迎來到時尚寵食店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
        } else if (status == 1) {
                cm.sendGetNumber("你選擇的商品為#v" + itemxh[selection] + "#售價為：" + itemxhcost[selection] + "兔兔幣/個\r\n請輸入你購買的數量",1,1,cm.getHyPay(1));
        choice = selection;
        } else if (status == 2) {
            fee = selection;
            money = fee*itemxhcost[choice];
            if (fee < 0) {
            cm.sendOk("你輸入的數負數!");
            cm.dispose();
            } else if (cm.getHyPay(1) < money) {
            cm.sendOk("兌換失敗，你沒有" + money + "個兔兔幣");
            cm.dispose();
            } else {
        cm.addHyPay(money);
            cm.gainItem(itemxh[choice], fee); //聖盃
            cm.sendOk("恭喜，購買成功。");
            cm.dispose();
                }
        }
    }
}