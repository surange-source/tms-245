var aaa1 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

var status = 0;
var typed=0;
var twd = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = "我這裡是賤賣回收可獲得楓點：#n#b\r\n";
            selStr +="#L4#回收#r#z5062000#100個#b 獲得1萬楓點#l\r\n";
            selStr +="#L1#回收#r#z5062002#100個#b 獲得2萬楓點#l\r\n";
            selStr +="#L2#回收#r#z5062500#100個#b 獲得3萬楓點#l\r\n";
            selStr +="#L3#回收#r#z5062009#100個#b 獲得3萬楓點#l\r\n";
            //selStr +="#L4##v2591264#偉大的梅格耐斯靈魂結晶#l\r\n";
            //selStr +="#L5##v2591427#偉大的史烏靈魂結晶#k#l\r\n\r\n";
            //selStr +="#v4032091#秘密紙條,廢棄任務隨機獲得數量#k\r\n";
            //selStr +="#v4021016#最高級物品結晶,裝備分解可得數量#k\r\n";
            //selStr +="#v4000017#豬頭，漂漂豬客可爆#k\r\n\r\n";
            
                        cm.sendSimple(selStr);    
        } else if (status == 1) {
            if (selection == 1) {
                typed=1;
                cm.sendYesNo("#b- 你確定回收100個#r#z5062002##b嗎？你將來獲得2萬楓點\r\n");
            } else if (selection == 2) {
                typed=2;
                cm.sendYesNo("#b- 你確定回收100個#r#z5062500##b嗎？你將來獲得3萬楓點\r\n");
                        } else if (selection == 3) {
                typed=3;
                cm.sendYesNo("#b- 你確定回收100個#r#z5062009##b嗎？你將來獲得3萬楓點\r\n");
                        } else if (selection == 4) {
                typed=4;
                cm.sendYesNo("#b- 你確定回收100個#r#z5062000##b嗎？你將來獲得1萬楓點\r\n");
                        } else if (selection == 5) {
                typed=5;
                cm.sendYesNo("- #b#v2591427#偉大的史烏靈魂結晶#k製作需要以下物品:\r\n#v4310014#雪花幣2000條\r\n#v4021016#最高級物品結晶200個\r\n#v4000017#豬頭100個\r\n\r\n確定收集好以上物品了嗎?\r\n");
                
            }
        } else if (status == 2) {
            if(typed==1){
                if (cm.haveItem(5062002, 100)) {
            cm.gainNX(2,20000);
            cm.gainItem(5062002, -100);
            cm.sendOk("回收成功.");
            //cm.worldSpouseMessage(0x20, "[回收系統] : 玩家 " + cm.getChar().getName() + " 回收高級神奇方塊獲得5萬楓點.");
            cm.dispose();
                } else {
            cm.sendOk("#b1）.回收失敗\r\n2）.你確定有100個嗎？");
            cm.dispose();
                }
            } else if(typed==2){
                 if (cm.haveItem(5062500, 100)) {
            cm.gainNX(2,30000);
            cm.gainItem(5062500, -100);
            cm.sendOk("回收成功.");
            //cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 製作成功 偉大的西格諾斯靈魂結晶 大家祝賀.");
            cm.dispose();
                } else {
            cm.sendOk("#b1）.回收失敗\r\n2）.你確定有100個嗎？");
            cm.dispose();
                }
            } else if(typed==3){
                 if (cm.haveItem(5062009, 100)) {
            cm.gainNX(2,30000);
            cm.gainItem(5062009, -100);
            cm.sendOk("回收成功.");
            //cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 製作成功 偉大的貝倫靈魂結晶 大家祝賀.");
            cm.dispose();
                } else {
            cm.sendOk("#b1）.回收失敗\r\n2）.你確定有100個嗎？");
            cm.dispose();
                }
            } else if(typed==4){
                if (cm.haveItem(5062000, 100)) {
            cm.gainNX(2,10000);
            cm.gainItem(5062000, -100);
            cm.sendOk("回收成功.");
            //cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 製作成功 偉大的貝倫靈魂結晶 大家祝賀.");
            cm.dispose();
                } else {
            cm.sendOk("#b1）.回收失敗\r\n2）.你確定有100個嗎？");
            cm.dispose();
                }
            } else if(typed==5){
                if (cm.haveItem(4310014, 2000) && cm.haveItem(4021016, 200) && cm.haveItem(4000017, 100)) {
            cm.gainItem(2591427,1);
            cm.gainItem(4310014, -2000);
            cm.gainItem(4021016, -200);
            cm.gainItem(4000017, -100);
            cm.sendOk("恭喜您製作成功.");
            cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 製作成功 偉大的史烏靈魂結晶 大家祝賀.");
            cm.dispose();
                } else {
            cm.sendOk("#b製作失敗：物品不足");
            cm.dispose();
                }
                ////////////////////////////////////////////////////////////////////////////////////////////
            
           }
      }
   }
 }