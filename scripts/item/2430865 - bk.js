var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (im.getPQLog("白銀VIP",1)<0){
            var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n- #e#r隨身npc#k#n\r\n";
            selStr += "#d歡迎使用隨身特權,本次給您帶來快捷服務：#k\r\n";
            selStr += "#r#L0#"+z+" 每日楓幣#l  #L1#"+z+" 每日樂豆點#l  #L2#"+z+" 每日抽獎#l\r\n";
            selStr += "#L7#"+z+" 三倍經驗#l  #L8#"+z+" 領取雙爆#l  #L9#"+z+" 每日道具#l\r\n";
            selStr += "#L70#"+z+" 領取勳章,戒指#l   #L3#"+z+" vip勳章升級#l\r\n";
            selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        }else if(im.getPQLog("黃金VIP",1)<0){
            var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n- #e#r隨身npc#k#n\r\n";
                selStr += "#d歡迎使用隨身特權,本次給您帶來快捷服務：#k\r\n";
                selStr += "#r#L0#"+z+" 每日楓幣#l  #L1#"+z+" 免費樂豆點#l  #L2#"+z+" 每日抽獎#l\r\n";
                selStr += "#L7#"+z+" 三倍經驗#l  #L8#"+z+" 領取雙爆#l  #L9#"+z+" 每日道具#l\r\n";
                selStr += "#L4#"+z+" 副本重置[2]次#l  #b#L6#"+z+" 理財抽獎#l  #r#L11#"+z+" 每日里程#l\r\n";
                selStr += "#L23#"+z+" 免費自選美容美發#l\r\n";
                selStr += "#L70#"+z+" 領取勳章,戒指#l\r\n";
                selStr += "#L10086#"+z+" 會員洗血（惡魔復仇者除外）#l\r\n";
                //selStr += "#L71#"+z+" 清理技能#l\r\n";
                selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
       
        }else{
            im.dispose();
            var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n- #e#r隨身npc#k#n\r\n";
            selStr +="你不是VIP,請通過渠道來解決"+im.getPQLog("黃金VIP",1);
        }
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 70:
                if (im.getPQLog("白銀VIP",1)<0&&im.getDaysPQLog("白銀戒指", 30) == 0){
                    im.gainItem(1112140,1,30);
                    im.gainItem(1112247,1,30);
                    im.gainItem(1003698,1,30);
                    im.gainItem(1022229,1,30);
                    im.gainItem(3700071,1,30);
                    im.gainItem(1142328,1,30);
                    im.setPQLog("白銀戒指");
                    im.worldSpouseMessage(0x15,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取VIP勳章稱號。");
                    im.dispose();
                }else if(im.getPQLog("黃金VIP",1)<0&&im.getDaysPQLog("黃金戒指", 30) == 0){
                    im.gainItem(1112139,1,30);
                    im.gainItem(1112246,1,30);
                    im.gainItem(1003697,1,30);
                    im.gainItem(1022229,1,30);
                    im.gainItem(3700070,1,30);
                    im.gainItem(1142328,1,30);
                    im.setPQLog("黃金戒指");
                    im.worldSpouseMessage(0x15,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取VIP勳章稱號。");
                    im.dispose();
                }else{
                    im.sendOk("請30天後再來");
                }
                
                im.dispose();
            break;
            //-----------
        case 0:
           if (im.getPQLog("工資") < 1) { //工資
            if (im.getPQLog("白銀VIP",1)<0){
                    var ME= 5000000;
                }else if(im.getPQLog("黃金VIP",1)<0){
                    var ME= 10000000;
                }
                im.gainMeso(ME);
                im.setPQLog("工資");
                im.sendOk("恭喜您領取理財服務的每日工資"+ME+"萬楓幣.");
                im.worldSpouseMessage(0x15,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日楓幣。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 23:
                im.dispose();
        im.openNpc(9310362,"meir");
            break;
        case 1:
           if (im.getPQLog("樂豆點") < 1) { //樂豆點
                if (im.getPQLog("白銀VIP",1)<0){
                    var NX= 6666;
                }else if(im.getPQLog("黃金VIP",1)<0){
                    var NX= 9999;
                }
                im.gainNX(NX);
                im.setPQLog("樂豆點");
                im.sendOk("恭喜您領取樂豆點"+NX+"點.");
                im.worldSpouseMessage(0x15,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡免費領取每日樂豆點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經使用，請明日再試。\r\n");
                im.dispose();
            }
            break;
        case 10:
           if (im.getPlayer().getCSPoints(1) > 10000) { //會員等級
                im.dispose();
                im.openNpc(9900001,"addhp");
            } else {
                im.sendOk("您糊弄我呢。樂豆點不足還點什麼。最少得擁有1萬樂豆點才可以使用。");
                im.dispose();
            }
            break;
        case 7:
           if (im.getPQLog("三倍") < 1) { //三倍
                im.gainItem(5211060,1,1);
                im.setPQLog("三倍");
                im.sendOk("恭喜您領取理財服務的每日三倍經驗卡一張.");
                im.worldSpouseMessage(0x11,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日三倍經驗卡。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 8:
           if (im.getPQLog("雙爆") < 1) { //雙爆
                im.gainItem(5360015,1,1);
                im.setPQLog("雙爆");
                im.sendOk("恭喜您領取理財服務的每日雙倍爆率卡一張.");
                im.worldSpouseMessage(0x11,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日雙倍爆率卡。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 9:
           if (im.getPQLog("方塊") < 1&&im.getSpace(2)>2){ //方塊
            if (im.getPQLog("白銀VIP",1)<0){
                    im.gainItem(5064000,3);
                    im.gainItem(2049116,3);
                    im.gainItem(5062024,2);
                    im.gainItem(5062500,10);
                    im.gainItem(5062009,15);
                    im.gainItem(2048705,5);
                    im.gainItem(4310036,70);
                    im.gainItem(2210097,1);
                    im.gainItem(2210096,1);
                    im.gainItem(5390013,15);
                }else if(im.getPQLog("黃金VIP",1)<0){
                    im.gainItem(5064000,5);
                    im.gainItem(2049116,5);
                    im.gainItem(5062024,5);
                    im.gainItem(5062500,15);
                    im.gainItem(5062009,20);
                    im.gainItem(2048705,10);
                    im.gainItem(4310036,80);
                    im.gainItem(2210097,1);
                    im.gainItem(2210096,1);
                    im.gainItem(5390012,15);
                }
                im.setPQLog("方塊");
                im.sendOk("恭喜您領取理財服務的每日理財道具，獲得超級神奇方塊、大師級神奇方塊、六角方塊、涅槃火焰、防暴捲軸。");
                im.worldSpouseMessage(0x15,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日理財道具,超級神奇方塊、大師級神奇方塊、六角方塊、涅槃火焰、防暴捲軸。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n#r2。消耗欄至少要有3格");
                im.dispose();
            }
            break;
        case 11:
           if (im.getPQLog("里程") < 1 && im.getPlayerPoints() > 180) { //里程
                im.gainPlayerPoints(200);
                im.setPQLog("積分");
                im.sendOk("恭喜您領取理財服務的每日積分200點.");
                im.worldSpouseMessage(0x20,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日積分 200 點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線時間不足180分鐘。");
                im.dispose();
            }
            break;
        case 12:
           if (im.getPQLog("活力") < 1 && im.getPlayerPoints() > 180) { //活力
                im.gainPlayerEnergy(50);
                im.gainPlayerPoints(-180);
                im.setPQLog("活力");
                im.sendOk("恭喜您領取理財服務的每日活力50點.");
                im.worldSpouseMessage(0x20,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日活力 50 點。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線積分不足180點。");
                im.dispose();
            }
            break;
        case 2:
           if (im.getPQLog("抽獎") < 1) { //抽獎
                im.gainItem(2430070,1,1);
                im.setPQLog("抽獎");
                im.sendOk("恭喜您領取理財服務的每日抽獎包.");
                im.worldSpouseMessage(0x11,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日抽獎包一個。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). 您當前在線積分不足1000點。");
                im.dispose();
            }
            break;
        case 4:
           if (im.getPQLog("所有副本重置") < 2) { //副本重置
                im.resetEventCount("抽獎");
                im.resetEventCount("歷練");
                im.resetEventCount("養成");
                im.resetEventCount("皇陵");
                im.resetEventCount("羅朱");
                im.resetEventCount("海盜");
                im.resetEventCount("森蘭丸[困難]");
                im.resetEventCount("森蘭丸");
                im.resetPQLog("貝勒·德");
                im.resetPQLog("阿卡伊農[普通]");
                im.resetPQLog("普通殘暴炎魔");
                im.resetPQLog("簡單殘暴炎魔");
                im.resetPQLog("進階殘暴炎魔");
                im.resetPQLog("女皇：西格諾斯");
                im.resetPQLog("闇黑龍王");
                im.resetPQLog("進階闇黑龍王");
                im.resetPQLog("希拉");
                im.resetPQLog("希拉[困難]");
                im.resetPQLog("妖精女王：艾菲尼婭");
                im.resetPQLog("獅子王:凡雷恩[簡單]");
                im.resetPQLog("獅子王:凡雷恩[普通]");
                im.resetPQLog("黃金寺院");
                im.resetPQLog("混沌皮卡啾");
                im.resetPQLog("皮卡啾");
                im.resetPQLog("強化鑽機");
                im.resetPQLog("鑽機");
                im.setPQLog("所有副本重置");
                im.sendOk("恭喜您使用理財服務的重置了[貝勒·德\阿卡伊農[普通]\殘暴炎魔\女皇：西格諾斯\闇黑龍王\進階闇黑龍王\希拉\希拉[困難]\妖精女王：艾菲尼婭\獅子王:凡雷恩[簡單]\獅子王:凡雷恩[普通]\黃金寺院\混沌皮卡啾\強化鑽機\皮卡啾\鑽機].");
                im.worldSpouseMessage(0x26,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡重置了全部副本任務。");
                im.dispose();
            } else {
                im.sendOk("您已經領取過，請明日再領。");
                im.dispose();
            }
            break;
        case 6:
                im.dispose();
                im.openNpc(2084001, "licaixiangzi");
            break;
        case 999:
                im.dispose();
                im.openNpc(9030100, 0);
            break;
        case 3:
                im.dispose();
                im.openNpc(1530635, "VIPjs");           
            break;
        case 13:
            if (im.getMeso() > 10000) { //地圖傳送
                im.dispose();
                im.sendOk("近期開放。");
            } else {
                im.sendOk("楓幣不足1萬。");
                im.dispose();
            }
            break;
        case 14:
            if (im.getMeso() > 10000) { //地圖傳送
                im.dispose();
                im.sendOk("請聯繫GM進行洗血，1HP=10樂豆點。惡魔復仇者不能洗血");
            } else {
                im.sendOk("楓幣不足1萬。");
                im.dispose();
            }
            break;
        case 10086:
            if (im.getMeso() > 10000) { //地圖傳送
                                im.dispose();
                im.openNpc(2135003);
            }
            break;
        case 20:
                im.dispose();
                im.openNpc(9330104, 1);
            break;
        case 21:
           if (im.getPQLog("樂豆點換") < 1 && im.getPlayer().getCSPoints(1) >= 15000) { //工資
                im.gainNX(1, -15000);
                im.gainMeso(100000000);
                im.setPQLog("樂豆點換");
                im.sendOk("恭喜您換取成功.");
                im.worldSpouseMessage(0x20,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡用樂豆點換取了1億楓幣。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). ");
                im.dispose();
            }
            break;
        case 22:
           if (im.getPQLog("楓點換") < 1 && im.getPlayer().getCSPoints(2) >= 30000) { //工資
                im.gainNX(2, -30000);
                im.gainMeso(100000000);
                im.setPQLog("楓點換");
                im.sendOk("恭喜您換取成功.");
                im.worldSpouseMessage(0x20,"『理財服務』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡用楓點換取了1億楓幣。");
                im.dispose();
            } else {
                im.sendOk("失敗：\r\n\r\n#r1). 您已經領取過，請明日再領。\r\n2). ");
                im.dispose();
            }
            break;

             case 0:
                cm.clearSkills();
                break;
        }
    }
}
