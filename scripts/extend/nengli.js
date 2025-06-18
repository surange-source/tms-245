var status = 0;
var typed=0;
var typed1=0;
var random = java.lang.Math.floor(Math.random() * 9 + 1);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0 || mode == 0 && status == 2) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) { 
            cm.sendSimple("#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[運氣]豪情賭拿中介    (#k目前狀態： #r火爆推薦#b)#l\r\n\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[武器]傷害上限突破    (#k需要： #v4033356#  #v4000463#)#l\r\n\r\n  ");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到活動專欄簡介:\r\n  活動專欄提供所有的線上不定時活動舉辦\r\n  活動專欄提供的活動獎勵是你意向不到\r\n  在這裡你才懂得什麼叫做豐富有趣!\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n  #b全部遊戲道具....\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：部分活動專欄24點重置。\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：經常關注活動專欄 你值得擁有。");
                        cm.dispose();
            } else if (selection == 2) {
            typed=3;
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到年終儲值禮包活動:\r\n  達到一定贊助額度你可以獲得大禮包一份\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)#b\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r100#b  贊助禮包#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r500#b  贊助禮包#l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r1000#b 贊助禮包#l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r3000#b 贊助禮包#l\r\n#L6##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r6000#b 贊助禮包#l\r\n#L7##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r10000#b贊助禮包#l\r\n\r\n   #r#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#註：點擊領取後自動把餘額轉換為樂豆點");
            /*cm.sendOk("活動已經結束...請期待 春節活動吧!!!");
            cm.dispose();*/
            } else if (selection == 3) {
            typed=4;
            cm.dispose();
            cm.openNpc(9900001,"hanqingdu");
            } else if (selection == 4) {
            typed=5;
            cm.dispose();
            cm.openNpc(9900001,"shanhaipogong");
            } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(9900001,3013);
            } else if (selection == 6) {
            typed=7;
                cm.dispose();
                cm.openNpc(9900001,"yijianqianneng");
            } else if (selection == 7) {
            cm.sendOk("活動已經結束...!!!");
            cm.dispose();
            /*cm.dispose();
            cm.openNpc(9900001,3009);*/
            } else if (selection == 8) {
            cm.sendOk("活動已經結束...!!!");
            cm.dispose();
            } else if (selection == 9) {
            cm.dispose();
            cm.openNpc(9900001,3011);
            }
        } else if (status == 2) {
        if (typed == 3) {
        if (selection == 2) {
            typed1=1;
                cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎查看100 贊助禮包簡介:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##e#r贊助金額滿足100#n#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v2046008##t2046008# x1\r\n#v2046009##t2046009# x1\r\n#v2046108##t2046108# x1\r\n#v2046109##t2046109# x1\r\n#v2049122##t2049122# x5\r\n#v2049116##t2049116# x5\r\n#v2049322##t2049322# x1\r\n#v2049752##t2049752# x2\r\n#v3010659##t3010659# x1\r\n#v3010608##t3010608# x1\r\n#v1142346##t1142346# x1\r\n#v1112141##t1112141# x1\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[年終贊助禮包]點擊#r100#b  贊助禮包領取#l\r\n\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：贊助禮包每日24點重置。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：該活動與2013/12/30 - 2014/01/04結束");
        }else if(selection == 3){
            typed1=2;
                cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎查看500 贊助禮包簡介:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##e#r贊助金額滿足500#n#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v2046008##t2046008# x2\r\n#v2046009##t2046009# x2\r\n#v2046108##t2046108# x2\r\n#v2046109##t2046109# x2\r\n#v2049122##t2049122# x25\r\n#v2049116##t2049116# x25\r\n#v2049322##t2049322# x2\r\n#v2049751##t2049751# x2\r\n#v3010590##t3010590# x1\r\n#v3010606##t3010606# x1\r\n#v1142347##t1142347# x1\r\n#v1112151##t1112151# x1\r\n#v1112915##t1112915# x1\r\n#v1003797#150裝備隨機 x1\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[年終贊助禮包]點擊#r500#b  贊助禮包領取#l\r\n\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：贊助禮包每日24點重置。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：該活動與2013/12/30 - 2014/01/04結束。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##b註：擁有1次免費使用一鍵潛能更改第1條屬性機會。");
        }else if(selection == 4){
            typed1=3;
                cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎查看1000 贊助禮包簡介:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##e#r贊助金額滿足1000#n#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v2046110##t2046110# x1\r\n#v2046111##t2046111# x1\r\n#v2046010##t2046010# x1\r\n#v2046010##t2046010# x1\r\n#v2049122##t2049122# x50\r\n#v2049116##t2049116# x50\r\n#v2049322##t2049322# x4\r\n#v2049750##t2049750# x2\r\n#v3010494##t3010494# x1\r\n#v3010661##t3010661# x1\r\n#v1142348##t1142348# x1\r\n#v1112150##t1112150# x1\r\n#v1122122##t1122122# x1\r\n#v1112915##t1112915# x2\r\n#v1003797#150裝備隨機 x1\r\n#v1132176#150暴君隨機 x1\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[年終贊助禮包]點擊#r1000#b  贊助禮包領取#l\r\n\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：贊助禮包每日24點重置。\r\n     #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：該活動與2013/12/30 - 2014/01/04結束。\r\n     #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##b註：擁有2次免費使用一鍵潛能更改第1條屬性機會。");
        }else if(selection == 5){
            typed1=4;
                cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎查看3000 贊助禮包簡介:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##e#r贊助金額滿足3000#n#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v2046110##t2046110# x2\r\n#v2046111##t2046111# x2\r\n#v2046010##t2046010# x2\r\n#v2046011##t2046011# x2\r\n#v2049137##t2049137# x50\r\n#v2049119##t2049119# x50\r\n#v2049322##t2049322# x8\r\n#v2049750##t2049750# x4\r\n#v1112140##t1112140# x1\r\n#v1112247##t1112247# x1\r\n#v1112787##t1112787# x1\r\n#v1003698##t1003698# x1\r\n#v3700071##t3700071# x1\r\n#v3010509##t3010509# x1\r\n#v3010621##t3010621# x1\r\n#v3010670##t3010670# x1\r\n#v3010070##t3010070# x1\r\n#v1122122##t1122122# x2\r\n#v1112915##t1112915# x3\r\n#v1672027##t1672027# x1\r\n#v1003797#150裝備隨機 x1\r\n#v1132176#150暴君隨機 x1\r\n#v1472214#150武器隨機 x1\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[年終贊助禮包]點擊#r3000#b  贊助禮包領取#l\r\n\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：贊助禮包每日24點重置。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：該活動與2013/12/30 - 2014/01/04結束。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##b註：擁有1次免費使用一鍵潛能更改第1,2條屬性機會。");
        }else if(selection == 6){
            typed1=5;
                cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎查看6000 贊助禮包簡介:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##e#r贊助金額滿足6000#n#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v2046074##t2046074# x2\r\n#v2046075##t2046075# x2\r\n#v2046149##t2046149# x2\r\n#v2049137##t2049137# x100\r\n#v2049119##t2049119# x100\r\n#v2049322##t2049322# x16\r\n#v2049750##t2049750# x6\r\n#v1112139##t1112139# x1\r\n#v1112246##t1112246# x1\r\n#v1112786##t1112786# x1\r\n#v1003697##t1003697# x1\r\n#v3700070##t3700070# x1\r\n#v3010508##t3010508# x1\r\n#v3010658##t3010658# x1\r\n#v3010594##t3010594# x1\r\n#v3010520##t3010520# x1\r\n#v1122122##t1122122# x3\r\n#v1112915##t1112915# x4\r\n#v1672027##t1672027# x1\r\n#v1003797#150裝備隨機 x1\r\n#v1132176#150暴君隨機 x1\r\n#v1472214#150武器隨機 x1\r\n#v1132246#最高級培羅德首飾隨機 x1\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[年終贊助禮包]點擊#r6000#b  贊助禮包領取#l\r\n\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：贊助禮包每日24點重置。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：該活動與2013/12/30 - 2014/01/04結束。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##b註：擁有2次免費使用一鍵潛能更改第1,2條屬性機會。");
        }else if(selection == 7){
            typed1=6;
                cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎查看10000 贊助禮包簡介:\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#k贊助金額： #r"+cm.getHyPay(1)+"#k)\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##e#r贊助金額滿足10000#n#k\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/basic#\r\n#v2046074##t2046074# x4\r\n#v2046075##t2046075# x4\r\n#v2046149##t2046149# x4\r\n#v2049137##t2049137# x200\r\n#v2049119##t2049119# x200\r\n#v2049322##t2049322# x32\r\n#v2049750##t2049750# x8\r\n#v1112138##t1112138# x1\r\n#v1112245##t1112245# x1\r\n#v1112785##t1112785# x1\r\n#v1003696##t1003696# x1\r\n#v3700069##t3700069# x1\r\n#v3010507##t3010507# x1\r\n#v3010696##t3010696# x1\r\n#v3010492##t3010492# x1\r\n#v3010519##t3010519# x1\r\n#v1122122##t1122122# x4\r\n#v1112915##t1112915# x5\r\n#v1672027##t1672027# x1\r\n#v1003797#150裝備隨機 x2\r\n#v1132176#150暴君隨機 x2\r\n#v1472214#150武器隨機 x2\r\n#v1132246#最高級培羅德首飾隨機 x2\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[年終贊助禮包]點擊#r10000#b  贊助禮包領取#l\r\n\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：贊助禮包每日24點重置。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：該活動與2013/12/30 - 2014/01/04結束。\r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##b註：擁有2次免費使用一鍵潛能更改第1,2,3條屬性機會。");
        }
        }
        } else if (status == 3) {
        if (typed1 == 1) {
        if (selection == 2) {
           if(cm.getEventCount("100贊助") == 0){
           if(cm.getHyPay(1) < 100 && (cm.getSpace(1) < 7||cm.getSpace(2) < 7||cm.getSpace(3) < 7||cm.getSpace(4) < 7)){
            cm.sendOk("請確認賬號餘額是否達到100贊助金額\r\n請確認裝備背包欄至少空出7格以上位置\r\n請確認消耗背包欄至少空出7格以上位置\r\n請確認其它背包欄至少空出7格以上位置\r\n請確認設置背包欄至少空出7格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(100) > 0){
            cm.gainNX(100 * 3000);
                cm.gainItem(2431987,1);//週年慶50%卷軸箱
                cm.gainItem(2049122,5);//正向混沌卷軸 不可交易 50%
                cm.gainItem(2049116,5);//強化混沌卷軸 60%
                cm.gainItem(2049322,1);//5星裝備強化卷軸 30%
                cm.gainItem(2049752,2);//S級潛能附加卷軸 30%
                cm.gainItem(3010659,1);//冒險巴士站椅子
                cm.gainItem(3010608,1);//完美的名畫椅子
                cm.gainItem(1142346,1);//奪旗得分手勳章
                cm.gainItem(1112141,1);//紅玫瑰名片戒指
                cm.setEventCount("100贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[年終禮包] 玩家 "+ cm.getChar().getName() +" 領取了年終100贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("出現錯誤，請反饋給管理員！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過100贊助禮包。");
                cm.dispose();
           }
        }
        }
        if (typed1 == 2) {
        if (selection == 2) {
           if(cm.getEventCount("500贊助") == 0){
           if(cm.getHyPay(1) < 500 && (cm.getSpace(1) < 7||cm.getSpace(2) < 7||cm.getSpace(3) < 7||cm.getSpace(4) < 7)){
            cm.sendOk("請確認賬號餘額是否達到500贊助金額\r\n請確認裝備背包欄至少空出7格以上位置\r\n請確認消耗背包欄至少空出7格以上位置\r\n請確認其它背包欄至少空出7格以上位置\r\n請確認設置背包欄至少空出7格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(500) > 0){
            cm.gainNX(500 * 3000);
                cm.gainItem(2431987,2);//週年慶50%卷軸箱 
                cm.gainItem(2049122,25);//正向混沌卷軸 不可交易 50%
                cm.gainItem(2049116,25);//強化混沌卷軸 60%
                cm.gainItem(2049322,2);//5星裝備強化卷軸 30%
                cm.gainItem(2049751,2);//S級潛能附加卷軸 60%
                cm.gainItem(3010590,1);//酸甜點心椅子
                cm.gainItem(3010606,1);//未上色的名畫椅子
                cm.gainItem(1142347,1);//奪旗護旗手勳章
                cm.gainItem(1112151,1);//美味蛋糕名片戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(2431988,1);//150裝備箱
                cm.gainItem(3994417,1);//紅色蠟筆
                cm.setEventCount("500贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[年終禮包] 玩家 "+ cm.getChar().getName() +" 領取了年終500贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("出現錯誤，請反饋給管理員！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過500贊助禮包。");
                cm.dispose();
           }
        }
        }
        if (typed1 == 3) {
        if (selection == 2) {
           if(cm.getEventCount("1000贊助") == 0){
           if(cm.getHyPay(1) < 1000 && (cm.getSpace(1) < 7||cm.getSpace(2) < 7||cm.getSpace(3) < 7||cm.getSpace(4) < 7)){
            cm.sendOk("請確認賬號餘額是否達到1000贊助金額\r\n請確認裝備背包欄至少空出7格以上位置\r\n請確認消耗背包欄至少空出7格以上位置\r\n請確認其它背包欄至少空出7格以上位置\r\n請確認設置背包欄至少空出7格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(1000) > 0){
            cm.gainNX(1000 * 3000);
                cm.gainItem(2431990,1);//週年慶100%卷軸箱 
                cm.gainItem(2049122,50);//正向混沌卷軸 不可交易 50%
                cm.gainItem(2049116,50);//強化混沌卷軸 60%
                cm.gainItem(2049322,4);//5星裝備強化卷軸 30%
                cm.gainItem(2049750,2);//S級潛能附加卷軸 80%
                cm.gainItem(3010494,1);//TV椅子
                cm.gainItem(3010661,1);//歡樂相框椅子
                cm.gainItem(1142348,1);//奪旗獵殺手勳章
                cm.gainItem(1112150,1);//天使降臨名片戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(2431991,1);//真*覺醒的冒險之心箱
                cm.gainItem(2431992,1);//150暴君箱
                cm.gainItem(2431988,1);//150裝備箱
                cm.gainItem(3994417,2);//紅色蠟筆
                cm.setEventCount("1000贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[年終禮包] 玩家 "+ cm.getChar().getName() +" 領取了年終1000贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("出現錯誤，請反饋給管理員！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過1000贊助禮包。");
                cm.dispose();
           }
        }
        }
        if (typed1 == 4) {
        if (selection == 2) {
           if(cm.getEventCount("3000贊助") == 0){
           if(cm.getHyPay(1) < 3000 && (cm.getSpace(1) < 7||cm.getSpace(2) < 7||cm.getSpace(3) < 7||cm.getSpace(4) < 7)){
            cm.sendOk("請確認賬號餘額是否達到3000贊助金額\r\n請確認裝備背包欄至少空出7格以上位置\r\n請確認消耗背包欄至少空出7格以上位置\r\n請確認其它背包欄至少空出7格以上位置\r\n請確認設置背包欄至少空出7格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(3000) > 0){
            cm.gainNX(3000 * 3000);
                cm.gainItem(2431990,2);//週年慶100%卷軸箱 
                cm.gainItem(2049137,50);//驚人正義混沌卷軸 不可交易 40%
                cm.gainItem(2049119,50);//驚人強化混沌卷軸 60%
                cm.gainItem(2049322,8);//5星裝備強化卷軸 30%
                cm.gainItem(2049750,4);//S級潛能附加卷軸 80%
                cm.gainItem(1112140,1);//白銀VIP名片戒指
                cm.gainItem(1112247,1);//白銀VIP聊天戒指
                cm.gainItem(1112787,1);//白銀VIP戒指
                cm.gainItem(1003698,1);//白銀VIP專用王冠
                cm.gainItem(3700071,1);//白銀VIP的專屬稱號。
                cm.gainItem(3010509,1);//白銀VIP的祝福
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1672027,1);//極真鋰心臟
                cm.gainItem(2431991,2);//真*覺醒的冒險之心箱
                cm.gainItem(2431992,1);//150暴君箱
                cm.gainItem(2431988,1);//150裝備箱
                cm.gainItem(2431989,1);//150武器箱
                cm.gainItem(3010070,1);//巨無霸皮卡啾椅子
                cm.gainItem(3010670,1);//絕對指環王椅子
                cm.gainItem(3010621,1);//蛤蟆仙人椅子
                cm.gainItem(3994417,1);//紅色蠟筆
                cm.gainItem(3994418,1);//橙色蠟筆
                cm.setEventCount("3000贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[年終禮包] 玩家 "+ cm.getChar().getName() +" 領取了年終3000贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("出現錯誤，請反饋給管理員！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過3000贊助禮包。");
                cm.dispose();
           }
        }
        }
        if (typed1 == 5) {
        if (selection == 2) {
        if(cm.getEventCount("6000贊助") == 0){
           if(cm.getHyPay(1) < 6000 && (cm.getSpace(1) < 7||cm.getSpace(2) < 7||cm.getSpace(3) < 7||cm.getSpace(4) < 7)){
            cm.sendOk("請確認賬號餘額是否達到6000贊助金額\r\n請確認裝備背包欄至少空出7格以上位置\r\n請確認消耗背包欄至少空出7格以上位置\r\n請確認其它背包欄至少空出7格以上位置\r\n請確認設置背包欄至少空出7格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(6000) > 0){
            cm.gainNX(6000 * 3000);
                cm.gainItem(2431994,2);//祥龍99%卷軸箱 
                cm.gainItem(2049137,100);//驚人正義混沌卷軸 不可交易 40%
                cm.gainItem(2049119,100);//驚人強化混沌卷軸 60%
                cm.gainItem(2049322,16);//5星裝備強化卷軸 30%
                cm.gainItem(2049750,6);//S級潛能附加卷軸 80%
                cm.gainItem(1112139,1);//黃金VIP名片戒指
                cm.gainItem(1112246,1);//黃金VIP聊天戒指
                cm.gainItem(1112786,1);//黃金VIP戒指
                cm.gainItem(1003697,1);//黃金VIP專用王冠
                cm.gainItem(3700070,1);//黃金VIP的專屬稱號。
                cm.gainItem(3010508,1);//黃金VIP的祝福
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1672027,1);//極真鋰心臟
                cm.gainItem(2431991,3);//真*覺醒的冒險之心箱
                cm.gainItem(2431992,1);//150暴君箱
                cm.gainItem(2431988,1);//150裝備箱
                cm.gainItem(2431989,1);//150武器箱
                cm.gainItem(2431993,1);//最高級培羅德首飾箱
                cm.gainItem(3010658,1);//夏日西瓜冰椅子
                cm.gainItem(3010594,1);//藍莓蛋糕椅子
                cm.gainItem(3010520,1);//巨大企鵝王椅子
                cm.gainItem(3994417,2);//紅色蠟筆
                cm.gainItem(3994418,2);//橙色蠟筆
                cm.setEventCount("6000贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[年終禮包] 玩家 "+ cm.getChar().getName() +" 領取了年終6000贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("出現錯誤，請反饋給管理員！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過6000贊助禮包。");
                cm.dispose();
           }
        }
        }
        if (typed1 == 6) {
        if (selection == 2) {
        if(cm.getEventCount("10000贊助") == 0){
           if(cm.getHyPay(1) < 10000 && (cm.getSpace(1) < 7||cm.getSpace(2) < 7||cm.getSpace(3) < 7||cm.getSpace(4) < 7)){
            cm.sendOk("請確認賬號餘額是否達到10000贊助金額\r\n請確認裝備背包欄至少空出7格以上位置\r\n請確認消耗背包欄至少空出7格以上位置\r\n請確認其它背包欄至少空出7格以上位置\r\n請確認設置背包欄至少空出7格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(10000) > 0){
            cm.gainNX(10000 * 3000);
                cm.gainItem(2431994,4);//祥龍99%卷軸箱 
                cm.gainItem(2049137,200);//驚人正義混沌卷軸 不可交易 40%
                cm.gainItem(2049119,200);//驚人強化混沌卷軸 60%
                cm.gainItem(2049322,32);//5星裝備強化卷軸 30%
                cm.gainItem(2049750,8);//S級潛能附加卷軸 80%
                cm.gainItem(1112138,1);//鑽石VIP名片戒指
                cm.gainItem(1112245,1);//鑽石VIP聊天戒指
                cm.gainItem(1112785,1);//鑽石VIP戒指
                cm.gainItem(1003696,1);//鑽石VIP專用王冠
                cm.gainItem(3700069,1);//鑽石VIP的專屬稱號。
                cm.gainItem(3010507,1);//鑽石VIP的祝福
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1112915,1);//藍調戒指
                cm.gainItem(1672027,1);//極真鋰心臟
                cm.gainItem(2431991,4);//真*覺醒的冒險之心箱
                cm.gainItem(2431992,2);//150暴君箱
                cm.gainItem(2431988,2);//150裝備箱
                cm.gainItem(2431989,2);//150武器箱
                cm.gainItem(2431993,2);//最高級培羅德首飾箱
                cm.gainItem(3010696,1);//大黃鴨
                cm.gainItem(3010492,1);//首腦椅子
                cm.gainItem(3010519,1);//巨大雪人王椅子
                cm.gainItem(3994417,2);//紅色蠟筆
                cm.gainItem(3994418,2);//橙色蠟筆
                cm.gainItem(3994419,2);//黃色蠟筆
                cm.setEventCount("10000贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[年終禮包] 玩家 "+ cm.getChar().getName() +" 領取了年終10000贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("出現錯誤，請反饋給管理員！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過10000贊助禮包。");
                cm.dispose();
           }
        }
        }
       }
      }
}
