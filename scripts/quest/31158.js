/*
    任務: 夢的碎片
    描述: 偶然撿到了夢碎片。去村裡看看有沒有人知道這是什麼東西吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}
