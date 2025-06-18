function start() {
    cm.sendYesNo("要移動到能夠和其他玩家交易的#b<拍賣場>#k嗎？");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    cm.dispose();
    cm.enterAuction();
}
