var status;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var z = "#fMap/MapHelper.img/weather/starPlanet2/7#";//"+z+"//美化
var zz = "#fEffect/CharacterEff/1082565/2/0#";//
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var tt = "#fEffect/ItemEff/1112811/0/0#";//音符
var ttt = tt;
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z1 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化

var feng = "#v4032733#"
var kkk = tt;
var menuList = Array(
        Array(ttt, "#r師徒系統#b", 0, true),
        Array(ttt, "#r門派系統#b", 1, true),
        Array(ttt, "#r學習技能#b", 2, true),
        Array(ttt, "學習技能#b", 3, true),
        Array(ttt, "搶紅包#b", 4, false),
        Array(ttt, "裝備分解 #b", 5, false),
        //Array(ttt, "財富轉盤#b", 6, false),
        //Array(ttt, "紅包系統#b", 7, true),
        //Array(ttt, "彩虹婚姻#b", 8, true),
        //Array(ttt, "騎寵市場#b", 9, false),
        //Array(ttt, "點裝回收#b", 10, true),
        //Array(ttt, "遊戲中心#b", 11, true)
        //Array(ttt, "破攻中心#b", 20, true)
        );
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
        else {
            cm.dispose();
            return;
        }
        if (status == 0) {
            var selStr = "" + ttt + " #e#d請選擇#n#k\r\n" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "\r\n";
            var x = 0;
            for (var i = 0; i < menuList.length; i++) {
                if (menuList[i][3]) { // 如果允許顯示
                    x++;
                    selStr += "#b#L" + menuList[i][2] + "#" + menuList[i][0] + " " + menuList[i][1] + "#l";

                    if (x % 3 == 0) {
                        selStr += "\r\n";
                    } else {
                        selStr += " ";
                    }
                }
            }
            selStr += "\r\n\r\n" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "\r\n";
            selStr += "\r\n\t\t\t#b#L999#" + ttt + " 返回上一頁#l#k\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
            switch (selection) {
                case 0:
                    cm.dispose();
                    cm.openNpc(2091007,"shitu");
                    break;
                case 1:
                    cm.dispose();
                    cm.openNpc(2411025);
                    break;
                case 2:
                    cm.dispose();
                    cm.openNpc(1530635, 2004);
                    break;
                case 3:
                    cm.dispose();
                    cm.openNpc(1530635, 2008);
                    break;
                case 4:
                    cm.dispose();
                    cm.openNpc(1530635, 7);
                    break;
                case 5:
                    cm.dispose();
                    cm.openNpc(1530635, 2006);
                    break;
                case 6:
                    cm.dispose();
                    cm.openNpc(1530635, 2007);
                    break;
                case 7:
                    cm.dispose();
                    cm.openNpc(1530635, 2008);
                    break;
                case 8:
                    cm.dispose();
                cm.openNpc(1530635, 7);
                    break;
                case 9:
                    cm.dispose();
                    cm.openNpc(1530637, 2009)
                    break;
                case 10:
                    cm.dispose();
                    cm.openNpc(1012121, "DeleteCash")
                    break;
                case 11:
                    cm.dispose();
                    cm.openNpc(1012008, "GameCenter")
                    break;
                case 20:
                    cm.dispose();
                    cm.openNpc(9900005, 11);
                    break;
                case 999:
                    cm.dispose();
                    cm.openNpc(1530635,0)
                    break;
            }
        }
    }
}