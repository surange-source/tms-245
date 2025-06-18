/* 樂豆點商店 */

var status = 0;

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
         var selStr = "         #v4040007##e#rVIP神豪勳章系統#v4040007##l\r\n#v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488#\r\n         請把勳章取下來放背包裡面在領取\r\n       #L0##d#v1142538#領取每日(VIP1)獎勵#v1142538##l#k\r\n       #r#L1##v1142539#領取每日(VIP2)獎勵#v1142539##l\r\n       #b#L2##v1142540#領取每日(VIP3)獎勵#v1142540##l\r\n       #b#L3##v1142541#領取每日(VIP4)獎勵#v1142541##l\r\n       #b#L4##v1143000#領取每日(VIP5)獎勵#v1143000##l\r\n       #b#L5##v1142404#領取每日(VIP6)獎勵#v1142404##l\r\n       #b#L6##v1143012#領取每日(VIP7)獎勵#v1143012#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
             if (cm.haveItem(1142538)&&cm.getPQLog("軍銜") < 1) {
            cm.setPQLog("軍銜");
            cm.gainItem(2049116,5);//強混
            cm.gainItem(2340000,20);//祝福卷
            cm.gainItem(5064000,10);//防暴捲
            cm.gainItem(5062500,10);//綠方塊
            cm.gainItem(5062009,10);//紅方塊
                        cm.gainItem(4310210,5);
            cm.gainNX(2, 50);
            cm.gainMeso(2000000);
                    cm.sendOk("成功領取VIP1勳章的獎勵。");
                    cm.worldSpouseMessage(0x24, "[VIP1勳章] : 恭喜 " + cm.getChar().getName() + " 領取VIP1獎勵,領取每日福利 5000樂豆點.");
            cm.dispose();
                } else {
                    cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來！"); 
                    cm.dispose();
                }
                 break;
        case 1:
            if (cm.haveItem(1142539)&&cm.getPQLog("軍銜") < 1) {
                        cm.gainItem(2049116,10);//qian
            cm.gainItem(2340000,30);
            cm.gainItem(5064000,15);
            cm.gainItem(5062500,20);
            cm.gainItem(5062009,20);
                        cm.gainItem(4310210,20);
                        cm.setPQLog("軍銜");
            cm.gainNX(1,20000);
            cm.gainMeso(5000000);
                    cm.sendOk("成功領取VIP2勳章的獎勵。");
                     cm.worldSpouseMessage(0x24, "[VIP2勳章] : 恭喜 " + cm.getChar().getName() + " 領取VIP2獎勵,領取每日福利20000樂豆點.");
            cm.dispose();
                } else {
                     cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來");  
                    cm.dispose();
                }
                 break;
        case 2:
             if (cm.haveItem(1142540)&&cm.getPQLog("軍銜") < 1) {
             cm.gainItem(2049116,15);//qian
            cm.gainItem(2340000,40);
            cm.gainItem(5064000,20);
            cm.gainItem(5062009,30);
            cm.gainItem(5062500,30);
                        cm.gainItem(4310210,50);
                        cm.setPQLog("軍銜");
            cm.gainNX(1,50000);
            cm.gainMeso(10000000);
                    cm.sendOk("成功領取VIP3勳章的獎勵。");
                    cm.worldSpouseMessage(0x24, "[VIP3勳章] : 恭喜 " + cm.getChar().getName() + " 領取VIP3土豪領取每日福利，50000樂豆點.")
                    cm.worldSpouseMessage(0x24, "[VIP3勳章] : 恭喜 " + cm.getChar().getName() + " 領取VIP3土豪領取每日福利，50000樂豆點.")
            cm.dispose();
                } else {
                     cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來！");  
                    cm.dispose();
                }
                 break;
       case 3:
             if (cm.haveItem(1142541)&&cm.getPQLog("軍銜") < 1) {
               cm.gainItem(2049116,20);//qian
            cm.gainItem(2340000,50);
            cm.gainItem(5064000,30);
            cm.gainItem(5062009,40);
            cm.gainItem(5062500,40);
                        cm.gainItem(4310210,80);
                        cm.setPQLog("軍銜");
            cm.gainNX(1,100000);
            cm.gainMeso(20000000);
                    cm.sendOk("成功領取VIP4勳章的獎勵。");
                    cm.worldSpouseMessage(0x26, "[VIP4勳章] : 恭喜 " + cm.getChar().getName() + " 領取VIP4土豪領取每日福利，100000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP4勳章] : 恭喜 " + cm.getChar().getName() + " 領取VIP4土豪領取每日福利，100000樂豆點.")
            cm.dispose();
                } else {
                     cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來！"); 
                    cm.dispose();
                }
                 break;
       case 4:
             if (cm.haveItem(1143000)&&cm.getPQLog("軍銜") < 1) {
                        cm.setPQLog("軍銜");
               cm.gainItem(2049116,30);//qian
            cm.gainItem(2340000,50);
            cm.gainItem(5064000,30);
            cm.gainItem(5062009,50);
            cm.gainItem(5062500,50);
                        cm.gainItem(5062024,5);
                        cm.gainItem(4310210,100);
            cm.gainNX(1,200000);
            cm.gainMeso(50000000);
                    cm.sendOk("成功領取VIP5勳章的獎勵。");
                    cm.worldSpouseMessage(0x26, "[VIP5勳章] : 恭喜 " + cm.getChar().getName() + " VIP5至尊領取每日福利，200000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP5勳章] : 恭喜 " + cm.getChar().getName() + " VIP5至尊領取每日福利，200000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP5勳章] : 恭喜 " + cm.getChar().getName() + " VIP5至尊領取每日福利，200000樂豆點.")
            cm.dispose();
                } else {
                     cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來！"); 
                    cm.dispose();
                }
                 break;
       case 5:
             if (cm.haveItem(1142404)&&cm.getPQLog("軍銜") < 1) {
                        cm.setPQLog("軍銜");
               cm.gainItem(2049116,30);//qian
            cm.gainItem(2340000,50);
            cm.gainItem(5064000,30);
            cm.gainItem(5062009,70);
            cm.gainItem(5062500,70);
                        cm.gainItem(5062024,10);
                        cm.gainItem(4310210,200);
                        cm.gainItem(2430210,1);
            cm.gainNX(1,300000);
            cm.gainMeso(80000000);
                    cm.sendOk("成功領取VIP6勳章的獎勵。");
                    cm.worldSpouseMessage(0x26, "[VIP6勳章] : 恭喜 " + cm.getChar().getName() + " VIP6神豪領取每日福利，300000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP6勳章] : 恭喜 " + cm.getChar().getName() + " VIP6神豪領取每日福利，300000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP6勳章] : 恭喜 " + cm.getChar().getName() + " VIP6神豪領取每日福利，300000樂豆點.")
            cm.dispose();
                } else {
                     cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來！"); 
                    cm.dispose();
                }
                 break;
       case 6:
             if (cm.haveItem(1143012)&&cm.getPQLog("軍銜") < 1) {
                        cm.setPQLog("軍銜");
                        cm.gainItem(1712000, 1);
               cm.gainItem(2049116,50);//qian
            cm.gainItem(2340000,50);
            cm.gainItem(5064000,30);
            cm.gainItem(5062009,90);
            cm.gainItem(5062500,90);
                        cm.gainItem(5062024,20);
                        cm.gainItem(4310210,400);
                        cm.gainItem(2430210,3);
            cm.gainNX(1,500000);
            cm.gainMeso(100000000);
                    cm.sendOk("成功領取VIP6勳章的獎勵。");
                    cm.worldSpouseMessage(0x26, "[VIP7勳章] : 恭喜 " + cm.getChar().getName() + " VIP7神豪領取每日福利，500000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP7勳章] : 恭喜 " + cm.getChar().getName() + " VIP7神豪領取每日福利，500000樂豆點.")
                    cm.worldSpouseMessage(0x26, "[VIP7勳章] : 恭喜 " + cm.getChar().getName() + " VIP7神豪領取每日福利，500000樂豆點.")
            cm.dispose();
                } else {
                     cm.sendOk("VIP勳章都沒有或者已經領取過，請明天再來！"); 
                    cm.dispose();
                }
                 break;
        case 7:
            cm.dispose();
            cm.openNpc(9900002, 16); //洗樂豆點軸
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900002, 24); //玩具商店
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9110103); //騎寵商店
            break;
    case 10:
            cm.dispose();
            cm.openNpc(9110114); //破攻石頭
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9900002, 5); //一鍵潛能
            break;
    case 12:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
    case 13:
            cm.dispose();
            cm.openNpc(9270096, 13); //一鍵潛能
            break;
    case 14:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
    case 15:
            cm.dispose();
            cm.openNpc(9270096, 15); //一鍵潛能
            break;
        }
    }
}