status = -1;
var itemList = Array(
// ------ 音符 ------
Array(2614005, 100, 1, 1),
Array(2614008, 500, 2, 3),
Array(4310210, 5000, 10, 50),
Array(2614003, 5000, 10, 50),
Array(5062009, 5000, 10, 20),
Array(5062006, 5000, 5, 20),
Array(2614014, 500, 1, 2),
Array(2614003, 1000, 5, 20),
Array(5062001, 500, 2, 20),
Array(4310098, 500, 4, 9),
Array(1113072, 2000, 1, 1),
Array(1113073, 500, 1, 1),
Array(1113074, 100, 1, 1),
Array(1113075, 1, 1, 1),
Array(1132243, 6000, 1, 1),
Array(1132244, 2000, 1, 1),
Array(1132245, 500, 1, 1),
Array(1132246, 1, 1, 1),
Array(1122264, 5000, 1, 1),
Array(1122265, 2000, 1, 1),
Array(1122266, 100, 1, 1),
Array(1122267, 1, 1, 1),
Array(1032220, 10000, 1, 1),
Array(1032221, 5000, 1, 1),
Array(1032222, 100, 1, 1),
Array(1032223, 1, 1, 1),
Array(4310065, 500, 1, 1),
Array(4310097, 500, 1, 3),
Array(4310098, 500, 5, 10),
Array(4033115, 500, 1, 3),
Array(4310156, 500, 1, 3),
Array(5062024, 500, 1, 3),
Array(5062010, 500, 1, 5),
Array(5062503, 500, 1, 5),
Array(2049116, 500, 5, 10),
Array(2616061, 300, 1, 1),
Array(2616062, 300, 1, 1),
Array(2615031, 300, 1, 1),
Array(2615032, 300, 1, 1),
Array(1353405, 100, 1, 1),
Array(1352606, 100, 1, 1),
Array(1352266, 100, 1, 1),
Array(1352256, 100, 1, 1),
Array(1352246, 100, 1, 1),
Array(1352236, 100, 1, 1),
Array(1352928, 100, 1, 1),
Array(1003797, 50, 1, 1),
Array(3014019, 50, 1, 1),
Array(1242116, 5, 1, 1),
Array(1232109, 5, 1, 1),
Array(1222109, 5, 1, 1),
Array(1242120, 5, 1, 1),
Array(1242017, 5, 1, 1),
Array(1242333, 5, 1, 1),
Array(1242199, 5, 1, 1),
Array(12422250, 5, 1, 1),
Array(1003976, 400, 1, 1),
Array(1102623, 400, 1, 1),
Array(1082556, 400, 1, 1),
Array(1052669, 400, 1, 1),
Array(1072870, 400, 1, 1),
Array(1012438, 400, 1, 1),
Array(1022211, 400, 1, 1),
Array(1032224, 400, 1, 1),
Array(1122269, 400, 1, 1),
Array(1132447, 400, 1, 1),
Array(1152160, 400, 1, 1),
Array(1242274, 5, 1, 1),
Array(1242101, 5, 1, 1),
Array(1242135, 5, 1, 1),
Array(1372222, 5, 1, 1),
Array(1382259, 5, 1, 1),
Array(1402251, 5, 1, 1),
Array(1522138, 5, 1, 1),
Array(1412177, 5, 1, 1),
Array(1422184, 5, 1, 1),
Array(1003797, 2, 1, 1),
Array(1003798, 2, 1, 1),
Array(1003799, 2, 1, 1),
Array(1003801, 2, 1, 1),
Array(1102481, 1, 1, 1),
Array(1102482, 1, 1, 1),
Array(1102483, 1, 1, 1),
Array(1102484, 1, 1, 1),
Array(1102485, 1, 1, 1),
Array(1082543, 1, 1, 1),
Array(1003797, 2, 1, 1),
Array(1342095, 100, 1, 1)
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用嗎？…我的肚子裡有各類#b奇特座椅或卷軸、極品裝備、紀念幣、技能核心、突破石頭、新奇道具#k哦！");
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
            item = im.gainGachaponItem(itemId, quantity, "Take V4箱子", notice);
            if (item != -1) {
        im.gainItem(2436283, -1);
                im.sendOk("你獲得了 #b#t" + item + "##k " + quantity + "個。");
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