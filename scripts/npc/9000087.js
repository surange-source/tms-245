var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status ++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendYesNo("要移動到能夠和其他玩家交易物品的#b<自由市場>#k嗎？");
    } else if (status == 1) {
        if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022) {
            cm.sendOk("#fs28##fn方正舒體##b你難道不在自由市場嗎？");
        } if (cm.inEvent()) {
            cm.sendOk("無法在這裡使用。");
        } else {
            cm.saveLocation("FREE_MARKET");
            cm.playPortalSE();
            cm.warp(910000000, "st00");
        }
        cm.dispose();
    }
}
