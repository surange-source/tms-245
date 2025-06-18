/*
    製作：WSY工作室
    功能：日常任務
    時間：2016年12月23日
*/
var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fEffect/CharacterEff/1051296/1/0#";
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1

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
    if (cm.getMapId() == 180000001 || cm.getMapId() == 910340100 || cm.getMapId() == 910340200 || cm.getMapId() == 910340300 || cm.getMapId() == 910340400 || cm.getMapId() == 910340500 || cm.getMapId() == 910340000) {
        cm.sendOk("很遺憾，您因為在特殊地圖無法使用此功能.")
        cm.dispose();
    } else if (status == 0) {
        var selStr = "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + " #e日常任務 " + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "\r\n";
        selStr += "#L0#" + eff + " #r每日簽到#l\r\n";
        selStr += "#L2#" + eff + " #r在線獎勵#l          #L4#" + eff + " #r每日尋寶#l\r\n";
        //selStr += "#L4#" + eff + " #r每日尋寶#l          #L5#" + eff + " #r陸續添加#l\r\n";
        selStr += "\r\n" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "" + eff1 + "\r\n";

        selStr += "\r\n\t\t\t#b#L6#" + ttt + " 返回上一頁#l#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 6:
                cm.dispose();
                cm.openNpc(1530635,0);
                break;
            case 0:
                cm.dispose();
                cm.openNpc(1530635, "qiandao11");
                break;
            case 1://猜數字
                cm.dispose();
                cm.openNpc(1530635, 11);
                break;
            case 2://開鎖
                cm.dispose();
                cm.openNpc(1530635, "zaixianshijian5");
                break;
            case 3:
                cm.dispose();
                cm.openNpc(1540518, 1);
            case 4:
                cm.dispose();
                cm.openNpc(2084001);

        }
    }
}