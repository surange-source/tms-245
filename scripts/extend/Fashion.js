/*   
 *  
 *  功能：極品點裝
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
        selStr += "             #r#r#e親愛的#d#h ##k您好~!  \r\n           你想要進行什麼操作呢#b#n#k\r\n";
        selStr += "" + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + "\r\n";
        selStr += "#L2#" + eff + "絕版椅子#l";       
        selStr += "#L1#" + eff + "絕版戒指#l";
        selStr += "#L3#" + eff + "絕版套裝#l";
        selStr += "#L4#" + eff + "絕版上衣#l";
        selStr += "#L5#" + eff + "絕版褲裙#l";
        //selStr += "#L6#" + eff + "絕版手套#l";
        selStr += "#L7#" + eff + "絕版鞋子#l";
        selStr += "#L8#" + eff + "絕版披風#l";
        selStr += "#L9#" + eff + "絕版帽子#l"
        cm.sendSimpleS(selStr, 2);
    } else if (status == 1) {
        switch (selection) {
            case 1:
                cm.dispose();
                cm.openNpc(1540310, "Ring");
                break;
            case 2:
                cm.dispose();
                cm.openNpc(1540310, "Chair");
                break;
            case 3:
                cm.dispose();
                cm.openNpc(1540310, "Suit");
                break;
            case 4:
                cm.dispose();
                cm.openNpc(1540310, "Jacket");
                break;
            case 5:
                cm.dispose();
                cm.openNpc(1540310, "Culottes");
                break;
            case 6:
                cm.dispose();
                cm.openNpc(1540310, "Glove");
                break;
            case 7:
                cm.dispose();
                cm.openNpc(1540310, "Shoes");
                break;
            case 8:
                cm.dispose();
                cm.openNpc(1540310, "Cloak");
                break;
            case 9:
                cm.dispose();
                cm.openNpc(1540310, "Hat");
                break;
            default:
                cm.sendOk("該功能正在緊張進行製作中，請耐心等待。");
                cm.dispose();
                break;
        }
    }
}
