var status = 0;
var eff = "#fEffect/CharacterEff/1112905/0/1#";

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
        var selStr = "您好，歡迎來到歡樂大雜燴,我是各種商城物品販賣商\r\n您目前的兔兔幣餘額:#r" + cm.getHyPay(1) + " \r\n";
    selStr+="#r#k\r\n";
        selStr += "#r#L0#" + eff + "#d寵物預覽#l\r\n";
        selStr += "#L9#" + eff + "時尚寵裝#l";
        selStr += "#L17#" + eff + "時尚寵食#l";
        selStr += "#L18#" + eff + "時尚補品#l";
        selStr += "#L19#" + eff + "時尚美食#l\r\n";
        selStr += "#b#L1#" + eff + "時尚帽子#l";
        selStr += "#b#L111#" + eff + "時尚帽子1#l";
        selStr += "#b#L110#" + eff + "時尚帽子2#l";
        selStr += "#L2#" + eff + "時尚披風#l";
        selStr += "#L3#" + eff + "時尚上衣#l";
        selStr += "#L4#" + eff + "時尚配件#l";
        selStr += "#b#L5#" + eff + "時尚機械#l";
        selStr += "#L6#" + eff + "時尚手套#l";
        selStr += "#L7#" + eff + "時尚套服#l";
        selStr += "#L71#" + eff + "時尚套服1#l";
        selStr += "#L8#" + eff + "時尚褲子#l\r\n";
        selStr += "#L10#" + eff + "時尚指環#l";
        selStr += "#L11#" + eff + "時尚盾牌#l";
        selStr += "#L12#" + eff + "時尚鞋子#l";
        selStr += "#L13#" + eff + "時尚坐騎#l";
        selStr += "#L14#" + eff + "時尚武器#l";
        selStr += "#L141#" + eff + "時尚武器1#l";
        selStr += "#L15#" + eff + "時尚????#l";
        selStr += "#L16#" + eff + "時尚稱號#l";
        selStr += "#L20#" + eff + "時尚召喚#l";
        selStr += "#L21#" + eff + "閃亮克魯,靈魂射手#l";
        selStr += "#L22#" + eff + "單手劍,斧#l\r\n";
        selStr += "#L221#" + eff + "單手劍,斧1#l";
        selStr += "#L23#" + eff + "單手棍,短劍#l";
        selStr += "#L231#" + eff + "單手棍,短劍1#l\r\n";
        selStr += "#L24#" + eff + "刀,手杖#l";
        selStr += "#L25#" + eff + "副手#l";
        selStr += "#L26#" + eff + "短杖,長杖#l";
        selStr += "#L27#" + eff + "雙手劍,斧#l\r\n";
        selStr += "#L28#" + eff + "雙手棍,槍#l";
        selStr += "#L29#" + eff + "矛,弓#l";
        selStr += "#L30#" + eff + "弩,拳套#l";
        selStr += "#L301#" + eff + "弩,拳套1#l\r\n";
        selStr += "#L31#" + eff + "指虎,火槍#l";
        selStr += "#L32#" + eff + "雙弩槍,加農砲#l";
        selStr += "#L33#" + eff + "帽子1#l";
        selStr += "#L34#" + eff + "帽子2#l";
        selStr += "#L341#" + eff + "帽子3#l";
        selStr += "#L351#" + eff + "帽子4#l";
        selStr += "#L35#" + eff + "披風#l";
        selStr += "#L36#" + eff + "上衣#l";
        selStr += "#L361#" + eff + "上衣1#l\r\n";
        selStr += "#L37#" + eff + "龍,機械,盾#l";
        selStr += "#L38#" + eff + "手套#l";
        selStr += "#L381#" + eff + "手套1#l";
        selStr += "#L39#" + eff + "套服#l";
        selStr += "#L391#" + eff + "套服1#l";
        selStr += "#L40#" + eff + "褲子#l";
        selStr += "#L401#" + eff + "褲子1#l";
        selStr += "#L41#" + eff + "戒指#l";
        selStr += "#L42#" + eff + "鞋#l";
        selStr += "#L421#" + eff + "鞋1#l\r\n";
        selStr += "#L43#" + eff + "圖騰#l";
        selStr += "#L44#" + eff + "配件1#l";
        selStr += "#L45#" + eff + "配件2#l";
        selStr += "#L46#" + eff + "配件3#l";
        selStr += "#L431#" + eff + "配件4#l\r\n";
        selStr += "#L451#" + eff + "配件5#l";
        selStr += "#L461#" + eff + "配件6#l";
        cm.sendSimpleS(selStr, 2);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            //寵物
            cm.dispose();
            cm.openNpc(9310072, "dzahui20");
            break;
            case 1:
            //時尚帽子
            cm.dispose();
            cm.openNpc(9310072, "dzahui21");
            break;
            case 110:
            //時尚帽子
            cm.dispose();
            cm.openNpc(9310072, "dzahui211");
            break;
            case 111:
            //時尚帽子
            cm.dispose();
            cm.openNpc(9310072, "dzahui212");
            break;
            case 2:
            //時尚披風
            cm.dispose();
            cm.openNpc(9310072, "dzahui22");
            break;
            case 3:
            //時尚上衣
            cm.dispose();
            cm.openNpc(9310072, "dzahui23");
            break;
            case 4:
            //時尚配件
            cm.dispose();
            cm.openNpc(9310072, "dzahui24");
            break;
            case 5:
            //時尚機械
            cm.dispose();
            cm.openNpc(9310072, "dzahui25");
            break;
            case 6:
            //時尚手套
            cm.dispose();
            cm.openNpc(9310072, "dzahui26");
            break;
            case 7:
            //時尚套服
            cm.dispose();
            cm.openNpc(9310072, "dzahui27");
            break;
            case 71:
            //時尚套服
            cm.dispose();
            cm.openNpc(9310072, "dzahui271");
            break;
            case 8:
            //時尚褲子
            cm.dispose();
            cm.openNpc(9310072, "dzahui28");
            break;
            case 9:
            //時尚寵裝
            cm.dispose();
            cm.openNpc(9310072, "dzahui29");
            break;
            case 10:
            //時尚指環
            cm.dispose();
            cm.openNpc(9310072, "dzahui30");
            break;
            case 11:
            //時尚盾牌
            cm.dispose();
            cm.openNpc(9310072, "dzahui31");
            break;
            case 12:
            //時尚鞋子
            cm.dispose();
            cm.openNpc(9310072, "dzahui32");
            break;
            case 13:
            //時尚坐騎
            cm.dispose();
            cm.openNpc(9310072, "dzahui33");
            break;
            case 14:
            //時尚武器
            cm.dispose();
            cm.openNpc(9310072, "dzahui34");
            break;
            case 141:
            //時尚武器
            cm.dispose();
            cm.openNpc(9310072, "dzahui341");
            break;
            case 15:
            //時尚
            cm.dispose();
            cm.sendOk("#r管理員正在拚命添加...");
            break;
            case 16:
            //時尚稱號
            cm.dispose();
            cm.openNpc(9310072, "dzahui35");
            break;
            case 17:
            //時尚寵食
            cm.dispose();
            cm.openNpc(9310072, "dzahui36");
            break;
            case 18:
            //時尚補品
            cm.dispose();
            cm.openNpc(9310072, "dzahui37");
            break;
            case 19:
            //時尚補品
            cm.dispose();
            cm.openNpc(9310072, "dzahui38");
            break;
            case 20:
            //時尚召喚
            cm.dispose();
            cm.openNpc(9310072, "dzahui39");
            break;
            case 21:
            //閃亮克魯,靈魂射手
            cm.dispose();
            cm.openNpc(9310072, "dzahui40");
            break;
            case 22:
            //單手劍,斧
            cm.dispose();
            cm.openNpc(9310072, "dzahui41");
            break;
            case 221:
            //單手劍,斧
            cm.dispose();
            cm.openNpc(9310072, "dzahui411");
            break;
            case 23:
            //單手棍,短劍
            cm.dispose();
            cm.openNpc(9310072, "dzahui42");
            break;
            case 231:
            //單手棍,短劍
            cm.dispose();
            cm.openNpc(9310072, "dzahui421");
            break;
            case 24:
            //刀,魔法箭矢,卡片,寶盒,寶珠,龍之精髓,靈魂手鐲，麥林,手杖
            cm.dispose();
            cm.openNpc(9310072, "dzahui43");
            break;
            case 25:
            //副手
            cm.dispose();
            cm.openNpc(9310072, "dzahui44");
            break;
            case 26:
            //短杖,長杖
            cm.dispose();
            cm.openNpc(9310072, "dzahui45");
            break;
            case 27:
            //雙手劍,斧
            cm.dispose();
            cm.openNpc(9310072, "dzahui46");
            break;
            case 28:
            //雙手棍,槍
            cm.dispose();
            cm.openNpc(9310072, "dzahui47");
            break;
            case 29:
            //矛,弓
            cm.dispose();
            cm.openNpc(9310072, "dzahui48");
            break;
            case 30:
            //弩
            cm.dispose();
            cm.openNpc(9310072, "dzahui49");
            break;
            case 301:
            //拳套
            cm.dispose();
            cm.openNpc(9310072, "dzahui491");
            break;
            case 31:
            //指虎,火槍
            cm.dispose();
            cm.openNpc(9310072, "dzahui50");
            break;
            case 32:
            //雙弩槍,加農砲
            cm.dispose();
            cm.openNpc(9310072, "dzahui51");
            break;
            case 33:
            //帽子1
            cm.dispose();
            cm.openNpc(9310072, "dzahui52");
            break;
            case 34:
            //帽子2
            cm.dispose();
            cm.openNpc(9310072, "dzahui53");
            break;
            case 341:
            //帽子3
            cm.dispose();
            cm.openNpc(9310072, "dzahui521");
            break;
            case 351:
            //帽子3
            cm.dispose();
            cm.openNpc(9310072, "dzahui531");
            break;
            case 35:
            //披風
            cm.dispose();
            cm.openNpc(9310072, "dzahui54");
            break;
            case 36:
            //上衣
            cm.dispose();
            cm.openNpc(9310072, "dzahui55");
            break;
            case 361:
            //上衣
            cm.dispose();
            cm.openNpc(9310072, "dzahui551");
            break;
            case 37:
            //龍,機械,盾
            cm.dispose();
            cm.openNpc(9310072, "dzahui56");
            break;
            case 38:
            //手套
            cm.dispose();
            cm.openNpc(9310072, "dzahui57");
            break;
            case 381:
            //手套
            cm.dispose();
            cm.openNpc(9310072, "dzahui571");
            break;
            case 391:
            //手套
            cm.dispose();
            cm.openNpc(9310072, "dzahui581");
            break;
            case 39:
            //套服
            cm.dispose();
            cm.openNpc(9310072, "dzahui58");
            break;
            case 40:
            //褲子
            cm.dispose();
            cm.openNpc(9310072, "dzahui59");
            break;
            case 401:
            //褲子
            cm.dispose();
            cm.openNpc(9310072, "dzahui591");
            break;
            case 41:
            //戒指
            cm.dispose();
            cm.openNpc(9310072, "dzahui60");
            break;
            case 42:
            //鞋
            cm.dispose();
            cm.openNpc(9310072, "dzahui61");
            break;
            case 421:
            //鞋
            cm.dispose();
            cm.openNpc(9310072, "dzahui611");
            break;
            case 43:
            //圖騰
            cm.dispose();
            cm.openNpc(9310072, "dzahui62");
            break;
            case 44:
            //配件1
            cm.dispose();
            cm.openNpc(9310072, "dzahui63");
            break;
            case 441:
            //配件1
            cm.dispose();
            cm.openNpc(9310072, "dzahui631");
            break;
            case 451:
            //配件1
            cm.dispose();
            cm.openNpc(9310072, "dzahui641");
            break;
            case 45:
            //配件2
            cm.dispose();
            cm.openNpc(9310072, "dzahui64");
            break;
            case 461:
            //配件2
            cm.dispose();
            cm.openNpc(9310072, "dzahui651");
            break;
            case 46:
            //配件3
            cm.dispose();
            cm.openNpc(9310072, "dzahui65");
            break;
        }
    }
}
