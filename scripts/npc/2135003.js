var status = -1;
var selectedType = 0;
var selectedMeso = 0;
var moneyMeso = 10;//設置多少樂豆點1HP
var lx;
var eff4 = "#fUI/Basic/BtHide3/mouseOver/0#";
var bbb = "#k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
 lx=cm.getChar().getStat();
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 2) {
                cm.sendNext("英雄確定要取消嗎！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            if(cm.getJob() == 3101 || cm.getJob() == 3120 || cm.getJob() == 3121 || cm.getJob() == 3122){
                   cm.sendOk("惡魔復仇者不能進行洗血");
                cm.dispose();
                return;
            }else{
    cm.sendSimple("#e#d├───────── 樂豆點洗血 ────────┤#n#k\r\n\r\n如果您需要增加HP或者MP的話請找我\r\n備註：如果你#rHP#k或者#rMP#k超過了#r10#k萬將無法為您服務\r\n切記使用此功能後將無法使用#v5050000#在洗血了\r\n\r\n" + bbb + "樂豆點剩餘:#r " + cm.getPlayer().getCSPoints(1) + " #k\r\n" + bbb + "#r1#k點#rHP,MP#k價格為#k#r"+  moneyMeso +"#k樂豆點\r\n#L0##b" + eff4 + "使用#r樂豆點#k#b增加基礎#k#rHP#k#l\r\n#L1##b" + eff4 + "使用#r樂豆點#k#b增加基礎#k#rMP#k#l");
        }
        } else if (status == 1) {
            selectedType = selection;
            if (selectedType == 0) {
                cm.sendGetNumber("請輸入想要增加多少#rHP#k:\r\n", 1, 1, 100000);
            } else if (selectedType == 1) {
                cm.sendGetNumber("請輸入想要增加多少#rMP#k:\r\n", 1, 1, 100000);
            }
        } else if (status == 2) {
            selectedMeso = selection;        
            
            if (selectedType == 0) {
                if ((lx.getMaxHp() + selectedMeso) >= 100000) {
                    cm.sendOk("您的#rHP#k或執行本次操作後大於#r10#k萬,不能使用此功能");
                    cm.dispose();
                    return;
                }else{
                      cm.sendYesNo("您是否要增加#r " + selectedMeso + "HP #k需要:#r"+ (selectedMeso*moneyMeso) +"#k樂豆點");
                }
                
            } else if (selectedType == 1) {
                if ((lx.getMaxMp() + selectedMeso) >= 100000) {
                    cm.sendOk("您的#rMP#k或執行本次操作後大於#r10#k萬,不能使用此功能");
                    cm.dispose();
                    return;
                }else{
                    cm.sendYesNo("您是否要增加#r " + selectedMeso + "MP #k需要:#r"+ (selectedMeso*moneyMeso) +"#k樂豆點");
                }
            }
            

            

        } else if (status == 3) {
            if (selectedType == 0) {
                if (cm.getPlayer().getCSPoints(1)  < selectedMeso * moneyMeso) {
                    cm.sendNext("您的樂豆點不夠無法為您服務。");
                } else  {
                    
                    lx.setMaxHp((lx.getMaxHp() + selectedMeso),cm.getChar());
                    cm.gainNX( - selectedMeso*moneyMeso);
                    cm.fakeRelog();
                                        cm.worldSpouseMessage(0x16,"[1線市場增加MP功能] 恭喜玩家 "+ cm.getChar().getName() +" 成功將基礎血量增加到"+lx.getMaxHp());
                    cm.sendOk("購買成功\r\n成功將基礎血量增加到#r " +lx.getMaxHp());//你目前使用藥劑可以增加#rHP"+lx.getMaxHp()
                    
                
                } 
                cm.dispose();
            } else if (selectedType == 1) {
            
                if (cm.getPlayer().getCSPoints(1)  < selectedMeso * moneyMeso) {
                    cm.sendNext("您的樂豆點不夠無法為您服務。");
                } else  {
                    
                    lx.setMaxMp((lx.getMaxMp() + selectedMeso),cm.getChar());
                    cm.gainNX( - selectedMeso*moneyMeso);
                    cm.fakeRelog();
                                        cm.worldSpouseMessage(0x16,"[1線市場增加MP功能] 恭喜玩家 "+ cm.getChar().getName() +" 成功將基礎魔法增加到"+lx.getMaxMp());
                    cm.sendOk("購買成功\r\n成功將基礎魔法增加到"+lx.getMaxMp());//你目前使用藥劑可以增加#rMP"+lx.getMaxMp()
                    
                
                } 
                
                
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}
