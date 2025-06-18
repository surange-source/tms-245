/*各種戒指*/
var status = 0;
var choice;
var itemxh = new Array("2432309", "2432582", "2432653", "2430050", "2430291", "2430293", "2430295", "2430297", "2430299", "2430301", "2430303", "2430305", "2430307", "2430309", "2430311", "2430313", "2430315", "2430317", "2430319", "2430321", "2430323", "2430325", "2430327", "2430329", "2430331", "2430333", "2430335", "2430337", "2430339", "2430341", "2430343", "2430346", "2430348", "2430350", "2430352", "2430354", "2430356", "2430358", "2430360", "2430362", "2430536", "2431473", "2431390", "2432311", "2434517");
var itemxhcost = new Array("10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000", "10000");

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("好吧，歡迎下次繼續光臨！.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            choices = "\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的戒指";
            for (var i = 0; i < itemxh.length; i++) {
                choices += "\r\n#L" + i + "##v" + itemxh[i] + "##z" + itemxh[i] + "#　#d需要#r" + itemxhcost[i] + "#d樂豆點#k#l";
            }
            cm.sendSimpleS("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#" + choices, 2);
        } else if (status == 1) {
            cm.sendGetNumber("你選擇的商品為#v" + itemxh[selection] + "#售價為：" + itemxhcost[selection] + "樂豆點/張\r\n請輸入你購買的數量", 1, 1, cm.getPlayer().getCSPoints(1));
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
                cm.gainNX(-money);
                cm.gainItem(itemxh[choice], fee);
                cm.sendOk("恭喜，購買成功。");
                cm.dispose();
            }
        }
    }
}
