var hh5= "#fEffect/ItemEff/3012023/1/9#";//擬人化星星
var hh7= "#fEffect/ItemEff/3994441/8#";//小精靈
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("#e真的要放棄這次獲取以下物品的機會了麼?"+hh7+"\r\n#v2430209#* 1#v5062009#*100#v5062500#*100#v5062024#*40#v2614002#*5\r\n#v1712001##v1712002##v1712003##r神秘徽章一套#k\r\n#v2435087##b瑪瑙材料禮包II#k#v2434174##b瑪瑙材料禮包#k#r#v2436382#戰力禮包IV#k\r\n");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("#e#b#v2436379#戰力禮包III#k  (價值約1050餘額)\r\n"+"打開該禮包,將獲取#v2430209#* 1個,以及各類強大的道具祝您起飛!\r\n#v5062009#*100#v5062500#*100#v5062024#*40#v2614002#*5#v1712001##v1712002##v1712003##r神秘徽章一套#k\r\n#v2435087##b瑪瑙材料禮包II#k#v2434174##b瑪瑙材料禮包#k#r#v2436382#戰力禮包IV#k\r\n#r警告#k:一定要保持背包每欄至少留有#g10#k個空位喲,否則東西少了我是不負責的喲~\r\n\r\n是否花費#r666#k餘額打開該禮包？#k");
    } else if (status == 1) {
        if (cm.getHyPay(1)> 666){
     cm.sendOk("恭喜你成功打開了戰力禮包I,快去背包裡查看把!");
        cm.addHyPay(666);
        cm.gainItem(2436379, -1);
        cm.gainItem(2430209, 1);
        cm.gainItem(1712001, 1);
        cm.gainItem(1712002, 1);
        cm.gainItem(1712003, 1);
        cm.gainItem(2614002, 5);
        cm.gainItem(5062009, 100);
        cm.gainItem(5062500, 100);
        cm.gainItem(5062024, 40);
        cm.gainItem(2435087, 1);
        cm.gainItem(2434174, 1);
        cm.gainItem(2436382, 1);
        cm.dispose();
}
      else{             
       cm.sendOk(hh5+"\r\n#e您的#r餘額#k不足喲~~是否考慮消費一下下來起飛呢?");
       cm.dispose();
          }
    }
}