/*  
 *  WSY工作室製作
 */
var status = 0;
var c = "#fEffect/CharacterEff/1112905/0/0#"; //籃心
var tz = "#fEffect/CharacterEff/1112949/0/0#";
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var z = "#fEffect/CharacterEff/1112949/0/0#";//"+z+"//美化
var zz = "#fUI/UIPVP.img/ChampionMark/4#";//
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z1 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt = "#fUI/Gateway.img/WorldSelect/icon/1#";//音符fEffect/ItemEff/1112811/0/0
var ts = "#fUI/ChatBalloon.img/pet/16/ne#";//小黃雞
var feng = "#v4032733#";
var kkk = "#fMap/MapHelper.img/weather/thankyou/3#";
var mvp = "#fUI/UIWindow4/enchantUI/tab_hyper/layer:MVP#";


var menuList = Array(
        Array(kkk, " 返回市場", 0, true),
        Array(kkk, mvp + "#fc0xFF882200##e功能#n#k", 33, true),
        Array(kkk, "測試服功能", 34, true),
        Array(kkk, " 萬能傳送", 3, true),
        Array(kkk, " 我的金庫", 2, false),
        Array(kkk, " 在線獎勵", 4, false),
        Array(kkk, " 組隊副本", 18, false),
        Array(kkk, " 福利中心", 19, true),
        Array(kkk, " 高階轉職", 22, true),
        Array(kkk, " 萌獸系統", 1, true),
        Array(kkk, " 五轉中心", 9, false),
        Array(kkk, " 十大排行", 21, false),
        Array(kkk, " 新手指引", 12, false),
        Array(kkk, " 萬能商店", 5, true),
        Array(kkk, " 點數市場", 7, false),
        Array(kkk, " 查看爆率", 11, false),
        Array(kkk, " 裝備分解", 8, false),        
        Array(kkk, " 神寵中心", 6, false),
        Array(kkk, " 銀行金融", 20, false),
        Array(kkk, " 門派系統", 10, false),
        Array(kkk, " 神秘強化", 12, false),
        Array(kkk, " 娛樂遊戲", 13, true),
        Array(kkk, " 師徒系統", 14, false),
        Array(kkk, " 結婚禮堂", 15, false),
        Array(kkk, " 破功中心", 16, false),
        Array(kkk, " 學習技能", 17, true),
        Array(kkk, " 強化系統", 23, false),
        Array(kkk, " 贊助中心", 24, true),
        Array(kkk, " 每日禮包", 32, false),
        Array(kkk, " 點商中心", 29, true),
          Array(kkk, " 楓葉兌換", 25, true),
        Array(kkk, " 裝備進化", 30, true),
        Array(kkk, " 金楓兌換", 26, true),
        Array(kkk, " 彩楓兌換", 27, true),        
        Array(kkk, " 楓鑽兌換", 28, true),
                     
                     
        Array(kkk, " 快速轉職", 98, false),
        Array(kkk, " 本期主打", 100, true),
        Array(kkk, " 移除垃圾", 97, true),
        Array(kkk, " 其他幫助", 31, true)
        );
//圖片特效,名字，selection，是否顯示

