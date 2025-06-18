/*
    任務: 拯救克洛烏！- 降魔十字旅團
    描述: 受傷的#p9120217#為了恢復名譽，帶著傷討伐#o6220001#去了。到#m221040400#那邊去救他吧。
    獲得: 4310018*15 - 十字楓幣
          1112606*1 - 十字旅團勇士戒指 I
*/
var status = -1;

function start(mode, type, selection) {
    if (!qm.canHold(4310018, 15) || !qm.canHold(1112606, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 15);
        qm.gainItem(1112606, 1);
        qm.forceCompleteQuest(50694);
        qm.sendOk("Come to Nihal Desert.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
function end(mode, type, selection) {
    if (!qm.canHold(4310018, 15) || !qm.canHold(1112606, 1)) {
        qm.sendOk("背包空間不足.");
    } else {
        qm.gainItem(4310018, 15);
        qm.gainItem(1112606, 1);
        qm.forceCompleteQuest(50694);
        qm.sendOk("Come to Nihal Desert.");
        qm.forceCompleteQuest();
    }
    qm.dispose();
}
