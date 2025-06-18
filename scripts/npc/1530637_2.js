/*極品椅子*/
var status = 0;
        var choice;
        var itemxh = new Array("2431935", "2431936", "5537000", "5520000", "5520001", "2720001", "5570000", "5062500", "5062000", "5062002", "5750001", "5079001", "5079002", "5074000", "5076000", "1112585", "1112586", "2003566", "2003576", "4001839", "2431738", "2431739", "5511001", "5062400", "5190011");
        var itemxhcost = new Array("8000", "10000", "2000", "300", "500", "500", "1500", "1500", "1500", "3000", "5000", "1000", "1000", "500", "3000", "1200", "600", "1000", "200", "200", "200", "200", "500", "1000", "10000", "20000", "1000", "2000", "300", "500", "1000", "300", "5000", "1000");
        function start() {
        status = - 1;
                action(1, 0, 0);
        }

function action(mode, type, selection) {
if (mode == - 1) cm.dispose();
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
        choices = "請選擇您要購買的道具  #rPS：購買前請確認背包有足夠的空間。\r\n#r#e #n#b";
                for (var i = 0; i < itemxh.length; i++) {
        choices += "\r\n#b#L" + i + "##v" + itemxh[i] + "##z" + itemxh[i] + "#　#d需要#r" + itemxhcost[i] + "#d樂豆點#k#l";
        }
        cm.sendSimpleS("" + choices, 2);
        } else if (status == 1) {
        cm.sendGetNumber("你選擇的商品為#b#v" + itemxh[selection] + "#售價為：" + itemxhcost[selection] + "樂豆點/張\r\n請輸入你購買的數量", 1, 1, cm.getPlayer().getCSPoints(1));
                choice = selection;
        } else if (status == 2) {
        fee = selection;
                money = fee * itemxhcost[choice];
                if (fee < 0) {
        cm.sendOk("不能輸入0.或者你沒有足夠的樂豆點支付你要買的數量.!");
                cm.dispose();
        } else if (cm.getPlayer().getCSPoints(1) < money) {
        cm.sendOk("購買失敗，你沒有" + money + "樂豆點");
                cm.dispose();
        } else {
        cm.gainNX( - money);
                cm.gainItem(itemxh[choice], fee);
                // cm.worldSpouseMessage(0x0D, "[功能道具] :  " + cm.getChar().getName() + "  在樂豆點商店購買了好東西!");
                cm.sendOk("恭喜，購買成功。");
                cm.dispose();
        }
        }
        }
}
