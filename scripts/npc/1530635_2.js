var eff = "#fEffect/CharacterEff/1051296/1/0#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        var map = Java.type("client.MapleClient");
        var text = "#d當前賬戶信息如下：\r\n";
        text += "====================================\r\n#b"
        text += "#L0#" + eff + "\t遊戲賬號： #r" + format(" ", 15, cm.getClient().getAccountName()) + "#b #e#r【改密】#b#n#l\r\n";
        text += "#L1#" + eff + "\t元寶餘額： #r" + format(" ", 15, cm.getHyPay(1).toString()) + "#b #e#r【儲值】#n#l\r\n";
        text += "#L3#" + eff + "\t剩餘樂豆點： #r" + format(" ", 15, cm.getPlayer().getCSPoints(1).toString()) + "#b #e#r【兌換】#b#n#l\r\n";
        text += "#L4#" + eff + "\t剩餘楓點： #r" + format(" ", 15, cm.getPlayer().getCSPoints(2).toString()) + "#b #e#r【兌換】#b#n#l\r\n\r\n";
        text += "\t\t\t\t#L5#"+ "#b" + ttt + "返回上一頁";
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendOk("暫時不支持在線改密，請前往登陸器改密。");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendOk("請聯繫管理。");
            cm.dispose();
        } else if (selection == 2) { // 禮包
            cm.dispose();
            cm.openNpc(1530638, 2);
        } else if (selection == 3) {
            selection = 0;
            cm.dispose();
            cm.openNpc(9300011, 2);
        } else if (selection == 4) {
            cm.sendOk("暫時不支持楓點換樂豆點。");
            cm.dispose();
         } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(1530635, 0);
        }
    }
}


var format = function FormatString(c, length, content) {
    var str = "";
    var cs = "";
    if (content.length > length) {
        str = content;
    } else {
        for (var j = 0; j < length - content.getBytes("GB2312").length; j++) {
            cs = cs + c;
        }
    }
    str = content + cs;
    return str;
}
    