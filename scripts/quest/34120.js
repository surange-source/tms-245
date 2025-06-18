var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendPlayerToNpc("#b（撿起卡歐離去時留下的秘法符文：消逝的旅途。）");
    } else if (status == 1) {
        if (qm.canHold(1712001, 1)) {
            qm.deleteAll(1712000);
            qm.gainItem(1712001, 1);
            qm.forceCompleteQuest();
        } else {
            qm.dropMessage(1, "請把裝備欄空出一格。");
        }
        qm.dispose();
    }
}