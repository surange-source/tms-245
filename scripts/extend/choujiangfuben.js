/*
抽獎副本
*/
var status = 0;
var psrw = Array(
Array(5062000, 5), 
Array(5062000, 2), 
Array(5062000, 1), 
Array(5062002, 1),
Array(5062002, 2),
Array(5062002, 3), 
Array(5062002, 5),
Array(2340000, 1),
Array(2340000, 2),
Array(2340000, 3),
Array(2340000, 5), 
Array(5064000, 1),
Array(5064000, 2),
Array(5064000, 3),
Array(5064000, 5),    
Array(5062500, 1), 
Array(5062500, 2), 
Array(5062500, 3), 
Array(5062500, 5), 
Array(5390018, 1), 
Array(5390000, 10), 
Array(5390001, 10), 
Array(5390002, 10), 
Array(5390002, 5),
Array(5390001, 5),
Array(5390000, 5),
Array(4001714, 1),
Array(4001784, 1),
Array(4001785, 1),
Array(4310036, 10),
Array(4310036, 20),
Array(4310036, 30),
Array(4310036, 50),
Array(4310036, 100),
Array(1112915, 1),
Array(1402199, 1),
Array(1232060, 1),
Array(1222061, 1),
Array(1212066, 1),
Array(1242065, 1),
Array(1302277, 1),
Array(1322205, 1),
Array(1332227, 1),
Array(1372179, 1),
Array(1382211, 1),
Array(1422142, 1),
Array(1432169, 1),
Array(1442225, 1),
Array(1452207, 1),
Array(1462195, 1),
Array(1472216, 1),
Array(1482170, 1),
Array(1492181, 1),
Array(1522096, 1),
Array(1532100, 1),
Array(1252065, 1),
Array(1362092, 1)
);
var rand = Math.floor(Math.random() * psrw.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("天啦，你真的擊敗蘑菇王了，請務必獲取蘑菇王掉落物 #r#t4001318##k，我會贈送您一份小禮物，請務必笑納。");
    } else if (status == 1) {
          if (cm.haveItem(4001318, 1) == false) {
        cm.sendOk("你沒有1個#v4001318##z4001318#");
        cm.dispose();
         } else if (cm.getSpace(1) < 1 && cm.getSpace(2) < 1 && cm.getSpace(3) < 1 && cm.getSpace(4) < 1 && cm.getSpace(5) < 1) {
        cm.sendOk("你保證你背包的每一欄都有空位");
        cm.dispose();
            } else {
       var ii = cm.getItemInfo();
       cm.gainItem(psrw[rand][0],+psrw[rand][1]); //隨機這個道具
       cm.removeAll(4001318); //減少1個使用的這個道具
       cm.warp(910000000);
       cm.gainItem(4310129, 50);
       cm.gainItem(2003517, 1);
       cm.gainItem(5062002, 1);
      cm.setPQLog("Heros");
       cm.sendOk("獲取了 #v"+psrw[rand][0]+"# "+psrw[rand][1]+"個，#b冬季限量幣#k50個，#b高級巨人秘藥#k1個，#b高級神奇方塊#k1個。");
    cm.worldSpouseMessage(0x20, "『英雄救美』" + " : " + "[" + cm.getChar().getName() + "]獲得了XX，冬季限量幣50個，高級巨人秘藥1個，高級神奇方塊1個,快去挑戰吧");
       cm.dispose(); 
    }
        }
        }

