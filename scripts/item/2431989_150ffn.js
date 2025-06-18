status = -1;
var itemList = Array(
// ------ 150武器 ------
Array(1532098,500,1,3), //法弗納榮耀炮 - (無描述)
Array(1522094,500,1,3), //法弗納雙風翼弩 - (無描述)
Array(1492179,500,1,3), //法弗納左輪槍 - (無描述)
Array(1482168,500,1,3), //法弗納巨狼之爪 - (無描述)
Array(1472214,500,1,3), //法弗納危險之手 - (無描述)
Array(1462193,500,1,3), //法弗納風翼弩 - (無描述)
Array(1452205,500,1,3), //法弗納追風者 - (無描述)
Array(1442223,500,1,3), //法弗納半月寬刃斧 - (無描述)
Array(1432167,500,1,3), //法弗納貫雷槍 - (無描述)
Array(1422140,500,1,3), //法弗納閃電錘 - (無描述)
Array(1412135,500,1,3), //法弗納戰鬥切肉斧 - (無描述)
Array(1402196,500,1,3), //法弗納懺悔之劍 - (無描述)
Array(1382208,500,1,3), //法弗納魔冠之杖 - (無描述)
Array(1372177,500,1,3), //法弗納魔力奪取者 - (無描述)
Array(1362090,500,1,3), //法弗納洞察手杖 - (無描述)
Array(1342082,500,1,3), //法弗納急速之刃 - (無描述)
Array(1332225,500,1,3), //法弗納大馬士革劍 - (無描述)
Array(1322203,500,1,3), //法弗納戈耳迪錘 - (無描述)
Array(1312153,500,1,3), //法弗納雙刃切肉斧 - (無描述)
Array(1302275,500,1,3), //法弗納銀槲之劍 - (無描述)
Array(1242061,500,1,3), //法弗納精神之刃 - 魯塔比斯套裝(海盜)專用武器
Array(1242060,500,1,3), //法弗納精神之刃 - 魯塔比斯套裝(盜賊)專用武器
Array(1232057,500,1,3), //法弗納死亡使者 - (無描述)
Array(1222058,500,1,3), //法弗納天使手銃 - (無描述)
Array(1212063,500,1,3)  //法弗納魔力源泉杖 - (無描述)
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
            item = im.gainGachaponItem(itemId, quantity, "150武器箱", notice);
            if (item != -1) {
        im.gainItem(2431989, -1);
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