/*
    任務: 時間靜止之湖的十字旅團
    描述: 接到了十字旅團幫助時間靜止之湖地區的指令。去見見時間靜止之湖的#p9120210#吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("去時間靜止之湖見#p9120210#。");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}
