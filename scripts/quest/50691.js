/*
    任務: 拯救謝麗爾！- 降魔十字旅團
    描述: 受傷的#b#p9120218##k為了恢復名譽，帶著傷討伐#b#o6220001##k去了。到#b#m221040400##k那邊去救她吧。
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
