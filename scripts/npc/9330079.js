var hh5= "#fEffect/ItemEff/3012023/1/9#";//擬人化星星
var hh7= "#fEffect/ItemEff/3994441/8#";//小精靈
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("#e真的要放棄這次獲取以下物品的機會了麼?"+hh7+"\r\n#v2430210#* 8#v2049376#*3#v2614002#*20#v5062024#*100#v2435153#*3#v2616051#*10#v2430453#*10\r\n#v4021016#*6000#v1143023##v5062402##v2435482##v2436384##g戰力禮包#rV#k#bI#k\r\n");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("#e#g#v2436383#戰力禮包V#k (價值約5060餘額)\r\n"+"打開該禮包,將獲取#v2430209#* 8個,以及各類強大的道具祝您起飛!\r\n#v2049376#*3#v2614002#*20#v5062024#*100#v2435153#*3#v2616051#*10#v2430453#*10\r\n#v4021016#*6000#v1143023##v5062402##v2435482##v2436384##g戰力禮包#rV#k#bI#k\r\n#r警告#k:一定要保持背包每欄至少留有#g15#k個空位喲,否則東西少了我是不負責的喲~\r\n\r\n是否花費#r2666#k餘額打開該禮包？#k");
    } else if (status == 1) {
        if(cm.getHyPay(1)> 2666){
     cm.sendOk("恭喜你成功打開了戰力禮包I,快去背包裡查看把!");
        cm.addHyPay(2666);
        cm.gainItem(2436383, -1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2430209, 1);
        cm.gainItem(2049376, 3);
        cm.gainItem(2435482, 1);
        cm.gainItem(2614002, 20);
        cm.gainItem(5062024, 100);
        cm.gainItem(2435153, 3);
        cm.gainItem(2616051, 10);
        cm.gainItem(2430453, 10);
        cm.gainItem(4021016, 6000);
        cm.gainItem(1143023, 1);
        cm.gainItem(5062402, 1);
        cm.gainItem(2436384, 1);
        cm.dispose();
}
      else if (cm.getHyPay(1)<= 2666){             
       cm.sendOk(hh5+"\r\n#e您的#r餘額#k不足喲~~是否考慮消費一下下來起飛呢?");
       cm.dispose();
}
    }
}