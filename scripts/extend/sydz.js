/*閃耀點裝*/
var status = 0;
var choice;
var itemxh=new Array("5021025","5021017","5021026","5021024","5021023","5021021","5021019","5021002","5021004","5021009","5021011","5021013","5021012","1004642","1050394","1051465","1073105","1102876","1702637","1003516","1102391","1052455","1072658","1002944","1052193","1102210","1003536","1102373","1052458","1072662","1102488","1003460","1052438","1072749","1102453","1003581","1042241","1062156","1702367");
var itemxhcost=new Array("1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","1000000","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999","31999");

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
            choices = "請選擇您要購買的點裝：\r\n#r#e閃耀點裝已更新最新版本！#n#b";
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
            if (fee < 0) {
            cm.sendOk("不能輸入0.或者你沒有足夠的樂豆點支付你要買的數量.!");
            cm.dispose();
            } else if (cm.getPlayer().getCSPoints(1) < money) {
            cm.sendOk("購買失敗，你沒有" + money + "樂豆點");
            cm.dispose();
            } else {
                if (cm.haveItem(4220098,1)){
                    money = 1 ;
                }
            cm.gainNX(-money);
            cm.gainItem(itemxh[choice], fee);
                cm.worldSpouseMessage(0x0D,"[閃耀箱子] :  "+ cm.getChar().getName() +"  在樂豆點商店購買了閃耀點裝!");
            cm.sendOk("恭喜，購買成功。");
            cm.dispose();
             }
        }
    }
}
