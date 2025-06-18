/*絕版套裝*/
var status = 0;
var choice;
var itemxh=new Array("1052948","1052853","1052774","1052773","1052850","1051180","1051426","1051487","1052201","1052225","1052306","1052536","1052567","1052634","1052709","1052849","1052852","1052916","1052923");
var itemxhcost=new Array("15000","13000","12000","12000","18000","12000","13000","19000","11000","11000","12300","14000","16000","12000","12000","14000","15000","14000","14000");

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
            choices = "\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的現金裝備";
            for (var i = 0; i < itemxh.length; i++) {
                choices += "\r\n#L" + i + "##v" + itemxh[i] + "##z" + itemxh[i] + "#　#d需要#r" + itemxhcost[i] + "#d樂豆點#k#l";
            }
            cm.sendSimpleS("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#" + choices,2);
        } else if (status == 1) {
                cm.sendGetNumber("你選擇的商品為#v" + itemxh[selection] + "#售價為：" + itemxhcost[selection] + "樂豆點/張\r\n請輸入你購買的數量",1,1,cm.getPlayer().getCSPoints(1));
        choice = selection;
        } else if (status == 2) {
            fee = selection;
            money = fee*itemxhcost[choice];
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
