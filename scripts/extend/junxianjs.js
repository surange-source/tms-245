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
        var selStr = "#e#r本服特殊的軍銜系統，點擊升級可以查看晉級軍銜的所需要的材料，屬性非常可觀，還有獎勵豐富的每日軍銜禮包，後期還會開放各種特權。\r\n\r\n#b團長軍銜#r獎勵#l\r\n#k每日五千楓點#v2049122#*5張#v2340000#*5張#v5064000#*5張#v5062002#*10個#v5062500#*5個#v1142321#楓幣300W\r\n\r\n#b旅長軍銜#r獎勵#l\r\n#k每日1W楓點#v2049122#*5個#v2340000#*10個#v5064000#*5個#v5062500#*10個#v5062002#*20個#v1142318#楓幣500W\r\n\r\n#b師長軍銜#r獎勵#l\r\n#k每日2W楓點#v2049122#*10個#v2340000#*20個#v5064000#*10個#v5062002#*20個#v5062009#*10個#v1142319#楓幣1000W\r\n\r\n#b軍長軍銜#r獎勵#l\r\n每日#b3W楓點#v2049122#*20個#v2340000#*30個#v5064000#*20個#v5062002#*30個#v5062009#*20個#v1142320#楓幣2000W";
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