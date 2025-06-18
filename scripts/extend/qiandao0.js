var status = 0;
var jf = 20;//兌換數量

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
            cm.sendSimple("親愛的#r" + cm.getChar().getName() + "#k你好，我是每日福利NPC。#b \r\n - 每日活動內容>> #e#d(已簽到" + cm.getPQLog("總計簽到", 1) + "次 已領取福利" + cm.getPQLog("總計福利", 1) + "次)#n#r\r\n#L1# 每日簽到#l\r\n#L2# 每日福利#l\r\n#L4# 免費領取僱傭店卡#l\r\n#L6##d 每日BOSS入場券#b#l\r\n#L3# 簽到獎勵兌換#l") //#L5# 每日贈點[New 每天送樂豆點]#l\r\n
        } else {
            cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n180級以下的不能參加活動。");
            cm.dispose();
        }
    } else if (status == 1) {
        if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 120) {
                cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n120級以下的不能參加活動。");
            } else if (cm.getSpace(4) < 2) {
                cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n簽到失敗，您的其他欄道具空間不足。");
            } else {
                if (cm.getPQLog("每日簽到10") == 0 && cm.getOnlineTime() > 60) {
                    cm.gainItem(2431152, 1);
                   // cm.gainItem(4310110, 1);
                    cm.gainItem(4032398, 1);
                    cm.gainPlayerPoints(jf * 1);
                    cm.setPQLog("每日簽到10");
                    cm.setPQLog("總計簽到10", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功簽到.當前簽到次數" + cm.getPQLog("總計簽到10", 1));
                    cm.sendOk("#r - 每日簽到 >> \r\n#d簽到成功#k\r\n獲得#b每日禮包#v2431152##k 及20積分，收集多個可以跟我領取獎勵！");
                } else {
                    cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n對不起，一天只能簽到一次。\r\n或您要在線1小時以上才能簽到！");
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
            cm.gainItem(2022118, 5);
            cm.gainItem(2049100, 2);
                    cm.gainNX(2, 5000);
                    cm.setPQLog("每日福利10");
                    cm.setPQLog("總計福利10", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取福利.領取福利總次數" + cm.getPQLog("總計福利10", 1));
                    cm.sendOk("#r - 每日福利 >> \r\n#d每日福利領取成功#k\r\n獲得管理員的祝福#v2022118# x 5   獲得楓點5000點。#v2049100# x 2");
                } else {
                    cm.sendOk("#r - 每日福利 >> #k\r\n\r\n對不起，一天只能福利一次。\r\n或您要在線20分鐘以上時才能領取！");
                }
            }
            cm.dispose();
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9310058, "qiandao1");
        } else if (selection == 6) {
            if (cm.getPlayerStat("LVL") < 180) {
                cm.sendOk("#r - 每日BOSS入場券 >> #k\r\n\r\n180級以下的不能參加活動。");
            } else if (cm.getSpace(4) < 3) {
                cm.sendOk("#r - 每日BOSS入場券 >> #k\r\n\r\n福利失敗，您的其他欄道具空間不足。");
            } else {
                if (cm.getPQLog("每日入場券10") == 0  && cm.getOnlineTime()>60) {
            cm.gainItem(4001086, 1);
            cm.gainItem(4000385, 1);
            cm.gainItem(4033304, 1);
            cm.gainItem(4033406, 1);
            cm.gainItem(4032246, 1);
            cm.gainItem(4032002, 1);
            cm.gainItem(4033117, 1);
            cm.gainItem(4033981, 1);
            cm.gainItem(4032923, 1);
            cm.gainItem(4033255, 1);
            cm.gainItem(4033611, 1);
                    cm.setPQLog("每日入場券10");
                    cm.setPQLog("總計入場券10", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取每日BOSS入場券.領取福利總次數" + cm.getPQLog("總計入場券10", 1));
                    cm.sendOk("#r - 每日BOSS入場券 >> \r\n#d每日福利領取成功#k\r\n獲得#v4001086# x1 #v4000385# x1 #v4033304# x1 #v4033406# x1 #v4032246# x1 #v4032002# x1 #v4033117# x1 #v4033981# x1 #v4032923# x1 #v4033255# x1 #v4033611# x1");
                } else {
                    cm.sendOk("#r - 每日BOSS入場券 >> #k\r\n\r\n對不起，一天只能福利一次。\r\n或您要在線60分鐘以上時才能領取！");
                }
            }
            cm.dispose();
        } else if (selection == 5) {
            if(cm.getPQLog("每日贈點10") == 0  && cm.getOnlineTime()>360){
        cm.gainNX(1, 1000);
        cm.setPQLog("每日贈點10");
                    cm.setPQLog("總計贈點", 1);
            cm.worldMessage(cm.getChar().getName() + "玩家成功領取贈點1000樂豆點.領取贈點總次數" + cm.getPQLog("總計贈點", 1) + "註：一個角色1000,一個賬號最多30角色,每日就能領取30000樂豆點哦!");
                    cm.sendOk("#r - 每日贈點 >> \r\n#d每日贈點領取成功#k\r\n獲得贈點1000樂豆點...\r\n註：一個角色1000,一個賬號最多30角色,每日就能領取30000樂豆點哦!");
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