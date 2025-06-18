status = -1;
var itemList = Array(
// ------ 卷軸 ------
Array(1212065, 350, 1, 3), //
Array(1222060, 350, 1, 3), // 
Array(1232058, 350, 1, 3), //
Array(1242062, 350, 1, 3),
Array(1302276, 350, 1, 3),
Array(1312154, 350, 1, 3),
Array(1322204, 350, 1, 3),
Array(1332226, 350, 1, 3),
Array(1342083, 350, 1, 3),
Array(1362019, 350, 1, 3),
Array(1362091, 350, 1, 3),
Array(1372178, 350, 1, 3),
Array(1382209, 350, 1, 3),
Array(1402197, 350, 1, 3),
Array(1412136, 350, 1, 3),
Array(1422141, 350, 1, 3),
Array(1432168, 350, 1, 3),
Array(1442224, 350, 1, 3),
Array(1452206, 350, 1, 3),
Array(1462194, 350, 1, 3),
Array(1472215, 350, 1, 3),
Array(1482169, 350, 1, 3),
Array(1492180, 350, 1, 3),
Array(1522095, 350, 1, 3),
Array(1532099, 350, 1, 3)

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
        var chance = Math.floor(Math.random() * 800);
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
            item = im.gainGachaponItem(itemId, quantity, "發光禮物箱", notice);
            if (item != -1) {
        im.gainItem(2433247, -1);
                im.sendOk("你獲得了 #b#t" + item + "##k " + quantity + "個。");
            } else {
                im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
            }
            im.safeDispose();
        } else {
            im.gainItem(2433247, -1);
            im.sendOk("今天的運氣可真差，什麼都沒有拿到。");
            im.safeDispose();
        }
    }
}