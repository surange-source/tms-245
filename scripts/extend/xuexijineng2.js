/* 技能冊 */

var status = -1;
var itemList = Array(
Array(2290868, 1000), // 英雄的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得英雄所需的一本能手冊。
Array(2290869, 1000), // 聖騎士的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得聖騎士所需的一本能手冊。
Array(2290870, 1000), // 黑騎士的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得黑騎士所需的一本能手冊。
Array(2290871, 1000), // 火毒魔導師的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得火毒魔導師所需的一本能手冊。
Array(2290872, 1000), // 冰雷魔導師的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得冰雷魔導師所需的一本能手冊。
Array(2290873, 1000), // 主教的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得主教所需的一本能手冊。
Array(2290874, 1000), // 箭神的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得箭神所需的一本能手冊。
Array(2290875, 1000), // 神射手的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得神射手所需的一本能手冊。
Array(2290876, 1000), // 暗影神偷的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得暗影神偷所需的一本能手冊。
Array(2290877, 1000), // 夜使者的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得夜使者所需的一本能手冊。
Array(2290878, 1000), // 影武者的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得影武者所需的一本能手冊。
Array(2290879, 1000), // 拳霸的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得拳霸所需的一本能手冊。
Array(2290880, 1000), // 船長的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得船長所需的一本能手冊。
Array(2290881, 1000), // 重砲指揮官的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得重砲指揮官所需的一本能手冊。
Array(2290882, 1000), // 狂狼勇士的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得狂狼勇士所需的一本能手冊。
Array(2290883, 1000), // 龍魔導士的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得龍魔導士所需的一本能手冊。
Array(2290884, 1000), // 精靈遊俠的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得精靈遊俠所需的一本能手冊。
Array(2290885, 1000), // 惡魔殺手的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得惡魔殺手所需的一本能手冊。
Array(2290886, 1000), // 喚靈斗師的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得喚靈斗師所需的一本能手冊。
Array(2290887, 1000), // 狂豹獵人的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得狂豹獵人所需的一本能手冊。
Array(2290245, 1000), // 傑諾的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得傑諾所需的一本能手冊。
Array(2290889, 1000), // 幻影的神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得幻影所需的一本能手冊。
Array(2290890, 1000), // 夜光的神秘的能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得夜光所需的一本能手冊。
Array(2290891, 1000), // 凱撒神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得凱撒所需的一本能手冊。
Array(2290892, 1000) // 天使破壞者神秘能手冊 , 未知的神秘能手冊。雙擊後，可以隨機獲得天使破壞者所需的一本能手冊。
);
var selectedItem = -1;
var selectedCost = -1;

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您希望購買的技能冊：\r\n\樂豆點：#r" + cm.getPlayer().getCSPoints(1) + "#k    ";
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