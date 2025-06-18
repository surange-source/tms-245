/*
 *
 * NPC類型：兌換NPC
 * NPC名稱：溫迪
 * NPC職稱：末日風暴
 *
 */

var status = -1;

var itemList = Array(
        //Array(1003854, 5000, 24 * 60 * 60 * 1000),
        Array(1004137, 300, 24 * 60 * 60 * 1000),
        Array(1102683, 300, 24 * 60 * 60 * 1000),
        Array(1042314, 300, 24 * 60 * 60 * 1000),
        Array(1062203, 300, 24 * 60 * 60 * 1000),
        Array(1702510, 300, 24 * 60 * 60 * 1000),
        Array(1004126, 300, 24 * 60 * 60 * 1000),
        Array(1042311, 300, 24 * 60 * 60 * 1000),
        Array(1062204, 300, 24 * 60 * 60 * 1000),
        Array(1702509, 300, 24 * 60 * 60 * 1000)
        //Array(5010080, 5000, 24 * 60 * 60 * 1000)        


        );
var itemId = -1;
var points = -1;
var period = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b兔花花 MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n楓葉：#r " + cm.itemQuantity(4001126) + " #k個 \r\n該npc主要針對與新手過度,兌換的裝備\r\n#b全屬性加50點 HP1000 MP1000#k。\r\n使用時間限制1-3天,150級以下的玩家才可以進行兌換。";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":##b#t" + itemList[i][0] + "##k #r" + itemList[i][1] + " #k楓葉#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            itemId = item[0];
            points = item[1];
            period = item[2];
            cm.sendYesNo("您確定兌換#i" + itemId + ":# #b#t" + itemId + "##k 商品價格為：#r" + points + "#k 楓葉。");
        } else {
            cm.sendOk("兌換道具出現錯誤,請聯繫管理員。");
            cm.dispose();
        }
    } else if (status == 2) {
        if (itemId <= 0 || points <= 0 || period <= 0) {
            cm.sendOk("兌換道具出現錯誤,請聯繫管理員。");
            cm.dispose();
            return;
        }
        if (cm.haveItem(4001126, points)) {
            if (cm.haveSpace(1)) {
                if (cm.getPlayer().getLevel() <= 150) {
                var ii = cm.getItemInfo();
                var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy(); // 生成一個Eq                toDrop.setStr(50); //裝備力量
                toDrop.setDex(50); //裝備敏捷
                toDrop.setInt(50); //裝備智力
                toDrop.setLuk(50); //裝備運氣
                toDrop.setHp(1000); //HP
                toDrop.setMp(1000); //MP0086);
                toDrop.setExpiration(java.lang.System.currentTimeMillis() + period); // 期限
                cm.gainItem(4001126, -points);
                cm.addByItem(toDrop);
                 cm.worldSpouseMessage(0x20, "[楓葉活動] 玩家 " + cm.getChar().getName() + " 使用"+ points  +"楓葉 兌換了全屬性加50的限時點裝。");
                cm.sendOk("兌換成功,商品#i" + itemId + ":# #b#t" + itemId + "##k已送往背包。");
            } else {
                cm.sendOk("兌換功能只有150以下的玩家才能使用。");
            }
            } else {
                cm.sendOk("兌換失敗，請您確認在背包裝備欄目窗口中是否有一格以上的空間。");
            }
        } else {
            cm.sendOk("楓葉不足。\r\n\r\n兌換#i" + itemId + ":# #b#t" + itemId + "##k 需要 #r" + points + "#k 楓葉。\r\n\r\n賬戶楓葉：#r" + cm.itemQuantity(4001126) + " 個");
        }
        status = -1;
    }
}



