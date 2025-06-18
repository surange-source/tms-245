/*
    任務: 燒瓶中的眼珠 - 降魔十字旅團
    描述: 接到了討伐#o6090004#的委託。到#m261010003#去進行搜索吧。完成後直接向尼哈沙漠地區的#p9120212#匯報吧。
    獲得: 4310018*19 - 十字楓幣
          1112608*1 - 十字旅團勇士戒指 III
          
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 19) || !qm.canHold(1112608, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 19);
        qm.gainItem(1112608, 1);
        qm.forceStartQuest(50701);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 19) || !qm.canHold(1112608, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 19);
        qm.gainItem(1112608, 1);
        qm.forceStartQuest(50701);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
