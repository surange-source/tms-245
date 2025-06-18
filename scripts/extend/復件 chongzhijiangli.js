var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
        } else if (status == 0) {
        var selStr = "|----------------------儲值中心#e"
        selStr = "            儲值1 - 45元\r\n            儲值50 - 100元#r 【送5餘額】#k\r\n#r            儲值100 - 200元【送10餘額】\r\n            儲值200 - 500元【送150餘額】\r\n            儲值500元以上  【送300餘額】#k\r\n        #b【網銀儲值追加10% 儲值卡儲值追加5%】#k\r\n        #r儲值比例1:2#k【餘額追加+儲值方式追加】\r\n";
                  //selStr += "#L0#" + eff + "#r【儲值餘額】#k#l\r\n";
        selStr += "#L2#" + eff + "#b【餘額兌換樂豆點1:3000--#k#r單純兌換#k#b】#k#l\r\n";
        selStr += "#L1#" + eff + "#b【免費領取累計儲值獎勵】#k#l\r\n";
        selStr += "#L3#" + eff + "#r【儲值活動-#k購買禮包 更划算-有大量道具和樂豆點#r】#k#l\r\n";
        selStr += "#L4#" + eff + "#b【理財卡-讓您前程無憂】#k#l\r\n";
        selStr += "#L5#" + eff + "#b【中介系統-通用貨幣】#k#l#z[itemid]#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openWeb("http://1.com");    
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9900001,"leijijl");    
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900002,40);    
            break;
        case 3://儲值網站
            cm.dispose();
            cm.openNpc(9900002,"chongzhd");    
            break;
        case 4://管理僱傭商店
            cm.dispose();
        cm.openNpc(9000111);
            break;
        case 5://累積儲值
            cm.dispose();
        cm.openNpc(9900002,41);
            break;    
    }
    }
}