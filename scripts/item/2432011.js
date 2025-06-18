status = -1;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var Star = "#fEffect/CharacterEff/1112904/2/1#";
/***************************************/
var cost = 100;  //每次消耗的HyPay額度
var itemList = Array(
Array(1003797, 30, 1, 3), //高貴劍士頭盔 - (無描述)
Array(1003798, 100, 1, 3), //高貴流丹維奇帽 - (無描述)
Array(1003799, 100, 1, 3), //高貴遊俠貝雷帽 - (無描述)
Array(1003800, 100, 1, 3), //高貴刺客軟帽 - (無描述)
Array(1003801, 300, 1, 3), //高貴流浪者帽 - (無描述)
Array(1042254, 30, 1, 3), //鷹眼劍士盔甲 - (無描述)
Array(1042255, 100, 1, 3), //鷹眼丹維奇長袍 - (無描述)
Array(1042256, 100, 1, 3), //鷹眼遊俠斗篷 - (無描述)
Array(1042257, 100, 1, 3), //鷹眼刺客襯衣 - (無描述)
Array(1042258, 300, 1, 3), //鷹眼流浪者外衣 - (無描述)
Array(1062165, 30, 1, 3), //魔術師劍士短褲 - (無描述)
Array(1062166, 100, 1, 3), //魔術師丹維奇短褲 - (無描述)
Array(1062167, 100, 1, 3), //魔術師遊俠短褲 - (無描述)
Array(1062168, 100, 1, 3), //魔術師刺客短褲 - (無描述)
Array(1062169, 300, 1, 3)  //魔術師流浪者短褲 - (無描述)
);

var itemList2 = Array(
Array(1212063, 90, 1, 3), // 法弗納魔力源泉杖 // (無描述)
Array(1222058, 250, 1, 3), // 法弗納天使手銃 // (無描述)
Array(1232057, 90, 1, 3), // 法弗納死亡使者 // (無描述)
Array(1242060, 90, 1, 3), // 法弗納精神之刃 // (無描述)
Array(1242061, 90, 1, 3), // 法弗納精神之刃 // (無描述)
Array(1252015, 500, 1, 3), // 法弗納北極星魔法棒 // (無描述)
Array(1262016, 500, 1, 3), // 法弗納ESP限製器 // (無描述)
Array(1302275, 90, 1, 3), // 法弗納銀槲之劍 // (無描述)
Array(1312153, 10, 1, 3), // 法弗納雙刃切肉斧 // (無描述)
Array(1322203, 10, 1, 3), // 法弗納戈耳迪錘 // (無描述)
Array(1332225, 90, 1, 3), // 法弗納大馬士革劍 // (無描述)
Array(1342082, 90, 1, 3), // 法弗納急速之刃 // (無描述)
Array(1362090, 90, 1, 3), // 法弗納洞察手杖 // (無描述)
Array(1372177, 90, 1, 3), // 法弗納魔力奪取者 // (無描述)
Array(1382208, 90, 1, 3), // 法弗納魔冠之杖 // (無描述)
Array(1402196, 90, 1, 3), // 法弗納懺悔之劍 // (無描述)
Array(1412135, 90, 1, 3), // 法弗納戰鬥切肉斧 // (無描述)
Array(1422140, 90, 1, 3), // 法弗納閃電錘 // (無描述)
Array(1432167, 90, 1, 3), // 法弗納貫雷槍 // (無描述)
Array(1442223, 500, 1, 3), // 法弗納半月寬刃斧 // (無描述)
Array(1452205, 90, 1, 3), // 法弗納追風者 // (無描述)
Array(1462193, 90, 1, 3), // 法弗納風翼弩 // (無描述)
Array(1472214, 90, 1, 3), // 法弗納危險之手 // (無描述)
Array(1482168, 250, 1, 3), // 法弗納巨狼之爪 // (無描述)
Array(1492179, 250, 1, 3), // 法弗納左輪槍 // (無描述)
Array(1522094, 90, 1, 3), // 法弗納雙風翼弩 // (無描述)
Array(1532098, 250, 1, 3), // 法弗納榮耀炮 // (無描述)
Array(1542063, 250, 1, 3), // 法弗納皇刀正宗 // (無描述)
Array(1552063, 250, 1, 3) // 法弗納煌扇藍姬 // (無描述)
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
    var txt = "#d六一兒童節來啦!\r\n";
        txt += "方塊 卷軸  FFN 隨即裝備 等道具 [ #r還在等待嗎#d ]\r\n\r\n#k";
        txt +="#L0#我要開禮包啦!#l";
        im.sendSimple(txt);
    } else if (status == 1) {
        if (selection == 0) {
            var chance = Math.floor(Math.random() * 500);
            var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        for (var i = 0; i < itemList2.length; i++) {
            if (itemList2[i][1] >= chance) {
                finalitem.push(itemList2[i]);
            }
        }
            if (finalitem.length != 0) {
                if(im.getSpace(2)>=4&&im.getSpace(5)>=3&&im.getSpace(4)>=1&&im.getSpace(1)>=1){
                var item;
                var random = new java.util.Random();
                var finalchance = random.nextInt(finalitem.length);
                var itemId = finalitem[finalchance][0];
                var quantity = finalitem[finalchance][2];
                var notice = finalitem[finalchance][3];
                item = im.gainGachaponItem(itemId, quantity, "[6.1直充88元寶箱]", notice);
                if (item != -1) {
                        im.sendOk("你獲得了 #b#z" + item + "##k " + quantity + "個。");
                        im.gainItem(2049124,30);
                        im.gainItem(2340000,30);
                        im.gainItem(2430068,2);
                        im.gainItem(4001839,5000);
                        im.gainItem(5064000,30);
                        im.gainItem(5062009,100);
                        im.gainItem(5062500,100);
                        im.gainItem(5062024,50);
                        im.gainItem(2432011,-1);
                    im.safeDispose();
                } else {
                    im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
                    im.safeDispose();
                }    
            } else {
                    im.sendOk("請你確認在背包的裝備(1格)，消耗(4格)，其他(1格)，特殊(1格)窗口中是否有一格以上的空間。");
                    im.safeDispose();
            }
        }
    }
}
}