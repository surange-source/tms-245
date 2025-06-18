/*
 腳本功能：市場管理員
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var Star = "#fEffect/CharacterEff/1112904/2/1#";
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun4 ="#fUI/UIWindow/Quest/reward#";////獎勵
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var a = "#fEffect/CharacterEff/1082565/0/0#";  //餅乾兔子
var b = "#fEffect/CharacterEff/1112904/0/0#"; //彩色星星
var c = "#fEffect/CharacterEff/1003271/0/0#";  //紅色心心
var d = "#fEffect/CharacterEff/1112946/4/1#";  //鑽石
var e = "#fEffect/CharacterEff/1082229/0/0#";  //紅心
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
var wp110 = "#fUI/CashShop.img/CSEffect/number/0#";  //數字 後面改數字0-9
var wp111 = "#fUI/CashShop.img/CSEffect/number/1#";  //數字 後面改數字0-9
var wp112 = "#fUI/CashShop.img/CSEffect/number/2#";  //數字 後面改數字0-9
var wp113 = "#fUI/CashShop.img/CSEffect/number/3#";  //數字 後面改數字0-9
var wp114 = "#fUI/CashShop.img/CSEffect/number/4#";  //數字 後面改數字0-9
var wp115 = "#fUI/CashShop.img/CSEffect/number/5#";  //數字 後面改數字0-9
var wp116 = "#fUI/CashShop.img/CSEffect/number/6#";  //數字 後面改數字0-9
var wp117 = "#fUI/CashShop.img/CSEffect/number/7#";  //數字 後面改數字0-9
var wp118 = "#fUI/CashShop.img/CSEffect/number/8#";  //數字 後面改數字0-9
var wp119 = "#fUI/CashShop.img/CSEffect/number/9#";  //數字 後面改數字0-9
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
var wi12 = "#fUI/UIPVP.img/DmgEffect/DmgRed/excellentCritical#";  //特別危險藍//"+wp110+""+wp111+""+wp112+""+wp113+""+wp114+""+wp115+""+wp116+""+wp117+""+wp118+""+wp119+"
var wi13 = "#fUI/UIPVP.img/DmgEffect/DmgBlue/excellentCritical#";  //特別危險綠
var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#";  //黃星星
var wi15 = "#fUI/UIToolTip.img/Item/Equip/Star/Star1#";  //藍星星
var wn60 = "#fMob/0100101.img/die1/1#";  //蝸牛

var List = Array(
        //福利項目


        Array(wn12 + " #r樂豆點商場#k", "dianjuanshangcheng2", 1, 9310144),
        Array(wn12 + " #r遊戲寶庫#k", "youxibaoku", 1, 1012102),
        Array(wn12 + " #r裝備商店", "shangdian1", 1, 9900003),
        

        Array(wn12 + " #r楓點店#k", "16", 1),
        Array(wn12 + " #r時裝商舖#k", "haohuasp", 1),
        Array(wn12 + " #r特殊幣店\r\n#k", "qitashangdian", 1),



         Array(wn14 + " #b官方認證", "renzheng", 2,9900003),        
        Array(wn14 + " #b物品賺點", "huandian", 2),
        Array(wn14 + " #b裝備製作", "24", 2), //TODO

        Array(wn14 + " #b銀行管理", "yinhang", 3),
        //Array(iconEvent + " #b寵物進化", "chongwu", 3),
        //Array(iconEvent + " #b傑諾導彈", "jbbd", 3, 9310144),

        //Array(iconEvent + " #b賭拿中介", "hanqingdu", 4),
        Array(wn14 + " #b餘額抽獎", "yuecj", 3),
        Array(wn15 + " #b傷害突破", "tupo", 3),

        //Array(iconEvent + " #k影武面巾", "sdmj", 4),
        Array(wn14 + " #b特殊技能", "xxjn", 4),
        Array(wn18 + " #k刪除道具", "Delete", 4),
        Array(wn18 + " #k刪除角色\r\n", "Deletechr", 4),
        //Array(iconEvent + " #r一鍵滿技", "qljn", 4)

        Array(wn16 + " #d射手跳跳", "sheshou", 4),
        Array(wn16 + " #d玩具跳跳", "wanju", 4),
        Array(wn16 + " #d快樂聖誕", "kuaileshengdan", 4)

)
var text;
//是否活動，名字，模式，類別

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "";
            for (var i = 0; i < 5; i++) {
                ListFor(i);
            }
            
            cm.sendSimple(text)
        } else if (a == 1) {
            var mode_ = List[selection][1];
            cm.dispose();
            var npcid = 9900003;
            if (List[selection][3] != null)
                npcid = List[selection][3];
            cm.openNpc(npcid, mode_);
        }//a
    }//mode
}//f


function ListFor(type) {
    switch (type) {
        case 1://便民服務
            text += "#e#d\t\t"+axx+" 棉花楓之谷服務中心 "+ axx +"#n#k\r\n";
            break;
        default: 
            text+="\r\n";
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 2) {
                if (List[i+1]!=null && List[i+1][2]!=type)
                       text += "  #L" + i + "#" + List[i][0] + "#l";
                else
                    text += "  #L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "  #L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
}