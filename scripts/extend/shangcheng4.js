/* 樂豆點商店 - 雙倍道具經驗卡 */

var status = -1;

var itemList = Array(
Array(1022148, 3000),//  這個是眼飾的 
Array(1012319, 20000), // 這個是臉飾的
Array(1112918, 15000, 7),
Array(2431938, 30000),
//Array(2070019, 20),
Array(1132246, 20000),
Array(1122267, 20000),
Array(1032223, 20000),
Array(1113075, 20000),
Array(1122122, 50000),
Array(1122123, 50000),
Array(1122124, 50000),// -
Array(1122125, 50000),//  - 
Array(1122126, 50000),//  -
Array(1102471, 4500), // 赫裡希安精銳劍士披風 // (無描述)
Array(1102472, 4500), // 赫裡希安精銳法師披風 // (無描述)
Array(1102473, 4500), // 赫裡希安精銳弓箭手披風 // (無描述)
Array(1102474, 4500), // 赫裡希安精銳盜賊披風 // (無描述)
Array(1102475, 4500), // 赫裡希安精銳海盜披風 // (無描述)
Array(1072732, 4500), // 赫裡希安精銳劍士靴 // (無描述)
Array(1072733, 4500), // 赫裡希安精銳法師靴 // (無描述)
Array(1072734, 4500), // 赫裡希安精銳弓箭手靴 // (無描述)
Array(1072735, 4500), // 赫裡希安精銳盜賊靴 // (無描述)
Array(1072736, 4500), // 赫裡希安精銳海盜靴 // (無描述)
Array(1132164, 4500), // 赫裡希安精銳劍士腰帶 // (無描述)
Array(1132165, 4500), // 赫裡希安精銳法師腰帶 // (無描述)
Array(1132166, 4500), // 赫裡希安精銳弓箭手腰帶 // (無描述)
Array(1132167, 4500), // 赫裡希安精銳盜賊腰帶 // (無描述)
Array(1132168, 4500) // 赫裡希安精銳海盜腰帶 // (無描述)
/*
Array(1102476, 120), // 諾巴西亞戴斯披風 // (無描述)
Array(1102477, 120), // 諾巴赫爾梅斯披風 // (無描述)
Array(1102478, 120), // 諾巴凱倫披風 // (無描述)
Array(1102479, 120), // 諾巴利卡昂披風 // (無描述)
Array(1102480, 120), // 諾巴阿爾泰披風 // (無描述)
Array(1072737, 120), // 諾巴西亞戴斯靴 // (無描述)
Array(1072738, 120), // 諾巴赫爾梅斯靴 // (無描述)
Array(1072739, 120), // 諾巴凱倫靴 // (無描述)
Array(1072740, 120), // 諾巴利卡昂靴 // (無描述)
Array(1072741, 120), // 諾巴阿爾泰靴 // (無描述)
Array(1132169, 150), // 諾巴西亞戴斯腰帶 // (無描述)
Array(1132170, 150), // 諾巴赫爾梅斯腰帶 // (無描述)
Array(1132171, 150), // 諾巴凱倫腰帶 // (無描述)
Array(1132172, 150), // 諾巴利卡昂腰帶 // (無描述)
Array(1132173, 150), // 諾巴阿爾泰腰帶 // (無描述)
/*
Array(1102481, 298), // 暴君西亞戴斯披風 // (無描述)
Array(1102482, 298), // 暴君赫爾梅斯披風 // (無描述)
Array(1102483, 298), // 暴君凱倫披風 // (無描述)
Array(1102484, 298), // 暴君利卡昂披風 // (無描述)
Array(1102485, 298), // 暴君阿爾泰披風 // (無描述)
Array(1072743, 298), // 暴君西亞戴斯靴 // (無描述)
Array(1072744, 298), // 暴君赫爾梅斯靴 // (無描述)
Array(1072745, 298), // 暴君凱倫靴 // (無描述)
Array(1072746, 298), // 暴君利卡昂靴 // (無描述)
Array(1072747, 298), // 暴君阿爾泰靴 // (無描述)
Array(1132174, 298), // 暴君西亞戴斯腰帶 // (無描述)
Array(1132175, 298), // 暴君赫爾梅斯腰帶 // (無描述)
Array(1132176, 298), // 暴君凱倫腰帶 // (無描述)
Array(1132177, 298),// 暴君利卡昂腰帶 // (無描述)
Array(1132178, 298),// 暴君阿爾泰腰帶 // (無描述)
Array(1142210, 60),//  - 
Array(1142178, 60)// */
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k樂豆點#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            itemId = item[0];
            points = item[1];
            period = item[2];
            cm.sendYesNo("您是否購買#i" + itemId + ":# #b#t" + itemId + "##k 需要 #r" + points + "#k 樂豆點？");
        } else {
            cm.sendOk("出現錯誤...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (itemId <= 0 || points <= 0 || period <= 0) {
            cm.sendOk("購買道具出現錯誤...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= points) {
            if (cm.haveItem(itemId)) {
                cm.sendOk("您已經擁有#i" + itemId + ":# #b#t" + itemId + "##k無需重複購買。");
            } else {
                cm.gainNX( - points);
                cm.gainItemPeriod(itemId, 1, period);
                cm.sendOk("恭喜您成功購買#i" + itemId + ":# #b#t" + itemId + "##k。");
                cm.dispose();
            }
        } else {
            cm.sendOk("您沒有那麼多樂豆點。\r\n\r\n購買#i" + itemId + ":# #b#t" + itemId + "##k 需要 #r" + points + "#k 樂豆點。");
        }
        cm.dispose();
    }
}