status = -1;
var itemList = Array(//註釋
// ------ 卷軸 ------
Array(4001715, 500, 1, 3), //定居幣
Array(2049153, 250, 5, 3), //祝福卷軸
Array(2049750, 300, 1, 3), //S級潛能卷
Array(2614000, 500, 1, 3), //突破一萬之石
Array(2614001, 500, 1, 3), //突破十萬
Array(2614002, 50, 1, 3), //突破百萬
Array(5062024, 40, 5, 3), //閃炫方塊X5
Array(2048721, 200, 1, 3), //涅槃
Array(2049116, 200, 1, 3), //強化混沌
Array(2510173, 100, 1, 3), //機器人圖紙
Array(2510174, 100, 1, 3), //機器人圖紙
Array(4000377, 700, 1, 3), //其他類
Array(4000378, 700, 1, 3) //
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
        var chance = Math.floor(Math.random() * 300);
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
            item = im.gainGachaponItem(itemId, quantity, "[活動禮包]", notice);
            if (item != -1) {
        im.gainItem(2431923, -1);
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