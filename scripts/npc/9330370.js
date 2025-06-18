var status = 0;
var typed=0;
var ttcj = "";
var ttty = "";
var ttll = "";
var ttyc = "";
var zdhl = "";
var zdlz = "";
var zdhd = "";
var zdgj = "";
var gply = "";
var jxjc = "";
var random = java.lang.Math.floor(Math.random() * 4);
var random1 = java.lang.Math.floor(Math.random() * 6);
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz21 = "#fUI/Basic.img/BtCoin/normal/0#";// 
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //愛心
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(cm.getEventCount("抽獎") == 0){
            ttcj = "#r未完成任務#b";
    }else{
            ttcj = "#k已完成任務#b";
    }
    if(cm.getEventCount("跳躍") == 0){
            ttty = "#r已完成"+cm.getEventCount("跳躍")+"次任務#b";
    }else{
            ttty = "#r已完成"+cm.getEventCount("跳躍")+"次任務#b";
    }
    if(cm.getEventCount("歷練") == 0){
            ttll = "#r未完成任務#b";
    }else{
            ttll = "#k已完成任務#b";
    }
    if(cm.getEventCount("養成") == 0){
            ttyc = "#r未完成任務#b";
    }else{
            ttyc = "#k已完成任務#b";
    }
    if(cm.getEventCount("皇陵") < 1){
            zdhl = "#r已完成"+cm.getEventCount("皇陵")+"次任務#b";
    }else{
            zdhl = "#k已完成任務#b";
    }
    if(cm.getEventCount("羅朱") < 1){
            zdlz = "#r已完成"+cm.getEventCount("羅朱")+"次任務#b";
    }else{
            zdlz = "#k已完成任務#b";
    }
    if(cm.getEventCount("海盜") < 1){
            zdhd = "#r已完成"+cm.getEventCount("海盜")+"次任務#b";
    }else{
            zdhd = "#k已完成任務#b";
    }
    if(cm.getEventCount("鬼節") < 1){
            zdgj = "#r已完成"+cm.getEventCount("鬼節")+"次任務#b";
    }else{
            zdgj = "#k已完成任務#b";
    }
    if(cm.getEventCount("海怪") < 1){
            hhhg = "#r已完成"+cm.getEventCount("海怪")+"次任務#b";
    }else{
            hhhg = "#k已完成任務#b";
    }
    if(cm.getEventCount("極限") == 0){
            jxjc = "#r未完成任務#b";
    }else{
            jxjc = "#k已完成任務#b";
    }
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
            var selStr = "今天在線的時間為：#r"+cm.getOnlineTime()+"#k 分鐘! 想選擇什麼樣的任務！\r\n\r\n";
            selStr +="#b        #L1001#"+tz21+"[收集]#e#r每日任務#n #k#rnew"+tz21+"#l\r\n";
            selStr +="#b        #L1003#"+tz21+"[收集]#e#r每日尋寶#n #k#rnew"+tz21+"#l\r\n\r\n";
            selStr +="#b#L1100#"+axx1+"【新】每日跑環關#n #k#rnew #k獎勵:海量道具#l\r\n\r\n";
            selStr +="#b#L1000#"+axx1+"[單人/組隊]#e#r亂入BOSS闖關副本#n #k#rnew #k獎勵:海量道具#l\r\n\r\n";
            selStr +="#b#L800#"+axx1+"[單人]#e#r大王蜈蚣#n #k#rnew      #k獎勵:道具、閃炫、幣種#l\r\n\r\n";
            selStr +="#b#L1002#"+axx1+"[單人]#e#rShower保護長老#n #k#rnew  #k獎勵:方塊、火花、幣種#l\r\n\r\n";
            selStr +="#b#L988#"+axx1+"[組隊]廢棄組隊 #k#rnew      #k獎勵:#l\r\n\r\n";
            selStr +="#b#L987#"+axx1+"[組隊]玩具組隊 #k#rnew      #k獎勵:#l\r\n\r\n";
            selStr +="#b#L999#"+axx1+"[單人/組隊]無限火力 #k#rnew      #k獎勵:方塊#l\r\n\r\n";
            selStr +="#b#L996#"+axx1+"[單人/組隊]楓葉高校 #k#rnew      #k獎勵:圖騰#l\r\n\r\n";
            selStr +="#b#L998#"+axx1+"[單人]保護金豬 #k#rnew           #k獎勵:方塊、閃炫樂豆點#l\r\n\r\n";
            selStr +="#b#L995#"+axx1+"[組隊]方塊副本 #k#rnew           #k獎勵:方塊#l\r\n\r\n";
            selStr +="#b#L997#"+axx1+"[公會個人賽]跑旗賽 #k#rnew       #k獎勵:方塊#l\r\n\r\n";
            selStr +="#b#L994#"+axx1+"[新副本] 外星人訪客！#k#rnew     #k獎勵:外星人碎片裝備#l\r\n\r\n";
            selStr +="#b#L993#"+axx1+"[新副本] 鬼魂公園！#k#rnew       #k獎勵:經驗#l\r\n\r\n";
            selStr +="#b#L990#"+axx1+"[新副本] 賓果問答題！#k#rnew     #k獎勵:積分卷軸、方塊#l\r\n\r\n";
            selStr +="#b#L992#"+axx1+"[副本] 武陵道場！#k#rnew         #k獎勵:經驗 #l\r\n\r\n";
            selStr +="#b#L991#"+axx1+"[副本] 國服組隊任務！#k#rnew     #k獎勵:積分卷軸、方塊#l\r\n\r\n ";

            cm.sendSimple(selStr);
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到天天日常任務簡介:\r\n  通過天天日常任務活動可以獲得大量遊戲道具,在這裡讓\r\n  你總是意想不到的意外,任務簡單-困難模式有趣有樂.殺\r\n  戮 挑戰 冒險 極品 這裡的任務應有盡有,趕快行動起來吧!\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v3010070#椅子 #v2049134#卷軸 #v5062002#方塊  #v1332225#裝備 #v1102453#點裝\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：所有日常任務24點重置。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：通過日常任務可以獲得以上物品分類各種型號物品。");
                        cm.dispose();
            } else if (selection == 2) {
            typed=3;
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到日常任務抽獎活動:\r\n  滿足任務條件可以隨機領取1-3個祖母綠抽獎箱.\r\n  雙擊打開您會得到意想不到的物品哦.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#角色在線達到2小時 (#k在線時間： #r"+cm.getOnlineTime()+"#k)分鐘\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#完成一次[組隊]掃蕩秦皇陵.\r\n#L2#我要抽獎#l");
            } else if (selection == 3) {
            typed=4;
                        cm.dispose();
                cm.openNpc(9020000);
            } else if (selection == 4) {
            typed=5;
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到日常任務歷練活動:\r\n  滿足任務條件可以領取積分值.\r\n  隨機 神奇方塊x6 高級神奇方塊x3 防爆卷軸x3 祝福卷x3\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#角色在線達到3小時 (#k在線時間： #r"+cm.getOnlineTime()+"#k)分鐘\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#完成一次[組隊]掃蕩秦皇陵.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#完成一次[組隊]搶佔海盜船.\r\n#L2#完成任務#l");
            } else if (selection == 5) {
            typed=6;
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到日常任務養成活動,滿足\r\n  任務條件可以飼養小夥伴.\r\n  隨機 飼養小夥伴成長值 5 - 10 點 \r\n  #r註：小夥伴的成長情況,請在市場地圖中找(文教授)#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#角色在線達到4小時 (#k在線時間： #r"+cm.getOnlineTime()+"#k)分鐘\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[收集物品]#i4001083# #t4001083# (#c4001083# / 1).\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[收集物品]#i4001084# #t4001084# (#c4001084# / 1).\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[收集物品]#i4000460# #t4000460# (#c4000460# / 1).\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[收集物品]#i4000461# #t4000461# (#c4000461# / 1).\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[收集物品]#i4000462# #t4000462# (#c4000462# / 1).\r\n#L2#完成任務#l");        } else if (selection == 6) {
            typed=7;
            if (cm.getEventCount("皇陵") < 1) {
            cm.dispose();
            cm.openNpc(9330231);
            }else{
                cm.sendOk("今天該帳號已經完成[組隊]掃蕩秦皇陵。");
                cm.dispose();
            }
            } else if (selection == 7) {
            typed=9;
            if (cm.getEventCount("海盜") < 1) {
                        cm.dispose();
            cm.openNpc(2094000);
            }else{
                cm.sendOk("今天該帳號已經完成[組隊]搶佔海盜船。");
                cm.dispose();
            }
            } else if (selection == 9) {
            typed=10;
            if (cm.getEventCount("鬼節") < 1) {
                        cm.dispose();
            cm.openNpc(2022003);
            }else{
                cm.sendOk("今天該帳號已經完成[組隊]皇帝的復活。");
                cm.dispose();
            }
            } else if (selection == 10) {
            typed=11;
            cm.dispose();
            cm.openNpc(2040034);
            } else if (selection == 11) {
            cm.dispose();
            cm.openNpc(9020005);
            } else if (selection == 12) {
            typed=12;
            cm.sendOk("看你有木有節操");
                        cm.dispose();
            } else if (selection == 1002) {
                cm.warp(911006000);
                cm.dispose();
            } else if (selection == 1003) {
                cm.dispose();
                cm.openNpc(2084001);
            } else if (selection == 1001) {
                cm.dispose();
                cm.openNpc(9310073);
            } else if (selection == 1000) {
                cm.warp(910340700);
                cm.dispose();
            } else if (selection == 999) {
                cm.dispose();
                cm.openNpc(9201116,"wuxianhuoli");
            } else if (selection == 998) {
                cm.dispose();
                cm.openNpc(9201116,"9300006_1");
            } else if (selection == 997) {
                cm.dispose();
                cm.openNpc(9000233);
            } else if (selection == 996) {
                cm.warp(744000000);
                cm.dispose();
            } else if (selection == 995) {
                cm.dispose();
                cm.openNpc(9201116,"JinBi");
            } else if (selection == 994) {
                cm.warp(861000000);
                cm.dispose();
            } else if (selection == 993) {
                cm.warp(956100000);
                cm.dispose();
            } else if (selection == 992) {
                cm.warp(925020000);
                cm.dispose();
            } else if (selection == 991) {
                cm.warp(910002000);
                cm.dispose();
            } else if (selection == 990) {
                cm.warp(910048000);
                cm.dispose();
            } else if (selection == 800) {
                cm.warp(910340700,0);
                cm.dispose();
            } else if (selection == 988) {
                cm.warp(910340700,0);
                cm.dispose();
                //cm.openNpc(1540100);
            } else if (selection == 987) {
                
                cm.warp(221023300,0);
                cm.dispose();
                } else if (selection == 1100) {
                cm.dispose();
                cm.openNpc(9010009);
                //cm.openNpc(1500016);
            }
        } else if (status == 2) {
        if (typed == 3) {
        if (selection == 2) {
                if (cm.getEventCount("抽獎") == 0) {
        if(cm.getOnlineTime() >= 10 && cm.getEventCount("皇陵") > 0 && (cm.getSpace(1) > 1||cm.getSpace(2) > 1||cm.getSpace(3) > 1||cm.getSpace(4) > 1)){
            var xzq = Math.floor(Math.random()*3+1);
            cm.gainItem(2430069, xzq);
            cm.sendOk("獲得 #v2430069# #t2430069# "+xzq+"個");
                   cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛抽獎活動中獲得 祖母綠箱子 。");
            cm.setEventCount("抽獎");
                    cm.dispose();
        }else{
            cm.sendOk("請確認您在線時間達到10分鐘。\r\n請確認您是否完成#b[組隊]掃蕩秦皇陵#k。\r\n請確認您背包所有欄目窗口中是否有一格以上的空間。");
                    cm.dispose();
        }
        }else{
            cm.sendOk("今天該帳號已經完成[日常]天天愛抽獎。");
            cm.dispose();
        }
        }
        }
        if (typed == 5) {
        if (selection == 2) {
                if (cm.getEventCount("歷練") == 0) {
        if(cm.getOnlineTime() >= 20 && cm.getEventCount("皇陵") > 0 && cm.getEventCount("海盜") > 0 && (cm.getSpace(1) > 1||cm.getSpace(2) > 1||cm.getSpace(3) > 1||cm.getSpace(4) > 1)){
        if(random == 0){
            cm.gainGachaponItem(5062000, 6, "天天愛歷練", 3);
                    cm.sendOk("獲得 #v5062000# #t5062000# 6個");
        } else if(random == 1){
            cm.gainGachaponItem(5062002, 3, "天天愛歷練", 3);
                    cm.sendOk("獲得 #v5062002# #t5062002# 3個");
        } else if(random == 2){
            cm.gainGachaponItem(5064000, 3, "天天愛歷練", 3);
                    cm.sendOk("獲得 #v5064000# #t5064000# 3個");
        } else {
            cm.gainGachaponItem(2340000, 3, "天天愛歷練", 3);
                    cm.sendOk("獲得 #v2340000# #t2340000# 3個");
        }
            cm.setEventCount("歷練");
            cm.gainPlayerEnergy(50);
            cm.gainItem(4033136, 1);
                   cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛歷練活動中獲得 50 點活力值 春節剪紙 x1。");
                    cm.dispose();
        }else{
            cm.sendOk("請確認您在線時間達到20分鐘。\r\n請確認您是否收完成全部[組隊]任務。\r\n請確認您背包所有欄目窗口中是否有一格以上的空間。");
                    cm.dispose();
        }
        }else{
            cm.sendOk("今天該帳號已經完成[日常]天天愛歷練。");
            cm.dispose();
        }
        }
        }
        if (typed == 6) {
        if (selection == 2) {
                if (cm.getEventCount("養成") == 0) {
        if(cm.getOnlineTime() >= 30 && cm.haveItem(4001083,1) && cm.haveItem(4001084,1) && cm.haveItem(4000460,1) && cm.haveItem(4000461,1) && cm.haveItem(4000462,1)){
        if(random1 == 0){
        for(var i = 1; i <= 5; i++){
               cm.setPQLog("寵物總計成長值",1);
        }
        cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛養成活動中獲得 5 點成長值 。");
        } else if(random1 == 1){
        for(var i = 1; i <= 6; i++){
               cm.setPQLog("寵物總計成長值",1);
        }
        cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛養成活動中獲得 6 點成長值 。");
        } else if(random1 == 2){
        for(var i = 1; i <= 7; i++){
               cm.setPQLog("寵物總計成長值",1);
        }
        cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛養成活動中獲得 7 點成長值 。");
        } else if(random1 == 3){
        for(var i = 1; i <= 8; i++){
               cm.setPQLog("寵物總計成長值",1);
        }
        cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛養成活動中獲得 8 點成長值 。");
        } else if(random1 == 4){
        for(var i = 1; i <= 9; i++){
               cm.setPQLog("寵物總計成長值",1);
        }
        cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛養成活動中獲得 9 點成長值 。");
        } else {
        for(var i = 1; i <= 10; i++){
               cm.setPQLog("寵物總計成長值",1);
        }
        cm.worldSpouseMessage(0x20,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在天天愛養成活動中獲得 10 點成長值 。");
        }
            cm.gainItem(4001083,-1);
            cm.gainItem(4001084,-1);
            cm.gainItem(4000460,-1);
            cm.gainItem(4000461,-1);
            cm.gainItem(4000462,-1);
            cm.setEventCount("養成");
                    cm.dispose();
        }else{
            cm.sendOk("請確認您在線時間達到30分鐘。\r\n請確認您是否完成全部[收集物品]任務。");
                    cm.dispose();
        }
        }else{
            cm.sendOk("今天該帳號已經完成[日常]天天愛養成。");
            cm.dispose();
        }
        }
        }
       }
      }
}
