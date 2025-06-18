status = -1;
var itemList = Array(
// ------ 卷軸 ------
    Array(1032216, 50, 1, 3), //真紅耳環
    Array(1152155, 50, 1, 3),  //真紅護肩
    Array(1113070, 50, 1, 3), //真紅之環
    Array(1412136, 300, 1, 3),  //真紅崩潰
    Array(1532099, 300, 1, 3),  //終極方塊
    Array(1472215, 300, 1, 3),  //神話耳環
    Array(1362091, 300, 1, 3),  //星火幸運箱子
    Array(1242063, 300, 1, 3),  //正義火種
    Array(1242062, 300, 1, 3), 
    Array(1362019, 300, 1, 3), 
    Array(1432168, 300, 1, 3), 
    Array(1302276, 300, 1, 3), 
    Array(1492180, 300, 1, 3), // 迷你神獸椅子, 300), /
    Array(1522095, 300, 1, 3), // 擺鐘椅子, 300), // 
    Array(1372178, 300, 1, 3), // 寶石楓葉椅子, 300), 
    Array(1212065, 300, 1, 3), // 熱情的紅色藥水椅子, 300), /
    Array(1222060, 300, 1, 3), // 新鮮的藍色藥水椅子, 300), 
    Array(1442224, 300, 1, 3), // 兔子椅子, 300), // 
    Array(1462194, 300, 1, 3), // 椰子樹沙灘椅, 300), 
    Array(1232058, 300, 1, 3), // 柿子樹鞦韆, 300), 
    Array(1422141, 300, 1, 3), // 雲朵洗手間椅子, 300), // 
    Array(1382209, 300, 1, 3), // 公沙沙兔靠墊, 300), // 
    Array(1332226, 300, 1, 3), // 海藍天鵝絨沙發, 300), // 
    Array(1402197, 300, 1, 3), // 紅色設計師椅子, 300), // 
    Array(1322204, 300, 1, 3), // 艾莉珍椅子, 300), // 
    Array(1482169, 300, 1, 3), // 紅帽月妙抱枕椅, 300), 
    Array(1452206, 300, 1, 3), // 藍帽月妙抱枕椅, 300), 
    Array(1312154, 300, 1, 3), // 扇子月妙抱枕椅, 300), 
    Array(1342083, 300, 1, 3) // 太平蕭月妙抱枕椅, 300),
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
            item = im.gainGachaponItem(itemId, quantity, "冒險勇士箱", notice);
            if (item != -1) {
        im.gainItem(2431878, -1);
               // im.warp(910000000, 0);
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