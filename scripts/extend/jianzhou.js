/* 樂豆點商店 - 雙倍道具經驗卡 */

var status = -1;

var itemList = Array(
Array(5050000, 200), 
Array(5050001, 400),  
Array(5050002, 600), 
Array(5050003, 1000),  
Array(5050004, 1500),
Array(2501000, 8000),
Array(5062400, 5000),
Array(2049405, 6000),
Array(5530268, 2000),
Array(5530269, 3000),
Array(2048305, 200),
Array(5064003, 1000),
Array(5062500, 300),
Array(5064000, 300),
Array(5064100, 300),
Array(5062002, 1500),
Array(5062000, 850),
Array(2702001, 8000)
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