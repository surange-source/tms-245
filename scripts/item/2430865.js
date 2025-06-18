var status = 0;
//var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var time = new Date();
var year = time.getFullYear(); //獲得年份
var month = time.getMonth()+1; //獲得月份
var day = time.getDate();//獲取日
var today = year+"-"+month+"-"+day;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    var 上次包月日期 = im.getPlayer().getWorldShareInfo(999999999,"date");
    var 是否包月 = im.getPlayer().getWorldShareInfo(999999999,"enable");
    var 檢查包月 = false;
    if( 是否包月 == 1 && DateDiff(上次包月日期,today) <= 30 )
        檢查包月 = true;
    
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
        if(檢查包月 == true){
            var selStr = "";
                //selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n- #e#r隨身npc#k#n\r\n";
                selStr += "#d歡迎使用隨身特權,本次給您帶來快捷服務：#k\r\n";
                selStr += "#L7# 經驗加倍#l #L8# 掉寶加倍#l\r\n";
                //selStr += "#L23#"+z+" 免費自選美容美發#l\r\n";
                selStr += "#L70# 領取VIP物品#l\r\n";
                selStr += "#L10086# 會員洗血（需重登才能刷血魔）#l\r\n";
                //selStr += "#L71# 清理技能#l\r\n";
                //selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
       
        }else{
            im.dispose();
            var selStr = "";
            selStr +="您不是包月用戶,請先購買" + im.getServerName() + "超值包月來開啟此功能";
        }
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 70:
                var 上次領黃金戒指日期 = im.getPlayer().getWorldShareInfo(999999991,"date");
                
                
                if( DateDiff(上次領黃金戒指日期,today) > 30 && 檢查包月 == true && im.getSpace(5) >= 1){
                    im.gainItemPeriod(1022229,1,30);
                    im.gainItemPeriod(1143024,1,30);
                    im.gainItemPeriod(5010110,1,30);
                    im.getPlayer().updateWorldShareInfo(999999991,"name","黃金戒指",false);
                    im.getPlayer().updateWorldShareInfo(999999991,"date",today,false);
                    im.worldSpouseMessage(0x15,"『" + im.getServerName() + "超值包月』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取VIP勳章稱號。");
                    im.dispose();
                }else{
                    im.sendOk("請30天後再來");
                }
                
                im.dispose();
                break;
            //-----------
            case 0:
                var 上次領工資日期 = im.getPlayer().getWorldShareInfo(999999992,"date");
                if ( 上次領工資日期 != today && 檢查包月 == true) { //工資    
                    var ME = 100000;
                    im.gainMeso(ME);
                    im.getPlayer().updateWorldShareInfo(999999992,"name","工資",false);
                    im.getPlayer().updateWorldShareInfo(999999992,"date",today,false);
                    im.sendOk("恭喜您領取" + im.getServerName() + "超值包月的每日工資"+ME+"萬楓幣.");
                    im.worldSpouseMessage(0x15,"『" + im.getServerName() + "超值包月』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日楓幣。");
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
        
        
            case 7:
                var 上次領經驗加倍日期 = im.getPlayer().getWorldShareInfo(999999993,"date");
                if (上次領經驗加倍日期 != today && 檢查包月 == true && im.getSpace(3) >= 3) { 
                    im.gainItemPeriod(4100000,1,1);
                    im.gainItemPeriod(5680641,1,1);
                    im.gainItemPeriod(5680642,1,1);
                    im.gainItemPeriod(5680643,1,1);
                    im.getPlayer().updateWorldShareInfo(999999993,"name","經驗加倍",false);
                    im.getPlayer().updateWorldShareInfo(999999993,"date",today,false);
                    im.sendOk("恭喜您領取" + im.getServerName() + "超值包月的經驗加倍卡一張.");
                    im.worldSpouseMessage(0x15,"『" + im.getServerName() + "超值包月』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日經驗加倍卡。");
                    im.dispose();
                } else {
                    im.sendOk("您已經領取過，請明日再領。");
                    im.dispose();
                }
                break;
            case 8:
                var 上次領掉寶加倍日期 = im.getPlayer().getWorldShareInfo(999999994,"date");
                if ( 上次領掉寶加倍日期 != today && 檢查包月 == true ) { 
                    im.gainItemPeriod(5360015,1,1);
                    im.getPlayer().updateWorldShareInfo(999999994,"name","掉寶加倍",false);
                    im.getPlayer().updateWorldShareInfo(999999994,"date",today,false);
                    im.sendOk("恭喜您領取" + im.getServerName() + "超值包月的每日掉寶加倍一張.");
                    im.worldSpouseMessage(0x15,"『" + im.getServerName() + "超值包月』 ：玩家 "+ im.getChar().getName() +" 在隨身NPC裡領取每日掉寶加倍。");
                    im.dispose();
                } else {
                    im.sendOk("您已經領取過，請明日再領。");
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
                if (im.getMeso() > 10000) {//洗血
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
        }
        return;
    }
}

function DateDiff (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
  var oDate1 = new Date(sDate1);
  var oDate2 = new Date(sDate2);
  var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
}