var npcid = Array(1530635, 1530636, 1530637, 1530638);

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
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.");
        cm.dispose();
    } else if (status == 0) { //
        var selStr = "";
        if (menuList[1][3]) {
            selStr += "                  #L" + menuList[1][2] + "#" + menuList[1][0] + ""+menuList[1][1]+"#l";
        }
        if (menuList[2][3] && cm.getConfig("tespia").equalsIgnoreCase("true")) {
            selStr += "  #L" + menuList[2][2] + "#" + menuList[2][0] + ""+menuList[2][1]+"#l";
        }
        if (selStr != "") {
            selStr += "\r\n";
        }
        selStr += c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c;
        var x = 0;
        for (var i = 0; i < menuList.length; i++) {
            if (menuList[i][3]) { // 如果允許顯示
                if (menuList[i][2] == 33 || menuList[i][2] == 34 ) {
                    continue;
                }
                x++;

                selStr += "#b#L" + menuList[i][2] + "#" + menuList[i][0] + " " + menuList[i][1] + "#l";

                if (x % 3 == 0) {
                    selStr += "\r\n";
                } else {
                    selStr += " ";
                }
            }
        }
        if (x % 3 != 0) {
            selStr += "\r\n";
        }
        selStr += c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c+c;
        selStr += "#k\r\n       #L1000# " + ts + "#fs13##e#r進入商城#l\t#L1001# " + ts + "樂豆儲值#l#n#k";
        if (cm.getPlayer().isIntern()) {
            selStr += "\r\n      #L99# " + ts + "#e測試專區#n#l";
        }
        cm.sendSimple(selStr, npcid[Math.floor(Math.random() * npcid.length)]);
    } else if (status == 1) {
        for (var i = 0; i < menuList.length; i++) {
            if (menuList[i][2] == selection) {
                if (!menuList[i][3]) {
                    // 檢測選擇的選項是否為不顯示的選項(防特別手段作弊)
                    cm.dispose();
                    return;
                }
                break;
            }
        }
        switch (selection) {
            case 0: // 返回市場
                if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022) {
                    cm.sendOk("#fs28##fn方正舒體##b你難道不在自由市場嗎？", npcid[Math.floor(Math.random() * npcid.length)]);
                } else {
                    cm.saveReturnLocation("FREE_MARKET");
                    cm.warp(910000000, "st00");
                }
                cm.dispose();
                break;
            case 1: // 萌獸系統
                cm.dispose();
                cm.openUI(0x251);
                break;
            case 2: // 我的賬戶
                cm.dispose();
                cm.openNpc(1530635, 2);
                break;
            case 3: // 萬能傳送
                cm.dispose();
                cm.openNpc(1530635,1);
                break;
            case 4://  BOSS挑戰
                cm.dispose();
                cm.openNpc(1530635,"zaixianshijian5");
                break;
            case 5: //  雜貨店
                cm.dispose();
                cm.openNpc(1530635, 4);
                break;
            case 6: //  福利中心
                cm.dispose();
                cm.openNpc(1530635, 278);
                break;
            case 7: //  商城購物
                cm.dispose();
                cm.openNpc(1530635, 5);
                break;
            case 8: //  物品回收
                cm.dispose();
                cm.openNpc(1530635, 7);
                break;
            case 9:  //  休閒中心
                cm.dispose();
                cm.openNpc(1530635, "quickchange5job");
                break;
            case 10: //  管理中心
                cm.dispose();
                cm.openNpc(2411025);
                break;
            case 11: //  爆率查詢
                cm.dispose();
                cm.openNpc(1530635, 6);
                break;
            case 12: //  新手必點
                cm.dispose();
                cm.openNpc(1530635, 13);
                break;
            case 13: //  中介服務
                cm.dispose();
                cm.openNpc(1012008, "GameCenter")
                break;
            case 14: //  學習技能
                cm.dispose();
                cm.openNpc(2091007,"shitu");
                break;
            case 15: //  儲值中心
                cm.warp(680000000, 0);
                cm.dispose();
                break;
            case 16: //  破功中心
                cm.dispose();
                cm.openNpc(1530635,"tupo");
                break;
            case 17: //  学习技能
                cm.dispose();
                cm.openNpc(1530635, 2004);
                break;
            case 18:
                cm.dispose();
                cm.warp(910002000);
                break;
            case 19:
                cm.dispose();
                cm.openNpc(1530635, 0825);
                break;
            case 20:
                cm.dispose();
                cm.openNpc(9300011, 1);
                break;
            case 21:
                cm.dispose();
                cm.openNpc(1540008);
                break;
            case 22:
                cm.dispose();
                cm.openNpc(1530635, "changeJob");
                break;    
            case 23:
                cm.dispose();
                cm.openNpc(9020011);
                break;    
            case 24:
                cm.dispose();
                cm.openNpc(1530635, "chongzhijiangli");
                break;
            case 25: //  楓葉兌換
                cm.dispose();
                cm.openNpc(1530635, 25);
                break;
            case 26: //  金楓兌換
                cm.dispose();
                cm.openNpc(1530635, 26);
                break;
            case 27: //  彩楓兌換
                cm.dispose();
                cm.openNpc(1530635, 27);
                break;
            case 28: //  楓鑽兌換
                cm.dispose();
                cm.openNpc(1530635, 28);
                break;
            case 29: //  點數兌換
                cm.dispose();
                cm.openNpc(1530635, 29);
                break;
            case 30: //  裝備進化
                cm.dispose();
                cm.openNpc(1530635, 30);
                break;    
            case 31: //  其他幫助
                cm.dispose();
                cm.openNpc(1530635, "otherhelp");
                break;        
            case 32: //  每日禮包
                cm.dispose();
                cm.openNpc(1530635, "MoneyToNx");
                break;
            case 33: //  MVP功能
                cm.dispose();
                cm.openNpc(9310362, "MvpFunction");
                break;
            case 34: //  測試機功能
                cm.dispose();
                cm.openNpc(1530635, "TestSrv");
                break;
            case 97: //  移除垃圾
                cm.dispose();
                cm.openNpc(9310362, "DeleteCash");
                break;
            case 100: //  本期主打
                cm.dispose();
                cm.openNpc(9310362, "MainReward");
                break;
                
                
                
                
                
                
                
            case 1000:
                cm.dispose();
                cm.enterCS();
                break;
            case 1001:
                //cm.sendOk("\r\n\r\n\t\t\t#e#r請私聊技術麻麻");
                cm.dispose();
                cm.openWeb("http://www.magicforest.xyz/donate/");
                break;
            case 99:
                
                if ( !cm.getPlayer().isGm()){
                    cm.sendOk("管理員專用");
                    cm.dispose();
                }else {                    
                    cm.dispose();
                    cm.openNpc(9900003, "../ceshi");                    
                }
                
                break;
            case 98:
                cm.dispose();
                cm.openNpc(9900003, "../job");
            break;
        }
    }
}


function ListFor(type) {
    var x = 0;
    var space = "";
    if (type >= 3)
        space = "  ";
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 3) {
                text += "#L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "#L" + i + "#" + List[i][0] + "#l" + space;
                x++;
            }
        }
    }
}