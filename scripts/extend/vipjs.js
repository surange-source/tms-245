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
        var selStr = "#e#r本服特殊的專屬VIP勳章系統，點擊升級可以查看的如何升級，還有獎勵豐富的每日VIP禮包，後期還會開放各種特權。\r\n\r\n#bVIP1#r獎勵#l\r\n#k每日5000樂豆點#v2049116#*5張#v2340000#*20張#v5064000#*10張#v5062500#*10個#v5062009#*10個#v4310210#*5個#v1142538#楓幣200W\r\n\r\n#bVIP2#r獎勵#l\r\n#k每日20000樂豆點#v2049116#*10張#v2340000#*30張#v5064000#*15張#v5062500#*20個#v5062009#*20個#v4310210#*20個#v1142539#楓幣500W\r\n\r\n#bVIP3#r獎勵#l\r\n#k每日50000樂豆點#v2049116#*15張#v2340000#*40張#v5064000#*20張#v5062009#*30個#v5062500#*30個#v4310210#*50個#v1142540#楓幣1000W\r\n\r\n#bVIP4#r獎勵#l\r\n每日#b100000樂豆點#v2049116#*20張#v2340000#*50張#v5064000#*30個#v5062009#*40個#v5062500#*40個#v4310210#*80個#v1142541#楓幣2000W\r\n\r\n#bVIP5#r獎勵#l\r\n每日#b200000樂豆點#v2049116#*30張#v2340000#*50張#v5064000#*30個#v5062009#*50個#v5062500#*50個#v5062024#*5個#v4310210#*100個#v1143000#楓幣5000W\r\n\r\n#bVIP6#r獎勵#l\r\n每日#b300000樂豆點#v2430210#*1#v2049116#*30張#v2340000#*50張#v5064000#*30個#v5062009#*70個#v5062500#*70個#v5062024#*10個#v4310210#*200個#v1142404#楓幣8000W\r\n\r\n#bVIP7#r獎勵#l\r\n每日#b500000樂豆點#v1712000#*1#v2430210#*3#v2049116#*50張#v2340000#*50張#v5064000#*30個#v5062009#*90個#v5062500#*90個#v5062024#*20個#v4310210#*400個#v1142404#楓幣1E";
     //#b#L8#購買絕版寵物#l#L14#購買酷炫騎寵#l

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