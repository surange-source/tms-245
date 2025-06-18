/*星座椅子*/
var status = 0;
var choice;
var itemxh=new Array("3015015","3015016","3015017","3015018","3015019","3015020","3015021","3015022","3015023","3015024","3015025","3015026");
var itemxhcost=new Array("160000","160000","160000","160000","160000","160000","160000","160000","160000","160000","160000","160000");

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
            choices = "請選擇您要購買的道具：\r\n#r#e椅子已更新最新版本！#n#b";
            for (var i = 0; i < itemxh.length; i++) {
                choices += "\r\n#b#L" + i + "##v" + itemxh[i] + "##z" + itemxh[i] + "#　#d需要#r" + itemxhcost[i] + "#d樂豆點#k#l";
            }
            cm.sendSimpleS("" + choices,2);
        } else if (status == 1) {
                cm.sendGetNumber("你選擇的商品為#b#v" + itemxh[selection] + "#售價為：" + itemxhcost[selection] + "樂豆點/張\r\n請輸入你購買的數量",1,1,cm.getPlayer().getCSPoints(1));
        choice = selection;
        } else if (status == 2) {
            fee = selection;
            money = fee*itemxhcost[choice];
            if (cm.haveItem(4220098,1)){
                //money = 1 ;
            }
            if (fee < 0) {
            cm.sendOk("不能輸入0.或者你沒有足夠的樂豆點支付你要買的數量.!");
            cm.dispose();
            } else if (cm.getPlayer().getCSPoints(1) < money) {
            cm.sendOk("購買失敗，你沒有" + money + "樂豆點");
            cm.dispose();
            } else {
            cm.gainNX(-money);
            cm.gainItem(itemxh[choice], fee);
                cm.worldSpouseMessage(0x0D,"[星座椅子] :  "+ cm.getChar().getName() +"  在樂豆點商店購買了星座椅子!");
            cm.sendOk("恭喜，購買成功。");
            cm.dispose();
             }
        }
    }
}
