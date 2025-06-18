var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendYesNo("(船夫示意要大家上船。)");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.dispose();
    }
}