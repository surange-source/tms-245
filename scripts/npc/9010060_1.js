

/* NPC版權: 追憶
 NPC名稱:         小幫手
 MAP(地圖ID):             (910000000)
 NPC類型:         綜合NPC
 製作人：故事、
 */

var psrw = new Array(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 100, 200, 300, 400, 500, 600, 700, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500);
var rand = Math.floor(Math.random() * psrw.length);
var status = 0;
var fstype = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (cm.getBossLog("普通簽到") == 1) {
            var vipstr = "#g已簽到#k";
        } else {
            var vipstr = "#b未完成#k";
        }
        if (cm.getBossLog("簽到特殊獎勵") == 1) {
            var vipstr1 = "#g已領取#k";
        } else {
            var vipstr1 = "#b未領取#k";
        }
        if (status == 0) {
            var text = "";
            text = "#e<#v3991050# #v3991011# #v3991038# #v3991018#-簽到系統>#n\r\n#b#h ##k每日進行簽到可以獲得獎勵的哦~你想做什麼呢。\r\n你當前簽到信息：\r\n#b總計簽到: " + cm.getBossLog("總計簽到", 1) + " 天\r\n";
            text += "#L0##b查看簽到NPC規則#l\r\n";
            text += "#L1##b開始簽到 #k(今日狀態：" + vipstr + ")#l\r\n";
            text += "#L2##r領取簽到獎勵(New) #k(領取狀態：" + vipstr1 + ")#l\r\n";
            text += "#L3##b簽到物品兌換道具#l\r\n";
            cm.sendSimple(text);

        } else if (status == 1) {
            if (selection == 0) {
                cm.sendOk("#e<#v3991050# #v3991011# #v3991038# #v3991018#-簽到規則>#n\r\n簽到一每日可進行一次,要求等級180級以上。簽到後可獲得#b出席者勳章#k1個,累計次數可上簽到排行榜。");
                cm.dispose();
            } else if (selection == 1) {
                if (cm.getPlayer().getLevel() < 180) {
                    cm.sendOk("等級180級的玩家才可以進行此項目。");
                } else if (cm.getGamePoints() < 120) {
                    cm.sendOk("在線時間120分鐘才可以進行此項目。\r\n您當前在線時間:" + cm.getGamePoints() + "分鐘。");
                } else if (cm.getSpace(4) < 2) {
                    cm.sendOk("背包其他欄有2個空間才可以進行此項目。");
                } else if (cm.getBossLog("普通簽到") == 0) {
                    cm.setBossLog("普通簽到");
                    cm.setBossLog("總計簽到", 1);
                    cm.gainItem(4032398, 1);
                    cm.gainItem(4033136, 1);
                    cm.sendOk("簽到成功,你獲得了#v4032398#x1 #v4033136#x1#k。");
                    cm.worldMessage("[簽到系統]：玩家 [" + cm.getPlayer().getName() + "] 成功簽到，當前簽到次數 " + cm.getBossLog("總計簽到", 1) + "");
                } else {
                    cm.sendOk("你今天已經簽到過了,明天再來吧!");
                }
                status = -1;

            } else if (selection == 2) {
                if (cm.getBossLog("總計簽到", 1) < 15) {
                    cm.sendOk("總計簽到達到15天才可以進行此項目。達到後每日可找我隨機領取100-1500楓點。\r\n#b當前總計簽到: " + cm.getBossLog("總計簽到", 1) + " 天");
                } else if (cm.getBossLog("簽到特殊獎勵") == 0) {
                    cm.setBossLog("簽到特殊獎勵");
                    cm.gainNX(2, psrw[rand]); //隨機給楓點
                    cm.sendOk("簽到成功,你獲得了#b" + psrw[rand] + "#k楓點。");
                    cm.worldMessage("玩家 [" + cm.getPlayer().getName() + "] 成功領取了簽到特殊獎勵獲得了" + psrw[rand] + "楓點。");
                } else {
                    cm.sendOk("你今天已經領取過了,明天再來吧!");
                }
                status = -1;

            } else if (selection == 3) {
                    cm.dispose();
                    cm.openNpc(9010060, 100);



            }
        }
    }
}



