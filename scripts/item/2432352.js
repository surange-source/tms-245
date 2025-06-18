status = -1;
var itemList = Array(
// ------ 傷害皮膚隨機箱子 ------
Array(2434530 , 500, 1, 3), //- 
Array(2434619 , 500, 1, 3), //- 
Array(2434658 , 500, 1, 3), //- 
Array(2434655 , 500, 1, 3), //- 
Array(2434661 , 500, 1, 3), //- 
Array(2434710 , 500, 1, 3), //- 
Array(2434734 , 500, 1, 3), //- 
Array(2434873 , 500, 1, 3), //- 
Array(2434875 , 500, 1, 3), //- 
Array(2434877 , 500, 1, 3), //- 
Array(2434879 , 500, 1, 3), //- 
Array(2435037 , 500, 1, 3), //- 
Array(2434544 , 500, 1, 3), //- 
Array(2434545 , 500, 1, 3), //- 
Array(2434817 , 500, 1, 3), //- 
Array(2434818 , 500, 1, 3), //- 
Array(2434950 , 500, 1, 3), //- 
Array(2434951 , 500, 1, 3), //- 12312312312
Array(2433776 , 500, 1, 3), //- 
Array(2432804 , 500, 1, 3), //- 
Array(2435159 , 500, 1, 3), //- 
Array(2435158 , 500, 1, 3), //- 
Array(2435157 , 500, 1, 3), //- 
Array(2435141 , 500, 1, 3), //- 
Array(2435140 , 500, 1, 3), //- 
Array(2435047 , 500, 1, 3), //- 
Array(2435046 , 500, 1, 3), //- 
Array(2432154 , 500, 1, 3), //- 
Array(2435044 , 500, 1, 3), //- 
Array(2435043 , 500, 1, 3), //- 
Array(2435030 , 500, 1, 3), //- 
Array(2434274 , 500, 1, 3), //- 
Array(2434273 , 500, 1, 3), //- 
Array(2435027 , 500, 1, 3), //- 
Array(2433980 , 500, 1, 3), //- 
Array(2433715 , 500, 1, 3), //- 12312312312
Array(2432354 , 500, 1, 3), //- 
Array(2433832 , 500, 1, 3), //- 
Array(2433831 , 500, 1, 3), //- 
Array(2433830 , 500, 1, 3), //- 
Array(2433829 , 500, 1, 3), //- 
Array(2433828 , 500, 1, 3), //- 
//Array(2434130 , 500, 1, 3), //- 
Array(2433828 , 500, 1, 3), //- 
Array(2434081 , 500, 1, 3), //- 
Array(2433883 , 500, 1, 3), //- 
Array(2434081 , 500, 1, 3), //- 
Array(2433777 , 500, 1, 3), //- 
Array(2433776 , 500, 1, 3), //- 
Array(2433775 , 500, 1, 3), //- 
Array(2433184 , 500, 1, 3), //- 
Array(2433362 , 500, 1, 3), //- 
Array(2433572 , 500, 1, 3), //- 
//Array(2433710 , 500, 1, 3), //- 
Array(2433571 , 500, 1, 3), //- 
Array(2433570 , 500, 1, 3), //- 
Array(2433569 , 500, 1, 3), //- 
Array(2433568 , 500, 1, 3), //- 
Array(2433588 , 500, 1, 3), //- 
Array(2433587 , 500, 1, 3), //- 
Array(2432640 , 500, 1, 3) //- 
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
            item = im.gainGachaponItem(itemId, quantity, "傷害皮膚隨機箱子", notice);
            if (item != -1) {
        im.gainItem(2432352, -1);
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