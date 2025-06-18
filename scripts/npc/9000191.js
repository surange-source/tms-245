var hh5= "#fEffect/ItemEff/3012023/1/9#";//擬人化星星
var hh7= "#fEffect/ItemEff/3994441/8#";//小精靈
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("#e真的要放棄這次獲取以下物品的機會了麼?"+hh7+"\r\n#v2430210#* 1#v5062002#*40#v5062009#*40#v5062500#*40#v2049116#*5#v2340000#*30#v2614014#*1#v2436380#戰力禮包II\r\n");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("#e#v2436381#戰力禮包I#k (價值124餘額)\r\n"+"打開該禮包,將獲取#v2430210#* 1個,以及各類強大的道具祝您起飛!\r\n#v5062002#*40#v5062009#*40#v5062500#*40#v2049116#*5#v2340000#*30#v2614014#*1#v2436380##d戰力禮包II#k\r\n#r警告#k:一定要保持背包每欄至少留有#g10#k個空位喲,否則東西少了我是不負責的喲~\r\n\r\n是否花費#r66#k餘額打開該禮包？#k");
    } else if (status == 1) {
        if (cm.getHyPay(1)> 66) {
     cm.sendOk("恭喜你成功打開了戰力禮包I,快去背包裡查看把!");
        cm.addHyPay(66);
        cm.gainItem(2436381, -1);
        cm.gainItem(2430210, 1);
        cm.gainItem(5062002, 40);
        cm.gainItem(5062009, 40);
        cm.gainItem(5062500, 40);
        cm.gainItem(2049116,  5);
        cm.gainItem(2340000, 30);
        cm.gainItem(2614014, 1);
        cm.gainItem(2436380, 1);
        cm.dispose();
}
      else{             
       cm.sendOk(hh5+"\r\n#e您的#r餘額#k不足喲~~是否考慮消費一下下來起飛呢?");
       cm.dispose();
}
    }

}