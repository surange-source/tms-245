/*絕版戒指*/
var status = 0;
var choice;
var itemxh=new Array("1112141","1112252","1112160","1112272","1112162","1112274","1112161","1112273","1112940","1112937","1112901","1112925","1112928","1112906","1112904","1112148","1112259","1112155","1112267","1112268","1112156","1112229","1112119","1112230","1112103","1112238","1112135","1112150","1112262","1112151","1112263","1112145","1112257","1112143","1112254","1112142","1112253","1112159","1112271","1112152","1112264");
var itemxhcost=new Array("58888","58888","34444","36666","25555","25555","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","58888","78888","68888","68888","58888","58888","30000","30000","20000","20000","34000","34000","15000","15000","32222","32222");

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
            choices = "\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的戒指";
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
