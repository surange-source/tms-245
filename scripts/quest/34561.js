function start(mode, type, selection) {
    if (qm.getMapId() != 450006130) {
        qm.warp(450006130);
    } else {
        qm.forceStartQuest();
    }
    qm.dispose();
}

function end(mode, type, selection) {
    qm.forceCompleteQuest();
    qm.dispose();
    qm.warp(450006330, 2);
}