status = -1;
var itemList = Array(
// ------ 音符 ------
Array(2614012, 300, 1, 1),
Array(2614006, 500, 1, 1),
Array(4310210, 500, 1, 3),
Array(2614003, 100, 1, 1),
Array(2049122, 500, 1, 1),
Array(4000313, 100, 1, 1),
Array(2000005, 1000, 50, 50),
Array(2000005, 300, 40, 40),
Array(2049697, 500, 1, 1),
Array(4021016, 500, 1, 1),
Array(5062002, 500, 1, 1),
Array(5062009, 300, 1, 1),
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
            item = im.gainGachaponItem(itemId, quantity, "V箱子", notice);
            if (item != -1) {
        im.gainItem(2435824, -1);
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