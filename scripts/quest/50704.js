/*
    任務: 向著武陵 - 降魔十字旅團
    描述: 接到了十字旅團幫助武陵地區的指令。去見見武陵的#b#p9120214##k吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("去武陵見#b#p9120214##k");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}
