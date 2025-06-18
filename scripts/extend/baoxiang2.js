var status = 0;
var eff = "#fEffect/CharacterEff/1112902/0/1#";

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
        var selStr = "                    <兔花花楓之谷>\r\n#r您好，歡迎使用每星期大雜燴在我這裡看看有沒有您需要的\r\n#v4000855##v4000855##v4000855#            8點58開搶       #v4000855##v4000855##v4000855#\r\n";

    //selStr+="#r全新上架：#b{120}-{123}版本的新裝備全部上架 請注意查看#k\r\n";
        //selStr += "#r#L0#" + eff + "雙倍經驗#l";
        //selStr += "#r#L1#" + eff + "各類椅子#l";
        //selStr += "#r#L2#" + eff + "絕版點裝#l";
        //selStr += "#r#L3#" + eff + "兔兔點裝#l\r\n";
        //selStr += "#r#L4#" + eff + "#d購買商城物品[喇叭,楓之谷轉蛋卷,防暴捲]#l\r\n";
        //selStr += "#b#L5#" + eff + "巨匠套裝#l";
        //selStr += "#L6#" + eff + "吊墜專賣#l";
        //selStr += "#L7#" + eff + "護肩專賣#l";
        //selStr += "#L8#" + eff + "徽章專賣#l";
        //selStr += "#b#L9#" + eff + "戒指專賣#l";
        //selStr += "#L10#" + eff + "圖騰專賣#l";
        //selStr += "#L11#" + eff + "外星套裝#l";
        //selStr += "#L12#" + eff + "紋章專賣#l\r\n";
        //selStr += "#L13#" + eff + "腰帶專賣#l";
        //selStr += "#L14#" + eff + "全職雜物#l";
        //selStr += "#r#L15#" + eff + "弗納武器#l";
    //selStr += "#b#L16#" + eff + "屬性點裝#l";
    //selStr += "#b#L17#" + eff + "勳章專賣#l";
    //selStr += "#b#L18#" + eff + "兔兔大雜燴#n#r[每個星期開啟一次一次2分鐘!]#l";
        //selStr += "#r#L19#" + eff + "低級神裝#l";

        cm.sendSimpleS(selStr, 2);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            //雙倍經驗
            cm.dispose();
            cm.openNpc(9070004, 100);
            break;
        case 1:
            //各類椅子
            cm.dispose();
            cm.openNpc(9070004, 101);
            break;
        case 2:
            //絕版點裝
            cm.dispose();
            cm.openNpc(9070004, 102);
            break;
        case 3:
            //兔兔點裝
            cm.dispose();
            cm.openNpc(9070004, 103);
            break;
        case 4:
            //商城物品
            cm.dispose();
            cm.openNpc(9070004, 104);
            break;
        case 5:
            //巨匠套裝
            cm.dispose();
            cm.openNpc(9070004, 105);
            break;
        case 6:
            //吊墜專賣
            cm.dispose();
            cm.openNpc(9070004, 106);
            break;
        case 7:
            //護肩專賣
            cm.dispose();
            cm.openNpc(9070004, 107);
            break;
        case 8:
            //徽章專賣
            cm.dispose();
            cm.openNpc(9070004, 108);
            break;
        case 9:
            //戒指專賣
            cm.dispose();
            cm.openNpc(9070004, 109);
            break;
        case 10:
            //圖騰專賣
            cm.dispose();
            cm.openNpc(9070004, 110);
            break;
        case 11:
            //外星套裝
            cm.dispose();
            cm.openNpc(9070004, 111);
            break;
        case 12:
            //紋章專賣
            cm.dispose();
            cm.openNpc(9070004, 112);
            break;
        case 13:
            //腰帶專賣
            cm.dispose();
            cm.openNpc(9070004, 113);
            break;
        case 14:
            //全職雜物
            cm.dispose();
            cm.openNpc(9070004, 114);
            break;
        case 15:
            //150裝備
            cm.dispose();
            cm.openNpc(9070004, 115);
            break;

        case 16:
            //屬性點裝
            cm.dispose();
            cm.openNpc(9070004, 116);
            break;
        case 17:
            //勳章特賣
            cm.dispose();
            cm.openNpc(9070004, 117);
            break;
        case 18:
            //大雜燴<全部免費>
            cm.dispose();
            cm.openNpc(9070004, 118);
            break;
        case 19:
            //低級神裝
            cm.dispose();
            cm.openNpc(9070004, 119);//cm.sendOk("#r技術員正在拚命添加...");
            break;

        }
    }
}
