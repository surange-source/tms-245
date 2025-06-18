status = -1;
var itemList = Array(
// ------ 音符 ------
Array(2049116, 500, 3, 7), //音符X1 
Array(5062009, 500, 5, 10), //音符X1 
Array(2614004, 500, 1, 1), //音符X2 
Array(5062001, 500, 4, 5),
Array(2340000, 500, 8, 10), //音符X1
Array(5062500, 500, 4, 7),
Array(5062503, 500, 2, 4),
Array(1113072, 500, 1, 1),
Array(1113073, 500, 1, 1),
Array(1113074, 50, 1, 1),
Array(1132243, 500, 1, 1),
Array(1132244, 500, 1, 1),
Array(1132245, 500, 1, 1),
Array(1122264, 500, 1, 1),
Array(1122265, 500, 1, 1),
Array(1122266, 100, 1, 1),
Array(1032220, 500, 1, 1),
Array(1032221, 500, 1, 1),
Array(4310065, 500, 1, 1),
Array(4033115, 500, 1, 1),
Array(4310210, 500, 10, 20),
Array(2435719, 500, 3, 5),
Array(2048721, 500, 2, 4),
Array(4001620, 500, 3, 8),
Array(4032226, 500, 5, 12),
Array(1353405, 100, 1, 1),
Array(1352606, 100, 1, 1),
Array(1352266, 100, 1, 1),
Array(1352256, 100, 1, 1),
Array(1352246, 100, 1, 1),
Array(1352236, 100, 1, 1),
Array(1352928, 100, 1, 1),
Array(1003797, 50, 1, 1),
Array(1003976, 100, 1, 1),
Array(1102623, 100, 1, 1),
Array(1082556, 100, 1, 1),
Array(1052669, 100, 1, 1),
Array(1072870, 100, 1, 1),
Array(1012438, 100, 1, 1),
Array(1022211, 100, 1, 1),
Array(1032224, 100, 1, 1),
Array(1122269, 100, 1, 1),
Array(1132447, 100, 1, 1),
Array(1152160, 100, 1, 1),
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
            item = im.gainGachaponItem(itemId, quantity, "Take V3箱子", notice);
            if (item != -1) {
        im.gainItem(2436282, -1);
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