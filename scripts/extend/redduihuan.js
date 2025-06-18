var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var itemlist = Array(
Array(1022197, 980),
Array(1132242, 500),
Array(1003946, 500), 
Array(1102612, 500),
Array(1082540, 500),
Array(1052647, 500),
Array(1072853, 500),
Array(3700161, 800),
Array(1212084, 800),
Array(1222079, 800),
Array(1232079, 800),
Array(1242085, 800),
Array(1242086, 800),
Array(1302224, 800),
Array(1312115, 800),
Array(1322161, 800),
Array(1332192, 800), 
Array(1342070, 800), 
Array(1362104, 800), 
Array(1372137, 800), 
Array(1382167, 800),
Array(1402150, 800), 
Array(1412103, 800), 
Array(1422106, 800), 
Array(1432137, 800), 
Array(1442181, 800),
Array(1452168, 800),
Array(1472178, 800),
Array(1482139, 800),
Array(1492149, 800),
Array(1522108, 800),
Array(1532113, 800),
Array(1252063, 800),
Array(1462157, 800),
Array(1132246, 58000),
Array(1122267, 58000),
Array(1032223, 58000),
Array(1113075, 58000),
Array(1142002, 1500),
Array(1142005, 2500),
Array(1142006, 3500),
Array(1142008, 3500),
Array(1142716, 3500),
Array(1142717, 3500),
Array(1142716, 3500),
Array(1142669, 3500),
Array(1142656, 3500)
);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "#h0#,#e#r歡迎來到兔花花RED幣兌換中心，您可以在這裡兌換(請保留至少一格物品欄領取)#e#bRED幣物品#n#k,請選擇你想要兌換的物品\r\n#b";
            for (var i=0; i<itemlist.length; i++) {
                text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# - #r"+itemlist[i][1]+"#b RED幣  \r\n";
                if (i != 0 && (i+1) % 5 == 0) {
                    text += "\r\n";
                }
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendGetNumber("請輸入你請你輸入想要兌換的數量\r\n\r\n#r1個需要" + itemlist[selects][1] + "個#bRED幣#k", 1, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想兌換" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]) + "RED幣。");
        } else if (a == 3) {
            if (cm.haveItem(4310088,buynum * itemlist[selects][1])) {
                cm.gainItem(4310088, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("兌換成功了！");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的RED幣。");
                cm.dispose();
            }
        }
    }//mode
}//f