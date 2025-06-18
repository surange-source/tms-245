/*
    任務: 突襲！- 降魔十字旅團
    描述: 得知#b#p9120218##k背叛了十字旅團，現在正在派人追捕。真讓人不敢相信。據說她要去和#b#o9400729##k接頭，趕快到#b#m251010500##k#去追蹤她吧。
    獲得: 4310018*25 - 十字楓幣
          1112611*1 - 十字旅團英雄戒指 III
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 25) || !qm.canHold(1112611, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 25);
        qm.gainItem(1112611, 1);
        qm.forceCompleteQuest(50709);
        qm.sendOk("Come to Leafre.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 25) || !qm.canHold(1112611, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 25);
        qm.gainItem(1112611, 1);
        qm.forceCompleteQuest(50709);
        qm.sendOk("Come to Leafre.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
