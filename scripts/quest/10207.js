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
        if (status == 0) {
            qm.sendYesNo("小女皇在楓之谷世界出現後，黑魔法師的氣息好像變得更強了。聽說已經出現了因為黑魔法師的氣息而變質的物質。吃了變質的物質之後，怪物也許會變的更強。必須盡快對變質的物質進行分析才行……你能幫我嗎？");
        } else if (status == 1) {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}
