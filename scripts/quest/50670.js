/*
    任務: 十字旅團
    描述: 從一個名叫十字旅團的奇怪團體那裡接到了提議。到維多利亞島的村莊中尋找十字旅團的#b#p9120206##k，並與其對話吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Join the Silent Crusade...");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}
