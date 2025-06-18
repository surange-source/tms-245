var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
            cm.dispose();
        } else if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,歡迎來到年終儲值禮包活動:\r\n  達到一定贊助額度你可以獲得大禮包一份\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前 (#r聯繫客服獲取儲值禮包#k)#b\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n";
        //#L7##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r50#b贊助禮包#l\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r100#b  贊助禮包#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看  #r500#b  贊助禮包#l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r1000#b 贊助禮包#l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r3000#b 贊助禮包#l\r\n#L6##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[新年贊助禮包]查看#r6000#b 贊助禮包#l\r\n\r\n   #r#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#註：點擊領取後自動把餘額轉換為樂豆點";
        selStr += "#L0#" + eff + "#b查看#k#r50元#k   #b購買禮包    [內大量道具+#k#r15#k#b萬樂豆點]#k#l\r\n";
        selStr += "#L1#" + eff + "#b查看#k#r100元#k  #b購買禮包    [內大量道具+#k#r30#k#b萬樂豆點]#k#l\r\n";
        selStr += "#L2#" + eff + "#b查看#k#r300元#k  #b購買禮包    [內大量道具+#k#r150#k#b萬樂豆點]#k#l\r\n";
        selStr += "#L3#" + eff + "#b查看#k#r500元#k  #b購買禮包    [內大量道具+#k#r300#k#b萬樂豆點]#k#l\r\n";
        selStr += "#L4#" + eff + "#b查看#k#r1000元#k #b購買禮包    [內大量道具+#k#r600#k#b萬樂豆點]#k#l\r\n";
        selStr += "#L5#" + eff + "#b查看#k#r3000元#k #b購買禮包    [內大量道具+#k#r1800#k#b萬樂豆點]#k#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
        if(cm.getEventCount("50贊助") == 0){
           if(cm.getHyPay(1) < 5000 && (cm.getSpace(1) < 4||cm.getSpace(2) < 4||cm.getSpace(3) < 4||cm.getSpace(4) < 4)){
            cm.sendOk("請確認賬號餘額是否達到50贊助金額\r\n請確認裝備背包欄至少空出4格以上位置\r\n請確認消耗背包欄至少空出4格以上位置\r\n請確認其它背包欄至少空出4格以上位置\r\n請確認設置背包欄至少空出4格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(5000) > 0){
                cm.gainNX(150000);
                cm.gainItem(2431987,1);//週年慶50%卷軸箱子 代碼測試
                cm.gainItem(2049124,2);//正向混沌卷軸X2
                cm.gainItem(2049116,2);//強化混沌卷軸X2
                cm.gainItem(2049313,1);//5星裝備強化卷軸X1
                cm.gainItem(2049752,1);//S級潛能卷軸 30% X1
                cm.setEventCount("50贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[贊助禮包] 玩家 "+ cm.getChar().getName() +" 領取了50贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("儲值餘額不足,請儲值後領取！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過50贊助禮包。");
                cm.dispose();
           }
            break;
        case 1:
        if(cm.getEventCount("100贊助") == 0){
           if(cm.getHyPay(1) < 10000 && (cm.getSpace(1) < 9||cm.getSpace(2) < 9 ||cm.getSpace(3) < 9 ||cm.getSpace(4) < 9 )){
            cm.sendOk("請確認賬號餘額是否達到100贊助金額\r\n請確認裝備背包欄至少空出9格以上位置\r\n請確認消耗背包欄至少空出9格以上位置\r\n請確認其它背包欄至少空出9格以上位置\r\n請確認設置背包欄至少空出9格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(10000) > 0){
                cm.gainNX(300000);
                cm.gainItem(2431987,2);//週年慶50%卷軸箱子 代碼測試
                cm.gainItem(2049124,5);//正向混沌卷軸X2
                cm.gainItem(2049116,5);//強化混沌卷軸X2
                cm.gainItem(2049313,1);//5星裝備強化卷軸X1
                cm.gainItem(2049752,2);//S級潛能卷軸 30% X1
                cm.gainItem(3010659,1);//巴士車站椅子 X1
                cm.gainItem(3010608,1);//完美的名畫椅子X1
                cm.gainItem(1142178,1);//楓之谷形象大使X1
                cm.gainItem(2431988,1);//戒指名片箱子 X1 
                cm.setEventCount("100贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[贊助禮包] 玩家 "+ cm.getChar().getName() +" 領取了100贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("儲值餘額不足,請儲值後領取！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過100贊助禮包。");
                cm.dispose();
           }
            break;
        case 2:
        if(cm.getEventCount("300贊助") == 0){
           if(cm.getHyPay(1) < 50000 && (cm.getSpace(1) < 12||cm.getSpace(2) < 12 ||cm.getSpace(3) < 12 ||cm.getSpace(4) < 12 )){
            cm.sendOk("請確認賬號餘額是否達到300贊助金額\r\n請確認裝備背包欄至少空出12格以上位置\r\n請確認消耗背包欄至少空出12格以上位置\r\n請確認其它背包欄至少空出12格以上位置\r\n請確認設置背包欄至少空出12格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(50000) > 0){
                cm.gainNX(1500000);
                cm.gainItem(2431987,4);//週年慶50%卷軸箱子 代碼測試
                cm.gainItem(2049124,5);//正向混沌卷軸X2
                cm.gainItem(2049116,5);//強化混沌卷軸X2
                cm.gainItem(2049313,1);//5星裝備強化卷軸X1
                cm.gainItem(2049752,2);//S級潛能卷軸 30% X1
                cm.gainItem(3010659,1);//巴士車站椅子 X1
                cm.gainItem(3010608,1);//完美的名畫椅子X1
                cm.gainItem(3010590,1);//酸甜點心椅子X1
                cm.gainItem(1142178,1);//楓之谷形象大使X1
                cm.gainItem(1112915,1);//藍調戒指X1
                cm.gainItem(2431988,1);//150隨機裝備箱子X1
                cm.setEventCount("300贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[贊助禮包] 玩家 "+ cm.getChar().getName() +" 領取了300贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("儲值餘額不足,請儲值後領取！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過300贊助禮包。");
                cm.dispose();
           }
            break;
        case 3://儲值網站
        if(cm.getEventCount("500贊助") == 0){
           if(cm.getHyPay(1) < 100000 && (cm.getSpace(1) < 15||cm.getSpace(2) < 15 ||cm.getSpace(3) < 15 ||cm.getSpace(4) < 15 )){
            cm.sendOk("請確認賬號餘額是否達到500贊助金額\r\n請確認裝備背包欄至少空出15格以上位置\r\n請確認消耗背包欄至少空出15格以上位置\r\n請確認其它背包欄至少空出15格以上位置\r\n請確認設置背包欄至少空出15格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(100000) > 0){
                cm.gainNX(3000000);
                cm.gainItem(2431990,3);//週年慶100%卷軸箱子 代碼測試
                cm.gainItem(2049124,50);//正向混沌卷軸X2
                cm.gainItem(2049116,50);//強化混沌卷軸X2
                cm.gainItem(2049313,4);//5星裝備強化卷軸X1
                cm.gainItem(2049752,2);//S級潛能卷軸 30% X1
                cm.gainItem(3010661,1);//歡樂相框椅子 X1
                cm.gainItem(3010608,1);//完美的名畫椅子X1
                cm.gainItem(3010590,1);//酸甜點心椅子X1
                cm.gainItem(1142179,1);//王座收藏家勳章X1
                cm.gainItem(1142178,1);//楓之谷形象大使X1
                cm.gainItem(1112915,2);//藍調戒指X1
                cm.gainItem(2431988,1);//150隨機裝備箱子X1
                cm.gainItem(2431991,1);//150隨機裝備箱子X1
                cm.gainItem(2431992,1);//150隨機裝備箱子X1
                cm.gainItem(2431995,1);//150隨機裝備箱子X1
                cm.setEventCount("500贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[贊助禮包] 玩家 "+ cm.getChar().getName() +" 領取了500贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("儲值餘額不足,請儲值後領取！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過500贊助禮包。");
                cm.dispose();
           }
            break;
        case 4://管理僱傭商店
        if(cm.getEventCount("1000贊助") == 0){
           if(cm.getHyPay(1) < 300000 && (cm.getSpace(1) < 23||cm.getSpace(2) < 23 ||cm.getSpace(3) < 23 ||cm.getSpace(4) < 23 )){
            cm.sendOk("請確認賬號餘額是否達到1000贊助金額\r\n請確認裝備背包欄至少空出23格以上位置\r\n請確認消耗背包欄至少空出23格以上位置\r\n請確認其它背包欄至少空出23格以上位置\r\n請確認設置背包欄至少空出23格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(300000) > 0){
                cm.gainNX(9000000);
                cm.gainItem(2431990,5);//週年慶100%卷軸箱子 代碼測試
                cm.gainItem(2049137,50);//週年慶100%卷軸箱子 代碼測試
                cm.gainItem(2049142,50);//正向混沌卷軸X2
                cm.gainItem(2049116,50);//強化混沌卷軸X2
                cm.gainItem(2049313,8);//5星裝備強化卷軸X1
                cm.gainItem(2049752,4);//S級潛能卷軸 30% X1
                cm.gainItem(1112140,1);//S級潛能卷軸 30% X1
                cm.gainItem(1112787,1);//S級潛能卷軸 30% X1
                cm.gainItem(1003698,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010509,1);//S級潛能卷軸 30% X1
                cm.gainItem(3700071,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010621,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010670,1);//S級潛能卷軸 30% X1
                cm.gainItem(2431991,2);//S級潛能卷軸 30% X1
                cm.gainItem(3010661,1);//歡樂相框椅子 X1
                cm.gainItem(3010608,1);//完美的名畫椅子X1
                cm.gainItem(3010590,1);//酸甜點心椅子X1
                cm.gainItem(1142179,1);//王座收藏家勳章X1
                cm.gainItem(1112915,3);//藍調戒指X1
                cm.gainItem(2431988,1);//150隨機裝備箱子X1
                cm.gainItem(2431991,1);//150隨機裝備箱子X1
                cm.gainItem(2431992,1);//150隨機裝備箱子X1
                cm.gainItem(2431995,2);//150隨機裝備箱子X1
                cm.setEventCount("1000贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[贊助禮包] 玩家 "+ cm.getChar().getName() +" 領取了1000贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("儲值餘額不足,請儲值後領取！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過1000贊助禮包。");
                cm.dispose();
           }
            break;
        case 5://累積儲值
        if(cm.getEventCount("3000贊助") == 0){
           if(cm.getHyPay(1) < 600000 && (cm.getSpace(1) < 23||cm.getSpace(2) < 23 ||cm.getSpace(3) < 23 ||cm.getSpace(4) < 23 )){
            cm.sendOk("請確認賬號餘額是否達到3000贊助金額\r\n請確認裝備背包欄至少空出23格以上位置\r\n請確認消耗背包欄至少空出23格以上位置\r\n請確認其它背包欄至少空出23格以上位置\r\n請確認設置背包欄至少空出23格以上位置");
                cm.dispose();
           }else if(cm.addHyPay(600000) > 0){
                cm.gainNX(18000000);
                cm.gainItem(2431994,5);//
                cm.gainItem(2049137,100);//週年慶100%卷軸箱子 代碼測試
                cm.gainItem(2049142,100);//正向混沌卷軸X2
                cm.gainItem(2049116,100);//強化混沌卷軸X2
                cm.gainItem(2049313,16);//5星裝備強化卷軸X1
                cm.gainItem(2049752,6);//S級潛能卷軸 30% X1
                cm.gainItem(1112139,1);//S級潛能卷軸 30% X1
                cm.gainItem(1112246,1);//S級潛能卷軸 30% X1
                cm.gainItem(1112786,1);//S級潛能卷軸 30% X1
                cm.gainItem(1003697,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010508,1);//S級潛能卷軸 30% X1
                cm.gainItem(3700070,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010658,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010594,1);//S級潛能卷軸 30% X1
                cm.gainItem(3010520,1);//歡樂相框椅子 X1
                cm.gainItem(2431991,3);//完美的名畫椅子X1
                cm.gainItem(1672027,1);//酸甜點心椅子X1
                cm.gainItem(1142179,1);//王座收藏家勳章X1
                cm.gainItem(1112915,4);//藍調戒指X1
                cm.gainItem(2431988,1);//150隨機裝備箱子X1
                cm.gainItem(2431289,1);//150隨機裝備箱子X1
                cm.gainItem(2431992,1);//150隨機裝備箱子X1
                cm.gainItem(2431993,2);//150隨機裝備箱子X1
                cm.gainItem(2431995,5);//150隨機裝備箱子X1
                cm.setEventCount("3000贊助");
                 cm.sendOk("請注意查收。");
            cm.worldSpouseMessage(0x20,"[贊助禮包] 玩家 "+ cm.getChar().getName() +" 領取了3000贊助禮包。");
                cm.dispose();
             }else{
                 cm.sendOk("儲值餘額不足,請儲值後領取！");
                cm.dispose();
             }
           }else{
            cm.sendOk("該賬號今天已經領取過3000贊助禮包。");
                cm.dispose();
           }
            break;
            
    }
    }
}