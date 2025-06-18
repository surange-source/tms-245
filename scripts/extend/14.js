var status = 0;

var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //愛心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz1 = "#fEffect/CharacterEff/1082565/2/0#";  //兔子藍
var tz = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var tz2 = "#fEffect/CharacterEff/1082565/0/0#";  //兔子灰色
var tz3 = "#fEffect/CharacterEff/1082588/0/0#";  //紅點
var tz4 = "#fEffect/CharacterEff/1082588/3/0#";  //藍點
var tz51 = "#fEffect/CharacterEff/1082588/1/0#";  //綠點
var tz6 = "#fEffect/CharacterEff/1112900/2/1#";  //音符藍
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符紅
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符綠
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符綠!
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //藍心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //紅心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黃星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //藍星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //紅星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花樣音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花樣音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花樣音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花樣音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花樣音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
var wn2 = "#fUI/UIWindowTW.img/TimeCapsule/BtClose/disabled/0#";  //叉叉
var wn3 = "#fUI/Basic.img/ComboBox/disabled/1#";  //白條
var wn4 = "#fUI/Basic.img/ComboBox3/mouseOver/1#";  //黃條
var wn5 = "#fUI/Basic.img/Cursor/17/16#";  //黃色圈
var wn6 = "#fUI/Basic.img/Cursor/34/0#";  //圈
var wn7 = "#fUI/Basic.img/Cursor/43/3#";  //藍圈
var wn8 = "#fUI/CashShop.img/CSBargainSale/BtLeft/normal/0#";  //黃色左
var wn9 = "#fUI/CashShop.img/CSBargainSale/BtRight/normal/0#";  //黃色右
var wn10 = "#fUI/CashShop.img/CSBeauty/tip/hair#";  //髮型提示
var wn11= "#fUI/CashShop.img/CSBeauty/hairColor/Enable/0#";  //黑
var wn12 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/1#";  //紅
var wn13 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/2#";  //橙
var wn14 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/3#";  //黃
var wn15 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/4#";  //綠
var wn16 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/5#";  //親
var wn17 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/6#";  //紫
var wn18 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/7#";  //褐
var wn19 = "#fUI/CashShop.img/CSEffect/event/0#";  //活動圖標
var wn20 = "#fUI/CashShop.img/CSEffect/hot/0#";  //人氣圖標
var wn21 = "#fUI/CashShop.img/CSEffect/mileage/0#";  //積分圖標
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品圖標
var wn23 = "#fUI/CashShop.img/CSEffect/sale/0#";  //折扣圖標
var wn24 = "#fUI/CashShop.img/CSEffect/time/0#";  //限量圖標
var wp1 = "#fUI/CashShop.img/CSEffect/number/0#";  //數字 後面改數字0-9
var wp2 = "#fUI/CashShop.img/CSIcon/0#";  //男圖標 0男-1女
var wp3 = "#fUI/CashShop.img/CSStatus/BtCharge/mouseOver/0#";  //儲值圖標
var wp4 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/0#";  //武器開頭
var wp5 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/1#";  //帽子
var wp6 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/2#";  //披風
var wp7 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/3#";  //長袍
var wp8 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/4#";  //上衣
var wp9 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/5#";  //褲子
var wp10 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/6#";  //鞋子
var wp11 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/7#";  //手套
var wp12 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/8#";  //飾品
var wp13 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/9#";  //眼飾
var wp14 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/10#";  //效果結尾
var wp15 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/0#";  //斜線美化
var wp16 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/1#";  //斜線美化
var wp17 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/2#";  //斜線美化
var wp18 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/3#";  //斜線美化
var wp19 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/4#";  //斜線美化
var wp20 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/5#";  //斜線美化
var wi1 = "#fUI/SoulUI.img/DungeonMap/icon/dungeonItem/0#";  //星星圖標
var wi2 = "#fUI/SoulUI.img/DungeonMap/icon/soulFragment/0#";  //菱形圖標
var wi3 = "#fUI/SoulUI.img/DungeonMap/icon/soulTrap/0#";  //骷髏圖標
var wi4 = "#fUI/SoulUI.img/DungeonMap/icon/warpGate/0#";  //圓點圖標
var wi5 = "#fUI/SoulUI.img/DungeonParty/backgrnd2#";  //毛莫
var wi6 = "#fUI/StarCityUI.img/Board_Friend/list/0/5/selected#";  //剪刀石頭布
var wi7 = "#fUI/StarCityUI.img/Board_GameRank/tab/enabled/0#";  //遊戲排行
var wi8 = "#fUI/StarCityUI.img/Board_GameRank/user/myrank#";  //黃色條
var wi9 = "#fUI/StarCityUI.img/Board_GameRank/user/shining#";  //紫色條
var wi11 = "#fUI/UIPVP.img/ChampionMark/4#";  //徽章黃色
var wi12 = "#fUI/UIPVP.img/DmgEffect/DmgRed/excellentCritical#";  //特別危險藍
var wi13 = "#fUI/UIPVP.img/DmgEffect/DmgBlue/excellentCritical#";  //特別危險綠
var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#";  //黃星星
var wi15 = "#fUI/UIToolTip.img/Item/Equip/Star/Star1#";  //藍星星
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var wn60 = "#fMob/0100101.img/die1/1#";  //蝸牛
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
var sl = 5;//兌換數量

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
        } 
    else if (status == 0) {
       // var selStr = "#e#r#L50#"+yun1+"遊戲商店"+yun1+"#l\r\n";
        var selStr = "#d今日已刷廢棄：#r"+cm.getEventCount("廢棄都市")+"#d次\r\n";
        selStr += "#e#L1#廢棄組隊通關50次領取#v5062002#20個，#v5062500#20個#l\r\n";
        selStr += "#e#L2#廢棄組隊通關70次領取#v5062002#40個，#v5062500#40個#l\r\n";
        selStr += "#e#L3#廢棄組隊通關150次領取#v4001839#800個，#v5062009#40個#l\r\n";
        //selStr += "           \r\n  #g正在維護此副本\r\n";
        //selStr += "#d#L14#"+wi14+"雙倍道具#l#L15#"+wi14+"道具卷軸#l#L16#"+wi14+"皮膚傷害#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0://雜貨商店
            cm.dispose();
            cm.openShop(1012123);
            break;
        case 1://
      if (cm.getPQLog("廢棄通關50獎勵") == 0 && cm.getEventCount("廢棄都市") > 49) {
               //cm.gainNX(2, 10000);
        //cm.gainMeso(-50000000);
                    cm.setPQLog("廢棄通關50獎勵");
               // cm.setPQLog("廢棄通關50獎勵", 2);
        cm.gainItem(5062002, 20);
        cm.gainItem(5062500, 20);
                cm.sendOk("領取成功，獲得#v5062002#20個，#v5062500#20個");
        cm.spouseMessage(0x20, "『廢棄組隊』" + " : " + "恭喜" + cm.getChar().getName() + ",領取了廢棄通過50次獎勵。");
        cm.dispose();
            } else {
                cm.sendOk("#r領取失敗，通關不足");
                cm.dispose();
            }
            break;        
        case 2://影武裝
    if (cm.getPQLog("廢棄通關70獎勵") == 0 && cm.getEventCount("廢棄都市") > 69) {
                cm.gainNX(1, 3000);
        //cm.gainMeso(-50000000);
                    cm.setPQLog("廢棄通關70獎勵");
        cm.gainItem(5062002, 40);
        cm.gainItem(5062500, 40);
                //cm.sendOk("領取成功，獲得#v4001839#300個及3000樂豆點");
        cm.spouseMessage(0x21, "『廢棄組隊』" + " : " + "恭喜" + cm.getChar().getName() + ",領取了廢棄通過70次獎勵。");
        cm.dispose();
            } else {
                cm.sendOk("#r領取失敗，通關不足");
                cm.dispose();
            }
            break;    
        case 3://影武裝
            if (cm.getEventCount("廢棄都市") >= 150 && cm.getPQLog("廢棄通關150獎勵") < 1){
                cm.setPQLog("廢棄通關150獎勵");
                //cm.addHyPay(-sl * 1);
        cm.gainItem(4001839, 800);
        cm.gainItem(5062009, 40);
                cm.sendOk("領取成功，獲得#v4001839#800個及#v5062009#40個");
        cm.spouseMessage(0x28, "『廢棄組隊』" + " : " + "恭喜" + cm.getChar().getName() + ",領取了廢棄通過150次獎勵。");
        cm.dispose();
            } else {
                cm.sendOk("#r領取失敗，通關不足");
                cm.dispose();
            }
            break;
        case 4://暴君
            cm.dispose();
           cm.openShop(22224);
            break;
        case 5://外形
            cm.dispose();
             cm.openShop(9310117);
            break;
        case 6://特殊裝備
            cm.dispose();
             cm.openShop(1033001);
            break;
        case 7://獅子王
            cm.dispose();
            cm.openShop(2161010);
            break;
        case 8://征服幣
            cm.dispose();
           cm.openNpc(9900003, 21);
            break;
        case 9://普通卷軸
            cm.dispose();
            cm.openNpc(9310144,222);
            break;
        case 10://運動會
            cm.dispose();
            cm.openShop(22200);
            break;
        case 11://RED
            cm.dispose();
            cm.openShop(20000);
            break;
        case 12://技能書
            cm.dispose();
            cm.openNpc(9310073);
            break;
        case 13://所有商店
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 14://雙倍
            cm.dispose();
            cm.openNpc(9900002, 11); //雙倍道具
            break;
        case 15://
            cm.dispose();
        cm.openNpc(9900002, 10); //洗樂豆點軸
            break;
        case 16://網站
            cm.dispose();
        cm.openNpc(9310071);
            break;
        case 17://職業俯首
            cm.dispose();
        cm.openNpc(9310072);
            break;
        case 18://其他
            cm.dispose();
        cm.openNpc(9900003, 10);
            break;
        case 19://實惠
            cm.dispose();
            
        cm.openNpc(9000069,5);
            break;
        case 20://網站
            cm.dispose();
            
        cm.openNpc(9000069,1);
            break;
        case 21://椅子
            cm.dispose();
            
        cm.openNpc(9000069,2);
            break;
        case 22://上裝備
            cm.dispose();
            
        cm.openNpc(9000069,4);
            break;
        case 23://卷軸
            cm.dispose();
            
        cm.openNpc(9000069,3);
            break;
        case 24://網站
            cm.dispose();
            
        cm.openNpc(9310144,999);
            break;
        case 25://網站
            if(cm.getMeso() >= 100000) {
        cm.gainMeso(- 100000);
            cm.gainItem(2500000, 1);
            cm.sendOk("恭喜您購買成功!!!");
        } else {
        cm.sendOk("需要100000楓幣,你沒有!!!");
        }
        cm.dispose();
            break;
        case 50://網站
            cm.dispose();
       cm.openNpc(9310144, 101);
            break;
        case 26://
            cm.dispose();
            
        cm.openNpc(9900004,8);
            break;
        case 27://
            cm.dispose();
            
        cm.openNpc(9900004,9);
            break;
        case 28://
            cm.dispose();
            
        cm.openNpc(9900004,10);
            break;
        case 29://
            cm.dispose();
            
        cm.openNpc(9900004,11);
            break;
        case 30://
            cm.dispose();
            
        cm.openNpc(9900004,12);
            break;
        }
    }
}
