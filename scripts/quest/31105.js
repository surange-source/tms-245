/*
    任務: 被破壞的弓箭手村
    描述: 向長老阿勒斯瞭解未來的情況。
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            qm.dispose();
        } else if (status == 0) {
            qm.sendNext("一切都是因為黑暗魔法師的原因……。")
        } else if (status == 1) {
            qm.sendNext("你去問問嚇麗娜，她就在我的旁邊。")
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
