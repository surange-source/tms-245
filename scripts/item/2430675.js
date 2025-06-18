status = -1;
var itemList = Array(
// ------ 卷軸 ------
Array(1102450, 400, 1, 3), //祥龍單手武器攻擊卷99% 
Array(1102451, 400, 1, 3), //祥龍單手武器魔力卷99% 
Array(1102488, 500, 1, 3),
Array(1003268, 500, 1, 3),
Array(1003237, 500, 1, 3),
Array(1003462, 500, 1, 3),
Array(1003687, 500, 1, 3),
Array(1003268, 500, 1, 3),
Array(1000061, 500, 1, 3),
Array(1050256, 500, 1, 3),
Array(1070031, 500, 1, 3),
Array(1001088, 500, 1, 3),//祥龍雙手武器攻擊卷99%
Array(1051312, 500, 1, 3),
Array(1071048, 500, 1, 3),
Array(1003713, 500, 1, 3),
Array(1052550, 500, 1, 3),
Array(1082493, 500, 1, 3),
Array(1003509, 500, 1, 3),
Array(1052449, 500, 1, 3),
Array(1003508, 500, 1, 3),
Array(1052448, 500, 1, 3),
Array(1112100, 500, 1, 3),
Array(1532098, 80, 1, 3),
Array(1522094, 80, 1, 3),
Array(1492179, 80, 1, 3),
Array(1482168, 80, 1, 3),
Array(1472214, 80, 1, 3),
Array(1462193, 80, 1, 3),
Array(1452205, 80, 1, 3),
Array(1442223, 80, 1, 3),
Array(1432167, 80, 1, 3),
Array(1422140, 80, 1, 3),
Array(1412135, 300, 1, 3),
Array(1402196, 80, 1, 3),
Array(1382208, 80, 1, 3),
Array(1372177, 80, 1, 3),
Array(1362090, 80, 1, 3),
Array(1342082, 80, 1, 3),
Array(1332225, 80, 1, 3),
Array(1322203, 80, 1, 3),
Array(1312153, 80, 1, 3),
Array(1302275, 80, 1, 3),
Array(1242061, 80, 1, 3),
Array(1242060, 80, 1, 3),
Array(1232057, 80, 1, 3),
Array(1222058, 80, 1, 3),
Array(1212063, 80, 1, 3),
Array(1702385, 500, 1, 3),
Array(1702386, 500, 1, 3),
Array(1702387, 500, 1, 3),
Array(1702388, 500, 1, 3),
Array(1702389, 500, 1, 3),
Array(1702394, 500, 1, 3),
Array(1702395, 500, 1, 3),
Array(1702397, 500, 1, 3),
Array(1702398, 500, 1, 3),
Array(1702399, 500, 1, 3),
Array(1702400, 500, 1, 3),
Array(1702363, 500, 1, 3),
Array(1702368, 500, 1, 3),
Array(1702375, 500, 1, 3),
Array(1702382, 500, 1, 3),
Array(1702366, 500, 1, 3),
Array(1702342, 500, 1, 3),
Array(1142448, 500, 1, 3),
Array(1102275, 500, 1, 3),
Array(1152108, 500, 1, 3),
Array(1082295, 500, 1, 3),
Array(1052314, 500, 1, 3),
Array(1302152, 500, 1, 3),
Array(1442116, 500, 1, 3),
Array(1432086, 500, 1, 3),
Array(1322096, 500, 1, 3),
Array(1232014, 500, 1, 3),
Array(1422066, 500, 1, 3),
Array(1312065, 500, 1, 3),
Array(1412065, 500, 1, 3),
Array(1402095, 500, 1, 3),
Array(1003172, 500, 1, 3),
Array(1072485, 500, 1, 3)
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用嗎？…我的肚子裡有各類#b奇特座椅或卷軸、裝備、新奇道具#k哦！");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var chance = Math.floor(Math.random() * 500);
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
            item = im.gainGachaponItem(itemId, quantity, "貪婪箱子", notice);
            if (item != -1) {
        im.gainItem(2430675, -1);
        //im.gainNX(1, -20000);
                im.warp(910000000, 0);
                im.sendOk("恭喜你獲得了 #b#t" + item + "##k ");
            } else {
                im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
            }
            im.safeDispose();
        } else {
            im.sendOk("今天的運氣可真差，什麼都沒有拿到。");
            im.safeDispose();
        }
    }
}