/*
    任務: 兼職襲擊 - 降魔十字旅團
    描述: 接到了幫助受傷的#b#p9120217##k去討伐#b#o5220003##k的指令。到#b#m220040200##k去進行搜索吧。
    獲得: 4310018*13 - 十字楓幣
          1112605*1 - 十字旅團老兵戒指 III
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 13) || !qm.canHold(1112605, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 13);
        qm.gainItem(1112605, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 13) || !qm.canHold(1112605, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 13);
        qm.gainItem(1112605, 1);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
