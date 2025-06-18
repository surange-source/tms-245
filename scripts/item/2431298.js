status = -1;
var itemList = Array(
// ------ 150暴君 ------
Array(1132174 , 500, 1, 3), //- 暴君西亞戴斯腰帶 - (無描述)
Array(1132175 , 500, 1, 3), //- 暴君赫爾梅斯腰帶 - (無描述)
Array(1132176 , 500, 1, 3), //- 暴君凱倫腰帶 - (無描述)
Array(1132177 , 500, 1, 3), //- 暴君利卡昂腰帶 - (無描述)
Array(1132178 , 500, 1, 3), //- 暴君阿爾泰腰帶 - (無描述)
Array(1102481 , 500, 1, 3), //- 暴君西亞戴斯披風 - (無描述)
Array(1102482 , 500, 1, 3), //- 暴君赫爾梅斯披風 - (無描述)
Array(1102483 , 500, 1, 3), //- 暴君凱倫披風 - (無描述)
Array(1102484 , 500, 1, 3), //- 暴君利卡昂披風 - (無描述)
Array(1102485 , 500, 1, 3), //- 暴君阿爾泰披風 - (無描述)
Array(1082543 , 500, 1, 3), //- 暴君西亞戴斯手套 - (無描述)
Array(1082544 , 500, 1, 3), //- 暴君赫爾梅斯手套 - (無描述)
Array(1082545 , 500, 1, 3), //- 暴君凱倫手套 - (無描述)
Array(1082546 , 500, 1, 3), //- 暴君利卡昂手套 - (無描述)
Array(1082547 , 500, 1, 3), //- 暴君阿爾泰手套 - (無描述)
Array(1072743 , 500, 1, 3), //- 暴君西亞戴斯靴 - (無描述)
Array(1072744 , 500, 1, 3), //- 暴君赫爾梅斯靴 - (無描述)
Array(1072745 , 500, 1, 3), //- 暴君凱倫靴 - (無描述)
Array(1072746 , 500, 1, 3), //- 暴君利卡昂靴 - (無描述)
Array(1072747 , 500, 1, 3) //- 暴君阿爾泰靴 - (無描述)
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
            item = im.gainGachaponItem(itemId, quantity, "暴君交換卷中隨機", notice);
            if (item != -1) {
        im.gainItem(2431298, -1);
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