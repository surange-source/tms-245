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
        var selStr = "               #v1114231##e#r瑪瑙戒指升級系統介紹#v1114231##l\r\n#v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488#\r\n#b瑪瑙戒指#r『1』~『4』階段\r\n#k需要大量不同的怪物材料來解封,或者通過餘額商城內的禮包直接獲取所需材料,每解封一次,戒指屬性得到巨大提升1\r\n#b瑪瑙戒指#r『5』~『8』階段\r\n#k需要從餘額商城內購買彩色楓葉用以解封瑪瑙戒指,每片彩色楓葉#v4032733#只可解封一次,每解封一次,除獲取巨大的屬性外,還能獲得額外的潛能與附加屬性\r\n#b瑪瑙戒指#r『9』~『12』階段\r\n#k需要使用#v2431319#專屬色子解封,目前只從累積儲值禮包獲取,階級越高,需要用到的專屬色子則越多,每解封一次,除獲取巨大的屬性和附加屬性及附加潛能外,還大量增加了戒指可上卷次數";
                     

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9330006); //雙倍道具
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9310074, 3); //暴君
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9310074, 2); //各種椅子
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9900002, 15); //各種喇叭
            break;
        case 7:
            cm.dispose();
            cm.openNpc(9900002, 16); //洗樂豆點軸
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900002, 24); //玩具商店
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9110103); //騎寵商店
            break;
    case 10:
            cm.dispose();
            cm.openNpc(9110114); //破攻石頭
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9900002, 5); //一鍵潛能
            break;
    case 12:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
    case 13:
            cm.dispose();
            cm.openNpc(9270096, 13); //一鍵潛能
            break;
    case 14:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
    case 15:
            cm.dispose();
            cm.openNpc(9270096, 15); //一鍵潛能
            break;
        }
    }
}