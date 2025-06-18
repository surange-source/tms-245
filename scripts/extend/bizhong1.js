var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ttt5 = "#fUI/UIWindow/Quest/icon5/1#";

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
        var selStr = "#e#d歡迎使用土豪樂豆點商城，使用後將會扣除相對應的樂豆點.購買後概不退款，請慎重請選擇#n#k:\r\n";
            selStr += "#d您當前擁有樂豆點：  #r" + cm.getPlayer().getCSPoints(1) + "#k #d點#k#l\r\n\r\n";
        selStr += "#r#L5#"+ttt6+" 楓點裝備道具商店[屌絲專用]#l\r\n\r\n";
        selStr += "- #e#d土豪專屬#n#k\r\n";
            selStr += "#r#L0#"+ttt6+" 樂豆點購買裝備[各種給力高級裝備]#l\r\n";
            selStr += "#L1#"+ttt6+" 樂豆點購買道具[各種稀有消耗道具]#l\r\n";
            selStr += "#L2#"+ttt6+" 樂豆點購買椅子[各種非賣好看椅子]#l\r\n";
        selStr += "#L3#"+ttt6+" 樂豆點購買禮包[各種實惠划算禮包]#l\r\n";
            //selStr += "#L4#"+ttt6+" 打開儲值網站進行儲值[10TWD:5000樂豆點]#l\r\n";
            selStr += " ";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 12);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 13);
            break;
        case 2:
        cm.sendOk("期待添加。");
            cm.dispose();
            //cm.openNpc(9310144, 15);
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9310144, 14);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9900003, 16);
            break;
        case 4:
            cm.dispose();
            cm.openWeb("http://www.huiyimxd.com");
        cm.sendOk("已經為您打開贊助網站！");
            break;
        }
    }
}