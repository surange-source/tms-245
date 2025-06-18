status = -1;
var itemList = Array(//註釋
// ------ 情人節禮物------
Array(1212063, 300, 1, 3), //驚人武器卷
Array(1222058, 500, 1, 3), //驚人武器卷
Array(1232057, 330, 1, 3), //驚人武器卷
Array(1242060, 200, 1, 3), //驚人武器卷
Array(1242061, 320, 1, 3), //星火武器
Array(2613001, 200, 1, 3), //星火武器
Array(1262016, 500, 1, 3), //星火武器
Array(1302275, 120, 1, 3), //RED武器
Array(1312153, 40, 1, 3), //RED武器
Array(1322203, 40, 1, 3), //RED武器
Array(1332225, 300, 1, 3), //RED武器
Array(1342082, 500, 1, 3), //宿命武器
Array(1362090, 300, 1, 3),//宿命武器
Array(1372177, 300, 1, 3),//宿命武器
Array(1382208, 300, 1, 3), //祥雲
Array(1402196, 100, 1, 3), //
Array(1412135, 300, 1, 3), //
Array(2046149, 300, 1, 3), //
Array(1422140, 510, 1, 3), //X武器
Array(1442223, 330, 1, 3), //
Array(1452205, 160, 1, 3), //
Array(1462193, 100, 1, 3), //

Array(1003798, 300, 1, 3),//宿命武器
Array(1003801, 300, 1, 3),//宿命武器
Array(1003800, 300, 1, 3), //祥雲
Array(1003799, 100, 1, 3), //
Array(1042257, 300, 1, 3), //
Array(1042258, 300, 1, 3), //
Array(1062169, 510, 1, 3), //X武器
Array(1062165, 330, 1, 3), //
Array(1062166, 160, 1, 3), //
Array(1062168, 100, 1, 3), //

Array(1472214, 400, 1, 3), //週年慶
Array(1482168, 500, 1, 3), //
Array(1492179, 500, 1, 3), //
Array(1522094, 30, 1, 3), //驚人武器卷
Array(1532098, 500, 1, 3), //驚人武器卷
Array(1582016, 430, 1, 3), //驚人武器卷
Array(1542063, 200, 1, 3), //驚人武器卷
Array(1552063, 500, 1, 3), //星火武器
Array(1542108, 200, 1, 3), //星火武器
Array(1252093, 230, 1, 3), //星火武器
Array(1552110, 320, 1, 3), //RED武器
Array(1582017, 340, 1, 3), //RED武器
Array(1262017, 420, 1, 3), //RED武器
Array(1132178, 100, 1, 3), //RED武器
Array(1102484, 100, 1, 3), //宿命武器
Array(1082544, 100, 1, 3),//宿命武器
Array(1072747, 110, 1, 3), //X武器
Array(1102476, 210, 1, 3), //
Array(1102479, 260, 1, 3), //
Array(1102476, 200, 1, 3), //
Array(1132171, 200, 1, 3), //週年慶
Array(1262029, 500, 1, 3), //
Array(1012438, 200, 1, 3), //

Array(1012319, 200, 1, 3) //

);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用嗎？…我的肚子裡有各類#b卷軸道具#k哦！");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var chance = Math.floor(Math.random() * 0);
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
            item = im.gainGachaponItem(itemId, quantity, "【七夕禮物箱】", notice);
            if (item != -1) {
        im.gainItem(2430682, -1);
                im.sendOk("你獲得了 #b#t" + item + "##k " + quantity + "個。");
            } else {
                im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
            }
            im.safeDispose();
        } else {
            im.gainItem(2430682, -1);
            im.sendOk("今天的運氣可真差，什麼都沒有拿到。");
            im.safeDispose();
        }
    }
}