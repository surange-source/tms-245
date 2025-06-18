/*絕版椅子*/
var status = 0;
var choice;
var itemxh=new Array("3015739","3015723","3015712","3015717","3015695","3015694","3015699","3015662","3015661","3015657","3015465","3015600","3010520","3010519","3010621","3015131","3015343","3010788","3015272","3015236","3015263","3015193","3015002","3010936","3010842","3010843","3015131","3015304","3016000","3015111","3015014","3010788");
var itemxhcost=new Array("1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000","300000");

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
                cm.worldSpouseMessage(0x0D,"[絕版椅子] :  "+ cm.getChar().getName() +"  在樂豆點商店購買了絕版椅子!");
            cm.sendOk("恭喜，購買成功。");
            cm.dispose();
             }
        }
    }
}
