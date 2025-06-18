/*
    任務: 變了的森林
    描述: 去見見聖地森林中的桉吧。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("你過來點，我就在你的後面。");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.sendNext("你過來點，我就在你的後面。");
    qm.forceCompleteQuest();
    qm.dispose();
}
