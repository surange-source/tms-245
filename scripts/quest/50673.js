/*
    任務: 去吧！向著冰峰雪域
    描述: 在#b#p9120206##k那裡可以接受十字旅團的指令。到維多利亞島的村莊中去見見他吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Come to El Nath.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}
