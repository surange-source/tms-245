status = -1;
var itemList = Array(
// ------ 卷軸 ------
Array(3010849, 500, 1, 3), //祥龍單手武器攻擊卷99% 
Array(3010984, 500, 1, 3), //祥龍單手武器魔力卷99% 
Array(3010025, 500, 1, 3),
Array(3010848, 500, 1, 3),
Array(3010999, 500, 1, 3),
Array(3010079, 500, 1, 3),
Array(3010100, 500, 1, 3),
Array(3010182, 500, 1, 3),
Array(3010183, 500, 1, 3),
Array(3010184, 500, 1, 3),
Array(3010187, 500, 1, 3),
Array(3010189, 500, 1, 3),//祥龍雙手武器攻擊卷99%
Array(3010208, 500, 1, 3),
Array(3010282, 500, 1, 3),
Array(3010313, 500, 1, 3),
Array(3010318, 500, 1, 3),
Array(3010356, 500, 1, 3),
Array(3010365, 500, 1, 3),
Array(3010374, 500, 1, 3),
Array(3010400, 500, 1, 3),
Array(3010402, 500, 1, 3),
Array(3010530, 500, 1, 3),
Array(3015003, 500, 1, 3),
Array(3010957, 500, 1, 3),
Array(3010493, 500, 1, 3),
Array(3012009, 500, 1, 3),
Array(3010446, 500, 1, 3),
Array(3010415, 500, 1, 3),
Array(3010453, 500, 1, 3),
Array(3020000, 500, 1, 3),
Array(3010142, 500, 1, 3),
Array(3010156, 500, 1, 3),
Array(3010167, 500, 1, 3),
Array(3010832, 500, 1, 3),
Array(3010748, 500, 1, 3),
Array(3010761, 500, 1, 3),
Array(3010779, 500, 1, 3),
Array(3010854, 500, 1, 3),
Array(3010718, 500, 1, 3),
Array(3010822, 500, 1, 3),
Array(3010962, 500, 1, 3)
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
            var item;i
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = im.gainGachaponItem(itemId, quantity, "神秘椅子箱子", notice);
            if (item != -1) {
        im.gainItem(2431256, -1);
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