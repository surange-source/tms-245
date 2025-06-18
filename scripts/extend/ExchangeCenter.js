/*      
 *  
 *  功能：交換中心
 *  
 */

var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var kkk = "#fEffect/CharacterEff/1051296/1/0#";
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt = "#fEffect/ItemEff/1112811/0/0#";//音符

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
    if (status == 0) {
        var selStr = "";
        //selStr += "" + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + "";
        selStr += "             #r#r#e親愛的#d#h ##k您好~!  \r\n           你想要進行什麼操作呢#b#n#k\r\n";
        selStr += "" + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + "\r\n";
        selStr += "#L1#" + eff + "郵票兌換#l";
        selStr += "#L5#" + eff + "購買郵票#l";
        selStr += "#L2#" + eff + "兌換硬幣#l";
        //selStr += "#L3#" + eff + "楓幣換點#l";
        //selStr += "#L4#" + eff + "楓葉兌換#l";
        //selStr += "#L6#" + eff + "武器破攻#l";
        //selStr += "#L7#" + eff + "喇叭商店#l\r\n\r\n";
        //selStr += "#L8#" + eff + "換放大鏡#l\r\n\r\n";
        //selStr += "#L9##d" + iconEvent + "解鎖裝備#l";
        //selStr += "#L10##d#e" + eff + "轉成新手#l";
        //selStr += "#L11##r#e" + eff + "任務賺點#l#k";
        //selStr += "#L12##d" + eff + "兌換坐騎#l";
        //selStr += "#L13##d" + eff + "點裝回收#l";
        //selStr += "#L14##d" + eff + "背包清理#l";
        //selStr += "\r\n\r\n";
        //selStr += "#L15##d#e" + iconEvent + "每日尋寶#l";
        //selStr += "#L16##e" + iconEvent + "每日簽到#l";
        //selStr += "#L19##e" + iconEvent + "簽到禮包#l";
        //selStr += "\r\n";
        //selStr += "#L17##d" + iconEvent + "地圖傳送#l";
        //selStr += "#L18#" + iconEvent + "BOSS傳送#l";
        //selStr += "#L19#" + iconEvent + "BOSS傳送1#l";
        //selStr += "\r\n\r\n";
        //selStr += "#L21##b" + kkk + "兌換中心#l";
        //selStr += "\r\n";
        //selStr += "#L20##b#n" + kkk + "遊戲中心(#r獲得#z4033248#,#z4031156##k)#e#n#l\r\n";
        //selStr += "#L21##b" + eff + "購買251級秘藥（#r#z2430979##k）#l\r\n";
        //selStr += "#L22##b" + eff + "趣味問答（8秒限時，速度要快哦）#l\r\n";
        cm.sendSimpleS(selStr, 2);
    } else if (status == 1) {
        switch (selection) {
            case 1:
                cm.dispose();
                cm.openNpc(1540310, "ExchangeStamp");
                break;
            case 2:
                cm.dispose();
                cm.openNpc(1540310, "Exchange");
                break;
            case 3:
                cm.dispose();
                cm.openNpc(1540310, "ExchangeNX");
                break;
            case 4://ExchangeMaple
                cm.dispose();
                cm.openNpc(1540310, "ExchangeMaple");
                break;
            case 5:
                cm.dispose();
                cm.openNpc(1540310, "BuyStamp");
                break;
            default:
                cm.sendOk("該功能正在緊張進行製作中，請耐心等待。");
                cm.dispose();
                break;
        }
    }
}
