var hh5= "#fEffect/ItemEff/3012023/1/9#";//擬人化星星
var hh7= "#fEffect/ItemEff/3994441/8#";//小精靈
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("#e真的要放棄這次獲取以下物品的機會了麼?"+hh7+"\r\n#v2430209#* 3#v2049387#*3#v2049388#*1#v2614002#*10#v2049323#*100#v2430453#*5#v4021016#*3000#v3015440##v1143022##v5062402##v1003843##d+20全屬性+15攻擊力魔力屬性點裝#k\r\n#v2436383##g戰力禮包V#k\r\n");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("#e#r#v2436382#戰力禮包IV#k  (價值約2320餘額)\r\n"+"打開該禮包,將獲取#v2430209#* 3個,以及各類強大的道具祝您起飛!\r\n#v2049387#*3#v2049388#*1#v2614002#*10#v2049323#*100#v2430453#*5#v4021016#*3000\r\n#v3015440##v1143022##v5062402##v1003843##d+20全屬性+15攻擊力魔力屬性點裝#k\r\n#v2436383##g戰力禮包V#k\r\n#r警告#k:一定要保持背包每欄至少留有#g15#k個空位喲,否則東西少了我是不負責的喲~\r\n\r\n是否花費#r1066#k餘額打開該禮包？#k");
    } else if (status == 1) {
         if (cm.getHyPay(1)> 1066) {
     cm.sendOk("恭喜你成功打開了戰力禮包I,快去背包裡查看把!");
        cm.addHyPay(1066);
        cm.gainItem(2436382, -1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2049387, 3);
        cm.gainItem(2049388, 1);
        cm.gainItem(2414002, 10);
        cm.gainItem(2049323, 100);
        cm.gainItem(4021016, 3000);
        cm.gainItem(2430453, 5);
        cm.gainItem(3015440, 1);
        cm.gainItem(1143022, 1);
        cm.gainItem(5062402, 1);
        cm.gainItem(1003843, 1);
        cm.gainItem(2436383, 1);
        cm.dispose();
       }
      else {             
       cm.sendOk(hh5+"\r\n#e您的#r餘額#k不足喲~~是否考慮消費一下下來起飛呢?");
       cm.dispose();
        }
    }
}