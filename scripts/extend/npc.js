var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon0 = "#fUI/Basic.img/VScr7/enabled/thumb0#";//小圖標
var icon1 = "#fUI/ChatBalloon.img/pet/16/nw#";//小黃雞
var icon2 = "#fUI/ChatBalloon.img/pet/16/ne#";//小黃雞
var icon3 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/7#";//發呆
var icon4 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/6#";//憤怒
var icon5 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/3#";//大笑
var icon6 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/1#";//大笑

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (cm.haveItem(3010508)) {
        var gbtp = "#r貴賓玩家#k";
    } else {
        var gbtp = "普通玩家";
    }
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
        var selStr = "" + eff1 + "在線：#r"+cm.getOnlineTime()+"#k       " + eff1 + "里程：#r"+cm.getPlayerPoints()+"#k       " + eff1 + "活力：#r"+cm.getPlayerEnergy()+"#k\r\n" + eff1 + "餘額：#r"+cm.getHyPay(1)+"#k      " + eff1 + "樂豆點：#r" + cm.getPlayer().getCSPoints(1) + "#k     " + eff1 + "楓點：#r" + cm.getPlayer().getCSPoints(2) + "#k#k\r\n";
        selStr += "#L2#" + eff + "#r新手必看#l";
                selStr += "#L8#" + eff + "#r快速轉職#l";    
        //selStr += "#L22#" + eff + "#r免費餘額#l";
        selStr += "#L23#" + eff + "#r美容美發#l";
        selStr += "#L3#" + eff + "#r儲值中心#l\r\n\r\n";
        selStr += "#L4#" + eff + "#d雜貨商店#l"; 
        selStr += "#L14#" + eff + "#d服務中心#l";
        //selStr += "#L18#" + eff + "#d購買坐騎#n#l";
        selStr += "#L21#" + eff + "#d在線獎勵#l";
        selStr += "#L6#" + eff + "#d每日福利#l\r\n\r\n";
                selStr += " #L7##b回到市場#l";
        selStr += " #L12##rBOSS傳送#l";
        selStr += " #L18##b刪除道具#l";
        selStr += " #L10##r管理中心#l\r\n";
        selStr += " #L11##b萬能傳送#l";
        selStr += " #L0##r副本任務#l";
        selStr += " #L13##b爆物查詢#l";
        selStr += " #L9#學購技能#l#n\r\n\r\n";
        selStr += " #L15#" + eff + "#b樂豆點商店#l";
        selStr += " #L16#" + eff + "#r里程道具#l";
        selStr += " #L17#" + eff + "#b百寶抽獎#k#l\r\n\r\n";    
        //selStr += " #L20#" + eff + "#b玩家不要點測試npc#k#l\r\n\r\n";    
        selStr += "        Ps：常用指令#r@npc#k，#r@解卡#k，#r@卡圖#k，#r@幫助#k \r\n";
        selStr += "  Ps：新手玩家請先熟悉【#r新手必看#k】【#r每日福利#k】功能\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            //cm.openNpc(9310144, "zuduirenwu");
           cm.warp(910002000, 0);    
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9900001,"tupo");    
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900005);    
            break;
        case 22:
            cm.dispose();
            cm.openNpc(9900005,"hqye1");    
            break;
        case 3://儲值網站
            cm.dispose();
            cm.openNpc(9900004,"chongzhijiangli");    
            break;
        case 4://管理僱傭商店
            cm.dispose();
            // cm.openShop(9070000);
        //cm.openNpc(9900000);
            cm.openShop(61);
            break;
        case 5://累積儲值
            cm.dispose(); 
        cm.openNpc(9900002, "hanqingdu");
            break;
        case 6://每日福利
           cm.dispose();
        //cm.openNpc(9900003,"qiandao0");
           cm.openNpc(9900003, "mrfl");
            break;
         /*   cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=37438");
        cm.sendOk("已經為您打開贊助網站！");*/
    //if(cm.getPlayer().getLevel() <= 10){
        //cm.gainExp( + 50000);
        //cm.worldMessage("恭喜新玩家"+ cm.getChar().getName() +"在拍賣NPC處領取5W經驗");
        //cm.sendOk("恭喜您領取成功,10級下都能在我這裡領取經驗");
        //}else{
        //cm.sendOk("你的等級大於10");
    //}
    //cm.dispose();
            //break;
        case 7://回到市場
            if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022) {
                cm.sendOk("您已經在市場了，還想做什麼？");
            } else {
                cm.saveReturnLocation("FREE_MARKET");
                cm.warp(910000000, "st00");
            }
            cm.dispose();        
            break;
        case 8://快速轉職
            cm.dispose();
          cm.openNpc(9310362, "changeJob");
            break;            
        case 9://學習技能
            cm.dispose();
            cm.openNpc(9900003, "xuegoujineng");         
            break;
         case 10://管理僱傭商店
        /*if (cm.getPlayer().getLevel() > 100 ) {
            cm.warp(701000210);
            cm.sendOk("青龍之門為大混戰PK.赤龍之門為組隊PK戰.黃龍之門為公會PK戰.祝您好運");
            } else {
                cm.sendOk("對不起.PK太危險了.100級以下的玩家不能進入噢.");
            }
            cm.dispose();*/
        cm.dispose();
        cm.openNpc(9900004,"guanlizhongxin");
        //cm.openNpc(9030000);    
            break;
         case 11://快速傳送
            cm.dispose();
            cm.openNpc(1032005, "worldwarp");                
            break;
        case 12://副本傳送
        cm.dispose();
       //cm.openNpc(9900003,"fuben108");
             cm.openNpc(2023000, "BOSSwarp");    
            break;
        case 13://快速轉職
          /*  cm.dispose();
            cm.openNpc(9900001,3000);
            break;*/
            cm.dispose();
            cm.openNpc(9010000, "wuguaibaolbv"); 
            break;            
        case 14://銀行存款
           /* cm.dispose();
            cm.openNpc(9900002,36);
            break;*/
            cm.dispose();
            cm.openNpc(9310476);
            break;            
        case 15://美容美發
            /*cm.dispose();
            cm.openNpc(9900002,36);*/
            cm.dispose();
            //cm.openNpc(9900003,"qitashangdian");
                    cm.openNpc(9010047, "dianjuanshangcheng2"); 
            break;
        case 16://每日福利
            cm.dispose();
            cm.openNpc(9900002,"jifenhuoli");
            //cm.openNpc(9900003,608);
            break;
        case 17:
            cm.dispose();
            //cm.openNpc(9900002,36);
            //cm.openNpc(9900004,"wanneng");
                     cm.warp(749050400);
            break;
        case 18://百貨店
            cm.dispose();
            //cm.openNpc(9900000,"fubencz");
            cm.openNpc(9900000,"Delete");
            break;            
        case 19:
            cm.dispose();
            cm.openNpc(9900002);
            break;    
        case 20://RED商店
            cm.dispose();
            cm.openNpc(9900002, "shizi");
            break;    
        case 21://RED商店
            cm.dispose();
            cm.openNpc(9900004, "zaixianshijian5");
            break;    
        case 23://RED商店
            cm.dispose();
           // cm.openNpc(9900004, "ffn");
  cm.warp(100000104,1);
 cm.sendOk("#r#e`(*∩_∩*)′\r\n#b本服最新美容美發全免費，快來打扮自己吧！");
            break;        
            
    }
    }
}