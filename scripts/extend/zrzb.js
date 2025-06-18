
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化會員
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
        var selStr = "\r\n#e#d          歡迎使用征服者幣購買物品#n#l#k\r\n";
        selStr +="\r\n#r提示：征服者幣請消滅各BOSS或者世界各怪物掉落神秘之冰開出。購買時請注意看清楚，一旦購買概不退貨。#k\r\n\r\n";
        selStr +="#b#L0#"+ttt6+" 製作140武器防具150武器防具#l\r\n";
        selStr +="#L1#"+ttt6+" 購買各種職業副手裝備之類等#l\r\n";
        selStr +="#L2#"+ttt6+" 購買各種消耗卷軸特殊之類等#l#k\r\n\r\n";
        selStr +=" ";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9900003,24);
            break;
        case 1:
            cm.dispose();
            cm.openShop(22221);
            break; 
        case 2:
            cm.dispose();
            cm.openShop(22223);
            break; 
 
 
        }
    }
    }