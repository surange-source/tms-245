status = -1;
var itemList = Array(
// ------ 卷軸 ------
Array(2049100, 500, 1, 3), //混沌卷軸60%
Array(2049133, 500, 1, 3), //驚人混沌卷軸50%
Array(2049134, 500, 1, 3), //驚人混沌卷軸70%
Array(2049137, 500, 1, 3), //驚人正義混沌卷軸 40%
Array(2049129, 500, 1, 3), //正義混沌卷軸 50%
Array(2049116, 500, 1, 3), //強化混沌卷軸 60%
Array(2049124, 500, 1, 3), //正向混沌卷軸 60%
Array(2340000, 600, 1, 3), //祝福卷軸
Array(2049752, 300, 1, 3), //S級潛能卷軸 30%
Array(2049704, 500, 1, 3), //A級潛能附加卷軸 40%
Array(2048311, 500, 1, 3), //附加潛能附加卷軸 50%
Array(2049304, 500, 1, 3), //3星裝備強化卷軸 80%
// ------ 裝備 ------
Array(1012319, 600, 1, 3), //8週年點點紅
Array(1112915, 500, 1, 3), //藍調戒指
Array(1003561, 600, 1, 3), //風暴羽毛帽子
Array(1022149, 600, 1, 3), //風暴眼鏡
Array(1032148, 600, 1, 3), //風暴耳環
Array(1052467, 600, 1, 3), //風暴連帽長袍 
Array(1072672, 600, 1, 3), //風暴鞋子
Array(1082438, 600, 1, 3), //風暴手套
Array(1102467, 600, 1, 3), //風暴披風
Array(1112748, 600, 1, 3), //風暴戒指
Array(1122200, 600, 1, 3), //風暴吊墜
Array(1132161, 600, 1, 3), //風暴腰帶
Array(1152099, 600, 1, 3), //風暴肩章
Array(1202023, 600, 1, 3), //真·喬圖騰
Array(1202027, 600, 1, 3), //真·海麗蜜圖騰
Array(1202031, 600, 1, 3), //真·小龍圖騰
Array(1202035, 600, 1, 3), //真·李卡司圖騰
// ------ 特殊 ------
Array(5064300, 600, 2, 3), //卷軸防護卷軸
Array(5062500, 600, 2, 3), //大師附加神奇方塊
Array(5062000, 600, 2, 3), //神奇方塊
Array(5064000, 600, 2, 3), //防爆卷軸
Array(5064100, 600, 2, 3), //保護卷軸
Array(5062002, 600, 2, 3)  //高級神奇方塊
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
            item = im.gainGachaponItem(itemId, quantity, "天天愛抽獎", notice);
            if (item != -1) {
        im.gainItem(2430070, -1);
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