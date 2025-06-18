var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendNext("除了這巨大斷崖之外好像沒有其他路可以走，全都是死路…先攀上這個崖壁看看應該會比較好。");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.dispose();
    }
}