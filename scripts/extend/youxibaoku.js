/*方塊喇叭*/
var status = 0;
var choice;
var itemxh=new Array("5390011","5390012","5390013","2614002","5220040","5062000","5062002","5062500","5062005","5062010","5062009","5062022","5072000","5073000","5074000","5076000","5390000","5390001","5390002","5390003","5390004","5390005","5390006","5390007","5390008","5079001","5079002","5390010","5390018");
var itemxhcost=new Array("18888","16666","13333","15000","200","1500","2000","2500","3500","3000","2500","20000","1000","2000","2000","5000","6000","6000","6000","6000","6000","7000","10000","10000","10000","5000","5000","6000","6000");

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
            choices = "\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的現金裝備\r\n#r     購買物品一次不要超過1000個，無貨不補的！#k";
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
                //cm.worldSpouseMessage(0x24," "+ cm.getChar().getName() +"  購買了傷害皮膚箱子!");
            cm.sendOk("恭喜，購買成功。");
            cm.dispose();
             }
        }
    }
}
