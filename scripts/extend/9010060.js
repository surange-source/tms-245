/* 樂豆點商店 */

var status = 0;

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好!#k)\r\n#b#L0#雜貨商店#l    #L1#RED 商店#l    #L2#11週年裝備#l\r\n#b#L3#BOSS幣店#l    #b#L4#漩渦商店#l     #b#L5#副手裝備#l\r\n#b#L6#真棒圖騰#l    #L7#外星人幣#l     #L8#低級武器#l\r\n#b#L9#組隊點數#l    #L10#喇叭專賣#l     #L11#結婚禮服#l ";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0://雜貨商店
            cm.dispose();
            cm.openShop(61);
            break;
        case 1://RED商店
            cm.dispose();
            cm.openShop(69);
            break;
        case 2://11週年裝備
            cm.dispose();
            cm.openShop(9071001);
            break;
        case 3://BOSS幣店
            cm.dispose();
            cm.openShop(68);
            break;
        case 4://征服幣店
            cm.dispose();
            cm.openShop(66);
            break;
        case 5://副手裝備
            cm.dispose();
            cm.openShop(63);
            break;
        case 6://漩渦裝備
            cm.dispose();
            cm.openShop(74);
            break;
        case 7://外星人幣
            cm.dispose();
            cm.openShop(322);
            break;
        case 8://低級武器
            cm.dispose();
            cm.openShop(73);
            break;
        case 9://組隊點數
            cm.dispose();
            cm.openShop(72);
            break;
        case 10://楓幣方塊
            cm.dispose();
            cm.openShop(328);
            break;
        case 11://西服婚紗
            cm.dispose();
            cm.openShop(32);
            break;

        }
    }
}