function action(mode, type, selection) {
    if (cm.getMap().getAllMonster().size() != 0) {
        cm.sendNext("請消滅冰騎士!!");
    } else {
        cm.warpParty(932000400, 0);
    }
    cm.dispose();
}
