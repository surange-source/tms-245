/*
 * 芬芬時尚潮流
 * 楓葉兌換R.E.D
 */
var status = 0;
var eff ="#fUI/UIWindow/Quest/icon6/7#";
var eff1 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，想選擇什麼樣的R.E.D兌換:\r\n";
        selStr += "#L0#" + eff1 + "#rR.E.D兌換簡介#l#k\r\n\r\n";
        selStr += "    " + eff1 + "#v4310088##z4310088#：#r" + cm.getItemQuantity(4310088) + "#k個        #v4001126##z4001126#：#r" + cm.getItemQuantity(4001126) + "#k個\r\n\r\n";
        selStr += "#L1#" + eff1 + "#b[R.E.D]R.E.D幣兌換楓葉        (#k目前狀態:#r推薦內容#b)#l\r\n";
        selStr += "#L2#" + eff1 + "#b[R.E.D]楓葉兌換R.E.D幣        (#k目前狀態:#r推薦內容#b)#l\r\n";    
        selStr += "#L3#" + eff1 + "#b打開R.E.D商店                (#k目前狀態:#r推薦內容#b)#l\r\n\r\n";                
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，歡迎來到R.E.D兌換簡介:\r\n\r\n#r" + eff1 + "R.E.D幣兌換成金楓葉 比例為 1 : 1\r\n" + eff1 + "金楓葉兌換成R.E.D幣 比例為 1 : 1\r\n" + eff1 + "R.E.D幣兌換成金楓葉就能與玩家進行交易\r\n" + eff1 + "金楓葉兌換成R.E.D幣就能購買R.E.D商店道具#l");
            cm.dispose();
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9900002,51);
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900002,51);
            break;
        case 3:
            cm.dispose();
            cm.openShop(9000201);
            break;                
        }
    }
}