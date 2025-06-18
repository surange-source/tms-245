status = -1;

var itemList = Array(
Array(    2615043    , 1000, 1, 3),//
Array(    2615044    , 1000, 1, 3),//
Array(    2612076    , 1000, 1, 3),//
Array(    2612077    , 1000, 1, 3),//
Array(    2613064    , 1000, 1, 3),//
Array(    2613065    , 1000, 1, 3),//
Array(    2616074    , 1000, 1, 3),//
Array(    2616075    , 1000, 1, 3),//

Array(    2591582    , 1000, 1, 2),//
Array(    2591583    , 1000, 1, 2),//
Array(    2591584    , 1000, 1, 2),//
Array(    2591585    , 1000, 1, 2),//
Array(    2591586    , 1000, 1, 2),//
Array(    2591587    , 1000, 1, 2),//
Array(    2591588    , 1000, 1, 2),//
Array(    2591589    , 1000, 1, 2),//
Array(    2591590    , 1000, 1, 2),//


Array(    1004808    , 5, 1, 2),//
Array(    1004809    , 5, 1, 2),//
Array(    1004810    , 5, 1, 2),//
Array(    1004812    , 5, 1, 2),//
Array(    1053063    , 5, 1, 2),//
Array(    1053064    , 5, 1, 2),//
Array(    1053065    , 5, 1, 2),//
Array(    1053066    , 5, 1, 2),//
Array(    1053067    , 5, 1, 2),//
Array(    1073158    , 5, 1, 2),//
Array(    1073159    , 5, 1, 2),//
Array(    1073160    , 5, 1, 2),//
Array(    1073161    , 5, 1, 2),//
Array(    1073162    , 5, 1, 2),//
Array(    1082695    , 5, 1, 2),//
Array(    1082696    , 5, 1, 2),//
Array(    1082697    , 5, 1, 2),//
Array(    1082698    , 5, 1, 2),//
Array(    1082699    , 5, 1, 2),//
Array(    1102940    , 5, 1, 2),//
Array(    1102941    , 5, 1, 2),//
Array(    1102942    , 5, 1, 2),//
Array(    1102943    , 5, 1, 2),//
Array(    1102944    , 5, 1, 2),//
Array(    1212120    , 5, 1, 2),//
Array(    1222113    , 5, 1, 2),//
Array(    1232113    , 5, 1, 2),//
Array(    1242121    , 5, 1, 2),//
Array(    1242122    , 5, 1, 2),//
Array(    1252098    , 5, 1, 2),//
Array(    1262039    , 5, 1, 2),//
Array(    1302343    , 5, 1, 2),//
Array(    1312203    , 5, 1, 2),//
Array(    1322255    , 5, 1, 2),//
Array(    1332279    , 5, 1, 2),//
Array(    1342104    , 5, 1, 2),//
Array(    1362140    , 5, 1, 2),//
Array(    1372228    , 5, 1, 2),//
Array(    1382265    , 5, 1, 2),//
Array(    1402259    , 5, 1, 2),//
Array(    1412181    , 5, 1, 2),//
Array(    1422189    , 5, 1, 2),//
Array(    1432218    , 5, 1, 2),//
Array(    142274    , 5, 1, 2),//
Array(    1452257    , 5, 1, 2),//
Array(    1462243    , 5, 1, 2),//
Array(    1472265    , 5, 1, 2),//
Array(    1482221    , 5, 1, 2),//
Array(    1492235    , 5, 1, 2),//
Array(    1522143    , 5, 1, 2),//
Array(    1532150    , 5, 1, 2),//
Array(    1542117    , 5, 1, 2),//
Array(    1552119    , 5, 1, 2),//
Array(    1582023    , 5, 1, 2),//

Array(    5062010    , 1000, 30, 1),//    終極方塊
Array(    5062024    , 1000, 30, 1),//    閃炫方塊
Array(    3700336    , 1, 1, 2),//    黑暗氣息擊退者
Array(    3700337    , 1, 1, 2)//    黑暗氣息破壞者
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            cm.sendYesNo("#e#r恭喜你擊敗了露希妲，你想獲取最後的獎勵在離開嘛？？\r\n");
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 100);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "【挑戰露希妲】", notice);
            cm.sendOk("你獲得了 #b#t" + item + "##k " + quantity + "個。");
            cm.safeDispose();
            cm.warp(450004000);
        } else {
            cm.sendOk("#r(恭喜你獲得：#z2430051##v2430051#1個。)\r\n今天的運氣可真差，什麼都沒有抽到。");
            cm.gainItem(2430051, 1);
            cm.safeDispose();
            cm.warp(450004000);
        }
    }
}
