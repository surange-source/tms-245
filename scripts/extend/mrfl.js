var status = 0;
var jf = 100;//兌換數量

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
        if (cm.getPlayerStat("LVL") >= 0) {
            cm.sendSimple("親愛的#r" + cm.getChar().getName() + "#k你好，我是每日福利NPC。#b \r\n - 每日活動內容>> +#n#r\r\n#L1# 每日簽到#l\r\n#L2# 每日福利 \r\n#L3# 簽到獎勵兌換#l") //#L5# 每日贈點[New 每天送樂豆點]#l\r\n
        } else {
            cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n200級以下的不能參加活動。");
            cm.dispose();
        }
    } else if (status == 1) {
        if (selection == 1) {
            if (cm.getEventCount("每日簽到" + selection) > 0)
                cm.sendOk("臭小子！一個賬號只能領一次！");
            if (cm.getPlayerStat("LVL") < 150) {
                cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n對不起，您的等級未到150級，不能領取簽到哦。");
            } else if (cm.getSpace(4) < 2) {
                cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n簽到失敗，您的其他欄道具空間不足。");
            } else {
                if (cm.getEventCount("每日簽到") == 0 && cm.getOnlineTime() > 600) {
                    cm.gainItem(2431152, 1);
                   // cm.gainItem(4310110, 1);
                    cm.gainItem(4032398, 1);
                    cm.gainPlayerPoints(jf * 1);
                    cm.setEventCount("每日簽到");
                    cm.set("總計簽到", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功簽到.當前簽到次數" + cm.getPQLog("總計簽到", 1));
                    cm.sendOk("#r - 每日簽到 >> \r\n#d簽到成功#k\r\n獲得#b每日禮包#v2431152##k 及100積分，收集多個可以跟我領取獎勵！");
                } else {
                    cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n對不起，一個賬號一天只能簽到一次。\r\n或您要在線600分鐘以上才能簽到！");

                }
            }
            cm.dispose();
        } else if (selection == 2) {
            if (cm.getPlayerStat("LVL") < 180) {
                cm.sendOk("#r - 每日福利 >> #k\r\n\r\n180級以下的不能參加活動。");
            } else if (cm.getSpace(4) < 3) {
                cm.sendOk("#r - 每日福利 >> #k\r\n\r\n福利失敗，您的其他欄道具空間不足。");
            } else {
                if (cm.getPQLog("每日福利10") == 0  && cm.getOnlineTime()>20) {
            cm.gainItem(2000005, 300);
            cm.gainItem(5121032, 5);
                    cm.gainItem(2022179, 3);
                    cm.gainItem(2022959, 1);
                    cm.gainItem(2022960, 1);
                    cm.gainItem(2022961, 1);
                    cm.setPQLog("每日福利10");
                    cm.setPQLog("總計福利10", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取福利.領取福利總次數" + cm.getPQLog("總計福利10", 1));
                    cm.sendOk("#r - 每日福利 >> \r\n#d每日福利領取成功#k\r\n獲得每日藥水#v2000005# x 300   #v5121032# x 5    #v2022179# x 3    #v2022959# x 1    #v2022960# x 1    #v2022961# x 1");
                } else {
                    cm.sendOk("#r - 每日福利 >> #k\r\n\r\n對不起，一天只能福利一次。\r\n或您要在線20分鐘以上時才能領取！");
                }
            }
            cm.dispose();
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9310058, "qiandao1");
        } else if (selection == 6) {
            if (cm.getPlayerStat("LVL") < 1) {
                cm.sendOk("#r - 每日BOSS門票 >> #k\r\n\r\n180級以下的不能參加活動。");
            } else if (cm.getSpace(4) < 3) {
                cm.sendOk("#r - 每日BOSS門票 >> #k\r\n\r\n福利失敗，您的其他欄道具空間不足。");
            } else {
                if (cm.getPQLog("每日BOSS門票") == 0  && cm.getOnlineTime()>5) {
    cm.gainItem(4032923, 2);
    cm.gainItem(4001086, 2);
    cm.gainItem(4033255, 2);
    cm.gainItem(4000385, 2);
                    cm.setPQLog("每日BOSS門票");
                    cm.setPQLog("總計BOSS門票", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取每日BOSS入場券.領取福利總次數" + cm.getPQLog("總計BOSS門票", 1));
                    cm.sendOk("#r - 每日BOSS入場券 >> \r\n#d每日福利領取成功#k\r\n獲得#v4032923# x2 #v4001086# x2 #v4033255# x2 #v4000385# x2");
                } else {
                    cm.sendOk("#r - 每日BOSS門票 >> #k\r\n\r\n對不起，一天只能福利一次。\r\n或您要在線5分鐘以上時才能領取！");
                }
            }
            cm.dispose();
        } else if (selection == 5) {
            if(cm.getPQLog("每日贈點10") == 0  && cm.getOnlineTime()>360){
        cm.gainNX(1, 100);
        cm.setPQLog("每日贈點10");
                    cm.setPQLog("總計贈點", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取贈點100樂豆點.領取贈點總次數" + cm.getPQLog("總計贈點", 1) + "註：一個角色100,一個賬號最多30角色,每日就能領取3000樂豆點哦!");
                    cm.sendOk("#r - 每日贈點 >> \r\n#d每日贈點領取成功#k\r\n獲得贈點100樂豆點...\r\n註：一個角色100,一個賬號最多30角色,每日就能領取3000樂豆點哦!");
                } else {
                    cm.sendOk("#r - 每日贈點 >> #k\r\n\r\n對不起，一天只能贈點一次。\r\n或您要在線6小時以上才能領取！");
                }
        cm.dispose();
        } else if (selection == 4) {
           /* if (cm.getPlayerStat("LVL") < 70) {
                cm.sendOk("#r - 每日福利 >> #k\r\n\r\n70級以下的不能參加活動。");
            } else  */
        if (cm.getSpace(5) < 3) {
                cm.sendOk("#r - 每日福利 >> #k\r\n\r\n福利失敗，您的現金欄道具空間不足。");
    } else if (cm.getPQLog("每日僱傭10") == 0) {
        cm.gainItemPeriod(5030019,1,1);
                    cm.setPQLog("每日僱傭10");
                    cm.setPQLog("總計僱傭10", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取僱傭商店.領取僱傭商店總次數：" + cm.getPQLog("總計僱傭10", 1));
                    cm.sendOk("#r - 每日福利 >> \r\n#d每日僱傭領取成功#k\r\n獲得僱傭商店店卡x1");
                } else {
                    cm.sendOk("#r - 每日福利 >> #k\r\n\r\n對不起，一天只能領取一次。");
            cm.dispose();
        }
    }
}
    }