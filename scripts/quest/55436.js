var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
        qm.sendNextN("……我能理解. 對於我這種人你一定沒什麼興趣的. 即使世界發生變化. ");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        qm.openUI(0x251);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        qm.dispose();
    }
}