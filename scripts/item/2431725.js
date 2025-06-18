status = -1;
var itemList = Array(

//椅子
Array(
3010828, 100, 1, 3), // 金魚
Array(
3010193, 300, 1, 3), // 花蘑菇偽裝椅子
Array(
3010528, 300, 1, 3), // 扎納羅非偽裝椅子
Array(
3010620, 300, 1, 3), // 白羊座椅子
Array(
3010659, 300, 1, 3), // 金牛座椅子
Array(
3010688, 300, 1, 3), // 雙魚座椅子
Array(
3010715, 300, 1, 3), //  
Array(
3010716, 300, 1, 3), // 
Array(
3010717, 300, 1, 3), //
Array(
3015210, 300, 1, 3), //
Array(
3012028, 300, 1, 3), //
Array(
3010853, 300, 1, 3), //
Array(
3015047, 300, 1, 3), //
Array(
3015014, 300, 1, 3), //
Array(
3010897, 300, 1, 3), //
Array(
3012025, 300, 1, 3), //
Array(
3010696, 300, 1, 3), // 天秤座椅子  
Array(
3010758, 300, 1, 3), // 天蠍座椅子 
Array(
3012018, 300, 1, 3), // 處女座椅子
Array(
3010782, 300, 1, 3), // 射手座椅子
Array(
3010781, 300, 1, 3), // 山羊座椅子
Array(
3010835, 300, 1, 3), // 水瓶座椅子 
Array(
3010843, 300, 1, 3), // 安德洛墨達椅子
Array(
3010842, 300, 1, 3), // 石獅椅子
Array(
3010965, 300, 1, 3), // 稻荷神社椅子
Array(
3015014, 300, 1, 3), // 假面紳士海報椅子
Array(
3015001, 300, 1, 3), //
Array(
3010935, 300, 1, 3) // 
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("你要打開絕板椅子嗎？");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var chance = Math.floor(Math.random() * 650);
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
            
            /*
            if (im.getChar().getName() == "Super絕y") {
                im.setPQLog("Super絕y");
                if (im.getPQLog("Super絕y") == 3) {
                    itemId = 1242060;
                    quantity = 1;
                    notice = 3;
                }
            }*/
            item = im.gainGachaponItem(itemId, quantity, "裝滿絕版椅子的箱子", notice);
            if (item != -1) {
                im.gainItem(2431725, -1);
                //im.gainItem(436030, 10);
                im.sendOk("恭喜您，獲得了 #b#t" + item + "##k " + quantity + "個");
            } else {
                im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
            }
            im.safeDispose();
        } else {
            im.gainItem(2431725, -1);
            im.sendOk("今天的運氣可真差，什麼都沒有拿到。");
            im.safeDispose();
        }
    }
}