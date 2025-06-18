var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
            var selStr = "#d#e歡迎使用樂豆點購買物品，請選擇您想要的：#n#k\r\n";
            selStr +="\t#b您當前樂豆點為：  #r" + cm.getPlayer().getCSPoints(1) + " #b 點#n#k\r\n\r\n";
            selStr +="- #e#d道具#n\r\n"
            selStr +="#L11##b"+aaa+" 購買 #r#t4001716##k #b需要 #r500000#k #b樂豆點#l#k\r\n";
            selStr +="#L2##b"+aaa+" 購買 #r#t2340000##k #b需要 #r10000#k #b樂豆點#l#k\r\n";
            selStr +="#L1##b"+aaa+" 購買 #r無損#t2049323##k #b需要 #r10000#k #b樂豆點#l#k\r\n";
            selStr +="#L3##b"+aaa+" 購 #r#t2046074##k #b需要 #r100000#k #b樂豆點#l#k\r\n";
            selStr +="#L4##b"+aaa+" 購 #r#t2046075##k #b需要 #r100000#k #b樂豆點#l#k\r\n";
            selStr +="#L5##b"+aaa+" 購 #r#t2046149##k #b需要 #r100000#k #b樂豆點#l#k\r\n";
            selStr +="#L6##b"+aaa+" 購買 #r#t2049750##k #b需要 #r50000#k #b樂豆點#l#k\r\n";
            //selStr +="#L7##b"+aaa+" 購買 #r#t2070024##k #b需要 #r50000#k #b樂豆點#l#k\r\n";
            selStr +="#L8##b"+aaa+" 購買 #r#t2070023##k #b需要 #r100000#k #b樂豆點#l#k\r\n";
            selStr +="#L9##b"+aaa+" 購買 #r#t2049124##k #b需要 #r50000#k #b樂豆點#l#k\r\n";
            selStr +="#L10##b"+aaa+" 購買 #r#t2049137##k #b需要 #r100000#k #b樂豆點#l#k\r\n";
            selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);    
        } else if (status == 1) {
            if (selection == 1) {
                typed=1;
                cm.sendYesNo("確定購買一張 #r#t2049323##k 嗎? 將會使用掉您 #r10000#k 樂豆點。");
            } else if (selection == 2) {
                typed=2;
                cm.sendYesNo("確定購買一張 #r#t2340000##k 嗎? 將會使用掉您 #r10000#k 樂豆點。");
                        } else if (selection == 3) {
                typed=3;
                cm.sendYesNo("確定購買一張 #r#t2046074##k 嗎? 將會使用掉您 #r100000#k 樂豆點。");
                        } else if (selection == 4) {
                typed=4;
                cm.sendYesNo("確定購買一張 #r#t2046075##k 嗎? 將會使用掉您 #r100000#k 樂豆點。");
                        } else if (selection == 5) {
                typed=5;
                cm.sendYesNo("確定購買一張 #r#t2046149##k 嗎? 將會使用掉您 #r100000#k 樂豆點。");
                        } else if (selection == 6) {
                typed=6;
                cm.sendYesNo("確定購買一張 #r#t2049750##k 嗎? 將會使用掉您 #r50000#k 樂豆點。");
                        } else if (selection == 7) {
                typed=7;
                cm.sendYesNo("確定購買一組 #r#t2070024##k 嗎? 將會使用掉您 #r50000#k 樂豆點。\r\n#r(PS:本飛標儲值必須去神木村藥店儲值)#k");
                        } else if (selection == 8) {
                typed=8;
                cm.sendYesNo("確定購買一組 #r#t2070023##k 嗎? 將會使用掉您 #r100000#k 樂豆點。");
                        } else if (selection == 9) {
                typed=9;
                cm.sendYesNo("確定購買一張 #r#t2049124##k 嗎? 將會使用掉您 #r50000#k 樂豆點。");
                        } else if (selection == 10) {
                typed=10;
                cm.sendYesNo("確定購買一張 #r#t2049137##k 嗎? 將會使用掉您 #r100000#k 樂豆點。");
                        } else if (selection == 11) {
                typed=11;
                cm.sendYesNo("確定購買一個 #r#t4001716##k 嗎? 將會使用掉您 #r500000#k 樂豆點。");
            }
        } else if (status == 2) {
            if(typed==1){
                if (cm.getPlayer().getCSPoints(1) >= 10000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-10000);
            cm.gainItem(2049323, 1);
            cm.sendOk("恭喜您成功購買#t2049323#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買無損高級裝備強化卷一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==2){
                if (cm.getPlayer().getCSPoints(1) >= 10000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-10000);
            cm.gainItem(2340000, 1);
            cm.sendOk("恭喜您成功購買#t2340000#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買祝福卷軸一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==3){
                if (cm.getPlayer().getCSPoints(1) >= 100000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-100000);
            cm.gainItem(2046074, 1);
            cm.sendOk("恭喜您成功購買#t2046074#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買祥龍單手武器攻擊力卷軸99%一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==4){
                if (cm.getPlayer().getCSPoints(1) >= 100000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-100000);
            cm.gainItem(2046075, 1);
            cm.sendOk("恭喜您成功購買#t2046075#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買祥龍單手武器魔法力卷軸99%一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==5){
                if (cm.getPlayer().getCSPoints(1) >= 100000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-100000);
            cm.gainItem(2046149, 1);
            cm.sendOk("恭喜您成功購買#t2046149#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買祥龍雙手武器攻擊力卷軸99%一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==6){
                if (cm.getPlayer().getCSPoints(1) >= 50000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-50000);
            cm.gainItem(2049750, 1);
            cm.sendOk("恭喜您成功購買#t2049750#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買S級潛能卷軸 80%一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==7){
                if (cm.getPlayer().getCSPoints(1) >= 50000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-50000);
            cm.gainItem(2070024, 1);
            cm.sendOk("恭喜您成功購買#t2070024#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買無限飛鏢一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==8){
                if (cm.getPlayer().getCSPoints(1) >= 100000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-100000);
            cm.gainItem(2070023, 1);
            cm.sendOk("恭喜您成功購買#t2070023#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買火焰飛鏢一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==9){
                if (cm.getPlayer().getCSPoints(1) >= 50000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-50000);
            cm.gainItem(2049124, 1);
            cm.sendOk("恭喜您成功購買#t2049124#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買正向混沌卷軸一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==10){
                if (cm.getPlayer().getCSPoints(1) >= 100000 && cm.getSpace(2) >= 1) {
            cm.gainNX(-100000);
            cm.gainItem(2049137, 1);
            cm.sendOk("恭喜您成功購買#t2049137#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買驚人正義混沌卷軸 40%一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
            }else if(typed==11){
                if (cm.getPlayer().getCSPoints(1) >= 500000 && cm.getSpace(4) >= 1) {
            cm.gainNX(-500000);
            cm.gainItem(4001716, 1);
            cm.sendOk("恭喜您成功購買#t4001716#.");
            cm.worldSpouseMessage(0x20, "『土豪商城』 : 恭喜 " + cm.getChar().getName() + " 用樂豆點購買定居金10億一個.");
            cm.dispose();
                } else {
            cm.sendOk("購買失敗：\r\n\r\n#r1). 當前樂豆點未達到條件.\r\n2). 背包消耗欄位已滿,請清理.");
            cm.dispose();
                }
           }
        }
      }
    }