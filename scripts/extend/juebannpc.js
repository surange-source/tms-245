/*伏特加專櫃*/
var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var kkk ="#fEffect/CharacterEff/1051296/1/0#";
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt ="#fEffect/ItemEff/1112811/0/0#";//音符

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
        selStr += "" + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + "";
        selStr += "        #r#r#e親愛的#r#h ##k您好#b#k\r\n    #k樂豆點:#r#e" + cm.getPlayer().getCSPoints(1) + "#k#k    #n餘額:#r#e"+cm.getHyPay(1)+"#k#n\r\n";
        selStr += "" + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + " " + eff1 + "\r\n";
        selStr += "#L1#" + eff + "#d點裝商城1#l";
        selStr += "#L2#" + eff + "#d點裝商城2#l";
        selStr += "#L4#" + eff + "#d點裝商城3#l\r\n";
      // selStr += "#L3#" + eff + "#r特效戒指#l ";
      selStr += "#L11#" + eff + "#r傷害皮膚#l ";
       //selStr += "#L27#" + eff + "#r最新點裝#l";



 

        cm.sendSimpleS(selStr, 2);
    } else if (status == 1) {
        switch (selection) {
        case 4:
            cm.dispose();
            cm.openNpc(9010060, "jueban3");
            break;
        case 27:
            //樂豆點商城
            cm.dispose();
            cm.openNpc(9010060, "zuixindianzhuang");
            break;
        case 26:
        if(cm.getPlayer().getLevel() <= 10){
        cm.gainExp( + 50000);
        cm.worldMessage("恭喜新玩家"+ cm.getChar().getName() +"在拍賣NPC處領取5W經驗");
        cm.sendOk("恭喜您領取成功,10級下都能在我這裡領取經驗");
        }else{
        cm.sendOk("你的等級大於10");
    }
    cm.dispose();
            break;
        case 25:
            //樂豆點商城
            cm.dispose();
            cm.openNpc(9900003, "jinengxiaoguo");
            break;
        case 24:
            //樂豆點商城
            cm.dispose();
            cm.openNpc(9900003, 905);
            break;
        case 23:
            //樂豆點商城
            cm.dispose();
            cm.openNpc(9900003, 904);
            break;
        case 1:
            //樂豆點商城
            cm.dispose();
            cm.openNpc(1500029, "jueban");
            break;
        case 2:
            //兔幣神器
            cm.dispose();
            cm.openNpc(1500029, "jueban0");
            break;

        case 3:
            //兔幣商城
            cm.dispose();
            cm.openNpc(9100000, "jiezhi0");
            break;

        case 11:
            //放大鏡商城
            cm.dispose();
            cm.openNpc(1013102, "shanhaipifu");
            break;

        case 12:
            //遊戲商店
            cm.dispose();
            cm.openNpc(9070004, "shanhaipifu");
            break;

        case 13:
            //回收
            cm.dispose();
            cm.openNpc(9900002, 14);
            break;

        case 14:
            //回收
            cm.dispose();
            cm.openNpc(9120106, 4);
            break;

        case 15:
            //解鎖
            if (cm.itemQuantity(4033647) >=50){
            cm.dispose();
            cm.openNpc(9900002, 155);
cm.worldSpouseMessage(0x15,"[解鎖裝備] 土豪~！"+ cm.getChar().getName() +"  在趙雲處打開瞭解鎖裝備NPC，大家快去打劫他(她)！");
            }else{
                cm.sendOk("需要50個 #v4033647# #z4033647# 才能打開解鎖裝備！");
        cm.dispose();
            }
            break;

        case 16:
            //回收
            cm.dispose();
            cm.openNpc(9070004, 299);
            break;

        case 17:
            //回收
            cm.dispose();
            cm.openNpc(9900002, 156);
            break;

        case 19:
            //回收
            cm.dispose();
            cm.openNpc(9070004, 252);
            break;

        case 20:
            //回收
            cm.dispose();
            cm.openNpc(9900003, 104);
            break;

        case 21:
            //回收
            cm.dispose();
            cm.openNpc(9900003, 7);
            break;

        case 22:
            //回收
            cm.dispose();
            cm.openNpc(9900003, 8);
            break;

        case 18:
            //回收
            cm.dispose();
            cm.openNpc(9070004, 251);
            //cm.sendOk("#b使用#z2430979# #v2430979#可直接提升到#k#r251#k#b級，方便轉身使用。\r\n#e轉身找市場楓葉募捐箱，我要轉身，轉身1次能力點+100 以此類推！#n\r\n");
            break;
        }
    }
}
