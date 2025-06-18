/*芬芬時尚潮流  在線時間兌換東西*/
var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var c = "#fEffect/CharacterEff/1112905/0/0#"; //籃心
var sl = 5;//兌換數量
var sl1 = 10;//兌換數量
var sl2 = 10000;//兌換數量
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (cm.getEventCount("自動領取樂豆點系統") == 0){
        var zidong = "開啟自動領取樂豆點系統";
    } else {
        var zidong = "關閉自動領取樂豆點系統";
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
        if (status == 0) {
        var selStr = "#e#d您今天在" + cm.getServerName() + "世界時長為： #r" + cm.getOnlineTime() + "#k #d分鐘#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b時無法領取在線獎勵。#k\r\n#b請在 #e#r23：50#n#b 分前領取當天未領取的獎勵。以免造成損失。#k\r\n\r\n";

        selStr += "#L4#" + c + " #b領取在線180分鐘[#r獲得6000樂豆點#b]獎勵#l\r\n";
        selStr += "#L5#" + c + " #b領取在線360分鐘[#r獲得12000卷#b]獎勵#l\r\n";
        selStr += "#L6#" + c + " #b領取在線480分鐘[#r獲得24000樂豆點#b]獎勵#l\r\n";
        selStr += "#L7#" + c + " #b領取在線720分鐘[#r獲得50000樂豆點#b]獎勵#l\r\n";
        selStr += "#L8#" + c + " #b領取在線900分鐘[#r獲得50餘額#b]獎勵#l\r\n\r\n";
        //selStr += "#L10#" + c + " #r"+zidong+"(200級以上)#l\r\n";
        //selStr += "#L9#" + c + " #b領取在線1分鐘[#r獲得10000餘額#b]獎勵【內測餘額】#l\r\n";
        
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
case 4:
        if (cm.getEventCount("180分鐘獎勵樂豆點") == 0 && cm.getOnlineTime() >= 180) {
           // cm.addHyPay(-sl * 1);
               cm.gainNX(6000);
            cm.setEventCount("180分鐘獎勵樂豆點");
            //cm.worldSpouseMessage(0x19,"[掛機樂豆點] "+ cm.getChar().getName() + " 玩家今天上線已經達到180分鐘,給予6000樂豆點作為獎勵.");
     
            cm.sendOk("#r - 180分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得6000樂豆點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線180分鐘喲.或者你已經領取過今天的180分鐘獎勵了");
            cm.dispose();
            }
            break;
case 5:
        if (cm.getEventCount("360分鐘獎勵樂豆點") == 0 && cm.getOnlineTime() >= 360) {
           // cm.addHyPay(-sl * 1);
               cm.gainNX(12000);
            cm.setEventCount("360分鐘獎勵樂豆點");
           // cm.worldSpouseMessage(0x19,"[掛機樂豆點] "+ cm.getChar().getName() + " 玩家今天上線已經達到360分鐘,給予12000樂豆點作為獎勵.");
     
            cm.sendOk("#r - 360分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得12000樂豆點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線360分鐘喲.或者你已經領取過今天的360分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 6:
        if (cm.getEventCount("480分鐘獎勵樂豆點") == 0 && cm.getOnlineTime() >= 480) {
           // cm.addHyPay(-sl * 1);
               cm.gainNX(24000);
            cm.setEventCount("480分鐘獎勵樂豆點");
            //cm.worldSpouseMessage(0x19,"[掛機樂豆點] "+ cm.getChar().getName() + " 玩家今天上線已經達到480分鐘,給予24000樂豆點作為獎勵.");
     
            cm.sendOk("#r - 480分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得24000樂豆點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線480分鐘喲.或者你已經領取過今天的480分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 7:
        if (cm.getEventCount("720分鐘獎勵樂豆點") == 0 && cm.getOnlineTime() >= 720) {
            //cm.addHyPay(-sl1 * 1);
              cm.gainNX(50000);
            cm.setEventCount("720分鐘獎勵樂豆點");
            //cm.worldSpouseMessage(0x19,"[掛機樂豆點] "+ cm.getChar().getName() + " 玩家今天上線已經達到720分鐘,給予50000樂豆點作為獎勵.");
            cm.sendOk("#r - 720分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得50000樂豆點！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線720分鐘喲.或者你已經領取過今天的720分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 8:
        if (cm.getEventCount("900分鐘獎勵樂豆點") == 0 && cm.getOnlineTime() >= 900) {
            cm.addHyPay(-sl5 * 1);
            //cm.gainNX(10000);
            cm.setEventCount("900分鐘獎勵樂豆點");
            //cm.worldSpouseMessage(0x19,"[掛機餘額] "+ cm.getChar().getName() + " 玩家今天上線已經達到900分鐘,給予50餘額作為獎勵.");
            cm.sendOk("#r - 900分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得50餘額！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線900分鐘喲.或者你已經領取過今天的900分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 9:
        if (cm.getEventCount("1分鐘獎勵餘額") == 0 && cm.getOnlineTime() >= 1) {
            cm.addHyPay(-sl2 * 1);
            cm.setEventCount("1分鐘獎勵餘額");
            cm.worldSpouseMessage(0x19,"[掛機餘額] "+ cm.getChar().getName() + " 玩家今天上線已經達到1分鐘,給予10000餘額作為獎勵.");
            cm.sendOk("#r - 1分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得10000餘額！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有在線1分鐘喲.或者你已經領取過今天的1分鐘獎勵了");
            cm.dispose();
            }
            break;
        case 10:
            if (cm.getLevel() <200){
            cm.sendOk("#r你確定你等級大於200級了嗎？");
            cm.dispose();
        } else if (cm.getEventCount("自動領取樂豆點系統") == 0) {
            cm.setEventCount("自動領取樂豆點系統",1,1);
            cm.sendOk("#r - 自動領取樂豆點系統 >> \r\n#d開啟成功#k\r\n每小時30分系統會自動發送樂豆點到背包。");
            cm.dispose();
            } else {
            cm.resetEventCount("自動領取樂豆點系統",0);
            cm.sendOk("#r - 自動領取樂豆點系統 >> \r\n#d自動樂豆點系統關閉。#k\r\n");
            cm.dispose();
            }
            break;
    }
    }
}