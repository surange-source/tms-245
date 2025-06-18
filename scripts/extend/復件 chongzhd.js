var status = 0;
var typed=0;
var random = 0;

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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，歡迎來到儲值禮包活動:\r\n達到一定購買額度你可以獲得大禮包一份\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#賬號目前(餘額:#r"+cm.getHyPay(1)+"#k):\r\n#b#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[活動]購買禮包        (#k目前狀態:#r儲值活動#k#b)#k#l\r\n ");
        } else if (status == 1) {
            if (selection == 1) {
            cm.dispose();
            cm.openNpc(9900004,"chongz7");    
            } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9900001,3001);    
            } else if (selection == 3) {
            if(cm.haveItem(4032521,1)){
            cm.sendOk("您已經辦理了傳奇理財,無需重複辦理,謝謝!!!");
            cm.dispose();
            } else {
                    cm.sendYesNo("您是否要花費#r 1200 #k元的儲值金額辦理#b 年卡理財 #k。");
            typed = 3;
            }
            } else if (selection == 4) {
            if(cm.haveItem(4032521,1) && cm.getSpace(5) > 2 && cm.getPQLog("理財雙倍") == 0){
            cm.gainItem(5210004,1,1); //雙倍經驗卡 晚 1天權
            cm.gainItem(5210002,1,1); //雙倍經驗卡 白 1天權
            cm.setPQLog("理財雙倍");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日雙倍經驗卡。");
            cm.dispose();
            } else {
                    cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。\r\n請確認您的特殊背包欄是否空餘2個位置。");
            cm.dispose();
            }
            } else if (selection == 5) {
            if(cm.haveItem(4032521,1) && cm.getSpace(5) > 2 && cm.getPQLog("理財雙爆") == 0){
            cm.gainItem(5360015,1,1); //雙倍爆率卡 1天權
            cm.setPQLog("理財雙爆");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日雙倍爆率卡。");
            cm.dispose();
            } else {
                    cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。\r\n請確認您的特殊背包欄是否空餘2個位置。");
            cm.dispose();
            }
            } else if (selection == 6) {
            if(cm.haveItem(4001753,1) && cm.haveItem(4032521,1)){
            cm.resetEventCount("抽獎");
            cm.resetEventCount("歷練");
            cm.resetEventCount("養成");
            cm.resetEventCount("皇陵");
            cm.resetEventCount("羅朱");
            cm.resetEventCount("海盜");
            cm.resetEventCount("鬼節");
            cm.gainItem(4001753,-1);
            cm.sendOk("日常活動任務已經全部重置");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財重置了全部日常活動任務。");
            cm.dispose();
            }else{
            cm.sendOk("請確認您是否辦理了傳奇理財。\r\n請確認是否擁有#v4001753#日常任務重置物品。");
            cm.dispose();
            }
            } else if (selection == 7) {
            if(cm.haveItem(4032521,1) && cm.getSpace(5) > 2 && cm.getPQLog("理財方塊") == 0){
            cm.gainItem(5062002,3); //高級神奇方塊 x3
            cm.gainItem(5062000,6); //高級神奇方塊 x6
            cm.setPQLog("理財方塊");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日大量神奇方塊。");
            cm.dispose();
            }else{
            cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。\r\n請確認您的特殊背包欄是否空餘2個位置。");
            cm.dispose();
            }
            } else if (selection == 8) {
            if(cm.haveItem(4032521,1) && cm.getSpace(2) > 2 && cm.getPQLog("理財卷軸") == 0){
            random = java.lang.Math.floor(Math.random() * 5);
            cm.gainItem(4001254,-1);
            cm.gainItem(2049116,2); //強化混沌捲走 x2
            if(random > 3){
            cm.gainItem(2049122,1); //正向混沌卷軸 x1
            }
            cm.setPQLog("理財卷軸");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日大量卷軸。");
            cm.dispose();
            }else{
            cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。\r\n請確認您的消耗背包欄是否空餘2個位置。");
            cm.dispose();
            }
            } else if (selection == 9) {
            if(cm.haveItem(4032521,1) && cm.getPQLog("理財積分") == 0){
            cm.gainPlayerPoints(180); //積分值
            cm.setPQLog("理財積分");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日大量積分值。");
            cm.dispose();
            }else{
            cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。");
            cm.dispose();
            }
            } else if (selection == 10) {
            if(cm.haveItem(4032521,1) && cm.getPQLog("理財活力") == 0){
            cm.gainPlayerEnergy(50); //活力值
            cm.setPQLog("理財活力");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日大量活力值。");
            cm.dispose();
            }else{
            cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。");
            cm.dispose();
            }
            } else if (selection == 11) {
            if(cm.haveItem(4032521,1) && cm.getPQLog("理財抽獎") == 0){
            cm.gainItem(2430069,1); //理財抽獎禮包
            cm.setPQLog("理財抽獎");
            cm.sendOk("請注意查收！");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財領取了每日理財抽獎禮包。");
            cm.dispose();
            }else{
            cm.sendOk("請確認您今天是否已經領取。\r\n請確認您是否辦理了傳奇理財。");
            cm.dispose();
            }
            }
            } else if (status == 2) {
            if(typed == 1){
                    if (cm.getHyPay(1) < 30) {
                    cm.sendNext("您儲值金額不足 30 元。");
                    } else if (cm.addHyPay(30) > 0) {
            cm.gainNX(90000);
            cm.gainNX(-90000);
            cm.gainItem(4001753,2); //日常重置物品
            cm.gainItem(4032521,1,7); //理財憑證
            cm.gainItem(1142145,1,7); //VIP勳章 10G
            cm.sendOk("成功辦理了周卡理財。\r\n#v4032521##b理財憑證 #v1142145#理財勳章 #v4001753#日常重置物品。\r\n#r註：請保留好以上物品...");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財辦理了傳奇理財周卡系列。");
            } else {
            cm.sendOk("辦理傳奇理財出現錯誤，請反饋給管理員！");
            }
                        cm.dispose();
            }
            if(typed == 2){
                    if (cm.getHyPay(1) < 120) {
                    cm.sendNext("您儲值金額不足 120 元。");
                    } else if (cm.addHyPay(120) > 0) {
            cm.gainNX(360000);
            cm.gainNX(-360000);
            cm.gainItem(4001753,8); //日常重置物品
            cm.gainItem(4032521,1,30); //理財憑證
            cm.gainItem(1142145,1,30); //VIP勳章 10G
            cm.sendOk("成功辦理了月卡理財。\r\n#v4032521##b理財憑證 #v1142145#理財勳章 #v4001753#日常重置物品。\r\n#r註：請保留好以上物品...");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財辦理了傳奇理財月卡系列。");
            } else {
            cm.sendOk("辦理傳奇理財出現錯誤，請反饋給管理員！");
            }
                        cm.dispose();
            }
            if(typed == 3){
                    if (cm.getHyPay(1) < 1200) {
                    cm.sendNext("您儲值金額不足 1200 元。");
                    } else if (cm.addHyPay(1200) > 0) {
            cm.gainNX(3600000);
            cm.gainNX(-3600000);
            cm.gainItem(4001753,96); //日常重置物品
            cm.gainItem(4032521,1,365); //理財憑證
            cm.gainItem(1142145,1,365); //VIP勳章 10G
            cm.sendOk("成功辦理了年卡理財。\r\n#v4032521##b理財憑證 #v1142145#理財勳章 #v4001753#日常重置物品。\r\n#r註：請保留好以上物品...");
            cm.worldSpouseMessage(0x20,"[傳奇理財] 玩家 "+ cm.getChar().getName() +" 在傳奇理財辦理了傳奇理財年卡系列。");
            } else {
            cm.sendOk("辦理傳奇理財出現錯誤，請反饋給管理員！");
            }
                        cm.dispose();
            }
      }
     }
}