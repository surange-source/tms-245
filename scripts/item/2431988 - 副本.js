status = -1;
var itemList = Array(//註釋
// ------ 卷軸 ------
Array(2046996, 30, 1, 3), //驚人武器卷
Array(2046997, 100, 1, 3), //驚人武器卷
Array(2047818, 30, 1, 3), //驚人武器卷
Array(2612059, 200, 1, 3), //驚人武器卷
Array(2613000, 30, 1, 3), //星火武器
Array(2613001, 200, 1, 3), //星火武器
Array(2612010, 30, 1, 3), //星火武器
Array(2613016, 20, 1, 3), //RED武器
Array(2613017, 140, 1, 3), //RED武器
Array(2047828, 20, 1, 3), //RED武器
Array(2612058, 300, 1, 3), //RED武器
Array(2046913, 100, 1, 3), //宿命武器
Array(2046914, 300, 1, 3),//宿命武器
Array(2046173, 100, 1, 3),//宿命武器
Array(2046074, 100, 1, 3), //祥雲
Array(2046075, 300, 1, 3), //
Array(2612060, 100, 1, 3), //
Array(2046149, 300, 1, 3), //
Array(2613050, 10, 1, 3), //X武器
Array(2612061, 10, 1, 3), //
Array(2613051, 60, 1, 3), //
Array(2612062, 100, 1, 3), //
Array(2046108, 200, 1, 3), //週年慶
Array(2046109, 500, 1, 3), //
Array(2046110, 200, 1, 3), //
Array(2046111, 500, 1, 3) //

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
        var chance = Math.floor(Math.random() * 600);
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
            item = im.gainGachaponItem(itemId, quantity, "【神秘武器卷軸】", notice);
            if (item != -1) {
        im.gainItem(2430207, -1);
                im.sendOk("你獲得了 #b#t" + item + "##k " + quantity + "個。");
            } else {
                im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
            }
            im.safeDispose();
        } else {
            im.gainItem(2430207, -1);
            im.sendOk("今天的運氣可真差，什麼都沒有拿到。");
            im.safeDispose();
        }
    }
}