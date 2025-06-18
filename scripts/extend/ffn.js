
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var choose = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        if (status == 0) {


            var text = "#e你好,您需要兌換武器嗎!\r\n#d在線時間可以獲得#v4310110#，60分鐘獲得1個，120至360分鐘可以獲得2個，720分鐘可以領10個！(一天總共15個)\n\r\n\r\n";
           text += "#r#L2#" + eff + " 我要用600個#v4000000#兌換低級貝勒#l\r\n";
            text += "#b#L3#" + eff + " 我要用600個#v4000000#兌換135級布萊克繽#l\r\n";
            text += "#r#L4#" + eff + " 我要用#v4310110#兌換150級法弗納武器#l\r\n";
            
            cm.sendSimple(text);

        } else if (status == 1) {
           
            switch(selection){
                case 2:
                    cm.dispose();
                                        cm.openNpc(9010022,"djbl");
                    break;
                case 3:
                    cm.dispose();
                                        cm.openNpc(9010022,"blkb");
                    break;
                case 4:
                    cm.sendYesNo("確定要用#v4310110#兌換150級法弗納武器嗎");
                    break;
            }
            choose = selection;
        } else if (status == 2) {
            switch(choose){

                case 4:


                    var text = "#e你好,您您可以兌換如下法弗納裝備!\r\n";
                    text += "#d#L100# 300個 #v4310110#兌換 法弗納皇刀正宗 #v1542063##l\r\n";
                    text += "#d#L200# 300個 #v4310110#兌換 法弗納煌扇藍姬 #v1552063##l\r\n";
                    text += "#d#L1# 300個 #v4310110#兌換 法弗納魔力源泉杖 #v1212063##l\r\n";
                    text += "#d#L2# 300個 #v4310110#兌換 法弗納天使手銃 #v1222058##l\r\n";
                    text += "#d#L3# 300個 #v4310110#兌換 法弗納死亡使者 #v1232057##l\r\n";
                    text += "#d#L4# 300個 #v4310110#兌換 法弗納精神之刃 #v1242060##l\r\n";
                    text += "#d#L5# 300個 #v4310110#兌換 法弗納精神之刃 #v1242061##l\r\n";
                    text += "#d#L6# 300個 #v4310110#兌換 法弗納銀槲之劍 #v1302275##l\r\n";
                    text += "#d#L7# 300個 #v4310110#兌換 法弗納雙刃切肉斧 #v1312153##l\r\n";
                    text += "#d#L8# 300個 #v4310110#兌換 法弗納戈耳迪錘 #v1322203##l\r\n";
                    text += "#d#L9# 300個 #v4310110#兌換 法弗納大馬士革劍 #v1332225##l\r\n";
                    text += "#d#L10# 300個 #v4310110#兌換 法弗納急速之刃 #v1342082##l\r\n";
                    text += "#d#L11# 300個 #v4310110#兌換 法弗納洞察手杖 #v1362090##l\r\n";
                    text += "#d#L12# 300個 #v4310110#兌換 法弗納魔力奪取者 #v1372177##l\r\n";
                    text += "#d#L13# 300個 #v4310110#兌換 法弗納魔冠之杖 #v1382208##l\r\n";
                    text += "#d#L14# 300個 #v4310110#兌換 法弗納懺悔之劍 #v1402196##l\r\n";
                    text += "#d#L16# 300個 #v4310110#兌換 法弗納戰鬥切肉斧 #v1412135##l\r\n";
                    text += "#d#L17# 300個 #v4310110#兌換 法弗納閃電錘 #v1422140##l\r\n";
                    text += "#d#L18# 300個 #v4310110#兌換 法弗納貫雷槍  #v1432167##l\r\n";
                    text += "#d#L19# 300個 #v4310110#兌換 法弗納半月寬刃斧 #v1442223##l\r\n";
                    text += "#d#L20# 300個 #v4310110#兌換 法弗納追風者 #v1452205##l\r\n";
                    text += "#d#L21# 300個 #v4310110#兌換 法弗納風翼弩 #v1462193##l\r\n";
                    text += "#d#L22# 300個 #v4310110#兌換 法弗納危險之手 #v1472214##l\r\n";
                    text += "#d#L23# 300個 #v4310110#兌換 法弗納巨狼之爪 #v1482168##l\r\n";
                    text += "#d#L24# 300個 #v4310110#兌換 法弗納左輪槍 #v1492179##l\r\n";
                    text += "#d#L25# 300個 #v4310110#兌換 法弗納雙風翼弩 #v1522094##l\r\n";
                    text += "#d#L26# 300個 #v4310110#兌換 法弗納榮耀炮 #v1532098##l\r\n";
                    text += "#d#L27# 300個 #v4310110#兌換 法弗納北極星魔法棒 #v1252015##l\r\n";
                    cm.sendSimple(text);
                    break;
            }
            
        }else if(status == 3){
            switch(selection){
                case 100:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1542063,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 200:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1552063,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 1:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1212063,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 2:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1222058,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 3:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1232057,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 4:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1242060,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 5:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1242061,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 6:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1302275,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 7:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1312153,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 8:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1322203,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 9:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1332225,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 10:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1342082,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 11:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1362090,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 12:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1372177,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 13:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1382208,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 14:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1402196,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 16:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1412135,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 17:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1422140,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 18:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1432167,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 19:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1442223,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 20:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1452205,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 21:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1462193,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 22:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1472214,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 23:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1482168,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 24:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1492179,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 25:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1522094,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 26:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1532098,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
                case 27:
                    if(cm.haveItem(4310110, 300)) {
                        cm.gainItem(4310110,-300);
                        cm.gainItem(1252015,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有300個#v4310110#");
                    }
                    cm.dispose();
                    break;
            }
        }
    }
}