

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


            var text = "#e你好,您需要兌換嗎!\r\n";
          // text += "#r#L2#我要用600個蝸牛殼兌換低級貝勒#l\r\n";
          //  text += "#d#L3#我要用600個蝸牛殼兌換135級布萊克繽#l\r\n";
            text += "#r#L4#我要用600個蝸牛殼兌換135級布萊克繽武器#l\r\n";
            
            cm.sendSimple(text);

        } else if (status == 1) {
           
            switch(selection){
                case 2:
                    cm.sendYesNo("確定要用蝸牛殼兌換低級貝勒嗎");
                    break;
                case 3:
                    cm.sendYesNo("確定要用蝸牛殼兌換135級布萊克繽嗎");
                    break;
                case 4:
                    cm.sendYesNo("確定要用600個蝸牛殼兌換135級布萊克繽武器嗎");
                    break;
            }
            choose = selection;
        } else if (status == 2) {
            switch(choose){
                case 2:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1132177,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 4:


                    var text = "#e你好,您您可以兌換如下布萊克繽裝備!\r\n";
                    text += "#d#L1# 600個 #v4000000#兌換 布萊克繽閃亮克魯 #v1212072##l\r\n";
                    text += "#d#L2# 600個 #v4000000#兌換 布萊克繽靈魂射手 #v1222067##l\r\n";
                    text += "#d#L3# 600個 #v4000000#兌換 布萊克繽魔劍 #v1232064##l\r\n";
                    text += "#d#L4# 600個 #v4000000#兌換 布萊克繽能量劍 #v1242069##l\r\n";
                    text += "#d#L5# 600個 #v4000000#兌換 布萊克繽能量劍 #v1242070##l\r\n";
                    text += "#d#L6# 600個 #v4000000#兌換 布萊克繽單手劍 #v1302070##l\r\n";
                    text += "#d#L7# 600個 #v4000000#兌換 布萊克繽單手斧 #v1312142##l\r\n";
                    text += "#d#L8# 600個 #v4000000#兌換 布萊克繽單手棍 #v1322100##l\r\n";
                    text += "#d#L9# 600個 #v4000000#兌換 布萊克繽短劍 #v1332214##l\r\n";
                    text += "#d#L10# 600個 #v4000000#兌換 布萊克繽雙刀 #v1342079##l\r\n";
                    text += "#d#L11# 600個 #v4000000#兌換 布萊克繽手杖 #v1362081##l\r\n";
                    text += "#d#L12# 600個 #v4000000#兌換 布萊克繽短杖 #v1372168##l\r\n";
                    text += "#d#L13# 600個 #v4000000#兌換 布萊克繽長杖 #v1382199##l\r\n";
                    text += "#d#L14# 600個 #v4000000#兌換 布萊克繽雙手劍 #v1402185##l\r\n";
                    text += "#d#L15# 600個 #v4000000#兌換 布萊克繽雙手斧 #v1412126##l\r\n";
                    text += "#d#L16# 600個 #v4000000#兌換 布萊克繽雙手棍 #v1422129##l\r\n";
                    text += "#d#L17# 600個 #v4000000#兌換 布萊克繽長槍 #v1432158##l\r\n";
                    text += "#d#L18# 600個 #v4000000#兌換 布萊克繽長矛 #v1442209##l\r\n";
                    text += "#d#L19# 600個 #v4000000#兌換 布萊克繽弓 #v1452196##l\r\n";
                    text += "#d#L20# 600個 #v4000000#兌換 布萊克繽弩 #v1462184##l\r\n";
                    text += "#d#L21# 600個 #v4000000#兌換 布萊克繽拳套 #v1472205##l\r\n";
                    text += "#d#L22# 600個 #v4000000#兌換 布萊克繽指虎 #v1482159##l\r\n";
                    text += "#d#L23# 600個 #v4000000#兌換 布萊克繽火槍 #v1492170##l\r\n";
                    text += "#d#L24# 600個 #v4000000#兌換 布萊克繽雙弩槍 #v1522085##l\r\n";
                    text += "#d#L25# 600個 #v4000000#兌換 布萊克繽火炮 #v1532089##l\r\n";
                    text += "#d#L26# 600個 #v4000000#兌換 布萊克繽魔法棒 #v1252062##l\r\n";                    
                    cm.sendSimple(text);
                    break;
            }
            
        }else if(status == 3){
            switch(selection){
                case 1:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1212072,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 2:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1222067,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 3:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1232064,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 4:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1242069,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 5:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1242070,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 6:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1302070,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 7:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1312142,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 8:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1322100,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 9:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1332214,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 10:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1342079,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 11:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1362081,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 12:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1372168,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 13:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1382199,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 14:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1402185,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 15:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1412126,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 16:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1422129,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 17:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1432158,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 18:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1442209,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 19:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1452196,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 20:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1462184,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 21:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1472205,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 22:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1482159,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 23:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1492170,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 24:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1522085,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 25:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1532089,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 26:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1252062,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
            }
        }
    }
}