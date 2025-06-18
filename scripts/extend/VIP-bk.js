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
            //cm.sendOk("#d通知：隨身服務將在15號漲價，由原先的3/天、80/月、500/年改為10/天、240/月、1200/年。\r\n功能改動：每日消費購買樂豆點改為領取樂豆點，將會增加專屬打楓點副本。每日領取專署武器祝福油x100，防具祝福油x100. 每日抽獎包x5. 更有神裝租借等等會逐步開放。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            //twd = cm.getPlayer().updateTWD();
                        var selStr = "";
                        selStr += "您目前: #r不是 #k/ #b已是#k 包月用戶#n#k\r\n";
                        selStr += "#b請選擇購買天數：#n#k\r\n";
                        selStr +="       #d您當前的樂豆點為：#r"+cm.getNX(1)+" #d #k\r\n\r\n\r\n";
            //selStr +="#L91##b"+aaa+" 新手福利【禮物盒】,換取要[黃金票碎片]#v4032605##l#k\r\n\r\n";
            selStr +="#r↓↓↓↓↓↓↓↓↓超值折扣購買↓↓↓↓↓↓↓↓↓↓↓#k\r\n";
            //selStr +="#L1##b"+aaa+" 超級實惠理財服務50餘額/周[詳情點擊查看]#l#k\r\n\r\n";
            selStr +="#L2##b"+aaa+" " + cm.getServerName() + "超值包月3000樂豆點/月[#r#e火爆#b#n點擊查看]#l#k\r\n\r\n";
            //selStr +="#r↓↓↓↓↓↓↓↓↓白銀理財等級↓↓↓↓↓↓↓↓↓↓↓#k\r\n";
            //selStr +="#L3##b"+aaa+" 超級實惠理財服務10餘額/周[詳情點擊查看]#l#k\r\n\r\n";
            //selStr +="#L4##b"+aaa+" 超級實惠理財服務100餘額/月[#r#e火爆#b#n點擊查看]#l#k\r\n\r\n";
                        cm.sendSimple(selStr);    
        } else if (status == 1) {
            if (selection == 1) {
                typed=1;
                cm.sendYesNo("- #e#d超級實惠理財服務一周權：#n#k\r\n\r\n- #e#r提示:#k#n  #r理財神秘盒子 50餘額/1周#k\r\n\r\n- #e#d辦理等級：#n#k\r\n\t\t#b黃金VIP \r\n- #e#d詳細說明：#n#k\r\n\t\t辦理後會扣掉您50餘額，7天內每天享有三倍經驗以及雙倍爆率，副本重置，理財抽獎，每日抽獎，每日道具。另可享有快速洗血、自選美容美發。還可以領取每日楓幣\r\n\r\n- #e#d管理提示：#n#b點是進行購買。點否返回上一頁.#k");
            } else if (selection == 2) {
                typed=2;
                cm.sendYesNo("- #e#d超級實惠理財服務一月權：#n#k\r\n\r\n- #e#r提示:#k#n  #r理財神秘盒子 3000樂豆點/1月#k\r\n\r\n- #e#d辦理等級：#n#k\r\n\t\t#b黃金VIP \r\n- #e#d詳細說明：#n#k\r\n\t\t辦理後會扣掉您300餘額，30天內每天享有三倍經驗以及雙倍爆率，副本重置，理財抽獎，每日抽獎，每日道具。。另可享有快速洗血、自選美容美發。還可以領取每日楓幣\r\n\r\n- #e#d管理提示：#n#b點是進行購買。點否返回上一頁.#k");
            } else if (selection == 3) {
                typed=3;
                cm.sendYesNo("- #e#d超級實惠理財服務一月權：#n#k\r\n\r\n- #e#r提示:#k#n  #r理財神秘盒子 10餘額/1周#k\r\n\r\n- #e#d辦理等級：#n#k\r\n\t\t#b白銀VIP \r\n- #e#d詳細說明：#n#k\r\n\t\t辦理後會扣掉您10餘額，30天內每天享有三倍經驗以及雙倍爆率，，每日抽獎，每日道具。還可以領取每日楓幣\r\n\r\n- #e#d管理提示：#n#b點是進行購買。點否返回上一頁.#k");
            } else if (selection == 4) {
                typed=4;
                cm.sendYesNo("- #e#d超級實惠理財服務一月權：#n#k\r\n\r\n- #e#r提示:#k#n  #r理財神秘盒子 100餘額/1月#k\r\n\r\n- #e#d辦理等級：#n#k\r\n\t\t#b白銀VIP \r\n- #e#d詳細說明：#n#k\r\n\t\t辦理後會扣掉您100餘額，30天內每天享有三倍經驗以及雙倍爆率，每日抽獎，每日道具。還可以領取每日楓幣\r\n\r\n- #e#d管理提示：#n#b點是進行購買。點否返回上一頁.#k");
            }
        } else if (status == 2) {
            if(typed==1){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getNX(1) >=50) {
                    cm.gainItem(2430865,1,7);
                    cm.gainNX(-50);
                    cm.setPQLog("黃金VIP",1,-2);
                    cm.setPQLog("白銀VIP",1,0);
                    cm.sendOk("恭喜您成功購買一周黃金隨身服務.");
                    cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功購買黃金理財服務一周權。", 5120012);
                    cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 成功購買一周黃金理財服務.");
                    cm.dispose();
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 您的隨身服務未到期,無法重複辦理.\r\n2). 儲值金額未達到條件.\r\n3). 背包裡消耗欄位已滿,請清理.");
                    cm.dispose();
                }
            } else if(typed==2){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getNX(1)>=30000) {
                        cm.gainItem(2430865,1,30);
                        cm.gainNX(-3000);
                        cm.setPQLog("黃金VIP",1,-2);
                        cm.setPQLog("白銀VIP",1,0);
                        cm.sendOk("恭喜您成功購買一個月黃金理財服務.");
                        cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功購買黃金理財服務一個月權。", 5120012);
                        cm.worldSpouseMessage(6, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 成功購買一月黃金理財服務.");
                        cm.dispose();
                } else {
                        cm.sendOk("失敗：\r\n\r\n#r1). 您的理財服務未到期,無法重複辦理.\r\n2). 儲值金額未達到條件.\r\n3). 背包裡消耗欄位已滿,請清理.");
                        cm.dispose();
                }
            } else if(typed==3){
                if (cm.haveItem(2431028) < 1 && cm.getSpace(2) > 2 && cm.addHyPay(1)>=10) {
                    cm.gainItem(2430865,1,7);
                    cm.addHyPay(10);
                    cm.setPQLog("白銀VIP",1,-1);
                    cm.sendOk("恭喜您成功購買一周白銀理財服務.");
                    cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功購買白銀理財服務一周權。", 5120012);
                    cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 成功購買一周白銀理財服務.");
                    cm.dispose();
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 您的隨身服務【禮物盒】未到期,無法重複辦理.\r\n2). 沒有黃金票碎片#v4032605#.\r\n3). 背包裡消耗欄位已滿,請清理.");
                    cm.dispose();
                }
            } else if(typed==4){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getHyPay(1)>=100) {
                        cm.gainItem(2430865,1,30);
                        cm.addHyPay(100);
                        cm.setPQLog("白銀VIP",1,-1);
                        cm.sendOk("恭喜您成功購買一個月白銀理財服務.");
                        cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功購買白銀理財服務一個月權。", 5120012);
                        cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 成功購買一月白銀理財服務.");
                        cm.dispose();
                } else {
                        cm.sendOk("失敗：\r\n\r\n#r1). 您的理財服務未到期,無法重複辦理.\r\n2). 儲值金額未達到條件.\r\n3). 背包裡消耗欄位已滿,請清理.");
                        cm.dispose();
                }
           }
      }
   }
}