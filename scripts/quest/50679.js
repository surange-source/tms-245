/*
    任務: 比國王還可怕的女王
    描述: 資助人#b#p9120219##k說有事情想拜託我。
    獲得: 4310018*5 - 十字楓幣
          1112601*1 - 十字旅團熟練戒指 II
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 5) || !qm.canHold(1112601, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 5);
        qm.gainItem(1112601, 1);
        qm.forceStartQuest(50682);
        qm.forceStartQuest(50686);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 5) || !qm.canHold(1112601, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 5);
        qm.gainItem(1112601, 1);
        qm.forceStartQuest(50682);
        qm.forceStartQuest(50686);
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
